'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    id: 1,
    type: 'cover',
    tag: 'ARCHIVE_001',
    title: '系统升级与历史的代偿',
    subtitle: '新中国工业化进程中的<br>两次阵痛与原始资本积累',
    image: '/images/presentation/cover-grid.jpg',
    imageAlt: '高压电网'
  },
  {
    id: 2,
    type: 'normal',
    tag: 'CONTEXT',
    title: '基建奇迹背后的<br>"<span class="highlight">能量守恒</span>"',
    text: '宏观经济系统升级中的内部代偿。<br><br>作为一个一穷二白起步的农业国，<br>"<span class="keyword">第一桶金</span>"从何而来？',
    image: '/images/presentation/high-speed-rail.jpg',
    imageAlt: '高铁基建'
  },
  {
    id: 3,
    type: 'normal',
    tag: 'PHASE_I // 1950s',
    title: '从零启动的<br><span class="highlight">重工业底座</span>',
    text: '建国初面临生存压力，<br>在没有外资的情况下，<br>系统只能依靠<span class="keyword">内部资源转移</span><br>完成资本积累。',
    image: '/images/presentation/anshan-steel.jpg',
    imageAlt: '鞍钢高炉'
  },
  {
    id: 4,
    type: 'normal',
    tag: 'MECHANISM_I',
    title: '"<span class="highlight">工农业剪刀差</span>"',
    text: '压低农产品收购价，抬高工业品销售价。<br><br>几亿农民用<span class="keyword">最低的生存线</span>，<br>为共和国挤出了重工业底座。',
    image: '/images/presentation/scissors-gap-chart.jpg',
    imageAlt: '剪刀差图表'
  },
  {
    id: 5,
    type: 'normal',
    tag: 'PHASE_II // 1990s',
    title: '系统臃肿与<br><span class="highlight">市场化出清</span>',
    text: '90年代初，早期工业系统僵化，<br>国企大面积亏损，<br>国家财政<span class="keyword">濒临崩溃</span>。',
    image: '/images/presentation/abandoned-factory.jpg',
    imageAlt: '废弃工厂'
  },
  {
    id: 6,
    type: 'normal',
    tag: 'MECHANISM_II',
    title: '"<span class="highlight">抓大放小</span>"与沉没成本',
    text: '为了保住核心命脉，剥离低效资产。<br><br>几千万产业工人失去体制庇护，<br>替国家承担了转型的巨大<span class="keyword">改革成本</span>。',
    image: '/images/presentation/layoff-chart.jpg',
    imageAlt: '下岗数据'
  },
  {
    id: 7,
    type: 'summary',
    tag: 'EPILOGUE',
    title: '致敬沉默的基石',
    text: '农民的<span class="keyword">剪刀差</span>成全了工业化，<br>工人的<span class="keyword">下岗潮</span>成全了市场化。<br><br>真正的唯物史观，<br>是不回避残酷，并对历史基石保持敬意。'
  }
];

