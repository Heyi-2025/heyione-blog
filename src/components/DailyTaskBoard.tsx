import { fetchDailyTasks } from "@/lib/airtable";

interface DailyTaskBoardProps {
  /**
   * 可选：按「Ctegory」字段过滤，例如「健身」「学习」
   */
  category?: string;
}

export const dynamic = "force-dynamic";

export default async function DailyTaskBoard({
  category,
}: DailyTaskBoardProps) {
  let error: string | null = null;
  let tasks: Awaited<ReturnType<typeof fetchDailyTasks>> = [];

  try {
    tasks = await fetchDailyTasks(category);
  } catch (e) {
    error =
      e instanceof Error ? e.message : "获取任务数据失败，请稍后再试。";
  }

  if (error) {
    return (
      <div className="p-4 border border-red-500/40 bg-red-500/10 text-[13px] text-red-200 rounded-lg">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-6 border border-white/10 bg-white/[0.02] rounded-lg">
        <p className="text-[13px] text-white/55">
          还没有任何打卡记录。你可以在 Airtable 的 DailyTasks 表中添加一条任务试试。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const isCompleted = task.completed;

        const dateLabel = task.date
          ? new Date(task.date).toLocaleDateString("zh-CN", {
              month: "2-digit",
              day: "2-digit",
              weekday: "short",
            })
          : "未设日期";

        return (
          <article
            key={task.id}
            className={[
              "relative overflow-hidden rounded-xl border backdrop-blur-sm",
              "transition-all duration-200 group",
              isCompleted
                ? "border-blue-500/80 bg-blue-500/15 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                : "border-blue-400/30 bg-blue-400/[0.03] shadow-[0_0_0_rgba(0,0,0,0)] group-hover:border-blue-400/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
            ].join(" ")}
          >
            {/* 顶部信息行 */}
            <div className="flex items-start gap-4 p-4 md:p-5">
              {/* 状态图标 */}
              <div
                className={[
                  "mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold",
                  isCompleted
                    ? "border-blue-400 bg-blue-500/20 text-blue-200 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    : "border-blue-400/30 bg-blue-500/15 text-blue-200",
                ].join(" ")}
              >
                {isCompleted ? "✓" : "…"}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[15px] font-medium text-white leading-snug">
                    {task.task || "未命名任务"}
                  </h2>

                  {task.category && (
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] text-white/65">
                      {task.category}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/45">
                  <span>{dateLabel}</span>
                  <span className="h-3 w-px bg-white/15" />
                  <span
                    className={
                      isCompleted
                        ? "text-emerald-300/85"
                        : "text-white/45"
                    }
                  >
                    {isCompleted ? "已完成" : "未完成"}
                  </span>
                </div>
              </div>
            </div>

            {/* 图片区域（如果有 Media） */}
            {task.media.length > 0 && (
              <div className="border-t border-white/10">
                <div className="relative overflow-hidden">
                  <div className="aspect-[16/9] w-full">
                    <img
                      src={task.media[0].url}
                      alt={task.media[0].filename ?? "打卡图片"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

