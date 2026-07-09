"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  TreePine,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function MasterCraftsmanWood({
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

  // Precise Wood Color Palette for perfect sinking/blending
  const wood = {
    base: "#2a1f14",       // Deep walnut base
    grain: "#3b2a1a",      // Lighter wood grain highlight
    card: "rgba(42, 31, 20, 0.6)", // Cards sink into background
    border: "rgba(80, 60, 40, 0.4)", // Borders mimic wood seams
    text: "#e8d5b7",       // Parchment text
    textMuted: "#a08c70",  // Faded ink text
    accent: "#c8a97e",     // Polished brass/amber accent
    shadow: "rgba(0, 0, 0, 0.4)", // Deep wood grain shadows
  };

  return (
    <main 
      className="overflow-x-hidden text-amber-100" 
      style={{ 
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: wood.base,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
      }}
    >
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO: PROFESSIONAL MAHOGANY WOODEN BOX                                           */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="wood-intro"
            exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#1a1209" }}
          >
            {/* Realistic Wood Panel Background */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, #1a1209 90%)' }} />

            <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
                <div className="w-12 h-px mx-auto mb-8" style={{ backgroundColor: wood.accent }}></div>
                <h2 className="text-2xl font-light tracking-widest" style={{ color: wood.text }}>
                  An Invitation Crafted For You
                </h2>
              </motion.div>

              {/* The Wooden Box */}
              <div className="relative w-[400px] h-[260px] cursor-pointer group" onClick={handleOpenInvitation}>
                
                {/* Box Base */}
                <div className="absolute inset-0 rounded-sm shadow-2xl z-0 overflow-hidden" style={{ border: `1px solid ${wood.border}` }}>
                  <div className="w-full h-full" style={{ backgroundColor: wood.grain }}></div>
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]"></div>
                </div>

                {/* Letter Sliding Out */}
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={isOpening ? { y: -160, opacity: 1 } : { y: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-6 left-6 right-6 bottom-6 z-10 rounded-sm shadow-2xl p-8 flex flex-col items-center justify-center origin-bottom"
                  style={{ backgroundColor: "#f4ecd8", border: `1px solid #d6cbb8` }}
                >
                  <div className="w-10 h-px mb-4" style={{ backgroundColor: "#b8a88a" }}></div>
                  <p className="text-stone-800 font-serif font-bold text-lg text-center tracking-wide">{eventData.brideName} & {eventData.groomName}</p>
                  <p className="text-stone-500 text-xs mt-2 text-center font-light">Request the honor of your presence...</p>
                </motion.div>

                {/* Box Lid (Slides Up) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isOpening ? { y: -300, opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeIn", delay: 0.1 }}
                  className="absolute top-0 left-0 right-0 h-[40%] z-20 rounded-t-sm overflow-hidden"
                  style={{ border: `1px solid ${wood.border}`, borderBottom: 'none' }}
                >
                  <div className="w-full h-full" style={{ backgroundColor: wood.grain }}></div>
                  <div className="absolute inset-0 shadow-[inset_0_-20px_30px_rgba(0,0,0,0.4)]"></div>
                  {/* Lid Interior Shadow */}
                  <div className="absolute bottom-0 left-0 right-0 h-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                </motion.div>

                {/* Professional Brass Hardware */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(200,169,126,0.3)]"
                  style={{ background: 'linear-gradient(145deg, #d4af37, #8a6e2f)', border: '2px solid #5c4a1e', boxShadow: '0 4px 10px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.2)' }}
                >
                  <TreePine className="text-amber-100/80" size={28} />
                </div>

                {/* Corner Rivets */}
                {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full z-30`} style={{ background: 'linear-gradient(145deg, #b8a070, #6b5a3e)', border: '1px solid #4a3a22', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
                ))}

                {!isOpening && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 2 }} className="absolute -bottom-14 left-0 right-0 text-center text-xs tracking-[0.3em] uppercase" style={{ color: `${wood.accent}80` }}>
                    Tap the emblem to open
                  </motion.p>
                )}
              </div>
            </div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION (Perfect Wood Sink Theme)                                          */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
          >
            
            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1516482362041-8b87b69ed28d?q=80&w=2000&auto=format&fit=crop" alt="Forest Path" className="w-full h-full object-cover scale-110" />
                <div className="absolute inset-0" style={{ backgroundColor: `${wood.base}CC`, backdropFilter: 'blur(2px)' }}></div>
              </div>
              
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="relative z-10 text-center px-6">
                <p className="uppercase tracking-[0.6em] text-xs mb-12" style={{ color: `${wood.accent}90` }}>Together with their families</p>
                <h1 className="text-6xl md:text-8xl font-light tracking-tight drop-shadow-lg" style={{ color: wood.text }}>{eventData.brideName}</h1>
                <div className="my-8 flex justify-center items-center gap-6">
                  <div className="h-px w-24" style={{ backgroundColor: `${wood.accent}40` }}></div>
                  <p className="text-4xl font-light" style={{ color: wood.accent }}>&</p>
                  <div className="h-px w-24" style={{ backgroundColor: `${wood.accent}40` }}></div>
                </div>
                <h1 className="text-6xl md:text-8xl font-light tracking-tight drop-shadow-lg" style={{ color: wood.text }}>{eventData.groomName}</h1>
                <p className="mt-14 text-2xl font-light tracking-wide" style={{ color: `${wood.text}CC` }}>{eventData.date}</p>
                
                <button className="mt-16 px-10 py-4 rounded-sm tracking-[0.25em] uppercase text-xs font-medium transition-all duration-500 hover:shadow-lg"
                  style={{ backgroundColor: `${wood.accent}20`, border: `1px solid ${wood.accent}50`, color: wood.text }}>
                  View Details
                </button>
              </motion.div>
            </section>

            {/* CONTENT WRAPPER - FIXED WOOD TEXTURE TO ENSURE PERFECT SINKING */}
            <div className="relative">
              {/* Fixed Background Layer */}
              <div className="fixed inset-0 z-0 hidden md:block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}></div>
              {/* Mobile Fallback Scrollable Background */}
              <div className="fixed inset-0 z-0 md:hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover' }}></div>
              {/* Dark Wood Overlay to sink components perfectly */}
              <div className="fixed inset-0 z-0" style={{ backgroundColor: `${wood.base}E6` }}></div>
              
              {/* Scrollable Content */}
              <div className="relative z-10">

                {/* COUPLE SECTION */}
                {eventData.showCoupleInfo && (
                  <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                      <p className="text-center uppercase tracking-[0.3em] text-xs mb-16" style={{ color: `${wood.accent}60` }}>The Couple</p>
                      <div className="grid md:grid-cols-2 gap-8">
                        {[
                          { name: eventData.brideName, role: "The Bride", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" },
                          { name: eventData.groomName, role: "The Groom", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
                        ].map((person, index) => (
                          <motion.div key={index} whileHover={{ y: -5 }} className="group overflow-hidden rounded-sm transition-shadow duration-500 hover:shadow-2xl" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                            <div className="h-96 overflow-hidden">
                              <img src={person.img} alt={person.role} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                            </div>
                            <div className="p-8 text-center">
                              <h3 className="text-3xl font-light tracking-wide" style={{ color: wood.text }}>{person.name}</h3>
                              <p className="mt-2 uppercase tracking-[0.2em] text-xs" style={{ color: wood.textMuted }}>{person.role}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* EVENT DETAILS */}
                <section className="py-24 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                  <div className="max-w-6xl mx-auto">
                    <p className="text-center uppercase tracking-[0.3em] text-xs mb-16" style={{ color: `${wood.accent}60` }}>Event Details</p>
                    <div className="grid lg:grid-cols-3 gap-8">
                      {[
                        { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop" },
                        { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time, img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop" },
                        { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue, img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop" },
                      ].map((item, index) => (
                        <div key={index} className="overflow-hidden rounded-sm shadow-xl transition-all duration-500 hover:shadow-2xl group" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                          <div className="h-48 overflow-hidden">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
                          </div>
                          <div className="p-8">
                            <div className="mb-4" style={{ color: wood.accent }}>{item.icon}</div>
                            <h3 className="font-medium text-xl mb-2 tracking-wide" style={{ color: wood.text }}>{item.title}</h3>
                            <p className="font-light" style={{ color: wood.textMuted }}>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* COUNTDOWN */}
                {eventData.enableCountdown && (
                  <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                      <p className="text-center uppercase tracking-[0.3em] text-xs mb-16" style={{ color: `${wood.accent}60` }}>Countdown</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                          { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                          { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                          { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                          { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                        ].map((item) => (
                          <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="rounded-sm p-8 text-center shadow-2xl transition-shadow duration-300 hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                            <h3 className="text-5xl font-light" style={{ color: wood.accent }}>{item.value}</h3>
                            <p className="mt-3 uppercase tracking-[0.2em] text-xs" style={{ color: wood.textMuted }}>{item.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* LOVE STORY */}
                {eventData.showStory && eventData.loveStory?.length > 0 && (
                  <section className="py-24 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-20">
                        <Heart className="mx-auto mb-4" size={32} style={{ color: `${wood.accent}80` }} fill="currentColor" />
                        <p className="uppercase tracking-[0.3em] text-xs" style={{ color: `${wood.accent}60` }}>Our Story</p>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {eventData.loveStory.map((story, index) => (
                          <motion.div key={index} whileHover={{ y: -10 }} className="overflow-hidden rounded-sm shadow-xl group" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                            <div className="h-60 overflow-hidden">
                              <img src={story.image || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" />
                            </div>
                            <div className="p-8">
                              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: wood.textMuted }}>{story.subtitle}</p>
                              <h3 className="text-2xl font-light mb-4" style={{ color: wood.text }}>{story.title}</h3>
                              <p className="leading-relaxed text-sm font-light" style={{ color: `${wood.textMuted}CC` }}>{story.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* SCHEDULE */}
                {eventData.showSchedule && eventData.schedule?.length > 0 && (
                  <section className="py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                      <p className="text-center uppercase tracking-[0.3em] text-xs mb-20" style={{ color: `${wood.accent}60` }}>Timeline</p>
                      <div className="space-y-6">
                        {eventData.schedule.map((item, index) => (
                          <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-sm p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                            <div>
                              <h3 className="text-2xl font-light mb-2" style={{ color: wood.text }}>{item.title}</h3>
                              <p className="text-sm font-light" style={{ color: wood.textMuted }}>{item.description}</p>
                            </div>
                            <span className="inline-flex px-5 py-2 rounded-sm text-sm tracking-wide font-medium whitespace-nowrap" style={{ backgroundColor: `${wood.accent}15`, border: `1px solid ${wood.accent}30`, color: wood.text }}>
                              {item.time}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* GALLERY */}
                {eventData.showGallery && eventData.gallery?.length > 0 && (
                  <section className="py-24 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                    <div className="max-w-7xl mx-auto">
                      <p className="text-center uppercase tracking-[0.3em] text-xs mb-16" style={{ color: `${wood.accent}60` }}>Gallery</p>
                      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                        {eventData.gallery.map((image, index) => (
                          <motion.img key={index} whileHover={{ scale: 1.02 }} src={image} alt="" className="mb-4 rounded-sm w-full shadow-2xl cursor-pointer opacity-90 hover:opacity-100 transition-opacity" style={{ border: `2px solid ${wood.border}` }} />
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* RSVP */}
                {eventData.rsvpEnabled && (
                  <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-16">
                        <p className="uppercase tracking-[0.3em] text-xs mb-4" style={{ color: `${wood.accent}60` }}>RSVP</p>
                        <h2 className="text-4xl font-light tracking-tight" style={{ color: wood.text }}>Will You Attend?</h2>
                      </div>
                      <div className="rounded-sm p-8 md:p-12 shadow-2xl" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                        <form className="space-y-6">
                          <input type="text" placeholder="Your Name" className="w-full p-4 rounded-sm outline-none font-light transition-colors" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${wood.border}`, color: wood.text }} onFocus={e => e.target.style.borderColor = wood.accent} onBlur={e => e.target.style.borderColor = wood.border} />
                          <input type="number" placeholder="Number of Guests" className="w-full p-4 rounded-sm outline-none font-light transition-colors" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${wood.border}`, color: wood.text }} onFocus={e => e.target.style.borderColor = wood.accent} onBlur={e => e.target.style.borderColor = wood.border} />
                          <textarea rows={5} placeholder="Leave a message..." className="w-full p-4 rounded-sm outline-none font-light transition-colors" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${wood.border}`, color: wood.text }} onFocus={e => e.target.style.borderColor = wood.accent} onBlur={e => e.target.style.borderColor = wood.border} />
                          <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="py-4 rounded-sm font-medium tracking-wide text-sm transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: `${wood.accent}30`, border: `1px solid ${wood.accent}50`, color: wood.text }}>
                              Joyfully Accept
                            </button>
                            <button type="button" className="py-4 rounded-sm font-medium tracking-wide text-sm transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: `1px solid ${wood.border}`, color: wood.textMuted }}>
                              Respectfully Decline
                            </button>
                          </div>
                          <button type="submit" className="w-full py-4 rounded-sm font-bold tracking-[0.1em] transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: wood.accent, color: wood.base, boxShadow: `0 4px 15px ${wood.shadow}` }}>
                            Send Reply
                          </button>
                        </form>
                      </div>
                    </div>
                  </section>
                )}

                {/* WISHES WALL */}
                {eventData.enableGreetings && eventData.wishes?.length > 0 && (
                  <section className="py-24 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                    <div className="max-w-7xl mx-auto">
                      <p className="text-center uppercase tracking-[0.3em] text-xs mb-16" style={{ color: `${wood.accent}60` }}>Wishes</p>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventData.wishes.map((wish, index) => (
                          <motion.div key={index} whileHover={{ y: -8 }} className="rounded-sm p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                            <p className="leading-relaxed mb-6 text-sm font-light italic" style={{ color: `${wood.textMuted}CC` }}>&ldquo;{wish.message}&rdquo;</p>
                            <div className="font-medium text-sm tracking-wide" style={{ color: wood.accent }}>— {wish.name}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* LOCATION */}
                {eventData.showVenue && (
                  <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                      <p className="text-center uppercase tracking-[0.3em] text-xs mb-16" style={{ color: `${wood.accent}60` }}>Venue</p>
                      <div className="grid lg:grid-cols-2 gap-10">
                        <div className="rounded-sm p-10 shadow-2xl flex flex-col justify-center" style={{ backgroundColor: wood.card, border: `1px solid ${wood.border}`, backdropFilter: 'blur(4px)' }}>
                          <h3 className="text-3xl font-light mb-6 tracking-wide" style={{ color: wood.text }}>{eventData.venue}</h3>
                          <p className="leading-relaxed mb-8 font-light" style={{ color: wood.textMuted }}>{eventData.address}</p>
                          {eventData.mapLink && (
                            <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-3 rounded-sm tracking-[0.15em] uppercase text-xs font-medium w-fit transition-all duration-500 hover:shadow-lg" style={{ backgroundColor: `${wood.accent}20`, border: `1px solid ${wood.accent}50`, color: wood.text }}>
                              Get Directions
                            </a>
                          )}
                        </div>
                        <div className="rounded-sm overflow-hidden min-h-[450px] shadow-2xl" style={{ border: `1px solid ${wood.border}` }}>
                          {eventData.mapLink ? (
                            <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700" loading="lazy" />
                          ) : (
                            <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop" alt="Venue" className="w-full h-full object-cover" />
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* FOOTER */}
                <footer className="py-32 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderTop: `1px solid ${wood.border}` }}>
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-12 h-px mx-auto mb-10" style={{ backgroundColor: wood.accent }}></div>
                    <p className="uppercase tracking-[0.3em] text-xs mb-6" style={{ color: `${wood.accent}50` }}>With Love</p>
                    <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight" style={{ color: wood.text }}>
                      {eventData.brideName} <span className="mx-3" style={{ color: `${wood.accent}60` }}>&</span> {eventData.groomName}
                    </h2>
                    <p className="mt-16 text-xs tracking-widest uppercase" style={{ color: `${wood.base}80` }}>Crafted with rustic elegance using Ente Invite</p>
                  </div>
                </footer>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}