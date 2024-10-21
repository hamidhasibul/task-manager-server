import { NextFunction, Request, Response } from "express";
import { TaskBody } from "types/tasks.types";
import ApiError from "../utils/api-error";
import { db } from "../db";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, dueDate, priority, categoryId }: TaskBody =
    req.body;

  if (!title || !description || !dueDate || !priority || !categoryId) {
    return next(new ApiError("required fields", 400));
  }
  try {
    const task = await db.task.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dueDate),
        priority,
        Category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: `task titled ${task.title} has been added`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  try {
    const task = await db.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        priority: true,
        status: true,
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!task) {
      return next(new ApiError("Task not found", 404));
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
