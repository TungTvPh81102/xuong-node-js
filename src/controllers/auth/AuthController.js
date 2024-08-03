import { CLIENT_ID, CLIENT_SECRET } from "../../config/env.js";
import AuthAccessToken from "../../models/AuthAccessToken.js";
import GoogleAuthentication from "../../models/GoogleAuthentication.js";
import User from "../../models/User.js";
import { comparePassword, hassPassword } from "../../utils/hashPassword.js";
import { generateToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { GoogleAuth } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";

// [POST] /api/auth/signUp
export const signUp = async (req, res) => {
  try {
    const useExits = await User.findOne({ email: req.body.email });

    if (useExits) {
      return res.status(404).json({
        status: false,
        errors: "User already exists",
      });
    }

    const hashPassword = hassPassword(req.body.password);

    const data = await User.create({
      ...req.body,
      password: hashPassword,
    });

    if (!data) {
      data.password = undefined;
      return res.status(404).json({
        message: "Create failed",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Create user successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// [POST] /api/auth/sign-in
export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: false,
        errors: "Can't find user",
      });
    }

    const isMatch = comparePassword(user.password, req.body.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        errors: "Invalid credentials",
      });
    }

    const token = generateToken({ _id: user._id }, "1d");

    // Lưu thông tin vào collection AuthAccessToken
    const authAccessToken = new AuthAccessToken({
      user_id: user._id,
      accessToken: token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token hết hạn sau 1 ngày
    });

    await authAccessToken.save();

    user.password = undefined;

    return res.status(200).json({
      status: true,
      message: "Login successfully",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      name: error.name,
      message: error.message,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    const authAccessToken = await AuthAccessToken.findOne({
      accessToken: token,
    });

    if (!authAccessToken) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    await AuthAccessToken.deleteOne({ _id: authAccessToken._id });

    return res.status(200).json({
      message: "Sign out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// [POST] /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const newPassword = Math.random().toString(36).slice(-8);
    const hashPassword = hassPassword(newPassword);

    if (!hashPassword) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    user.password = hashPassword;
    await user.save();

    const emailSubject = "Password Reset in The Ciu Store ";
    const emailText = `Your new password is: ${newPassword}`;
    sendEmail(email, emailSubject, emailText);

    return res.status(200).json({
      message: "New password sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

// [POST] /api/auth/oauth
export const oauth = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      // If no code is present, start OAuth flow
      const redirectUrl = "http://localhost:8080/api/auth/oauth";
      const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, redirectUrl);

      const authorizeUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/userinfo.profile"],
        prompt: "consent",
        response_type: "code",
        redirect_uri: redirectUrl,
        include_granted_scopes: true,
      });

      res.json({
        url: authorizeUrl,
        status: true,
        message: "Redirect to Google",
      });
    } else {
      // If code is present, handle the callback
      const client = new OAuth2Client(
        CLIENT_ID,
        CLIENT_SECRET,
        "http://localhost:8080/api/auth/oauth"
      );

      const { tokens } = await client.getToken(code);

      console.log(tokens);

      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const userId = payload.sub;
      const name = payload.name;
      const avatar = payload.picture;

      let user = await GoogleAuthentication.findOne({ googleId: userId });
      if (!user) {
        user = await GoogleAuthentication.create({
          googleId: userId,
          name,
          avatar,
          password: null,
        });
      }

      const token = generateToken({ _id: user._id }, "1d");

      await AuthAccessToken.create({
        user_id: userId,
        accessToken: token,
        createdAt: new Date(),
        expiresAt: tokens.expiry_date, // Token expiry time
      });

      res.redirect(
        `http://localhost:5173/auth/oauth?token=${token}&user=${encodeURIComponent(
          JSON.stringify(user)
        )}`
      );
      // res.status(200).json({
      //   status: true,
      //   message: "Login successful",
      //   accessToken: token,
      //   user,
      // });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
