import { Router } from "express";
import {
  changeStatus,
  createCategory,
  getAll,
  getById,
  remove,
  updateCategory,
} from "../controllers/CategoryController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { categoryValidation } from "../validation/categoryValidation.js";
import { checkPermission } from "./../middlewares/checkPermission.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const categoryRouter = Router();

categoryRouter.get("/", getAll);
categoryRouter.get("/:id", getById);

categoryRouter.use("/", checkAuth, checkIsAdmin);
categoryRouter.post(
  "/",
  validBodyRequest(categoryValidation),
  checkPermission,
  createCategory
);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.put("/:slug/status", changeStatus);
categoryRouter.delete("/:id", remove);

export default categoryRouter;
