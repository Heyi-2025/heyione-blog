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
    '健身': 'border-violet-400 text-violet-400 bg-violet-400/5',
    '学习': 'border-cyan-400 text-cyan-400 bg-cyan-400/5',
  };

  return (
    <div
      key={id}
      className={`
        relative p-6 border-2 rounded-lg transition-all duration-300
        ${status
          ? 'border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20'
          : 'border-white/10 bg-white/5 hover:bg-white/10'
        }
      `}
    >
      {/* 完成状态图标 */}
      {status && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* 日期 */}
      <div className="text-[11px] text-white/40 mb-3">{date}</div>

      {/* 分类标签 */}
      <div className={`inline-block px-3 py-1 rounded-full text-xs border mb-3 ${categoryColors[category]}`}>
        {category}
      </div>

      {/* 任务内容 */}
      <h3 className={`text-base font-light leading-relaxed ${status ? 'text-white/80' : 'text-white'}`}>
        {task}
      </h3>

      {/* 媒体图片 */}
      {media && (
        <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
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