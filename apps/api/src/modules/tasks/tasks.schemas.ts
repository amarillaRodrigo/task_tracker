import { Type, Static } from "@sinclair/typebox";

const TaskStatus = Type.Union([
  Type.Literal("TODO"),
  Type.Literal("IN_PROGRESS"),
  Type.Literal("DONE"),
]);

export const TaskSchema = Type.Object({
  id: Type.String(),
  description: Type.String(),
  status: TaskStatus,
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const CreateTaskSchema = Type.Object({
  description: Type.String({ minLength: 1 }),
  status: Type.Optional(TaskStatus),
});

export const UpdateTaskSchema = Type.Object({
  description: Type.Optional(Type.String({ minLength: 1 })),
  status: Type.Optional(TaskStatus),
});

export const TaskParamsSchema = Type.Object({
  id: Type.String(),
});

export type CreateTaskBody = Static<typeof CreateTaskSchema>;
export type UpdateTaskBody = Static<typeof UpdateTaskSchema>;
export type TaskParams = Static<typeof TaskParamsSchema>;
