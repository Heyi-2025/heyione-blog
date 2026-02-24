import Image from 'next/image';

interface TaskCardProps {
  id: string;
  date: string;
  category: '健身' | '学习';
  task: string;
  status: boolean;
  media?: string;
}

export default function TaskCard({ id, date, category, task, status, media }: TaskCardProps) {
  const categoryColors = {
    '健身': 'border-violet-400 text-violet-400 bg-violet-400/10',
    '学习': 'border-cyan-400 text-cyan-400 bg-cyan-400/10',
  };

  const categoryAccents = {
    '健身': 'violet',
    '学习': 'cyan',
  };

  return (
    <div
      key={id}
      className={`
        relative p-8 border rounded-lg transition-all duration-300 magnetic-target
        ${status
          ? 'border-white/20 bg-white/[0.03] opacity-60'
          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
        }
      `}
    >
      {/* 状态指示器 */}
      <div className="absolute top-8 right-8 flex items-center gap-4">
        <span className={`text-[13px] font-mono ${status ? 'text-white/50' : 'text-white/70'}`}>
          {status ? 'Complete' : 'Pending'}
        </span>
        <div
          className={`w-5 h-5 rounded-full border-2 ${
            categoryAccents[category] === 'violet'
              ? 'bg-violet-400 border-violet-400'
              : 'bg-cyan-400 border-cyan-400'
          } ${status ? 'shadow-xl shadow-current scale-110' : 'animate-pulse'}`}
        ></div>
      </div>

      {/* 日期 */}
      <div className="text-[12px] text-white/30 mb-4 font-mono">{date}</div>

      {/* 分类标签 */}
      <div className={`inline-block px-3 py-1 rounded-full text-[11px] border mb-4 font-mono ${categoryColors[category]}`}>
        {category}
      </div>

      {/* 任务内容 */}
      <h3 className={`text-[16px] font-light leading-relaxed mb-4 ${status ? 'text-white/60' : 'text-white'}`}>
        {task}
      </h3>

      {/* 媒体图片 */}
      {media && (
        <div className="mt-6 rounded-lg overflow-hidden border border-white/10">
          <Image
            src={media}
            alt="Task media"
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );
}