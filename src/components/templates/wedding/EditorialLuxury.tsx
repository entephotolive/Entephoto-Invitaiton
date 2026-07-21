"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { submitRsvp, submitWish } from "@/lib/actions/guest";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Music,
  Music2,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { dummyWeddingImages } from "@/data/dummyImages";


interface Props {
  eventData: WeddingEventData;
}

// Returns true only if value is a non-empty, non-whitespace string
function hasValue(val: string | undefined | null): val is string {
  return typeof val === "string" && val.trim().length > 0;
}

export default function EditorialLuxury({ eventData }: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Guard computed values — null when missing
  const bride = hasValue(eventData.brideName) ? eventData.brideName : null;
  const groom = hasValue(eventData.groomName) ? eventData.groomName : null;
  const hasHeroNames = bride || groom;

  // Event details section guard
  const hasEventDetails =
    hasValue(eventData.date) || hasValue(eventData.time) || hasValue(eventData.venue);

  // Couple section guard — show only if meaningful content exists
  const hasCoupleContent =
    eventData.showCoupleInfo && (bride || groom || eventData.bridePhoto || eventData.groomPhoto);

  // RSVP+Wishes section guard — only render dark section if at least one is enabled
  const hasInteractiveSection = eventData.rsvpEnabled || eventData.enableGreetings;

  // Form state — RSVP
  const [rsvpData, setRsvpData] = useState({ name: "", guests: 1, message: "", attending: true });
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  // Form state — Wishes
  const [wishData, setWishData] = useState({ name: "", message: "" });
  const [wishLoading, setWishLoading] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);
  const [wishError, setWishError] = useState("");

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name.trim()) return;
    setRsvpLoading(true);
    setRsvpError("");
    try {
      const res = await submitRsvp({ slug: eventData.slug || "", ...rsvpData });
      if (res.success) setRsvpSuccess(true);
      else setRsvpError(res.error || "Submission failed. Please try again.");
    } catch {
      setRsvpError("An unexpected error occurred. Please try again.");
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishData.name.trim() || !wishData.message.trim()) return;
    setWishLoading(true);
    setWishError("");
    try {
      const res = await submitWish({ slug: eventData.slug || "", ...wishData });
      if (res.success) setWishSuccess(true);
      else setWishError(res.error || "Submission failed. Please try again.");
    } catch {
      setWishError("An unexpected error occurred. Please try again.");
    } finally {
      setWishLoading(false);
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="bg-[#FAF9F6] text-[#111111] font-sans overflow-x-hidden selection:bg-black selection:text-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-12">

        {/* Background image — only renders when URL exists */}
        {hasValue(eventData.heroImage) && (
          <img
            src={eventData.heroImage}
            alt="Wedding hero"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-1000"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end border-b border-[#111111] pb-8"
        >
          {/* Names — only render if at least one name exists */}
          <div className="w-full">
            <p className="uppercase tracking-[0.4em] text-xs mb-4 font-bold text-zinc-500">
              The Wedding Celebration
            </p>

            {bride && (
              <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-none mb-2">
                {bride}
              </h1>
            )}

            {groom && (
              <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-none flex items-center gap-6">
                {bride && (
                  <span className="text-4xl md:text-8xl font-sans italic font-light text-zinc-400">&</span>
                )}
                {groom}
              </h1>
            )}

            {/* Fallback subtitle if neither name exists */}
            {!hasHeroNames && (
              <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-none">
                A Wedding
              </h1>
            )}
          </div>

          {/* Date + Venue meta — right column, only if data exists */}
          {(hasValue(eventData.date) || hasValue(eventData.venue)) && (
            <div className="text-left md:text-right mt-12 md:mt-0 w-full md:w-auto shrink-0">
              {hasValue(eventData.date) && (
                <p className="text-2xl md:text-4xl font-serif italic mb-2 text-zinc-800">
                  {eventData.date}
                </p>
              )}
              {hasValue(eventData.venue) && (
                <p className="uppercase tracking-[0.3em] text-xs font-bold text-zinc-500">
                  {eventData.venue}
                </p>
              )}
            </div>
          )}
        </motion.div>

      </section>

      {/* ── THE COUPLE ── */}
      {hasCoupleContent && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            {/* Left — Text info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-400 block mb-6">
                Chapter One
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">
                The <br /> Protagonists
              </h2>

              <div className="space-y-6">
                {/* Bride info — only if name or photo exists */}
                {(bride || eventData.bridePhoto) && (
                  <div className="border-l border-zinc-300 pl-6">
                    {bride && <h3 className="text-2xl font-serif">{bride}</h3>}
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 mt-2 mb-1">
                      The Bride
                    </p>
                    
                  </div>
                )}

                {/* Groom info — only if name or photo exists */}
                {(groom || eventData.groomPhoto) && (
                  <div className="border-l border-zinc-300 pl-6">
                    {groom && <h3 className="text-2xl font-serif">{groom}</h3>}
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 mt-2 mb-1">
                      The Groom
                    </p>
                    
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right — Photos */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`grid gap-4 w-full relative ${
                !eventData.bridePhoto && !eventData.groomPhoto 
                  ? "grid-cols-1" 
                  : bride && groom 
                    ? "grid-cols-2" 
                    : "grid-cols-1 max-w-xs mx-auto"
              }`}
            >
              {!eventData.bridePhoto && !eventData.groomPhoto ? (
                <div className="aspect-[4/3] bg-zinc-100 w-full relative overflow-hidden flex items-center justify-center">
                  <img
                    src="https://i.pinimg.com/originals/4a/97/40/4a97403e8d62517d3ecdc417bc6e56cb.gif"
                    alt="Proposal"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              ) : (
                <>
                  {/* Bride photo */}
                  {(bride || eventData.bridePhoto) && (
                    <div className="aspect-[3/4] bg-zinc-100 w-full relative overflow-hidden flex items-center justify-center">
                      {eventData.bridePhoto ? (
                        <img
                          src={eventData.bridePhoto}
                          alt={bride || "Bride"}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                      ) : (
                        <Heart className="w-12 h-12 stroke-[1] text-zinc-300" />
                      )}
                    </div>
                  )}

                  {/* Groom photo */}
                  {(groom || eventData.groomPhoto) && (
                    <div className="aspect-[3/4] bg-zinc-100 w-full relative overflow-hidden flex items-center justify-center">
                      {eventData.groomPhoto ? (
                        <img
                          src={eventData.groomPhoto}
                          alt={groom || "Groom"}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                      ) : (
                        <Heart className="w-12 h-12 stroke-[1] text-zinc-300" />
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>

          </div>
        </section>
      )}

      {/* ── PARENTS BLESSINGS ── */}
      {/* Renders only if at least one side has parent details */}
      {(hasValue(eventData.brideParents) || hasValue(eventData.groomParents)) && (
        <section className="py-32 px-6 bg-[#F4F0EB]">
          <div className="max-w-5xl mx-auto">

            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-center mb-20"
            >
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-400 block mb-6">
                With Love From
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">
                The Families
              </h2>
              <div className="w-12 h-px bg-zinc-400 mx-auto mt-8" />
            </motion.div>

            {/* Two-column layout — collapses to 1 column when only one side present */}
            <div className={`grid gap-12 md:gap-16 ${
              hasValue(eventData.brideParents) && hasValue(eventData.groomParents)
                ? "md:grid-cols-2"
                : "max-w-xl mx-auto"
            }`}>

              {/* Bride's family */}
              {hasValue(eventData.brideParents) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  className="relative"
                >
                  {/* Large decorative quote mark */}
                  <span className="absolute -top-8 -left-2 text-[7rem] leading-none font-serif text-zinc-200 select-none pointer-events-none">
                    "
                  </span>
                  <div className="relative pt-8 pl-6 border-l-2 border-zinc-300">
                    <p className="text-lg md:text-xl font-serif italic text-zinc-600 leading-relaxed mb-6">
                      {eventData.brideParents}
                    </p>
                    {bride && (
                      <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-zinc-400">
                        — Parents of {bride}
                      </p>
                    )}
                    {!bride && (
                      <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-zinc-400">
                        — The Bride's Family
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Groom's family */}
              {hasValue(eventData.groomParents) && (
                <motion.div
                  initial={{ opacity: 0, x: hasValue(eventData.brideParents) ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: hasValue(eventData.brideParents) ? 0.15 : 0 }}
                  className="relative"
                >
                  <span className="absolute -top-8 -left-2 text-[7rem] leading-none font-serif text-zinc-200 select-none pointer-events-none">
                    "
                  </span>
                  <div className="relative pt-8 pl-6 border-l-2 border-zinc-300">
                    <p className="text-lg md:text-xl font-serif italic text-zinc-600 leading-relaxed mb-6">
                      {eventData.groomParents}
                    </p>
                    {groom && (
                      <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-zinc-400">
                        — Parents of {groom}
                      </p>
                    )}
                    {!groom && (
                      <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-zinc-400">
                        — The Groom's Family
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ── EVENT DETAILS & COUNTDOWN ── */}

      {/* Only render dark section if there's at least some event details or countdown enabled */}
      {(hasEventDetails || eventData.enableCountdown) && (
        <section className="py-32 px-6 bg-[#111111] text-[#FAF9F6]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">

            {hasEventDetails && (
              <div>
                <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                  The Details
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-16">
                  When &amp; Where
                </h2>

                <div className="space-y-12 border-t border-zinc-800 pt-12">
                  {hasValue(eventData.date) && (
                    <div className="flex items-start gap-6">
                      <CalendarDays className="w-8 h-8 stroke-[1] text-zinc-400 shrink-0" />
                      <div>
                        <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500 mb-2">Date</h3>
                        <p className="text-2xl font-serif">{eventData.date}</p>
                      </div>
                    </div>
                  )}

                  {hasValue(eventData.time) && (
                    <div className="flex items-start gap-6">
                      <Clock3 className="w-8 h-8 stroke-[1] text-zinc-400 shrink-0" />
                      <div>
                        <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500 mb-2">Time</h3>
                        <p className="text-2xl font-serif">{eventData.time}</p>
                      </div>
                    </div>
                  )}

                  {hasValue(eventData.venue) && (
                    <div className="flex items-start gap-6">
                      <MapPin className="w-8 h-8 stroke-[1] text-zinc-400 shrink-0" />
                      <div>
                        <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500 mb-2">Venue</h3>
                        <p className="text-2xl font-serif mb-2">{eventData.venue}</p>
                        {hasValue(eventData.address) && (
                          <p className="text-zinc-400 font-light">{eventData.address}</p>
                        )}
                        {hasValue(eventData.mapLink) && (
                          <a
                            href={eventData.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 border border-zinc-500 px-6 py-2 uppercase tracking-[0.2em] text-xs font-bold text-zinc-300 hover:bg-white hover:text-black transition"
                          >
                            View Map
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {eventData.enableCountdown && (
              <div className="flex flex-col justify-center">
                <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                  Anticipation
                </span>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                    { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                    { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                    { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                  ].map((item) => (
                    <div key={item.label} className="border border-zinc-800 p-8 flex flex-col items-center justify-center">
                      <h3 className="text-6xl font-serif tracking-tighter mb-2">{item.value}</h3>
                      <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── LOVE STORY ── */}
      {eventData.showStory && eventData.loveStory && eventData.loveStory.length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-400 block mb-6">
                Our Narrative
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">
                An Editorial Romance
              </h2>
            </div>

            <div className="space-y-32">
              {eventData.loveStory.map((story, index) => {
                // Skip entries with no meaningful text content
                if (!hasValue(story.title) && !hasValue(story.description)) return null;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 relative"
                  >
                    <div className="w-full mb-6 overflow-hidden">
                      <img 
                        src={story.image || dummyWeddingImages[index % dummyWeddingImages.length]} 
                        alt={hasValue(story.title) ? story.title : "Our Story"}
                        className="w-full aspect-[21/9] md:aspect-[16/9] object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                      />
                    </div>
                    {hasValue(story.subtitle) && (
                      <p className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-400 border-b border-zinc-200 pb-4 inline-block">
                        {story.subtitle}
                      </p>
                    )}
                    {hasValue(story.title) && (
                      <h3 className="text-4xl md:text-5xl font-serif tracking-tight">
                        {story.title}
                      </h3>
                    )}
                    {hasValue(story.description) && (
                      <p className="text-zinc-500 font-light leading-relaxed text-lg md:text-xl">
                        {story.description}
                      </p>
                    )}

                    {/* Decorative separator between chapters */}
                    {index !== eventData.loveStory!.length - 1 && (
                      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-px h-10 bg-zinc-300" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SCHEDULE ── */}
      {eventData.showSchedule && eventData.schedule && eventData.schedule.length > 0 && (
        <section className="py-32 px-6 bg-[#EBEBEB]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                The Itinerary
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">
                Order of Events
              </h2>
            </div>

            <div className="space-y-0">
              {eventData.schedule.map((item, index) => {
                if (!hasValue(item.title) && !hasValue(item.time) && !hasValue(item.description)) return null;
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row border-t border-[#111111] py-12 group hover:bg-[#FAF9F6] transition px-8 -mx-8"
                  >
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      {hasValue(item.time) && (
                        <span className="text-2xl font-serif italic text-zinc-500 group-hover:text-[#111111] transition">
                          {item.time}
                        </span>
                      )}
                    </div>
                    <div className="md:w-2/3">
                      {hasValue(item.title) && (
                        <h3 className="text-3xl font-serif tracking-tight mb-4">{item.title}</h3>
                      )}
                      {hasValue(item.description) && (
                        <p className="text-zinc-500 font-light">{item.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-[#111111]" />
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {eventData.showGallery && eventData.gallery && eventData.gallery.filter(Boolean).length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16 border-b border-zinc-200 pb-8">
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">
                The Archives
              </h2>
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-400 hidden md:block">
                Curated Moments
              </span>
            </div>

            <div className="columns-1 md:columns-2 gap-8 space-y-8">
              {eventData.gallery.filter(Boolean).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid"
                >
                  <img
                    src={image}
                    alt={`Gallery photo ${index + 1}`}
                    loading="lazy"
                    className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RSVP & WISHES ── */}
      {/* Entire dark section only mounts when at least one interactive module is enabled */}
      {hasInteractiveSection && (
        <section className="py-32 px-6 bg-[#111111] text-[#FAF9F6]">
          <div className={`max-w-7xl mx-auto ${eventData.rsvpEnabled && eventData.enableGreetings ? "grid lg:grid-cols-2 gap-24" : "max-w-3xl"}`}>

            {/* RSVP */}
            {eventData.rsvpEnabled && (
              <div>
                <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                  Répondez s'il vous plaît
                </span>
                <h2 className="text-5xl font-serif tracking-tighter mb-12">RSVP</h2>

                {rsvpSuccess ? (
                  <div className="py-10 border border-zinc-800 text-center p-8">
                    <div className="text-4xl mb-4">💌</div>
                    <h3 className="text-2xl font-serif text-white mb-2">Thank you!</h3>
                    <p className="text-zinc-400 font-light">Your RSVP has been gracefully received.</p>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={handleRsvpSubmit}>
                    <div>
                      <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">
                        Guests Name(s)
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpData.name}
                        onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl"
                      />
                    </div>
                    <div>
                      <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">
                        Number in Party
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={rsvpData.guests}
                        onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value) || 1 })}
                        className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl"
                      />
                    </div>
                    <div>
                      <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">
                        Dietary Requirements / Message (Optional)
                      </label>
                      <input
                        type="text"
                        value={rsvpData.message}
                        onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                        className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attending: true })}
                        className={`border py-4 transition uppercase tracking-[0.2em] text-xs font-bold ${rsvpData.attending ? "border-white bg-white text-black" : "border-zinc-800 text-zinc-500 hover:border-zinc-400"}`}
                      >
                        Will Attend
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attending: false })}
                        className={`border py-4 transition uppercase tracking-[0.2em] text-xs font-bold ${!rsvpData.attending ? "border-white bg-white text-black" : "border-zinc-800 text-zinc-500 hover:border-zinc-400"}`}
                      >
                        Will Decline
                      </button>
                    </div>

                    {rsvpError && (
                      <p className="text-red-400 text-sm">{rsvpError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={rsvpLoading}
                      className="w-full bg-white text-black py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-zinc-200 transition disabled:opacity-50"
                    >
                      {rsvpLoading ? "Submitting..." : "Confirm RSVP"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* WISHES / GUESTBOOK */}
            {eventData.enableGreetings && (
              <div>
                <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                  Guestbook
                </span>
                <h2 className="text-5xl font-serif tracking-tighter mb-12">Well Wishes</h2>

                {wishSuccess ? (
                  <div className="py-10 border border-zinc-800 text-center p-8 mb-12">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-xl font-serif text-white mb-2">Thank you!</h3>
                    <p className="text-zinc-400 font-light">Your warm wishes have been added.</p>
                  </div>
                ) : (
                  <form className="space-y-6 mb-12" onSubmit={handleWishSubmit}>
                    <div>
                      <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={wishData.name}
                        onChange={(e) => setWishData({ ...wishData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl"
                      />
                    </div>
                    <div>
                      <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">
                        Your Wish
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={wishData.message}
                        onChange={(e) => setWishData({ ...wishData, message: e.target.value })}
                        className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl resize-none"
                      />
                    </div>
                    {wishError && (
                      <p className="text-red-400 text-sm">{wishError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={wishLoading}
                      className="border border-zinc-800 text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-black transition disabled:opacity-50"
                    >
                      {wishLoading ? "Sending..." : "Send Wish"}
                    </button>
                  </form>
                )}

                {/* Only show wishes list if there are wishes with actual message content */}
                {eventData.wishes && eventData.wishes.filter(w => hasValue(w.message)).length > 0 && (
                  <div className="space-y-10 max-h-[600px] overflow-y-auto pr-4">
                    {eventData.wishes
                      .filter(w => hasValue(w.message))
                      .map((wish, index) => (
                        <div key={index} className="border-b border-zinc-800 pb-8">
                          <p className="font-serif text-xl text-zinc-300 italic mb-6 leading-relaxed">
                            "{wish.message}"
                          </p>
                          {hasValue(wish.name) && (
                            <p className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500">
                              — {wish.name}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── AMBIENT MUSIC ── */}
      {hasValue(eventData.musicUrl) && (
        <div className="fixed bottom-8 right-8 z-50">
          <audio ref={audioRef} src={eventData.musicUrl} loop />
          <button
            onClick={toggleAudio}
            aria-label={isPlaying ? "Pause background music" : "Play background music"}
            title={isPlaying ? "Pause music" : "Play music"}
            className={`w-14 h-14 rounded-full border flex items-center justify-center transition duration-500 ${
              isPlaying
                ? "border-[#FAF9F6] bg-[#111111] text-[#FAF9F6] hover:bg-zinc-800"
                : "border-[#111111] bg-[#FAF9F6] text-[#111111] hover:bg-[#111111] hover:text-[#FAF9F6]"
            }`}
          >
            {isPlaying ? <Music2 size={18} /> : <Music size={18} />}
          </button>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-24 px-6 border-t border-zinc-200 text-center">
        {/* Names — only render if at least one name exists */}
        {hasHeroNames && (
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-8">
            {bride}
            {bride && groom && (
              <span className="font-sans italic font-light text-zinc-400 mx-2">&</span>
            )}
            {groom}
          </h2>
        )}
        <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-zinc-400">
          Curated Elegance by Ente Invite
        </p>
      </footer>

    </main>
  );
}
