import { Router } from "express";
import { create, getAll, getDetail } from "../controllers/UserController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { userValidation } from "./../validation/useValidation.js";

const userRouter = Router();

userRouter.get("/", getAll);
userRouter.get("/:id", getDetail);
userRouter.post("/", validBodyRequest(userValidation), create);

export default userRouter;
