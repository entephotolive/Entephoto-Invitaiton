"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Gem,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function MidnightinParis({
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
      className="bg-[#0b0c10] text-[#e2d9ca] overflow-x-hidden" 
      style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
    >
      {/* FIXED ART DECO GEOMETRIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0b0c10] via-[#141926] to-[#0b0c10]"></div>
        {/* Diagonal Gold Lines */}
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-[#c5a059]/5 rotate-[35deg]"></div>
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-[#c5a059]/5 rotate-[125deg]"></div>
        {/* Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-[#c5a059]/10 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border border-[#c5a059]/10 rounded-full"></div>
        {/* Eiffel Tower Silhouette Watermark */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#c5a059]/5 text-[400px] leading-none font-serif select-none" style={{ textShadow: '0 0 50px rgba(197,160,89,0.1)' }}>
          ⦰
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO: THE ANTIQUE GOLDEN TICKET                                                */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="paris-intro"
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
          >
            <div className="relative z-10 text-center px-6 max-w-2xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Gem className="mx-auto text-[#c5a059] mb-10 opacity-60" size={48} />
                <h2 className="text-4xl md:text-6xl font-bold tracking-wide text-[#e2d9ca] mb-6 leading-tight">
                  Une Fête à Paris
                </h2>
                <p className="text-[#8a7e6b] text-sm tracking-widest uppercase mb-16 font-sans">
                  You are cordially invited to a private affair
                </p>

                {/* The Ticket */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(197,160,89,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpenInvitation}
                  className="relative w-full max-w-sm mx-auto block overflow-hidden rounded-sm border-2 border-[#c5a059]/30 shadow-2xl"
                  style={{ background: "linear-gradient(145deg, #1a1d26, #0b0c10)" }}
                >
                  {/* Gold Border Cutouts */}
                  <div className="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-r-2 border-b-2 border-[#c5a059]/30 bg-[#0b0c10]"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 -mr-4 -mt-4 rounded-full border-l-2 border-b-2 border-[#c5a059]/30 bg-[#0b0c10]"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 -ml-4 -mb-4 rounded-full border-r-2 border-t-2 border-[#c5a059]/30 bg-[#0b0c10]"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 -mr-4 -mb-4 rounded-full border-l-2 border-t-2 border-[#c5a059]/30 bg-[#0b0c10]"></div>
                  
                  <div className="p-10">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mb-8"></div>
                    <h3 className="text-3xl font-bold text-[#e2d9ca] tracking-wider mb-2">ADMIT ONE</h3>
                    <p className="text-[#c5a059] text-xs tracking-[0.4em] uppercase mb-6 font-sans">Guest of Honor</p>
                    <p className="text-[#8a7e6b] text-sm font-sans italic">Tap to reveal the details of the evening</p>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mt-8"></div>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION (Cinematic Parisian Theme)                                        */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="paris-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10"
          >
            
            {/* HERO - The Cinema Screen */}
            <section className="min-h-screen flex items-center justify-center relative py-20 px-6">
              <div className="text-center relative">
                {/* Giant Art Deco Frame around Hero */}
                <div className="absolute -inset-16 border border-[#c5a059]/20 pointer-events-none hidden md:block" style={{ clipPath: "polygon(0 0, 5% 0, 10% 5%, 90% 5%, 95% 0, 100% 0, 100% 100%, 95% 100%, 90% 95%, 10% 95%, 5% 100%, 0 100%)" }}></div>
                
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1 }}>
                  <p className="text-[#c5a059] text-xs tracking-[0.6em] uppercase mb-12 font-sans">L'Amour à Paris</p>
                  
                  <h1 className="text-8xl md:text-[10rem] font-bold leading-none text-[#e2d9ca] pb-4" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
                    {eventData.brideName}
                  </h1>
                  
                  <div className="my-12 flex items-center justify-center gap-6">
                    <div className="h-px w-32 bg-gradient-to-r from-transparent to-[#c5a059]/50"></div>
                    <div className="w-3 h-3 border border-[#c5a059] rotate-45"></div>
                    <div className="h-px w-32 bg-gradient-to-l from-transparent to-[#c5a059]/50"></div>
                  </div>
                  
                  <h1 className="text-8xl md:text-[10rem] font-bold leading-none text-[#e2d9ca] pb-4" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
                    {eventData.groomName}
                  </h1>

                  <div className="mt-20 inline-block px-12 py-5 border border-[#c5a059]/30 bg-black/30 backdrop-blur-sm rotate-[-2deg]">
                    <p className="text-3xl font-light tracking-[0.3em] text-[#c5a059] font-sans">{eventData.date}</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* COUPLE - The Tilted Canvas Portraits */}
            {eventData.showCoupleInfo && (
              <section className="py-40 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
                  {/* Left Canvas - Bride */}
                  <motion.div 
                    initial={{ opacity: 0, x: -100 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    className="relative w-full md:w-1/2 group"
                  >
                    <div className="absolute -inset-4 border border-[#c5a059]/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-700" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}></div>
                    <div className="relative bg-[#141926] border border-[#c5a059]/10 p-4 transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}>
                      <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" alt="Bride" className="w-full h-[500px] object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-1000" />
                      <div className="absolute bottom-4 right-4 bg-black/60 px-4 py-2 border-l-2 border-[#c5a059]">
                        <p className="text-[#c5a059] text-xs font-sans uppercase tracking-widest">The Bride</p>
                        <p className="text-[#e2d9ca] text-2xl font-bold mt-1">{eventData.brideName}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Canvas - Groom */}
                  <motion.div 
                    initial={{ opacity: 0, x: 100 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    className="relative w-full md:w-1/2 mt-20 md:mt-0 group"
                  >
                    <div className="absolute -inset-4 border border-[#c5a059]/20 transform rotate-3 group-hover:rotate-0 transition-transform duration-700" style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)" }}></div>
                    <div className="relative bg-[#141926] border border-[#c5a059]/10 p-4 transform rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden" style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)" }}>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" alt="Groom" className="w-full h-[500px] object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-1000" />
                      <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 border-l-2 border-[#c5a059] text-right">
                        <p className="text-[#c5a059] text-xs font-sans uppercase tracking-widest">The Groom</p>
                        <p className="text-[#e2d9ca] text-2xl font-bold mt-1">{eventData.groomName}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {/* DETAILS - Floating Gold Frames */}
            <section className="py-40 px-6">
              <div className="max-w-6xl mx-auto text-center mb-20">
                <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans">The Itinerary</p>
              </div>
              <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
                {[
                  { icon: <CalendarDays size={32} />, title: "Le Jour", desc: eventData.date, rotate: "-rotate-2" },
                  { icon: <Clock3 size={32} />, title: "L'Heure", desc: eventData.time, rotate: "rotate-1" },
                  { icon: <MapPin size={32} />, title: "L'Endroit", desc: eventData.venue, rotate: "-rotate-1.5" },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className={`relative p-10 border border-[#c5a059]/20 bg-[#141926]/80 backdrop-blur-sm transform ${item.rotate} transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,160,89,0.15)]`}
                  >
                    {/* Gold corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c5a059]/50"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c5a059]/50"></div>
                    
                    <div className="text-[#c5a059] mb-8 flex justify-center">{item.icon}</div>
                    <h3 className="text-2xl font-bold tracking-wider text-[#e2d9ca] mb-4 text-center">{item.title}</h3>
                    <p className="text-[#8a7e6b] font-sans text-sm tracking-wide text-center">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* COUNTDOWN - The Clock Face */}
            {eventData.enableCountdown && (
              <section className="py-40 px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto border-2 border-[#c5a059]/30 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.5)] bg-[#0b0c10]">
                    {/* Clock Ticks */}
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="absolute w-1 h-4 bg-[#c5a059]/30" style={{ top: '10%', left: '50%', transformOrigin: '0 140px', transform: `translateX(-50%) rotate(${i * 30}deg)` }}></div>
                    ))}
                    
                    <div className="grid grid-cols-2 gap-8">
                      {[
                        { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                        { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                        { label: "Min", value: String(timeLeft.minutes).padStart(2, "0") },
                        { label: "Sec", value: String(timeLeft.seconds).padStart(2, "0") },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <p className="text-4xl md:text-5xl font-bold text-[#e2d9ca]">{item.value}</p>
                          <p className="text-[8px] tracking-[0.3em] uppercase text-[#c5a059]/60 mt-1 font-sans">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* STORY - The Film Strip */}
            {eventData.showStory && eventData.loveStory?.length > 0 && (
              <section className="py-40 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center mb-20">
                  <Heart className="mx-auto text-[#c5a059] mb-6 opacity-50" size={32} fill="currentColor" />
                  <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans">Notre Histoire</p>
                </div>
                
                <div className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
                  {eventData.loveStory.map((story, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ y: -10 }}
                      className="min-w-[350px] h-[500px] snap-center relative group shrink-0 border border-[#c5a059]/10 bg-[#141926] p-4 transform rotate-1 group-hover:rotate-0 transition-all duration-500"
                    >
                      {/* Sprocket holes */}
                      <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-[#0b0c10] border border-[#c5a059]/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-[#0b0c10]"></div></div>
                      <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#0b0c10] border border-[#c5a059]/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-[#0b0c10]"></div></div>
                      
                      <img src={story.image || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop"} alt={story.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0b0c10] to-transparent">
                        <p className="text-[#c5a059]/80 text-[10px] font-sans uppercase tracking-widest mb-1">{story.subtitle}</p>
                        <h3 className="text-xl font-bold text-[#e2d9ca] tracking-wide">{story.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* SCHEDULE - The Menu Card */}
            {eventData.showSchedule && eventData.schedule?.length > 0 && (
              <section className="py-40 px-6">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-20">
                    <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans">Le Programme</p>
                  </div>
                  
                  <div className="relative border border-[#c5a059]/20 p-12 md:p-16 bg-[#0f1219] shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-px w-32 h-px bg-[#c5a059]/50"></div>
                    
                    <div className="space-y-12 text-center">
                      {eventData.schedule.map((item, index) => (
                        <div key={index} className="relative group">
                          {index !== eventData.schedule.length - 1 && <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-12 bg-[#c5a059]/20"></div>}
                          <h3 className="text-2xl font-light text-[#e2d9ca] tracking-wider group-hover:text-[#c5a059] transition-colors">{item.title}</h3>
                          <p className="text-[#8a7e6b] font-sans text-sm mt-2 italic">{item.description}</p>
                          <div className="mt-4 inline-block px-6 py-2 border border-[#c5a059]/20 text-[#c5a059] text-sm tracking-[0.3em] font-sans uppercase">
                            {item.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* GALLERY - The Dark Room */}
            {eventData.showGallery && eventData.gallery?.length > 0 && (
              <section className="py-40 px-6 bg-black/40">
                <div className="max-w-7xl mx-auto text-center mb-20">
                  <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans">La Galerie</p>
                </div>
                <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8">
                  {eventData.gallery.map((image, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02 }} className="mb-8 break-inside-avoid overflow-hidden group cursor-pointer relative">
                      <img src={image} alt="" className="w-full h-auto object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 border-4 border-[#0b0c10] shadow-2xl" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-20 h-px bg-[#c5a059]"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* RSVP - The Telegram */}
            {eventData.rsvpEnabled && (
              <section className="py-40 px-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-16">
                    <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans">Réponse S'il Vous Plaît</p>
                  </div>
                  
                  <div className="relative bg-[#f4ecd8] text-[#2c2416] p-10 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500" style={{ boxShadow: "10px 10px 30px rgba(0,0,0,0.5)" }}>
                    {/* Paper texture lines */}
                    <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none opacity-30" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 28px, #bfb09a 28px, #bfb09a 29px)", backgroundSize: "100% 29px" }}></div>
                    
                    <div className="relative z-10 space-y-8 font-sans">
                      <div className="text-center border-b-2 border-double border-[#8a7e6b] pb-6 mb-8">
                        <p className="text-xs tracking-widest uppercase text-[#8a7e6b]">Kindly Reply</p>
                      </div>
                      
                      <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-[#8a7e6b] focus:border-[#c5a059] outline-none py-3 text-[#2c2416] placeholder:text-[#8a7e6b] transition-colors tracking-wide" />
                      <input type="number" placeholder="Guests" className="w-full bg-transparent border-b border-[#8a7e6b] focus:border-[#c5a059] outline-none py-3 text-[#2c2416] placeholder:text-[#8a7e6b] transition-colors tracking-wide" />
                      <textarea rows={4} placeholder="Your message..." className="w-full bg-transparent border-b border-[#8a7e6b] focus:border-[#c5a059] outline-none py-3 text-[#2c2416] placeholder:text-[#8a7e6b] transition-colors tracking-wide resize-none" />
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <button type="button" className="py-3 border-2 border-[#2c2416] text-[#2c2416] hover:bg-[#2c2416] hover:text-[#f4ecd8] transition font-bold tracking-widest text-xs uppercase">
                          Joyfully
                        </button>
                        <button type="button" className="py-3 border border-[#8a7e6b] text-[#8a7e6b] hover:bg-[#8a7e6b] hover:text-white transition font-bold tracking-widest text-xs uppercase">
                          Regrets
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* WISHES - The Ledger */}
            {eventData.enableGreetings && eventData.wishes?.length > 0 && (
              <section className="py-40 px-6 bg-black/40">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-20">
                    <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans">Les Voeux</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {eventData.wishes.map((wish, index) => (
                      <motion.div key={index} whileHover={{ x: 10 }} className="p-8 border-l-2 border-[#c5a059]/30 bg-[#141926]/50 backdrop-blur-sm group hover:bg-[#141926]/80 transition-all duration-300">
                        <p className="text-[#8a7e6b] leading-relaxed mb-6 text-sm font-sans italic">&ldquo;{wish.message}&rdquo;</p>
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-8 h-px bg-[#c5a059]/50"></div>
                          <span className="text-[#c5a059] text-sm font-sans tracking-wide">{wish.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LOCATION - The Blueprint */}
            {eventData.showVenue && (
              <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                  <div className="flex flex-col justify-center">
                    <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans mb-6">L'Adresse</p>
                    <h3 className="text-5xl font-bold text-[#e2d9ca] mb-8 tracking-wide leading-tight">{eventData.venue}</h3>
                    <p className="text-[#8a7e6b] leading-relaxed mb-10 font-sans text-sm">{eventData.address}</p>
                    {eventData.mapLink && (
                      <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0b0c10] transition-all duration-500 tracking-[0.2em] uppercase text-xs font-sans w-fit">
                        <MapPin size={14} />
                        Find Us
                      </a>
                    )}
                  </div>
                  <div className="relative h-[500px] border border-[#c5a059]/10 overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    {eventData.mapLink ? (
                      <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-1000" loading="lazy" />
                    ) : (
                      <div className="h-full w-full bg-[#141926] flex items-center justify-center"><p className="text-[#8a7e6b] font-sans text-sm">Map Offline</p></div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* FOOTER - The Marquee */}
            <footer className="py-40 px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0"></div>
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="w-40 h-px mx-auto mb-16 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"></div>
                
                <p className="text-[#c5a059] text-xs tracking-[0.5em] uppercase font-sans mb-12">Fin</p>
                
                <h2 className="text-6xl md:text-8xl font-bold text-[#e2d9ca] leading-none mb-8" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
                  {eventData.brideName}
                </h2>
                
                <div className="my-10 flex justify-center">
                  <div className="w-4 h-4 border border-[#c5a059] rotate-45"></div>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-bold text-[#e2d9ca] leading-none" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
                  {eventData.groomName}
                </h2>

                <p className="mt-24 text-[#2a2520] text-xs tracking-[0.3em] uppercase font-sans">
                  Conçu avec l'amour à Paris par Ente Invite
                </p>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}