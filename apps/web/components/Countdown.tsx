"use client";

import { useEffect, useState } from "react";
import { MOTIVATIONAL_PHRASES } from "@/lib/constants";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const diff = endOfDay.getTime() - now.getTime();

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    totalMinutes: Math.floor(diff / 60000),
  };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [phrase, setPhrase] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setTime(getTimeLeft());
    setPhrase(MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)]);
    setDateLabel(formatDate());
    setGreeting(getGreeting());

    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const urgency =
    !time || time.totalMinutes > 180
      ? "text-orange-300"
      : time.totalMinutes > 60
      ? "text-orange-400"
      : "text-red-500";

  return (
    <div className="text-center py-10 px-6">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
        {dateLabel}
      </p>
      <h1 className="text-2xl font-semibold text-zinc-200 mb-6">{greeting}</h1>

      <div className="mb-2">
        <span
          className={`text-7xl font-bold tabular-nums tracking-tight ${urgency}`}
          style={{ textShadow: "0 0 40px rgba(251,146,60,0.35)" }}
        >
          {time ? (
            <>
              {String(time.hours).padStart(2, "0")}
              <span className="animate-pulse">:</span>
              {String(time.minutes).padStart(2, "0")}
              <span className="animate-pulse">:</span>
              {String(time.seconds).padStart(2, "0")}
            </>
          ) : (
            "00:00:00"
          )}
        </span>
      </div>

      <p className="text-xs text-zinc-600 mb-1">hours left today</p>
      <p className="text-sm text-zinc-500 italic mt-3">&ldquo;{phrase}&rdquo;</p>
    </div>
  );
}
