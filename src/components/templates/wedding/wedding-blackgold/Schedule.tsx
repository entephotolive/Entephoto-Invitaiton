"use client";

import { WeddingEventData } from "@/types/event";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface Props {
  eventData: WeddingEventData;
}

export default function Schedule({
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
        bg-[#0A0A0A]
        scroll-mt-32
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-24"
        >
          <p
            className="
              uppercase
              tracking-[6px]
              text-[#D4AF37]
              text-sm
            "
          >
            Wedding Timeline
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
            Order Of Events
          </h2>

          <div
            className="
              w-24
              h-px
              bg-[#D4AF37]
              mx-auto
              mt-8
            "
          />
        </motion.div>

        {/* Timeline */}

        <div className="space-y-10">

          {eventData.schedule.map(
            (item, index) => (
              <motion.div
                key={index}
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
                transition={{
                  delay: index * 0.15,
                }}
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-[#D4AF37]/10
                  rounded-[30px]
                  p-8

                  hover:border-[#D4AF37]/30
                  transition
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  "
                >
                  <div>
                    <h3
                      className="
                        text-3xl
                        font-serif
                        text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-neutral-400
                        leading-7
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3

                      px-5
                      py-3

                      bg-[#D4AF37]/10
                      border
                      border-[#D4AF37]/20

                      rounded-full

                      text-[#D4AF37]
                    "
                  >
                    <Clock size={18} />

                    <span
                      className="
                        tracking-wider
                        font-medium
                      "
                    >
                      {item.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          )}

        </div>
      </div>
    </section>
  );
}