  "use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { submitRsvp, submitWish } from "@/lib/actions/guest";
import { dummyWeddingImages } from "@/data/dummyImages";
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

interface Props {
  eventData: WeddingEventData;
}

// Helper: returns true only if value is a non-empty, non-whitespace string
function hasValue(val: string | undefined | null): boolean {
  return typeof val === "string" && val.trim().length > 0;
}

export default function WeddingModern({ eventData }: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Guard computed values
  const bride = hasValue(eventData.brideName) ? eventData.brideName! : null;
  const groom = hasValue(eventData.groomName) ? eventData.groomName! : null;
  const hasHeroNames = bride || groom;

  const hasEventDetails =
    hasValue(eventData.date) || hasValue(eventData.time) || hasValue(eventData.venue);

  // Guard: couple section only shown if at least one name exists OR photos exist
  const hasCoupleContent =
    eventData.showCoupleInfo && (bride || groom || eventData.bridePhoto || eventData.groomPhoto);

  // Guard: venue section with actual data
  const hasVenueContent = eventData.showVenue && (hasValue(eventData.venue) || hasValue(eventData.address));

  // Form states
  const [rsvpData, setRsvpData] = useState({ name: "", guests: 1, message: "", attending: true });
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

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
    } catch (err) {
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
    } catch (err) {
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
    <main className="bg-[#0f172a] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-center justify-center">

        {/* Background image — conditionally rendered */}
        {hasValue(eventData.heroImage) && (
          <img
            src={eventData.heroImage!}
            alt="Wedding hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay always rendered so text is legible even without image */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 md:px-6 w-full max-w-4xl mx-auto"
        >
          <p className="uppercase tracking-[0.2em] md:tracking-[0.5em] text-sky-400 text-xs md:text-sm mb-6">
            Digital Wedding Invitation
          </p>

          {/* Names — only render if they exist */}
          {hasHeroNames && (
            <div className="mb-6">
              {bride && (
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold break-words">
                  {bride}
                </h1>
              )}
              {bride && groom && (
                <div className="text-sky-400 text-4xl sm:text-5xl my-4">&</div>
              )}
              {groom && (
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold break-words">
                  {groom}
                </h1>
              )}
            </div>
          )}

          {/* Date — only render if it exists */}
          {hasValue(eventData.date) && (
            <>
              <p className="mt-8 md:mt-10 text-lg md:text-xl text-zinc-300">
                Save The Date
              </p>
              <p className="text-2xl md:text-3xl font-light mt-3">
                {eventData.date}
              </p>
            </>
          )}

          <button
            className="mt-8 md:mt-10 px-6 md:px-8 py-3 md:py-4 rounded-full bg-sky-500 hover:bg-sky-600 transition text-sm md:text-base"
            onClick={() => document.getElementById("event-details")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Invitation
          </button>
        </motion.div>

      </section>

      {/* ── COUPLE SECTION ── */}
      {hasCoupleContent && (
        <section id="couple" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                The Couple
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Meet The Happy Couple
              </h2>
            </div>

            {/* Dynamic grid: 1 col if only one person, 2 cols if both */}
            <div className={`grid grid-cols-1 ${bride && groom ? "md:grid-cols-2" : ""} gap-6 md:gap-8 max-w-3xl mx-auto`}>

              {/* Bride card — only if bride has name or photo */}
              {(bride || eventData.bridePhoto) && (
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center"
                >
                  {eventData.bridePhoto ? (
                    <img
                      src={eventData.bridePhoto}
                      alt="Bride"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-6 border-4 border-sky-400/20 shadow-xl shadow-sky-900/20"
                    />
                  ) : (
                    <div className="text-6xl md:text-7xl mb-6">👰</div>
                  )}

                  {bride && (
                    <h3 className="text-2xl md:text-3xl font-bold">{bride}</h3>
                  )}

                  <p className="text-zinc-400 mt-3">Bride</p>
                </motion.div>
              )}

              {/* Groom card — only if groom has name or photo */}
              {(groom || eventData.groomPhoto) && (
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center"
                >
                  {eventData.groomPhoto ? (
                    <img
                      src={eventData.groomPhoto}
                      alt="Groom"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-6 border-4 border-sky-400/20 shadow-xl shadow-sky-900/20"
                    />
                  ) : (
                    <div className="text-6xl md:text-7xl mb-6">🤵</div>
                  )}

                  {groom && (
                    <h3 className="text-2xl md:text-3xl font-bold">{groom}</h3>
                  )}

                  <p className="text-zinc-400 mt-3">Groom</p>
                </motion.div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ── PARENTS BLESSINGS ── */}
      {(hasValue(eventData.brideParents) || hasValue(eventData.groomParents)) && (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                With Love From
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">The Families</h2>
            </div>
            
            <div className={`grid gap-6 md:gap-8 ${hasValue(eventData.brideParents) && hasValue(eventData.groomParents) ? "md:grid-cols-2" : "max-w-2xl mx-auto grid-cols-1"}`}>
              {/* Bride Parents */}
              {hasValue(eventData.brideParents) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 text-center relative overflow-hidden"
                >
                  <div className="absolute top-4 left-4 text-sky-400/20 text-6xl font-serif">"</div>
                  <p className="text-lg md:text-xl text-zinc-300 italic relative z-10 leading-relaxed mb-6">
                    {eventData.brideParents}
                  </p>
                  <p className="text-sky-400 uppercase tracking-widest text-xs font-bold">
                    {bride ? `Parents of ${bride}` : "The Bride's Family"}
                  </p>
                </motion.div>
              )}

              {/* Groom Parents */}
              {hasValue(eventData.groomParents) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 text-center relative overflow-hidden"
                >
                  <div className="absolute top-4 left-4 text-sky-400/20 text-6xl font-serif">"</div>
                  <p className="text-lg md:text-xl text-zinc-300 italic relative z-10 leading-relaxed mb-6">
                    {eventData.groomParents}
                  </p>
                  <p className="text-sky-400 uppercase tracking-widest text-xs font-bold">
                    {groom ? `Parents of ${groom}` : "The Groom's Family"}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── EVENT DETAILS ── */}
      {hasEventDetails && (
        <section id="event-details" className="py-16 md:py-24 px-4 md:px-6 bg-black/20">
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

              {hasValue(eventData.date) && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
                  <CalendarDays className="text-sky-400 mb-4" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Date</h3>
                  <p className="text-zinc-300">{eventData.date}</p>
                </div>
              )}

              {hasValue(eventData.time) && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
                  <Clock3 className="text-sky-400 mb-4" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Time</h3>
                  <p className="text-zinc-300">{eventData.time}</p>
                </div>
              )}

              {hasValue(eventData.venue) && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl sm:col-span-2 lg:col-span-1">
                  <MapPin className="text-sky-400 mb-4" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Venue</h3>
                  <p className="text-zinc-300">{eventData.venue}</p>
                  {hasValue(eventData.address) && (
                    <p className="text-zinc-400 text-sm mt-1">{eventData.address}</p>
                  )}
                  {hasValue(eventData.mapLink) && (
                    <a
                      href={eventData.mapLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-sky-400 text-sm hover:text-sky-300 underline transition"
                    >
                      Open in Maps →
                    </a>
                  )}
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ── COUNTDOWN ── */}
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

      {/* ── LOVE STORY ── */}
      {eventData.showStory && eventData.loveStory && eventData.loveStory.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <Heart className="mx-auto text-sky-400 mb-4" size={40} />
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Love Journey</h2>
            </div>

            {(() => {
              const validStories = eventData.loveStory.filter(
                (story) => hasValue(story.title) || hasValue(story.description) || hasValue(story.image)
              );

              if (validStories.length === 0) return null;

              let gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
              if (validStories.length === 1) gridClass = "grid-cols-1 max-w-md mx-auto";
              if (validStories.length === 2) gridClass = "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";

              return (
                <div className={`grid ${gridClass} gap-6 md:gap-8`}>
                  {validStories.map((story, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl"
                    >
                      <img
                        src={(story as any).image || dummyWeddingImages[index % dummyWeddingImages.length]}
                        alt={story.title || `Story ${index + 1}`}
                        className="w-full h-52 md:h-60 object-cover"
                      />

                      <div className="p-6 md:p-8">
                        {hasValue(story.subtitle) && (
                          <p className="text-sky-400 text-xs md:text-sm uppercase tracking-wider mb-2">
                            {story.subtitle}
                          </p>
                        )}
                        {hasValue(story.title) && (
                          <h3 className="text-xl md:text-2xl font-bold mb-4">{story.title}</h3>
                        )}
                        {hasValue(story.description) && (
                          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                            {story.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ── SCHEDULE ── */}
      {eventData.showSchedule && eventData.schedule && eventData.schedule.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Timeline
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Event Schedule</h2>
            </div>

            <div className="space-y-6 md:space-y-8">
              {eventData.schedule.map((item, index) => {
                // Skip entries with no meaningful data
                if (!hasValue(item.title) && !hasValue(item.description) && !hasValue(item.time)) return null;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        {hasValue(item.title) && (
                          <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                        )}
                        {hasValue(item.description) && (
                          <p className="text-sm md:text-base text-zinc-400">{item.description}</p>
                        )}
                      </div>

                      {hasValue(item.time) && (
                        <div className="shrink-0">
                          <span className="inline-flex px-4 py-2 md:px-5 md:py-3 rounded-full bg-sky-500 text-white font-semibold text-sm md:text-base shadow-lg shadow-sky-500/20">
                            {item.time}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {eventData.showGallery && eventData.gallery && eventData.gallery.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Captured Moments</h2>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
              {eventData.gallery.filter(Boolean).map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  src={image}
                  alt={`Gallery photo ${index + 1}`}
                  loading="lazy"
                  className="mb-4 md:mb-6 rounded-[24px] md:rounded-[32px] w-full shadow-2xl cursor-pointer break-inside-avoid"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      {eventData.rsvpEnabled && (
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                RSVP
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Confirm Attendance</h2>
              <p className="mt-4 text-sm md:text-base text-zinc-400">
                Let us know if you'll be joining us.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-12">
              {rsvpSuccess ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">💌</div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Thank you!</h3>
                  <p className="text-zinc-400">Your RSVP has been successfully submitted.</p>
                </div>
              ) : (
                <form className="space-y-4 md:space-y-6" onSubmit={handleRsvpSubmit}>
                  <input
                    type="text"
                    required
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors"
                  />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={rsvpData.guests}
                    onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value) || 1 })}
                    placeholder="Number of Guests"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors"
                  />
                  <textarea
                    rows={4}
                    value={rsvpData.message}
                    onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                    placeholder="Leave a message (optional)..."
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors resize-none"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpData({ ...rsvpData, attending: true })}
                      className={`py-3 md:py-4 rounded-2xl transition text-sm md:text-base font-medium border border-transparent ${
                        rsvpData.attending ? "bg-green-500 text-white" : "bg-white/10 text-zinc-400 hover:bg-white/20"
                      }`}
                    >
                      Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpData({ ...rsvpData, attending: false })}
                      className={`py-3 md:py-4 rounded-2xl transition text-sm md:text-base font-medium border border-transparent ${
                        !rsvpData.attending ? "bg-red-500 text-white" : "bg-white/10 text-zinc-400 hover:bg-white/20"
                      }`}
                    >
                      Not Attending
                    </button>
                  </div>

                  {rsvpError && (
                    <p className="text-red-400 text-sm text-center">{rsvpError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={rsvpLoading}
                    className="w-full py-3 md:py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 transition font-semibold text-sm md:text-base mt-2"
                  >
                    {rsvpLoading ? "Submitting..." : "Submit RSVP"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── WISHES WALL ── */}
      {eventData.enableGreetings && (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Wishes
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Messages Of Love</h2>
            </div>

            {/* Send a wish form */}
            <div className="max-w-3xl mx-auto mb-16 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-10">
              {wishSuccess ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-xl font-bold text-sky-400 mb-2">Thank you!</h3>
                  <p className="text-zinc-400">Your warm wishes have been sent.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleWishSubmit}>
                  <input
                    type="text"
                    required
                    value={wishData.name}
                    onChange={(e) => setWishData({ ...wishData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors"
                  />
                  <textarea
                    required
                    rows={3}
                    value={wishData.message}
                    onChange={(e) => setWishData({ ...wishData, message: e.target.value })}
                    placeholder="Write a lovely wish for the couple..."
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm md:text-base focus:border-sky-500 transition-colors resize-none"
                  />
                  {wishError && (
                    <p className="text-red-400 text-sm">{wishError}</p>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={wishLoading}
                      className="px-8 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 transition font-semibold text-sm md:text-base"
                    >
                      {wishLoading ? "Sending..." : "Send Wish"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Wishes grid — only show if there are wishes with actual content */}
            {eventData.wishes && eventData.wishes.filter(w => hasValue(w.message)).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventData.wishes
                  .filter(w => hasValue(w.message))
                  .map((wish, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl"
                    >
                      <div className="text-sky-400 text-4xl md:text-5xl mb-4">❝</div>
                      <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6">
                        {wish.message}
                      </p>
                      {hasValue(wish.name) && (
                        <div className="font-semibold text-sky-400 text-sm md:text-base">
                          — {wish.name}
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── VENUE / LOCATION ── */}
      {hasVenueContent && (
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
                Venue
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Event Location</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl text-center">
                {hasValue(eventData.venue) && (
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{eventData.venue}</h3>
                )}
                {hasValue(eventData.address) && (
                  <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 md:mb-10">
                    {eventData.address}
                  </p>
                )}
                {hasValue(eventData.mapLink) && (
                  <a
                    href={eventData.mapLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-600 transition text-sm md:text-base font-semibold"
                  >
                    <MapPin size={16} />
                    Open in Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── AMBIENT MUSIC ── */}
      {hasValue(eventData.musicUrl) && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <audio ref={audioRef} src={eventData.musicUrl!} loop />
          <button
            onClick={toggleAudio}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={isPlaying ? "Pause music" : "Play music"}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full text-white text-xl md:text-2xl shadow-2xl transition flex items-center justify-center ${
              isPlaying ? "bg-sky-600 hover:bg-sky-700" : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {isPlaying ? <Music2 size={20} /> : <Music size={20} />}
          </button>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-24 md:py-32 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sky-400 text-xs md:text-sm">
            Thank You
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mt-4 md:mt-6 mb-6 md:mb-8">
            See You At
            <br />
            The Celebration
          </h2>

          {/* Only render names row if at least one name exists */}
          {hasHeroNames && (
            <div className="text-3xl md:text-4xl lg:text-6xl font-bold">
              {bride}
              {bride && groom && (
                <span className="mx-2 md:mx-4 text-sky-400">&</span>
              )}
              {groom}
            </div>
          )}

          <p className="mt-8 text-xs md:text-sm text-zinc-500">
            Crafted with ❤️ using Ente Invite
          </p>
        </div>
      </footer>

    </main>
  );
}