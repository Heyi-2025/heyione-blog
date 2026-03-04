import VSCodeLayout from "@/components/VSCodeLayout";
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
    <VSCodeLayout>
        
        <div className="mb-8">
          <h1 className="text-2xl font-mono mb-4">Study</h1>
          <p className="text-sm text-gray-400">
            Learning paths, STM32, front-end development, and AI experiments
          </p>
        </div>

        {error ? (
          <div className="p-4 border border-white/10 bg-white/[0.02] text-[13px] text-white/50">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-8 border border-white/10 bg-white/[0.02]">
            <p className="text-[14px] text-white/40">
              还没有学习任务。请在 Airtable 中创建 Category 为"学习"的记录试试。
            </p>
          </div>
        ) : (
          <div className="space-y-6">
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
      </VSCodeLayout>
  );
}
