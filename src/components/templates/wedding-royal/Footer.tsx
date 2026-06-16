"use client";

import { EventData } from "@/types/event";

interface Props {
  eventData: EventData;
}

export default function RoyalFooter({
  eventData,
}: Props) {
 

  const scrollToSection = (
    href: string
  ) => {
    const section =
      document.querySelector(href);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer
      className="
      bg-[#111111]
      text-white
      py-24
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >
        {/* Logo */}

        <div className="text-center">

         

          <h2
            className="
            mt-6
            text-3xl
            md:text-5xl
            font-serif
            "
          >
            {eventData.brideName ||
              "Bride"}

            <span
              className="
              mx-6
              text-[#D4AF37]
              "
            >
              &
            </span>

            {eventData.groomName ||
              "Groom"}
          </h2>

          <p
            className="
            mt-6
            text-neutral-400
            "
          >
            Thank you for being part of
            our special day.
          </p>

        </div>

        {/* Divider */}

        <div
          className="
          w-full
          h-px
          bg-white/10
          my-16
          "
        />

        {/* Navigation */}

       
        {/* Divider */}

        

        {/* Bottom */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
          "
        >
          <p
            className="
            text-neutral-500
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
          </p>

          <a
            href="https://entephoto.live"
            target="_blank"
            rel="noreferrer"
            className="
            text-[#D4AF37]
            hover:underline
            "
          >
            www.entephoto.live
          </a>
        </div>

      </div>
    </footer>
  );
}