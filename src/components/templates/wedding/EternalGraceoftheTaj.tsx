"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Crown,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function EternalGraceoftheTaj({
  eventData,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => setShowInvitation(true), 1500);
  };

  // Reusable Mughal Arch Frame Class
  const mughalArch = "rounded-t-full rounded-b-[10%]";

  return (
    <main 
      className="bg-[#f8f4ed] text-[#2d2a26] overflow-x-hidden" 
      style={{ fontFamily: "'Amiri', 'Georgia', serif" }}
    >
      {/* FIXED TAJ MAHAL BACKGROUND FOR PARALLAX DEPTH EFFECT */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcf9] via-[#f8f4ed] to-[#e8e0d4]"></div>
        {/* The Taj Mahal Silhouette Image */}
        <div className="absolute bottom-0 left-0 right-0 h-[80vh] opacity-[0.06] pointer-events-none"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
        </div>
        {/* Subtle repeating geometric Mughal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23d4af37' fill-opacity='1'/%3E%3C/svg%3E\")" }}></div>
      </div>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO: THE IMPERIAL SCROLL                                                      */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="taj-intro"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex items-center justify-center z-10"
            style={{ background: "radial-gradient(circle at center, #ffffff 0%, #f8f4ed 60%, #e8e0d4 100%)" }}
          >
            <div className="relative z-10 text-center px-6 max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Crown className="mx-auto text-[#d4af37] mb-8 opacity-70" size={48} />
                <h2 className="text-5xl md:text-7xl font-bold tracking-wide text-[#2d2a26] mb-6 leading-tight">
                  An Imperial Celebration
                </h2>
                <p className="text-[#8b7e6b] text-sm tracking-widest uppercase mb-16">
                  A love as timeless as the Taj Mahal
                </p>

                {/* The Scroll Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(45, 42, 38, 0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpenInvitation}
                  className="relative w-full max-w-sm mx-auto block overflow-hidden rounded-sm shadow-2xl border-4 border-double border-[#d4af37]/30"
                  style={{ background: "linear-gradient(to bottom, #fdfcf9, #f0ebe0)" }}
                >
                  {/* Scroll top/bottom ornate bars */}
                  <div className="w-full h-4 bg-[#d4af37]/10"></div>
                  
                  <div className="p-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-[#d4af37]/40 flex items-center justify-center">
                      <span className="text-3xl text-[#d4af37]">❋</span>
                    </div>
                    <h3 className="text-3xl font-bold text-[#2d2a26] tracking-wider mb-2">{eventData.brideName}</h3>
                    <div className="my-3 text-[#d4af37] text-2xl">&</div>
                    <h3 className="text-3xl font-bold text-[#2d2a26] tracking-wider">{eventData.groomName}</h3>
                    <p className="mt-6 text-xs tracking-[0.3em] uppercase text-[#8b7e6b]">Unroll to witness the union</p>
                  </div>

                  <div className="w-full h-4 bg-[#d4af37]/10"></div>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION (Mughal Architectural Theme)                                      */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="taj-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10"
          >
            
            {/* HERO - The Grand Archway */}
            <section className="min-h-screen flex items-center justify-center relative pt-20 pb-32 px-6">
              {/* Decorative Arch Frame behind text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-[90%] max-w-3xl h-[80%] border-4 border-double border-[#d4af37]/10 ${mughalArch}`}></div>
              </div>

              <div className="text-center relative z-10">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <p className="text-[#d4af37] text-xs tracking-[0.6em] uppercase mb-12 font-sans">Under the blessed dome</p>
                  
                  <h1 className="text-7xl md:text-9xl font-bold leading-none text-[#2d2a26] mb-4" style={{ textShadow: "2px 2px 0px rgba(212, 175, 55, 0.2)" }}>
                    {eventData.brideName}
                  </h1>
                  
                  <div className="my-8 flex items-center justify-center gap-6">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4af37]/40"></div>
                    <div className="w-3 h-3 bg-[#d4af37]/30 rotate-45"></div>
                    <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4af37]/40"></div>
                  </div>
                  
                  <h1 className="text-7xl md:text-9xl font-bold leading-none text-[#2d2a26] mb-12" style={{ textShadow: "2px 2px 0px rgba(212, 175, 55, 0.2)" }}>
                    {eventData.groomName}
                  </h1>

                  <div className="inline-block px-12 py-5 border border-[#d4af37]/30 bg-white/60 backdrop-blur-sm shadow-lg">
                    <p className="text-2xl font-semibold tracking-[0.2em] text-[#2d2a26]">{eventData.date}</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* COUPLE - The Marble Mausoleum Wings */}
            {eventData.showCoupleInfo && (
              <section className="py-32 px-6 relative">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                  {[
                    { name: eventData.brideName, role: "The Empress", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" },
                    { name: eventData.groomName, role: "The Emperor", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
                  ].map((person, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      {/* The Marble Frame */}
                      <div className={`relative overflow-hidden shadow-2xl bg-white border-2 border-[#d4af37]/20 ${mughalArch}`}>
                        <div className="h-96 overflow-hidden">
                          <img src={person.img} alt={person.role} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Inlay details at the bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                          <div className="w-20 h-px bg-[#d4af37]/30 mx-auto mb-4"></div>
                          <h3 className="text-3xl font-bold text-[#2d2a26] tracking-wide">{person.name}</h3>
                          <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mt-2 font-sans">{person.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* DETAILS - The Pishtaq (Archways) */}
            <section className="py-32 px-6 bg-white/40 backdrop-blur-sm">
              <div className="max-w-6xl mx-auto text-center mb-20">
                <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans">The Royal Decree</p>
              </div>
              <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {[
                  { icon: <CalendarDays size={32} />, title: "The Date", desc: eventData.date },
                  { icon: <Clock3 size={32} />, title: "The Hour", desc: eventData.time },
                  { icon: <MapPin size={32} />, title: "The Grounds", desc: eventData.venue },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -10 }} 
                    className={`relative bg-white border-2 border-[#d4af37]/20 shadow-xl p-10 text-center ${mughalArch} group hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] transition-shadow duration-500`}
                  >
                    {/* Arch top shadow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-gradient-to-b from-black/5 to-transparent rounded-full blur-sm"></div>
                    
                    <div className="text-[#d4af37] mb-8 flex justify-center">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-[#2d2a26] mb-4 tracking-wider">{item.title}</h3>
                    <p className="text-[#5e574e] font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* COUNTDOWN - The Sundial */}
            {eventData.enableCountdown && (
              <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans mb-20">Awaiting the Hour</p>
                  
                  <div className="relative inline-block p-12 bg-white border-2 border-double border-[#d4af37]/20 rounded-full shadow-2xl">
                    <div className="grid grid-cols-4 gap-8 md:gap-16">
                      {[
                        { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                        { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                        { label: "Min", value: String(timeLeft.minutes).padStart(2, "0") },
                        { label: "Sec", value: String(timeLeft.seconds).padStart(2, "0") },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <p className="text-5xl md:text-6xl font-bold text-[#2d2a26]" style={{ textShadow: "1px 1px 0px rgba(212, 175, 55, 0.2)" }}>{item.value}</p>
                          <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-[#8b7e6b] font-sans">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* LOVE STORY - The Garden Walkway */}
            {eventData.showStory && eventData.loveStory?.length > 0 && (
              <section className="py-32 px-6 bg-white/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto text-center mb-24">
                  <Heart className="mx-auto text-[#d4af37] mb-6 opacity-60" size={32} fill="currentColor" />
                  <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans">The Chronicle</p>
                </div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {eventData.loveStory.map((story, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ y: -10 }} 
                      className="group bg-white border border-[#d4af37]/10 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500"
                    >
                      <div className="h-64 overflow-hidden relative">
                        <img src={story.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                      </div>
                      <div className="p-8 relative -mt-8 z-10 bg-white/80 backdrop-blur-sm mx-4 border border-[#d4af37]/10">
                        <p className="text-[#d4af37] text-[10px] font-sans uppercase tracking-widest mb-2">{story.subtitle}</p>
                        <h3 className="text-2xl font-bold text-[#2d2a26] mb-3 tracking-wide">{story.title}</h3>
                        <p className="text-[#5e574e] leading-relaxed text-sm font-light">{story.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* SCHEDULE - The Itinerary Plaque */}
            {eventData.showSchedule && eventData.schedule?.length > 0 && (
              <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-20">
                    <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans">The Sequence</p>
                  </div>
                  
                  <div className="relative bg-white border-2 border-double border-[#d4af37]/20 p-10 md:p-16 shadow-2xl">
                    <div className="space-y-12">
                      {eventData.schedule.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center gap-6 text-center md:text-left">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-[#2d2a26] tracking-wide mb-1">{item.title}</h3>
                            <p className="text-[#5e574e] text-sm font-light">{item.description}</p>
                          </div>
                          <div className="px-6 py-2 bg-[#fdfcf9] border border-[#d4af37]/20 shadow-sm">
                            <p className="text-[#d4af37] text-xl font-bold tracking-[0.2em] font-sans">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* GALLERY - The Reflecting Pool */}
            {eventData.showGallery && eventData.gallery?.length > 0 && (
              <section className="py-32 px-6 bg-white/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto text-center mb-20">
                  <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans">The Reflections</p>
                </div>
                <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8">
                  {eventData.gallery.map((image, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02 }} className="mb-8 break-inside-avoid overflow-hidden group cursor-pointer relative border-4 border-white shadow-xl">
                      <img src={image} alt="" className="w-full h-auto object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* RSVP - The Royal Ledger */}
            {eventData.rsvpEnabled && (
              <section className="py-32 px-6">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-16">
                    <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans">Your Presence is Requested</p>
                  </div>
                  
                  <div className="relative bg-white border-2 border-double border-[#d4af37]/20 p-10 md:p-16 shadow-2xl" style={{ boxShadow: "10px 10px 0px rgba(212, 175, 55, 0.1)" }}>
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#d4af37]/30"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#d4af37]/30"></div>

                    <form className="relative z-10 space-y-8 font-sans">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#8b7e6b] mb-3">Name</label>
                        <input type="text" className="w-full bg-transparent border-b-2 border-[#e8e0d4] focus:border-[#d4af37] outline-none py-3 text-[#2d2a26] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#8b7e6b] mb-3">Guests Count</label>
                        <input type="number" className="w-full bg-transparent border-b-2 border-[#e8e0d4] focus:border-[#d4af37] outline-none py-3 text-[#2d2a26] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#8b7e6b] mb-3">Blessings</label>
                        <textarea rows={4} className="w-full bg-transparent border-b-2 border-[#e8e0d4] focus:border-[#d4af37] outline-none py-3 text-[#2d2a26] transition-colors resize-none"></textarea>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 pt-4">
                        <button type="button" className="py-4 bg-[#d4af37] text-white hover:bg-[#c5a059] transition font-bold tracking-widest text-sm uppercase shadow-lg">
                          Accept
                        </button>
                        <button type="button" className="py-4 border-2 border-[#2d2a26] text-[#2d2a26] hover:bg-[#2d2a26] hover:text-white transition font-bold tracking-widest text-sm uppercase">
                          Decline
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* WISHES - The Carved Jali Screen */}
            {eventData.enableGreetings && eventData.wishes?.length > 0 && (
              <section className="py-32 px-6 bg-white/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto text-center mb-20">
                  <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans">The Blessings</p>
                </div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {eventData.wishes.map((wish, index) => (
                    <motion.div key={index} whileHover={{ y: -5 }} className="bg-white border border-[#d4af37]/10 p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      {/* Jali pattern background */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8' fill='none' stroke='%23d4af37' stroke-width='1'/%3E%3C/svg%3E\")" }}></div>
                      
                      <p className="text-[#5e574e] leading-relaxed mb-6 text-sm italic relative z-10">&ldquo;{wish.message}&rdquo;</p>
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-px bg-[#d4af37]/50"></div>
                        <span className="text-[#d4af37] text-sm font-bold tracking-wide">{wish.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* LOCATION - The Maps */}
            {eventData.showVenue && (
              <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                  <div className="flex flex-col justify-center bg-white border border-[#d4af37]/10 p-12 shadow-xl">
                    <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase font-sans mb-6">The Location</p>
                    <h3 className="text-4xl font-bold text-[#2d2a26] mb-8 tracking-wide leading-tight">{eventData.venue}</h3>
                    <p className="text-[#5e574e] leading-relaxed mb-10 text-sm">{eventData.address}</p>
                    {eventData.mapLink && (
                      <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 bg-[#2d2a26] text-[#d4af37] hover:bg-[#1a1916] transition-all duration-500 tracking-[0.2em] uppercase text-xs font-sans w-fit">
                        <MapPin size={14} />
                        View Directions
                      </a>
                    )}
                  </div>
                  <div className="relative h-[500px] border-2 border-double border-[#d4af37]/10 overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    {eventData.mapLink ? (
                      <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale contrast-110 hover:grayscale-0 hover:contrast-100 transition-all duration-1000" loading="lazy" />
                    ) : (
                      <div className="h-full w-full bg-[#e8e0d4] flex items-center justify-center"><p className="text-[#8b7e6b] font-sans text-sm">Map Unavailable</p></div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* FOOTER - The Grand Finale */}
            <footer className="py-40 px-6 bg-[#2d2a26] text-[#f8f4ed] relative overflow-hidden">
              {/* Water reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#2d2a26] to-transparent z-10 pointer-events-none"></div>
              
              <div className="max-w-4xl mx-auto text-center relative z-20">
                <div className="w-40 h-px mx-auto mb-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                
                <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-12 font-sans">With Eternal Love</p>
                
                <h2 className="text-6xl md:text-8xl font-bold text-[#f8f4ed] leading-none mb-10" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                  {eventData.brideName}
                </h2>
                
                <div className="my-10 flex justify-center">
                  <div className="w-4 h-4 border border-[#d4af37] rotate-45"></div>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-bold text-[#f8f4ed] leading-none" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                  {eventData.groomName}
                </h2>

                <p className="mt-24 text-[#5e574e] text-xs tracking-[0.3em] uppercase font-sans">
                  Forged in eternity by Ente Invite
                </p>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}