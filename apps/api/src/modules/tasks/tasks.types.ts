export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  description: string;
  status?: TaskStatus;
}

export interface UpdateTaskInput {
  description?: string;
  status?: TaskStatus;
}
