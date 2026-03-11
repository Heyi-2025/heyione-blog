import CyberpunkLayout from "@/components/CyberpunkLayout";
import Link from "next/link";

export default function Home() {
  const projects = [
    { 
      href: '/study', 
      icon: '$', 
      label: 'Study', 
      desc: '学习路径 · STM32 · 前端开发 · AI实验', 
      color: 'cyan' 
    },
    { 
      href: '/fitness', 
      icon: '#', 
      label: 'Fitness', 
      desc: '训练计划 · 健身记录 · 进度追踪', 
      color: 'green' 
    },
    { 
      href: '/goals', 
      icon: '◎', 
      label: 'Goals', 
      desc: '目标规划 · 里程碑 · 进度追踪', 
      color: 'purple' 
    },
    { 
      href: '/article', 
      icon: '◉', 
      label: 'Article', 
      desc: '技术文章 · 实践记录 · 经验分享', 
      color: 'pink' 
    },
  ];

  const articles = [
    {
      title: 'Next.js + Airtable 打造动态计划看板：一次 Claude Code 辅助开发的极客实践',
      excerpt: '记录如何使用 Claude Code 从零搭建动态计划看板，实现 Airtable 数据互通...',
      tag: 'Next.js',
      tagColor: 'cyan',
      date: '2026/02/26',
      readTime: '8 min'
    },
    {
      title: '深入理解 React 18 并发渲染：从 Suspense 到 Transitions',
      excerpt: '探索 React 18 带来的并发特性，了解如何利用 Suspense 和 Transitions 优化用户体验...',
      tag: 'React',
      tagColor: 'green',
      date: '2026/02/20',
      readTime: '12 min'
    },
    {
      title: 'STM32 嵌入式开发入门：从环境搭建到第一个项目',
      excerpt: '手把手教你搭建 STM32 开发环境，完成第一个 LED 闪烁项目...',
      tag: 'Embedded',
      tagColor: 'purple',
      date: '2026/02/15',
      readTime: '15 min'
    },
    {
      title: 'Tailwind CSS 高级技巧：打造赛博朋克风格界面',
      excerpt: '使用 Tailwind CSS 实现毛玻璃、霓虹发光、动态渐变等高级视觉效果...',
      tag: 'CSS',
      tagColor: 'pink',
      date: '2026/02/10',
      readTime: '10 min'
    },
    {
      title: 'AI 辅助编程实战：如何让 Claude Code 成为你的编程伙伴',
      excerpt: '分享使用 AI 编程工具的最佳实践，提高开发效率的同时保持代码质量...',
      tag: 'AI',
      tagColor: 'cyan',
      date: '2026/02/05',
      readTime: '6 min'
    },
    {
      title: 'TypeScript 类型体操：从入门到进阶',
      excerpt: '掌握 TypeScript 高级类型技巧，写出更安全、更优雅的代码...',
      tag: 'TypeScript',
      tagColor: 'green',
      date: '2026/01/28',
      readTime: '18 min'
    },
  ];

  return (
    <CyberpunkLayout>
      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        {/* Left: Articles */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-header">
              <div className="card-title">LATEST ARTICLES</div>
              <div className="card-badge">TECH BLOG</div>
            </div>
            <div className="article-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {articles.slice(0, 4).map((article, index) => (
                <Link key={index} href="/article" className="article-card">
                  <div className="article-cover">
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '3rem',
                      opacity: 0.3
                    }}>
                      {article.tagColor === 'cyan' ? '⚡' : 
                       article.tagColor === 'green' ? '◈' : 
                       article.tagColor === 'purple' ? '◆' : '◉'}
                    </div>
                  </div>
                  <div className="article-body">
                    <span className={`article-tag ${article.tagColor}`}>{article.tag}</span>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-meta">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* More Articles */}
          <div className="article-grid" style={{ marginTop: '1rem' }}>
            {articles.slice(4).map((article, index) => (
              <Link key={index} href="/article" className="article-card">
                <div className="article-cover">
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '3rem',
                    opacity: 0.3
                  }}>
                    {article.tagColor === 'cyan' ? '⚡' : 
                     article.tagColor === 'green' ? '◈' : '◉'}
                  </div>
                </div>
                <div className="article-body">
                  <span className={`article-tag ${article.tagColor}`}>{article.tag}</span>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* About Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">ABOUT ME</div>
              <div className="card-badge">PROFILE</div>
            </div>
            <div className="about-section" style={{ gridTemplateColumns: '1fr' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="about-avatar" style={{ margin: '0 auto 1rem' }}>
                  <div className="about-avatar-inner">👨‍💻</div>
                </div>
                <h2 style={{ fontSize: '1.2rem' }}>Heyi</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  全栈开发者 · 硬件爱好者
                </p>
                <p style={{ fontSize: '0.85rem', textAlign: 'left' }}>
                  AI、编程与硬件实验的个人空间。专注于 Web 开发、嵌入式系统以及 AI 应用实践。
                </p>
              </div>
            </div>
            <div className="social-links" style={{ marginTop: '1rem', justifyContent: 'center' }}>
              <a href="https://github.com/Heyi-2025" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>🐙</span> GitHub
              </a>
              <a href="https://x.com/HeyiBuilds" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>🐦</span> X
              </a>
              <a href="https://www.douyin.com/user/MS4wLjABAAAA1NcZ-glkeSQy0PJ4j4ZrjGcrKeFRf_FzbFayFyKc4gw" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>🎵</span> 抖音
              </a>
            </div>
          </div>

          {/* Projects Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">PROJECTS</div>
              <div className="card-badge">NAVIGATION</div>
            </div>
            <div className="project-grid" style={{ gridTemplateColumns: '1fr' }}>
              {projects.map((project, index) => (
                <Link key={index} href={project.href} className={`project-card ${project.color}`}>
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-title">{project.label}</div>
                  <div className="project-desc">{project.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Skills Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">TECH STACK</div>
              <div className="card-badge">SKILLS</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'STM32', 'Tailwind', 'Git'].map((skill, i) => (
                <span 
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '0.4rem 0.8rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CyberpunkLayout>
  );
}