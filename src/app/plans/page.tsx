import { fetchDailyTasks } from '@/lib/airtable';
import TaskCard from '@/components/TaskCard';

export const revalidate = 300; // ISR: 每 300 秒重新生成页面

export default async function PlansPage() {
  const tasks = await fetchDailyTasks();

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      {/* 背景效果 */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 left-1/3 w-[480px] h-[480px] bg-cyan-400/12 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[320px] h-[320px] bg-violet-400/12 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060608]" />
      </div>

      <main className="relative max-w-4xl mx-auto px-6 py-20">
        {/* 头部 */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-[2.5rem] font-light tracking-tight mb-5">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              动态计划板块
            </span>
          </h1>
          <p className="text-sm text-white/45 max-w-sm mx-auto leading-relaxed">
            实时同步自 Airtable | 每 5 分钟自动更新
          </p>
        </header>

        {/* 任务卡片流 */}
        <section className="grid gap-6">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                id={task.id}
                date={task.date || ''}
                category={(task.category === '健身' || task.category === '学习') ? task.category : '学习'}
                task={task.task}
                status={task.completed}
                media={task.media?.[0]?.url}
              />
            ))
          ) : (
            <div className="text-center py-12 text-white/40">
              <p>暂无任务数据</p>
              <p className="text-xs mt-2">请先在 Airtable 中添加 DailyTasks 记录</p>
            </div>
          )}
        </section>

        {/* 底部统计 */}
        <footer className="mt-12 text-center">
          <div className="text-[11px] text-white/30">
            共 {tasks.length} 条记录 | 最后更新: {new Date().toLocaleString('zh-CN')}
          </div>
        </footer>
      </main>
    </div>
  );
}