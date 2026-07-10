"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  PenLine,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function VintageStationery({
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

  // Reusable CSS Styles for Papers
  const paper = {
    full: {
      background: "linear-gradient(135deg, #fdfbf7 0%, #f4e4bc 100%)",
      color: "#3e2c1c",
      boxShadow: "4px 4px 15px rgba(0,0,0,0.2), inset 0 0 60px rgba(139, 119, 83, 0.1)",
      border: "1px solid #e0d2b8",
    },
    scrap: {
      background: "#fff9f0",
      color: "#4a3728",
      boxShadow: "2px 3px 8px rgba(0,0,0,0.15)",
      border: "none",
    }
  };

  return (
    <main 
      className="bg-[#6b5a4e] text-[#3e2c1c] overflow-x-hidden" 
      style={{ fontFamily: "'Caveat', 'Segoe Script', 'Georgia', cursive" }}
    >
      {/* Corkboard / Desk Background Texture */}
      <div className="fixed inset-0 z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596570665524-d0741d8b2fc1?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="fixed inset-0 z-0 bg-stone-800/80 mix-blend-multiply"></div>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO: SEALED MANILA ENVELOPE                                                      */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="envelope-intro"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
          >
            <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
                <PenLine className="mx-auto text-amber-200/60 mb-6" size={48} />
                <h2 className="text-3xl font-bold tracking-wide text-amber-100">A Letter For You</h2>
              </motion.div>

              {/* The Manila Envelope */}
              <div className="relative w-[420px] h-[280px] cursor-pointer group" onClick={handleOpenInvitation}>
                
                {/* Envelope Back */}
                <div className="absolute inset-0 rounded-md shadow-2xl z-0 overflow-hidden" style={{ background: "linear-gradient(135deg, #c4a265 0%, #a67c52 100%)", border: '1px solid #8b6f47' }}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover' }}></div>
                </div>

                {/* Letter Sliding Out */}
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={isOpening ? { y: -160, opacity: 1 } : { y: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-6 left-6 right-6 bottom-6 z-10 rounded-sm shadow-inner p-6 flex flex-col items-center justify-center origin-bottom"
                  style={{ background: "linear-gradient(to bottom, #fdfbf7, #f3e8d0)", border: '1px solid #e0d2b8' }}
                >
                  <p className="text-stone-800 font-bold text-xl text-center tracking-wide">{eventData.brideName} & {eventData.groomName}</p>
                  <p className="text-stone-500 text-xs mt-2 text-center font-sans">Request the honor of your presence...</p>
                </motion.div>

                {/* Envelope Front Flap */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isOpening ? { y: 160 } : { y: 0 }}
                  transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 h-[60%] z-20 rounded-b-md overflow-hidden shadow-lg"
                  style={{ background: "linear-gradient(to top, #a67c52, #c4a265)", borderTop: '1px solid #8b6f47' }}
                />

                {/* Red Wax Seal */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 rounded-full shadow-2xl flex items-center justify-center transition-shadow group-hover:shadow-red-900/50"
                  style={{ background: 'radial-gradient(circle at 30% 30%, #dc2626, #7f1d1d)', border: '3px solid #450a0a' }}
                >
                  <span className="text-red-100 font-bold text-[10px] tracking-widest uppercase font-sans">OPEN</span>
                </motion.div>

                {!isOpening && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }} className="absolute -bottom-12 left-0 right-0 text-center text-amber-200/50 text-xs tracking-widest uppercase font-sans">
                    Tap the seal to open
                  </motion.p>
                )}
              </div>
            </div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION (Paper Stationery Theme)                                           */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="relative z-10"
          >
            
            {/* HERO - Main A4 Page */}
            <section className="min-h-screen flex items-center justify-center py-16 px-4">
              <motion.div 
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full max-w-2xl h-auto min-h-[600px] p-12 md:p-16 rounded-sm"
                style={{ ...paper.full, transform: "rotate(-1deg)" }}
              >
                {/* Paper Tape at top */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 rounded-sm shadow-md -rotate-1 z-20" style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(2px)", border: '1px solid rgba(255,255,255,0.2)' }}></div>
                
                {/* Lined paper effect */}
                <div className="absolute inset-x-12 top-24 bottom-12 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #a8927a 31px, #a8927a 32px)", backgroundSize: "100% 32px" }}></div>

                <div className="relative z-10 text-center pt-8">
                  <p className="uppercase tracking-[0.4em] text-xs mb-12 font-sans" style={{ color: "#8b6f47" }}>Together with their families</p>
                  
                  <h1 className="text-6xl md:text-7xl font-bold leading-tight drop-shadow-sm" style={{ color: paper.full.color }}>
                    {eventData.brideName}
                  </h1>
                  
                  <div className="my-6 flex justify-center">
                    <div className="px-6 py-2 rounded-sm transform -rotate-2 shadow-md" style={{ ...paper.scrap, background: "#fffacd" }}>
                      <p className="text-4xl font-bold" style={{ color: "#b45309" }}>&</p>
                    </div>
                  </div>

                  <h1 className="text-6xl md:text-7xl font-bold leading-tight drop-shadow-sm" style={{ color: paper.full.color }}>
                    {eventData.groomName}
                  </h1>

                  <div className="mt-14 flex items-center justify-center gap-3">
                    <div className="h-px w-16 bg-stone-400"></div>
                    <p className="text-2xl font-semibold tracking-wide">{eventData.date}</p>
                    <div className="h-px w-16 bg-stone-400"></div>
                  </div>

                  <p className="mt-6 text-sm font-sans italic" style={{ color: "#6b5a4e" }}>Request the pleasure of your company</p>
                </div>
              </motion.div>
            </section>

            {/* COUPLE SECTION - Two Torn Scraps */}
            {eventData.showCoupleInfo && (
              <section className="py-24 px-4 flex flex-col items-center">
                <p className="uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-12 font-sans">The Couple</p>
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full">
                  {[
                    { name: eventData.brideName, role: "The Bride", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop", rotate: "rotate(2deg)" },
                    { name: eventData.groomName, role: "The Groom", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", rotate: "rotate(-1.5deg)" }
                  ].map((person, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ scale: 1.03, rotate: 0 }} 
                      className="group overflow-hidden rounded-sm p-6 transition-shadow duration-300 hover:shadow-2xl relative"
                      style={{ ...paper.full, transform: person.rotate, clipPath: "polygon(0 0, 100% 2%, 98% 100%, 2% 98%)" }}
                    >
                      <div className="absolute -top-3 left-8 w-20 h-5 rounded-sm shadow-sm -rotate-2 z-20" style={{ background: "rgba(220, 38, 38, 0.6)", border: '1px solid rgba(220, 38, 38, 0.3)' }}></div>
                      
                      <div className="h-64 overflow-hidden rounded-sm mb-6 shadow-inner relative z-10">
                        <img src={person.img} alt={person.role} className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div className="text-center relative z-10 pt-2">
                        <h3 className="text-3xl font-bold" style={{ color: paper.full.color }}>{person.name}</h3>
                        <div className="inline-block mt-2 px-3 py-1 rounded-sm transform -rotate-1" style={{ ...paper.scrap, background: "#fef3c7", fontSize: '10px', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>
                          {person.role}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* EVENT DETAILS - Small Notepad Pages */}
            <section className="py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <p className="text-center uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-12 font-sans">Event Details</p>
                <div className="grid lg:grid-cols-3 gap-10">
                  {[
                    { icon: <CalendarDays size={24} />, title: "Date", desc: eventData.date, rotate: "rotate(-1.5deg)" },
                    { icon: <Clock3 size={24} />, title: "Time", desc: eventData.time, rotate: "rotate(1deg)" },
                    { icon: <MapPin size={24} />, title: "Venue", desc: eventData.venue, rotate: "rotate(-0.5deg)" },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ scale: 1.05, rotate: 0 }} 
                      className="p-8 rounded-sm shadow-xl transition-shadow duration-300 hover:shadow-2xl relative"
                      style={{ ...paper.scrap, transform: item.rotate, background: "linear-gradient(to bottom, #fff, #fffbeb)" }}
                    >
                      <div className="w-full h-6 mb-4 rounded-t-sm -mt-8 -mx-8 mb-6" style={{ background: "#dc2626" }}></div>
                      
                      <div className="mb-4" style={{ color: "#92400e" }}>{item.icon}</div>
                      <h3 className="font-bold text-xl mb-3 tracking-wide" style={{ color: paper.scrap.color }}>{item.title}</h3>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: "#78716c" }}>{item.desc}</p>
                      
                      <div className="absolute -top-2 right-6 w-6 h-6 rounded-full shadow-md z-20" style={{ background: 'radial-gradient(circle at 30% 30%, #fca5a5, #dc2626)', border: '1px solid #7f1d1d' }}></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* COUNTDOWN - Sticky Notes Grid */}
            {eventData.enableCountdown && (
              <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                  <p className="text-center uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-12 font-sans">Countdown</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: "Days", value: String(timeLeft.days).padStart(2, "0"), color: "#fef08a", rotate: "rotate(-2deg)" },
                      { label: "Hours", value: String(timeLeft.hours).padStart(2, "0"), color: "#bbf7d0", rotate: "rotate(1.5deg)" },
                      { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0"), color: "#bfdbfe", rotate: "rotate(-1deg)" },
                      { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0"), color: "#fecdd3", rotate: "rotate(2deg)" },
                    ].map((item) => (
                      <motion.div 
                        key={item.label} 
                        whileHover={{ scale: 1.1, rotate: 0 }} 
                        className="p-8 text-center shadow-xl relative"
                        style={{ 
                          background: item.color, 
                          color: "#1c1917", 
                          transform: item.rotate,
                          boxShadow: "2px 4px 10px rgba(0,0,0,0.2), inset 0 -2px 5px rgba(0,0,0,0.05)"
                        }}
                      >
                        <h3 className="text-5xl font-bold drop-shadow-sm">{item.value}</h3>
                        <p className="mt-3 uppercase tracking-[0.2em] text-xs font-sans opacity-70">{item.label}</p>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm shadow-sm -rotate-1 z-20" style={{ background: "rgba(255,255,255,0.5)", border: '1px solid rgba(255,255,255,0.2)' }}></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOVE STORY - Journal Pages */}
            {eventData.showStory && eventData.loveStory?.length > 0 && (
              <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <Heart className="mx-auto mb-4" size={32} style={{ color: "#be123c" }} fill="currentColor" />
                    <p className="uppercase tracking-[0.3em] text-amber-200/60 text-xs font-sans">Our Story</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {eventData.loveStory.map((story, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ y: -10 }} 
                        className="overflow-hidden rounded-sm shadow-xl group relative"
                        style={{ 
                          ...paper.full, 
                          transform: `${Math.random() > 0.5 ? '' : '-'}rotate(${Math.random() * 3}deg)` 
                        }}
                      >
                        {/* Washi tape side */}
                        <div className="absolute top-4 -left-3 w-6 h-16 rounded-sm shadow-sm z-20" style={{ background: "rgba(147, 51, 234, 0.6)", border: '1px solid rgba(147, 51, 234, 0.3)' }}></div>
                        
                        <div className="h-56 overflow-hidden">
                          <img src={story.image || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-8">
                          <p className="text-xs uppercase tracking-widest mb-2 font-sans" style={{ color: "#8b6f47" }}>{story.subtitle}</p>
                          <h3 className="text-2xl font-bold mb-4" style={{ color: paper.full.color }}>{story.title}</h3>
                          <p className="leading-relaxed text-sm font-sans" style={{ color: "#78716c" }}>{story.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SCHEDULE - Torn Paper List */}
            {eventData.showSchedule && eventData.schedule?.length > 0 && (
              <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                  <p className="text-center uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-12 font-sans">Timeline</p>
                  <div className="space-y-8">
                    {eventData.schedule.map((item, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -30 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }} 
                        className="rounded-sm p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative"
                        style={{ 
                          ...paper.scrap, 
                          background: "#fffdf5",
                          transform: `${index % 2 === 0 ? '' : '-'}rotate(${Math.random() * 2}deg)`,
                          clipPath: "polygon(0 0, 100% 1%, 99% 99%, 1% 100%)"
                        }}
                      >
                        <div>
                          <h3 className="text-2xl font-bold mb-2" style={{ color: paper.scrap.color }}>{item.title}</h3>
                          <p className="text-sm font-sans" style={{ color: "#78716c" }}>{item.description}</p>
                        </div>
                        {/* Time written on a tiny scrap */}
                        <div className="px-4 py-2 rounded-sm shadow-md transform rotate-2 self-start md:self-center" style={{ ...paper.scrap, background: "#fef3c7", fontSize: '12px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                          {item.time}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* GALLERY - Scattered Polaroids */}
            {eventData.showGallery && eventData.gallery?.length > 0 && (
              <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-12 font-sans">Gallery</p>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                    {eventData.gallery.map((image, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.05, rotate: 0 }} 
                        className="mb-8 break-inside-avoid p-2 shadow-2xl relative"
                        style={{ 
                          ...paper.scrap, 
                          background: "white", 
                          transform: `${Math.random() > 0.5 ? '' : '-'}rotate(${Math.random() * 6}deg)` 
                        }}
                      >
                        <img src={image} alt="" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        {/* Pushpin */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full shadow-md z-20" style={{ background: 'radial-gradient(circle at 30% 30%, #93c5fd, #3b82f6)', border: '1px solid #1e40af' }}></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* RSVP - A Blank Form Paper */}
            {eventData.rsvpEnabled && (
              <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <p className="uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-4 font-sans">RSVP</p>
                    <h2 className="text-4xl font-bold tracking-tight text-amber-100">Will You Attend?</h2>
                  </div>
                  <div className="rounded-sm p-8 md:p-12 shadow-2xl relative" style={{ ...paper.full, transform: "rotate(0.5deg)" }}>
                    {/* Top spiral binding effect */}
                    <div className="absolute -top-3 left-0 right-0 flex justify-evenly px-8">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full shadow-md" style={{ background: 'linear-gradient(135deg, #d1d5db, #9ca3af)', border: '1px solid #6b7280' }}></div>
                      ))}
                    </div>

                    <form className="relative z-10 space-y-6 pt-4">
                      <div>
                        <label className="block text-xs font-sans mb-2 uppercase tracking-widest opacity-60">Your Name</label>
                        <input type="text" className="w-full p-3 border-b-2 border-dashed outline-none bg-transparent font-sans" style={{ borderColor: "#a8927a", color: paper.full.color }} />
                      </div>
                      <div>
                        <label className="block text-xs font-sans mb-2 uppercase tracking-widest opacity-60">Number of Guests</label>
                        <input type="number" className="w-full p-3 border-b-2 border-dashed outline-none bg-transparent font-sans" style={{ borderColor: "#a8927a", color: paper.full.color }} />
                      </div>
                      <div>
                        <label className="block text-xs font-sans mb-2 uppercase tracking-widest opacity-60">Leave a message...</label>
                        <textarea rows={4} className="w-full p-3 border-b-2 border-dashed outline-none bg-transparent font-sans resize-none" style={{ borderColor: "#a8927a", color: paper.full.color }} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <button type="button" className="py-3 rounded-sm font-bold tracking-wide text-sm font-sans transition-shadow hover:shadow-lg" style={{ background: "#dc2626", color: "white" }}>
                          Joyfully Accept
                        </button>
                        <button type="button" className="py-3 rounded-sm font-bold tracking-wide text-sm font-sans border transition-shadow hover:shadow-lg" style={{ borderColor: "#8b6f47", color: "#8b6f47" }}>
                          Respectfully Decline
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* WISHES WALL - Stacked Note Cards */}
            {eventData.enableGreetings && eventData.wishes?.length > 0 && (
              <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-12 font-sans">Wishes</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventData.wishes.map((wish, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ y: -8 }} 
                        className="rounded-sm p-6 shadow-xl relative transition-shadow hover:shadow-2xl"
                        style={{ 
                          ...paper.scrap, 
                          background: "linear-gradient(to bottom, #fff, #fff8f0)", 
                          transform: `${Math.random() > 0.5 ? '' : '-'}rotate(${Math.random() * 4}deg)` 
                        }}
                      >
                        <div className="absolute -top-2 right-4 w-4 h-4 rounded-full shadow-sm z-20" style={{ background: 'radial-gradient(circle at 30% 30%, #fca5a5, #dc2626)', border: '1px solid #7f1d1d' }}></div>
                        <p className="leading-relaxed mb-6 text-sm font-sans italic" style={{ color: "#78716c" }}>&ldquo;{wish.message}&rdquo;</p>
                        <div className="font-bold text-sm tracking-wide" style={{ color: "#92400e" }}>— {wish.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOCATION - Map pinned to desk */}
            {eventData.showVenue && (
              <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                  <p className="text-center uppercase tracking-[0.3em] text-amber-200/60 text-xs mb-12 font-sans">Venue</p>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="rounded-sm p-10 shadow-2xl flex flex-col justify-center relative" style={{ ...paper.full, transform: "rotate(-1deg)" }}>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 rounded-sm shadow-md rotate-1 z-20" style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(2px)", border: '1px solid rgba(255,255,255,0.2)' }}></div>
                      
                      <h3 className="text-3xl font-bold mb-6 tracking-wide" style={{ color: paper.full.color }}>{eventData.venue}</h3>
                      <p className="leading-relaxed mb-8 font-sans text-sm" style={{ color: "#6b5a4e" }}>{eventData.address}</p>
                      {eventData.mapLink && (
                        <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-3 rounded-sm tracking-[0.15em] uppercase text-xs font-bold w-fit transition-shadow hover:shadow-lg font-sans" style={{ background: "#1c1917", color: "#fbbf24" }}>
                          Get Directions
                        </a>
                      )}
                    </div>
                    <div className="rounded-sm overflow-hidden min-h-[450px] shadow-2xl relative" style={{ transform: "rotate(1.5deg)" }}>
                      {/* Map Tape */}
                      <div className="absolute top-0 left-0 w-full h-6 z-20 flex justify-between px-6 -mt-1">
                        <div className="w-16 h-5 rounded-sm shadow-sm -rotate-2" style={{ background: "rgba(255,255,255,0.5)", border: '1px solid rgba(255,255,255,0.2)' }}></div>
                        <div className="w-16 h-5 rounded-sm shadow-sm rotate-1" style={{ background: "rgba(255,255,255,0.5)", border: '1px solid rgba(255,255,255,0.2)' }}></div>
                      </div>
                      {eventData.mapLink ? (
                        <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale contrast-110 hover:grayscale-0 hover:contrast-100 transition-all duration-700" loading="lazy" />
                      ) : (
                        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop" alt="Venue" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FOOTER - Final Small Scrap */}
            <footer className="py-32 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block p-10 rounded-sm shadow-2xl relative" style={{ ...paper.scrap, background: "linear-gradient(135deg, #fdfbf7 0%, #f4e4bc 100%)", transform: "rotate(-1deg)" }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-sm shadow-sm -rotate-1 z-20" style={{ background: "rgba(255,255,255,0.5)", border: '1px solid rgba(255,255,255,0.2)' }}></div>
                  
                  <p className="uppercase tracking-[0.3em] text-xs mb-6 font-sans" style={{ color: "#8b6f47" }}>With Love</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: paper.scrap.color }}>
                    {eventData.brideName} <span className="mx-2" style={{ color: "#92400e" }}>&</span> {eventData.groomName}
                  </h2>
                  <p className="mt-8 text-xs tracking-widest uppercase font-sans" style={{ color: "#a8927a" }}>Crafted with vintage love using Ente Invite</p>
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}