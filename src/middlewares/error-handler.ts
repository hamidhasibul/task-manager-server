import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/error.types";

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  error.statusCode = error.statusCode || 500;
  error.success = error.success || false;
  error.message = error.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.error(error.stack);
  }

  res.status(error.statusCode).json({
    success: error.success,
    message: error.message,
  });
};
