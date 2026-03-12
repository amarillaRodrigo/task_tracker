import { PrismaClient } from "../../generated/prisma/client.js";
import type { CreateTaskInput, UpdateTaskInput } from "./tasks.types.js";

export function createTasksRepo(prisma: PrismaClient) {
  return {
    findAll() {
      return prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    },

    findById(id: string) {
      return prisma.task.findUnique({ where: { id } });
    },

    create(data: CreateTaskInput) {
      return prisma.task.create({
        data: {
          description: data.description,
          ...(data.status && { status: data.status }),
        },
      });
    },

    update(id: string, data: UpdateTaskInput) {
      return prisma.task.update({
        where: { id },
        data: {
          ...(data.description !== undefined && { description: data.description }),
          ...(data.status !== undefined && { status: data.status }),
        },
      });
    },

    delete(id: string) {
      return prisma.task.delete({ where: { id } });
    },
  };
}

export type TasksRepo = ReturnType<typeof createTasksRepo>;
