"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  ArrowDown,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function BotanicalGarden({
  eventData,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Scroll logic for the rings
  const leftRingX = useTransform(scrollYProgress, [0, 1], ["-50vw", "0vw"]);
  const rightRingX = useTransform(scrollYProgress, [0, 1], ["50vw", "0vw"]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, -1080]);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => setShowInvitation(true), 1200);
  };

  return (
    <main 
      ref={containerRef}
      className="bg-[#f9f7f2] text-stone-800 overflow-x-hidden" 
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          /* ----------------------------------------------------------------------------------- */
          /* INTRO: REALISTIC KRAFT ENVELOPE & LETTER                                           */
          /* ----------------------------------------------------------------------------------- */
          <motion.section
            key="real-intro"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex items-center justify-center bg-[#efeae2] overflow-hidden"
          >
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-10 mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523669954722-ec6f1f6aafi4?q=80&w=1500&auto=format&fit=crop')", backgroundSize: 'cover' }} />

            <div className="relative z-10 flex flex-col items-center px-6 text-center">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="uppercase tracking-[0.4em] text-stone-500 text-xs mb-12">
                A Personal Invitation
              </motion.p>

              <div className="relative w-[360px] h-[260px] cursor-pointer group" onClick={handleOpenInvitation}>
                {/* Envelope Back */}
                <div className="absolute inset-0 rounded-lg shadow-2xl z-0 overflow-hidden border border-stone-300/50">
                  <img src="https://images.unsplash.com/photo-1579762715118-a6f1d789a913?q=80&w=800&auto=format&fit=crop" alt="Kraft Paper" className="w-full h-full object-cover" />
                </div>

                {/* Real Letter inside */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isOpening ? { y: -140 } : { y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-4 left-4 right-4 bottom-4 bg-white z-10 rounded-sm shadow-inner p-6 flex flex-col items-center justify-center origin-bottom border border-stone-100"
                >
                  <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=100&auto=format&fit=crop" alt="Floral Decoration" className="w-12 h-12 object-contain mb-4 opacity-80" />
                  <p className="text-stone-800 font-bold text-lg text-center">{eventData.brideName} & {eventData.groomName}</p>
                  <p className="text-stone-400 text-xs mt-1 text-center">Request the honor of your presence...</p>
                </motion.div>

                {/* Envelope Front Body */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isOpening ? { y: 140 } : { y: 0 }}
                  transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 h-[65%] z-20 rounded-b-lg overflow-hidden shadow-lg border-t border-stone-400/30"
                >
                   <img src="https://images.unsplash.com/photo-1579762715118-a6f1d789a913?q=80&w=800&auto=format&fit=crop" alt="Kraft Paper Front" className="w-full h-full object-cover" />
                </motion.div>

                {/* Wax Seal Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 rounded-full shadow-xl overflow-hidden border-4 border-white/50 group-hover:shadow-2xl transition-shadow"
                >
                  <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=100&auto=format&fit=crop" alt="Wax Seal" className="w-full h-full object-cover" />
                </motion.div>

                {!isOpening && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }} className="absolute -bottom-12 left-0 right-0 text-center text-stone-400 text-xs tracking-widest uppercase">
                    Tap to open
                  </motion.p>
                )}
              </div>
            </div>
          </motion.section>
        ) : (
          /* ----------------------------------------------------------------------------------- */
          /* MAIN INVITATION (Realistic Garden & Converging Rings)                              */
          /* ----------------------------------------------------------------------------------- */
          <motion.div
            key="invitation-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* SCROLL DRIVEN RINGS (Realistic Gold Bands) */}
            <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40 pointer-events-none flex items-center justify-center">
              <motion.div style={{ x: leftRingX, rotate: rotateLeft }} className="w-52 h-52 md:w-80 md:h-80 rounded-full shadow-[0_0_50px_rgba(200,170,110,0.4)] bg-transparent absolute">
                <img src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=400&auto=format&fit=crop" alt="Gold Ring Left" className="w-full h-full object-cover rounded-full" />
              </motion.div>
              <motion.div style={{ x: rightRingX, rotate: rotateRight }} className="w-44 h-44 md:w-72 md:h-72 rounded-full shadow-[0_0_50px_rgba(200,170,110,0.4)] bg-transparent absolute">
                <img src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=400&auto=format&fit=crop" alt="Gold Ring Right" className="w-full h-full object-cover rounded-full" />
              </motion.div>
            </div>

            {/* HERO */}
            <section className="relative h-screen flex items-center justify-center">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2000&auto=format&fit=crop" alt="Lush Garden Path" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
              </div>
              
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="relative z-10 text-center px-6 text-white">
                <p className="uppercase tracking-[0.5em] text-white/70 text-xs mb-10">Join us in the garden</p>
                <h1 className="text-6xl md:text-8xl font-light tracking-tight drop-shadow-lg">{eventData.brideName}</h1>
                <div className="my-8 flex justify-center">
                   <img src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?q=80&w=100&auto=format&fit=crop" alt="Realistic Floral Divider" className="h-12 w-32 object-cover rounded-full opacity-80" />
                </div>
                <h1 className="text-6xl md:text-8xl font-light tracking-tight drop-shadow-lg">{eventData.groomName}</h1>
                <p className="mt-10 text-2xl font-light tracking-wide text-white/90">{eventData.date}</p>
                
                <div className="mt-16 animate-bounce">
                  <ArrowDown className="mx-auto text-white/60" size={24} />
                  <p className="text-xs tracking-[0.2em] uppercase text-white/50 mt-2">Scroll to unite the rings</p>
                </div>
              </motion.div>
            </section>

            {/* INVISIBLE SCROLL SPACER */}
            <div className="h-[200vh]" aria-hidden="true"></div>

            {/* MAIN CONTENT WRAPPER */}
            <div className="relative bg-[#f9f7f2] z-30 rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
              
              {/* COUPLE SECTION */}
              {eventData.showCoupleInfo && (
                <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
                  <div className="max-w-6xl mx-auto">
                    <p className="text-center uppercase tracking-[0.3em] text-stone-400 text-xs mb-16">The Couple</p>
                    <div className="grid md:grid-cols-2 gap-12">
                      <motion.div whileHover={{ y: -5 }} className="group overflow-hidden rounded-2xl shadow-xl border border-stone-100 bg-white">
                        <div className="h-96 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" alt="Bride Portrait" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-8 text-center">
                          <h3 className="text-3xl font-light tracking-wide">{eventData.brideName}</h3>
                          <p className="text-stone-400 mt-2 uppercase tracking-[0.2em] text-xs">The Bride</p>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ y: -5 }} className="group overflow-hidden rounded-2xl shadow-xl border border-stone-100 bg-white">
                        <div className="h-96 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" alt="Groom Portrait" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-8 text-center">
                          <h3 className="text-3xl font-light tracking-wide">{eventData.groomName}</h3>
                          <p className="text-stone-400 mt-2 uppercase tracking-[0.2em] text-xs">The Groom</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>
              )}

              {/* EVENT DETAILS */}
              <section className="py-24 px-6 bg-[#f9f7f2]">
                <div className="max-w-6xl mx-auto">
                  <p className="text-center uppercase tracking-[0.3em] text-stone-400 text-xs mb-16">Event Details</p>
                  <div className="grid lg:grid-cols-3 gap-8">
                    {[
                      { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop" },
                      { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time, img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop" },
                      { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue, img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop" },
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100 group hover:shadow-2xl transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8">
                          <div className="text-stone-400 mb-4">{item.icon}</div>
                          <h3 className="font-medium text-xl mb-2 tracking-wide">{item.title}</h3>
                          <p className="text-stone-500 font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* COUNTDOWN */}
              {eventData.enableCountdown && (
                <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
                  <div className="max-w-6xl mx-auto">
                    <p className="text-center uppercase tracking-[0.3em] text-stone-400 text-xs mb-16">Countdown</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                        { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                        { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                        { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                      ].map((item) => (
                        <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl p-8 text-center shadow-xl border border-stone-100">
                          <h3 className="text-5xl font-light text-stone-800">{item.value}</h3>
                          <p className="mt-3 text-stone-400 uppercase tracking-[0.2em] text-xs">{item.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* LOVE STORY */}
              {eventData.showStory && eventData.loveStory?.length > 0 && (
                <section className="py-24 px-6 bg-[#f9f7f2]">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                      <Heart className="mx-auto text-stone-300 mb-4" size={32} fill="currentColor" />
                      <p className="uppercase tracking-[0.3em] text-stone-400 text-xs">Our Story</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {eventData.loveStory.map((story, index) => (
                        <motion.div key={index} whileHover={{ y: -10 }} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-stone-100 group">
                          <div className="h-60 overflow-hidden">
                            {story.image ? (
                              <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" alt="Romantic Garden" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            )}
                          </div>
                          <div className="p-8">
                            <p className="text-stone-400 text-xs uppercase tracking-widest mb-2">{story.subtitle}</p>
                            <h3 className="text-2xl font-light mb-4">{story.title}</h3>
                            <p className="text-stone-500 leading-relaxed text-sm font-light">{story.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* SCHEDULE */}
              {eventData.showSchedule && eventData.schedule?.length > 0 && (
                <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
                  <div className="max-w-5xl mx-auto">
                    <p className="text-center uppercase tracking-[0.3em] text-stone-400 text-xs mb-20">Timeline</p>
                    <div className="space-y-6">
                      {eventData.schedule.map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                            <p className="text-stone-500 text-sm font-light">{item.description}</p>
                          </div>
                          <span className="inline-flex px-5 py-2 rounded-full bg-stone-100 text-stone-600 text-sm tracking-wide font-medium whitespace-nowrap border border-stone-200">
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
                <section className="py-24 px-6 bg-[#f9f7f2]">
                  <div className="max-w-7xl mx-auto">
                    <p className="text-center uppercase tracking-[0.3em] text-stone-400 text-xs mb-16">Gallery</p>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                      {eventData.gallery.map((image, index) => (
                        <motion.img key={index} whileHover={{ scale: 1.02 }} src={image} alt="" className="mb-4 rounded-2xl w-full shadow-xl cursor-pointer border-4 border-white" />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* RSVP */}
              {eventData.rsvpEnabled && (
                <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                      <p className="uppercase tracking-[0.3em] text-stone-400 text-xs mb-4">RSVP</p>
                      <h2 className="text-4xl font-light tracking-tight">Will You Attend?</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-stone-100">
                      <form className="space-y-6">
                        <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-[#f9f7f2] border border-stone-200 outline-none text-stone-800 placeholder:text-stone-400 focus:border-stone-400 transition-colors font-light" />
                        <input type="number" placeholder="Number of Guests" className="w-full p-4 rounded-xl bg-[#f9f7f2] border border-stone-200 outline-none text-stone-800 placeholder:text-stone-400 focus:border-stone-400 transition-colors font-light" />
                        <textarea rows={5} placeholder="Leave a message..." className="w-full p-4 rounded-xl bg-[#f9f7f2] border border-stone-200 outline-none text-stone-800 placeholder:text-stone-400 focus:border-stone-400 transition-colors font-light" />
                        <div className="grid grid-cols-2 gap-4">
                          <button type="button" className="py-4 rounded-xl bg-stone-800 text-white hover:bg-stone-700 transition font-medium tracking-wide text-sm">Joyfully Accept</button>
                          <button type="button" className="py-4 rounded-xl bg-white border border-stone-300 text-stone-500 hover:bg-stone-50 transition font-medium tracking-wide text-sm">Respectfully Decline</button>
                        </div>
                        <button type="submit" className="w-full py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium tracking-[0.1em] transition shadow-lg">
                          Send Reply
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              )}

              {/* WISHES WALL */}
              {eventData.enableGreetings && eventData.wishes?.length > 0 && (
                <section className="py-24 px-6 bg-[#f9f7f2]">
                  <div className="max-w-7xl mx-auto">
                    <p className="text-center uppercase tracking-[0.3em] text-stone-400 text-xs mb-16">Wishes</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eventData.wishes.map((wish, index) => (
                        <motion.div key={index} whileHover={{ y: -8 }} className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
                          <p className="text-stone-500 leading-relaxed mb-6 text-sm font-light italic">&ldquo;{wish.message}&rdquo;</p>
                          <div className="font-medium text-stone-800 text-sm tracking-wide">— {wish.name}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* LOCATION */}
              {eventData.showVenue && (
                <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto">
                    <p className="text-center uppercase tracking-[0.3em] text-stone-400 text-xs mb-16">Venue</p>
                    <div className="grid lg:grid-cols-2 gap-10">
                      <div className="bg-white rounded-2xl p-10 shadow-xl border border-stone-100 flex flex-col justify-center">
                        <h3 className="text-3xl font-light mb-6 tracking-wide">{eventData.venue}</h3>
                        <p className="text-stone-500 leading-relaxed mb-8 font-light">{eventData.address}</p>
                        {eventData.mapLink && (
                          <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-3 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-all duration-500 tracking-[0.15em] uppercase text-xs font-medium shadow-lg w-fit">
                            Get Directions
                          </a>
                        )}
                      </div>
                      <div className="rounded-2xl overflow-hidden border-4 border-white min-h-[450px] shadow-xl">
                        {eventData.mapLink ? (
                          <iframe src={eventData.mapLink} className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                        ) : (
                          <div className="h-full w-full">
                             <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop" alt="Venue Exterior" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* FOOTER */}
              <footer className="py-32 px-6 bg-[#f9f7f2] border-t border-stone-200">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?q=80&w=200&auto=format&fit=crop" alt="Footer Floral" className="w-full h-full object-cover" />
                  </div>
                  <p className="uppercase tracking-[0.3em] text-stone-400 text-xs mb-6">With Love</p>
                  <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight text-stone-800">
                    {eventData.brideName} <span className="text-stone-300 mx-2">&</span> {eventData.groomName}
                  </h2>
                  <p className="mt-12 text-stone-300 text-xs tracking-widest uppercase">Crafted with elegance using Ente Invite</p>
                </div>
              </footer>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}