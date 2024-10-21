import { createTask, getTask } from "../../controllers/tasks.controller";
import { Router } from "express";

const router = Router();

router.route("/").post(createTask);
router.route("/:taskId").get(getTask);

export default router;
