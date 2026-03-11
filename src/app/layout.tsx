import type { Metadata } from "next";
import "./globals.css";
import ClientCursor from "@/components/ClientCursor";

export const metadata: Metadata = {
  title: "Heyi.Blog | Personal Dashboard",
  description: "AI、编程与硬件实验的个人空间",
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
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ClientCursor />
      </body>
    </html>
  );
}