import VSCodeLayout from "@/components/VSCodeLayout";

export default function ArticlePage() {
  return (
    <VSCodeLayout>
      <article className="max-w-3xl mx-auto">
        <header className="mb-8 border-b-3 border-gray-700 pb-6">
          <h1 className="text-2xl font-mono mb-4 text-white">
            Next.js + Airtable 打造动态计划看板：一次 Claude Code 辅助开发的极客实践
          </h1>
          <div className="text-xs text-gray-500 font-mono">
            <span>Author: Heyi</span> |
            <span className="ml-2">Date: 2026/2/26</span> |
            <span className="ml-2">Site: heyione.com</span>
          </div>
        </header>

        <section className="mb-8">
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            最近在折腾我的个人网站 <code className="text-green-400 bg-gray-900 px-1 py-0.5">heyione.com</code>，希望能建立一个"动态计划板块"。我的诉求很明确：日常在手机端操作 Airtable 记录学习和健身打卡，网站前端自动拉取数据并渲染成带有极客深色风、发光边框的卡片。而且，我希望用 Next.js 的 ISR (revalidate) 模式来保障性能。
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            这次，我没有选择从零手写代码，而是尝试了最硬核的 AI 辅助开发工具——<strong className="text-white">Claude Code</strong>。这篇文章记录了我如何一步步与终端 AI 配合，从配置环境到解决底层 bug 的全过程。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-mono mb-4 text-white border-l-3 border-green-500 pl-4">Step 1: 准备数据源与环境变量</h2>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            首先，在 Airtable 中建立一个名为 <code className="text-green-400 bg-gray-900 px-1 py-0.5">DailyTasks</code> 的表，字段结构设计如下：
          </p>
          <ul className="text-sm text-gray-300 mb-4 space-y-1 ml-4">
            <li className="flex items-center"><span className="text-gray-500 mr-2">•</span><strong className="text-gray-400 mr-2">Date</strong> (日期)</li>
            <li className="flex items-center"><span className="text-gray-500 mr-2">•</span><strong className="text-gray-400 mr-2">Category</strong> (单选：健身、学习)</li>
            <li className="flex items-center"><span className="text-gray-500 mr-2">•</span><strong className="text-gray-400 mr-2">Task</strong> (文本：具体任务)</li>
            <li className="flex items-center"><span className="text-gray-500 mr-2">•</span><strong className="text-gray-400 mr-2">Status</strong> (复选框：是否完成)</li>
            <li className="flex items-center"><span className="text-gray-500 mr-2">•</span><strong className="text-gray-400 mr-2">Media</strong> (附件：打卡图片)</li>
          </ul>
          <p className="text-sm text-gray-300 leading-relaxed">
            为了安全，绝不能在前端硬编码 Token。我在项目根目录创建了 <code className="text-green-400 bg-gray-900 px-1 py-0.5">.env.local</code>，把 <code className="text-green-400 bg-gray-900 px-1 py-0.5">AIRTABLE_PAT</code> 和 <code className="text-green-400 bg-gray-900 px-1 py-0.5">AIRTABLE_BASE_ID</code> 妥善安置。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-mono mb-4 text-white border-l-3 border-green-500 pl-4">Step 2: 驯服终端与 Claude Code</h2>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            在 Windows PowerShell 中启动 Claude Code 时，我遇到了一些"水土不服"的问题：
          </p>
          <ol className="text-sm text-gray-300 mb-4 space-y-2 ml-4">
            <li><strong className="text-gray-400">网络代理问题：</strong>终端默认不走全局代理，导致连接 Anthropic 服务器失败。必须通过 <code className="text-green-400 bg-gray-900 px-1 py-0.5">$env:HTTP_PROXY</code> 手动指定端口。</li>
            <li><strong className="text-gray-400">长文本截断：</strong>Windows 终端的缓冲区限制导致长提示词粘贴不全。</li>
          </ol>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            <strong className="text-white">降维打击方案：</strong>我放弃了在终端里和 AI 废话，直接在根目录新建了一个 <code className="text-green-400 bg-gray-900 px-1 py-0.5">task.txt</code>，把所有背景、Airtable 字段、UI 需求（Tailwind 极客风，完成状态带绿色发光边框）、ISR 300秒刷新等指令写得清清楚楚。
          </p>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            然后在终端里只需发送一句极简指令：
          </p>
          <pre className="bg-gray-950 border-3 border-gray-700 p-4 mb-4 text-xs text-green-400 font-mono overflow-x-auto">
            读取根目录下的 task.txt 文件，并严格执行里面的所有项目指令。
          </pre>
          <p className="text-sm text-gray-300 leading-relaxed">
            看着 Claude 自动跑 <code className="text-green-400 bg-gray-900 px-1 py-0.5">npm install airtable</code>，扫描目录，然后疯狂输出 <code className="text-green-400 bg-gray-900 px-1 py-0.5">src/lib/airtable.ts</code>、<code className="text-green-400 bg-gray-900 px-1 py-0.5">TaskCard.tsx</code> 和 <code className="text-green-400 bg-gray-900 px-1 py-0.5">page.tsx</code>，这种"全自动打工仔"的体验简直太棒了。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-mono mb-4 text-white border-l-3 border-green-500 pl-4">Step 3: 解决本地预览的"死锁"</h2>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            代码写完后，本地预览却翻车了。报错提示 <code className="text-green-400 bg-gray-900 px-1 py-0.5">Port 3000 is in use</code>，紧接着又出现了 <code className="text-green-400 bg-gray-900 px-1 py-0.5">Unable to acquire lock at .next/dev/lock</code>。
          </p>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            这是因为 Claude Code 在后台悄悄拉起了一个进程，而我又在另一个终端运行了 <code className="text-green-400 bg-gray-900 px-1 py-0.5">npm run dev</code>，导致两个进程抢夺 <code className="text-green-400 bg-gray-900 px-1 py-0.5">.next</code> 缓存文件的控制权。
          </p>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            <strong className="text-white">解决办法非常极客：</strong>
          </p>
          <pre className="bg-gray-950 border-3 border-gray-700 p-4 mb-4 text-xs text-green-400 font-mono overflow-x-auto">
            # 1. 杀掉所有相关的终端进程 (Ctrl+C)
            # 2. 强制清理被锁定的 Next.js 缓存
            rm -r -force .next
            # 3. 重新体面地启动
            npm run dev
          </pre>
          <p className="text-sm text-gray-300 leading-relaxed">
            当然，更聪明的做法是直接把这段报错扔回给 Claude，让它自己去跑 <code className="text-green-400 bg-gray-900 px-1 py-0.5">TASKKILL</code> 和清理缓存，实现系统级的自愈。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-mono mb-4 text-white border-l-3 border-green-500 pl-4">Step 4: 路由打通，顺水推舟</h2>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            主页 <code className="text-green-400 bg-gray-900 px-1 py-0.5">/plans</code> 跑通后，图片能正常渲染，打卡完成的任务也亮起了漂亮的绿色发光边框（<code className="text-green-400 bg-gray-900 px-1 py-0.5">border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]</code>）。
          </p>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            趁热打铁，我直接让 Claude 利用已有的逻辑进行路由扩展：
          </p>
          <blockquote className="border-l-3 border-gray-700 pl-4 py-2 mb-4 text-sm text-gray-400 italic">
            "基础功能已跑通。请直接复用 src/lib/airtable.ts 抓取数据，帮我创建 /study 和 /fitness 页面，分别过滤 Category 字段，保持 300 秒 ISR 并使用 TaskCard 组件。"
          </blockquote>
          <p className="text-sm text-gray-300 leading-relaxed">
            不到一分钟，它就搞定了分类页面的生成。至此，我的站点结构与 Airtable 实现了完美的数据互通。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-mono mb-4 text-white border-l-3 border-green-500 pl-4">总结</h2>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            这次开发让我深刻体会到，使用 AI 写代码不仅是"对话"，更是一场"项目管理"。把需求文档化（task.txt），让 AI 拥有读写本地文件的权限，遇到报错直接抛给 AI 诊断，这才是 2026 年独立开发者该有的开发姿势。
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            欢迎来 <a href="http://heyione.com/plans" className="text-green-400 hover:bg-green-900 px-1 py-0.5 transition-colors">heyione.com/plans</a> 看看我的最终成果！
          </p>
        </section>
      </article>
    </VSCodeLayout>
  );
}