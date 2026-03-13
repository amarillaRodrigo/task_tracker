"use client";

import type { Task } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isDone = task.status === "DONE";

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 bg-zinc-900 rounded-2xl group">
      <button
        onClick={() => onToggle(task)}
        className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
        style={{
          borderColor: isDone ? "#22c55e" : "#3f3f46",
          backgroundColor: isDone ? "#22c55e" : "transparent",
        }}
      >
        {isDone && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 text-sm transition-all duration-200 ${
          isDone ? "line-through text-zinc-600" : "text-zinc-200"
        }`}
      >
        {task.description}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="text-zinc-700 hover:text-red-400 transition-colors p-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
