"use client";

import { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function CountdownSection({ eventData }: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  return (
    <section className="py-24 bg-[#1a1817]">
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