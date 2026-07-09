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
  Send,
  CheckCircle2,
  XCircle,
  Map,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function HeritageWedding({ eventData }: Props) {
  const timeLeft = useCountdown(
    eventData.date,
    eventData.time,
    eventData.rawWeddingDate
  );

  // States
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [attendance, setAttendance] = useState<"attending" | "declining" | null>(null);

  const handleEnter = () => {
    setHasEntered(true);
    if (eventData.musicUrl) {
      const audio = document.getElementById("royal-audio") as HTMLAudioElement;
      if (audio) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const toggleAudio = () => {
    const audio = document.getElementById("royal-audio") as HTMLAudioElement;
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
    <main className="bg-[#180509] text-[#f7e8d3] overflow-x-hidden font-serif selection:bg-amber-900/60 selection:text-amber-100">
      
      {/* 👑 ROYAL ENTRANCE OVERLAY */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#180509] px-6 text-center"
          >
            {/* Ambient Lighting */}
            <div className="absolute inset-0 bg-radial from-amber-600/15 via-transparent to-black/80 pointer-events-none" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10 max-w-lg w-full p-8 md:p-12 border-2 border-amber-500/30 bg-[#260a10]/90 rounded-t-full rounded-b-3xl shadow-2xl backdrop-blur-xl flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center mb-6">
                <Sparkles size={28} className="text-amber-300 animate-pulse" />
              </div>

              <span className="uppercase tracking-[0.4em] text-xs font-sans text-amber-300/80 mb-3">
                Royal Invitation
              </span>

              <h1 className="text-4xl md:text-5xl font-serif text-amber-100 tracking-wide">
                {eventData.brideName}
              </h1>

              <span className="text-amber-400 font-serif italic text-2xl my-2">&</span>

              <h1 className="text-4xl md:text-5xl font-serif text-amber-100 tracking-wide mb-8">
                {eventData.groomName}
              </h1>

              <button
                onClick={handleEnter}
                className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-sans font-semibold tracking-widest uppercase text-xs shadow-xl shadow-amber-950/50 hover:brightness-110 transition duration-300"
              >
                Enter Celebration
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏰 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 border-b border-amber-900/30">
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter saturate-50"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#180509]/60 via-[#180509]/80 to-[#180509]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 30 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Decorative Top Crest */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-amber-400/40" />
            <span className="uppercase tracking-[0.5em] text-xs font-sans text-amber-300/90 font-medium">
              We Request The Honour Of Your Presence
            </span>
            <div className="w-12 h-[1px] bg-amber-400/40" />
          </div>

          <h1 className="text-6xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 tracking-tight leading-none">
            {eventData.brideName}
          </h1>

          <div className="my-4 flex items-center gap-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400/50" />
            <span className="text-amber-400 text-3xl md:text-5xl font-serif italic">
              &
            </span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>

          <h1 className="text-6xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 tracking-tight leading-none">
            {eventData.groomName}
          </h1>

          <div className="mt-12 p-6 border-y border-amber-500/20 bg-amber-950/20 backdrop-blur-sm max-w-md w-full">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-amber-300/70 mb-1">
              Save The Date
            </p>
            <p className="text-2xl md:text-3xl font-serif text-amber-100">
              {eventData.date}
            </p>
          </div>

          {/* Quick Nav Button */}
          <button
            onClick={() => {
              document.getElementById("details-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-10 px-8 py-3.5 rounded-full border border-amber-400/30 bg-amber-400/5 hover:bg-amber-400/15 text-amber-200 font-sans text-xs uppercase tracking-widest transition duration-300"
          >
            Explore Celebration
          </button>
        </motion.div>
      </section>

      {/* ⏳ COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-20 px-6 bg-[#21070c] border-b border-amber-900/20">
          <div className="max-w-5xl mx-auto text-center">
            <span className="uppercase tracking-[0.3em] font-sans text-amber-400/80 text-xs font-semibold">
              The Countdown
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-amber-100 mt-2 mb-12">
              Awaiting The Auspicious Moment
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 md:p-8 rounded-2xl border border-amber-500/20 bg-[#180509]/80 backdrop-blur-md shadow-lg"
                >
                  <span className="text-4xl md:text-6xl font-serif text-amber-300 block">
                    {item.value}
                  </span>
                  <span className="text-xs font-sans uppercase tracking-widest text-amber-200/50 mt-2 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 👥 COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section id="couple-section" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
                Two Souls
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
                The Blessed Couple
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                whileHover={{ y: -6 }}
                className="p-10 border border-amber-500/20 bg-[#24080e]/60 rounded-t-full rounded-b-2xl text-center flex flex-col items-center backdrop-blur-md shadow-xl"
              >
                <div className="w-20 h-20 rounded-full border border-amber-400/30 bg-amber-500/10 flex items-center justify-center text-4xl mb-6">
                  👰
                </div>
                <h3 className="text-3xl font-serif text-amber-100">
                  {eventData.brideName}
                </h3>
                <span className="text-xs font-sans uppercase tracking-widest text-amber-400/70 mt-2">
                  The Bride
                </span>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="p-10 border border-amber-500/20 bg-[#24080e]/60 rounded-t-full rounded-b-2xl text-center flex flex-col items-center backdrop-blur-md shadow-xl"
              >
                <div className="w-20 h-20 rounded-full border border-amber-400/30 bg-amber-500/10 flex items-center justify-center text-4xl mb-6">
                  🤵
                </div>
                <h3 className="text-3xl font-serif text-amber-100">
                  {eventData.groomName}
                </h3>
                <span className="text-xs font-sans uppercase tracking-widest text-amber-400/70 mt-2">
                  The Groom
                </span>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 📍 EVENT DETAILS */}
      <section id="details-section" className="py-28 px-6 bg-[#21070c]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
              Event Details
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
              Time & Place
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-8 border border-amber-500/20 bg-[#180509]/80 rounded-2xl text-center flex flex-col items-center">
              <CalendarDays className="text-amber-400 mb-4" size={36} />
              <h3 className="font-serif text-2xl text-amber-100 mb-2">Date</h3>
              <p className="text-amber-200/70 font-sans text-sm">{eventData.date}</p>
            </div>

            <div className="p-8 border border-amber-500/20 bg-[#180509]/80 rounded-2xl text-center flex flex-col items-center">
              <Clock3 className="text-amber-400 mb-4" size={36} />
              <h3 className="font-serif text-2xl text-amber-100 mb-2">Time</h3>
              <p className="text-amber-200/70 font-sans text-sm">{eventData.time}</p>
            </div>

            <div className="p-8 border border-amber-500/20 bg-[#180509]/80 rounded-2xl text-center flex flex-col items-center">
              <MapPin className="text-amber-400 mb-4" size={36} />
              <h3 className="font-serif text-2xl text-amber-100 mb-2">Venue</h3>
              <p className="text-amber-200/70 font-sans text-sm">{eventData.venue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📖 LOVE STORY */}
      {eventData.showStory && eventData.loveStory?.length > 0 && (
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Heart className="mx-auto text-amber-400 mb-4" size={32} />
              <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
                Chapters Of Love
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="p-6 border border-amber-500/20 bg-[#24080e]/60 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md"
                >
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-56 object-cover rounded-xl mb-6 opacity-90 border border-amber-500/10"
                    />
                  )}
                  <span className="text-xs font-sans uppercase tracking-widest text-amber-400/70">
                    {story.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif text-amber-100 mt-1 mb-3">
                    {story.title}
                  </h3>
                  <p className="text-amber-200/70 font-sans text-sm leading-relaxed">
                    {story.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🗓 SCHEDULE */}
      {eventData.showSchedule && eventData.schedule?.length > 0 && (
        <section className="py-28 px-6 bg-[#21070c]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
                Schedule
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
                Itinerary Of Ceremonies
              </h2>
            </div>

            <div className="space-y-6">
              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 border border-amber-500/20 bg-[#180509]/80 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-2xl font-serif text-amber-100">
                      {item.title}
                    </h3>
                    <p className="text-amber-200/70 font-sans text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="px-6 py-2 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 font-sans text-xs font-medium uppercase tracking-wider self-start md:self-auto">
                    {item.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🖼 GALLERY */}
      {eventData.showGallery && eventData.gallery?.length > 0 && (
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
                Gallery
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
                Captured Moments
              </h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {eventData.gallery.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  src={image}
                  alt=""
                  className="rounded-2xl w-full object-cover border border-amber-500/20 shadow-xl cursor-pointer"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 💌 RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-28 px-6 bg-[#21070c]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
                RSVP
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
                Kindly Grace Us With Your Presence
              </h2>
            </div>

            <div className="p-8 md:p-12 border border-amber-500/20 bg-[#180509]/90 rounded-3xl shadow-2xl">
              <form className="space-y-6 font-sans" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs uppercase tracking-wider text-amber-300/70 mb-2 block">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full p-4 rounded-xl bg-[#280a11] border border-amber-500/20 text-amber-100 placeholder:text-amber-200/30 outline-none focus:border-amber-400/50 transition"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-amber-300/70 mb-2 block">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    className="w-full p-4 rounded-xl bg-[#280a11] border border-amber-500/20 text-amber-100 placeholder:text-amber-200/30 outline-none focus:border-amber-400/50 transition"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-amber-300/70 mb-2 block">
                    Personal Note
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Warm wishes..."
                    className="w-full p-4 rounded-xl bg-[#280a11] border border-amber-500/20 text-amber-100 placeholder:text-amber-200/30 outline-none focus:border-amber-400/50 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setAttendance("attending")}
                    className={`py-4 rounded-xl border flex items-center justify-center gap-2 transition text-xs uppercase tracking-wider font-semibold ${
                      attendance === "attending"
                        ? "bg-amber-500 text-stone-950 border-amber-400"
                        : "bg-[#280a11] border-amber-500/20 text-amber-200/80 hover:bg-amber-500/10"
                    }`}
                  >
                    <CheckCircle2 size={16} /> Attending
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance("declining")}
                    className={`py-4 rounded-xl border flex items-center justify-center gap-2 transition text-xs uppercase tracking-wider font-semibold ${
                      attendance === "declining"
                        ? "bg-rose-900/60 text-rose-200 border-rose-500"
                        : "bg-[#280a11] border-amber-500/20 text-amber-200/80 hover:bg-rose-900/20"
                    }`}
                  >
                    <XCircle size={16} /> Regretfully Decline
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-semibold uppercase tracking-widest text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Send Response
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* 💬 WISHES WALL */}
      {eventData.enableGreetings && eventData.wishes?.length > 0 && (
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
                Blessings
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
                Warm Wishes & Blessings
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="p-8 border border-amber-500/20 bg-[#24080e]/60 rounded-2xl backdrop-blur-md relative"
                >
                  <span className="text-amber-500/30 font-serif text-6xl leading-none block mb-2">
                    “
                  </span>
                  <p className="text-amber-200/80 font-sans text-sm leading-relaxed mb-6">
                    {wish.message}
                  </p>
                  <p className="font-serif text-amber-300 text-right font-medium">
                    — {wish.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🗺 VENUE & MAP */}
      {eventData.showVenue && (
        <section className="py-28 px-6 bg-[#21070c]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
                Location
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-2">
                Wedding Venue
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="p-10 border border-amber-500/20 bg-[#180509]/80 rounded-2xl flex flex-col justify-center">
                <h3 className="text-3xl font-serif text-amber-100 mb-4">
                  {eventData.venue}
                </h3>
                <p className="text-amber-200/70 font-sans text-sm leading-relaxed mb-8">
                  {eventData.address}
                </p>

                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 hover:bg-amber-500/20 transition font-sans text-xs uppercase tracking-widest"
                  >
                    <Map size={16} /> Open Google Maps
                  </a>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden border border-amber-500/20 min-h-[400px]">
                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0 grayscale opacity-75 invert-[0.9]"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-[#180509]">
                    <p className="text-amber-200/40 font-sans text-sm">
                      Map Preview Unavailable
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 🎵 FLOATING AUDIO BAR */}
      {eventData.musicUrl && (
        <div className="fixed bottom-8 right-8 z-40">
          <audio id="royal-audio" src={eventData.musicUrl} loop />
          <button
            onClick={toggleAudio}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full border border-amber-400/40 bg-[#260a10]/90 text-amber-200 shadow-2xl backdrop-blur-xl hover:scale-105 transition"
          >
            <Music
              size={18}
              className={`text-amber-300 ${isPlaying ? "animate-spin-slow" : ""}`}
            />
            <span className="font-sans text-xs uppercase tracking-widest font-medium pr-1">
              {isPlaying ? "Pause Music" : "Play Music"}
            </span>
          </button>
        </div>
      )}

      {/* 👑 FOOTER */}
      <footer className="py-28 px-6 border-t border-amber-900/30 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="uppercase tracking-[0.4em] font-sans text-amber-400/80 text-xs font-semibold">
            Gratitude
          </span>

          <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mt-4 mb-8">
            Looking Forward To Celebrating With You
          </h2>

          <div className="text-3xl md:text-5xl font-serif text-amber-300">
            {eventData.brideName} & {eventData.groomName}
          </div>

          <p className="mt-12 text-xs font-sans uppercase tracking-widest text-amber-200/40">
            Crafted with ❤️ using Ente Invite
          </p>
        </div>
      </footer>
    </main>
  );
}