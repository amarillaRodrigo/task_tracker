import type { TaskStatus } from "@task-tracker/core";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

export const MOTIVATIONAL_PHRASES = [
  "Don't count the days. Make the days count.",
  "You only get today once.",
  "What you do today matters.",
  "The best time to start was yesterday. The second best is now.",
  "Less thinking. More doing.",
  "Burn bright today.",
];
