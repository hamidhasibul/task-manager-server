import { NextFunction, Request, Response } from "express";
import {
  type TaskFilters,
  type Priority,
  type TaskBody,
} from "types/tasks.types";
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

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, priority, category }: TaskFilters = req.query;

  try {
    const filter: Record<string, any> = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (category) {
      filter.Category = {
        name: {
          contains: category,
          mode: "insensitive",
        },
      };
    }

    const tasks = await db.task.findMany({
      where: filter,
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

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  try {
    await db.task.delete({
      where: {
        id: taskId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Task has been deleted",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, dueDate }: TaskBody = req.body;
  const { taskId } = req.params;

  if (!title || !description || !dueDate) {
    return next(new ApiError("Bad request", 400));
  }

  try {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dueDate),
      },
    });

    res.status(200).json({
      success: true,
      message: "task has been updated",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const changeTaskPriority = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { priority }: { priority: Priority } = req.body;
  const { taskId } = req.params;

  if (!priority) {
    return next(new ApiError("Bad Request", 400));
  }

  try {
    const task = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        priority: priority,
      },
    });

    res.status(200).json({
      success: true,
      message: "task priority changed",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const changeTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  const { status }: { status: "PENDING" | "COMPLETED" } = req.body;

  try {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Task status changed",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
