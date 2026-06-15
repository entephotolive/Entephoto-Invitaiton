"use client";

import { MapPin, Navigation } from "lucide-react";
import { EventData } from "@/types/event";

interface Props {
  eventData: EventData;
}

export default function VenueSection({
  eventData,
}: Props) {
  return (
    <section id="venue" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-rose-500 uppercase tracking-[4px] mb-3">
            Location
          </p>

          <h2 className="text-5xl font-heading">
            Wedding Venue
          </h2>

        </div>

        <div
          className="
            bg-[#fffaf7]
            rounded-[32px]
            border
            p-10
            text-center
            shadow-sm
          "
        >
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-rose-100
              flex
              items-center
              justify-center
            "
          >
            <MapPin
              className="text-rose-500"
              size={36}
            />
          </div>

          <h3
            className="
              text-3xl
              font-serif
              mt-6
            "
          >
            {eventData.venue ||
              "Wedding Venue"}
          </h3>

          <p
            className="
              mt-4
              text-zinc-600
              max-w-2xl
              mx-auto
            "
          >
            {eventData.address ||
              "Venue Address"}
          </p>

          {eventData.mapLink && (
            <a
              href={eventData.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                bg-rose-500
                hover:bg-rose-600
                text-white
                px-8
                py-4
                rounded-full
                transition
              "
            >
              <Navigation size={18} />
              Open In Google Maps
            </a>
          )}
        </div>

      </div>
    </section>
  );
}