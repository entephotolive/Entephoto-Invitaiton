"use client";

import { WeddingEventData } from "@/types/event";
import {
  Heart,
} from "lucide-react";

interface Props {
  eventData: WeddingEventData;
}

export default function Footer({
  eventData,
}: Props) {
  return (
    <footer
      className="
      relative
      overflow-hidden

      bg-[#0A0A0A]

      border-t
      border-[#D4AF37]/10

      py-24
      "
    >
      {/* Gold Glow */}

      <div
        className="
        absolute
        inset-0

        bg-gradient-to-t
        from-[#D4AF37]/5
        via-transparent
        to-transparent
        "
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Couple Names */}

        <div className="text-center">

         

          <h2
            className="
            mt-8

            text-white

            text-4xl
            md:text-6xl

            font-serif
            "
          >
            {eventData.brideName ||
              "Sophia"}

            <span
              className="
              text-[#D4AF37]
              mx-4
              "
            >
              &
            </span>

            {eventData.groomName ||
              "Sebastian"}
          </h2>

          <p
            className="
            mt-6

            text-neutral-400

            max-w-2xl
            mx-auto
            "
          >
            Thank you for being part of
            our beautiful journey and
            celebrating this special day
            with us.
          </p>

        </div>

        {/* Divider */}

        <div
          className="
          w-full
          h-px

          bg-[#D4AF37]/10

          my-16
          "
        />

        {/* Socials */}

       

        {/* EntePhoto */}

        <div className="text-center mt-16">

          <p
            className="
            text-neutral-500
            "
          >
            Crafted with
            <Heart
              size={14}
              className="
              inline
              mx-2
              text-[#D4AF37]
              "
            />
            by
          </p>

          <a
            href="https://entephoto.live"
            target="_blank"
            rel="noreferrer"
            className="
            mt-2
            inline-block

            text-[#D4AF37]

            text-lg
            font-medium

            hover:underline
            "
          >
            EntePhoto.live
          </a>

        </div>

        {/* Copyright */}

        <div
          className="
          text-center

          mt-12

          text-neutral-600
          text-sm
          "
        >
          © {new Date().getFullYear()}
          {" "}
          {eventData.brideName ||
            "Bride"}
          {" & "}
          {eventData.groomName ||
            "Groom"}

          . All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}