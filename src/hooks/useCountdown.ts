import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Returns null when no valid target date is available, so callers can hide the UI. */
export function useCountdown(target?: string): Countdown | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!target || now === null) return null;
  const targetTime = new Date(target).getTime();
  if (Number.isNaN(targetTime)) return null;

  const diff = Math.max(0, targetTime - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
