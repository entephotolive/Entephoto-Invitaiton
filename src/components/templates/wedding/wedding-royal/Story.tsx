"use client";

import { EventData } from "@/types/event";

interface Props {
  eventData: EventData;
}

export default function RoyalStory({
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
      bg-white
      "
    >
      <div
        className="
        max-w-6xl
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
            Our Journey
          </p>

          <h2
            className="
            mt-4
            text-5xl
            md:text-6xl
            font-serif
            "
          >
            Love Story
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

        {/* Timeline */}

        <div className="relative">

          {/* Center Line */}

          <div
            className="
            hidden
            md:block
            absolute
            left-1/2
            top-0
            bottom-0
            w-px
            bg-[#D4AF37]/30
            -translate-x-1/2
            "
          />

          {eventData.loveStory.map(
            (story, index) => (
              <div
                key={index}
                className={`
                  relative
                  grid
                  md:grid-cols-2
                  gap-12
                  items-center
                  mb-24

                  ${
                    index % 2 === 0
                      ? ""
                      : "md:[&>*:first-child]:order-2"
                  }
                `}
              >
                {/* Timeline Dot */}

                <div
                  className="
                  hidden
                  md:block
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-5
                  h-5
                  rounded-full
                  bg-[#B38728]
                  border-4
                  border-white
                  shadow-lg
                  "
                />

                {/* Image */}

                <div>
                  {story.image ? (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="
                      w-full
                      h-[450px]
                      object-cover
                      rounded-[32px]
                      shadow-xl
                      "
                    />
                  ) : (
                    <div
                      className="
                      w-full
                      h-[450px]
                      rounded-[32px]
                      bg-[#F7F2EA]
                      "
                    />
                  )}
                </div>

                {/* Content */}

                <div
                  className={`
                  ${
                    index % 2 === 0
                      ? "md:pl-12"
                      : "md:pr-12"
                  }
                `}
                >
                  <p
                    className="
                    uppercase
                    tracking-[4px]
                    text-[#B38728]
                    text-xs
                    "
                  >
                    {story.subtitle}
                  </p>

                  <h3
                    className="
                    mt-4
                    text-4xl
                    md:text-5xl
                    font-serif
                    "
                  >
                    {story.title}
                  </h3>

                  <p
                    className="
                    mt-6
                    text-neutral-600
                    leading-8
                    "
                  >
                    {story.description}
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
