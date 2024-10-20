import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import { CustomError } from "types/error.types";
import { corsOptions } from "./configs/cors-options";

import routes from "./routes/index";
import { errorHandler } from "./middlewares/error-handler";

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(routes);

// Test

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json({ success: true, message: "hello from the server-side!!" });
});

app.get("/favicon.ico", (req: Request, res: Response) => {
  res.status(204).end();
});

// Error Handlers

app.all("*", (req, _, next) => {
  const error: CustomError = new Error(
    `Can't find ${req.originalUrl} in this server!`
  );
  error.success = false;
  error.statusCode = 404;

  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server initialized @http://localhost:${PORT}/`);
});
