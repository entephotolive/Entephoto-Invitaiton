"use client";

import { Heart } from "lucide-react";
import { EventData } from "@/types/event";

interface Props {
  data: EventData;
}

export default function StorySection({
  data,
}: Props) {
  if (
    !data.loveStory ||
    data.loveStory.length === 0
  ) {
    return null;
  }

  return (
    <section id="story" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">

          <p className="text-rose-500 uppercase tracking-[4px] mb-3">
            Our Journey
          </p>

          <h2 className="text-5xl md:text-6xl font-heading">
            Our Love Story
          </h2>

          <div className="flex justify-center mt-6">
            <Heart
              className="text-rose-400"
              size={28}
            />
          </div>

        </div>

        <div className="relative">

          {/* Center Line */}
          <div
            className="
              hidden md:block
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-[2px]
              h-full
              bg-rose-200
            "
          />

          {data.loveStory.map(
            (story, index) => {
              const isLeft =
                index % 2 === 0;

              return (
                <div
                  key={index}
                  className="
                    grid
                    md:grid-cols-2
                    gap-12
                    mb-20
                    items-center
                  "
                >
                  {isLeft ? (
                    <>
                      {/* Left Side */}
                      <div className="md:text-right">
                        <div className="bg-[#fffaf7] p-8 rounded-3xl shadow-sm">

                          <span className="text-rose-500 font-medium">
                            {story.title}
                          </span>

                          <h3
                            className="
                              text-3xl
                              md:text-4xl
                              font-heading
                              mt-3
                              mb-4
                            "
                          >
                            {story.subtitle}
                          </h3>

                          <p className="text-zinc-600 leading-8">
                            {story.description}
                          </p>

                        </div>
                      </div>

                      {/* Right Image */}
                      <div>
                        {story.image && (
                          <img
                            src={story.image}
                            alt={story.title}
                            className="
                              w-full
                              h-[350px]
                              object-cover
                              rounded-[32px]
                              shadow-lg
                            "
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left Image */}
                      <div>
                        {story.image && (
                          <img
                            src={story.image}
                            alt={story.title}
                            className="
                              w-full
                              h-[350px]
                              object-cover
                              rounded-[32px]
                              shadow-lg
                            "
                          />
                        )}
                      </div>

                      {/* Right Side */}
                      <div>
                        <div className="bg-[#fffaf7] p-8 rounded-3xl shadow-sm">

                          <span className="text-rose-500 font-medium">
                            {story.title}
                          </span>

                          <h3
                            className="
                              text-2xl
                              md:text-4xl
                              font-serif
                              mt-3
                              mb-4
                            "
                          >
                            {story.subtitle}
                          </h3>

                          <p className="text-zinc-600 leading-8">
                            {story.description}
                          </p>

                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            }
          )}

        </div>
      </div>
    </section>
  );
}