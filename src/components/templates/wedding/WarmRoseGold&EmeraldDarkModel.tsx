"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Sparkles,
  Music,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function WarmRoseGoldEmeraldDarkModel({ eventData }: Props) {
  const timeLeft = useCountdown(
    eventData.date,
    eventData.time,
    eventData.rawWeddingDate
  );

  // Entrance Overlay & Audio State
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    if (eventData.musicUrl) {
      const audio = document.getElementById(
        "modern-audio"
      ) as HTMLAudioElement;
      if (audio) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleAudio = () => {
    const audio = document.getElementById(
      "modern-audio"
    ) as HTMLAudioElement;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="bg-[#0a0f0d] text-stone-100 overflow-x-hidden selection:bg-rose-500/30 font-sans">
      {/* ENTER INVITATION OVERLAY */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0f0d] px-6 text-center"
          >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 space-y-6 max-w-md"
            >
              <div className="flex justify-center mb-2">
                <Sparkles className="text-amber-200/80 animate-pulse" size={32} />
              </div>

              <p className="uppercase tracking-[0.4em] text-xs font-medium text-amber-200/70">
                You Are Cordially Invited
              </p>

              <h1 className="text-4xl md:text-5xl font-serif text-amber-100 tracking-wide">
                {eventData.brideName}{" "}
                <span className="text-rose-300 font-sans text-3xl">&</span>{" "}
                {eventData.groomName}
              </h1>

              <button
                onClick={handleEnter}
                className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 text-stone-900 font-semibold tracking-wider uppercase text-sm shadow-xl shadow-rose-950/20 hover:scale-105 transition-transform duration-300"
              >
                Open Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center">
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/60 via-[#0a0f0d]/80 to-[#0a0f0d]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 30 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <p className="uppercase tracking-[0.6em] text-amber-200/80 text-xs font-medium mb-8">
            Digital Wedding Invitation
          </p>

          <h1 className="text-5xl md:text-8xl font-serif font-light tracking-wide text-amber-100">
            {eventData.brideName}
          </h1>

          <div className="text-rose-300 font-serif text-4xl md:text-6xl my-6 italic">
            &
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-light tracking-wide text-amber-100">
            {eventData.groomName}
          </h1>

          <div className="mt-12 w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-200/40 to-transparent mx-auto" />

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-stone-400">
            Save The Date
          </p>

          <p className="text-2xl md:text-3xl font-serif text-amber-200/90 mt-2">
            {eventData.date}
          </p>

          <button
            onClick={() => {
              const el = document.getElementById("couple-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-12 px-8 py-3.5 rounded-full border border-amber-200/30 bg-amber-200/5 hover:bg-amber-200/10 text-amber-200 transition duration-300 text-sm tracking-widest uppercase backdrop-blur-md"
          >
            View Details
          </button>
        </motion.div>
      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section id="couple-section" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                The Couple
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                Meet The Happy Couple
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-10 backdrop-blur-md text-center"
              >
                <div className="text-6xl mb-6 opacity-80">👰</div>
                <h3 className="text-3xl font-serif text-amber-100">
                  {eventData.brideName}
                </h3>
                <p className="text-amber-200/60 uppercase tracking-widest text-xs mt-3">
                  The Bride
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-10 backdrop-blur-md text-center"
              >
                <div className="text-6xl mb-6 opacity-80">🤵</div>
                <h3 className="text-3xl font-serif text-amber-100">
                  {eventData.groomName}
                </h3>
                <p className="text-amber-200/60 uppercase tracking-widest text-xs mt-3">
                  The Groom
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      <section className="py-32 px-6 bg-stone-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
              Event Details
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
              When & Where
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-8 backdrop-blur-md text-center flex flex-col items-center">
              <CalendarDays className="text-amber-200 mb-6" size={36} />
              <h3 className="font-serif text-2xl text-amber-100 mb-2">
                Date
              </h3>
              <p className="text-stone-300 font-light">{eventData.date}</p>
            </div>

            <div className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-8 backdrop-blur-md text-center flex flex-col items-center">
              <Clock3 className="text-amber-200 mb-6" size={36} />
              <h3 className="font-serif text-2xl text-amber-100 mb-2">
                Time
              </h3>
              <p className="text-stone-300 font-light">{eventData.time}</p>
            </div>

            <div className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-8 backdrop-blur-md text-center flex flex-col items-center">
              <MapPin className="text-amber-200 mb-6" size={36} />
              <h3 className="font-serif text-2xl text-amber-100 mb-2">
                Venue
              </h3>
              <p className="text-stone-300 font-light">{eventData.venue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                Countdown
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                Counting Down To Forever
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
                  whileHover={{ scale: 1.02 }}
                  className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-8 text-center backdrop-blur-md"
                >
                  <h3 className="text-5xl md:text-6xl font-serif text-amber-200">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-widest text-stone-400">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory && eventData.loveStory?.length > 0 && (
        <section className="py-32 px-6 bg-stone-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Heart className="mx-auto text-rose-300 mb-4" size={32} />
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                How It Began
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-stone-900/40 border border-amber-200/10 rounded-2xl overflow-hidden backdrop-blur-md"
                >
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-64 object-cover opacity-90"
                    />
                  )}
                  <div className="p-8">
                    <p className="text-amber-200/70 text-xs uppercase tracking-widest mb-2">
                      {story.subtitle}
                    </p>
                    <h3 className="text-2xl font-serif text-amber-100 mb-4">
                      {story.title}
                    </h3>
                    <p className="text-stone-400 font-light leading-relaxed text-sm">
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
      {eventData.showSchedule && eventData.schedule?.length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                Timeline
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                Schedule of Events
              </h2>
            </div>

            <div className="space-y-6">
              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-8 backdrop-blur-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-serif text-amber-100 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-stone-400 font-light text-sm">
                        {item.description}
                      </p>
                    </div>
                    <span className="self-start md:self-auto px-6 py-2 rounded-full border border-amber-200/20 text-amber-200 font-serif text-sm">
                      {item.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && eventData.gallery?.length > 0 && (
        <section className="py-32 px-6 bg-stone-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                Gallery
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                Memorable Moments
              </h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {eventData.gallery.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  src={image}
                  alt=""
                  className="rounded-2xl w-full object-cover border border-amber-200/10 cursor-pointer shadow-lg"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                RSVP
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                Are You Attending?
              </h2>
              <p className="mt-4 text-stone-400 font-light text-sm">
                Please respond to help us prepare for our special day.
              </p>
            </div>

            <div className="bg-stone-900/40 border border-amber-200/10 backdrop-blur-md rounded-2xl p-8 md:p-12">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl bg-stone-950/50 border border-amber-200/10 focus:border-amber-200/40 text-stone-200 placeholder:text-stone-500 outline-none transition"
                />

                <input
                  type="number"
                  placeholder="Number of Guests"
                  className="w-full p-4 rounded-xl bg-stone-950/50 border border-amber-200/10 focus:border-amber-200/40 text-stone-200 placeholder:text-stone-500 outline-none transition"
                />

                <textarea
                  rows={4}
                  placeholder="Leave a message..."
                  className="w-full p-4 rounded-xl bg-stone-950/50 border border-amber-200/10 focus:border-amber-200/40 text-stone-200 placeholder:text-stone-500 outline-none transition"
                />

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="py-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-200 transition text-sm font-medium tracking-wider uppercase"
                  >
                    Attending
                  </button>

                  <button
                    type="button"
                    className="py-4 rounded-xl border border-rose-500/30 bg-rose-950/30 hover:bg-rose-900/40 text-rose-200 transition text-sm font-medium tracking-wider uppercase"
                  >
                    Regretfully Decline
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 text-stone-900 font-semibold tracking-wider uppercase text-xs transition duration-300 hover:opacity-90"
                >
                  Submit RSVP
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* WISHES WALL */}
      {eventData.enableGreetings && eventData.wishes?.length > 0 && (
        <section className="py-32 px-6 bg-stone-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                Wishes
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                Messages of Love
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-8 backdrop-blur-md"
                >
                  <p className="text-amber-200/40 font-serif text-5xl mb-2">“</p>
                  <p className="text-stone-300 font-light leading-relaxed text-sm mb-6">
                    {wish.message}
                  </p>
                  <p className="font-serif text-amber-200 text-right">
                    — {wish.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LOCATION */}
      {eventData.showVenue && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
                Venue
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-3">
                Location Details
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-stone-900/40 border border-amber-200/10 rounded-2xl p-10 backdrop-blur-md flex flex-col justify-center">
                <h3 className="text-3xl font-serif text-amber-100 mb-4">
                  {eventData.venue}
                </h3>
                <p className="text-stone-400 font-light leading-relaxed mb-8">
                  {eventData.address}
                </p>

                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center px-8 py-3.5 rounded-full border border-amber-200/30 bg-amber-200/5 hover:bg-amber-200/10 text-amber-200 transition text-xs tracking-widest uppercase"
                  >
                    Open In Google Maps
                  </a>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden border border-amber-200/10 min-h-[400px]">
                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0 grayscale opacity-80"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-stone-900/40">
                    <p className="text-stone-500 font-light">Map Preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MUSIC BUTTON */}
      {eventData.musicUrl && (
        <div className="fixed bottom-8 right-8 z-40">
          <audio id="modern-audio" src={eventData.musicUrl} loop />

          <button
            onClick={toggleAudio}
            className={`w-14 h-14 rounded-full border border-amber-200/20 bg-stone-900/80 text-amber-200 flex items-center justify-center backdrop-blur-md shadow-2xl transition duration-300 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            <Music size={20} />
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-32 px-6 border-t border-amber-200/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.4em] text-amber-200/80 text-xs font-semibold">
            Thank You
          </span>

          <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-4 mb-8">
            See You At The Celebration
          </h2>

          <div className="text-3xl md:text-5xl font-serif text-amber-200/90">
            {eventData.brideName}{" "}
            <span className="mx-2 text-rose-300 font-sans">&</span>{" "}
            {eventData.groomName}
          </div>

          <p className="mt-12 text-xs uppercase tracking-widest text-stone-600">
            Crafted with ❤️ using Ente Invite
          </p>
        </div>
      </footer>
    </main>
  );
}