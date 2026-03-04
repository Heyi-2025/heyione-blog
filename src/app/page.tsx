import VSCodeLayout from "@/components/VSCodeLayout";
import Link from "next/link";

export default function Home() {
  const menuItems = [
    { href: '/study', icon: '$', label: 'Study', desc: '学习路径 · STM32 · 前端开发 · AI实验', color: 'blue' },
    { href: '/fitness', icon: '#', label: 'Fitness', desc: '训练计划 · 健身记录 · 进度追踪', color: 'green' },
    { href: '/plans', icon: '✓', label: 'Plans', desc: '任务看板 · 每日目标 · 计划管理', color: 'purple' },
    { href: '/article', icon: '📝', label: 'Article', desc: '技术文章 · 实践记录 · 经验分享', color: 'orange' },
  ];

  return (
    <VSCodeLayout>
      <div className="home-container">
        {/* Header */}
        <div className="mb-6">
          <p className="text-gray-400">// AI、编程与硬件实验的个人空间</p>
        </div>

        {/* Links */}
        <div className="menu-list">
          <div className="menu-label">📁 projects</div>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="menu-item">
              <span className={`menu-icon icon-${item.color}`}>{item.icon}</span>
              <span className="menu-label-text">{item.label}</span>
              <span className="menu-desc">{item.desc}</span>
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="menu-list mt-8">
          <div className="menu-label">🔗 social</div>
          <div className="social-row">
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

        {/* Footer */}
        <div className="footer-text mt-8">
          <span className="text-gray-600">heyibuilds © 2026</span>
        </div>
      </div>
    </VSCodeLayout>
  );
}
