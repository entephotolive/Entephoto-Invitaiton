"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Flower2,
  Volume2,
  VolumeX,
  Check,
  X,
  Send,
  Map,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function PastelFloralMinimalistGarden ({ eventData }: Props) {
  const timeLeft = useCountdown(
    eventData.date,
    eventData.time,
    eventData.rawWeddingDate
  );

  // Component States
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no" | null>(null);

  const handleEnter = () => {
    setHasEntered(true);
    if (eventData.musicUrl) {
      const audio = document.getElementById("floral-audio") as HTMLAudioElement;
      if (audio) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const toggleAudio = () => {
    const audio = document.getElementById("floral-audio") as HTMLAudioElement;
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
    <main className="bg-[#fbf9f5] text-[#3a3733] font-serif overflow-x-hidden selection:bg-[#e6d0c3]">
      {/* 🌿 BOTANICAL ENVELOPE ENTRANCE OVERLAY */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4eee6] px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="max-w-md w-full bg-[#fbf9f5] border border-[#e2d8cd] p-10 rounded-2xl shadow-2xl relative flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#e8ded3] flex items-center justify-center text-[#9a5338] mb-6">
                <Flower2 size={28} className="animate-spin-slow" />
              </div>

              <span className="uppercase tracking-[0.35em] text-[11px] font-sans text-[#8a7f75]">
                Wedding Invitation
              </span>

              <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-4 mb-2">
                {eventData.brideName}
              </h1>

              <span className="text-[#9a5338] font-serif italic text-2xl my-1">
                &
              </span>

              <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                {eventData.groomName}
              </h1>

              <button
                onClick={handleEnter}
                className="w-full py-4 rounded-xl bg-[#9a5338] hover:bg-[#834229] text-[#fbf9f5] font-sans uppercase text-xs tracking-[0.25em] font-medium transition duration-300 shadow-md"
              >
                Open Envelope
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌸 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 border-b border-[#e8ded3]">
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-15 filter grayscale"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f5]/50 via-[#fbf9f5]/80 to-[#fbf9f5]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 20 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <Flower2 size={36} className="text-[#9a5338] mb-6" />

          <span className="uppercase tracking-[0.4em] text-xs font-sans text-[#70685f] mb-4">
            Together With Their Families
          </span>

          <h1 className="text-6xl md:text-8xl font-serif text-[#2d2a26] tracking-tight">
            {eventData.brideName}
          </h1>

          <div className="my-3 text-[#9a5338] text-3xl md:text-4xl font-serif italic">
            and
          </div>

          <h1 className="text-6xl md:text-8xl font-serif text-[#2d2a26] tracking-tight">
            {eventData.groomName}
          </h1>

          <div className="mt-8 w-20 h-[1px] bg-[#9a5338]/40" />

          <p className="mt-8 text-xs font-sans uppercase tracking-[0.3em] text-[#70685f]">
            Invite You To Celebrate Their Wedding Day
          </p>

          <p className="text-2xl md:text-3xl font-serif text-[#9a5338] mt-2">
            {eventData.date}
          </p>

          <button
            onClick={() => {
              document.getElementById("couple-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-10 px-8 py-3.5 rounded-full border border-[#9a5338]/30 hover:bg-[#9a5338]/5 text-[#9a5338] font-sans text-xs uppercase tracking-widest transition duration-300"
          >
            View Celebration
          </button>
        </motion.div>
      </section>

      {/* ⏳ COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-20 px-6 bg-[#f4eee6] border-b border-[#e8ded3]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
              Counting The Days
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mt-2 mb-10">
              Until We Say I Do
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-xl bg-[#fbf9f5] border border-[#e2d8cd] shadow-sm"
                >
                  <span className="text-4xl md:text-5xl font-serif text-[#9a5338] block">
                    {item.value}
                  </span>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#70685f] mt-2 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🌿 COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section id="couple-section" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
                The Couple
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
                Bride & Groom
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 bg-[#f4eee6] border border-[#e8ded3] rounded-2xl text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#fbf9f5] border border-[#e2d8cd] flex items-center justify-center text-3xl mb-6 shadow-sm">
                  👰
                </div>
                <h3 className="text-3xl font-serif text-[#2d2a26]">
                  {eventData.brideName}
                </h3>
                <span className="text-xs font-sans uppercase tracking-widest text-[#9a5338] mt-2">
                  The Bride
                </span>
              </div>

              <div className="p-10 bg-[#f4eee6] border border-[#e8ded3] rounded-2xl text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#fbf9f5] border border-[#e2d8cd] flex items-center justify-center text-3xl mb-6 shadow-sm">
                  🤵
                </div>
                <h3 className="text-3xl font-serif text-[#2d2a26]">
                  {eventData.groomName}
                </h3>
                <span className="text-xs font-sans uppercase tracking-widest text-[#9a5338] mt-2">
                  The Groom
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 📍 EVENT DETAILS */}
      <section className="py-28 px-6 bg-[#f4eee6]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
              Details
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
              Wedding Information
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="p-8 bg-[#fbf9f5] border border-[#e8ded3] rounded-2xl text-center flex flex-col items-center">
              <CalendarDays className="text-[#9a5338] mb-4" size={32} />
              <h3 className="font-serif text-2xl text-[#2d2a26] mb-1">Date</h3>
              <p className="text-[#70685f] font-sans text-sm">{eventData.date}</p>
            </div>

            <div className="p-8 bg-[#fbf9f5] border border-[#e8ded3] rounded-2xl text-center flex flex-col items-center">
              <Clock3 className="text-[#9a5338] mb-4" size={32} />
              <h3 className="font-serif text-2xl text-[#2d2a26] mb-1">Time</h3>
              <p className="text-[#70685f] font-sans text-sm">{eventData.time}</p>
            </div>

            <div className="p-8 bg-[#fbf9f5] border border-[#e8ded3] rounded-2xl text-center flex flex-col items-center">
              <MapPin className="text-[#9a5338] mb-4" size={32} />
              <h3 className="font-serif text-2xl text-[#2d2a26] mb-1">Venue</h3>
              <p className="text-[#70685f] font-sans text-sm">{eventData.venue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📖 LOVE STORY */}
      {eventData.showStory && eventData.loveStory?.length > 0 && (
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heart className="mx-auto text-[#9a5338] mb-3" size={28} />
              <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
                Moments Along The Way
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-[#f4eee6] border border-[#e8ded3] rounded-2xl overflow-hidden shadow-sm"
                >
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#9a5338]">
                      {story.subtitle}
                    </span>
                    <h3 className="text-2xl font-serif text-[#2d2a26] mt-1 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-[#70685f] font-sans text-sm leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🗓 SCHEDULE */}
      {eventData.showSchedule && eventData.schedule?.length > 0 && (
        <section className="py-28 px-6 bg-[#f4eee6]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
                Schedule
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
                The Day's Timeline
              </h2>
            </div>

            <div className="space-y-4">
              {eventData.schedule.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#fbf9f5] border border-[#e8ded3] rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
                >
                  <div>
                    <h3 className="text-xl font-serif text-[#2d2a26]">
                      {item.title}
                    </h3>
                    <p className="text-[#70685f] font-sans text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="px-5 py-2 rounded-full bg-[#f4eee6] border border-[#e2d8cd] text-[#9a5338] font-sans text-xs font-medium uppercase tracking-wider self-start md:self-auto">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🖼 GALLERY */}
      {eventData.showGallery && eventData.gallery?.length > 0 && (
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
                Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
                Captured Memories
              </h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {eventData.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="rounded-2xl w-full object-cover border border-[#e8ded3] shadow-md hover:opacity-95 transition"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 💌 RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-28 px-6 bg-[#f4eee6]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
                RSVP
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
                Join Our Special Day
              </h2>
            </div>

            <div className="p-8 md:p-10 bg-[#fbf9f5] border border-[#e8ded3] rounded-2xl shadow-lg">
              <form className="space-y-5 font-sans" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#70685f] mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 rounded-xl bg-[#f4eee6]/60 border border-[#e2d8cd] text-[#2d2a26] placeholder:text-[#a3998e] outline-none focus:border-[#9a5338] transition text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#70685f] mb-1.5 block">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    className="w-full p-4 rounded-xl bg-[#f4eee6]/60 border border-[#e2d8cd] text-[#2d2a26] placeholder:text-[#a3998e] outline-none focus:border-[#9a5338] transition text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#70685f] mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Leave a message for the couple..."
                    className="w-full p-4 rounded-xl bg-[#f4eee6]/60 border border-[#e2d8cd] text-[#2d2a26] placeholder:text-[#a3998e] outline-none focus:border-[#9a5338] transition text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setRsvpStatus("yes")}
                    className={`py-3.5 rounded-xl border flex items-center justify-center gap-2 transition text-xs uppercase tracking-wider font-medium ${
                      rsvpStatus === "yes"
                        ? "bg-[#9a5338] text-[#fbf9f5] border-[#9a5338]"
                        : "bg-[#f4eee6]/60 border-[#e2d8cd] text-[#70685f] hover:bg-[#e8ded3]"
                    }`}
                  >
                    <Check size={16} /> Attending
                  </button>

                  <button
                    type="button"
                    onClick={() => setRsvpStatus("no")}
                    className={`py-3.5 rounded-xl border flex items-center justify-center gap-2 transition text-xs uppercase tracking-wider font-medium ${
                      rsvpStatus === "no"
                        ? "bg-[#5a524c] text-[#fbf9f5] border-[#5a524c]"
                        : "bg-[#f4eee6]/60 border-[#e2d8cd] text-[#70685f] hover:bg-[#e8ded3]"
                    }`}
                  >
                    <X size={16} /> Declining
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#9a5338] hover:bg-[#834229] text-[#fbf9f5] font-medium uppercase tracking-widest text-xs transition duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={16} /> Submit RSVP
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* 💬 WISHES WALL */}
      {eventData.enableGreetings && eventData.wishes?.length > 0 && (
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
                Wishes
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
                Warm Greetings
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventData.wishes.map((wish, index) => (
                <div
                  key={index}
                  className="p-8 bg-[#f4eee6] border border-[#e8ded3] rounded-2xl shadow-sm"
                >
                  <p className="text-[#9a5338] font-serif text-4xl mb-1">“</p>
                  <p className="text-[#70685f] font-sans text-sm leading-relaxed mb-6">
                    {wish.message}
                  </p>
                  <p className="font-serif text-[#2d2a26] text-right text-sm font-medium">
                    — {wish.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🗺 MAP & LOCATION */}
      {eventData.showVenue && (
        <section className="py-28 px-6 bg-[#f4eee6]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#9a5338] text-xs font-medium">
                Location
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mt-2">
                Getting There
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-10 bg-[#fbf9f5] border border-[#e8ded3] rounded-2xl flex flex-col justify-center">
                <h3 className="text-3xl font-serif text-[#2d2a26] mb-3">
                  {eventData.venue}
                </h3>
                <p className="text-[#70685f] font-sans text-sm leading-relaxed mb-8">
                  {eventData.address}
                </p>

                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-[#9a5338]/30 hover:bg-[#9a5338]/10 text-[#9a5338] font-sans text-xs uppercase tracking-widest transition"
                  >
                    <Map size={16} /> Open In Google Maps
                  </a>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#e8ded3] min-h-[380px]">
                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0 grayscale opacity-85"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-[#fbf9f5]">
                    <p className="text-[#a3998e] font-sans text-sm">
                      Map Preview Unavailable
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 🎵 AUDIO PLAYER */}
      {eventData.musicUrl && (
        <div className="fixed bottom-8 right-8 z-40">
          <audio id="floral-audio" src={eventData.musicUrl} loop />
          <button
            onClick={toggleAudio}
            className="p-4 rounded-full bg-[#fbf9f5] border border-[#e2d8cd] text-[#9a5338] shadow-xl hover:scale-105 transition flex items-center justify-center"
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      )}

      {/* 🌸 FOOTER */}
      <footer className="py-24 px-6 border-t border-[#e8ded3] text-center">
        <div className="max-w-3xl mx-auto">
          <Flower2 size={28} className="text-[#9a5338] mx-auto mb-4" />

          <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-6">
            Thank You For Celebrating With Us
          </h2>

          <div className="text-2xl md:text-3xl font-serif text-[#9a5338]">
            {eventData.brideName} & {eventData.groomName}
          </div>

          <p className="mt-10 text-[11px] font-sans uppercase tracking-widest text-[#a3998e]">
            Crafted with ❤️ using Ente Invite
          </p>
        </div>
      </footer>
    </main>
  );
}