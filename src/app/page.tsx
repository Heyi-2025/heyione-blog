import LaunchTimer from "@/components/LaunchTimer";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <main className="flex flex-col items-center justify-center gap-12 px-8 text-center">
        <h1 className="text-2xl font-light text-white tracking-wide">
          马年大吉 · 万事如意 · 龙马精神
        </h1>
        <p className="max-w-sm text-sm text-white/70 leading-relaxed">
          这是一个关于 AI、编程与硬件实验的个人空间
        </p>
        <p className="text-sm text-white/60 tracking-widest uppercase">
          网站装修中
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/Heyi-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-4 py-2 text-xs text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://x.com/HeyiBuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-4 py-2 text-xs text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            X
          </a>
          <a
            href="https://www.douyin.com/user/MS4wLjABAAAA1NcZ-glkeSQy0PJ4j4ZrjGcrKeFRf_FzbFayFyKc4gw"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-4 py-2 text-xs text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            抖音
          </a>
        </div>
        <p className="text-xs text-white/40">
          已运营 <LaunchTimer />
        </p>
        <p className="text-xs text-white/40">@heyibuilds</p>
      </main>
    </div>
  );
}
