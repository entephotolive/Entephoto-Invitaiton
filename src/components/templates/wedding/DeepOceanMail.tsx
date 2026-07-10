"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Mail,
  Waves,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function DeepOceanMail({
  eventData,
}: Props) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const handleOpenMail = () => {
    setIsEnvelopeOpen(true);
    // Wait for envelope open animation to finish, then slide to invitation
    setTimeout(() => {
      setShowInvitation(true);
    }, 1200);
  };

  return (
    <main className="bg-[#020617] text-white overflow-x-hidden" style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif" }}>

      {/* MAIL / ENVELOPE INTRO SECTION */}
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <motion.section
            key="envelope"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-blue-950 to-[#020617] overflow-hidden"
          >
            {/* Deep Ocean Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
              <Waves className="absolute bottom-0 left-0 right-0 mx-auto w-full text-blue-900/20" size={200} />
            </div>

            <div className="relative z-10 flex flex-col items-center px-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-blue-300/60 uppercase tracking-[0.4em] text-sm mb-12 text-center"
              >
                You have received a message from the deep
              </motion.p>

              {/* 3D Envelope Container */}
              <div className="relative w-[340px] h-[240px] cursor-pointer group" onClick={handleOpenMail}>
                
                {/* Envelope Back Flap (Stays behind) */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-blue-900 rounded-lg shadow-2xl border border-blue-700/50 z-0" />

                {/* Letter inside (pops up when opened) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isEnvelopeOpen ? { y: -120, rotateX: 0 } : { y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-4 left-4 right-4 bottom-4 bg-slate-100 z-10 rounded-sm shadow-inner p-6 flex flex-col items-center justify-center origin-bottom"
                >
                  <p className="text-blue-900 font-bold text-lg mb-1">{eventData.brideName} & {eventData.groomName}</p>
                  <p className="text-blue-800/70 text-sm">Request the honor of your presence...</p>
                  <div className="mt-4 w-16 h-px bg-blue-300"></div>
                </motion.div>

                {/* Envelope Front Body (Slides down when opened) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isEnvelopeOpen ? { y: 120 } : { y: 0 }}
                  transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-blue-900 to-blue-800 rounded-b-lg z-20 border-t border-blue-700/30 shadow-lg"
                />

                {/* Wax Seal / Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-lg flex items-center justify-center border-4 border-blue-900 group-hover:shadow-cyan-500/30 transition-shadow duration-300"
                >
                  <Mail className="text-white" size={28} />
                </motion.div>

                {/* Subtle hint text */}
                {!isEnvelopeOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    className="absolute -bottom-10 left-0 right-0 text-center text-blue-400/50 text-xs tracking-widest uppercase"
                  >
                    Tap the seal to open
                  </motion.p>
                )}
              </div>
            </div>
          </motion.section>
        )

        /* --------------------------------------------------------- */
        /* BELOW IS THE ACTUAL INVITATION (REVEALED AFTER MAIL OPEN) */
        /* --------------------------------------------------------- */
        : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-[#020617]">
              {eventData.heroImage && (
                <img src={eventData.heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
              )}
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative z-10 text-center px-6"
              >
                <div className="flex items-center justify-center gap-3 mb-8 text-cyan-400/70">
                  <Waves size={16} />
                  <p className="uppercase tracking-[0.4em] text-xs">A Deep Sea Celebration</p>
                  <Waves size={16} />
                </div>

                <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-white drop-shadow-lg">
                  {eventData.brideName}
                </h1>
                <div className="text-cyan-300 text-4xl my-6 font-light">&</div>
                <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-white drop-shadow-lg">
                  {eventData.groomName}
                </h1>

                <div className="mt-12 flex items-center justify-center gap-4 text-slate-300">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                  <p className="text-xl font-light tracking-wide">{eventData.date}</p>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                </div>

                <button className="mt-14 px-10 py-4 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/20 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-medium backdrop-blur-sm">
                  Dive Into The Details
                </button>
              </motion.div>
            </section>

            {/* COUPLE SECTION */}
            {eventData.showCoupleInfo && (
              <section className="py-24 px-6 bg-blue-950/30">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">The Couple</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Mates Of The Sea</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[{ name: eventData.brideName, role: "Bride", emoji: " 👰‍♀️" }, { name: eventData.groomName, role: "Groom", emoji: " 🤵‍♂️" }].map((person, index) => (
                      <motion.div key={index} whileHover={{ y: -5 }} className="bg-slate-800/30 backdrop-blur-xl border border-cyan-500/10 rounded-lg p-10 shadow-xl">
                        <div className="text-6xl mb-6">{person.emoji}</div>
                        <h3 className="text-3xl font-light tracking-wide">{person.name}</h3>
                        <p className="text-cyan-300/50 mt-3 uppercase tracking-[0.2em] text-xs">{person.role}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* EVENT DETAILS */}
            <section className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">Details</span>
                  <h2 className="text-4xl font-extralight mt-4 tracking-tight">Sailing Towards Forever</h2>
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date },
                    { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time },
                    { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue },
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-800/30 backdrop-blur-md border border-cyan-500/10 rounded-lg p-8 shadow-lg">
                      <div className="text-cyan-400/80 mb-4">{item.icon}</div>
                      <h3 className="font-medium text-lg mb-2 tracking-wide">{item.title}</h3>
                      <p className="text-slate-400 font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* COUNTDOWN */}
            {eventData.enableCountdown && (
              <section className="py-24 px-6 bg-blue-950/30">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">Countdown</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">The Tide Is Turning</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                      { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                      { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                      { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                    ].map((item) => (
                      <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/10 rounded-lg p-8 text-center shadow-xl">
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
              <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-20">
                    <Heart className="mx-auto text-cyan-400/70 mb-4" size={32} />
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">Our Story</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Currents Of Love</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventData.loveStory.map((story, index) => (
                      <motion.div key={index} whileHover={{ y: -10 }} className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/10 rounded-lg overflow-hidden shadow-xl">
                        {story.image && <img src={story.image} alt={story.title} className="w-full h-60 object-cover opacity-80" />}
                        <div className="p-8">
                          <p className="text-cyan-300/60 text-xs uppercase tracking-widest mb-2">{story.subtitle}</p>
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
              <section className="py-24 px-6 bg-blue-950/30">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-20">
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">Timeline</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Navigating The Day</h2>
                  </div>
                  <div className="space-y-6">
                    {eventData.schedule.map((item, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-800/30 backdrop-blur-md border border-cyan-500/10 rounded-lg p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-sm font-light">{item.description}</p>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <span className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-sm tracking-wide">{item.time}</span>
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
              <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">Gallery</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Sunken Treasures</h2>
                  </div>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                    {eventData.gallery.map((image, index) => (
                      <motion.img key={index} whileHover={{ scale: 1.03 }} src={image} alt="" className="mb-4 rounded-lg w-full shadow-2xl cursor-pointer border border-cyan-500/10 opacity-90 hover:opacity-100 transition-opacity" />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* RSVP */}
            {eventData.rsvpEnabled && (
              <section className="py-24 px-6 bg-blue-950/30">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">RSVP</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Dive In With Us</h2>
                    <p className="mt-4 text-slate-400 font-light text-sm">Let us know if you&apos;ll be making waves with us.</p>
                  </div>
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/10 rounded-lg p-8 md:p-12 shadow-xl">
                    <form className="space-y-6">
                      <input type="text" placeholder="Your Name" className="w-full p-4 rounded-sm bg-slate-900/50 border border-cyan-500/20 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400/50 transition-colors font-light" />
                      <input type="number" placeholder="Number of Guests" className="w-full p-4 rounded-sm bg-slate-900/50 border border-cyan-500/20 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400/50 transition-colors font-light" />
                      <textarea rows={5} placeholder="Leave a message..." className="w-full p-4 rounded-sm bg-slate-900/50 border border-cyan-500/20 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400/50 transition-colors font-light" />
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="py-4 rounded-sm bg-cyan-600/20 border border-cyan-400/30 hover:bg-cyan-600/30 transition text-cyan-200 tracking-wide text-sm">Attending</button>
                        <button type="button" className="py-4 rounded-sm bg-slate-700/50 border border-white/10 hover:bg-slate-700 transition text-slate-400 tracking-wide text-sm">Not Attending</button>
                      </div>
                      <button type="submit" className="w-full py-4 rounded-sm bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium tracking-[0.1em] transition shadow-lg shadow-cyan-500/20">Send Reply</button>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* WISHES WALL */}
            {eventData.enableGreetings && eventData.wishes?.length > 0 && (
              <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">Wishes</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">Messages In A Bottle</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventData.wishes.map((wish, index) => (
                      <motion.div key={index} whileHover={{ y: -8 }} className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/10 rounded-lg p-8 shadow-xl">
                        <div className="text-cyan-300/40 text-5xl mb-4 font-serif">❝</div>
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
              <section className="py-24 px-6 bg-blue-950/30">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="uppercase tracking-[0.3em] text-cyan-400/60 text-xs">Venue</span>
                    <h2 className="text-4xl font-extralight mt-4 tracking-tight">The Lighthouse</h2>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/10 rounded-lg p-10 shadow-xl">
                      <h3 className="text-3xl font-light mb-6 tracking-wide">{eventData.venue}</h3>
                      <p className="text-slate-400 leading-relaxed mb-8 font-light">{eventData.address}</p>
                      {eventData.mapLink && (
                        <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/20 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-medium">
                          Find Your Way
                        </a>
                      )}
                    </div>
                    <div className="rounded-lg overflow-hidden border border-cyan-500/10 min-h-[450px] shadow-xl">
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
                  className="w-14 h-14 rounded-full bg-blue-900/80 backdrop-blur-md border border-cyan-400/20 text-cyan-300 text-xl shadow-2xl transition hover:bg-blue-800/80 flex items-center justify-center"
                >
                  🌊
                </button>
              </div>
            )}

            {/* FOOTER */}
            <footer className="py-32 px-6 bg-slate-950 border-t border-cyan-500/10">
              <div className="max-w-4xl mx-auto text-center">
                <Waves className="mx-auto text-slate-700 mb-6" size={32} />
                <span className="uppercase tracking-[0.3em] text-slate-600 text-xs">With Love</span>
                <h2 className="text-5xl md:text-7xl font-extralight mt-6 mb-8 tracking-tight text-slate-300">See You In The Deep</h2>
                <div className="text-4xl md:text-6xl font-extralight text-white">
                  {eventData.brideName}
                  <span className="mx-4 text-cyan-400/50">&</span>
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