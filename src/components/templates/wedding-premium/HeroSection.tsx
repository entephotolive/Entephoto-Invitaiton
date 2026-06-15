"use client";

import { EventData } from "@/types/event";

interface Props {
  eventData: EventData;
}

export default function HeroSection({
  eventData,
}: Props) {
  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            eventData.heroImage ||
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920"
          })`,
        }}
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}

      <div className="relative z-10 text-center px-6 max-w-4xl">

        <p
          className="
            uppercase
            tracking-[6px]
            text-white/80
            text-sm
            mb-4
          "
        >
          Save The Date
        </p>

        <h1
          className="
            text-white
            text-7xl
            md:text-[120px]
            leading-none
            font-script
            mb-4
          "
        >
          {eventData.brideName || "Sophia"}

          <span className="mx-4">&</span>

          {eventData.groomName || "Julian"}
        </h1>

        <p
          className="
            text-white/90
            text-lg
            md:text-2xl
            mb-8
          "
        >
          Together With Their Families
        </p>

        <div
          className="
            inline-block
            border
            border-white/30
            backdrop-blur-md
            bg-white/10
            rounded-full
            px-8
            py-4
          "
        >
          <p className="text-white text-xl">
            {eventData.date || "June 19, 2027"}
          </p>

          <p className="text-white/80 text-sm mt-1">
            {eventData.time || "04:00 PM"}
          </p>
        </div>

        <div className="mt-10">
          <a
            href="#rsvp"
            className="
              inline-block
              bg-rose-500
              hover:bg-rose-600
              text-white
              px-8
              py-4
              rounded-full
              transition
            "
          >
            RSVP NOW
          </a>
        </div>

      </div>
    </section>
  );
}