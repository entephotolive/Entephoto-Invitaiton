"use client";

import React, { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Camera,
  Mail,
  Volume2,
  VolumeX,
  X,
  Loader2
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { submitRsvp, submitWish } from "@/lib/actions/guest";
import { ScratchToReveal } from "@/components/ui/scratch-to-reveal";
import { getMapEmbedUrl } from "@/lib/utils";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingTraditional({ eventData }: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  // Audio State
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lightbox State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // RSVP State
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    message: ""
  });
  const [isRsvpLoading, setIsRsvpLoading] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  // Wish State
  const [wishForm, setWishForm] = useState({ name: "", message: "" });
  const [isWishLoading, setIsWishLoading] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);
  const [wishError, setWishError] = useState("");

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };

  // Attempt to autoplay on first user interaction
  React.useEffect(() => {
    if (!eventData.musicUrl || !audioRef.current || isPlaying) return;

    const attemptAutoplay = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
        removeListeners();
      } catch (err) {
        // Autoplay blocked by browser
      }
    };

    const removeListeners = () => {
      document.removeEventListener("click", attemptAutoplay);
      document.removeEventListener("touchstart", attemptAutoplay);
      document.removeEventListener("scroll", attemptAutoplay);
    };

    document.addEventListener("click", attemptAutoplay, { once: true });
    document.addEventListener("touchstart", attemptAutoplay, { once: true });
    document.addEventListener("scroll", attemptAutoplay, { once: true });

    return removeListeners;
  }, [eventData.musicUrl, isPlaying]);

  const handleRsvpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsRsvpLoading(true);
    setRsvpError("");
    setRsvpSuccess(false);

    try {
      const res = await submitRsvp({
        slug: eventData.slug || "preview",
        name: rsvpForm.name,
        guests: parseInt(rsvpForm.guests, 10),
        message: rsvpForm.message,
        attending: rsvpForm.attending === "yes"
      });

      if (res.success) {
        setRsvpSuccess(true);
        setRsvpForm({ name: "", attending: "yes", guests: "1", message: "" });
      } else {
        setRsvpError(res.error || "Failed to submit RSVP.");
      }
    } catch (err) {
      setRsvpError("An unexpected error occurred.");
    } finally {
      setIsRsvpLoading(false);
    }
  };

  const handleWishSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsWishLoading(true);
    setWishError("");
    setWishSuccess(false);

    try {
      const res = await submitWish({
        slug: eventData.slug || "preview",
        name: wishForm.name,
        message: wishForm.message
      });

      if (res.success) {
        setWishSuccess(true);
        setWishForm({ name: "", message: "" });
      } else {
        setWishError(res.error || "Failed to submit wish.");
      }
    } catch (err) {
      setWishError("An unexpected error occurred.");
    } finally {
      setIsWishLoading(false);
    }
  };

  return (
    <main className="bg-[#faf6f0] text-zinc-800 overflow-x-hidden relative">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center">
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/45" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <p className="uppercase tracking-[0.4em] mb-6 text-sm">
            Together With Their Families
          </p>

          {(eventData.brideName || eventData.groomName) && (
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6 break-words">
              {eventData.brideName}
              {eventData.brideName && eventData.groomName && (
                <span className="mx-2 md:mx-4 text-[#d6b273]">&</span>
              )}
              {eventData.groomName}
            </h1>
          )}

          <p className="text-lg md:text-2xl opacity-90">
            Request the pleasure of your presence
          </p>

          {eventData.date && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <span className="text-[#d6b273] uppercase tracking-widest">
                Save The Date
              </span>
              <span className="text-2xl md:text-3xl">
                {eventData.date}
              </span>
            </div>
          )}
        </motion.div>
      </section>

      {/* BLESSINGS / PARENTS SECTION */}
      {(eventData.brideParents || eventData.groomParents) && (
        <section className="py-20 px-6 bg-white text-center border-b border-[#faf6f0]">
          <div className="max-w-4xl mx-auto">
            <span className="text-[#b99863] uppercase tracking-[0.3em] text-sm">
              With The Blessings Of
            </span>
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-12 md:gap-32 font-serif text-xl md:text-2xl text-zinc-700">
              {eventData.brideParents && (
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-zinc-400 mb-3">Bride's Family</p>
                  <p>{eventData.brideParents}</p>
                </div>
              )}
              {eventData.groomParents && (
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-zinc-400 mb-3">Groom's Family</p>
                  <p>{eventData.groomParents}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (eventData.brideName || eventData.groomName) && (
        <section className="py-32 px-6 bg-[#faf6f0]">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-[#b99863] uppercase tracking-[0.3em] font-semibold text-sm">
              The Couple
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mt-4 mb-20 text-zinc-800">
              Meet The Happy Couple
            </h2>
            <div className="grid md:grid-cols-2 gap-16 md:gap-10">
              
              {eventData.brideName && (
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-sm mx-auto mb-10 group">
                    {eventData.bridePhoto ? (
                      <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
                        <img 
                          src={eventData.bridePhoto} 
                          alt={eventData.brideName} 
                          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/5] bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-7xl">
                        👰
                      </div>
                    )}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full shadow-lg whitespace-nowrap border border-[#b99863]/20">
                      <span className="uppercase tracking-[0.2em] text-xs text-[#b99863] font-bold">The Bride</span>
                    </div>
                  </div>
                  <h3 className="text-4xl font-serif text-zinc-800">
                    {eventData.brideName}
                  </h3>
                </div>
              )}

              {eventData.groomName && (
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-sm mx-auto mb-10 group">
                    {eventData.groomPhoto ? (
                      <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
                        <img 
                          src={eventData.groomPhoto} 
                          alt={eventData.groomName} 
                          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/5] bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-7xl">
                        🤵
                      </div>
                    )}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full shadow-lg whitespace-nowrap border border-[#b99863]/20">
                      <span className="uppercase tracking-[0.2em] text-xs text-[#b99863] font-bold">The Groom</span>
                    </div>
                  </div>
                  <h3 className="text-4xl font-serif text-zinc-800">
                    {eventData.groomName}
                  </h3>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      {(eventData.date || eventData.time || eventData.venue) && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#b99863] uppercase tracking-[0.3em]">
                Wedding Details
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">
                Join Our Celebration
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {eventData.date && (
                <div className="bg-[#faf6f0] rounded-3xl p-8 shadow-sm text-center">
                  <CalendarDays className="text-[#b99863] mb-4 mx-auto" size={40} />
                  <h3 className="font-semibold text-lg mb-2">Date</h3>
                  <p className="text-zinc-600">{eventData.date}</p>
                </div>
              )}

              {eventData.time && (
                <div className="bg-[#faf6f0] rounded-3xl p-8 shadow-sm text-center">
                  <Clock3 className="text-[#b99863] mb-4 mx-auto" size={40} />
                  <h3 className="font-semibold text-lg mb-2">Time</h3>
                  <p className="text-zinc-600">{eventData.time}</p>
                </div>
              )}

              {eventData.venue && (
                <div className="bg-[#faf6f0] rounded-3xl p-8 shadow-sm text-center">
                  <MapPin className="text-[#b99863] mb-4 mx-auto" size={40} />
                  <h3 className="font-semibold text-lg mb-2">Venue</h3>
                  <p className="text-zinc-600">{eventData.venue}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COUNTDOWN SECTION WITH SCRATCH EFFECT */}
      {eventData.enableCountdown && (eventData.date || eventData.rawWeddingDate) && (
        <section className="py-24 px-6 bg-[#faf6f0] flex justify-center">
          <div className="max-w-5xl w-full">
            <div className="text-center mb-12">
              <span className="text-[#b99863] uppercase tracking-[0.3em]">
                Countdown
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">
                Counting The Days
              </h2>
            </div>
            
            <div className="bg-white rounded-[32px] p-2 shadow-xl">
              <ScratchToReveal overlayText="Scratch to Reveal Timer">
                <div className="p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-[24px]">
                  {[
                    { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                    { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                    { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                    { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#faf6f0] border border-[#b99863]/20 rounded-3xl p-3 md:p-6 text-center shadow-sm flex flex-col justify-center"
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#b99863]">
                        {item.value}
                      </div>
                      <p className="mt-2 md:mt-4 uppercase tracking-wider md:tracking-[2px] text-[9px] sm:text-[10px] md:text-xs text-zinc-500 font-semibold whitespace-nowrap">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScratchToReveal>
            </div>
          </div>
        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory && eventData.loveStory?.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <Heart className="mx-auto text-[#b99863] mb-4" size={40} />
              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">
                The Journey Of Love
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#d6b273]" />
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative mb-16 flex ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-[#b99863] border-4 border-white -translate-x-1/2" />
                  <div className="bg-[#faf6f0] shadow-sm rounded-3xl p-8 md:w-[45%] ml-12 md:ml-0">
                    <h3 className="text-2xl font-serif mb-2">{story.title}</h3>
                    <p className="text-[#b99863] mb-4 font-medium uppercase tracking-widest text-xs">{story.subtitle}</p>
                    <p className="text-zinc-600 leading-relaxed">{story.description}</p>
                    {story.image && (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="mt-6 rounded-2xl w-full h-60 object-cover shadow-sm"
                        loading="lazy"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE SECTION */}
      {eventData.showSchedule && eventData.schedule?.length > 0 && (
        <section className="py-24 px-6 bg-[#faf6f0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                Timeline
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">
                Wedding Schedule
              </h2>
            </div>
            <div className="space-y-6">
              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-[#b99863]/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                      <p className="text-zinc-600">{item.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-[#b99863] text-2xl font-serif">
                      {item.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && eventData.gallery?.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Camera className="mx-auto text-[#b99863] mb-4" size={40} />
              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                Memories
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">
                Photo Gallery
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {eventData.gallery.map((image, index) => (
                <button
                  key={index}
                  className="relative group w-full h-48 md:h-60 overflow-hidden rounded-2xl"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View gallery image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-[#b99863] transition"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <X size={40} />
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 bg-[#faf6f0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Mail className="mx-auto text-[#b99863] mb-4" size={40} />
              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                RSVP
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">
                Confirm Your Attendance
              </h2>
              <p className="mt-6 text-zinc-600">
                Kindly let us know if you will be joining us.
              </p>
            </div>
            
            <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-xl">
              {rsvpSuccess ? (
                <div className="text-center p-8">
                  <Heart className="mx-auto text-[#b99863] mb-4" size={48} />
                  <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
                  <p className="text-zinc-600">Your RSVP has been successfully received.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  {rsvpError && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm mb-4">
                      {rsvpError}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="rsvpName" className="sr-only">Your Name</label>
                    <input
                      id="rsvpName"
                      type="text"
                      placeholder="Your Name"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      className="w-full p-4 rounded-xl border bg-[#faf6f0] focus:outline-none focus:ring-2 focus:ring-[#b99863]/50 transition-shadow"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="rsvpAttending" className="sr-only">Attendance</label>
                      <select
                        id="rsvpAttending"
                        value={rsvpForm.attending}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, attending: e.target.value })}
                        className="w-full p-4 rounded-xl border bg-[#faf6f0] focus:outline-none focus:ring-2 focus:ring-[#b99863]/50 transition-shadow"
                      >
                        <option value="yes">Joyfully Accept</option>
                        <option value="no">Regretfully Decline</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="rsvpGuests" className="sr-only">Number of Guests</label>
                      <select
                        id="rsvpGuests"
                        value={rsvpForm.guests}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                        disabled={rsvpForm.attending === "no"}
                        className="w-full p-4 rounded-xl border bg-[#faf6f0] focus:outline-none focus:ring-2 focus:ring-[#b99863]/50 disabled:opacity-50 transition-shadow"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rsvpMessage" className="sr-only">Message (Optional)</label>
                    <textarea
                      id="rsvpMessage"
                      rows={4}
                      placeholder="Message for the couple (Optional)"
                      value={rsvpForm.message}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                      className="w-full p-4 rounded-xl border bg-[#faf6f0] focus:outline-none focus:ring-2 focus:ring-[#b99863]/50 transition-shadow"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isRsvpLoading}
                    className="w-full py-5 rounded-xl bg-[#b99863] text-white text-lg font-serif tracking-widest hover:bg-zinc-900 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isRsvpLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Submit RSVP
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WISHES SECTION */}
      {eventData.enableGreetings && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heart className="mx-auto text-[#b99863] mb-4" size={40} />
              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                Guest Wishes
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">
                Messages Of Love
              </h2>
            </div>
            
            {/* WISH FORM */}
            <div className="max-w-2xl mx-auto mb-16 bg-[#faf6f0] p-10 rounded-[32px] shadow-sm">
              {wishSuccess ? (
                <div className="text-center p-6">
                  <h3 className="text-xl font-serif mb-2 text-[#b99863]">Wish Sent!</h3>
                  <p className="text-zinc-600 text-sm">Thank you for your beautiful message.</p>
                </div>
              ) : (
                <form onSubmit={handleWishSubmit} className="space-y-4">
                  <h3 className="font-serif text-2xl mb-6 text-center text-zinc-800">Leave a Wish</h3>
                  {wishError && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs">
                      {wishError}
                    </div>
                  )}
                  <div>
                    <label htmlFor="wishName" className="sr-only">Your Name</label>
                    <input
                      id="wishName"
                      type="text"
                      placeholder="Your Name"
                      required
                      value={wishForm.name}
                      onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                      className="w-full p-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#b99863]/50 transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="wishMessage" className="sr-only">Your Wish</label>
                    <textarea
                      id="wishMessage"
                      rows={3}
                      placeholder="Your beautiful wish..."
                      required
                      value={wishForm.message}
                      onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                      className="w-full p-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#b99863]/50 transition-shadow"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isWishLoading}
                    className="w-full py-4 rounded-xl bg-[#b99863] text-white font-medium hover:bg-zinc-900 transition-colors disabled:opacity-70 flex justify-center items-center gap-2 shadow-sm"
                  >
                    {isWishLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Send Wish
                  </button>
                </form>
              )}
            </div>

            {/* WISHES GRID */}
            {eventData.wishes && eventData.wishes.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventData.wishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#faf6f0] rounded-3xl p-8 shadow-sm border border-[#b99863]/10"
                  >
                    <div className="text-[#b99863] text-4xl mb-4">❝</div>
                    <p className="text-zinc-600 leading-relaxed mb-6">
                      {wish.message}
                    </p>
                    <div className="font-semibold">{wish.name}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* LOCATION SECTION (FLUENT MAP LAYOUT) */}
      {eventData.showVenue && (eventData.venue || eventData.address || eventData.mapLink) && (
        <section className="relative py-32 bg-zinc-900">
          {eventData.mapLink && (
            <div className="absolute inset-0 z-0">
              <iframe
                src={getMapEmbedUrl(eventData.mapLink, `${eventData.venue || ''} ${eventData.address || ''}`)}
                className="w-full h-full border-0 opacity-70 grayscale-[30%]"
                loading="lazy"
                title="Google Maps showing wedding venue location"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/40 to-transparent pointer-events-none" />
            </div>
          )}
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 flex items-center min-h-[400px]">
            <div className="bg-white/95 backdrop-blur-xl p-10 md:p-14 rounded-[40px] shadow-2xl max-w-md w-full border border-white/20">
              <MapPin className="text-[#b99863] mb-6" size={48} />
              <span className="uppercase tracking-[0.3em] text-xs text-[#b99863] font-bold">
                Wedding Venue
              </span>
              
              {eventData.venue && (
                <h3 className="text-4xl font-serif mt-4 mb-4 text-zinc-900">{eventData.venue}</h3>
              )}
              {eventData.address && (
                <p className="text-zinc-600 leading-relaxed mb-8">{eventData.address}</p>
              )}
              {eventData.mapLink && (
                <a
                  href={eventData.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full bg-[#b99863] text-white font-medium hover:bg-zinc-900 transition-colors shadow-lg"
                >
                  Get Directions
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FLOATING MUSIC BUTTON */}
      {eventData.musicUrl && (
        <div className="fixed bottom-6 right-6 z-40">
          <audio ref={audioRef} src={eventData.musicUrl} loop />
          <button
            onClick={handleAudioToggle}
            aria-label="Toggle background music"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#b99863] text-white shadow-2xl hover:scale-110 transition-transform"
          >
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border-2 border-[#b99863] animate-ping opacity-75" />
            )}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative z-10"
            >
              {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.div>
          </button>
        </div>
      )}

      {/* FOOTER */}
      {(eventData.brideName || eventData.groomName) && (
        <footer className="py-32 px-6 text-center bg-[#faf6f0]">
          <div className="max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[#b99863]">
              Thank You
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mt-6 mb-10">
              We Can't Wait
              <br />
              To Celebrate With You
            </h2>
            <div className="text-3xl md:text-5xl font-serif mb-6 break-words">
              {eventData.brideName}
              {eventData.brideName && eventData.groomName && (
                <span className="mx-2 md:mx-4 text-[#b99863]">&</span>
              )}
              {eventData.groomName}
            </div>
            <p className="text-zinc-600">With love and gratitude.</p>
          </div>
        </footer>
      )}

    </main>
  );
}