import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import { db } from "../db";
import { CategoryBody } from "types/categories.types";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name }: CategoryBody = req.body;
  if (!name) {
    return next(new ApiError("Valid name required", 400));
  }
  try {
    const categoryExists = await db.category.findFirst({
      where: {
        name: name.trim().toLowerCase(),
      },
    });

    if (categoryExists) {
      return next(new ApiError("Category with the same name exists", 409));
    }

    const category = await db.category.create({
      data: {
        name: name.trim().toLowerCase(),
      },
    });

    res.status(201).json({
      success: true,
      message: `category ${category.name} has been created`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
