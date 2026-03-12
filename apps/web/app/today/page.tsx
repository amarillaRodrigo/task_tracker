import { tasksApi } from "@/lib/api";
import Countdown from "@/components/Countdown";
import TaskBoard from "@/components/TaskBoard";

export default async function TodayPage() {
  const tasks = await tasksApi.getAll().catch(() => []);

  return (
    <main className="min-h-screen max-w-lg mx-auto" style={{ background: "#0f0f0f" }}>
      <Countdown />
      <TaskBoard initialTasks={tasks} />
    </main>
  );
}
