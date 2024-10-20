import { NextFunction, Request, Response } from "express";

export const createCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ success: true, message: "Hello" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
