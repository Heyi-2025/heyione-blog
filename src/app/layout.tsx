import type { Metadata } from "next";
import "./globals.css";

// 暂时移除 next/font/google 以解决 Turbopack 兼容性问题
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

export const metadata: Metadata = {
  title: "Heyi-blog",
  description: "这是一个关于 AI、编程与硬件实验的个人空间",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
