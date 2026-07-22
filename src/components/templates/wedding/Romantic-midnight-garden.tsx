"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Flower2,
  Leaf,
  Sparkles,
  MoonStar
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { hasValue } from "@/lib/utils";
import { submitRsvp, submitWish } from "@/lib/actions/guest";

interface Props {
  eventData: WeddingEventData;
}

export default function RomanticMidnightGarden({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Computed data checks
  const bride = hasValue(eventData.brideName) ? eventData.brideName : null;
  const groom = hasValue(eventData.groomName) ? eventData.groomName : null;
  const hasHeroNames = bride || groom;
  const hasCoupleContent = bride || groom;
  const hasParentsContent = hasValue(eventData.brideParents) || hasValue(eventData.groomParents);

  const validStories = eventData.loveStory?.filter(
    (story) => hasValue(story.title) || hasValue(story.description) || hasValue(story.image)
  ) || [];

  const validSchedule = eventData.schedule?.filter(
    (item) => hasValue(item.title) || hasValue(item.description) || hasValue(item.time)
  ) || [];

  const validGallery = eventData.gallery?.filter(img => hasValue(img)) || [];
  
  const validWishes = eventData.wishes?.filter(
    (wish) => hasValue(wish.message) && hasValue(wish.name)
  ) || [];

  // RSVP Form State
  const [rsvpForm, setRsvpForm] = useState({ name: "", guests: 1, attending: true, message: "" });
  const [isRsvpSubmitting, setIsRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRsvpSubmitting(true);
    setRsvpError("");
    
    try {
      await submitRsvp({
        slug: eventData.slug || "",
        ...rsvpForm
      });
      setRsvpSuccess(true);
    } catch (err: any) {
      setRsvpError(err.message || "Failed to submit RSVP");
    } finally {
      setIsRsvpSubmitting(false);
    }
  };

  // Wishes Form State
  const [wishForm, setWishForm] = useState({ name: "", message: "" });
  const [isWishSubmitting, setIsWishSubmitting] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);
  const [wishError, setWishError] = useState("");

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
        message: wishForm.message
      });
      setWishSuccess(true);
      setWishForm({ name: "", message: "" });
    } catch (err: any) {
      setWishError(err.message || "Failed to submit wish");
    } finally {
      setIsWishSubmitting(false);
    }
  };

  return (
    <main className="relative bg-gradient-to-br from-emerald-950 via-indigo-950 to-slate-950 text-white overflow-x-hidden selection:bg-rose-400 selection:text-white">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 text-emerald-800/10"
        >
          <Leaf size={400} strokeWidth={0.5} />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 -right-64 text-rose-800/10"
        >
          <Flower2 size={600} strokeWidth={0.5} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 text-rose-300"
        >
          <Sparkles size={100} strokeWidth={1} />
        </motion.div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center z-10">

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-purple-950/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center px-6"
        >
          <p className="uppercase tracking-[0.5em] text-rose-300 text-sm mb-6">
            A Celebration of Love
          </p>

          {hasHeroNames && (
            <>
              {bride && (
                <h1 className="text-6xl md:text-8xl font-bold">
                  {bride}
                </h1>
              )}

              {bride && groom && (
                <div className="text-rose-300 text-5xl my-4">
                  &
                </div>
              )}

              {groom && (
                <h1 className="text-6xl md:text-8xl font-bold">
                  {groom}
                </h1>
              )}
            </>
          )}

          <p className="mt-10 text-xl text-indigo-200">
            Join Us Under The Starlight
          </p>

          {hasValue(eventData.date) && (
            <p className="text-3xl font-light mt-3">
              {eventData.date}
            </p>
          )}

          <button className="mt-10 px-8 py-4 rounded-full bg-rose-400 hover:bg-rose-500 text-purple-950 font-semibold transition">
            Explore Our Evening
          </button>
        </motion.div>

      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && hasCoupleContent && (
        <section className="py-24 px-6 bg-emerald-900/10 border-y border-white/5">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-rose-300">
                The Couple
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Meet The Happy Couple
              </h2>

            </div>

            <div className={`grid gap-8 ${bride && groom ? 'md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
              
              {bride && (
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[32px] p-10 flex flex-col items-center text-center"
                >
                  {hasValue(eventData.bridePhoto) ? (
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-white/20 shadow-2xl">
                      <img src={eventData.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="text-rose-300 mb-6 flex justify-center">
                      <Flower2 size={72} strokeWidth={1} />
                    </div>
                  )}

                  <h3 className="text-3xl font-bold">
                    {bride}
                  </h3>

                  <p className="text-indigo-200 mt-3">
                    Bride
                  </p>
                </motion.div>
              )}

              {groom && (
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[32px] p-10 flex flex-col items-center text-center"
                >
                  {hasValue(eventData.groomPhoto) ? (
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-white/20 shadow-2xl">
                      <img src={eventData.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="text-emerald-300 mb-6 flex justify-center">
                      <Leaf size={72} strokeWidth={1} />
                    </div>
                  )}

                  <h3 className="text-3xl font-bold">
                    {groom}
                  </h3>

                  <p className="text-indigo-200 mt-3">
                    Groom
                  </p>
                </motion.div>
              )}

            </div>

          </div>

        </section>
      )}

      {/* THE FAMILIES */}
      {hasParentsContent && (
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-rose-300">
                With Love From
              </span>
              <h2 className="text-5xl font-bold mt-4">
                The Families
              </h2>
            </div>

            <div className={`grid gap-8 ${hasValue(eventData.brideParents) && hasValue(eventData.groomParents) ? 'md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
              
              {hasValue(eventData.brideParents) && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-md text-center">
                  <h3 className="font-semibold text-2xl mb-6 text-rose-300">Bride's Family</h3>
                  <p className="text-indigo-200 leading-relaxed whitespace-pre-line">
                    {eventData.brideParents}
                  </p>
                </div>
              )}

              {hasValue(eventData.groomParents) && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-md text-center">
                  <h3 className="font-semibold text-2xl mb-6 text-rose-300">Groom's Family</h3>
                  <p className="text-indigo-200 leading-relaxed whitespace-pre-line">
                    {eventData.groomParents}
                  </p>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      {(hasValue(eventData.date) || hasValue(eventData.time) || hasValue(eventData.venue)) && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-rose-300">
                Event Details
              </span>
              <h2 className="text-5xl font-bold mt-4">
                Wedding Information
              </h2>
            </div>

            <div className={`grid gap-6 ${
              [hasValue(eventData.date), hasValue(eventData.time), hasValue(eventData.venue)].filter(Boolean).length === 3 
                ? 'lg:grid-cols-3' 
                : [hasValue(eventData.date), hasValue(eventData.time), hasValue(eventData.venue)].filter(Boolean).length === 2 
                ? 'lg:grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-1 max-w-md mx-auto'
            }`}>

              {hasValue(eventData.date) && (
                <div className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md text-center">
                  <CalendarDays className="text-rose-300 mb-4 mx-auto" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Date</h3>
                  <p className="text-indigo-200">{eventData.date}</p>
                </div>
              )}

              {hasValue(eventData.time) && (
                <div className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md text-center">
                  <Clock3 className="text-rose-300 mb-4 mx-auto" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Time</h3>
                  <p className="text-indigo-200">{eventData.time}</p>
                </div>
              )}

              {hasValue(eventData.venue) && (
                <div className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md text-center">
                  <MapPin className="text-rose-300 mb-4 mx-auto" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Venue</h3>
                  <p className="text-indigo-200">{eventData.venue}</p>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (hasValue(eventData.rawWeddingDate) || hasValue(eventData.date)) && (
        <section className="py-24 px-6 bg-emerald-900/10 border-y border-white/5">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-rose-300">
                Countdown
              </span>

              <h2 className="text-5xl font-bold mt-4">
                The Awaits
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
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[32px] p-8 text-center"
                >
                  <h3 className="text-5xl font-bold text-rose-300">
                    {item.value}
                  </h3>

                  <p className="mt-3 text-indigo-200">
                    {item.label}
                  </p>
                </motion.div>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory && validStories.length > 0 && (
          <section className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-20">

                <Heart
                  className="mx-auto text-rose-300 mb-4"
                  size={40}
                />

                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Our Story
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  A Midnight Romance
                </h2>

              </div>

              <div className={`grid gap-8 ${
                validStories.length === 1 
                  ? 'grid-cols-1 max-w-md mx-auto' 
                  : validStories.length === 2 
                  ? 'md:grid-cols-2 max-w-4xl mx-auto' 
                  : 'md:grid-cols-2 lg:grid-cols-3'
              }`}>

                {validStories.map((story, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                    className="bg-white/10 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-md"
                  >
                    {hasValue(story.image) && (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-60 object-cover"
                      />
                    )}

                    <div className="p-8">

                      {hasValue(story.subtitle) && (
                        <p className="text-rose-300 text-sm uppercase tracking-wider mb-2">
                          {story.subtitle}
                        </p>
                      )}

                      {hasValue(story.title) && (
                        <h3 className="text-2xl font-bold mb-4">
                          {story.title}
                        </h3>
                      )}

                      {hasValue(story.description) && (
                        <p className="text-indigo-200 leading-relaxed">
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
          <section className="py-24 px-6 bg-emerald-900/10 border-y border-white/5">

            <div className="max-w-5xl mx-auto">

              <div className="text-center mb-20">

                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Timeline
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  Evening Itinerary
                </h2>

              </div>

              <div className="space-y-8">

                {validSchedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                      <div>
                        {hasValue(item.title) && (
                          <h3 className="text-2xl font-bold mb-2">
                            {item.title}
                          </h3>
                        )}

                        {hasValue(item.description) && (
                          <p className="text-indigo-200">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {hasValue(item.time) && (
                        <div className="mt-4 md:mt-0 md:ml-4 shrink-0">
                          <span className="inline-flex px-5 py-3 rounded-full bg-rose-400 text-purple-950 font-semibold whitespace-nowrap">
                            {item.time}
                          </span>
                        </div>
                      )}

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && validGallery.length > 0 && (
          <section className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">

                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Gallery
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  Midnight Memories
                </h2>

              </div>

              <div className={`gap-4 ${
                validGallery.length === 1
                  ? 'max-w-md mx-auto'
                  : validGallery.length === 2
                  ? 'columns-1 md:columns-2 max-w-4xl mx-auto'
                  : 'columns-1 md:columns-2 lg:columns-3'
              }`}>

                {validGallery.map((image, index) => (
                  <motion.img
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    src={image}
                    alt=""
                    className="mb-4 rounded-[32px] w-full shadow-2xl cursor-pointer"
                  />
                ))}

              </div>

            </div>

          </section>
      )}
            {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 bg-emerald-900/10 border-y border-white/5">

          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-rose-300">
                RSVP
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Confirm Your Presence
              </h2>

              <p className="mt-4 text-indigo-200">
                Let us know if you'll be joining us for the evening.
              </p>

            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8 md:p-12">

              {rsvpSuccess ? (
                <div className="bg-emerald-500/20 text-emerald-200 p-8 rounded-2xl text-center">
                  <h3 className="text-2xl font-bold mb-2">RSVP Received</h3>
                  <p>Thank you for letting us know!</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  {rsvpError && (
                    <div className="bg-red-500/20 text-white p-4 rounded-xl text-center text-sm">{rsvpError}</div>
                  )}

                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-indigo-200/50 focus:border-rose-300 transition"
                  />

                  <input
                    type="number"
                    required
                    min="1"
                    max="10"
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: parseInt(e.target.value) || 1 })}
                    placeholder="Number of Guests"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-indigo-200/50 focus:border-rose-300 transition"
                  />

                  <textarea
                    rows={5}
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    placeholder="Leave a message..."
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-indigo-200/50 focus:border-rose-300 transition resize-none"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: true })}
                      className={`py-4 rounded-2xl transition text-white font-semibold ${
                        rsvpForm.attending ? 'bg-emerald-600' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: false })}
                      className={`py-4 rounded-2xl transition text-white font-semibold ${
                        !rsvpForm.attending ? 'bg-rose-700' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      Not Attending
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isRsvpSubmitting}
                    className="w-full py-4 rounded-2xl bg-rose-400 hover:bg-rose-500 text-purple-950 font-semibold transition disabled:opacity-50"
                  >
                    {isRsvpSubmitting ? "Submitting..." : "Submit RSVP"}
                  </button>

                </form>
              )}

            </div>

          </div>

        </section>
      )}

      {/* WISHES WALL */}
      {eventData.enableGreetings && (
          <section className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">
                <span className="uppercase tracking-[0.3em] text-rose-300">
                  Wishes
                </span>
                <h2 className="text-5xl font-bold mt-4">
                  Messages From The Heart
                </h2>
              </div>

              <div className="max-w-3xl mx-auto mb-20 bg-white/5 border border-white/10 backdrop-blur-md rounded-[32px] p-8">
                {wishSuccess ? (
                  <div className="text-center text-emerald-300 font-semibold py-8">
                    Your beautiful message has been added to our garden of wishes.
                  </div>
                ) : (
                  <form onSubmit={handleWishSubmit} className="space-y-6">
                    {wishError && <div className="text-rose-400 text-center text-sm">{wishError}</div>}
                    <input
                      type="text"
                      required
                      value={wishForm.name}
                      onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-indigo-200/50 focus:border-rose-300 transition"
                    />
                    <textarea
                      required
                      rows={3}
                      value={wishForm.message}
                      onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                      placeholder="Write your wishes..."
                      className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-indigo-200/50 focus:border-rose-300 transition resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isWishSubmitting}
                      className="w-full py-4 rounded-2xl bg-rose-400 hover:bg-rose-500 text-purple-950 font-semibold transition disabled:opacity-50"
                    >
                      {isWishSubmitting ? "Sending..." : "Send Wish"}
                    </button>
                  </form>
                )}
              </div>

              {validWishes.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {validWishes.map((wish, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -8 }}
                      className="bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-md"
                    >
                      <div className="text-rose-300 text-5xl mb-4">
                        ❝
                      </div>

                      <p className="text-indigo-200 leading-relaxed mb-6 break-words">
                        {wish.message}
                      </p>

                      <div className="font-semibold text-rose-300">
                        {wish.name}
                      </div>

                    </motion.div>
                  ))}

                </div>
              )}

            </div>

          </section>
      )}

      {/* LOCATION */}
      {eventData.showVenue && (hasValue(eventData.venue) || hasValue(eventData.address) || hasValue(eventData.mapLink)) && (
        <section className="py-24 px-6 bg-emerald-900/10 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-rose-300">
                Venue
              </span>
              <h2 className="text-5xl font-bold mt-4">
                Our Secret Garden
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">

              <div className="bg-white/10 border border-white/10 rounded-[32px] p-10 backdrop-blur-md">
                
                {hasValue(eventData.venue) && (
                  <h3 className="text-3xl font-bold mb-6">
                    {eventData.venue}
                  </h3>
                )}

                {hasValue(eventData.address) && (
                  <p className="text-indigo-200 leading-relaxed mb-8">
                    {eventData.address}
                  </p>
                )}

                {hasValue(eventData.mapLink) && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-8 py-4 rounded-full bg-rose-400 hover:bg-rose-500 text-purple-950 font-semibold transition"
                  >
                    Find Your Way
                  </a>
                )}

              </div>

              <div className="rounded-[32px] overflow-hidden border border-white/10 min-h-[450px]">
                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0 min-h-[450px]"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-white/10 min-h-[450px]">
                    <p className="text-indigo-300">
                      Map Preview Not Available
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* MUSIC BUTTON */}
      {hasValue(eventData.musicUrl) && (
        <div className="fixed bottom-6 right-6 z-50">
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
            className="w-16 h-16 rounded-full bg-rose-400 hover:bg-rose-500 text-purple-950 text-2xl shadow-2xl transition flex items-center justify-center"
          >
            {isPlaying ? "⏸" : "🌙"}
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] text-rose-300">
            With Love
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mt-6 mb-8">
            See You Under
            <br />
            The Stars
          </h2>

          {hasHeroNames && (
            <div className="text-4xl md:text-6xl font-bold flex items-center justify-center flex-wrap gap-4">
              {bride && <span>{bride}</span>}
              {bride && groom && (
                <span className="text-rose-300">&</span>
              )}
              {groom && <span>{groom}</span>}
            </div>
          )}

          <p className="mt-8 text-indigo-300">
            Crafted with midnight elegance using Ente Invite
          </p>
        </div>
      </footer>

    </main>
  );
}