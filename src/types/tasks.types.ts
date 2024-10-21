export type TaskBody = {
  title: string;
  description: string;
  dueDate: string;
  priority: "HIGH" | "NORMAL" | "LOW";
  categoryId: string;
};
