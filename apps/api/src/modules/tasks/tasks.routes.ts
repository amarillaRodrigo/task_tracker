import { FastifyInstance } from "fastify";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { NotFoundError } from "../../shared/errors.js";
import { createTasksRepo } from "./tasks.repo.js";
import { createTasksService } from "./tasks.service.js";
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskParamsSchema,
  TaskSchema,
  type CreateTaskBody,
  type UpdateTaskBody,
  type TaskParams,
} from "./tasks.schemas.js";
import { Type } from "@sinclair/typebox";

export default async function tasksRoutes(fastify: FastifyInstance) {
  const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
  const prisma = new PrismaClient({ adapter });
  const repo = createTasksRepo(prisma);
  const service = createTasksService(repo);

  fastify.get("/tasks", {
    schema: { response: { 200: Type.Array(TaskSchema) } },
    handler: async (_req, reply) => {
      const tasks = await service.getAll();
      return reply.send(tasks);
    },
  });

  fastify.get<{ Params: TaskParams }>("/tasks/:id", {
    schema: {
      params: TaskParamsSchema,
      response: { 200: TaskSchema },
    },
    handler: async (req, reply) => {
      try {
        const task = await service.getById(req.params.id);
        return reply.send(task);
      } catch (err) {
        if (err instanceof NotFoundError)
          return reply.code(404).send({ message: err.message });
        throw err;
      }
    },
  });

  fastify.post<{ Body: CreateTaskBody }>("/tasks", {
    schema: {
      body: CreateTaskSchema,
      response: { 201: TaskSchema },
    },
    handler: async (req, reply) => {
      const task = await service.create(req.body);
      return reply.code(201).send(task);
    },
  });

  fastify.patch<{ Params: TaskParams; Body: UpdateTaskBody }>("/tasks/:id", {
    schema: {
      params: TaskParamsSchema,
      body: UpdateTaskSchema,
      response: { 200: TaskSchema },
    },
    handler: async (req, reply) => {
      try {
        const task = await service.update(req.params.id, req.body);
        return reply.send(task);
      } catch (err) {
        if (err instanceof NotFoundError)
          return reply.code(404).send({ message: err.message });
        throw err;
      }
    },
  });

  fastify.delete<{ Params: TaskParams }>("/tasks/:id", {
    schema: { params: TaskParamsSchema },
    handler: async (req, reply) => {
      try {
        await service.delete(req.params.id);
        return reply.code(204).send();
      } catch (err) {
        if (err instanceof NotFoundError)
          return reply.code(404).send({ message: err.message });
        throw err;
      }
    },
  });
}
