"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Sparkles,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingTropicalBeach({
  eventData,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; hue: number }[]>([]);
  
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);
  const bubbleIdRef = useRef(0);

  // Continuously generate bubbles from ALL sides of the screen
  useEffect(() => {
    const createBubble = () => {
      const id = bubbleIdRef.current++;
      const side = Math.floor(Math.random() * 4); // 0: bottom, 1: left, 2: right, 3: top
      let x = 0;
      let y = 0;

      switch (side) {
        case 0: // Bottom
          x = Math.random() * 100;
          y = 110;
          break;
        case 1: // Left
          x = -10;
          y = Math.random() * 100;
          break;
        case 2: // Right
          x = 110;
          y = Math.random() * 100;
          break;
        case 3: // Top
          x = Math.random() * 100;
          y = -10;
          break;
      }

      const newBubble = {
        id,
        x,
        y,
        size: Math.random() * 120 + 40, // 40px to 160px
        duration: Math.random() * 10 + 10, // 10s to 20s float time
        delay: 0,
        hue: Math.random() * 360, // Random color for the halo
      };

      setBubbles((prev) => [...prev, newBubble]);

      // Remove bubble after its animation completes
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, newBubble.duration * 1000);
    };

    // Create a new bubble every 300ms for constant density
    const interval = setInterval(createBubble, 300);
    // Create a burst of bubbles initially
    for(let i=0; i<15; i++) {
      setTimeout(createBubble, i * 100);
    }

    return () => clearInterval(interval);
  }, []);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => setShowInvitation(true), 1200);
  };

  return (
    <main 
      className="text-white overflow-x-hidden" 
      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif", background: 'linear-gradient(to bottom, #050008 0%, #0f0520 50%, #050008 100%)' }}
    >
      {/* DENSE BUBBLE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute animate-float-bubble"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.duration}s`,
              // Calculate movement direction based on starting side
              ...(bubble.y > 100 ? { animationName: 'float-up' } : 
                 bubble.x < 0 ? { animationName: 'float-right' } : 
                 bubble.x > 100 ? { animationName: 'float-left' } : 
                 { animationName: 'float-down' })
            }}
          >
            {/* Complex Bubble Structure */}
            <div className="relative w-full h-full rounded-full overflow-hidden" 
                 style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.05) 40%, rgba(138, 43, 226, 0.1) 60%, transparent 100%)', boxShadow: `inset 0 0 20px rgba(255,255,255,0.1), 0 0 40px hsla(${bubble.hue}, 80%, 60%, 0.15)` }}>
              {/* Outer Glass Ring */}
              <div className="absolute inset-0 rounded-full border border-white/10" style={{ boxShadow: `inset 2px 2px 10px rgba(255,255,255,0.1), inset -2px -2px 10px rgba(0,0,0,0.5)` }}></div>
              
              {/* Main Specular Highlight (Top Left) */}
              <div className="absolute top-[15%] left-[20%] w-[35%] h-[25%] rounded-full bg-white/30 blur-sm transform -rotate-12"></div>
              
              {/* Secondary Highlight (Bottom Right) */}
              <div className="absolute bottom-[20%] right-[20%] w-[15%] h-[10%] rounded-full bg-white/10 blur-[1px] rotate-45"></div>

              {/* Iridescent Color Halo overlaying the transparent body */}
              <div className="absolute inset-4 rounded-full" style={{ background: `conic-gradient(from 0deg, transparent 0%, hsla(${bubble.hue}, 100%, 70%, 0.1) 25%, transparent 50%, hsla(${(bubble.hue + 120) % 360}, 100%, 70%, 0.1) 75%, transparent 100%)`, mixBlendMode: 'screen' }}></div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO: GLOWING ORB BUTTON                                                         */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="bubble-intro"
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-10"
            style={{ background: 'radial-gradient(circle at center, #1a0b2e 0%, #050008 70%)' }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="text-center px-6 relative z-20"
            >
              <Sparkles className="mx-auto text-purple-300 mb-8" size={48} />
              <h2 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] text-white/90 mb-6">
                A DREAMY CELEBRATION
              </h2>
              <p className="text-purple-300/50 font-light max-w-lg mx-auto mb-16 text-sm">
                Step inside the iridescent world of {eventData.brideName} & {eventData.groomName}.
              </p>

              {/* The Main Intro Bubble Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpenInvitation}
                className="relative w-44 h-44 rounded-full flex items-center justify-center transition-all duration-500 group cursor-pointer"
                style={{ 
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(168, 85, 247, 0.1) 40%, transparent 70%)',
                  boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <div className="absolute inset-0 rounded-full border border-white/10" style={{ boxShadow: 'inset 3px 3px 15px rgba(255,255,255,0.1), inset -3px -3px 15px rgba(0,0,0,0.5)' }}></div>
                <div className="absolute top-[20%] left-[25%] w-[30%] h-[20%] rounded-full bg-white/30 blur-sm transform -rotate-12"></div>
                
                <div className="text-center z-10">
                  <p className="text-lg font-light tracking-widest text-purple-100">ENTER</p>
                </div>
              </motion.button>
            </motion.div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION                                                                 */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 bg-transparent"
          >
            
            {/* HERO */}
            <section className="min-h-screen flex items-center justify-center relative">
              <div className="text-center px-6 relative z-20">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <div className="flex items-center justify-center gap-4 mb-12 text-purple-400/40">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-500/30"></div>
                    <p className="uppercase tracking-[0.6em] text-[10px] font-medium">You Are Invited</p>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500/30"></div>
                  </div>

                  <h1 className="text-7xl md:text-9xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300/50 pb-2">
                    {eventData.brideName}
                  </h1>
                  
                  <div className="my-10 text-purple-300 text-4xl font-extralight">&</div>
                  
                  <h1 className="text-7xl md:text-9xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300/50 pb-2">
                    {eventData.groomName}
                  </h1>

                  <div className="mt-16 inline-flex items-center gap-4 px-8 py-4 rounded-full border border-purple-500/20 bg-purple-900/10 backdrop-blur-md">
                    <CalendarDays size={18} className="text-purple-300" />
                    <p className="text-xl font-light tracking-widest text-white/80">{eventData.date}</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* CONTENT WRAPPER - Glassmorphism Cards to blend with bubbles */}
            <div className="relative z-20 max-w-6xl mx-auto px-6">

              {/* COUPLE SECTION */}
              {eventData.showCoupleInfo && (
                <section className="py-32">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-6 font-medium">The Couple</p>
                  <h2 className="text-4xl font-extralight text-center mb-20 text-white/90 tracking-wide">Meet Them</h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    {[
                      { name: eventData.brideName, role: "Bride", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" },
                      { name: eventData.groomName, role: "Groom", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
                    ].map((person, index) => (
                      <motion.div key={index} whileHover={{ y: -10 }} className="group rounded-3xl p-1 transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))' }}>
                        <div className="relative bg-[#0f0520]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center overflow-hidden">
                          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors"></div>
                          <div className="h-64 overflow-hidden rounded-2xl mb-6 shadow-2xl border border-white/5">
                            <img src={person.img} alt={person.role} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100" />
                          </div>
                          <h3 className="text-3xl font-extralight tracking-wider text-white mb-2 relative z-10">{person.name}</h3>
                          <p className="text-purple-300/50 text-xs tracking-[0.3em] uppercase font-medium relative z-10">{person.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* EVENT DETAILS */}
              <section className="py-32">
                <p className="text-center uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-6 font-medium">Details</p>
                <h2 className="text-4xl font-extralight text-center mb-20 text-white/90 tracking-wide">Time & Place</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                  {[
                    { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date },
                    { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time },
                    { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue },
                  ].map((item, index) => (
                    <motion.div key={index} whileHover={{ y: -5, scale: 1.02 }} className="rounded-2xl border border-white/10 bg-[#0f0520]/60 backdrop-blur-xl p-8 hover:bg-[#1a0b2e]/80 transition-all duration-300">
                      <div className="text-purple-400 mb-6">{item.icon}</div>
                      <h3 className="font-medium text-xl tracking-wider text-white/90 mb-2">{item.title}</h3>
                      <p className="text-purple-200/40 font-light">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* COUNTDOWN */}
              {eventData.enableCountdown && (
                <section className="py-32">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-6 font-medium">Countdown</p>
                  <h2 className="text-4xl font-extralight text-center mb-20 text-white/90 tracking-wide">Floating Towards The Day</h2>
                  <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
                    {[
                      { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                      { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                      { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                      { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                    ].map((item) => (
                      <div key={item.label} className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-white/10 bg-[#0f0520]/80 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <h3 className="text-4xl md:text-5xl font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200/70">
                          {item.value}
                        </h3>
                        <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-purple-400/40">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* LOVE STORY */}
              {eventData.showStory && eventData.loveStory?.length > 0 && (
                <section className="py-32">
                  <div className="text-center mb-24">
                    <Heart className="mx-auto text-pink-400/60 mb-6" size={32} fill="currentColor" />
                    <p className="uppercase tracking-[0.4em] text-[10px] text-purple-400/50 font-medium">Our Story</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventData.loveStory.map((story, index) => (
                      <motion.div key={index} whileHover={{ y: -10 }} className="group rounded-2xl overflow-hidden border border-white/5 bg-[#0f0520]/60 backdrop-blur-md hover:border-purple-500/20 transition-all duration-500">
                        <div className="h-56 overflow-hidden relative">
                          <img src={story.image || "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050008] to-transparent"></div>
                        </div>
                        <div className="p-8 relative -mt-10 z-10">
                          <p className="text-purple-400/80 text-xs uppercase tracking-widest mb-2 font-medium">{story.subtitle}</p>
                          <h3 className="text-2xl font-light mb-4 text-white/90 tracking-wide">{story.title}</h3>
                          <p className="text-purple-200/40 leading-relaxed text-sm font-light">{story.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* SCHEDULE, GALLERY, RSVP, WISHES, LOCATION, FOOTER (Keeping them concise but styled) */}
              
              {eventData.showSchedule && eventData.schedule?.length > 0 && (
                <section className="py-32">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-20 font-medium">Timeline</p>
                  <div className="space-y-6 max-w-5xl mx-auto">
                    {eventData.schedule.map((item, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-white/5 bg-[#0f0520]/60 backdrop-blur-md">
                        <div>
                          <h3 className="text-xl font-light text-white/90 tracking-wide">{item.title}</h3>
                          <p className="text-purple-200/40 text-sm font-light">{item.description}</p>
                        </div>
                        <span className="px-4 py-2 rounded-full border border-purple-400/20 text-purple-300 text-xs tracking-widest font-medium bg-purple-400/5 shrink-0">{item.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {eventData.showGallery && eventData.gallery?.length > 0 && (
                <section className="py-32">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-20 font-medium">Gallery</p>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                    {eventData.gallery.map((image, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.03 }} className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/5 group">
                        <img src={image} alt="" className="w-full h-auto object-cover opacity-70 group-hover:opacity-100 transition-all duration-500" />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {eventData.rsvpEnabled && (
                <section className="py-32 max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <p className="uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-4 font-medium">RSVP</p>
                    <h2 className="text-4xl font-extralight tracking-tight text-white/90">Join The Dream</h2>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-[#0f0520]/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                    <form className="space-y-6">
                      <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-purple-300/30 focus:border-purple-500/50 transition-colors font-light" />
                      <input type="number" placeholder="Number of Guests" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-purple-300/30 focus:border-purple-500/50 transition-colors font-light" />
                      <textarea rows={4} placeholder="Leave a message..." className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-purple-300/30 focus:border-purple-500/50 transition-colors font-light resize-none" />
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="py-4 rounded-xl border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition font-medium tracking-wider text-sm">Accept</button>
                        <button type="button" className="py-4 rounded-xl border border-white/10 text-purple-300/50 hover:bg-white/5 transition font-medium tracking-wider text-sm">Decline</button>
                      </div>
                      <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                        Send RSVP
                      </button>
                    </form>
                  </div>
                </section>
              )}

              {eventData.enableGreetings && eventData.wishes?.length > 0 && (
                <section className="py-32">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-20 font-medium">Wishes</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventData.wishes.map((wish, index) => (
                      <motion.div key={index} whileHover={{ y: -8 }} className="p-6 rounded-2xl border border-white/5 bg-[#0f0520]/60 backdrop-blur-md hover:border-purple-500/20 transition-all duration-300">
                        <p className="text-purple-200/50 leading-relaxed mb-6 text-sm font-light italic">&ldquo;{wish.message}&rdquo;</p>
                        <div className="font-medium text-purple-300 text-sm tracking-wide">— {wish.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {eventData.showVenue && (
                <section className="py-32">
                  <p className="text-center uppercase tracking-[0.4em] text-[10px] text-purple-400/50 mb-20 font-medium">Location</p>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="p-10 rounded-3xl border border-white/10 bg-[#0f0520]/80 backdrop-blur-xl flex flex-col justify-center">
                      <h3 className="text-3xl font-extralight mb-6 tracking-wider text-white/90">{eventData.venue}</h3>
                      <p className="text-purple-200/50 leading-relaxed mb-8 font-light text-sm">{eventData.address}</p>
                      {eventData.mapLink && (
                        <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all duration-500 tracking-[0.15em] uppercase text-xs font-medium w-fit">
                          <MapPin size={14} /> Get Directions
                        </a>
                      )}
                    </div>
                    <div className="rounded-3xl overflow-hidden border border-white/10 min-h-[450px] shadow-2xl">
                      {eventData.mapLink ? (
                        <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                      ) : (
                        <div className="h-full w-full bg-[#0f0520] flex items-center justify-center"><p className="text-purple-300/30 font-light text-sm">Map Offline</p></div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* FOOTER */}
              <footer className="py-40 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="w-px h-24 mx-auto mb-12 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
                  <p className="uppercase tracking-[0.4em] text-xs text-purple-400/30 mb-8 font-medium">With Love</p>
                  <h2 className="text-5xl md:text-7xl font-extralight mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                    {eventData.brideName} <span className="text-purple-400/40 mx-2">&</span> {eventData.groomName}
                  </h2>
                  <p className="text-purple-900/40 text-xs tracking-widest uppercase mt-16">
                    Crafted in a dream using Ente Invite
                  </p>
                </div>
              </footer>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS FOR MULTI-DIRECTIONAL CONTINUOUS BUBBLES */}
      <style jsx global>{`
        @keyframes float-up {
          0% { transform: translateY(0) translateX(0) scale(0.5); opacity: 0; }
          10% { opacity: 0.6; transform: scale(1); }
          90% { opacity: 0.6; }
          100% { transform: translateY(-120vh) translateX(40px) scale(1.2); opacity: 0; }
        }
        @keyframes float-right {
          0% { transform: translateX(0) translateY(0) scale(0.5); opacity: 0; }
          10% { opacity: 0.6; transform: scale(1); }
          90% { opacity: 0.6; }
          100% { transform: translateX(120vw) translateY(-60px) scale(1.2); opacity: 0; }
        }
        @keyframes float-left {
          0% { transform: translateX(0) translateY(0) scale(0.5); opacity: 0; }
          10% { opacity: 0.6; transform: scale(1); }
          90% { opacity: 0.6; }
          100% { transform: translateX(-120vw) translateY(-60px) scale(1.2); opacity: 0; }
        }
        @keyframes float-down {
          0% { transform: translateY(0) translateX(0) scale(0.5); opacity: 0; }
          10% { opacity: 0.6; transform: scale(1); }
          90% { opacity: 0.6; }
          100% { transform: translateY(120vh) translateX(-40px) scale(1.2); opacity: 0; }
        }

        .animate-float-bubble {
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
      `}</style>

    </main>
  );
}