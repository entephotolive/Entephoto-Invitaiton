"use client";

import { WeddingEventData } from "@/types/event";

interface Props {
  eventData: WeddingEventData;
}

export default function GallerySection({
  eventData,
}: Props) {
  if (!eventData.gallery?.length) {
    return null;
  }

  return (
    <section id="gallery" className="py-24 bg-[#fffaf7]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-rose-500 uppercase tracking-[4px] mb-3">
            Memories
          </p>

          <h2 className="text-5xl font-heading">
            Gallery
          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {eventData.gallery.map(
            (image, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-3xl
                  shadow-sm
                  bg-white
                  group
                "
              >
                <img
                  src={image}
                  alt=""
                  className="
                    w-full
                    h-[350px]
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-110
                  "
                />
              </div>
            )
          )}
        </div>

      </div>
    </section>
  );
}