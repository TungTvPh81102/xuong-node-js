import { Router } from "express";
import productRouter from "./product.routes.js";
import brandRouter from "./brand.routes.js";
import categoryRouter from "./category.routes.js";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
