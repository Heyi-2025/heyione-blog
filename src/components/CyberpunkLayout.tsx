'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CyberpunkLayoutProps {
  children: React.ReactNode;
}

export default function CyberpunkLayout({ children }: CyberpunkLayoutProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('home');
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'HOME', path: '/', icon: '⌂' },
    { id: 'article', label: 'ARTICLE', path: '/article', icon: '◉' },
    { id: 'study', label: 'STUDY', path: '/study', icon: '◈' },
    { id: 'fitness', label: 'FITNESS', path: '/fitness', icon: '◆' },
    { id: 'goals', label: 'GOALS', path: '/goals', icon: '●' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const currentNav = navItems.find(item => item.path === pathname);
    if (currentNav) {
      setActiveTab(currentNav.id);
    }
  }, [pathname]);

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).toUpperCase();
  };

  return (
    <>
      {/* Background Canvas */}
      <div className="bg-canvas">
        <div className="grid-overlay"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>
      <div className="scanline"></div>

      <div className="dashboard">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="url(#cyberGrad)" strokeWidth="2" fill="none"/>
                <path d="M24 14L34 20V32L24 38L14 32V20L24 14Z" stroke="url(#cyberGrad)" strokeWidth="2" fill="none"/>
                <circle cx="24" cy="24" r="4" fill="url(#cyberGrad)"/>
                <defs>
                  <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00ffff"/>
                    <stop offset="100%" stopColor="#0080ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <h1>HEYI.BLOG</h1>
              <span>PERSONAL DASHBOARD v2.0</span>
            </div>
          </div>
          
          <div className="header-status">
            <div className="status-item">
              <div className="status-dot"></div>
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="status-item">
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
          
          <nav className="nav-links">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={item.path}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-text">© 2026 HEYI.BLOG // ALL SYSTEMS OPERATIONAL</div>
          <div className="footer-links">
            <a href="https://github.com/Heyi-2025" target="_blank" rel="noopener noreferrer" className="footer-link">GITHUB</a>
            <a href="https://x.com/HeyiBuilds" target="_blank" rel="noopener noreferrer" className="footer-link">X</a>
            <a href="#" className="footer-link">CONTACT</a>
          </div>
        </footer>
      </div>
    </>
  );
}