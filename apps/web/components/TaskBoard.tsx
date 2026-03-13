"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";
import { tasksApi } from "@/lib/api";
import TaskItem from "./TaskItem";

interface TaskBoardProps {
  initialTasks: Task[];
}

export default function TaskBoard({ initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  async function handleAdd() {
    const description = input.trim();
    if (!description) return;
    setLoading(true);
    try {
      const task = await tasksApi.create({ description });
      setTasks((prev) => [task, ...prev]);
      setInput("");
      setShowInput(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(task: Task) {
    const nextStatus =
      task.status === "DONE" ? "TODO" : task.status === "TODO" ? "IN_PROGRESS" : "DONE";
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
    );
    try {
      const updated = await tasksApi.update(task.id, { status: nextStatus });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  }

  async function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await tasksApi.delete(id);
    } catch {
      setTasks((prev) => {
        const task = tasks.find((t) => t.id === id);
        return task ? [...prev, task] : prev;
      });
    }
  }

  const pending = tasks.filter((t) => t.status !== "DONE");
  const done = tasks.filter((t) => t.status === "DONE");

  return (
    <div className="px-4 pb-32">
      <div className="flex items-center gap-3 mb-4 px-1">
        <span className="flex items-center gap-1.5 text-zinc-600 text-xs">
          <span className="w-3 h-3 rounded-full border border-zinc-600 inline-block" />
          todo
        </span>
        <span className="text-zinc-700 text-xs">·</span>
        <span className="flex items-center gap-1.5 text-zinc-600 text-xs">
          <span className="w-3 h-3 rounded-full border border-orange-400 inline-flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
          </span>
          in progress
        </span>
        <span className="text-zinc-700 text-xs">·</span>
        <span className="flex items-center gap-1.5 text-zinc-600 text-xs">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
          done
        </span>
      </div>

      {tasks.length === 0 && !showInput && (
        <p className="text-center text-zinc-600 text-sm py-8">
          No tasks yet. Tap + to add one.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {pending.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </div>

      {done.length > 0 && (
        <div className="mt-6">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2 px-1">
            Completed · {done.length}
          </p>
          <div className="flex flex-col gap-2">
            {done.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}

      {showInput && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") setShowInput(false);
            }}
            placeholder="What needs to get done today?"
            className="flex-1 px-4 py-3 bg-zinc-900 rounded-2xl text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleAdd}
            disabled={loading || !input.trim()}
            className="px-4 py-3 bg-orange-400 text-white rounded-2xl text-sm font-medium disabled:opacity-40 hover:bg-orange-500 transition-colors"
          >
            {loading ? "..." : "Add"}
          </button>
        </div>
      )}

      <button
        onClick={() => setShowInput((v) => !v)}
        className="fixed bottom-8 right-6 w-14 h-14 rounded-full bg-orange-400 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-orange-500 transition-all hover:scale-105"
        style={{ boxShadow: "0 0 20px rgba(251,146,60,0.4)" }}
      >
        {showInput ? "×" : "+"}
      </button>
    </div>
  );
}
