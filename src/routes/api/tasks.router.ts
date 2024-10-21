import {
  createTask,
  deleteTask,
  getTask,
} from "../../controllers/tasks.controller";
import { Router } from "express";

const router = Router();

router.route("/").post(createTask);
router.route("/:taskId").get(getTask).delete(deleteTask);

export default router;
