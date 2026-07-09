"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Sparkles,
  Rocket,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function CelestialStarlight({
  eventData,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  // Generate random stars for the background
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => setShowInvitation(true), 1200);
  };

  return (
    <main 
      className="bg-[#050816] text-white overflow-x-hidden" 
      style={{ fontFamily: "'Inter', 'Helvetica Neue', system-ui, sans-serif" }}
    >
      {/* ANIMATED STAR FIELD BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        {/* Ambient Cosmic Dust */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO: COSMIC PORTAL BUTTON                                                        */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="cosmic-intro"
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="text-center px-6"
            >
              <Sparkles className="mx-auto text-purple-400 mb-8" size={48} />
              <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white/80 mb-4">
                A UNION WRITTEN IN THE STARS
              </h2>
              <p className="text-indigo-300/50 font-light max-w-lg mx-auto mb-16">
                The cosmos has aligned for {eventData.brideName} & {eventData.groomName}. Step through the portal to witness their celestial bond.
              </p>

              {/* The Portal Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenInvitation}
                className="relative w-48 h-48 rounded-full border border-purple-500/30 bg-purple-900/20 backdrop-blur-xl flex items-center justify-center transition-all duration-500 group"
              >
                {/* Spinning Rings */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin" style={{ animationDuration: '10s' }}></div>
                <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
                
                <div className="text-center z-10">
                  <Rocket className="mx-auto text-cyan-300 mb-3 group-hover:translate-x-2 transition-transform" size={32} />
                  <span className="text-xs tracking-[0.3em] uppercase text-purple-200">Enter</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION (Celestial Theme)                                                  */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10"
          >
            
            {/* HERO - Constellation Style */}
            <section className="min-h-screen flex items-center justify-center relative">
              <div className="text-center px-6">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <div className="flex items-center justify-center gap-4 mb-12 text-cyan-400/50">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                    <p className="uppercase tracking-[0.6em] text-xs font-medium">Destiny Awaits</p>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                  </div>

                  <h1 className="text-7xl md:text-9xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 pb-2">
                    {eventData.brideName}
                  </h1>
                  
                  <div className="my-10 text-purple-400 text-4xl font-extralight">&</div>
                  
                  <h1 className="text-7xl md:text-9xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 pb-2">
                    {eventData.groomName}
                  </h1>

                  <div className="mt-16 inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    <CalendarDays size={18} className="text-cyan-400" />
                    <p className="text-xl font-light tracking-widest text-white/80">{eventData.date}</p>
                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Explore The Universe</span>
                <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1">
                  <div className="w-1 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </section>

            {/* COUPLE SECTION - Floating Glass Panels */}
            {eventData.showCoupleInfo && (
              <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-20 font-medium">The Celestial Beings</p>
                  <div className="grid md:grid-cols-2 gap-16">
                    {[
                      { name: eventData.brideName, role: "The Bride", desc: "A star that illuminates the night.", gradient: "from-cyan-500/20 to-blue-600/20" },
                      { name: eventData.groomName, role: "The Groom", desc: "The gravity that holds it all together.", gradient: "from-purple-500/20 to-pink-600/20" }
                    ].map((person, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ y: -10 }} 
                        className="relative group rounded-3xl p-1 transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                      >
                        {/* Glow Border */}
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${person.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                        
                        <div className="relative bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center overflow-hidden">
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors"></div>
                          
                          <h3 className="text-4xl font-extralight tracking-wider mb-3 text-white relative z-10">{person.name}</h3>
                          <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4"></div>
                          <p className="text-indigo-300/60 text-sm font-light tracking-wide relative z-10">{person.role}</p>
                          <p className="text-indigo-200/40 text-xs mt-4 italic font-light relative z-10">{person.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* EVENT DETAILS - Holographic Cards */}
            <section className="py-32 px-6">
              <div className="max-w-6xl mx-auto">
                <p className="text-center uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-20 font-medium">Coordinates</p>
                <div className="grid lg:grid-cols-3 gap-8">
                  {[
                    { icon: <CalendarDays size={28} />, title: "Stardate", desc: eventData.date, color: "cyan" },
                    { icon: <Clock3 size={28} />, title: "Timecode", desc: eventData.time, color: "purple" },
                    { icon: <MapPin size={28} />, title: "Sector", desc: eventData.venue, color: "pink" },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative p-8 rounded-2xl border border-white/10 bg-[#0f172a]/60 backdrop-blur-md overflow-hidden group"
                    >
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${item.color}-400/0 via-${item.color}-400/80 to-${item.color}-400/0 opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                      <div className={`text-${item.color}-400 mb-6 transition-transform group-hover:scale-110`}>{item.icon}</div>
                      <h3 className="font-medium text-xl tracking-wider text-white/90 mb-2">{item.title}</h3>
                      <p className="text-indigo-200/50 font-light">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* COUNTDOWN - Digital Space Clock */}
            {eventData.enableCountdown && (
              <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-20 font-medium">Launching In</p>
                  <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
                    {[
                      { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                      { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                      { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                      { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                    ].map((item, index) => (
                      <div key={index} className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden group">
                          {/* Scanning line effect */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 animate-scan"></div>
                          <h3 className="text-4xl md:text-5xl font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200/70">
                            {item.value}
                          </h3>
                        </div>
                        <p className="mt-3 text-center text-[10px] tracking-[0.3em] uppercase text-indigo-400/50">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOVE STORY - Timeline Orbits */}
            {eventData.showStory && eventData.loveStory?.length > 0 && (
              <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-24">
                    <Heart className="mx-auto text-pink-400/60 mb-6" size={32} fill="currentColor" />
                    <p className="uppercase tracking-[0.4em] text-xs text-purple-400/60 font-medium">Our Orbit</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventData.loveStory.map((story, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ y: -10 }} 
                        className="group rounded-2xl overflow-hidden border border-white/5 bg-[#0f172a]/60 backdrop-blur-md hover:border-purple-500/30 transition-all duration-500"
                      >
                        <div className="h-56 overflow-hidden relative">
                          <img src={story.image || "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent"></div>
                        </div>
                        <div className="p-8 relative -mt-10 z-10">
                          <p className="text-purple-400/80 text-xs uppercase tracking-widest mb-2 font-medium">{story.subtitle}</p>
                          <h3 className="text-2xl font-light mb-4 text-white/90 tracking-wide">{story.title}</h3>
                          <p className="text-indigo-200/50 leading-relaxed text-sm font-light">{story.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SCHEDULE - Mission Logs */}
            {eventData.showSchedule && eventData.schedule?.length > 0 && (
              <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-20 font-medium">Mission Log</p>
                  <div className="space-y-6 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent hidden md:block"></div>
                    
                    {eventData.schedule.map((item, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -30 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-center gap-6 group"
                      >
                        {/* Node */}
                        <div className="hidden md:flex w-16 h-16 rounded-full border border-purple-500/30 bg-[#0f172a] items-center justify-center shrink-0 z-10 group-hover:border-purple-400 transition-colors">
                          <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]"></div>
                        </div>

                        <div className="flex-1 p-6 rounded-2xl border border-white/5 bg-[#0f172a]/40 backdrop-blur-md group-hover:bg-[#0f172a]/60 group-hover:border-purple-500/20 transition-all duration-300">
                          <h3 className="text-xl font-light mb-1 text-white/90 tracking-wide">{item.title}</h3>
                          <p className="text-indigo-200/40 text-sm font-light">{item.description}</p>
                        </div>

                        <div className="md:w-32 shrink-0">
                          <span className="px-4 py-2 rounded-full border border-cyan-400/20 text-cyan-300 text-xs tracking-widest font-medium bg-cyan-400/5">
                            {item.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* GALLERY - Floating Fragments */}
            {eventData.showGallery && eventData.gallery?.length > 0 && (
              <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-20 font-medium">Visual Echoes</p>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                    {eventData.gallery.map((image, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.03 }} 
                        className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/5 group relative"
                      >
                        <img src={image} alt="" className="w-full h-auto object-cover opacity-70 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* RSVP - Terminal Style */}
            {eventData.rsvpEnabled && (
              <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <p className="uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-4 font-medium">RSVP</p>
                    <h2 className="text-4xl font-extralight tracking-tight text-white/90">Confirm Transmission</h2>
                  </div>
                  
                  <div className="rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-black/30">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <span className="ml-4 text-xs text-indigo-400/50 font-mono">rsvp_transmission.exe</span>
                    </div>

                    <form className="p-8 md:p-12 space-y-8">
                      <div className="relative">
                        <label className="absolute -top-3 left-4 px-2 text-[10px] tracking-widest uppercase text-purple-400/60 bg-[#0f172a] font-mono">Identify Yourself</label>
                        <input type="text" placeholder="Enter Name..." className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-indigo-300/30 focus:border-purple-500/50 transition-colors font-mono text-sm" />
                      </div>
                      <div className="relative">
                        <label className="absolute -top-3 left-4 px-2 text-[10px] tracking-widest uppercase text-purple-400/60 bg-[#0f172a] font-mono">Crew Size</label>
                        <input type="number" placeholder="0" className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-indigo-300/30 focus:border-purple-500/50 transition-colors font-mono text-sm" />
                      </div>
                      <div className="relative">
                        <label className="absolute -top-3 left-4 px-2 text-[10px] tracking-widest uppercase text-purple-400/60 bg-[#0f172a] font-mono">Subspace Message</label>
                        <textarea rows={4} placeholder="Type message..." className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-indigo-300/30 focus:border-purple-500/50 transition-colors font-mono text-sm resize-none" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="py-4 rounded-xl border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition font-mono text-sm tracking-wider">
                          ACCEPT [Y]
                        </button>
                        <button type="button" className="py-4 rounded-xl border border-white/10 text-indigo-300/50 hover:bg-white/5 transition font-mono text-sm tracking-wider">
                          DECLINE [N]
                        </button>
                      </div>
                      
                      <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        Transmit Data
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* WISHES - Floating Comms */}
            {eventData.enableGreetings && eventData.wishes?.length > 0 && (
              <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-20 font-medium">Incoming Transmissions</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventData.wishes.map((wish, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ y: -8 }} 
                        className="p-6 rounded-2xl border border-white/5 bg-[#0f172a]/60 backdrop-blur-md hover:border-purple-500/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3 mb-4 opacity-50">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-[10px] font-mono tracking-widest uppercase text-green-400">Signal Locked</span>
                        </div>
                        <p className="text-indigo-200/60 leading-relaxed mb-6 text-sm font-light italic font-mono">&ldquo;{wish.message}&rdquo;</p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-300 text-sm font-medium tracking-wide">— {wish.name}</span>
                          <Sparkles size={14} className="text-purple-400/40 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOCATION - Starmap */}
            {eventData.showVenue && (
              <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-xs text-purple-400/60 mb-20 font-medium">Starmap Location</p>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="p-10 rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl flex flex-col justify-center">
                      <h3 className="text-3xl font-extralight mb-6 tracking-wider text-white/90">{eventData.venue}</h3>
                      <p className="text-indigo-200/50 leading-relaxed mb-8 font-light font-mono text-sm">{eventData.address}</p>
                      {eventData.mapLink && (
                        <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all duration-500 tracking-[0.15em] uppercase text-xs font-medium w-fit">
                          <MapPin size={14} />
                          Set Coordinates
                        </a>
                      )}
                    </div>
                    <div className="rounded-3xl overflow-hidden border border-white/10 min-h-[450px] shadow-2xl">
                      {eventData.mapLink ? (
                        <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700" loading="lazy" />
                      ) : (
                        <div className="h-full w-full bg-[#0f172a] flex items-center justify-center"><p className="text-indigo-300/30 font-mono text-sm">Map Offline</p></div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FOOTER - Deep Space */}
            <footer className="py-40 px-6 border-t border-white/5">
              <div className="max-w-4xl mx-auto text-center">
                <div className="w-px h-24 mx-auto mb-12 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
                <p className="uppercase tracking-[0.4em] text-xs text-indigo-400/40 mb-8 font-medium">To Infinity And Beyond</p>
                <h2 className="text-5xl md:text-7xl font-extralight mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                  {eventData.brideName} <span className="text-purple-400/50 mx-2">&</span> {eventData.groomName}
                </h2>
                <p className="text-indigo-600/40 text-xs tracking-widest uppercase font-mono">
                  Crafted in the cosmos using Ente Invite
                </p>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ANIMATIONS CSS */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>

    </main>
  );
}