"use client";

import { WeddingEventData } from "@/types/event";
import { Clock } from "lucide-react";

interface Props {
  eventData: WeddingEventData;
}

export default function RoyalSchedule({
  eventData,
}: Props) {
  if (
    !eventData.schedule ||
    eventData.schedule.length === 0
  ) {
    return null;
  }

  return (
    <section
      id="schedule"
      className="
      py-32
      bg-[#FCFBF7]
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >
        {/* Heading */}

        <div className="text-center mb-24">

          <p
            className="
            uppercase
            tracking-[6px]
            text-[#B38728]
            text-sm
            "
          >
            Wedding Day
          </p>

          <h2
            className="
            mt-4
            text-5xl
            md:text-6xl
            font-serif
            "
          >
            Celebration Schedule
          </h2>

          <div
            className="
            w-24
            h-px
            bg-[#B38728]
            mx-auto
            mt-8
            "
          />

        </div>

        {/* Cards */}

        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >
          {eventData.schedule.map(
            (item, index) => (
              <div
                key={index}
                className={`
                relative
                rounded-[36px]
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-2

                ${
                  index === 1
                    ? "bg-[#B38728] text-white shadow-2xl scale-[1.03]"
                    : "bg-white border border-[#D4AF37]/20 shadow-lg"
                }
              `}
              >
                {/* Decorative Top */}

                <div
                  className={`
                  h-2
                  ${
                    index === 1
                      ? "bg-white/30"
                      : "bg-[#B38728]"
                  }
                `}
                />

                <div className="p-10">

                  {/* Icon */}

                  <div
                    className={`
                    w-16
                    h-16
                    rounded-full
                    flex
                    items-center
                    justify-center
                    mb-8

                    ${
                      index === 1
                        ? "bg-white/20"
                        : "bg-[#FCF4E4]"
                    }
                  `}
                  >
                    <Clock
                      size={28}
                      className={
                        index === 1
                          ? "text-white"
                          : "text-[#B38728]"
                      }
                    />
                  </div>

                  {/* Title */}

                  <h3
                    className="
                    text-3xl
                    font-serif
                    mb-6
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Time */}

                  <p
                    className={`
                    uppercase
                    tracking-[4px]
                    text-sm
                    mb-6

                    ${
                      index === 1
                        ? "text-white/80"
                        : "text-[#B38728]"
                    }
                  `}
                  >
                    {item.time}
                  </p>

                  {/* Description */}

                  <p
                    className={`
                    leading-8

                    ${
                      index === 1
                        ? "text-white/90"
                        : "text-neutral-600"
                    }
                  `}
                  >
                    {item.description}
                  </p>

                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}