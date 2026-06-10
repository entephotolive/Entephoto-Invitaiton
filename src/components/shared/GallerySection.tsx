"use client";

import { useBuilder } from "@/context/BuilderContext";

export default function GallerySection() {
  const { eventData } = useBuilder();

  if (!eventData.gallery?.length) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-center text-4xl font-serif mb-12">
          Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {eventData.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="
                w-full
                h-72
                object-cover
                rounded-3xl
              "
            />
          ))}

        </div>

      </div>
    </section>
  );
}