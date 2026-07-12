"use client";

import { WeddingEventData } from "@/types/event";
import { ChevronDown } from "lucide-react";

interface Props {
  eventData: WeddingEventData;
}

export default function RoyalHero({
  eventData,
}: Props) {
  const scrollToStory = () => {
    const story =
      document.getElementById("story");

    if (!story) return;

    story.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="
      relative
      min-h-screen
      overflow-hidden
      flex
      items-center
      justify-center
      "
    >
      {/* Background Image */}

      {eventData.heroImage ? (
        <img
          src={eventData.heroImage}
          alt=""
          className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          "
        />
      ) : (
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#1e1a16]
          via-[#2a241f]
          to-[#0f0d0b]
          "
        />
      )}

      {/* Overlay */}

      <div
        className="
        absolute
        inset-0
        bg-black/50
        "
      />

      {/* Decorative Glow */}

      <div
        className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[600px]
        h-[600px]
        rounded-full
        bg-[#D4AF37]/10
        blur-[120px]
        "
      />

      {/* Content */}

      <div
        className="
        relative
        z-10
        text-center
        text-white
        px-6
        "
      >
        {/* Save The Date */}

        <p
          className="
          uppercase
          tracking-[8px]
          text-[#D4AF37]
          text-xs
          md:text-sm
          mb-8
          "
        >
          Save The Date
        </p>

        {/* Names */}

        <h1
          className="
          font-serif
          text-6xl
          md:text-8xl
          lg:text-[120px]
          leading-none
          "
        >
          {eventData.brideName ||
            "Adriaan"}
        </h1>

        <div
          className="
          my-6
          text-[#D4AF37]
          text-3xl
          "
        >
          &
        </div>

        <h1
          className="
          font-serif
          text-6xl
          md:text-8xl
          lg:text-[120px]
          leading-none
          "
        >
          {eventData.groomName ||
            "Eleanor"}
        </h1>

        {/* Divider */}

        <div
          className="
          w-32
          h-px
          bg-[#D4AF37]
          mx-auto
          my-10
          "
        />

        {/* Date */}

        <p
          className="
          uppercase
          tracking-[6px]
          text-sm
          text-[#F5E7B2]
          "
        >
          {eventData.date ||
            "December 28, 2026"}
        </p>

        {/* Time */}

        <p
          className="
          mt-3
          text-lg
          text-white/80
          "
        >
          {eventData.time ||
            "06:00 PM"}
        </p>

        {/* Venue */}

        <p
          className="
          mt-6
          text-lg
          md:text-xl
          text-white/90
          "
        >
          {eventData.venue ||
            "Royal Palace"}
        </p>

        {/* Buttons */}

        <div
          className="
          mt-12
          flex
          flex-col
          sm:flex-row
          gap-4
          justify-center
          "
        >
          <button
            onClick={() => {
              const rsvp =
                document.getElementById(
                  "rsvp"
                );

              rsvp?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="
            px-8
            py-4
            rounded-full
            bg-[#D4AF37]
            text-black
            font-medium
            hover:scale-105
            transition
            "
          >
            RSVP Now
          </button>

          {eventData.mapLink && (
            <a
              href={eventData.mapLink}
              target="_blank"
              rel="noreferrer"
              className="
              px-8
              py-4
              rounded-full
              border
              border-[#D4AF37]
              text-white
              hover:bg-[#D4AF37]
              hover:text-black
              transition
              "
            >
              View Venue
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}

      <button
        onClick={scrollToStory}
        className="
        absolute
        bottom-10
        left-1/2
        -translate-x-1/2
        text-white
        animate-bounce
        "
      >
        <ChevronDown size={34} />
      </button>
    </section>
  );
}