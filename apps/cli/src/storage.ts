import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const FILE_PATH = resolve(process.cwd(), "tasks.json");

export interface Task {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

export function readTasks(): Task[] {
  if (!existsSync(FILE_PATH)) {
    writeFileSync(FILE_PATH, "[]", "utf-8");
    return [];
  }

  const content = readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(content) as Task[];
}

export function writeTasks(tasks: Task[]): void {
  writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}
