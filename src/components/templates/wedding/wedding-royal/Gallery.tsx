"use client";

import { WeddingEventData } from "@/types/event";
import {
  MapPin,
  Navigation,
  Car,
} from "lucide-react";

interface Props {
  eventData: WeddingEventData;
}

export default function RoyalVenue({
  eventData,
}: Props) {
  return (
    <section
      id="venue"
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
            Location
          </p>

          <h2
            className="
            mt-4
            text-5xl
            md:text-6xl
            font-serif
            "
          >
            Wedding Venue
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
          gap-10
          "
        >
          {/* Left Card */}

          <div
            className="
            bg-white
            rounded-[36px]
            p-10
            shadow-xl
            "
          >
            <div
              className="
              w-16
              h-16
              rounded-full
              bg-[#FCF4E4]
              flex
              items-center
              justify-center
              mb-8
              "
            >
              <MapPin
                size={28}
                className="text-[#B38728]"
              />
            </div>

            <h3
              className="
              text-4xl
              font-serif
              mb-6
              "
            >
              {eventData.venue ||
                "Royal Palace"}
            </h3>

            <p
              className="
              text-neutral-600
              leading-8
              "
            >
              {eventData.address ||
                "Venue address"}
            </p>

            {eventData.mapLink && (
              <a
                href={eventData.mapLink}
                target="_blank"
                rel="noreferrer"
                className="
                inline-flex
                items-center
                gap-3
                mt-10
                px-8
                py-4
                rounded-full
                bg-[#B38728]
                text-white
                hover:opacity-90
                transition
                "
              >
                <Navigation size={18} />

                Open Maps
              </a>
            )}
          </div>

          {/* Right Card */}

          <div
            className="
            bg-white
            rounded-[36px]
            p-10
            shadow-xl
            "
          >
            <div
              className="
              w-16
              h-16
              rounded-full
              bg-[#FCF4E4]
              flex
              items-center
              justify-center
              mb-8
              "
            >
              <Car
                size={28}
                className="text-[#B38728]"
              />
            </div>

            <h3
              className="
              text-3xl
              font-serif
              mb-8
              "
            >
              Travel Information
            </h3>

            <div className="space-y-6">

              <div>
                <h4
                  className="
                  font-medium
                  text-[#B38728]
                  mb-2
                  "
                >
                  Parking
                </h4>

                <p className="text-neutral-600">
                  Complimentary parking
                  available for all guests.
                </p>
              </div>

              <div>
                <h4
                  className="
                  font-medium
                  text-[#B38728]
                  mb-2
                  "
                >
                  Arrival Time
                </h4>

                <p className="text-neutral-600">
                  Please arrive at least
                  30 minutes before the
                  ceremony begins.
                </p>
              </div>

              <div>
                <h4
                  className="
                  font-medium
                  text-[#B38728]
                  mb-2
                  "
                >
                  Dress Code
                </h4>

                <p className="text-neutral-600">
                  Formal / Black Tie
                  Preferred.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}