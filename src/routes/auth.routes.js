import { Router } from "express";
import {
  forgotPassword,
  oauth,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth/AuthController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import {
  forgotPasswordValidation,
  signInValidation,
  signUpValidation,
} from "../validation/authValidation.js";

const authRouter = Router();

authRouter.post("/signUp", validBodyRequest(signUpValidation), signUp);
authRouter.post("/signIn", validBodyRequest(signInValidation), signIn);
authRouter.post("/signOut", signOut);
authRouter.post(
  "/forgot-password",
  validBodyRequest(forgotPasswordValidation),
  forgotPassword
);
authRouter.get("/oauth", oauth);
// authRouter.get("/oauth", oauthCallback);

export default authRouter;
