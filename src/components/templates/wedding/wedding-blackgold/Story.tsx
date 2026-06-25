"use client";

import { EventData } from "@/types/event";
import { motion } from "framer-motion";

interface Props {
  eventData: EventData;
}

export default function Story({
  eventData,
}: Props) {
  if (
    !eventData.loveStory ||
    eventData.loveStory.length === 0
  ) {
    return null;
  }

  return (
    <section
      id="story"
      className="
      py-32
      bg-[#151515]
      scroll-mt-32
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

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
            Our Journey
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
            Our Love Story
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

        <div className="relative">

          <div
            className="
            hidden
            lg:block
            absolute
            left-1/2
            top-0
            bottom-0
            w-px
            bg-[#D4AF37]/20
            -translate-x-1/2
            "
          />

          {eventData.loveStory.map(
            (story, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                }}
                className={`
                  relative
                  grid
                  lg:grid-cols-2
                  gap-12
                  items-center
                  mb-28

                  ${
                    index % 2 !== 0
                      ? "lg:[&>*:first-child]:order-2"
                      : ""
                  }
                `}
              >
                {/* Gold Dot */}

                <div
                  className="
                  hidden
                  lg:block

                  absolute
                  left-1/2
                  top-1/2

                  w-5
                  h-5

                  rounded-full

                  bg-[#D4AF37]

                  -translate-x-1/2
                  -translate-y-1/2

                  border-4
                  border-[#151515]
                  "
                />

                {/* Image */}

                <div>
                  {story.image ? (
                    <div
                      className="
                      overflow-hidden
                      rounded-[32px]
                      border
                      border-[#D4AF37]/10
                      "
                    >
                      <img
                        src={story.image}
                        alt=""
                        className="
                        w-full
                        h-[500px]
                        object-cover

                        hover:scale-105
                        transition
                        duration-700
                        "
                      />
                    </div>
                  ) : (
                    <div
                      className="
                      h-[500px]
                      rounded-[32px]
                      bg-white/5
                      border
                      border-[#D4AF37]/10
                      "
                    />
                  )}
                </div>

                {/* Content */}

                <div
                  className="
                  bg-white/5
                  backdrop-blur-xl

                  border
                  border-[#D4AF37]/10

                  rounded-[32px]

                  p-10
                  "
                >
                  <p
                    className="
                    uppercase
                    tracking-[4px]
                    text-[#D4AF37]
                    text-xs
                    "
                  >
                    {story.subtitle}
                  </p>

                  <h3
                    className="
                    mt-4
                    text-4xl
                    font-serif
                    text-white
                    "
                  >
                    {story.title}
                  </h3>

                  <p
                    className="
                    mt-6
                    text-neutral-400
                    leading-8
                    "
                  >
                    {story.description}
                  </p>
                </div>

              </motion.div>
            )
          )}
        </div>

      </div>
    </section>
  );
}