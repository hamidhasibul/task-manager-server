import { Router } from "express";

import categoryRouter from "./api/categories.router";
import taskRouter from "./api/tasks.router";

const router = Router();

router.use("/api/v1/categories", categoryRouter);
router.use("/api/v1/tasks", taskRouter);

export default router;
