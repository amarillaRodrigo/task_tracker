import { readTasks, writeTasks, type Task } from "./storage.js";

function now(): string {
  return new Date().toISOString();
}

function nextId(tasks: Task[]): number {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;
}

export function addTask(description: string): Task {
  const tasks = readTasks();
  const task: Task = {
    id: nextId(tasks),
    description,
    status: "todo",
    createdAt: now(),
    updatedAt: now(),
  };
  tasks.push(task);
  writeTasks(tasks);
  return task;
}

export function updateTask(id: number, description: string): Task {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error(`Task ${id} not found`);
  task.description = description;
  task.updatedAt = now();
  writeTasks(tasks);
  return task;
}

export function deleteTask(id: number): void {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error(`Task ${id} not found`);
  tasks.splice(index, 1);
  writeTasks(tasks);
}

export function markTask(id: number, status: Task["status"]): Task {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error(`Task ${id} not found`);
  task.status = status;
  task.updatedAt = now();
  writeTasks(tasks);
  return task;
}

export function listTasks(status?: Task["status"]): Task[] {
  const tasks = readTasks();
  return status ? tasks.filter((t) => t.status === status) : tasks;
}
