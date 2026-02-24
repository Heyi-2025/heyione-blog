import React from 'react';

interface TimelineTask {
  date: string | null;
  task: string;
  category: string;
  completed: boolean;
}

interface TimelineProps {
  tasks: TimelineTask[];
}

export default function Timeline({ tasks }: TimelineProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="fixed right-8 top-32 w-72 hidden lg:block opacity-50">
        <div className="text-[12px] text-white/30 font-mono">
          No timeline data available
        </div>
      </div>
    );
  }

  // Sort tasks by date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Take only the last 5 tasks for the timeline
  const recentTasks = sortedTasks.slice(0, 5);

  return (
    <div className="fixed right-8 top-32 w-72 hidden lg:block">
      <div className="mb-6">
        <h3 className="text-[14px] text-white/40 font-mono mb-2">Timeline</h3>
        <div className="h-px bg-white/10"></div>
      </div>
      <div className="space-y-4">
        {recentTasks.map((task, index) => {
          const date = task.date ? new Date(task.date) : null;
          const formattedDate = date
            ? date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
            : 'No date';

          return (
            <div key={index} className="relative pl-6">
              {/* Timeline line */}
              {index < recentTasks.length - 1 && (
                <div className={`absolute left-2 top-6 w-px h-12 ${
                  task.completed ? 'bg-white/20' : 'bg-white/10'
                }`} />
              )}
              {/* Timeline dot */}
              <div className={`absolute left-0 top-2 w-3 h-3 rounded-full border ${
                task.completed
                  ? 'bg-white border-white shadow-lg shadow-white/30'
                  : 'bg-transparent border-white/30 animate-pulse'
              }`} />
              {/* Timeline content */}
              <div className={`${task.completed ? 'opacity-70' : 'opacity-100'}`}>
                <div className="text-[11px] text-white/30 font-mono mb-1">{formattedDate}</div>
                <div className="text-[13px] text-white font-light mb-1 truncate">
                  {task.task}
                </div>
                <div className="text-[11px] text-white/30 font-mono">
                  {task.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}