export type todoType = {
  id: string;
  title?: string | null;
  description?: string|null; 
  dueDate: Date | null;
  isCompleted: boolean;
  updatedAt?: Date | null;
  createdAt?: Date;
};
