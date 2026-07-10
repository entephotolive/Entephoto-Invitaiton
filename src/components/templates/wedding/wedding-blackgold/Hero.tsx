"use client";

import { motion } from "framer-motion";
import { WeddingEventData } from "@/types/event";

interface Props {
  eventData: WeddingEventData;
}

export default function Hero({
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
          bg-[#0A0A0A]
          "
        />
      )}

      {/* Dark Overlay */}

      <div
        className="
        absolute
        inset-0
        bg-black/70
        "
      />

      {/* Gold Glow */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-b
        from-[#D4AF37]/10
        via-transparent
        to-[#D4AF37]/5
        "
      />

      {/* Content */}

      <div
        className="
        relative
        z-10
        text-center
        px-6
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <span
            className="
            inline-block
            px-6
            py-2
            rounded-full
            border
            border-[#D4AF37]
            text-[#D4AF37]
            uppercase
            tracking-[4px]
            text-xs
            mb-8
            "
          >
            You're Invited
          </span>

          <h1
            className="
            text-white
            font-serif
            text-6xl
            md:text-8xl
            lg:text-[110px]
            leading-none
            "
          >
            {eventData.brideName ||
              "Sophia"}
          </h1>

          <div
            className="
            my-6
            text-[#D4AF37]
            text-4xl
            "
          >
            &
          </div>

          <h1
            className="
            text-white
            font-serif
            text-6xl
            md:text-8xl
            lg:text-[110px]
            leading-none
            "
          >
            {eventData.groomName ||
              "Sebastian"}
          </h1>

          <div
            className="
            w-32
            h-px
            bg-[#D4AF37]
            mx-auto
            my-10
            "
          />

          <p
            className="
            text-[#D4AF37]
            uppercase
            tracking-[5px]
            "
          >
            {eventData.date}
          </p>

          <p
            className="
            mt-4
            text-neutral-300
            text-lg
            "
          >
            {eventData.venue}
          </p>

          <button
            className="
            mt-10
            px-10
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
        </motion.div>
      </div>
    </section>
  );
}