import { Router } from "express";

import categoryRouter from "./api/categories.router";

const router = Router();

router.use("/api/v1/categories", categoryRouter);

export default router;
