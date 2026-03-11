'use client';

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
  const categoryStyles = {
    '健身': {
      gradient: 'linear-gradient(90deg, #ae81ff, #9b59b6)',
      border: '#ae81ff',
      text: '#ae81ff',
      bg: 'rgba(174, 129, 255, 0.1)',
      glow: '0 0 20px rgba(174, 129, 255, 0.3)',
    },
    '学习': {
      gradient: 'linear-gradient(90deg, #007acc, #00d4ff)',
      border: '#00d4ff',
      text: '#00d4ff',
      bg: 'rgba(0, 212, 255, 0.1)',
      glow: '0 0 20px rgba(0, 122, 204, 0.3)',
    },
  };

  const style = categoryStyles[category];

  return (
    <div
      className="task-card relative p-8 border transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: status ? style.border : '#3c3c3c',
        background: '#1a1a1a',
        opacity: status ? 0.7 : 1,
        borderRadius: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = style.border;
        e.currentTarget.style.boxShadow = style.glow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = status ? style.border : '#3c3c3c';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* 顶部渐变条 */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: '3px',
          background: style.gradient,
        }}
      />

      {/* 状态指示器 */}
      <div className="absolute top-8 right-8 flex items-center gap-4">
        <span 
          className="text-[13px] font-mono"
          style={{ color: status ? '#858585' : '#cccccc' }}
        >
          {status ? 'Complete' : 'Pending'}
        </span>
        <div
          className="w-5 h-5 border-2"
          style={{
            background: status ? style.text : 'transparent',
            borderColor: style.text,
            boxShadow: status ? `0 0 10px ${style.text}` : 'none',
          }}
        />
      </div>

      {/* 日期 */}
      <div 
        className="text-[12px] mb-4 font-mono"
        style={{ color: '#858585' }}
      >
        {date}
      </div>

      {/* 分类标签 */}
      <div 
        className="inline-block px-3 py-1 text-[11px] border mb-4 font-mono uppercase tracking-wider"
        style={{
          borderColor: style.border,
          color: style.text,
          background: style.bg,
        }}
      >
        {category}
      </div>

      {/* 任务内容 */}
      <h3 
        className="text-[16px] font-light leading-relaxed mb-4 font-mono"
        style={{ color: status ? '#858585' : '#ffffff' }}
      >
        {task}
      </h3>

      {/* 媒体图片 */}
      {media && (
        <div 
          className="mt-6 overflow-hidden border"
          style={{ borderColor: '#3c3c3c' }}
        >
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