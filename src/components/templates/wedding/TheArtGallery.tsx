"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Frame,
  Eye,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function TheArtGallery({
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

  return (
    <main 
      className="bg-[#1a1a1a] text-white overflow-x-hidden" 
      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
    >
      {/* MUSEUM WALL TEXTURE */}
      <div className="fixed inset-0 z-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="fixed inset-0 z-0 bg-black/80"></div>

      {/* INTRO: THE RED VELVET CURTAINS */}
      <AnimatePresence>
        {!showInvitation && (
          <motion.section
            key="curtain-intro"
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex items-center justify-center overflow-hidden z-50 bg-black/20"
          >
            {/* Left Curtain */}
            <motion.div 
              animate={isOpening ? { x: "-100%" } : { x: 0 }} 
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1/2 z-20"
              style={{ 
                background: "linear-gradient(90deg, #2d0a0a 0%, #8b1a1a 40%, #a52a2a 100%)",
                boxShadow: "inset -20px 0 40px rgba(0,0,0,0.8)"
              }}
            >
              {/* Velvet fold lines */}
              <div className="absolute top-0 bottom-0 left-1/3 w-px bg-black/30"></div>
              <div className="absolute top-0 bottom-0 left-2/3 w-px bg-black/20"></div>
            </motion.div>

            {/* Right Curtain */}
            <motion.div 
              animate={isOpening ? { x: "100%" } : { x: 0 }} 
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute right-0 top-0 bottom-0 w-1/2 z-20"
              style={{ 
                background: "linear-gradient(-90deg, #2d0a0a 0%, #8b1a1a 40%, #a52a2a 100%)",
                boxShadow: "inset 20px 0 40px rgba(0,0,0,0.8)"
              }}
            >
              <div className="absolute top-0 bottom-0 right-1/3 w-px bg-black/30"></div>
              <div className="absolute top-0 bottom-0 right-2/3 w-px bg-black/20"></div>
            </motion.div>

            {/* Center Content IN FRONT OF curtains */}
            <div className="relative z-30 text-center px-6">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={isOpening ? { opacity: 0, scale: 0.9 } : { opacity: 1 }} 
                transition={{ duration: 0.5, delay: isOpening ? 0 : 0.5 }}
              >
                <Frame className="mx-auto text-amber-400/60 mb-8" size={64} />
                <h2 className="text-4xl md:text-6xl font-light tracking-wide text-white/90 mb-6">
                  A Private Viewing
                </h2>
                <p className="text-stone-400 font-sans text-sm tracking-widest uppercase mb-16 max-w-md mx-auto">
                  The gallery is closed to the public. You are granted exclusive access to witness this union.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenInvitation}
                  className="group relative px-12 py-5 border border-amber-500/30 text-amber-200 uppercase tracking-[0.3em] text-xs font-sans transition-all duration-500 hover:bg-amber-900/20 overflow-hidden bg-black/40 backdrop-blur-sm"
                >
                  <span className="relative z-10">Enter The Gallery</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* MAIN INVITATION (Museum Exhibit Theme) */}
      <motion.div
        key="gallery-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10"
      >
            
            {/* HERO - The Main Masterpiece Canvas */}
            <section className="min-h-screen flex items-center justify-center relative">
              {/* Museum Spotlights */}
              <div className="absolute top-0 left-1/4 w-64 h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-0 right-1/4 w-64 h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative text-center px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <p className="uppercase tracking-[0.6em] text-[10px] text-stone-500 font-sans mb-12">Exhibition Presented By</p>
                  
                  <h1 className="text-7xl md:text-9xl font-bold leading-none text-white drop-shadow-lg">
                    {eventData.brideName}
                  </h1>
                  
                  <div className="my-8 flex justify-center">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                  </div>
                  
                  <h1 className="text-7xl md:text-9xl font-bold leading-none text-white drop-shadow-lg">
                    {eventData.groomName}
                  </h1>

                  <div className="mt-16 inline-block px-10 py-4 border border-white/10 bg-black/30 backdrop-blur-sm">
                    <p className="text-2xl font-light tracking-widest text-stone-300 font-sans">{eventData.date}</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* COUPLE SECTION - Portrait Galleries */}
            {eventData.showCoupleInfo && (
              <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Gallery I</p>
                  <h2 className="text-4xl font-light text-center mb-20 text-stone-300 tracking-wide">The Subjects</h2>
                  
                  <div className="grid md:grid-cols-2 gap-20">
                    {[
                      { name: eventData.brideName, role: "The Muse", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" },
                      { name: eventData.groomName, role: "The Creator", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
                    ].map((person, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 50 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        className="group relative"
                      >
                        {/* The Art Frame */}
                        <div className="relative p-4 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 shadow-2xl">
                          <div className="absolute inset-0 border border-amber-900/30 z-10 pointer-events-none"></div>
                          
                          <div className="relative h-[500px] overflow-hidden bg-black">
                            <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          </div>
                        </div>

                        {/* Museum Placard underneath */}
                        <div className="mt-8 p-6 border-l-2 border-amber-600 bg-black/30 backdrop-blur-sm max-w-xs">
                          <p className="text-amber-500 text-xs font-sans uppercase tracking-widest mb-2">{person.role}</p>
                          <h3 className="text-3xl font-bold text-white">{person.name}</h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* EVENT DETAILS - Pedestal Artifacts */}
            <section className="py-32 px-6 bg-black/30">
              <div className="max-w-6xl mx-auto">
                <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Gallery II</p>
                <h2 className="text-4xl font-light text-center mb-20 text-stone-300 tracking-wide">Exhibit Details</h2>
                
                <div className="grid lg:grid-cols-3 gap-12">
                  {[
                    { icon: <CalendarDays size={32} />, title: "Opening Night", desc: eventData.date },
                    { icon: <Clock3 size={32} />, title: "Doors Open", desc: eventData.time },
                    { icon: <MapPin size={32} />, title: "Location", desc: eventData.venue },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ y: -10 }} 
                      className="text-center group"
                    >
                      {/* Pedestal top glow */}
                      <div className="w-32 h-32 mx-auto rounded-full border border-white/5 bg-[#222] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] transition-shadow duration-500">
                        <div className="text-amber-400">{item.icon}</div>
                      </div>
                      
                      {/* Placard */}
                      <div className="p-6 border border-white/5 bg-black/40 max-w-xs mx-auto">
                        <p className="text-amber-500 text-[10px] font-sans uppercase tracking-widest mb-2">{item.title}</p>
                        <h3 className="text-xl font-light text-stone-200">{item.desc}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* COUNTDOWN - Digital Installation Art */}
            {eventData.enableCountdown && (
              <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Gallery III</p>
                  <h2 className="text-4xl font-light text-center mb-20 text-stone-300 tracking-wide">Time Remaining</h2>
                  
                  <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
                    {[
                      { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                      { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                      { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                      { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.1 }}
                        className="relative w-28 h-28 md:w-36 md:h-36 flex flex-col items-center justify-center border border-white/10 bg-black/40 backdrop-blur-sm group hover:border-amber-500/30 transition-colors duration-300"
                      >
                        <h3 className="text-5xl md:text-6xl font-extralight text-white group-hover:text-amber-200 transition-colors">{item.value}</h3>
                        <div className="absolute bottom-3 text-[9px] tracking-[0.3em] uppercase text-stone-600 font-sans">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOVE STORY - The Storyboard Corridor */}
            {eventData.showStory && eventData.loveStory?.length > 0 && (
              <section className="py-32 px-6 bg-black/30">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Gallery IV</p>
                  <h2 className="text-4xl font-light text-center mb-24 text-stone-300 tracking-wide">The Storyboard</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {eventData.loveStory.map((story, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="relative p-3 bg-stone-800 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                          <div className="relative h-72 overflow-hidden bg-black">
                            <img src={story.image || "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                            {/* Number tag */}
                            <div className="absolute top-4 right-4 w-8 h-8 bg-black/80 border border-white/20 flex items-center justify-center text-xs font-sans text-stone-400">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-6 border-l-2 border-white/10 hover:border-amber-600 transition-colors duration-300">
                          <p className="text-amber-500/80 text-xs font-sans uppercase tracking-widest mb-2">{story.subtitle}</p>
                          <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{story.title}</h3>
                          <p className="text-stone-500 leading-relaxed text-sm font-light font-sans">{story.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SCHEDULE - The Itinerary Plaque */}
            {eventData.showSchedule && eventData.schedule?.length > 0 && (
              <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Gallery V</p>
                  <h2 className="text-4xl font-light text-center mb-20 text-stone-300 tracking-wide">Itinerary</h2>
                  
                  <div className="relative p-10 md:p-16 border border-white/10 bg-gradient-to-br from-stone-900 to-black shadow-2xl">
                    <div className="absolute inset-0 border border-amber-900/20 m-2 pointer-events-none"></div>
                    
                    <div className="relative z-10 space-y-12">
                      {eventData.schedule.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center gap-6 group">
                          <div className="flex-1">
                            <h3 className="text-2xl font-light text-white tracking-wide group-hover:text-amber-200 transition-colors">{item.title}</h3>
                            <p className="text-stone-500 text-sm font-sans mt-2">{item.description}</p>
                          </div>
                          <div className="md:text-right shrink-0">
                            <span className="text-xl font-light text-amber-400 tracking-widest font-sans">{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* GALLERY - The Salon */}
            {eventData.showGallery && eventData.gallery?.length > 0 && (
              <section className="py-32 px-6 bg-black/30">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Gallery VI</p>
                  <h2 className="text-4xl font-light text-center mb-20 text-stone-300 tracking-wide">The Salon</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {eventData.gallery.map((image, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.05, zIndex: 10 }} 
                        className="relative p-2 bg-stone-800 shadow-xl group cursor-pointer"
                      >
                        <div className="relative h-64 md:h-80 overflow-hidden bg-black">
                          <img src={image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Eye className="text-white/80" size={32} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* RSVP - The Guestbook / Audio Guide */}
            {eventData.rsvpEnabled && (
              <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Interaction</p>
                  <h2 className="text-4xl font-light text-center mb-16 text-stone-300 tracking-wide">Sign The Guestbook</h2>
                  
                  <div className="relative bg-[#0a0a0a] border border-white/10 p-12 shadow-2xl">
                    {/* Gold corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-700/50"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-700/50"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-700/50"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-700/50"></div>

                    <form className="relative z-10 space-y-10">
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-stone-600 mb-3">Full Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-stone-800 focus:border-amber-600 outline-none py-3 text-white font-sans transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-stone-600 mb-3">Party Size</label>
                        <input type="number" className="w-full bg-transparent border-b border-stone-800 focus:border-amber-600 outline-none py-3 text-white font-sans transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-stone-600 mb-3">Thoughts</label>
                        <textarea rows={4} className="w-full bg-transparent border-b border-stone-800 focus:border-amber-600 outline-none py-3 text-white font-sans transition-colors resize-none"></textarea>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 pt-4">
                        <button type="button" className="py-4 border border-amber-700/50 text-amber-400 hover:bg-amber-900/20 transition font-sans tracking-widest text-xs uppercase">
                          Joyfully Accept
                        </button>
                        <button type="button" className="py-4 border border-white/10 text-stone-600 hover:bg-white/5 transition font-sans tracking-widest text-xs uppercase">
                          Respectfully Decline
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* WISHES - The Critics Reviews */}
            {eventData.enableGreetings && eventData.wishes?.length > 0 && (
              <section className="py-32 px-6 bg-black/30">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Guest Book</p>
                  <h2 className="text-4xl font-light text-center mb-20 text-stone-300 tracking-wide">Critics Reviews</h2>
                  
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                    {eventData.wishes.map((wish, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ y: -5 }}
                        className="break-inside-avoid mb-8 p-8 border border-white/5 bg-black/40"
                      >
                        <div className="text-6xl font-serif text-amber-800/20 leading-none mb-4">&ldquo;</div>
                        <p className="text-stone-400 leading-relaxed mb-6 text-sm font-sans italic">{wish.message}</p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-px bg-amber-700/50"></div>
                          <span className="text-amber-500 text-sm font-sans tracking-wide">{wish.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOCATION - The Blueprint */}
            {eventData.showVenue && (
              <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-stone-500 font-sans mb-6">Access</p>
                  <h2 className="text-4xl font-light text-center mb-20 text-stone-300 tracking-wide">Finding The Venue</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-16">
                    <div className="flex flex-col justify-center">
                      <div className="p-10 border-l-4 border-amber-700 bg-black/40">
                        <h3 className="text-4xl font-bold text-white mb-8 tracking-wide">{eventData.venue}</h3>
                        <p className="text-stone-500 leading-relaxed mb-10 font-sans text-sm">{eventData.address}</p>
                        {eventData.mapLink && (
                          <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 border border-amber-700/50 text-amber-400 hover:bg-amber-900/20 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-sans">
                            <MapPin size={14} />
                            View Blueprint
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="relative h-[500px] border border-white/10 overflow-hidden shadow-2xl">
                      {eventData.mapLink ? (
                        <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-1000" loading="lazy" />
                      ) : (
                        <div className="h-full w-full bg-stone-900 flex items-center justify-center"><p className="text-stone-600 font-sans text-sm">Blueprint Unavailable</p></div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FOOTER - The Final Plaque */}
            <footer className="py-40 px-6 bg-black/40 border-t border-white/5">
              <div className="max-w-4xl mx-auto text-center">
                <div className="w-32 h-px mx-auto mb-16 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                
                <p className="uppercase tracking-[0.5em] text-[10px] text-stone-600 font-sans mb-10">End Of Exhibition</p>
                
                <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none">
                  {eventData.brideName}
                </h2>
                
                <div className="my-8 flex justify-center">
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent"></div>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none">
                  {eventData.groomName}
                </h2>

                <p className="mt-20 text-stone-800 text-xs tracking-[0.3em] uppercase font-sans">
                  Curated by Ente Invite
                </p>
              </div>
            </footer>

          </motion.div>
    </main>
  );
}