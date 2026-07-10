"use client";

import { WeddingEventData } from "@/types/event";

interface Props {
  eventData: WeddingEventData;
}

export default function Footer({
  eventData,
}: Props) {
  return (
    <footer
      className="
        py-24
        bg-[#faf7f4]
      "
    >
      <div
        className="
          max-w-4xl
          mx-auto
          px-6
          text-center
        "
      >
        {/* Couple Names */}

        <h2
          className="
            font-script
            text-6xl
            md:text-8xl
            text-[#d68b95]
            leading-tight
          "
        >
          {eventData.brideName || "Sophia"}

          <span className="mx-8 md:mx-12">
            &
          </span>

          {eventData.groomName || "Julian"}
        </h2>

        {/* Subtitle */}

        <p
          className="
            mt-6
            text-sm
            md:text-base
            tracking-[4px]
            uppercase
            text-[#8b7c78]
          "
        >
          With all our love, forever and always.
        </p>

        {/* Divider */}

        <div
          className="
            w-16
            h-px
            bg-[#e6d8d3]
            mx-auto
            my-8
          "
        />

        {/* Copyright */}

        <p
          className="
            text-[11px]
            md:text-xs
            tracking-[2px]
            uppercase
            text-[#b8aaa6]
          "
        >
          © {new Date().getFullYear()}{" "}
          {eventData.brideName || "Sophia"} &{" "}
          {eventData.groomName || "Julian"}.
          Designed with care.
        </p>

        {/* Website Link */}

        <div className="mt-4">
          <a
            href="https://entephoto.co.inb"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-[11px]
              md:text-xs
              tracking-[3px]
              uppercase
              text-[#b8aaa6]
              hover:text-[#d68b95]
              transition-all
              duration-300
            "
          >
            www.entephoto.co.in
          </a>
        </div>
      </div>
    </footer>
  );
}