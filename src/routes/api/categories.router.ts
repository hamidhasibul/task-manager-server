import {
  createCategory,
  getCategories,
  getCategory,
} from "../../controllers/categories.controller";
import { Router } from "express";

const router = Router();

router.route("/").get(getCategories).post(createCategory);

router.route("/:categoryId").get(getCategory);

export default router;
