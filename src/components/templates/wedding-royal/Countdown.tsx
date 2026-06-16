"use client";

import { useEffect, useState } from "react";
import { EventData } from "@/types/event";

interface Props {
  eventData: EventData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function RoyalCountdown({
  eventData,
}: Props) {
  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!eventData.date) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      const targetDate = new Date(
        `${eventData.date} ${eventData.time || "00:00"}`
      );

      const difference =
        targetDate.getTime() -
        new Date().getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(
          difference /
            (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (difference /
            (1000 *
              60 *
              60)) %
            24
        ),

        minutes: Math.floor(
          (difference /
            (1000 * 60)) %
            60
        ),

        seconds: Math.floor(
          (difference / 1000) %
            60
        ),
      };
    };

    setTimeLeft(
      calculateTimeLeft()
    );

    const timer = setInterval(() => {
      setTimeLeft(
        calculateTimeLeft()
      );
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    eventData.date,
    eventData.time,
  ]);

  const countdownItems = [
    {
      label: "Days",
      value: timeLeft.days,
    },
    {
      label: "Hours",
      value: timeLeft.hours,
    },
    {
      label: "Minutes",
      value: timeLeft.minutes,
    },
    {
      label: "Seconds",
      value: timeLeft.seconds,
    },
  ];

  return (
    <section
      className="
      py-32
      bg-[#FCFBF7]
      "
    >
      <div
        className="
        max-w-6xl
        mx-auto
        px-6
        "
      >
        <div className="text-center">

          <p
            className="
            uppercase
            tracking-[6px]
            text-[#B38728]
            text-sm
            "
          >
            Counting Down
          </p>

          <h2
            className="
            mt-4
            text-5xl
            md:text-6xl
            font-serif
            "
          >
            Until We Say
            "I Do"
          </h2>

          <div
            className="
            w-24
            h-px
            bg-[#B38728]
            mx-auto
            mt-8
            mb-16
            "
          />

        </div>

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
          "
        >
          {countdownItems.map(
            (item) => (
              <div
                key={item.label}
                className="
                bg-white
                border
                border-[#D4AF37]/20
                rounded-[32px]
                p-8
                text-center
                shadow-sm
                "
              >
                <div
                  className="
                  text-5xl
                  md:text-6xl
                  font-serif
                  text-[#B38728]
                  "
                >
                  {String(
                    item.value
                  ).padStart(2, "0")}
                </div>

                <p
                  className="
                  mt-4
                  uppercase
                  tracking-[4px]
                  text-xs
                  text-neutral-500
                  "
                >
                  {item.label}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}