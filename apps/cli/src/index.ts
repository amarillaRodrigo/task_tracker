import { addTask, updateTask, deleteTask, markTask, listTasks } from "./tasks.js";
import type { Task } from "./storage.js";

const [command, ...args] = process.argv.slice(2);

function printTask(task: Task): void {
  console.log(`[${task.id}] ${task.description} (${task.status})`);
}

try {
  switch (command) {
    case "add": {
      if (!args[0]) throw new Error("Usage: add <description>");
      const task = addTask(args[0]);
      console.log(`Task added (id: ${task.id})`);
      break;
    }

    case "update": {
      if (!args[0] || !args[1]) throw new Error("Usage: update <id> <description>");
      const task = updateTask(Number(args[0]), args[1]);
      console.log(`Task ${task.id} updated`);
      break;
    }

    case "delete": {
      if (!args[0]) throw new Error("Usage: delete <id>");
      deleteTask(Number(args[0]));
      console.log(`Task ${args[0]} deleted`);
      break;
    }

    case "mark-in-progress": {
      if (!args[0]) throw new Error("Usage: mark-in-progress <id>");
      const task = markTask(Number(args[0]), "in-progress");
      console.log(`Task ${task.id} marked as in-progress`);
      break;
    }

    case "mark-done": {
      if (!args[0]) throw new Error("Usage: mark-done <id>");
      const task = markTask(Number(args[0]), "done");
      console.log(`Task ${task.id} marked as done`);
      break;
    }

    case "list": {
      const validStatuses = ["todo", "in-progress", "done"];
      if (args[0] && !validStatuses.includes(args[0])) {
        throw new Error(`Invalid status. Use: ${validStatuses.join(", ")}`);
      }
      const tasks = listTasks(args[0] as Task["status"] | undefined);
      if (tasks.length === 0) {
        console.log("No tasks found");
      } else {
        tasks.forEach(printTask);
      }
      break;
    }

    default:
      console.log(`Usage:
  add <description>
  update <id> <description>
  delete <id>
  mark-in-progress <id>
  mark-done <id>
  list [todo|in-progress|done]`);
  }
} catch (err) {
  console.error(`Error: ${(err as Error).message}`);
  process.exit(1);
}
