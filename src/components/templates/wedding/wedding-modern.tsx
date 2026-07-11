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

export default function WeddingModern({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const hasEventDetails = eventData.date || eventData.time || eventData.venue;

  return (
    <main className="bg-[#0f172a] text-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center">

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center px-4 md:px-6 w-full max-w-4xl mx-auto"
        >
          <p className="uppercase tracking-[0.2em] md:tracking-[0.5em] text-sky-400 text-xs md:text-sm mb-6">
            Digital Wedding Invitation
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold break-words">
            {eventData.brideName || "Bride"}
          </h1>

          <div className="text-sky-400 text-4xl sm:text-5xl my-4">
            &
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold break-words">
            {eventData.groomName || "Groom"}
          </h1>

          <p className="mt-8 md:mt-10 text-lg md:text-xl text-zinc-300">
            Save The Date
          </p>

          {eventData.date && (
            <p className="text-2xl md:text-3xl font-light mt-3">
              {eventData.date}
            </p>
          )}

          <button className="mt-8 md:mt-10 px-6 md:px-8 py-3 md:py-4 rounded-full bg-sky-500 hover:bg-sky-600 transition text-sm md:text-base">
            View Invitation
          </button>
        </motion.div>

      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section className="py-16 md:py-24 px-4 md:px-6">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-12 md:mb-16">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                The Couple
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Meet The Happy Couple
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col items-center md:items-start text-center md:text-left"
              >
                {eventData.bridePhoto ? (
                  <img src={eventData.bridePhoto} alt="Bride" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-6 border-4 border-sky-400/20 shadow-xl shadow-sky-900/20" />
                ) : (
                  <div className="text-6xl md:text-7xl mb-6">👰</div>
                )}

                <h3 className="text-2xl md:text-3xl font-bold">
                  {eventData.brideName || "Bride Name"}
                </h3>

                <p className="text-zinc-400 mt-3">
                  Bride
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col items-center md:items-start text-center md:text-left"
              >
                {eventData.groomPhoto ? (
                  <img src={eventData.groomPhoto} alt="Groom" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-6 border-4 border-sky-400/20 shadow-xl shadow-sky-900/20" />
                ) : (
                  <div className="text-6xl md:text-7xl mb-6">🤵</div>
                )}

                <h3 className="text-2xl md:text-3xl font-bold">
                  {eventData.groomName || "Groom Name"}
                </h3>

                <p className="text-zinc-400 mt-3">
                  Groom
                </p>
              </motion.div>

            </div>

          </div>

        </section>
      )}

      {/* EVENT DETAILS */}
      {hasEventDetails && (
        <section className="py-16 md:py-24 px-4 md:px-6">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-12 md:mb-16">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Event Details
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Wedding Information
              </h2>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {eventData.date && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
                  <CalendarDays
                    className="text-sky-400 mb-4"
                    size={40}
                  />

                  <h3 className="font-semibold text-xl mb-2">
                    Date
                  </h3>

                  <p className="text-zinc-300">
                    {eventData.date}
                  </p>
                </div>
              )}

              {eventData.time && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
                  <Clock3
                    className="text-sky-400 mb-4"
                    size={40}
                  />

                  <h3 className="font-semibold text-xl mb-2">
                    Time
                  </h3>

                  <p className="text-zinc-300">
                    {eventData.time}
                  </p>
                </div>
              )}

              {eventData.venue && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl sm:col-span-2 lg:col-span-1">
                  <MapPin
                    className="text-sky-400 mb-4"
                    size={40}
                  />

                  <h3 className="font-semibold text-xl mb-2">
                    Venue
                  </h3>

                  <p className="text-zinc-300">
                    {eventData.venue}
                  </p>
                </div>
              )}

            </div>

          </div>

        </section>
      )}

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-16 md:py-24 px-4 md:px-6">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-12 md:mb-16">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Countdown
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                The Big Day Is Coming
              </h2>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-bold text-sky-400">
                    {item.value}
                  </h3>

                  <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-400">
                    {item.label}
                  </p>
                </motion.div>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory && eventData.loveStory && eventData.loveStory.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12 md:mb-20">

              <Heart
                className="mx-auto text-sky-400 mb-4"
                size={40}
              />

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Our Story
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Love Journey
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl"
                >
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-52 md:h-60 object-cover"
                    />
                  )}

                  <div className="p-6 md:p-8">

                    <p className="text-sky-400 text-xs md:text-sm uppercase tracking-wider mb-2">
                      {story.subtitle}
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                      {story.title}
                    </h3>

                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
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
      {eventData.showSchedule && eventData.schedule && eventData.schedule.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6">

          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-12 md:mb-20">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Timeline
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Event Schedule
              </h2>

            </div>

            <div className="space-y-6 md:space-y-8">

              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                    <div className="mb-4 md:mb-0">

                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm md:text-base text-zinc-400">
                        {item.description}
                      </p>

                    </div>

                    <div>
                      <span className="inline-flex px-4 py-2 md:px-5 md:py-3 rounded-full bg-sky-500 text-white font-semibold text-sm md:text-base shadow-lg shadow-sky-500/20">
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
      {eventData.showGallery && eventData.gallery && eventData.gallery.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12 md:mb-16">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Gallery
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Captured Moments
              </h2>

            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">

              {eventData.gallery.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{
                    scale: 1.03,
                  }}
                  src={image}
                  alt="Gallery"
                  className="mb-4 md:mb-6 rounded-[24px] md:rounded-[32px] w-full shadow-2xl cursor-pointer"
                />
              ))}

            </div>

          </div>

        </section>
      )}

      {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">

          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12 md:mb-16">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                RSVP
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Confirm Attendance
              </h2>

              <p className="mt-4 text-sm md:text-base text-zinc-400">
                Let us know if you'll be joining us.
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-12">

              <form className="space-y-4 md:space-y-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors"
                />

                <input
                  type="number"
                  placeholder="Number of Guests"
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors"
                />

                <textarea
                  rows={4}
                  placeholder="Leave a message..."
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors resize-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <button
                    type="button"
                    className="py-3 md:py-4 rounded-2xl bg-green-500 hover:bg-green-600 transition text-sm md:text-base font-medium"
                  >
                    Attending
                  </button>

                  <button
                    type="button"
                    className="py-3 md:py-4 rounded-2xl bg-red-500 hover:bg-red-600 transition text-sm md:text-base font-medium"
                  >
                    Not Attending
                  </button>

                </div>

                <button
                  type="submit"
                  className="w-full py-3 md:py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 transition font-semibold text-sm md:text-base mt-2"
                >
                  Submit RSVP
                </button>

              </form>

            </div>

          </div>

        </section>
      )}

      {/* WISHES WALL */}
      {eventData.enableGreetings && eventData.wishes && eventData.wishes.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12 md:mb-16">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Wishes
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Messages Of Love
              </h2>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {eventData.wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl"
                >
                  <div className="text-sky-400 text-4xl md:text-5xl mb-4">
                    ❝
                  </div>

                  <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6">
                    {wish.message}
                  </p>

                  <div className="font-semibold text-sky-400 text-sm md:text-base">
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
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12 md:mb-16">

              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Venue
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Event Location
              </h2>

            </div>

            <div className="max-w-3xl mx-auto">

              <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl text-center">

                <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                  {eventData.venue || "Wedding Venue"}
                </h3>

                <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 md:mb-10">
                  {eventData.address || "123 Wedding Lane, City, Country"}
                </p>

                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-600 transition text-sm md:text-base font-semibold"
                  >
                    Open in Google Maps
                  </a>
                )}

              </div>

            </div>

          </div>

        </section>
      )}

      {/* MUSIC BUTTON */}
      {eventData.musicUrl && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">

          <audio
            id="modern-audio"
            src={eventData.musicUrl}
            loop
          />

          <button
            onClick={() => {
              const audio =
                document.getElementById(
                  "modern-audio"
                ) as HTMLAudioElement;

              if (!audio) return;

              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xl md:text-2xl shadow-2xl transition flex items-center justify-center"
          >
            🎵
          </button>

        </div>
      )}

      {/* FOOTER */}
      <footer className="py-24 md:py-32 px-4 md:px-6">

        <div className="max-w-4xl mx-auto text-center">

          <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
            Thank You
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mt-4 md:mt-6 mb-6 md:mb-8">
            See You At
            <br />
            The Celebration
          </h2>

          <div className="text-3xl md:text-4xl lg:text-6xl font-bold">

            {eventData.brideName || "Bride"}

            <span className="mx-2 md:mx-4 text-sky-400">
              &
            </span>

            {eventData.groomName || "Groom"}

          </div>

          <p className="mt-8 text-xs md:text-sm text-zinc-500">
            Crafted with ❤️ using Ente Invite
          </p>

        </div>

      </footer>

    </main>
  );
}