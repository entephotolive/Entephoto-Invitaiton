"use client";

import { useState } from "react";
import { WeddingEventData } from "@/types/event";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";

interface Props {
  eventData: WeddingEventData;
}

export default function Wishes({
  eventData,
}: Props) {
  const [name, setName] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [wishes, setWishes] =
    useState(
      eventData.wishes || []
    );

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !message.trim()
    )
      return;

    setWishes([
      {
        name,
        message,
      },
      ...wishes,
    ]);

    setName("");
    setMessage("");
  };

  return (
    <section
      id="wishes"
      className="
      py-32
      bg-[#0A0A0A]
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
          className="text-center mb-20"
        >
          <p
            className="
            uppercase
            tracking-[6px]
            text-[#D4AF37]
            text-sm
            "
          >
            Blessings
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
            Guest Wishes
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

        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          "
        >
          {/* Form */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
            bg-white/5
            backdrop-blur-xl

            border
            border-[#D4AF37]/10

            rounded-[36px]

            p-8
            "
          >
            <h3
              className="
              text-white
              text-3xl
              font-serif
              mb-8
              "
            >
              Leave Your Wishes
            </h3>

            <form
              onSubmit={handleSubmit}
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

                bg-black/30

                border
                border-[#D4AF37]/10

                rounded-2xl

                px-5
                py-4

                text-white
                "
              />

              <textarea
                rows={5}
                placeholder="Write your wishes..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                className="
                w-full

                bg-black/30

                border
                border-[#D4AF37]/10

                rounded-2xl

                px-5
                py-4

                text-white

                resize-none
                "
              />

              <button
                type="submit"
                className="
                w-full

                py-4

                rounded-full

                bg-[#D4AF37]

                text-black

                font-semibold

                flex
                items-center
                justify-center
                gap-2
                "
              >
                <Send size={18} />
                Submit Wish
              </button>
            </form>
          </motion.div>

          {/* Wishes List */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
            space-y-6

            max-h-[700px]
            overflow-y-auto
            "
          >
            {wishes.length === 0 && (
              <div
                className="
                bg-white/5

                backdrop-blur-xl

                border
                border-[#D4AF37]/10

                rounded-[32px]

                p-8

                text-center
                text-neutral-400
                "
              >
                No wishes yet.
              </div>
            )}

            {wishes.map(
              (wish, index) => (
                <div
                  key={index}
                  className="
                  bg-white/5

                  backdrop-blur-xl

                  border
                  border-[#D4AF37]/10

                  rounded-[32px]

                  p-8
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
                      text-[#D4AF37]
                      "
                    />

                    <span
                      className="
                      text-white
                      font-medium
                      "
                    >
                      {wish.name}
                    </span>
                  </div>

                  <p
                    className="
                    text-neutral-400
                    leading-8
                    "
                  >
                    {wish.message}
                  </p>
                </div>
              )
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}