const totalSlides = slides.length;

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<string | null>(null);

  const updateSlide = useCallback((newSlide: number, direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExitDirection(direction === 'next' ? 'left' : 'right');

    setTimeout(() => {
      setCurrentSlide(newSlide);
      setExitDirection(null);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 450);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides && !isAnimating) {
      updateSlide(currentSlide + 1, 'next');
    }
  }, [currentSlide, isAnimating, updateSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1 && !isAnimating) {
      updateSlide(currentSlide - 1, 'prev');
    }
  }, [currentSlide, isAnimating, updateSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(1);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(totalSlides);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const progress = (currentSlide / totalSlides) * 100;
  const currentSlideData = slides.find(s => s.id === currentSlide)!;
  const prevSlideData = exitDirection ? slides.find(s => s.id === (exitDirection === 'left' ? currentSlide - 1 : currentSlide + 1)) : null;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .presentation-page {
          --bg-primary: #1a1a1a;
          --bg-secondary: #181818;
          --text-primary: #e8e8e8;
          --text-secondary: #888888;
          --accent: #8b0000;
          --border: #333333;
          
          margin: 0;
          padding: 0;
          font-family: 'Noto Sans SC', sans-serif;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          overflow: hidden;
          height: 100vh;
          width: 100vw;
        }
        
        .presentation-page .vignette-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%);
        }
        
        .presentation-page .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #0a0a0a;
          opacity: 0;
          pointer-events: none;
          z-index: 50;
          transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .presentation-page .transition-overlay.active {
          opacity: 1;
        }
        
        .presentation-page .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background-color: var(--accent);
          transition: width 0.3s ease;
          z-index: 1000;
        }
        
        .presentation-page .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          visibility: hidden;
          padding: 60px 80px;
          transform: scale(1.02);
          filter: grayscale(30%);
        }
        
        .presentation-page .slide.active {
          visibility: visible;
          opacity: 1;
          transform: scale(1);
          filter: grayscale(0%);
          transition: 
            opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1),
            transform 1.1s cubic-bezier(0.4, 0, 0.2, 1),
            filter 1.3s cubic-bezier(0.4, 0, 0.2, 1),
            visibility 0s 0s;
        }
        
        .presentation-page .slide.exit-left {
          opacity: 0;
          transform: translateX(-8%) scale(0.98);
          filter: grayscale(50%) brightness(0.8);
          transition: 
            opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.9s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            visibility 0s 0.9s;
          visibility: hidden;
        }
        
        .presentation-page .slide.exit-right {
          opacity: 0;
          transform: translateX(8%) scale(0.98);
          filter: grayscale(50%) brightness(0.8);
          transition: 
            opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.9s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            visibility 0s 0.9s;
          visibility: hidden;
        }
        
        .presentation-page .slide-content,
        .presentation-page .slide-image {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .presentation-page .slide.active .slide-image {
          opacity: 1;
          transform: translateY(0);
          transition: 
            opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s,
            transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }
        
        .presentation-page .slide.active .slide-content {
          opacity: 1;
          transform: translateY(0);
          transition: 
            opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s,
            transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
        }
        
        .presentation-page .slide-number {
          position: absolute;
          bottom: 40px;
          right: 80px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: var(--text-secondary);
          letter-spacing: 2px;
        }
        
        .presentation-page .slide-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        
        .presentation-page .slide-image {
          flex: 0 0 60%;
          height: 75%;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        
        .presentation-page .slide-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 50%);
          z-index: 1;
          pointer-events: none;
        }
        
        .presentation-page .slide-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(30%) contrast(1.05);
        }
        
        .presentation-page .slide-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 30px;
        }
        
        .presentation-page .slide-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          letter-spacing: 3px;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
          display: inline-block;
        }
        
        .presentation-page .slide-title {
          font-size: 46px;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 30px;
          letter-spacing: -1px;
        }
        
        .presentation-page .slide-title :global(.highlight) {
          color: var(--accent);
          position: relative;
        }
        
        .presentation-page .slide-title :global(.highlight)::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--accent);
          opacity: 0.5;
        }
        
        .presentation-page .slide-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 19px;
          line-height: 1.9;
          color: var(--text-secondary);
        }
        
        .presentation-page .slide-text :global(.keyword) {
          color: var(--accent);
          font-weight: 500;
        }
        
        .presentation-page .slide-cover .slide-container {
          flex-direction: column;
          gap: 40px;
        }
        
        .presentation-page .slide-cover .slide-image {
          width: 100%;
          height: 45vh;
          flex: none;
          border: none;
          border-bottom: 1px solid var(--border);
        }
        
        .presentation-page .slide-cover .slide-content {
          padding: 0;
          align-items: center;
          text-align: center;
        }
        
        .presentation-page .slide-cover .slide-title {
          font-size: 60px;
          margin-bottom: 20px;
        }
        
        .presentation-page .slide-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 20px;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 700px;
        }
        
        .presentation-page .slide-summary {
          background: linear-gradient(135deg, var(--bg-secondary) 0%, #0d0d0d 100%);
        }
        
        .presentation-page .slide-summary .slide-content {
          align-items: center;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          padding: 0;
        }
        
        .presentation-page .slide-summary .slide-title {
          font-size: 52px;
          margin-bottom: 40px;
        }
        
        .presentation-page .slide-summary .slide-text {
          font-size: 22px;
          line-height: 2;
          text-align: center;
        }
        
        .presentation-page .slide-summary .slide-container {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .presentation-page .nav-controls {
          position: fixed;
          bottom: 40px;
          left: 80px;
          display: flex;
          gap: 20px;
          z-index: 1000;
        }
        
        .presentation-page .nav-btn {
          width: 48px;
          height: 48px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 22px;
        }
        
        .presentation-page .nav-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
        
        .presentation-page .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .presentation-page .nav-btn:disabled:hover {
          border-color: var(--border);
          color: var(--text-secondary);
        }
        
        .presentation-page .keyboard-hint {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 1px;
          opacity: 0.5;
        }
        
        .presentation-page .divider {
          width: 60px;
          height: 1px;
          background-color: var(--accent);
          margin: 20px 0;
        }
        
        .presentation-page .quote-mark {
          font-size: 90px;
          color: var(--accent);
          opacity: 0.2;
          line-height: 0;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .presentation-page .slide {
            padding: 20px;
          }
          .presentation-page .slide-container {
            flex-direction: column;
            gap: 20px;
          }
          .presentation-page .slide-image {
            flex: none;
            width: 100%;
            height: 40%;
          }
          .presentation-page .slide-content {
            padding: 0;
          }
          .presentation-page .slide-title {
            font-size: 28px;
          }
          .presentation-page .slide-text {
            font-size: 14px;
          }
          .presentation-page .slide-cover .slide-title {
            font-size: 36px;
          }
          .presentation-page .slide-number {
            right: 20px;
            bottom: 20px;
          }
          .presentation-page .nav-controls {
            left: 20px;
            bottom: 20px;
          }
          .presentation-page .keyboard-hint {
            display: none;
          }
        }
      `}</style>
      
      <div className="presentation-page">
        <div className="vignette-overlay"></div>
        <div className={`transition-overlay ${isAnimating ? 'active' : ''}`}></div>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        
        {slides.map((slide) => (
          <section
            key={slide.id}
            className={`slide ${slide.type === 'cover' ? 'slide-cover' : ''} ${slide.type === 'summary' ? 'slide-summary' : ''} ${currentSlide === slide.id ? 'active' : ''} ${exitDirection === 'left' && slide.id === currentSlide - 1 ? 'exit-left' : ''} ${exitDirection === 'right' && slide.id === currentSlide + 1 ? 'exit-right' : ''}`}
          >
            <div className="slide-container">
              {slide.image && (
                <div className="slide-image">
                  <img src={slide.image} alt={slide.imageAlt || ''} />
                </div>
              )}
              <div className="slide-content">
                <div className="slide-tag">{slide.tag}</div>
                {slide.type === 'summary' && <div className="quote-mark">"</div>}
                <h2 className="slide-title" dangerouslySetInnerHTML={{ __html: slide.title }}></h2>
                {slide.type === 'cover' && slide.subtitle && (
                  <>
                    <div className="divider"></div>
                    <p className="slide-subtitle" dangerouslySetInnerHTML={{ __html: slide.subtitle }}></p>
                  </>
                )}
                {slide.text && (
                  <p className="slide-text" dangerouslySetInnerHTML={{ __html: slide.text }}></p>
                )}
              </div>
            </div>
            <div className="slide-number">{String(slide.id).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</div>
          </section>
        ))}

        <div className="nav-controls">
          <button className="nav-btn" onClick={prevSlide} disabled={currentSlide === 1}>◀</button>
          <button className="nav-btn" onClick={nextSlide} disabled={currentSlide === totalSlides}>▶</button>
        </div>

        <div className="keyboard-hint">[ ← ] [ → ] 或 [ SPACE ] 翻页</div>
      </div>
    </>
  );
}