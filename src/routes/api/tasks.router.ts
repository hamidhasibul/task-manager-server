import { Router } from "express";

import {
  changeTaskPriority,
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../../controllers/tasks.controller";

const router = Router();

router.route("/").post(createTask);
router.route("/:taskId").get(getTask).delete(deleteTask).patch(updateTask);
router.route("/:taskId/change-priority").patch(changeTaskPriority);

export default router;
