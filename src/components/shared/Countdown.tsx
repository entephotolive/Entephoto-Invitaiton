"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  date: string;
  time: string;
}

export default function Countdown({
  date,
  time,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!date || !time) return;

    const targetDate = new Date(`${date}T${time}`);

    const interval = setInterval(() => {
      const now = new Date();

      const difference =
        targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        clearInterval(interval);
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-5xl font-bold text-rose-500">
          {timeLeft.days}
        </h3>

        <p className="mt-2 text-zinc-500">
          Days
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-5xl font-bold text-rose-500">
          {timeLeft.hours}
        </h3>

        <p className="mt-2 text-zinc-500">
          Hours
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-5xl font-bold text-rose-500">
          {timeLeft.minutes}
        </h3>

        <p className="mt-2 text-zinc-500">
          Minutes
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-5xl font-bold text-rose-500">
          {timeLeft.seconds}
        </h3>

        <p className="mt-2 text-zinc-500">
          Seconds
        </p>
      </div>

    </div>
  );
}