"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface Wish {
  name: string;
  message: string;
}

export default function WishesSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [wishes, setWishes] = useState<Wish[]>([
    {
      name: "Sarah",
      message:
        "Wishing you both a lifetime of happiness and love ❤️",
    },
    {
      name: "Michael",
      message:
        "Congratulations on your beautiful journey together.",
    },
  ]);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !message) return;

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
    <section className="py-24 bg-[#fffaf7]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-rose-500 uppercase tracking-[4px] mb-3">
            Blessings
          </p>

          <h2 className="text-5xl font-serif">
            Guest Wishes
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Form */}

          <div
            className="
              bg-white
              rounded-[32px]
              border
              p-8
              shadow-sm
            "
          >
            <h3 className="text-2xl font-serif mb-6">
              Leave A Wish
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />

              <textarea
                rows={5}
                placeholder="Write Your Wishes..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />

              <button
                type="submit"
                className="
                  bg-rose-500
                  hover:bg-rose-600
                  text-white
                  px-8
                  py-3
                  rounded-full
                "
              >
                Send Wish
              </button>
            </form>
          </div>

          {/* Wishes */}

          <div className="space-y-5">

            {wishes.map(
              (wish, index) => (
                <div
                  key={index}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    p-6
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Heart
                      className="
                        text-rose-500
                      "
                      size={18}
                    />

                    <span className="font-medium">
                      {wish.name}
                    </span>
                  </div>

                  <p className="text-zinc-600">
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