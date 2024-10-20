import { createCategory } from "../../controllers/categories.controller";
import { Router } from "express";

const router = Router();

router.route("/").post(createCategory);

export default router;
