import Link from "next/link";
import { fetchDailyTasks } from "@/lib/airtable";
import TaskCard from "@/components/TaskCard";
import Timeline from "@/components/Timeline";

export const dynamic = "force-dynamic";

interface Task {
  id: string;
  date: string | null;
  category: string | null;
  task: string;
  completed: boolean;
  media: { url: string; filename?: string }[];
}

export default async function FitnessPage() {
  let tasks: Task[] = [];
  let error: string | null = null;

  try {
    tasks = await fetchDailyTasks("健身");
  } catch (e) {
    error =
      e instanceof Error ? e.message : "获取健身计划失败，请稍后再试。";
  }

  // Prepare timeline data
  const timelineItems = [
    {
      date: "2026-02-24",
      title: "Website Launch",
      description: "Developer blog goes live",
      status: "current" as const,
    },
    {
      date: "2026-02-23",
      title: "Airtable Integration",
      description: "Task management system connected",
      status: "completed" as const,
    },
    {
      date: "2026-02-22",
      title: "Design System",
      description: "Noir aesthetic implemented",
      status: "completed" as const,
    },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden">
      <Timeline items={timelineItems} />

      <main className="relative max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[13px] text-white/40 hover:text-white/70 transition-colors mb-16 magnetic-target"
        >
          <span>←</span>
          <span>返回首页</span>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">Fitness</h1>
          <p className="text-[14px] text-white/40 max-w-xl leading-relaxed">
            Training schedules, workout logs, and progress tracking system
          </p>
        </div>

        {error ? (
          <div className="p-4 border border-white/10 bg-white/[0.02] text-[13px] text-white/50">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-8 border border-white/10 bg-white/[0.02]">
            <p className="text-[14px] text-white/40">
              还没有健身任务。请在 Airtable 中创建 Category 为"健身"的记录试试。
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                date={task.date || ''}
                category="健身"
                task={task.task}
                status={task.completed}
                media={task.media[0]?.url}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

