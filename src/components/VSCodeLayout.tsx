'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface VSCodeLayoutProps {
  children: React.ReactNode;
}

export default function VSCodeLayout({ children }: VSCodeLayoutProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lineColor, setLineColor] = useState('#007AFF');
  const pathname = usePathname();

  // 导航项配置
  const navItems = [
    { id: 'home', label: '首页', path: '/', icon: '🏠' },
    { id: 'article', label: '文章', path: '/article', icon: '📄' },
    { id: 'study', label: '学习路径', path: '/study', icon: '🎓' },
    { id: 'fitness', label: '健身追踪', path: '/fitness', icon: '💪' },
    { id: 'plans', label: '计划看板', path: '/plans', icon: '✓' },
  ];

  // 处理鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 处理滚动进度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 设置活动标签
  useEffect(() => {
    const currentNav = navItems.find(item => item.path === pathname);
    if (currentNav) {
      setActiveTab(currentNav.id);
    }
  }, [pathname]);

  // 处理导航点击
  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
  };

  return (
    <div className="ide-container" style={{ '--line-color': lineColor } as React.CSSProperties}>
      {/* 背景效果层 */}
      <div className="background-grid" />
      <div className="scanline-overlay" />

      {/* 左侧导航栏 - IDE文件树风格 */}
      <nav className="ide-sidebar">
        <div className="ide-sidebar-header">
          <span className="mr-2 accent-text">{'>_'}</span>
          <span>Heyi.blog</span>
        </div>
        
        <div className="ide-sidebar-content">
          {navItems.map(item => (
            <Link
              key={item.id}
              href={item.path}
              className={`ide-sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="ide-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="text-xs text-gray-400 mb-2">线条颜色</div>
          <input
            type="color"
            value={lineColor}
            onChange={(e) => setLineColor(e.target.value)}
            className="w-full h-8 cursor-pointer"
            style={{ border: '1px solid var(--color-border)' }}
          />
        </div>

      </nav>

      {/* 右侧编辑器区域 */}
      <main className="ide-editor">
        {/* 顶部标签栏 */}
        <div className="ide-tabs">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`ide-tab ${activeTab === item.id ? 'active' : ''}`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* 主内容区 */}
        <div className="ide-content">
          <div className="mb-8">
            <div className="electric-divider" />
            <h1 className="text-4xl font-mono mb-4 accent-text typewriter-text">
              {navItems.find(item => item.id === activeTab)?.label || '首页'}
            </h1>
            <div className="electric-divider" />
          </div>
          
          {children}
        </div>

        {/* 底部状态栏 */}
        <div className="ide-statusbar">
          <div className="ide-statusbar-item accent">
            <span>🚀</span>
            <span>Ready</span>
          </div>
          <div className="ide-statusbar-item">
            <span>📊</span>
            <span>{Math.round(scrollProgress)}%</span>
          </div>
          <div className="ide-statusbar-item">
            <span>📍</span>
            <span>{mouseCoords.x}, {mouseCoords.y}</span>
          </div>
          <div className="ide-statusbar-item accent" style={{ marginLeft: 'auto' }}>
            <span>💻</span>
            <span>IDE Mode</span>
          </div>
        </div>
      </main>
    </div>
  );
}
