import LaunchTimer from "@/components/LaunchTimer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-hidden">
      {/* 背景 */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 left-1/3 w-[480px] h-[480px] bg-cyan-400/12 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[320px] h-[320px] bg-violet-400/12 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060608]" />
      </div>

      <main className="relative max-w-3xl mx-auto px-6 py-20">
        {/* 头部 */}
        <header className="text-center mb-24">
          <p className="text-[11px] tracking-[0.4em] text-cyan-400 uppercase mb-6">
            Heyi Blog
          </p>
          <h1 className="text-3xl md:text-[2.5rem] font-light tracking-tight mb-5">
            <span className="text-white">马年大吉</span>
            <span className="text-white/30 mx-2.5">·</span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              龙马精神
            </span>
          </h1>
          <p className="text-sm text-white/45 max-w-sm mx-auto leading-relaxed">
            这是一个关于 AI、编程与硬件实验的个人空间
          </p>
          <nav className="flex justify-center gap-2 mt-10">
            <a
              href="https://github.com/Heyi-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#060608] transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://x.com/HeyiBuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs border-2 border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-[#060608] transition-colors duration-200"
            >
              X
            </a>
            <a
              href="https://www.douyin.com/user/MS4wLjABAAAA1NcZ-glkeSQy0PJ4j4ZrjGcrKeFRf_FzbFayFyKc4gw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-[#060608] transition-colors duration-200"
            >
              抖音
            </a>
          </nav>
        </header>

        {/* 主板块 */}
        <section className="grid md:grid-cols-2 gap-4 mb-24">
          <Link
            href="/study"
            className="group block p-7 border-2 border-cyan-400/40 bg-cyan-400/5 hover:border-cyan-400 hover:bg-cyan-400/15 transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-sm font-medium">
                学
              </span>
              <h2 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                学习计划
              </h2>
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed">
              记录学习目标、STM32、前端与 AI 的进度
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-400 group-hover:gap-2 transition-all">
              进入
              <span className="group-hover:translate-x-0.5">→</span>
            </span>
          </Link>

          <Link
            href="/fitness"
            className="group block p-7 border-2 border-violet-400/40 bg-violet-400/5 hover:border-violet-400 hover:bg-violet-400/15 transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 border-2 border-violet-400 flex items-center justify-center text-violet-400 text-sm font-medium">
                健
              </span>
              <h2 className="text-lg font-medium text-white group-hover:text-violet-400 transition-colors">
                健身计划
              </h2>
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed">
              追踪训练安排、运动记录与身体状态
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs text-violet-400 group-hover:gap-2 transition-all">
              进入
              <span className="group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        </section>

        {/* 底部 */}
        <footer className="text-center pt-6 border-t-2 border-white/10">
          <p className="text-[11px] text-white/35 mb-0.5">
            已运营 <LaunchTimer />
          </p>
          <p className="text-[11px] text-white/25">@heyibuilds</p>
        </footer>
      </main>
    </div>
  );
}
