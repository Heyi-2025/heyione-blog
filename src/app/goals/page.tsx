import CyberpunkLayout from "@/components/CyberpunkLayout";
import Link from "next/link";
import { fetchDailyTasks } from "@/lib/airtable";
import TaskCard from "@/components/TaskCard";

export const revalidate = 300;

interface Task {
  id: string;
  date: string | null;
  category: string | null;
  task: string;
  completed: boolean;
  media: { url: string; filename?: string }[];
}

export default async function GoalsPage() {
  const tasks: Task[] = await fetchDailyTasks();
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <CyberpunkLayout>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">TOTAL GOALS</div>
          <div className="stat-value">{tasks.length}</div>
          <div className="stat-unit">ITEMS</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">ACHIEVED</div>
          <div className="stat-value">{completedCount}</div>
          <div className="stat-unit">DONE</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">PENDING</div>
          <div className="stat-value">{tasks.length - completedCount}</div>
          <div className="stat-unit">GOALS</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">PROGRESS</div>
          <div className="stat-value">{progress}%</div>
          <div className="stat-unit">COMPLETE</div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" className="btn">
          <span>←</span> BACK TO HOME
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">GOALS DASHBOARD</div>
          <div className="card-badge">TRACKING</div>
        </div>

        {tasks.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              暂无任务数据。请先在 Airtable 中添加 DailyTasks 记录。
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                date={task.date || ''}
                category={task.category === '健身' || task.category === '学习' ? task.category : '学习'}
                task={task.task}
                status={task.completed}
                media={task.media?.[0]?.url}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        <span>共 {tasks.length} 条记录 | 最后更新: {new Date().toLocaleString('zh-CN')}</span>
      </div>
    </CyberpunkLayout>
  );
}