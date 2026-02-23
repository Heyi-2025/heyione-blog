"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2025-02-23T00:00:00");

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} 天`);
  parts.push(`${String(hours).padStart(2, "0")} 时`);
  parts.push(`${String(minutes).padStart(2, "0")} 分`);
  parts.push(`${String(seconds).padStart(2, "0")} 秒`);

  return parts.join(" ");
}

export default function LaunchTimer() {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - LAUNCH_DATE.getTime();
      setDuration(formatDuration(Math.max(0, diff)));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{duration}</span>;
}
