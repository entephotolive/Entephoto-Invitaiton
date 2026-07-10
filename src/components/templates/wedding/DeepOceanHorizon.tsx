"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Anchor,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function DeepOceanHorizon({
  eventData,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => setShowInvitation(true), 1200);
  };

  return (
    <main 
      className="bg-[#0a192f] text-white overflow-x-hidden" 
      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif" }}
    >
      {/* --------------------------------------------------------------------------- */
      /* 1. FIXED BACKGROUND VIDEO (Behind Everything)                                  */
      /* --------------------------------------------------------------------------- */}
      <div className="fixed inset-0 z-[-10] w-full h-full overflow-hidden bg-black">
        {/* High-quality free ocean wave video from Pexels / Pixabay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] object-cover"
        >
          <source 
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
          Fallback text for slow connections
        </video>
        {/* Dark gradient overlay to ensure text readability over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/90 via-[#0a192f]/70 to-[#0a192f]/90 z-10 pointer-events-none"></div>
      </div>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* --------------------------------------------------------------------------- */
          /* 2. INTRO MESSAGE IN A BOTTLE                                                */
          /* --------------------------------------------------------------------------- */
          <motion.section
            key="sea-intro"
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex items-center justify-center z-20"
          >
            <div className="relative z-20 text-center px-6 max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Anchor className="mx-auto text-cyan-400 mb-10 opacity-60" size={48} />
                <h2 className="text-4xl md:text-6xl font-extralight tracking-widest text-white/90 mb-6">
                  A Message From The Sea
                </h2>
                <p className="text-blue-200/50 font-light max-w-lg mx-auto mb-16 text-sm leading-relaxed">
                  The tides have brought a special request across the ocean just for you. 
                  Open the bottle to reveal the journey of {eventData.brideName} & {eventData.groomName}.
                </p>

                {/* The Glass Bottle Button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenInvitation}
                  className="relative w-40 h-40 mx-auto rounded-full border border-cyan-400/20 flex items-center justify-center transition-all duration-500 group"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(6, 182, 212, 0.1) 60%, transparent 100%)", backdropFilter: "blur(8px)" }}
                >
                  <div className="absolute inset-0 rounded-full border border-white/10" style={{ boxShadow: "inset 3px 3px 15px rgba(255,255,255,0.1), inset -3px -3px 15px rgba(0,0,0,0.5)" }}></div>
                  <div className="absolute top-[20%] left-[25%] w-[30%] h-[20%] rounded-full bg-white/30 blur-sm transform -rotate-12"></div>
                  
                  <div className="text-center z-10">
                    <p className="text-sm font-light tracking-widest text-cyan-100 group-hover:text-white transition-colors">OPEN</p>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          /* --------------------------------------------------------------------------- */
          /* 3. MAIN INVITATION (Floating Over The Sea Video)                             */
          /* --------------------------------------------------------------------------- */
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-20"
          >
            
            {/* HERO - Hovering over the waves */}
            <section className="min-h-screen flex items-center justify-center relative py-20 px-6">
              <div className="text-center relative z-10">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <div className="flex items-center justify-center gap-4 mb-12 text-cyan-300/40">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400/30"></div>
                    <p className="uppercase tracking-[0.6em] text-[10px] font-medium">Setting Sail Together</p>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400/30"></div>
                  </div>

                  <h1 className="text-7xl md:text-9xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300/50 pb-2 drop-shadow-lg">
                    {eventData.brideName}
                  </h1>
                  
                  <div className="my-10 text-blue-300 text-4xl font-extralight">&</div>
                  
                  <h1 className="text-7xl md:text-9xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300/50 pb-2 drop-shadow-lg">
                    {eventData.groomName}
                  </h1>

                  <div className="mt-16 inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-blue-900/20 backdrop-blur-md">
                    <CalendarDays size={18} className="text-cyan-400" />
                    <p className="text-xl font-light tracking-widest text-white/80">{eventData.date}</p>
                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Dive Deeper</span>
                <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1">
                  <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </section>

            {/* FLOATING DECK WRAPPER - Glassmorphism to contrast with moving waves */}
            <div className="relative max-w-6xl mx-auto px-6 pb-20">
              <div className="bg-slate-900/40 backdrop-blur-xl border-t border-white/10 rounded-t-[3rem] shadow-2xl shadow-black/50 px-8 md:px-16 pt-20">

                {/* COUPLE SECTION */}
                {eventData.showCoupleInfo && (
                  <section className="py-24 border-b border-white/5">
                    <p className="text-center uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-20 font-medium">The Crew</p>
                    <div className="grid md:grid-cols-2 gap-16">
                      {[
                        { name: eventData.brideName, role: "Bride", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" },
                        { name: eventData.groomName, role: "Groom", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
                      ].map((person, index) => (
                        <motion.div key={index} whileHover={{ y: -10 }} className="group rounded-3xl p-1 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))" }}>
                          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
                            <div className="h-64 overflow-hidden rounded-2xl mb-6 shadow-2xl border border-white/5">
                              <img src={person.img} alt={person.role} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100" />
                            </div>
                            <h3 className="text-3xl font-extralight tracking-wider text-white mb-2 relative z-10">{person.name}</h3>
                            <p className="text-cyan-300/50 text-xs tracking-[0.3em] uppercase font-medium relative z-10">{person.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* EVENT DETAILS */}
                <section className="py-24 border-b border-white/5">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-20 font-medium">Coordinates</p>
                  <div className="grid lg:grid-cols-3 gap-8">
                    {[
                      { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date, color: "cyan" },
                      { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time, color: "blue" },
                      { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue, color: "indigo" },
                    ].map((item, index) => (
                      <motion.div key={index} whileHover={{ y: -5, scale: 1.02 }} className="relative p-8 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden group hover:bg-slate-900/80 transition-all duration-300">
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${item.color}-400/0 via-${item.color}-400/60 to-${item.color}-400/0 opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                        <div className={`text-${item.color}-400 mb-6 transition-transform group-hover:scale-110`}>{item.icon}</div>
                        <h3 className="font-medium text-xl tracking-wider text-white/90 mb-2">{item.title}</h3>
                        <p className="text-blue-200/50 font-light">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* COUNTDOWN */}
                {eventData.enableCountdown && (
                  <section className="py-24 border-b border-white/5">
                    <p className="text-center uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-20 font-medium">Sailing In</p>
                    <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
                      {[
                        { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                        { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                        { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                        { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                      ].map((item, index) => (
                        <div key={index} className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                          <h3 className="text-4xl md:text-5xl font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200/70">
                            {item.value}
                          </h3>
                          <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-blue-300/40">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* LOVE STORY */}
                {eventData.showStory && eventData.loveStory?.length > 0 && (
                  <section className="py-24 border-b border-white/5">
                    <div className="text-center mb-24">
                      <Heart className="mx-auto text-cyan-400/60 mb-6" size={32} fill="currentColor" />
                      <p className="uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 font-medium">Our Voyage</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {eventData.loveStory.map((story, index) => (
                        <motion.div key={index} whileHover={{ y: -10 }} className="group rounded-2xl overflow-hidden border border-white/5 bg-slate-900/60 backdrop-blur-md hover:border-cyan-500/20 transition-all duration-500">
                          <div className="h-56 overflow-hidden relative">
                            <img src={story.image || "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                          </div>
                          <div className="p-8 relative -mt-10 z-10">
                            <p className="text-cyan-400/80 text-xs uppercase tracking-widest mb-2 font-medium">{story.subtitle}</p>
                            <h3 className="text-2xl font-light mb-4 text-white/90 tracking-wide">{story.title}</h3>
                            <p className="text-blue-200/40 leading-relaxed text-sm font-light">{story.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* SCHEDULE */}
                {eventData.showSchedule && eventData.schedule?.length > 0 && (
                  <section className="py-24 border-b border-white/5">
                    <p className="text-center uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-20 font-medium">The Itinerary</p>
                    <div className="space-y-6 max-w-5xl mx-auto">
                      {eventData.schedule.map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md group hover:bg-slate-900/60 transition-all duration-300">
                          <div className="flex-1">
                            <h3 className="text-xl font-light text-white/90 tracking-wide mb-1">{item.title}</h3>
                            <p className="text-blue-200/40 text-sm font-light">{item.description}</p>
                          </div>
                          <div className="md:w-32 shrink-0">
                            <span className="inline-flex px-4 py-2 rounded-full border border-cyan-400/20 text-cyan-300 text-xs tracking-widest font-medium bg-cyan-400/5">
                              {item.time}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* GALLERY */}
                {eventData.showGallery && eventData.gallery?.length > 0 && (
                  <section className="py-24 border-b border-white/5">
                    <p className="text-center uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-20 font-medium">Sunken Treasures</p>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                      {eventData.gallery.map((image, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.03 }} className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/5 group relative">
                          <img src={image} alt="" className="w-full h-auto object-cover opacity-70 group-hover:opacity-100 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* RSVP */}
                {eventData.rsvpEnabled && (
                  <section className="py-24 border-b border-white/5">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-16">
                        <p className="uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-4 font-medium">RSVP</p>
                        <h2 className="text-4xl font-extralight tracking-tight text-white/90">Confirm Your Passage</h2>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                        <form className="space-y-8">
                          <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-blue-300/30 focus:border-cyan-500/50 transition-colors font-light" />
                          <input type="number" placeholder="Number of Guests" className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-blue-300/30 focus:border-cyan-500/50 transition-colors font-light" />
                          <textarea rows={4} placeholder="Leave a message..." className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-blue-300/30 focus:border-cyan-500/50 transition-colors font-light resize-none" />
                          <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="py-4 rounded-xl border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition font-medium tracking-wider text-sm">
                              Accept
                            </button>
                            <button type="button" className="py-4 rounded-xl border border-white/10 text-blue-300/50 hover:bg-white/5 transition font-medium tracking-wider text-sm">
                              Decline
                            </button>
                          </div>
                          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                            Send Reply
                          </button>
                        </form>
                      </div>
                    </div>
                  </section>
                )}

                {/* WISHES WALL */}
                {eventData.enableGreetings && eventData.wishes?.length > 0 && (
                  <section className="py-24 border-b border-white/5">
                    <div className="max-w-7xl mx-auto">
                      <p className="text-center uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-20 font-medium">Messages In A Bottle</p>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventData.wishes.map((wish, index) => (
                          <motion.div key={index} whileHover={{ y: -8 }} className="p-6 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-md hover:border-cyan-500/20 transition-all duration-300 group">
                            <div className="flex items-center gap-3 mb-4 opacity-50">
                              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400">Signal Found</span>
                            </div>
                            <p className="text-blue-200/60 leading-relaxed mb-6 text-sm font-light italic">&ldquo;{wish.message}&rdquo;</p>
                            <div className="flex items-center justify-between">
                              <span className="text-cyan-300 text-sm font-medium tracking-wide">— {wish.name}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* LOCATION */}
                {eventData.showVenue && (
                  <section className="py-24">
                    <div className="max-w-7xl mx-auto">
                      <p className="text-center uppercase tracking-[0.4em] text-[10px] text-cyan-400/50 mb-20 font-medium">The Harbor</p>
                      <div className="grid lg:grid-cols-2 gap-12">
                        <div className="p-10 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl flex flex-col justify-center">
                          <h3 className="text-3xl font-extralight mb-6 tracking-wider text-white/90">{eventData.venue}</h3>
                          <p className="text-blue-200/50 leading-relaxed mb-8 font-light text-sm">{eventData.address}</p>
                          {eventData.mapLink && (
                            <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-all duration-500 tracking-[0.15em] uppercase text-xs font-medium w-fit">
                              <MapPin size={14} />
                              Set Coordinates
                            </a>
                          )}
                        </div>
                        <div className="rounded-3xl overflow-hidden border border-white/10 min-h-[450px] shadow-2xl">
                          {eventData.mapLink ? (
                            <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700" loading="lazy" />
                          ) : (
                            <div className="h-full w-full bg-slate-900 flex items-center justify-center"><p className="text-blue-300/30 font-light text-sm">Map Offline</p></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* FOOTER - Deep Ocean Drop Off */}
                <footer className="pt-20 pb-40 -mx-8 md:-mx-16 px-8 md:px-16 bg-gradient-to-t from-slate-900/90 to-transparent">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-px h-24 mx-auto mb-12 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                    <p className="uppercase tracking-[0.4em] text-xs text-blue-300/30 mb-8 font-medium">Into The Horizon</p>
                    <h2 className="text-5xl md:text-7xl font-extralight mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                      {eventData.brideName} <span className="text-cyan-400/40 mx-2">&</span> {eventData.groomName}
                    </h2>
                    <p className="text-blue-800/30 text-xs tracking-widest uppercase font-sans mt-16">
                      Navigating love using Ente Invite
                    </p>
                  </div>
                </footer>

              </div> {/* End Floating Deck Wrapper */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}