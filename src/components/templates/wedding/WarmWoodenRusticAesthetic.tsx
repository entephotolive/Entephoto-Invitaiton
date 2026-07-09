"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  TreePine,
  Music,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function WarmWoodenRusticAesthetic({ eventData }: Props) {
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
    <main className="bg-[#1c120c] text-[#e8ded1] overflow-x-hidden selection:bg-[#8b5a2b]/40 font-serif">
      {/* ENTER INVITATION OVERLAY */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#180e09] px-6 text-center border-[12px] border-[#2d1c13]"
          >
            {/* Soft Warm Vignette */}
            <div className="absolute inset-0 bg-radial from-[#3d2719]/40 via-transparent to-[#0a0503]/90 pointer-events-none" />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 space-y-6 max-w-md p-8 border border-[#4a3121]/50 bg-[#241710]/80 rounded-xl shadow-2xl backdrop-blur-sm"
            >
              <div className="flex justify-center mb-2">
                <TreePine className="text-[#c29b68] animate-pulse" size={32} />
              </div>

              <p className="uppercase tracking-[0.3em] text-xs font-sans font-medium text-[#a8885c]">
                You Are Cordially Invited
              </p>

              <h1 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] tracking-wide">
                {eventData.brideName}{" "}
                <span className="text-[#c29b68] font-sans text-3xl">&</span>{" "}
                {eventData.groomName}
              </h1>

              <button
                onClick={handleEnter}
                className="mt-8 px-10 py-4 rounded-md bg-[#8b5a2b] hover:bg-[#a06a35] text-[#f7f0e6] font-sans font-medium tracking-wider uppercase text-xs shadow-xl transition-colors duration-300 border border-[#b8864a]/30"
              >
                Open Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center border-b border-[#382317]">
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-25 sepia-[0.3]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#180e09]/70 via-[#1c120c]/85 to-[#1c120c]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 30 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
        >
          <div className="p-8 md:p-16 border-2 border-[#3d2719] bg-[#241710]/40 backdrop-blur-md rounded-2xl shadow-2xl">
            <p className="uppercase tracking-[0.5em] font-sans text-[#a8885c] text-xs font-medium mb-8">
              Digital Wedding Invitation
            </p>

            <h1 className="text-5xl md:text-8xl font-serif tracking-wide text-[#f2e8dc]">
              {eventData.brideName}
            </h1>

            <div className="text-[#c29b68] font-serif text-4xl md:text-6xl my-4 italic">
              &
            </div>

            <h1 className="text-5xl md:text-8xl font-serif tracking-wide text-[#f2e8dc]">
              {eventData.groomName}
            </h1>

            <div className="mt-10 w-32 h-[1px] bg-[#4a3121] mx-auto" />

            <p className="mt-8 text-xs font-sans uppercase tracking-[0.3em] text-[#a8885c]">
              Save The Date
            </p>

            <p className="text-2xl md:text-3xl font-serif text-[#e0cfba] mt-2">
              {eventData.date}
            </p>

            <button
              onClick={() => {
                const el = document.getElementById("couple-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-10 px-8 py-3.5 rounded-md border border-[#5c3e29] bg-[#2a1b13] hover:bg-[#382419] text-[#c29b68] font-sans transition duration-300 text-xs tracking-widest uppercase"
            >
              View Details
            </button>
          </div>
        </motion.div>
      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section id="couple-section" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                The Couple
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
                Meet The Happy Couple
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#241710] border border-[#382317] rounded-xl p-10 text-center shadow-lg"
              >
                <div className="text-6xl mb-6 opacity-80">👰</div>
                <h3 className="text-3xl font-serif text-[#f2e8dc]">
                  {eventData.brideName}
                </h3>
                <p className="text-[#a8885c] font-sans uppercase tracking-widest text-xs mt-3">
                  The Bride
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#241710] border border-[#382317] rounded-xl p-10 text-center shadow-lg"
              >
                <div className="text-6xl mb-6 opacity-80">🤵</div>
                <h3 className="text-3xl font-serif text-[#f2e8dc]">
                  {eventData.groomName}
                </h3>
                <p className="text-[#a8885c] font-sans uppercase tracking-widest text-xs mt-3">
                  The Groom
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      <section className="py-28 px-6 bg-[#180e09]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
              Event Details
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
              When & Where
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-[#241710] border border-[#382317] rounded-xl p-8 text-center flex flex-col items-center shadow-md">
              <CalendarDays className="text-[#c29b68] mb-4" size={32} />
              <h3 className="font-serif text-2xl text-[#f2e8dc] mb-2">
                Date
              </h3>
              <p className="text-[#d1c2b0] font-sans text-sm">{eventData.date}</p>
            </div>

            <div className="bg-[#241710] border border-[#382317] rounded-xl p-8 text-center flex flex-col items-center shadow-md">
              <Clock3 className="text-[#c29b68] mb-4" size={32} />
              <h3 className="font-serif text-2xl text-[#f2e8dc] mb-2">
                Time
              </h3>
              <p className="text-[#d1c2b0] font-sans text-sm">{eventData.time}</p>
            </div>

            <div className="bg-[#241710] border border-[#382317] rounded-xl p-8 text-center flex flex-col items-center shadow-md">
              <MapPin className="text-[#c29b68] mb-4" size={32} />
              <h3 className="font-serif text-2xl text-[#f2e8dc] mb-2">
                Venue
              </h3>
              <p className="text-[#d1c2b0] font-sans text-sm">{eventData.venue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                Countdown
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
                Counting Down To The Big Day
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
                  className="bg-[#241710] border border-[#382317] rounded-xl p-8 text-center shadow-md"
                >
                  <h3 className="text-5xl font-serif text-[#c29b68]">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-xs font-sans uppercase tracking-widest text-[#a8885c]">
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
        <section className="py-28 px-6 bg-[#180e09]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Heart className="mx-auto text-[#c29b68] mb-4" size={30} />
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
                Our Love Story
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-[#241710] border border-[#382317] rounded-xl overflow-hidden shadow-lg"
                >
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-60 object-cover opacity-85 sepia-[0.2]"
                    />
                  )}
                  <div className="p-8">
                    <p className="text-[#a8885c] font-sans text-xs uppercase tracking-widest mb-2">
                      {story.subtitle}
                    </p>
                    <h3 className="text-2xl font-serif text-[#f2e8dc] mb-3">
                      {story.title}
                    </h3>
                    <p className="text-[#c7b8a7] font-sans leading-relaxed text-sm">
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
        <section className="py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                Timeline
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
                Event Schedule
              </h2>
            </div>

            <div className="space-y-6">
              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#241710] border border-[#382317] rounded-xl p-8 shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-serif text-[#f2e8dc] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#c7b8a7] font-sans text-sm">
                        {item.description}
                      </p>
                    </div>
                    <span className="self-start md:self-auto px-6 py-2 rounded-md border border-[#5c3e29] bg-[#1c120c] text-[#c29b68] font-sans text-xs uppercase tracking-wider">
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
        <section className="py-28 px-6 bg-[#180e09]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
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
                  className="rounded-xl w-full object-cover border border-[#382317] cursor-pointer shadow-lg"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                RSVP
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
                Confirm Attendance
              </h2>
              <p className="mt-3 text-[#c7b8a7] font-sans text-sm">
                Kindly respond to help us celebrate together.
              </p>
            </div>

            <div className="bg-[#241710] border border-[#382317] rounded-xl p-8 md:p-12 shadow-2xl">
              <form className="space-y-6 font-sans" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-md bg-[#180e09] border border-[#382317] focus:border-[#a8885c] text-[#f2e8dc] placeholder:text-[#785d45] outline-none transition text-sm"
                />

                <input
                  type="number"
                  placeholder="Number of Guests"
                  className="w-full p-4 rounded-md bg-[#180e09] border border-[#382317] focus:border-[#a8885c] text-[#f2e8dc] placeholder:text-[#785d45] outline-none transition text-sm"
                />

                <textarea
                  rows={4}
                  placeholder="Leave a message..."
                  className="w-full p-4 rounded-md bg-[#180e09] border border-[#382317] focus:border-[#a8885c] text-[#f2e8dc] placeholder:text-[#785d45] outline-none transition text-sm"
                />

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="py-4 rounded-md border border-[#3d5a37] bg-[#1f301b] hover:bg-[#273d22] text-[#93c48b] transition text-xs font-medium tracking-wider uppercase"
                  >
                    Attending
                  </button>

                  <button
                    type="button"
                    className="py-4 rounded-md border border-[#5a2f2f] bg-[#301919] hover:bg-[#3d2020] text-[#c48b8b] transition text-xs font-medium tracking-wider uppercase"
                  >
                    Not Attending
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-md bg-[#8b5a2b] hover:bg-[#a06a35] text-[#f7f0e6] font-medium tracking-wider uppercase text-xs transition duration-300 border border-[#b8864a]/30"
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
        <section className="py-28 px-6 bg-[#180e09]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                Wishes
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
                Messages Of Love
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-[#241710] border border-[#382317] rounded-xl p-8 shadow-md"
                >
                  <p className="text-[#a8885c] font-serif text-5xl mb-2">“</p>
                  <p className="text-[#c7b8a7] font-sans leading-relaxed text-sm mb-6">
                    {wish.message}
                  </p>
                  <p className="font-serif text-[#c29b68] text-right">
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
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
                Venue
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f2e8dc] mt-2">
                Event Location
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-[#241710] border border-[#382317] rounded-xl p-10 flex flex-col justify-center shadow-lg">
                <h3 className="text-3xl font-serif text-[#f2e8dc] mb-4">
                  {eventData.venue}
                </h3>
                <p className="text-[#c7b8a7] font-sans leading-relaxed mb-8 text-sm">
                  {eventData.address}
                </p>

                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center px-8 py-3.5 rounded-md border border-[#5c3e29] bg-[#1c120c] hover:bg-[#2a1b13] text-[#c29b68] font-sans transition text-xs tracking-widest uppercase"
                  >
                    Open In Google Maps
                  </a>
                )}
              </div>

              <div className="rounded-xl overflow-hidden border border-[#382317] min-h-[400px]">
                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0 sepia-[0.3] contrast-125 opacity-80"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-[#241710]">
                    <p className="text-[#785d45] font-sans text-sm">Map Preview</p>
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
            className={`w-14 h-14 rounded-full border border-[#5c3e29] bg-[#241710] text-[#c29b68] flex items-center justify-center shadow-2xl transition duration-300 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            <Music size={20} />
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-28 px-6 border-t border-[#382317]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] font-sans text-[#a8885c] text-xs font-semibold">
            Thank You
          </span>

          <h2 className="text-4xl md:text-6xl font-serif text-[#f2e8dc] mt-4 mb-8">
            See You At The Celebration
          </h2>

          <div className="text-3xl md:text-5xl font-serif text-[#c29b68]">
            {eventData.brideName}{" "}
            <span className="mx-2 text-[#a8885c] font-sans">&</span>{" "}
            {eventData.groomName}
          </div>

          <p className="mt-12 text-xs font-sans uppercase tracking-widest text-[#785d45]">
            Crafted with ❤️ using Ente Invite
          </p>
        </div>
      </footer>
    </main>
  );
}