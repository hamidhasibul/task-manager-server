import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "../../controllers/categories.controller";
import { Router } from "express";

const router = Router();

router.route("/").get(getCategories).post(createCategory);

router.route("/:categoryId").get(getCategory).delete(deleteCategory);

export default router;
