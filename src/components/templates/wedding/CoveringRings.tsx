"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Flower2,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}



export default function WeddingTropicalBeach({
  eventData,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);





  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setShowInvitation(true);
    }, 1200);
  };

  // Dancing flowers data
  const dancingFlowers = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 20}%`,
    size: Math.random() * 30 + 15,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 4}s`,
    emoji: ["🌸", "🌼", "🌺", "🌷", "🌻", "🍃"][Math.floor(Math.random() * 6)],
    type: Math.random() > 0.6 ? "leaf" : "flower"
  }));

  return (
    <main 
      className="bg-[#faf7f2] text-stone-800 overflow-x-hidden relative" 
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO SEGMENT: FLORAL ENVELOPE                                                     */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="floral-intro"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdfbf7] via-[#f9f3e8] to-[#faf7f2] overflow-hidden z-10"
          >
            <div className="relative z-10 flex flex-col items-center px-6 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
                <Flower2 className="mx-auto text-rose-400/60 mb-6" size={48} />
                <h2 className="text-3xl md:text-4xl font-light tracking-widest text-stone-600 mb-4">A Garden Grows With Love</h2>
                <p className="text-stone-400 font-light max-w-md mx-auto text-sm">A special bloom has arrived just for you. Open it to reveal the beauty inside.</p>
              </motion.div>

              <div className="relative w-[340px] h-[240px] cursor-pointer group" onClick={handleOpenInvitation}>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-amber-50 rounded-lg shadow-xl border border-rose-200/50 z-0" />
                <motion.div
                  initial={{ y: 0 }} animate={isOpening ? { y: -120 } : { y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-4 left-4 right-4 bottom-4 bg-white z-10 rounded-sm shadow-inner p-6 flex flex-col items-center justify-center origin-bottom border border-stone-100"
                >
                  <p className="text-rose-900 font-bold text-lg mb-1">{eventData.brideName} & {eventData.groomName}</p>
                  <p className="text-stone-400 text-xs">Request the honor of your presence...</p>
                </motion.div>
                <motion.div
                  initial={{ y: 0 }} animate={isOpening ? { y: 120 } : { y: 0 }}
                  transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-rose-200/80 to-rose-100/60 rounded-b-lg z-20 border-t border-rose-300/30 shadow-lg"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full shadow-lg flex items-center justify-center border-4 border-rose-100 group-hover:shadow-rose-300/50 transition-shadow duration-300"
                >
                  <Flower2 className="text-white" size={32} />
                </motion.div>
                {!isOpening && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }} className="absolute -bottom-10 left-0 right-0 text-center text-rose-400/60 text-xs tracking-widest uppercase">
                    Tap the flower to open
                  </motion.p>
                )}
              </div>
            </div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION (Scroll Converging Rings)                                         */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* SCROLL DRIVEN VIDEO BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <video 
                src="/template/from_top_corner_gwr_video_mvp (1).mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              {/* Light overlay to make sure the dark video doesn't hide the text */}
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
            </div>

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center">
              {eventData.heroImage && (
                <img src={eventData.heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply" />
              )}
              <div className="absolute inset-0 bg-[#faf7f2]/60 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative z-10 text-center px-6">
                <div className="flex items-center justify-center gap-3 mb-10 text-rose-400/70">
                  <span className="text-xl">🌱</span>
                  <p className="uppercase tracking-[0.5em] text-xs">Join Us In The Garden</p>
                  <span className="text-xl">🌱</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-light tracking-tight text-stone-800 drop-shadow-sm">{eventData.brideName}</h1>
                <div className="text-rose-400 text-5xl my-8 font-light">&</div>
                <h1 className="text-6xl md:text-8xl font-light tracking-tight text-stone-800 drop-shadow-sm">{eventData.groomName}</h1>
                <div className="mt-14 flex items-center justify-center gap-4 text-stone-500">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-300/50"></div>
                  <p className="text-2xl font-light tracking-wide">{eventData.date}</p>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-300/50"></div>
                </div>
                <div className="mt-16 animate-bounce text-stone-400">
                  <p className="text-xs tracking-[0.3em] uppercase mb-2">Scroll to explore</p>
                  <span className="text-lg">↓</span>
                </div>
              </motion.div>
            </section>

            {/* CONTENT WRAPPER - Pushed down so it appears as rings meet in the middle */}
            <div className="relative bg-white/40 backdrop-blur-md z-30 rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] border-t border-white/50">
              
              {/* COUPLE SECTION */}
              {eventData.showCoupleInfo && (
                <section className="py-24 px-6 bg-transparent">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">The Couple</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">Two Roses In A Garden</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      {[{ name: eventData.brideName, role: "Bride", emoji: "👰‍♀️" }, { name: eventData.groomName, role: "Groom", emoji: "🤵‍♂️" }].map((person, index) => (
                        <motion.div key={index} whileHover={{ y: -5 }} className="bg-white/80 backdrop-blur-md border border-rose-100/50 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow">
                          <div className="text-6xl mb-6">{person.emoji}</div>
                          <h3 className="text-3xl font-light tracking-wide">{person.name}</h3>
                          <p className="text-rose-400/70 mt-3 uppercase tracking-[0.2em] text-xs">{person.role}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* EVENT DETAILS */}
              <section className="py-24 px-6 bg-white/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">Details</span>
                    <h2 className="text-4xl font-light mt-4 tracking-tight">When The Garden Blooms</h2>
                  </div>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {[
                      { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date },
                      { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time },
                      { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue },
                    ].map((item, index) => (
                      <div key={index} className="bg-white/70 backdrop-blur-md border border-rose-100/50 rounded-2xl p-8 shadow-md hover:bg-white/90 transition-colors">
                        <div className="text-rose-400 mb-4">{item.icon}</div>
                        <h3 className="font-medium text-lg mb-2 tracking-wide">{item.title}</h3>
                        <p className="text-stone-500 font-light">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* COUNTDOWN */}
              {eventData.enableCountdown && (
                <section className="py-24 px-6 bg-transparent">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">Countdown</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">Waiting To Blossom</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                        { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                        { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                        { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                      ].map((item) => (
                        <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="bg-white/80 backdrop-blur-xl border border-rose-100/50 rounded-2xl p-8 text-center shadow-lg">
                          <h3 className="text-5xl font-light text-rose-500">{item.value}</h3>
                          <p className="mt-3 text-stone-400 uppercase tracking-[0.2em] text-xs">{item.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* LOVE STORY */}
              {eventData.showStory && eventData.loveStory?.length > 0 && (
                <section className="py-24 px-6 bg-[#fdfbf7]">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                      <Heart className="mx-auto text-rose-300 mb-4" size={32} fill="currentColor" />
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">Our Story</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">How We Grew Together</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {eventData.loveStory.map((story, index) => (
                        <motion.div key={index} whileHover={{ y: -10 }} className="bg-white/70 backdrop-blur-xl border border-rose-100/50 rounded-2xl overflow-hidden shadow-lg">
                          {story.image && <img src={story.image} alt={story.title} className="w-full h-60 object-cover" />}
                          <div className="p-8">
                            <p className="text-rose-400/60 text-xs uppercase tracking-widest mb-2">{story.subtitle}</p>
                            <h3 className="text-2xl font-light mb-4">{story.title}</h3>
                            <p className="text-stone-500 leading-relaxed text-sm font-light">{story.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* SCHEDULE */}
              {eventData.showSchedule && eventData.schedule?.length > 0 && (
                <section className="py-24 px-6 bg-transparent">
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">Timeline</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">Garden Party Itinerary</h2>
                    </div>
                    <div className="space-y-6">
                      {eventData.schedule.map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/70 backdrop-blur-md border border-rose-100/50 rounded-2xl p-8 shadow-md">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                              <p className="text-stone-500 text-sm font-light">{item.description}</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <span className="inline-flex px-5 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-sm tracking-wide font-medium">{item.time}</span>
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
                <section className="py-24 px-6 bg-[#fdfbf7]">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">Gallery</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">Floral Memories</h2>
                    </div>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                      {eventData.gallery.map((image, index) => (
                        <motion.img key={index} whileHover={{ scale: 1.03 }} src={image} alt="" className="mb-4 rounded-2xl w-full shadow-xl cursor-pointer border-4 border-white/50" />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* RSVP */}
              {eventData.rsvpEnabled && (
                <section className="py-24 px-6 bg-transparent">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">RSVP</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">Join Us In Bloom</h2>
                      <p className="mt-4 text-stone-400 font-light text-sm">Let us know if you will be attending our garden celebration.</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl border border-rose-100/50 rounded-2xl p-8 md:p-12 shadow-xl">
                      <form className="space-y-6">
                        <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-[#fdfbf7] border border-rose-100 outline-none text-stone-800 placeholder:text-stone-400 focus:border-rose-300 transition-colors font-light" />
                        <input type="number" placeholder="Number of Guests" className="w-full p-4 rounded-xl bg-[#fdfbf7] border border-rose-100 outline-none text-stone-800 placeholder:text-stone-400 focus:border-rose-300 transition-colors font-light" />
                        <textarea rows={5} placeholder="Leave a message..." className="w-full p-4 rounded-xl bg-[#fdfbf7] border border-rose-100 outline-none text-stone-800 placeholder:text-stone-400 focus:border-rose-300 transition-colors font-light" />
                        <div className="grid grid-cols-2 gap-4">
                          <button type="button" className="py-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition font-medium tracking-wide text-sm">Joyfully Accept</button>
                          <button type="button" className="py-4 rounded-xl bg-stone-100 border border-stone-200 text-stone-500 hover:bg-stone-200 transition font-medium tracking-wide text-sm">Respectfully Decline</button>
                        </div>
                        <button type="submit" className="w-full py-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium tracking-[0.1em] transition shadow-lg shadow-rose-200/50">Send RSVP</button>
                      </form>
                    </div>
                  </div>
                </section>
              )}

              {/* WISHES WALL */}
              {eventData.enableGreetings && eventData.wishes?.length > 0 && (
                <section className="py-24 px-6 bg-[#fdfbf7]">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">Wishes</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">Whispers Of The Flowers</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eventData.wishes.map((wish, index) => (
                        <motion.div key={index} whileHover={{ y: -8 }} className="bg-white/70 backdrop-blur-xl border border-rose-100/50 rounded-2xl p-8 shadow-lg">
                          <div className="text-rose-200 text-5xl mb-4 font-serif">❝</div>
                          <p className="text-stone-600 leading-relaxed mb-6 text-sm font-light italic">{wish.message}</p>
                          <div className="font-medium text-rose-500 text-sm tracking-wide">— {wish.name}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* LOCATION */}
              {eventData.showVenue && (
                <section className="py-24 px-6 bg-transparent">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                      <span className="uppercase tracking-[0.3em] text-rose-400/60 text-xs">Venue</span>
                      <h2 className="text-4xl font-light mt-4 tracking-tight">The Secret Garden</h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-10">
                      <div className="bg-white/80 backdrop-blur-xl border border-rose-100/50 rounded-2xl p-10 shadow-xl">
                        <h3 className="text-3xl font-light mb-6 tracking-wide">{eventData.venue}</h3>
                        <p className="text-stone-500 leading-relaxed mb-8 font-light">{eventData.address}</p>
                        {eventData.mapLink && (
                          <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-3 rounded-full bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition-all duration-500 tracking-[0.15em] uppercase text-xs font-medium shadow-sm">
                            Find Your Way
                          </a>
                        )}
                      </div>
                      <div className="rounded-2xl overflow-hidden border-4 border-white/50 min-h-[450px] shadow-xl">
                        {eventData.mapLink ? (
                          <iframe src={eventData.mapLink} className="w-full h-full border-0" loading="lazy" />
                        ) : (
                          <div className="h-full flex items-center justify-center bg-stone-100"><p className="text-stone-400 font-light">Map Preview Not Available</p></div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* FOOTER */}
              <footer className="py-32 px-6 bg-white/20 backdrop-blur-sm border-t border-rose-100/50">
                <div className="max-w-4xl mx-auto text-center">
                  <span className="text-4xl mb-6 block">🌷</span>
                  <span className="uppercase tracking-[0.3em] text-stone-400 text-xs">With Love</span>
                  <h2 className="text-5xl md:text-7xl font-light mt-6 mb-8 tracking-tight text-stone-700">See You In The Garden</h2>
                  <div className="text-4xl md:text-6xl font-light text-stone-800">
                    {eventData.brideName}
                    <span className="mx-4 text-rose-300">&</span>
                    {eventData.groomName}
                  </div>
                  <p className="mt-12 text-stone-300 text-xs tracking-widest uppercase">Crafted with natural elegance using Ente Invite</p>
                </div>
              </footer>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REQUIRED CSS FOR DANCING FLORA */}
      <style jsx global>{`
        @keyframes dance-flower {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-15px) rotate(5deg) scale(1.05); }
          50% { transform: translateY(-5px) rotate(-3deg) scale(0.98); }
          75% { transform: translateY(-20px) rotate(4deg) scale(1.02); }
        }
        @keyframes dance-leaf {
          0%, 100% { transform: translateY(0) rotate(0deg) skewX(0deg); }
          25% { transform: translateY(-25px) rotate(-8deg) skewX(5deg); }
          50% { transform: translateY(-10px) rotate(6deg) skewX(-3deg); }
          75% { transform: translateY(-30px) rotate(-4deg) skewX(4deg); }
        }
        .animate-dance-flower { animation: dance-flower ease-in-out infinite; }
        .animate-dance-leaf { animation: dance-leaf ease-in-out infinite; }
      `}</style>

    </main>
  );
}