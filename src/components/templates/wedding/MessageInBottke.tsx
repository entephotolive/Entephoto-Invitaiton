"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Anchor,
  Waves,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function MessageInBottle({
  eventData,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const handleOpenBottle = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Wait for the pop and slide animation, then transition to the invite
    setTimeout(() => {
      setShowInvitation(true);
    }, 1800);
  };

  return (
    <main className="bg-[#030b1a] text-white overflow-x-hidden" style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif" }}>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO SEGMENT: MESSAGE IN A BOTTLE                                                  */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="bottle-intro"
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#020617] via-[#0c1e3a] to-[#030b1a] overflow-hidden"
          >
            {/* Deep Ocean Ambient Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
              {/* Subtle wave lines */}
              <svg className="absolute bottom-0 w-full text-blue-900/20 opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-16"
              >
                <Anchor className="mx-auto text-cyan-400/40 mb-6" size={48} />
                <h2 className="text-3xl md:text-4xl font-extralight tracking-widest text-slate-300 mb-4">
                  A Message Washed Ashore
                </h2>
                <p className="text-slate-500 font-light max-w-md mx-auto">
                  The tide has brought something special for you. Open it to reveal the secret inside.
                </p>
              </motion.div>

              {/* The Bottle Group */}
              <div className="relative w-64 h-96 flex items-end justify-center mb-12 cursor-pointer group" onClick={handleOpenBottle}>
                
                {/* The Letter sticking out (slides up when opened) */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={isOpening ? { y: -180, opacity: 1 } : { y: 40, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="absolute z-20 w-32 bg-[#f8fafc] rounded-sm shadow-lg origin-bottom"
                  style={{ bottom: "40%" }}
                >
                  <div className="p-4 border-b-4 border-double border-slate-300">
                    <p className="text-blue-900 font-bold text-sm truncate">{eventData.brideName} & {eventData.groomName}</p>
                    <p className="text-blue-800/60 text-[10px] mt-1">Are getting married...</p>
                  </div>
                </motion.div>

                {/* The Glass Bottle Body */}
                <div className="relative w-40 h-72 bg-gradient-to-b from-cyan-200/10 via-cyan-300/5 to-blue-900/20 rounded-b-full rounded-t-2xl border border-cyan-400/20 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm overflow-hidden z-10">
                  {/* Glass reflections */}
                  <div className="absolute top-10 left-4 w-2 h-32 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-sm" />
                  <div className="absolute top-20 right-6 w-1 h-20 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-sm" />
                  {/* Water inside */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                </div>

                {/* The Cork / Button */}
                <motion.div
                  animate={isOpening ? { y: -120, opacity: 0, scale: 0.5 } : { y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute z-30 w-16 h-16 -top-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg flex items-center justify-center border-4 border-amber-900/50 group-hover:shadow-amber-500/30 transition-shadow duration-300"
                >
                  <span className="text-amber-100 text-xs font-bold tracking-wider uppercase">Open</span>
                </motion.div>
              </div>

              {!isOpening && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 2 }}
                  className="text-cyan-500/40 text-xs tracking-[0.3em] uppercase mt-4"
                >
                  Click the cork to pop it open
                </motion.p>
              )}
            </div>
          </motion.section>
        )

        /* ----------------------------------------------------------------------------------- */
        /* MAIN INVITATION (Deep Ocean Sea Theme)                                              */
        /* ----------------------------------------------------------------------------------- */
        : (
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c1e3a] via-[#0f2b4a] to-[#030b1a]">
              {eventData.heroImage && (
                <img src={eventData.heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
              )}
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative z-10 text-center px-6"
              >
                <div className="flex items-center justify-center gap-3 mb-10 text-cyan-400/60">
                  <Waves size={16} />
                  <p className="uppercase tracking-[0.5em] text-xs">Join Us Beneath The Waves</p>
                  <Waves size={16} />
                </div>

                <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-white drop-shadow-lg">
                  {eventData.brideName}
                </h1>
                <div className="text-cyan-300/80 text-5xl my-8 font-light">&</div>
                <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-white drop-shadow-lg">
                  {eventData.groomName}
                </h1>

                <div className="mt-14 flex items-center justify-center gap-4 text-slate-300">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                  <p className="text-2xl font-light tracking-wide">{eventData.date}</p>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                </div>

                <button className="mt-16 px-10 py-4 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/20 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-medium backdrop-blur-sm">
                  Dive Into The Details
                </button>
              </motion.div>
            </section>

            {/* COUPLE SECTION */}
            {eventData.showCoupleInfo && (
              <section className="py-24 px-6 bg-[#051525]">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">The Couple</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Mates Of The Deep</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[{ name: eventData.brideName, role: "Bride", emoji: "🧜‍♀️" }, { name: eventData.groomName, role: "Groom", emoji: "🧜‍♂️" }].map((person, index) => (
                      <motion.div key={index} whileHover={{ y: -5 }} className="bg-slate-800/30 backdrop-blur-xl border border-cyan-400/10 rounded-lg p-10 shadow-xl hover:shadow-cyan-500/5 transition-shadow">
                        <div className="text-6xl mb-6">{person.emoji}</div>
                        <h3 className="text-3xl font-light tracking-wide">{person.name}</h3>
                        <p className="text-cyan-400/50 mt-3 uppercase tracking-[0.2em] text-xs">{person.role}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* EVENT DETAILS */}
            <section className="py-24 px-6 bg-gradient-to-b from-[#051525] to-[#030b1a]">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">Details</span>
                  <h2 className="text-4xl font-extralight mt-4 tracking-tight">Sailing Towards Forever</h2>
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date },
                    { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time },
                    { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue },
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-800/20 backdrop-blur-md border border-cyan-400/10 rounded-lg p-8 shadow-lg hover:bg-slate-800/30 transition-colors">
                      <div className="text-cyan-400/70 mb-4">{item.icon}</div>
                      <h3 className="font-medium text-lg mb-2 tracking-wide">{item.title}</h3>
                      <p className="text-slate-400 font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* COUNTDOWN */}
            {eventData.enableCountdown && (
              <section className="py-24 px-6 bg-[#051525]">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">Countdown</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">The Tide Is Turning</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                      { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                      { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                      { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                    ].map((item) => (
                      <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="bg-slate-800/30 backdrop-blur-xl border border-cyan-400/10 rounded-lg p-8 text-center shadow-xl">
                        <h3 className="text-5xl font-extralight text-cyan-200">{item.value}</h3>
                        <p className="mt-3 text-slate-500 uppercase tracking-[0.2em] text-xs">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOVE STORY */}
            {eventData.showStory && eventData.loveStory?.length > 0 && (
              <section className="py-24 px-6 bg-gradient-to-b from-[#051525] to-[#030b1a]">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-20">
                    <Heart className="mx-auto text-cyan-400/60 mb-4" size={32} />
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">Our Story</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Currents Of Love</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventData.loveStory.map((story, index) => (
                      <motion.div key={index} whileHover={{ y: -10 }} className="bg-slate-800/30 backdrop-blur-xl border border-cyan-400/10 rounded-lg overflow-hidden shadow-xl">
                        {story.image && <img src={story.image} alt={story.title} className="w-full h-60 object-cover opacity-80 hover:opacity-100 transition-opacity" />}
                        <div className="p-8">
                          <p className="text-cyan-300/50 text-xs uppercase tracking-widest mb-2">{story.subtitle}</p>
                          <h3 className="text-2xl font-light mb-4">{story.title}</h3>
                          <p className="text-slate-400 leading-relaxed text-sm font-light">{story.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SCHEDULE */}
            {eventData.showSchedule && eventData.schedule?.length > 0 && (
              <section className="py-24 px-6 bg-[#051525]">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-20">
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">Timeline</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Navigating The Day</h2>
                  </div>
                  <div className="space-y-6">
                    {eventData.schedule.map((item, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-800/20 backdrop-blur-md border border-cyan-400/10 rounded-lg p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-sm font-light">{item.description}</p>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <span className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-sm tracking-wide">{item.time}</span>
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
              <section className="py-24 px-6 bg-gradient-to-b from-[#051525] to-[#030b1a]">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">Gallery</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Sunken Treasures</h2>
                  </div>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                    {eventData.gallery.map((image, index) => (
                      <motion.img key={index} whileHover={{ scale: 1.03 }} src={image} alt="" className="mb-4 rounded-lg w-full shadow-2xl cursor-pointer border border-cyan-400/10 opacity-90 hover:opacity-100 transition-opacity" />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* RSVP */}
            {eventData.rsvpEnabled && (
              <section className="py-24 px-6 bg-[#051525]">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">RSVP</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Dive In With Us</h2>
                    <p className="mt-4 text-slate-400 font-light text-sm">Let us know if you&apos;ll be making waves with us.</p>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-xl border border-cyan-400/10 rounded-lg p-8 md:p-12 shadow-xl">
                    <form className="space-y-6">
                      <input type="text" placeholder="Your Name" className="w-full p-4 rounded-sm bg-[#030b1a]/50 border border-cyan-500/20 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400/50 transition-colors font-light" />
                      <input type="number" placeholder="Number of Guests" className="w-full p-4 rounded-sm bg-[#030b1a]/50 border border-cyan-500/20 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400/50 transition-colors font-light" />
                      <textarea rows={5} placeholder="Leave a message..." className="w-full p-4 rounded-sm bg-[#030b1a]/50 border border-cyan-500/20 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400/50 transition-colors font-light" />
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="py-4 rounded-sm bg-cyan-600/20 border border-cyan-400/30 hover:bg-cyan-600/30 transition text-cyan-200 tracking-wide text-sm">Attending</button>
                        <button type="button" className="py-4 rounded-sm bg-slate-700/50 border border-white/10 hover:bg-slate-700 transition text-slate-400 tracking-wide text-sm">Not Attending</button>
                      </div>
                      <button type="submit" className="w-full py-4 rounded-sm bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium tracking-[0.1em] transition shadow-lg shadow-cyan-900/50">Send Reply</button>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* WISHES WALL */}
            {eventData.enableGreetings && eventData.wishes?.length > 0 && (
              <section className="py-24 px-6 bg-gradient-to-b from-[#051525] to-[#030b1a]">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">Wishes</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Messages In A Bottle</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventData.wishes.map((wish, index) => (
                      <motion.div key={index} whileHover={{ y: -8 }} className="bg-slate-800/30 backdrop-blur-xl border border-cyan-400/10 rounded-lg p-8 shadow-xl">
                        <div className="text-cyan-300/30 text-5xl mb-4 font-serif">❝</div>
                        <p className="text-slate-300 leading-relaxed mb-6 text-sm font-light italic">{wish.message}</p>
                        <div className="font-medium text-cyan-200 text-sm tracking-wide">— {wish.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOCATION */}
            {eventData.showVenue && (
              <section className="py-24 px-6 bg-[#051525]">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-500/50 text-xs">Venue</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">The Lighthouse</h2>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-slate-800/30 backdrop-blur-xl border border-cyan-400/10 rounded-lg p-10 shadow-xl">
                      <h3 className="text-3xl font-light mb-6 tracking-wide">{eventData.venue}</h3>
                      <p className="text-slate-400 leading-relaxed mb-8 font-light">{eventData.address}</p>
                      {eventData.mapLink && (
                        <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/20 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-medium">
                          Find Your Way
                        </a>
                      )}
                    </div>
                    <div className="rounded-lg overflow-hidden border border-cyan-400/10 min-h-[450px] shadow-xl">
                      {eventData.mapLink ? (
                        <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" loading="lazy" />
                      ) : (
                        <div className="h-full flex items-center justify-center bg-slate-800/50"><p className="text-slate-500 font-light">Map Preview Not Available</p></div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* MUSIC BUTTON */}
            {eventData.musicUrl && (
              <div className="fixed bottom-6 right-6 z-50">
                <audio id="tropical-audio" src={eventData.musicUrl} loop />
                <button
                  onClick={() => {
                    const audio = document.getElementById("tropical-audio") as HTMLAudioElement;
                    if (!audio) return;
                    if (audio.paused) { audio.play(); } else { audio.pause(); }
                  }}
                  className="w-14 h-14 rounded-full bg-[#0c1e3a]/80 backdrop-blur-md border border-cyan-400/20 text-cyan-300 text-xl shadow-2xl transition hover:bg-[#0f2b4a]/80 flex items-center justify-center"
                >
                  🌊
                </button>
              </div>
            )}

            {/* FOOTER */}
            <footer className="py-32 px-6 bg-[#020617] border-t border-cyan-400/10">
              <div className="max-w-4xl mx-auto text-center">
                <Anchor className="mx-auto text-slate-700 mb-6" size={32} />
                <span className="uppercase tracking-[0.3em] text-slate-600 text-xs">With Love</span>
                <h2 className="text-5xl md:text-7xl font-extralight mt-6 mb-8 tracking-tight text-slate-300">See You In The Deep</h2>
                <div className="text-4xl md:text-6xl font-extralight text-white">
                  {eventData.brideName}
                  <span className="mx-4 text-cyan-400/40">&</span>
                  {eventData.groomName}
                </div>
                <p className="mt-12 text-slate-700 text-xs tracking-widest uppercase">Crafted with ocean vibes using Ente Invite</p>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}