"use client";

import { useBuilder } from "@/context/BuilderContext";

export default function WeddingTemplate() {
  const { eventData } = useBuilder();

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <section
        className="h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: eventData.heroImage
            ? `url(${eventData.heroImage})`
            : "none",
        }} 
      >
        <div className="bg-black/50 text-white p-8 rounded-xl text-center">
          <h1 className="text-5xl font-bold">
            {eventData.title || "Your Event Title"}
          </h1>

          <p className="mt-3 text-lg">
            Hosted by {eventData.host || "Host Name"}
          </p>
        </div>
      </section>

      {/* DETAILS */}
      <section className="p-10 text-center">
        <h2 className="text-3xl font-bold">
          Event Details
        </h2>

        <p className="mt-4">
          {eventData.date || "Choose a date"}
        </p>

        <p>
          {eventData.venue || "Choose a venue"}
        </p>

        <p className="max-w-2xl mx-auto mt-6">
          {eventData.description ||
            "Write your event description"}
        </p>
      </section>

      {/* ENTE PHOTO */}
      <section className="p-10 text-center bg-zinc-100">
        <h2 className="text-3xl font-bold">
          Share Memories
        </h2>

        <a
          href={eventData.entePhotoLink || "#"}
          target="_blank"
          className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg"
        >
          Open Ente Album
        </a>
      </section>

    </div>
  );
}