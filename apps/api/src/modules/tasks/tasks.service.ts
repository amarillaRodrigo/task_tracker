import { NotFoundError } from "../../shared/errors.js";
import type { TasksRepo } from "./tasks.repo.js";
import type { CreateTaskInput, UpdateTaskInput } from "./tasks.types.js";

export function createTasksService(repo: TasksRepo) {
  return {
    getAll() {
      return repo.findAll();
    },

    async getById(id: string) {
      const task = await repo.findById(id);
      if (!task) throw new NotFoundError("Task", id);
      return task;
    },

    create(data: CreateTaskInput) {
      return repo.create(data);
    },

    async update(id: string, data: UpdateTaskInput) {
      await repo.findById(id).then((task) => {
        if (!task) throw new NotFoundError("Task", id);
      });
      return repo.update(id, data);
    },

    async delete(id: string) {
      await repo.findById(id).then((task) => {
        if (!task) throw new NotFoundError("Task", id);
      });
      return repo.delete(id);
    },
  };
}

export type TasksService = ReturnType<typeof createTasksService>;
