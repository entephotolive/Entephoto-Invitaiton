"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingTropicalBeach({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  return (
    <main className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center">

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-purple-950/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center px-6"
        >
          <p className="uppercase tracking-[0.5em] text-rose-300 text-sm mb-6">
            A Celebration of Love
          </p>

          <h1 className="text-6xl md:text-8xl font-bold">
            {eventData.brideName}
          </h1>

          <div className="text-rose-300 text-5xl my-4">
            &
          </div>

          <h1 className="text-6xl md:text-8xl font-bold">
            {eventData.groomName}
          </h1>

          <p className="mt-10 text-xl text-indigo-200">
            Join Us Under The Starlight
          </p>

          <p className="text-3xl font-light mt-3">
            {eventData.date}
          </p>

          <button className="mt-10 px-8 py-4 rounded-full bg-rose-400 hover:bg-rose-500 text-purple-950 font-semibold transition">
            Explore Our Evening
          </button>
        </motion.div>

      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section className="py-24 px-6 bg-indigo-950/20">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-rose-300">
                The Couple
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Meet The Happy Couple
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[32px] p-10"
              >
                <div className="text-7xl mb-6">
                  👰
                </div>

                <h3 className="text-3xl font-bold">
                  {eventData.brideName}
                </h3>

                <p className="text-indigo-200 mt-3">
                  Bride
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[32px] p-10"
              >
                <div className="text-7xl mb-6">
                  🤵
                </div>

                <h3 className="text-3xl font-bold">
                  {eventData.groomName}
                </h3>

                <p className="text-indigo-200 mt-3">
                  Groom
                </p>
              </motion.div>

            </div>

          </div>

        </section>
      )}

      {/* EVENT DETAILS */}
      <section className="py-24 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">

            <span className="uppercase tracking-[0.3em] text-rose-300">
              Event Details
            </span>

            <h2 className="text-5xl font-bold mt-4">
              Wedding Information
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <CalendarDays
                className="text-rose-300 mb-4"
                size={40}
              />

              <h3 className="font-semibold text-xl mb-2">
                Date
              </h3>

              <p className="text-indigo-200">
                {eventData.date}
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <Clock3
                className="text-rose-300 mb-4"
                size={40}
              />

              <h3 className="font-semibold text-xl mb-2">
                Time
              </h3>

              <p className="text-indigo-200">
                {eventData.time}
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <MapPin
                className="text-rose-300 mb-4"
                size={40}
              />

              <h3 className="font-semibold text-xl mb-2">
                Venue
              </h3>

              <p className="text-indigo-200">
                {eventData.venue}
              </p>
            </div>

          </div>

        </div>

      </section>

          {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-24 px-6 bg-indigo-950/20">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-rose-300">
                Countdown
              </span>

              <h2 className="text-5xl font-bold mt-4">
                The Awaits
              </h2>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[32px] p-8 text-center"
                >
                  <h3 className="text-5xl font-bold text-rose-300">
                    {item.value}
                  </h3>

                  <p className="mt-3 text-indigo-200">
                    {item.label}
                  </p>
                </motion.div>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory &&
        eventData.loveStory?.length > 0 && (
          <section className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-20">

                <Heart
                  className="mx-auto text-rose-300 mb-4"
                  size={40}
                />

                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Our Story
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  A Midnight Romance
                </h2>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {eventData.loveStory.map((story, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                    className="bg-white/10 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-md"
                  >
                    {story.image && (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-60 object-cover"
                      />
                    )}

                    <div className="p-8">

                      <p className="text-rose-300 text-sm uppercase tracking-wider mb-2">
                        {story.subtitle}
                      </p>

                      <h3 className="text-2xl font-bold mb-4">
                        {story.title}
                      </h3>

                      <p className="text-indigo-200 leading-relaxed">
                        {story.description}
                      </p>

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
      )}

      {/* SCHEDULE */}
      {eventData.showSchedule &&
        eventData.schedule?.length > 0 && (
          <section className="py-24 px-6 bg-indigo-950/20">

            <div className="max-w-5xl mx-auto">

              <div className="text-center mb-20">

                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Timeline
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  Evening Itinerary
                </h2>

              </div>

              <div className="space-y-8">

                {eventData.schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -50,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                      <div>

                        <h3 className="text-2xl font-bold mb-2">
                          {item.title}
                        </h3>

                        <p className="text-indigo-200">
                          {item.description}
                        </p>

                      </div>

                      <div className="mt-4 md:mt-0">

                        <span className="inline-flex px-5 py-3 rounded-full bg-rose-400 text-purple-950 font-semibold">
                          {item.time}
                        </span>

                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery &&
        eventData.gallery?.length > 0 && (
          <section className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">

                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Gallery
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  Midnight Memories
                </h2>

              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-4">

                {eventData.gallery.map((image, index) => (
                  <motion.img
                    key={index}
                    whileHover={{
                      scale: 1.03,
                    }}
                    src={image}
                    alt=""
                    className="mb-4 rounded-[32px] w-full shadow-2xl cursor-pointer"
                  />
                ))}

              </div>

            </div>

          </section>
      )}
            {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 bg-indigo-950/20">

          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-rose-300">
                RSVP
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Confirm Your Presence
              </h2>

              <p className="mt-4 text-indigo-200">
                Let us know if you'll be joining us for the evening.
              </p>

            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8 md:p-12">

              <form className="space-y-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white"
                />

                <input
                  type="number"
                  placeholder="Number of Guests"
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white"
                />

                <textarea
                  rows={5}
                  placeholder="Leave a message..."
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white"
                />

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    className="py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 transition text-white"
                  >
                    Attending
                  </button>

                  <button
                    type="button"
                    className="py-4 rounded-2xl bg-rose-700 hover:bg-rose-800 transition text-white"
                  >
                    Not Attending
                  </button>

                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-rose-400 hover:bg-rose-500 text-purple-950 font-semibold transition"
                >
                  Submit RSVP
                </button>

              </form>

            </div>

          </div>

        </section>
      )}

      {/* WISHES WALL */}
      {eventData.enableGreetings &&
        eventData.wishes?.length > 0 && (
          <section className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">

                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Wishes
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  Messages From The Heart
                </h2>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {eventData.wishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8 }}
                    className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md"
                  >
                    <div className="text-rose-300 text-5xl mb-4">
                      ❝
                    </div>

                    <p className="text-indigo-200 leading-relaxed mb-6">
                      {wish.message}
                    </p>

                    <div className="font-semibold text-rose-300">
                      {wish.name}
                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
      )}

      {/* LOCATION */}
      {eventData.showVenue && (
        <section className="py-24 px-6 bg-indigo-950/20">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-rose-300">
                Venue
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Our Secret Garden
              </h2>

            </div>

            <div className="grid lg:grid-cols-2 gap-10">

              <div className="bg-white/10 border border-white/10 rounded-[32px] p-10 backdrop-blur-md">

                <h3 className="text-3xl font-bold mb-6">
                  {eventData.venue}
                </h3>

                <p className="text-indigo-200 leading-relaxed mb-8">
                  {eventData.address}
                </p>

                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-8 py-4 rounded-full bg-rose-400 hover:bg-rose-500 text-purple-950 transition"
                  >
                    Find Your Way
                  </a>
                )}

              </div>

              <div className="rounded-[32px] overflow-hidden border border-white/10 min-h-[450px]">

                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-white/10">
                    <p className="text-indigo-300">
                      Map Preview Not Available
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </section>
      )}

      {/* MUSIC BUTTON */}
      {eventData.musicUrl && (
        <div className="fixed bottom-6 right-6 z-50">

          <audio
            id="tropical-audio"
            src={eventData.musicUrl}
            loop
          />

          <button
            onClick={() => {
              const audio =
                document.getElementById(
                  "tropical-audio"
                ) as HTMLAudioElement;

              if (!audio) return;

              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
            className="w-16 h-16 rounded-full bg-rose-400 hover:bg-rose-500 text-purple-950 text-2xl shadow-2xl transition"
          >
            🌙
          </button>

        </div>
      )}

      {/* FOOTER */}
      <footer className="py-32 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <span className="uppercase tracking-[0.3em] text-rose-300">
            With Love
          </span>

          <h2 className="text-5xl md:text-7xl font-bold mt-6 mb-8">
            See You Under
            <br />
            The Stars
          </h2>

          <div className="text-4xl md:text-6xl font-bold">

            {eventData.brideName}

            <span className="mx-4 text-rose-300">
              &
            </span>

            {eventData.groomName}

          </div>

          <p className="mt-8 text-indigo-300">
            Crafted with midnight elegance using Ente Invite
          </p>

        </div>

      </footer>

    </main>
  );
}