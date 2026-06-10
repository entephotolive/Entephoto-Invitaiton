"use client";

import RSVPSection from "@/components/shared/RSVPSection";
import Countdown from "@/components/shared/Countdown";
import WishesSection from "../shared/WishesSection";
import GallerySection from "../shared/GallerySection";
import MusicPlayer from "../shared/MusicPlayer";

import { useBuilder } from "@/context/BuilderContext";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
} from "lucide-react";

export default function WeddingTemplate() {
  const { eventData } = useBuilder();

  return (
    <div className="min-h-screen bg-[#faf7f3]">

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: eventData.heroImage
            ? `url(${eventData.heroImage})`
            : "linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4))",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center text-white px-6">

          <p className="uppercase tracking-[6px] text-sm">
            Wedding Invitation
          </p>

          <h1 className="mt-8 text-5xl md:text-7xl font-serif">
            {eventData.brideName || "Bride"}
          </h1>

          <div className="my-6 text-4xl">
            ❤️
          </div>

          <h1 className="text-5xl md:text-7xl font-serif">
            {eventData.groomName || "Groom"}
          </h1>

          <p className="mt-8 text-lg">
            Together With Their Families
          </p>

        </div>
      </section>

      {/* Details */}
      <section className="py-24 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <Heart className="w-10 h-10 mx-auto text-[#b99863]" />

          <h2 className="mt-6 text-5xl font-serif text-[#43372f]">
            Our Special Day
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white rounded-3xl border p-8 shadow-sm">
              <CalendarDays className="w-10 h-10 mx-auto text-[#b99863]" />

              <h3 className="mt-4 font-semibold">
                Wedding Date
              </h3>

              <p className="mt-2 text-zinc-600">
                {eventData.date || "Select Date"}
              </p>
            </div>

            <div className="bg-white rounded-3xl border p-8 shadow-sm">
              <Clock3 className="w-10 h-10 mx-auto text-[#b99863]" />

              <h3 className="mt-4 font-semibold">
                Wedding Time
              </h3>

              <p className="mt-2 text-zinc-600">
                {eventData.time || "Select Time"}
              </p>
            </div>

            <div className="bg-white rounded-3xl border p-8 shadow-sm">
              <MapPin className="w-10 h-10 mx-auto text-[#b99863]" />

              <h3 className="mt-4 font-semibold">
                Venue
              </h3>

              <p className="mt-2 text-zinc-600">
                {eventData.venue || "Select Venue"}
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Couple Section */}
      <section className="py-24 bg-white">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-serif text-[#43372f]">
            The Happy Couple
          </h2>

          <div className="grid md:grid-cols-2 gap-10 mt-16">

            <div className="bg-[#faf7f3] rounded-3xl p-10 border">
              <h3 className="text-4xl font-serif">
                {eventData.brideName || "Bride"}
              </h3>

              <p className="mt-4 text-zinc-500">
                Bride
              </p>
            </div>

            <div className="bg-[#faf7f3] rounded-3xl p-10 border">
              <h3 className="text-4xl font-serif">
                {eventData.groomName || "Groom"}
              </h3>

              <p className="mt-4 text-zinc-500">
                Groom
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Countdown */}
      {eventData.enableCountdown && (
  <section className="py-24 text-center">

    <h2 className="text-4xl font-serif text-[#43372f] mb-12">
      Countdown To Our Wedding
    </h2>

    <Countdown
      date={eventData.date}
      time={eventData.time}
    />

  </section>
)}


      {/* Venue */}
    {/* Venue */}
<section className="py-24 bg-white">
  <div className="max-w-3xl mx-auto text-center px-6">

    <h2 className="text-4xl font-serif text-[#43372f]">
      Venue
    </h2>

    <p className="mt-6 text-xl font-medium">
      {eventData.venue}
    </p>

    <p className="mt-4 text-zinc-500">
      {eventData.address}
    </p>

    {eventData.mapLink && (
      <a
        href={eventData.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-block
          mt-8
          px-6
          py-3
          bg-rose-500
          text-white
          rounded-xl
          hover:bg-rose-600
          transition
        "
      >
        Open Location
      </a>
    )}

  </div>
</section>

      <GallerySection />

      <MusicPlayer />

      {eventData.rsvpEnabled && (
  <RSVPSection />
)}
<WishesSection />

      {/* Footer */}
      <section className="py-24 text-center">

        <Heart className="w-8 h-8 mx-auto text-[#b99863]" />

        <h2 className="mt-6 text-4xl font-serif text-[#43372f]">
          Thank You
        </h2>

        <p className="mt-4 text-zinc-500">
          We look forward to celebrating
          this special day with you.
        </p>

      </section>

    </div>
  );
}