"use client";

import { EventData } from "@/types/event";

interface Props {
  eventData: EventData;
}

export default function ScheduleSection({
  eventData,
}: Props) {
  return (
    <section
      id="schedule"
      className="py-24 bg-[#faf7f4]"
    >
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="font-heading text-5xl text-center mb-16">
          Wedding Schedule
        </h2>

        <div className="space-y-8">

          {eventData.schedule.map(
            (item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                "
              >
                <div className="text-rose-500 text-xl font-semibold">
                  {item.time}
                </div>

                <h3 className="text-3xl font-heading mt-2">
                  {item.title}
                </h3>

                <p className="text-zinc-600 mt-3">
                  {item.description}
                </p>
              </div>
            )
          )}

        </div>

      </div>
    </section>
  );
}