"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { submitRsvp, submitWish } from "@/lib/actions/guest";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Compass,
  Navigation,
  Camera,
  Map as MapIcon,
  Tent
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

export default function JourneyToForever({
  eventData,
}: Props) {
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
        name: wishForm.name,
        message: wishForm.message,
      });
      setWishSuccess(true);
      setWishForm({ name: "", message: "" });
    } catch (err: any) {
      setWishError(err.message || "Failed to send wish");
    } finally {
      setIsWishSubmitting(false);
    }
  };

  // Theme Colors
  const bgMain = "bg-[#F9F7F1]";
  const textMain = "text-[#3E362E]";
  const accentColor = "text-[#C86B5E]"; // Terracotta
  const accentBg = "bg-[#C86B5E]";
  const secondaryAccent = "text-[#8BA888]"; // Sage Green
  const secondaryBg = "bg-[#8BA888]";

  return (
    <main className={`${bgMain} ${textMain} font-sans overflow-x-hidden selection:bg-[#C86B5E] selection:text-white`}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}

        <div className="absolute inset-0 bg-[#3E362E]/40" />
        
        {/* Decorative Map overlay (subtle) */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#C86B5E 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-12 md:p-20 rounded-3xl border border-white/20 shadow-2xl"
        >
          <Compass className="mx-auto w-16 h-16 text-white mb-6 opacity-90 animate-[spin_20s_linear_infinite]" strokeWidth={1} />
          
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm mb-6 text-white/90 font-bold">
            The Greatest Adventure Begins
          </p>

          {hasHeroNames && (
            <>
              {bride && (
                <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-white mb-4">
                  {bride}
                </h1>
              )}
              
              {bride && groom && (
                <div className="text-[#C86B5E] text-4xl font-light italic my-2 font-serif">
                  &
                </div>
              )}
              
              {groom && (
                <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-white mt-4">
                  {groom}
                </h1>
              )}
            </>
          )}

          {(hasValue(eventData.date) || hasValue(eventData.venue)) && (
            <div className="mt-12 flex flex-col items-center gap-3 text-white">
              {hasValue(eventData.date) && (
                <p className="text-xl md:text-2xl font-serif tracking-widest">
                  {eventData.date}
                </p>
              )}
              {hasValue(eventData.venue) && (
                <div className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-80">
                  <MapPin size={16} />
                  <span>{eventData.venue}</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

      </section>

      {/* THE COUPLE (The Adventurers) */}
      {eventData.showCoupleInfo && hasCoupleContent && (
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Dashed trail line connecting sections */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F7F1] border-2 border-[#C86B5E] text-[#C86B5E] mb-6 shadow-sm">
                <Tent size={20} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
                The Co-Pilots
              </h2>
            </div>

            <div className={`grid gap-16 lg:gap-32 ${hasValue(eventData.bridePhoto) && hasValue(eventData.groomPhoto) ? 'md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
              
              {hasValue(eventData.bridePhoto) && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2rem] p-6 shadow-xl shadow-[#3E362E]/5 text-center relative rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-3 z-20" />
                  
                  <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                    <img src={eventData.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  
                  {bride && <h3 className="text-3xl font-serif mb-2">{bride}</h3>}
                  <p className="uppercase tracking-widest text-[#8BA888] text-xs font-bold">The Explorer</p>
                </motion.div>
              )}

              {hasValue(eventData.groomPhoto) && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-[2rem] p-6 shadow-xl shadow-[#3E362E]/5 text-center relative rotate-[2deg] hover:rotate-0 transition-transform duration-500 mt-8 md:mt-0"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm -rotate-3 z-20" />
                  
                  <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                    <img src={eventData.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
                  </div>

                  {groom && <h3 className="text-3xl font-serif mb-2">{groom}</h3>}
                  <p className="uppercase tracking-widest text-[#8BA888] text-xs font-bold">The Navigator</p>
                </motion.div>
              )}

            </div>
          </div>
        </section>
      )}
      {/* THE PARENTS */}
      {hasParentsContent && (
        <section className="py-24 px-6 relative overflow-hidden bg-white/50">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.2em] text-[#8BA888] text-xs font-bold block mb-4">
                With Love From
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
                The Families
              </h2>
            </div>
            
            <div className={`grid gap-12 ${hasValue(eventData.brideParents) && hasValue(eventData.groomParents) ? 'md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
              
              {hasValue(eventData.brideParents) && (
                <div className="bg-white rounded-3xl p-10 shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5 text-center">
                  <h3 className="font-serif text-2xl mb-6 text-[#C86B5E]">Bride's Family</h3>
                  <p className="text-[#3E362E] font-light leading-relaxed whitespace-pre-line">
                    {eventData.brideParents}
                  </p>
                </div>
              )}

              {hasValue(eventData.groomParents) && (
                <div className="bg-white rounded-3xl p-10 shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5 text-center">
                  <h3 className="font-serif text-2xl mb-6 text-[#C86B5E]">Groom's Family</h3>
                  <p className="text-[#3E362E] font-light leading-relaxed whitespace-pre-line">
                    {eventData.groomParents}
                  </p>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* LOVE STORY (The Journey So Far) */}
      {eventData.showStory && validStories.length > 0 && (
        <section className="py-24 px-6 bg-[#3E362E] text-[#F9F7F1]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Compass className="mx-auto text-[#C86B5E] mb-6" size={40} strokeWidth={1.5} />
              <span className="uppercase tracking-[0.2em] text-[#8BA888] text-xs font-bold block mb-4">
                Our Timeline
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                The Journey So Far
              </h2>
            </div>

            <div className="max-w-4xl mx-auto relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#C86B5E]/50 before:to-transparent space-y-16">
              {validStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  {/* Marker */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#3E362E] bg-[#C86B5E] text-[#F9F7F1] shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Heart size={20} fill="currentColor" />
                  </div>
                  
                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors text-left md:group-even:text-right">
                    {hasValue(story.subtitle) && (
                      <span className="inline-block px-4 py-1 rounded-full bg-[#8BA888]/20 text-[#8BA888] text-xs font-bold uppercase tracking-widest mb-4">
                        {story.subtitle}
                      </span>
                    )}
                    {hasValue(story.title) && (
                      <h3 className="text-3xl font-serif mb-4 text-white">
                        {story.title}
                      </h3>
                    )}
                    {hasValue(story.description) && (
                      <p className="text-white/70 font-light leading-relaxed text-lg">
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

      {/* EVENT DETAILS */}
      {(hasValue(eventData.date) || hasValue(eventData.time) || hasValue(eventData.venue)) && (
        <section className="py-24 px-6 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F7F1] border-2 border-[#C86B5E] text-[#C86B5E] mb-6 shadow-sm">
                <MapIcon size={20} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
                Destination Details
              </h2>
            </div>

            <div className={`grid gap-8 ${
              [hasValue(eventData.date), hasValue(eventData.time), hasValue(eventData.venue)].filter(Boolean).length === 3 
                ? 'lg:grid-cols-3' 
                : [hasValue(eventData.date), hasValue(eventData.time), hasValue(eventData.venue)].filter(Boolean).length === 2 
                ? 'lg:grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-1 max-w-md mx-auto'
            }`}>
              
              {hasValue(eventData.date) && (
                <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5">
                  <div className="w-16 h-16 rounded-full bg-[#F9F7F1] flex items-center justify-center text-[#C86B5E] mb-6">
                    <CalendarDays size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4">The Date</h3>
                  <p className="text-zinc-500">{eventData.date}</p>
                </div>
              )}

              {hasValue(eventData.time) && (
                <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5 mt-0 lg:-mt-8 mb-0 lg:mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#F9F7F1] flex items-center justify-center text-[#C86B5E] mb-6">
                    <Clock3 size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4">The Time</h3>
                  <p className="text-zinc-500">{eventData.time}</p>
                </div>
              )}

              {hasValue(eventData.venue) && (
                <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5">
                  <div className="w-16 h-16 rounded-full bg-[#F9F7F1] flex items-center justify-center text-[#C86B5E] mb-6">
                    <MapPin size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4">The Venue</h3>
                  <p className="text-zinc-500">{eventData.venue}</p>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (hasValue(eventData.rawWeddingDate) || hasValue(eventData.date)) && (
        <section className="py-20 px-6 bg-[#C86B5E] text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
                Next Stop: Forever
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center backdrop-blur-sm">
                  <h3 className={`text-4xl md:text-6xl font-serif font-light mb-2`}>{item.value}</h3>
                  <p className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold opacity-90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {eventData.showSchedule && eventData.schedule && eventData.schedule.length > 0 && (
        <section className="py-24 px-6 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F7F1] border-2 border-[#C86B5E] text-[#C86B5E] mb-6 shadow-sm">
                <Navigation size={20} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                The Itinerary
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#3E362E]/10 border border-[#3E362E]/5">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#C86B5E]/30 before:to-transparent">
                
                {eventData.schedule.map((item, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Marker */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#8BA888] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Clock3 size={16} />
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#F9F7F1] p-6 rounded-2xl shadow-sm border border-[#3E362E]/5 group-hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <h3 className="font-serif text-xl">{item.title}</h3>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#C86B5E]/10 text-[#C86B5E] text-xs font-bold tracking-widest whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-sm">{item.description}</p>
                    </div>

                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && eventData.gallery && eventData.gallery.length > 0 && (
        <section className="py-24 px-6 bg-[#3E362E]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Camera className="mx-auto text-[#8BA888] mb-6" size={40} strokeWidth={1.5} />
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#F9F7F1]">
                Travel Log
              </h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {eventData.gallery.map((image, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                  className="break-inside-avoid bg-white p-3 rounded-sm shadow-xl"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full object-cover rounded-sm mb-3"
                  />
                  <div className="h-8 flex items-center justify-center font-serif text-zinc-400 text-sm">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl shadow-[#3E362E]/10 border border-[#3E362E]/5">
              <div className="text-center mb-12">
                <span className="uppercase tracking-[0.2em] text-[#8BA888] text-xs font-bold block mb-4">
                  Check-in
                </span>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
                  Boarding Pass
                </h2>
                <p className="text-zinc-500 font-light">
                  Please confirm your seat for our celebration.
                </p>
              </div>

              {rsvpSuccess ? (
                <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center">
                  <h3 className="text-2xl font-serif mb-2">Check-in Complete</h3>
                  <p>Your boarding pass has been secured. We look forward to seeing you!</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  {rsvpError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm">{rsvpError}</div>
                  )}
                  <div>
                    <input
                      type="text"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      placeholder="Passenger Name(s)"
                      className="w-full bg-[#F9F7F1] border-none rounded-xl px-6 py-5 text-[#3E362E] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C86B5E]/50 transition"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      required
                      min="1"
                      max="10"
                      value={rsvpForm.guests}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, guests: parseInt(e.target.value) || 1 })}
                      placeholder="Number of Passengers"
                      className="w-full bg-[#F9F7F1] border-none rounded-xl px-6 py-5 text-[#3E362E] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C86B5E]/50 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: true })}
                      className={`py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition ${
                        rsvpForm.attending ? `${accentBg} text-white` : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                      }`}
                    >
                      Accept
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: false })}
                      className={`py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition ${
                        !rsvpForm.attending ? `${accentBg} text-white` : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                      }`}
                    >
                      Decline
                    </button>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isRsvpSubmitting}
                    className={`w-full py-5 rounded-xl ${secondaryBg} text-white font-bold uppercase tracking-wider text-sm hover:opacity-90 transition mt-4 disabled:opacity-50`}
                  >
                    {isRsvpSubmitting ? "Processing..." : "Submit Boarding Pass"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WISHES */}
      {eventData.enableGreetings && (
        <section className="py-24 px-6 bg-[#8BA888] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.2em] text-white/70 text-xs font-bold block mb-4">
                Message in a Bottle
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                Notes from Travelers
              </h2>
            </div>

            <div className="max-w-2xl mx-auto mb-16">
              {wishSuccess ? (
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center shadow-lg border border-white/20">
                  <h3 className="text-2xl font-serif mb-2">Message Received</h3>
                  <p>Your note has been added to our bottle. Thank you!</p>
                </div>
              ) : (
                <form onSubmit={handleWishSubmit} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/10 space-y-6">
                  {wishError && (
                    <div className="bg-red-500/20 text-white p-4 rounded-xl text-center text-sm">{wishError}</div>
                  )}
                  <div>
                    <input
                      type="text"
                      required
                      value={wishForm.name}
                      onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      value={wishForm.message}
                      onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                      placeholder="Write your wishes for the couple..."
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isWishSubmitting}
                    className={`w-full py-4 rounded-xl ${bgMain} ${textMain} font-bold uppercase tracking-wider text-sm hover:opacity-90 transition disabled:opacity-50`}
                  >
                    {isWishSubmitting ? "Sending..." : "Drop Message in Bottle"}
                  </button>
                </form>
              )}
            </div>

            {validWishes.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {validWishes.map((wish, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 relative shadow-lg">
                    <Heart className="absolute top-6 right-6 text-white/20" size={32} />
                    <p className="font-serif text-lg text-white mb-6 leading-relaxed relative z-10 break-words">
                      "{wish.message}"
                    </p>
                    <span className="uppercase tracking-widest text-white/80 text-xs font-bold">
                      — {wish.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* LOCATION MAP */}
      {eventData.showVenue && (hasValue(eventData.venue) || hasValue(eventData.address) || hasValue(eventData.mapLink)) && (
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="rounded-3xl overflow-hidden border-8 border-white h-[400px] md:h-[500px] shadow-2xl relative bg-[#F9F7F1]">
              {eventData.mapLink ? (
                <iframe
                  src={eventData.mapLink}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                  <MapIcon size={48} className="mb-4 opacity-50" />
                  Map Coordinates Unavailable
                </div>
              )}
            </div>

            <div className="text-center lg:text-left bg-white p-10 rounded-[2rem] shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5">
              <span className="uppercase tracking-[0.3em] text-[#C86B5E] text-xs font-bold block mb-4">
                Coordinates
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">
                The Final Destination
              </h2>
              {hasValue(eventData.venue) && (
                <p className="text-2xl font-serif text-[#3E362E] mb-2">{eventData.venue}</p>
              )}
              {hasValue(eventData.address) && (
                <p className="text-zinc-500 mb-8 max-w-md mx-auto lg:mx-0">
                  {eventData.address}
                </p>
              )}
              
              {eventData.mapLink && (
                <a
                  href={eventData.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full ${accentBg} text-white font-bold uppercase tracking-wider text-sm hover:opacity-90 transition shadow-lg shadow-[#C86B5E]/30`}
                >
                  <Navigation size={18} /> Get Directions
                </a>
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
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                } else {
                  audioRef.current.play();
                  setIsPlaying(true);
                }
              }
            }}
            className={`w-14 h-14 rounded-full ${secondaryBg} text-white flex items-center justify-center hover:scale-110 transition duration-500 shadow-xl shadow-[#8BA888]/40 border-2 border-white`}
          >
            <span className="text-xl">{isPlaying ? "⏸" : "♫"}</span>
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-[#3E362E]/10 text-center bg-[#F9F7F1]">
        <Compass className="mx-auto w-8 h-8 text-[#C86B5E] mb-6 opacity-80" strokeWidth={1.5} />
        {hasHeroNames && (
          <h2 className="text-3xl md:text-5xl font-serif tracking-tighter mb-4 text-[#3E362E]">
            {bride} {bride && groom && <span className="text-[#C86B5E] mx-2">&</span>} {groom}
          </h2>
        )}
        <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-zinc-400 mt-8">
          The Journey to Forever • Powered by Ente Invite
        </p>
      </footer>

    </main>
  );
}
