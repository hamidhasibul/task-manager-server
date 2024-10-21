export type TaskBody = {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  categoryId: string;
};

export type Priority = "HIGH" | "NORMAL" | "LOW";

export type TaskFilters = {
  status?: "PENDING" | "COMPLETED";
  priority?: Priority;
  category?: string;
};
