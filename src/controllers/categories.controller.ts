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

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;

  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!category) {
      return next(new ApiError("Category does not exist", 404));
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "category has been deleted" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
