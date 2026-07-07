"use client";

import { useEffect, useState } from "react";
import { EventData } from "@/types/event";
import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ eventData }: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const cards = [
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
      bg-[#0A0A0A]
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-center"
        >
          <p
            className="
            uppercase
            tracking-[6px]
            text-[#D4AF37]
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
            text-white
            "
          >
            Until Forever Begins
          </h2>

          <div
            className="
            w-24
            h-px
            bg-[#D4AF37]
            mx-auto
            mt-8
            mb-16
            "
          />
        </motion.div>

        <div
          className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-6
          "
        >
          {cards.map(
            (card, index) => (
              <motion.div
                key={card.label}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="
                bg-white/5
                backdrop-blur-xl

                border
                border-[#D4AF37]/20

                rounded-[32px]

                p-8

                text-center

                hover:border-[#D4AF37]
                transition
                "
              >
                <div
                  className="
                  text-[#D4AF37]
                  text-6xl
                  font-serif
                  "
                >
                  {String(
                    card.value
                  ).padStart(2, "0")}
                </div>

                <p
                  className="
                  mt-4
                  uppercase
                  tracking-[4px]
                  text-neutral-400
                  text-xs
                  "
                >
                  {card.label}
                </p>
              </motion.div>
            )
          )}
        </div>

      </div>
    </section>
  );
}