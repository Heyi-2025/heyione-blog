import LaunchTimer from "@/components/LaunchTimer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-hidden fade-in">
      <main className="relative max-w-5xl mx-auto px-8 py-24">
        {/* Header */}
        <header className="mb-32">
          <div className="mb-8">
            <span className="text-[11px] tracking-[0.4em] text-white/40 uppercase">
              Developer Blog
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
            <span className="text-white">Heyi</span>
            <span className="text-white/20 mx-4">/</span>
            <span className="text-white/60">Builds</span>
          </h1>
          <p className="text-base md:text-lg text-white/40 max-w-2xl leading-relaxed font-light">
            这是一个关于 AI、编程与硬件实验的个人空间
          </p>
          <nav className="flex flex-wrap gap-3 mt-12">
            <a
              href="https://github.com/Heyi-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="noir-button magnetic-target"
            >
              GitHub
            </a>
            <a
              href="https://x.com/HeyiBuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="noir-button magnetic-target"
            >
              X
            </a>
            <a
              href="https://www.douyin.com/user/MS4wLjABAAAA1NcZ-glkeSQy0PJ4j4ZrjGcrKeFRf_FzbFayFyKc4gw"
              target="_blank"
              rel="noopener noreferrer"
              className="noir-button magnetic-target"
            >
              抖音
            </a>
          </nav>
        </header>

        {/* Main sections */}
        <section className="grid md:grid-cols-2 gap-6 mb-32">
          <Link
            href="/study"
            className="group block p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 magnetic-target"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/80 text-base font-light">
                $
              </span>
              <h2 className="text-2xl font-light text-white group-hover:text-white/90 transition-colors">
                Study
              </h2>
            </div>
            <p className="text-[14px] text-white/40 leading-relaxed font-light">
              Learning paths, STM32, front-end development, and AI experiments
            </p>
            <div className="mt-6 flex items-center gap-2 text-[12px] text-white/30 group-hover:text-white/50 transition-colors">
              <span>cd study</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/fitness"
            className="group block p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 magnetic-target"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/80 text-base font-light">
                #
              </span>
              <h2 className="text-2xl font-light text-white group-hover:text-white/90 transition-colors">
                Fitness
              </h2>
            </div>
            <p className="text-[14px] text-white/40 leading-relaxed font-light">
              Training schedules, workout logs, and progress tracking
            </p>
            <div className="mt-6 flex items-center gap-2 text-[12px] text-white/30 group-hover:text-white/50 transition-colors">
              <span>cd fitness</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </section>

        {/* Featured section */}
        <section className="border-t border-white/10 pt-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-px bg-white/30"></span>
            <h3 className="text-[14px] text-white/40 font-light tracking-wider uppercase">
              最新动态
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 magnetic-target">
              <div className="text-[11px] text-white/30 mb-3">2026年2月24日</div>
              <h4 className="text-[16px] text-white font-light mb-2">网站重构</h4>
              <p className="text-[13px] text-white/40">使用 Next.js 构建极简主义开发者博客</p>
            </div>
            <div className="p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 magnetic-target">
              <div className="text-[11px] text-white/30 mb-3">2026年2月23日</div>
              <h4 className="text-[16px] text-white font-light mb-2">Airtable集成</h4>
              <p className="text-[13px] text-white/40">连接任务管理系统，实现实时同步</p>
            </div>
            <div className="p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 magnetic-target">
              <div className="text-[11px] text-white/30 mb-3">2026年2月22日</div>
              <h4 className="text-[16px] text-white font-light mb-2">UI/UX设计</h4>
              <p className="text-[13px] text-white/40">探索黑色美学与流畅交互体验</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-white/30">
              <LaunchTimer /> uptime
            </p>
            <p className="text-[12px] text-white/20 font-light">
              @heyibuilds 2026
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
