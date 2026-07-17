"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { submitRsvp, submitWish } from "@/lib/actions/guest";
import { getMapEmbedUrl } from "@/lib/utils";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Crown
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

// Helper: returns true only if value is a non-empty, non-whitespace string
function hasValue(val: string | undefined | null): boolean {
  return typeof val === "string" && val.trim().length > 0;
}

interface Props {
  eventData: WeddingEventData;
}

export default function GoldenUnion({ eventData }: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // RSVP State
  const [rsvpForm, setRsvpForm] = useState({ name: "", message: "", attending: true, guests: 1 });
  const [isRsvpSubmitting, setIsRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  // Wish State
  const [wishForm, setWishForm] = useState({ name: "", message: "" });
  const [isWishSubmitting, setIsWishSubmitting] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);
  const [wishError, setWishError] = useState("");

  // Guard computed values
  const bride = hasValue(eventData.brideName) ? eventData.brideName : null;
  const groom = hasValue(eventData.groomName) ? eventData.groomName : null;
  const hasHeroNames = bride || groom;

  const hasEventDetails =
    hasValue(eventData.date) || hasValue(eventData.time) || hasValue(eventData.venue);

  const hasCoupleContent =
    bride || groom || hasValue(eventData.bridePhoto) || hasValue(eventData.groomPhoto);

  const hasParentsContent =
    hasValue(eventData.brideParents) || hasValue(eventData.groomParents);

  const validStories = eventData.loveStory?.filter(
    (story) => hasValue(story.title) || hasValue(story.description) || hasValue(story.image)
  ) || [];

  const validSchedule = eventData.schedule?.filter(
    (item) => hasValue(item.title) || hasValue(item.description) || hasValue(item.time)
  ) || [];

  const validGallery = eventData.gallery?.filter(img => hasValue(img)) || [];
  
  const validWishes = eventData.wishes?.filter(
    (w) => hasValue(w.name) || hasValue(w.message)
  ) || [];

  // Reusable subtle gold gradient for text
  const goldTextGradient = "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text";
  const goldBg = "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRsvpSubmitting(true);
    setRsvpError("");
    try {
      await submitRsvp({
        slug: eventData.slug || "",
        ...rsvpForm,
      });
      setRsvpSuccess(true);
    } catch (err: any) {
      setRsvpError(err.message || "Failed to submit RSVP");
    } finally {
      setIsRsvpSubmitting(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasValue(wishForm.name) || !hasValue(wishForm.message)) {
      setWishError("Please fill out both fields.");
      return;
    }
    setIsWishSubmitting(true);
    setWishError("");
    try {
      await submitWish({
        slug: eventData.slug || "",
        ...wishForm,
      });
      setWishSuccess(true);
      setWishForm({ name: "", message: "" });
    } catch (err: any) {
      setWishError(err.message || "Failed to send wish");
    } finally {
      setIsWishSubmitting(false);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <main className="bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#BF953F] selection:text-black min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        
        {hasValue(eventData.heroImage) && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          />
        )}

        {/* Dark overlay to ensure text legibility even without image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a] backdrop-blur-[2px]" />

        {/* Decorative Gold Frame */}
        <div className="absolute inset-4 md:inset-8 border border-[#BF953F]/30 pointer-events-none rounded-3xl" />
        <div className="absolute inset-5 md:inset-10 border border-[#BF953F]/20 pointer-events-none rounded-2xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center w-full"
        >
          <Crown className="mx-auto w-12 h-12 text-[#BF953F] mb-8 opacity-80" strokeWidth={1} />
          
          <p className="uppercase tracking-[0.4em] text-xs md:text-sm mb-6 text-[#BF953F] font-light">
            You Are Cordially Invited
          </p>

          {hasHeroNames && (
            <div className="flex flex-col items-center justify-center w-full">
              {bride && (
                <h1 className={`text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight ${goldTextGradient} drop-shadow-2xl break-words max-w-full`}>
                  {bride}
                </h1>
              )}
              
              {bride && groom && (
                <div className="text-[#BF953F] text-4xl md:text-6xl font-light italic my-4 font-serif">
                  and
                </div>
              )}
              
              {groom && (
                <h1 className={`text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight ${goldTextGradient} drop-shadow-2xl break-words max-w-full`}>
                  {groom}
                </h1>
              )}
            </div>
          )}

          {hasValue(eventData.date) && (
            <div className="mt-12 border-t border-[#BF953F]/30 pt-6 w-64 mx-auto">
              <p className="text-xl md:text-2xl font-serif tracking-widest text-[#BF953F]">
                {eventData.date}
              </p>
            </div>
          )}
        </motion.div>

      </section>

      {/* THE COUPLE */}
      {eventData.showCoupleInfo && (hasValue(eventData.bridePhoto) || hasValue(eventData.groomPhoto)) && (
        <section className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-sm block mb-4">
                The Union
              </span>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white">
                The Bride & Groom
              </h2>
              <div className="w-24 h-px bg-[#BF953F] mx-auto mt-8 opacity-50" />
            </div>

            <div className={`grid gap-12 lg:gap-20 ${hasValue(eventData.bridePhoto) && hasValue(eventData.groomPhoto) ? 'md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
              
              {hasValue(eventData.bridePhoto) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#141414] border border-[#BF953F]/20 rounded-t-[100px] text-center relative overflow-hidden group hover:border-[#BF953F]/50 transition-colors duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent opacity-30 z-10" />
                  
                  <div className="w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-t-[100px]">
                    <img
                      src={eventData.bridePhoto}
                      alt="Bride"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-8 md:p-10">
                    {bride && <h3 className="text-4xl font-serif mb-2 text-white">{bride}</h3>}
                    <p className="uppercase tracking-[0.2em] text-[#BF953F] text-xs">The Bride</p>
                  </div>
                </motion.div>
              )}

              {hasValue(eventData.groomPhoto) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#141414] border border-[#BF953F]/20 rounded-t-[100px] text-center relative overflow-hidden group hover:border-[#BF953F]/50 transition-colors duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent opacity-30 z-10" />
                  
                  <div className="w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-t-[100px]">
                    <img
                      src={eventData.groomPhoto}
                      alt="Groom"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-8 md:p-10">
                    {groom && <h3 className="text-4xl font-serif mb-2 text-white">{groom}</h3>}
                    <p className="uppercase tracking-[0.2em] text-[#BF953F] text-xs">The Groom</p>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* THE PARENTS */}
      {hasParentsContent && (
        <section className="py-24 px-6 relative bg-black/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-xs md:text-sm block mb-4">
                With Love From
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white">
                The Families
              </h2>
              <div className="w-16 h-px bg-[#BF953F] mx-auto mt-6 opacity-50" />
            </div>

            <div className={`grid gap-8 ${hasValue(eventData.brideParents) && hasValue(eventData.groomParents) ? "md:grid-cols-2" : "grid-cols-1 max-w-2xl mx-auto"}`}>
              
              {hasValue(eventData.brideParents) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#141414] border border-[#BF953F]/10 rounded-2xl p-10 text-center relative"
                >
                  <p className="text-lg md:text-xl text-zinc-300 italic relative z-10 leading-relaxed mb-6 font-serif">
                    "{eventData.brideParents}"
                  </p>
                  <p className="uppercase tracking-widest text-[#BF953F] text-xs">
                    {bride ? `Parents of ${bride}` : "The Bride's Family"}
                  </p>
                </motion.div>
              )}

              {hasValue(eventData.groomParents) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#141414] border border-[#BF953F]/10 rounded-2xl p-10 text-center relative"
                >
                  <p className="text-lg md:text-xl text-zinc-300 italic relative z-10 leading-relaxed mb-6 font-serif">
                    "{eventData.groomParents}"
                  </p>
                  <p className="uppercase tracking-widest text-[#BF953F] text-xs">
                    {groom ? `Parents of ${groom}` : "The Groom's Family"}
                  </p>
                </motion.div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      {hasEventDetails && (
        <section className="py-24 px-6 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-sm block mb-4">
                The Details
              </span>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white">
                Ceremony & Reception
              </h2>
              <div className="w-24 h-px bg-[#BF953F] mx-auto mt-8 opacity-50" />
            </div>

            {(() => {
              const detailsCount = [eventData.date, eventData.time, eventData.venue].filter(hasValue).length;
              let gridClass = "lg:grid-cols-3";
              if (detailsCount === 1) gridClass = "grid-cols-1 max-w-sm mx-auto";
              if (detailsCount === 2) gridClass = "md:grid-cols-2 max-w-4xl mx-auto";

              return (
                <div className={`grid gap-8 ${gridClass}`}>
                  {hasValue(eventData.date) && (
                    <div className="bg-[#1a1a1a] border border-[#BF953F]/20 rounded-2xl p-10 flex flex-col items-center text-center hover:border-[#BF953F]/40 transition-colors">
                      <CalendarDays className="text-[#BF953F] mb-6" size={48} strokeWidth={1} />
                      <h3 className="font-serif text-2xl mb-4 text-[#BF953F]">The Date</h3>
                      <p className="text-zinc-300 font-light">{eventData.date}</p>
                    </div>
                  )}

                  {hasValue(eventData.time) && (
                    <div className="bg-[#1a1a1a] border border-[#BF953F]/20 rounded-2xl p-10 flex flex-col items-center text-center hover:border-[#BF953F]/40 transition-colors">
                      <Clock3 className="text-[#BF953F] mb-6" size={48} strokeWidth={1} />
                      <h3 className="font-serif text-2xl mb-4 text-[#BF953F]">The Time</h3>
                      <p className="text-zinc-300 font-light">{eventData.time}</p>
                    </div>
                  )}

                  {hasValue(eventData.venue) && (
                    <div className="bg-[#1a1a1a] border border-[#BF953F]/20 rounded-2xl p-10 flex flex-col items-center text-center hover:border-[#BF953F]/40 transition-colors">
                      <MapPin className="text-[#BF953F] mb-6" size={48} strokeWidth={1} />
                      <h3 className="font-serif text-2xl mb-4 text-[#BF953F]">The Venue</h3>
                      <p className="text-zinc-300 font-light">{eventData.venue}</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (hasValue(eventData.rawWeddingDate) || hasValue(eventData.date)) && (
        <section className="py-24 px-6 relative overflow-hidden border-y border-[#BF953F]/10">
          <div className="absolute inset-0 bg-[#BF953F]/5" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white">
                Awaiting the Moment
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <div key={item.label} className="bg-[#0a0a0a] border border-[#BF953F]/30 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center shadow-xl shadow-black/50">
                  <h3 className={`text-4xl md:text-6xl font-serif ${goldTextGradient} mb-2`}>{item.value}</h3>
                  <p className="uppercase tracking-[0.2em] text-[#BF953F] text-[10px] md:text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory && validStories.length > 0 && (
        <section className="py-32 px-6 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <Heart className="mx-auto text-[#BF953F] mb-6" size={40} strokeWidth={1} />
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-sm block mb-4">
                Our Story
              </span>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white">
                How It Began
              </h2>
            </div>

            <div className="space-y-24">
              {validStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="w-full md:w-1/2 p-2 rounded-2xl border border-[#BF953F]/20 relative">
                    <div className="absolute inset-0 bg-[#BF953F]/5 rounded-2xl blur-xl" />
                    {hasValue(story.image) ? (
                      <img
                        src={story.image}
                        alt={story.title || `Story ${index + 1}`}
                        className="w-full aspect-[4/3] object-cover rounded-xl relative z-10 sepia-[.3]"
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-[#1a1a1a] rounded-xl relative z-10 flex items-center justify-center border border-[#BF953F]/10">
                        <Heart className="w-12 h-12 text-[#BF953F]/30" strokeWidth={1} />
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 text-center md:text-left px-4">
                    {hasValue(story.subtitle) && (
                      <p className="uppercase tracking-[0.2em] text-[#BF953F] text-xs font-bold mb-4">
                        {story.subtitle}
                      </p>
                    )}
                    {hasValue(story.title) && (
                      <h3 className="text-4xl font-serif mb-6 text-white">
                        {story.title}
                      </h3>
                    )}
                    {hasValue(story.description) && (
                      <p className="text-zinc-400 font-light leading-relaxed text-lg">
                        {story.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {eventData.showSchedule && validSchedule.length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-sm block mb-4">
                Timeline
              </span>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white">
                Order of Events
              </h2>
              <div className="w-24 h-px bg-[#BF953F] mx-auto mt-8 opacity-50" />
            </div>

            <div className="relative border-l border-[#BF953F]/30 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
              {validSchedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-[#BF953F]" />
                  
                  {hasValue(item.time) && (
                    <div className="mb-2 inline-block px-4 py-1 rounded-full border border-[#BF953F]/30 bg-[#1a1a1a] text-[#BF953F] text-sm tracking-wider">
                      {item.time}
                    </div>
                  )}
                  {hasValue(item.title) && (
                    <h3 className="text-3xl font-serif text-white mb-3 mt-2">{item.title}</h3>
                  )}
                  {hasValue(item.description) && (
                    <p className="text-zinc-400 font-light">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && validGallery.length > 0 && (
        <section className="py-32 px-6 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-sm block mb-4">
                Gallery
              </span>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white">
                Golden Memories
              </h2>
              <div className="w-24 h-px bg-[#BF953F] mx-auto mt-8 opacity-50" />
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {validGallery.map((image, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.02 }}
                  className="break-inside-avoid border border-[#BF953F]/20 rounded-xl overflow-hidden p-2 bg-[#1a1a1a]"
                >
                  <img
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    loading="lazy"
                    className="w-full object-cover rounded-lg sepia-[.2]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {eventData.rsvpEnabled && (
        <section id="rsvp" className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#BF953F]/5 to-transparent" />
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-[#141414] border border-[#BF953F]/30 rounded-3xl p-10 md:p-16 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-4">
                  Will You Attend?
                </h2>
                <p className="text-zinc-400 font-light">
                  Kindly let us know if you can make it.
                </p>
              </div>

              {rsvpSuccess ? (
                <div className="text-center p-8 bg-[#0a0a0a] rounded-2xl border border-green-500/20">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif mb-2 text-[#BF953F]">RSVP Confirmed</h3>
                  <p className="text-zinc-400">Thank you for your response!</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      placeholder="Guest Name(s)"
                      className="w-full bg-[#0a0a0a] border border-[#BF953F]/20 rounded-xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#BF953F]/60 transition"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={rsvpForm.message}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                      placeholder="Message (Optional)"
                      className="w-full bg-[#0a0a0a] border border-[#BF953F]/20 rounded-xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#BF953F]/60 transition"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      required
                      min={1}
                      max={10}
                      value={rsvpForm.guests}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, guests: parseInt(e.target.value) || 1 })}
                      placeholder="Number of Guests"
                      className="w-full bg-[#0a0a0a] border border-[#BF953F]/20 rounded-xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#BF953F]/60 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: true })}
                      className={`py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition ${
                        rsvpForm.attending === true 
                          ? `${goldBg} text-black` 
                          : "border border-[#BF953F]/30 text-zinc-400 hover:text-white hover:border-[#BF953F]/60"
                      }`}
                    >
                      Accepts
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: false })}
                      className={`py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition ${
                        rsvpForm.attending === false 
                          ? `${goldBg} text-black` 
                          : "border border-[#BF953F]/30 text-zinc-400 hover:text-white hover:border-[#BF953F]/60"
                      }`}
                    >
                      Declines
                    </button>
                  </div>
                  
                  {rsvpError && (
                    <p className="text-red-400 text-sm text-center">{rsvpError}</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isRsvpSubmitting}
                    className="w-full py-4 rounded-xl border border-[#BF953F]/20 text-[#BF953F] font-bold uppercase tracking-wider text-sm hover:bg-[#BF953F]/10 transition mt-4 disabled:opacity-50"
                  >
                    {isRsvpSubmitting ? "Sending..." : "Send RSVP"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WISHES */}
      {eventData.enableGreetings && (
        <section id="wishes" className="py-24 px-6 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-sm block mb-4">
                Guestbook
              </span>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white">
                Golden Wishes
              </h2>
            </div>

            <div className="max-w-2xl mx-auto mb-16">
              {wishSuccess ? (
                <div className="bg-[#141414] border border-green-500/20 text-center p-8 rounded-2xl">
                  <Heart className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-serif text-[#BF953F] mb-2">Thank you!</h3>
                  <p className="text-zinc-400">Your beautiful wish has been added.</p>
                </div>
              ) : (
                <form onSubmit={handleWishSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={wishForm.name}
                    onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-[#141414] border border-[#BF953F]/20 rounded-xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#BF953F]/60 transition"
                  />
                  <textarea
                    required
                    value={wishForm.message}
                    onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                    placeholder="Write your wishes for the couple..."
                    rows={4}
                    className="w-full bg-[#141414] border border-[#BF953F]/20 rounded-xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#BF953F]/60 transition resize-none"
                  />
                  {wishError && <p className="text-red-400 text-sm">{wishError}</p>}
                  <button 
                    type="submit"
                    disabled={isWishSubmitting}
                    className={`w-full py-4 rounded-xl ${goldBg} text-black font-bold uppercase tracking-wider text-sm hover:opacity-90 transition disabled:opacity-50`}
                  >
                    {isWishSubmitting ? "Sending..." : "Send Wish"}
                  </button>
                </form>
              )}
            </div>

            {validWishes.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {validWishes.map((wish, index) => (
                  <div key={index} className="bg-[#141414] border border-[#BF953F]/20 rounded-2xl p-8 relative">
                    <div className="absolute top-4 right-6 text-6xl text-[#BF953F] opacity-20 font-serif">
                      "
                    </div>
                    {hasValue(wish.message) && (
                      <p className="text-zinc-300 font-light italic mb-6 leading-relaxed relative z-10 text-lg break-words">
                        {wish.message}
                      </p>
                    )}
                    {hasValue(wish.name) && (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-px bg-[#BF953F]" />
                        <span className="uppercase tracking-widest text-[#BF953F] text-sm font-bold truncate">
                          {wish.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* LOCATION MAP */}
      {eventData.showVenue && (hasValue(eventData.venue) || hasValue(eventData.address)) && (
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="uppercase tracking-[0.3em] text-[#BF953F] text-sm block mb-4">
                Location
              </span>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white mb-6">
                The Venue
              </h2>
              {hasValue(eventData.venue) && (
                <p className="text-2xl font-serif text-[#BF953F] mb-4">{eventData.venue}</p>
              )}
              {hasValue(eventData.address) && (
                <p className="text-zinc-400 font-light mb-8 max-w-md mx-auto lg:mx-0">
                  {eventData.address}
                </p>
              )}
              
              {hasValue(eventData.mapLink) && eventData.mapLink?.startsWith("http") && (
                <a
                  href={eventData.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-8 py-4 rounded-full ${goldBg} text-black font-bold uppercase tracking-wider text-sm hover:opacity-90 transition shadow-lg shadow-[#BF953F]/20`}
                >
                  Get Directions
                </a>
              )}
            </div>
            
            <div className="rounded-3xl overflow-hidden border border-[#BF953F]/30 h-[400px] md:h-[500px] shadow-2xl relative p-2 bg-[#141414]">
              {hasValue(eventData.mapLink) ? (
                <iframe
                  src={getMapEmbedUrl(eventData.mapLink || "", `${eventData.venue || ""} ${eventData.address || ""}`)}
                  title="Venue Map"
                  className="w-full h-full border-0 rounded-2xl grayscale sepia-[.4]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full rounded-2xl flex items-center justify-center bg-[#0a0a0a] text-zinc-600">
                  Map Not Available
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* MUSIC BUTTON */}
      {hasValue(eventData.musicUrl) && (
        <div className="fixed bottom-8 right-8 z-50">
          <audio ref={audioRef} src={eventData.musicUrl} loop />
          <button
            onClick={toggleAudio}
            className={`w-14 h-14 rounded-full transition duration-500 shadow-lg shadow-[#BF953F]/40 flex items-center justify-center ${
              isPlaying ? `${goldBg} text-black scale-110` : "bg-[#141414] border border-[#BF953F]/50 text-[#BF953F] hover:scale-105"
            }`}
            aria-label="Toggle ambient audio"
          >
            {isPlaying ? (
              <span className="text-2xl">♫</span>
            ) : (
              <span className="text-xl font-bold opacity-80">
                <div className="flex gap-1">
                   <div className="w-1 h-3 bg-current rounded-full"></div>
                   <div className="w-1 h-4 bg-current rounded-full"></div>
                   <div className="w-1 h-2 bg-current rounded-full"></div>
                </div>
              </span>
            )}
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-[#BF953F]/20 text-center bg-[#050505]">
        <Crown className="mx-auto w-8 h-8 text-[#BF953F] mb-6 opacity-50" strokeWidth={1} />
        {hasHeroNames && (
          <h2 className="text-3xl md:text-5xl font-serif tracking-tighter mb-4 text-white">
            {bride} 
            {bride && groom && <span className="text-[#BF953F] italic mx-2">&</span>}
            {groom}
          </h2>
        )}
        <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-zinc-600 mt-8">
          An Exquisite Union • Powered by Ente Invite
        </p>
      </footer>

    </main>
  );
}
