import { Router } from "express";
import {
  createBrand,
  getAll,
  getById,
  remove,
  updateBrand,
} from "../controllers/BrandController.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const brandRouter = Router();

brandRouter.get("/", getAll);
brandRouter.get("/:id", getById);
brandRouter.post("/", createBrand);
brandRouter.put("/:id", updateBrand);
brandRouter.delete("/:id", remove);

export default brandRouter;
