import CyberpunkLayout from "@/components/CyberpunkLayout";
import Link from "next/link";

export default function ArticlePage() {
  const articles = [
    {
      title: 'Next.js + Airtable 打造动态计划看板：一次 Claude Code 辅助开发的极客实践',
      excerpt: '最近在折腾我的个人网站 heyione.com，希望能建立一个"动态计划板块"。这次尝试了最硬核的 AI 辅助开发工具——Claude Code。',
      tag: 'Next.js',
      tagColor: 'cyan',
      date: '2026/02/26',
      readTime: '8 min'
    },
    {
      title: '深入理解 React 18 并发渲染：从 Suspense 到 Transitions',
      excerpt: '探索 React 18 带来的并发特性，了解如何利用 Suspense 和 Transitions 优化用户体验。',
      tag: 'React',
      tagColor: 'green',
      date: '2026/02/20',
      readTime: '12 min'
    },
    {
      title: 'STM32 嵌入式开发入门：从环境搭建到第一个项目',
      excerpt: '手把手教你搭建 STM32 开发环境，完成第一个 LED 闪烁项目。',
      tag: 'Embedded',
      tagColor: 'purple',
      date: '2026/02/15',
      readTime: '15 min'
    },
    {
      title: 'Tailwind CSS 高级技巧：打造赛博朋克风格界面',
      excerpt: '使用 Tailwind CSS 实现毛玻璃、霓虹发光、动态渐变等高级视觉效果。',
      tag: 'CSS',
      tagColor: 'pink',
      date: '2026/02/10',
      readTime: '10 min'
    },
    {
      title: 'AI 辅助编程实战：如何让 Claude Code 成为你的编程伙伴',
      excerpt: '分享使用 AI 编程工具的最佳实践，提高开发效率的同时保持代码质量。',
      tag: 'AI',
      tagColor: 'cyan',
      date: '2026/02/05',
      readTime: '6 min'
    },
  ];

  return (
    <CyberpunkLayout>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">TOTAL ARTICLES</div>
          <div className="stat-value">12</div>
          <div className="stat-unit">POSTS</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">CATEGORIES</div>
          <div className="stat-value">5</div>
          <div className="stat-unit">TOPICS</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">TOTAL READS</div>
          <div className="stat-value">1.2K</div>
          <div className="stat-unit">VIEWS</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">AVG READ</div>
          <div className="stat-value">8</div>
          <div className="stat-unit">MINUTES</div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" className="btn">
          <span>←</span> BACK TO HOME
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
        <div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">ALL ARTICLES</div>
              <div className="card-badge">TECH BLOG</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {articles.map((article, index) => (
                <article 
                  key={index} 
                  style={{ 
                    padding: '1.5rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      flexShrink: 0
                    }}>
                      {article.tagColor === 'cyan' ? '⚡' : 
                       article.tagColor === 'green' ? '◈' : 
                       article.tagColor === 'purple' ? '◆' : '◉'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className={`article-tag ${article.tagColor}`}>{article.tag}</span>
                      <h3 style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: '0.75rem 0 0.5rem',
                        lineHeight: 1.4
                      }}>
                        {article.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: '0.75rem'
                      }}>
                        {article.excerpt}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)'
                      }}>
                        <span>{article.date}</span>
                        <span>{article.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">CATEGORIES</div>
              <div className="card-badge">FILTER</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { name: 'Next.js', count: 4, color: 'cyan' },
                { name: 'React', count: 3, color: 'green' },
                { name: 'Embedded', count: 2, color: 'purple' },
                { name: 'CSS', count: 2, color: 'pink' },
                { name: 'AI', count: 1, color: 'yellow' },
              ].map((cat, i) => (
                <div 
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: `var(--neon-${cat.color})` }}>
                    {cat.name}
                  </span>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.7rem', 
                    color: 'var(--text-muted)',
                    background: 'var(--bg-tertiary)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">TAGS</div>
              <div className="card-badge">CLOUD</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['TypeScript', 'JavaScript', 'React', 'Next.js', 'STM32', 'Embedded', 'Tailwind', 'CSS', 'Node.js', 'Python', 'AI', 'Claude'].map((tag, i) => (
                <span 
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '0.4rem 0.8rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CyberpunkLayout>
  );
}