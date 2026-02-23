import Link from "next/link";
import { fetchDailyTasks } from "@/lib/airtable";
import TaskCard from "@/components/TaskCard";

export const dynamic = "force-dynamic";

interface Task {
  id: string;
  date: string | null;
  category: string | null;
  task: string;
  completed: boolean;
  media: { url: string; filename?: string }[];
}

export default async function StudyPage() {
  let tasks: Task[] = [];
  let error: string | null = null;

  try {
    tasks = await fetchDailyTasks("学习");
  } catch (e) {
    error =
      e instanceof Error ? e.message : "获取学习计划失败，请稍后再试。";
  }

  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-400/15 blur-[80px]" />
      </div>

      <main className="relative max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-cyan-400 hover:text-cyan-300 transition-colors mb-16"
        >
          ← 返回首页
        </Link>

        <h1 className="text-2xl font-light text-white mb-2">学习计划</h1>
        <p className="text-[13px] text-white/50 mb-8">
          在手机端编辑 Airtable 表格，这里自动同步展示。
        </p>

        {error ? (
          <div className="p-4 border border-red-500/40 bg-red-500/10 text-[13px] text-red-200">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-6 border border-white/10 bg-white/[0.02]">
            <p className="text-[13px] text-white/50">
              还没有学习任务。请在 Airtable 中创建 Category 为"学习"的记录试试。
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                date={task.date || ''}
                category="学习"
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

