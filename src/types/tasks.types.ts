export type TaskBody = {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  categoryId: string;
};

export type Priority = "HIGH" | "NORMAL" | "LOW";
