"use client";

import { useEffect, useState } from "react";
import { EventData } from "@/types/event";

interface Props {
  eventData: EventData;
}

export default function CountdownSection({
  eventData,
}: Props) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!eventData.date) return;

    const target = new Date(
      `${eventData.date} ${eventData.time || "00:00"}`
    ).getTime();

    const interval = setInterval(() => {
      const now = Date.now();

      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(
          diff / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (diff / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (diff / 1000) % 60
        ),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [eventData.date, eventData.time]);

  return (
    <section className="py-24 bg-[#fffaf7]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-serif mb-4">
          Countdown
        </h2>

        <p className="text-zinc-500 mb-12">
          Counting down to our special day
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <CountdownCard
            value={timeLeft.days}
            label="Days"
          />

          <CountdownCard
            value={timeLeft.hours}
            label="Hours"
          />

          <CountdownCard
            value={timeLeft.minutes}
            label="Minutes"
          />

          <CountdownCard
            value={timeLeft.seconds}
            label="Seconds"
          />

        </div>

      </div>
    </section>
  );
}

function CountdownCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        p-8
      "
    >
      <h3 className="text-5xl font-bold text-rose-500">
        {value}
      </h3>

      <p className="mt-2 text-zinc-500">
        {label}
      </p>
    </div>
  );
}