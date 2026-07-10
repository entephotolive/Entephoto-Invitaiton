"use client";

import { WeddingEventData } from "@/types/event";

interface Props {
  eventData: WeddingEventData;
}

export default function RoyalVenueSection({
  eventData,
}: Props) {
  return (
    <section
      id="venue"
      className="py-32"
    >
      <div className="max-w-4xl mx-auto text-center px-6">

        <p className="uppercase tracking-[6px] text-[#C5A880]">
          Location
        </p>

        <h2 className="text-6xl font-serif mt-4 mb-10">
          Wedding Venue
        </h2>

        <h3 className="text-3xl font-serif">
          {eventData.venue}
        </h3>

        <p className="mt-4 text-zinc-600">
          {eventData.address}
        </p>

        {eventData.mapLink && (
          <a
            href={eventData.mapLink}
            target="_blank"
            rel="noreferrer"
            className="
              inline-block
              mt-10
              px-8
              py-4
              rounded-full
              bg-[#C5A880]
              text-white
            "
          >
            View On Maps
          </a>
        )}

      </div>
    </section>
  );
}