import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/User.js";
export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded._id);

    console.log(user);

    if (!user) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You don't have permission",
      });
    }

    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
