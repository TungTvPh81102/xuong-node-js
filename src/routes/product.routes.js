import { Router } from "express";
import {
  createProduct,
  getAll,
  getById,
  remove,
  updateProduct,
} from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.get("/", getAll);
productRouter.get("/:id", getById);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", remove);

export default productRouter;
