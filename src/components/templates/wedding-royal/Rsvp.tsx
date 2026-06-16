"use client";

import { useState } from "react";
import { EventData } from "@/types/event";
import {
  Heart,
  Users,
  MessageSquare,
} from "lucide-react";

interface Props {
  eventData: EventData;
}

export default function RoyalRSVP({
  eventData,
}: Props) {
  const [name, setName] =
    useState("");

  const [attending, setAttending] =
    useState(true);

  const [guests, setGuests] =
    useState(1);

  const [message, setMessage] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    alert(
      "RSVP Submitted Successfully!"
    );
  };

  return (
    <section
      id="rsvp"
      className="
      py-32
      bg-white
      "
    >
      <div
        className="
        max-w-5xl
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
            Join Us
          </p>

          <h2
            className="
            mt-4
            text-5xl
            md:text-6xl
            font-serif
            "
          >
            RSVP
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

          <p
            className="
            mt-8
            text-neutral-600
            "
          >
            Kindly respond before the
            wedding date.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="
          bg-[#FCFBF7]
          rounded-[40px]
          p-8
          md:p-12
          shadow-xl
          "
        >
          {/* Name */}

          <div className="mb-8">

            <label
              className="
              flex
              items-center
              gap-2
              mb-3
              font-medium
              "
            >
              <Heart
                size={18}
                className="text-[#B38728]"
              />

              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Your Name"
              className="
              w-full
              border
              border-[#D4AF37]/20
              rounded-2xl
              px-5
              py-4
              bg-white
              outline-none
              focus:border-[#B38728]
              "
            />
          </div>

          {/* Attendance */}

          <div className="mb-8">

            <label
              className="
              block
              mb-4
              font-medium
              "
            >
              Attendance
            </label>

            <div
              className="
              flex
              flex-col
              md:flex-row
              gap-4
              "
            >
              <button
                type="button"
                onClick={() =>
                  setAttending(
                    true
                  )
                }
                className={`
                flex-1
                py-4
                rounded-2xl
                border

                ${
                  attending
                    ? "bg-[#B38728] text-white border-[#B38728]"
                    : "bg-white"
                }
              `}
              >
                Attending
              </button>

              <button
                type="button"
                onClick={() =>
                  setAttending(
                    false
                  )
                }
                className={`
                flex-1
                py-4
                rounded-2xl
                border

                ${
                  !attending
                    ? "bg-[#B38728] text-white border-[#B38728]"
                    : "bg-white"
                }
              `}
              >
                Not Attending
              </button>
            </div>

          </div>

          {/* Guests */}

          <div className="mb-8">

            <label
              className="
              flex
              items-center
              gap-2
              mb-3
              font-medium
              "
            >
              <Users
                size={18}
                className="text-[#B38728]"
              />

              Number Of Guests
            </label>

            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) =>
                setGuests(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
              w-full
              border
              border-[#D4AF37]/20
              rounded-2xl
              px-5
              py-4
              bg-white
              "
            />
          </div>

          {/* Message */}

          <div className="mb-10">

            <label
              className="
              flex
              items-center
              gap-2
              mb-3
              font-medium
              "
            >
              <MessageSquare
                size={18}
                className="text-[#B38728]"
              />

              Message
            </label>

            <textarea
              rows={5}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Leave a lovely message..."
              className="
              w-full
              border
              border-[#D4AF37]/20
              rounded-2xl
              px-5
              py-4
              bg-white
              resize-none
              "
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="
            w-full
            py-5
            rounded-full
            bg-[#B38728]
            text-white
            font-medium
            text-lg
            hover:opacity-90
            transition
            "
          >
            Send RSVP
          </button>

        </form>
      </div>
    </section>
  );
}