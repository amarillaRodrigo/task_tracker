import type { Task, CreateTaskInput, UpdateTaskInput } from "@/lib/types";
import { API_URL } from "./constants";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const hasBody = !!options?.body;
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(hasBody && { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const tasksApi = {
  getAll: (): Promise<Task[]> =>
    request("/tasks", { cache: "no-store" }),

  create: (data: CreateTaskInput): Promise<Task> =>
    request("/tasks", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: UpdateTaskInput): Promise<Task> =>
    request(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  delete: (id: string): Promise<void> =>
    request(`/tasks/${id}`, { method: "DELETE" }),
};
