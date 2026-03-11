import CyberpunkLayout from "@/components/CyberpunkLayout";
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

export default async function FitnessPage() {
  let tasks: Task[] = [];
  let error: string | null = null;

  try {
    tasks = await fetchDailyTasks("健身");
  } catch (e) {
    error = e instanceof Error ? e.message : "获取健身计划失败，请稍后再试。";
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <CyberpunkLayout>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">WORKOUTS</div>
          <div className="stat-value">{tasks.length}</div>
          <div className="stat-unit">SESSIONS</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">COMPLETED</div>
          <div className="stat-value">{completedCount}</div>
          <div className="stat-unit">DONE</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">REMAINING</div>
          <div className="stat-value">{tasks.length - completedCount}</div>
          <div className="stat-unit">TASKS</div>
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
          <div className="card-title">FITNESS TRACKER</div>
          <div className="card-badge">TRAINING</div>
        </div>

        {error ? (
          <div style={{ padding: '1.5rem', background: 'rgba(255, 51, 102, 0.1)', border: '1px solid rgba(255, 51, 102, 0.3)', borderRadius: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--neon-red)' }}>
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              还没有健身任务。请在 Airtable 中创建 Category 为"健身"的记录。
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.map((task) => (
              <TaskCard key={task.id} id={task.id} date={task.date || ''} category="健身" task={task.task} status={task.completed} media={task.media[0]?.url} />
            ))}
          </div>
        )}
      </div>
    </CyberpunkLayout>
  );
}