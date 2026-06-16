"use client";

import { useState } from "react";
import { EventData } from "@/types/event";
import { Heart } from "lucide-react";

interface Props {
  eventData: EventData;
}

export default function RoyalWishes({
  eventData,
}: Props) {
  const [name, setName] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [localWishes, setLocalWishes] =
    useState(eventData.wishes || []);

  const submitWish = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !message) return;

    setLocalWishes([
      ...localWishes,
      {
        name,
        message,
      },
    ]);

    setName("");
    setMessage("");
  };

  return (
    <section
      id="wishes"
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
            Guest Book
          </p>

          <h2
            className="
            mt-4
            text-5xl
            md:text-6xl
            font-serif
            "
          >
            Wedding Wishes
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

        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          "
        >
          {/* Form */}

          <div
            className="
            bg-white
            rounded-[36px]
            p-10
            shadow-xl
            "
          >
            <h3
              className="
              text-3xl
              font-serif
              mb-8
              "
            >
              Leave Your Wishes
            </h3>

            <form
              onSubmit={submitWish}
              className="space-y-6"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                w-full
                border
                border-[#D4AF37]/20
                rounded-2xl
                px-5
                py-4
                "
              />

              <textarea
                rows={6}
                placeholder="Write your wishes..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                className="
                w-full
                border
                border-[#D4AF37]/20
                rounded-2xl
                px-5
                py-4
                resize-none
                "
              />

              <button
                type="submit"
                className="
                w-full
                py-4
                rounded-full
                bg-[#B38728]
                text-white
                font-medium
                "
              >
                Submit Wish
              </button>
            </form>
          </div>

          {/* Wishes */}

          <div
            className="
            space-y-6
            max-h-[700px]
            overflow-y-auto
            "
          >
            {localWishes.length === 0 && (
              <div
                className="
                bg-white
                rounded-[30px]
                p-8
                shadow-lg
                text-center
                "
              >
                No wishes yet.
              </div>
            )}

            {localWishes.map(
              (wish, index) => (
                <div
                  key={index}
                  className="
                  bg-white
                  rounded-[30px]
                  p-8
                  shadow-lg
                  "
                >
                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    mb-4
                    "
                  >
                    <Heart
                      size={18}
                      className="
                      text-[#B38728]
                      "
                    />

                    <span
                      className="
                      font-medium
                      "
                    >
                      {wish.name}
                    </span>
                  </div>

                  <p
                    className="
                    text-neutral-600
                    leading-8
                    "
                  >
                    {wish.message}
                  </p>
                </div>
              )
            )}
          </div>

        </div>
      </div>
    </section>
  );
}