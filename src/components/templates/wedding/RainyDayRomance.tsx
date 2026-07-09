"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  CloudRain,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

// Static Raindrop Component
const RainDrop = ({ left, delay, duration, size }: { left: string; delay: string; duration: string; size: string }) => (
  <div
    className="absolute top-0 w-[2px] rounded-full bg-gradient-to-b from-transparent via-blue-300/40 to-transparent animate-static-rain"
    style={{
      left: `${left}%`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      filter: `blur(${parseInt(size) > 40 ? '1px' : '0.5px'})`,
    }}
  />
);

// Static Water Droplet on Surface Component
const WaterDroplet = ({ top, left, size }: { top: string; left: string; size: string }) => (
  <div
    className="absolute rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.2), 1px 1px 2px rgba(0,0,0,0.2)',
    }}
  />
);

export default function RainyDayRomance({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  // Generate static rain lines
  const rainLines = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: (Math.random() * 100).toFixed(2),
    delay: (Math.random() * 5).toFixed(2),
    duration: (Math.random() * 2 + 2).toFixed(2),
    size: (Math.random() * 60 + 20).toFixed(2),
  }));

  // Generate static surface droplets for cards
  const surfaceDroplets = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: (Math.random() * 90 + 5).toFixed(2),
    left: (Math.random() * 90 + 5).toFixed(2),
    size: (Math.random() * 6 + 3).toFixed(2),
  }));

  return (
    // The main wrapper applies the sleek, wet-looking custom font globally to this component
    <main 
      className="relative bg-[#0f172a] text-slate-100 overflow-x-hidden"
      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif" }}
    >

      {/* RAIN OVERLAY - Static falling drops */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {rainLines.map(drop => (
          <RainDrop key={drop.id} {...drop} />
        ))}
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-[#0f172a]">

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
          />
        )}

        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-8 text-slate-400">
            <CloudRain size={18} />
            <p className="uppercase tracking-[0.4em] text-sm">
              A Rainy Day Romance
            </p>
            <CloudRain size={18} />
          </div>

          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-white drop-shadow-lg">
            {eventData.brideName}
          </h1>

          <div className="text-blue-300/80 text-4xl my-6 font-light">
            &
          </div>

          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-white drop-shadow-lg">
            {eventData.groomName}
          </h1>

          <div className="mt-12 flex items-center justify-center gap-3 text-slate-300">
            <div className="h-px w-12 bg-slate-500"></div>
            <p className="text-xl font-light tracking-wide">
              {eventData.date}
            </p>
            <div className="h-px w-12 bg-slate-500"></div>
          </div>

          <button className="mt-12 px-8 py-3 rounded-sm border border-blue-400/30 text-blue-200 hover:bg-blue-500/10 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-medium">
            Listen To The Rain
          </button>
        </motion.div>
      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">The Couple</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Two Souls Intertwined</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[{ name: eventData.brideName, role: "Bride", emoji: "👰" }, { name: eventData.groomName, role: "Groom", emoji: "🤵" }].map((person, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  // Wet glass card effect
                  className="relative bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-lg p-10 overflow-hidden shadow-xl"
                >
                  {/* Static droplets resting on the card */}
                  {surfaceDroplets.map(d => (
                    <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
                  ))}
                  
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-6 drop-shadow-lg">{person.emoji}</div>
                    <h3 className="text-3xl font-light tracking-wide">{person.name}</h3>
                    <p className="text-blue-300/60 mt-3 uppercase tracking-[0.2em] text-xs">{person.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">Details</span>
            <h2 className="text-4xl font-extralight mt-4 tracking-tight">When The Sky Cries Joy</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { icon: <CalendarDays size={28} />, title: "Date", desc: eventData.date },
              { icon: <Clock3 size={28} />, title: "Time", desc: eventData.time },
              { icon: <MapPin size={28} />, title: "Venue", desc: eventData.venue },
            ].map((item, index) => (
              <div key={index} className="relative bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-lg p-8 overflow-hidden">
                 {surfaceDroplets.slice(0, 3).map(d => (
                    <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
                  ))}
                <div className="relative z-10 text-blue-300/80 mb-4">{item.icon}</div>
                <h3 className="font-medium text-lg mb-2 tracking-wide">{item.title}</h3>
                <p className="text-slate-400 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">Countdown</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Dripping Towards The Day</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 text-center overflow-hidden shadow-xl"
                >
                  {surfaceDroplets.slice(0, 2).map(d => (
                    <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
                  ))}
                  <h3 className="relative z-10 text-5xl font-extralight text-blue-200">
                    {item.value}
                  </h3>
                  <p className="relative z-10 mt-3 text-slate-500 uppercase tracking-[0.2em] text-xs">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory && eventData.loveStory?.length > 0 && (
        <section className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Heart className="mx-auto text-blue-400/70 mb-4" size={32} />
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">Our Story</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Puddles Of Memories</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl group"
                >
                  {surfaceDroplets.map(d => (
                    <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
                  ))}
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-60 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                  <div className="relative z-10 p-8">
                    <p className="text-blue-300/60 text-xs uppercase tracking-widest mb-2">{story.subtitle}</p>
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
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">Timeline</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Flow Of The Evening</h2>
            </div>

            <div className="space-y-6">
              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-lg p-8 overflow-hidden"
                >
                  {surfaceDroplets.slice(0, 2).map(d => (
                    <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
                  ))}
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm font-light">{item.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex px-5 py-2 rounded-sm border border-blue-400/30 text-blue-200 text-sm tracking-wide">
                        {item.time}
                      </span>
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
        <section className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">Gallery</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Through The Rain</h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {eventData.gallery.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  src={image}
                  alt=""
                  className="mb-4 rounded-lg w-full shadow-2xl cursor-pointer border border-white/10 opacity-90 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">RSVP</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Let Us Know You're Coming</h2>
              <p className="mt-4 text-slate-400 font-light text-sm">Even if you have to bring an umbrella.</p>
            </div>

            <div className="relative bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 md:p-12 shadow-xl overflow-hidden">
              {surfaceDroplets.map(d => (
                <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
              ))}
              
              <form className="relative z-10 space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-sm bg-slate-900/50 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-blue-400/50 transition-colors font-light"
                />
                <input
                  type="number"
                  placeholder="Number of Guests"
                  className="w-full p-4 rounded-sm bg-slate-900/50 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-blue-400/50 transition-colors font-light"
                />
                <textarea
                  rows={5}
                  placeholder="Leave a message..."
                  className="w-full p-4 rounded-sm bg-slate-900/50 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-blue-400/50 transition-colors font-light"
                />

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="py-4 rounded-sm bg-blue-600/20 border border-blue-400/30 hover:bg-blue-600/30 transition text-blue-200 tracking-wide text-sm"
                  >
                    Attending
                  </button>
                  <button
                    type="button"
                    className="py-4 rounded-sm bg-slate-700/50 border border-white/10 hover:bg-slate-700 transition text-slate-400 tracking-wide text-sm"
                  >
                    Not Attending
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-sm bg-blue-500/80 hover:bg-blue-500 text-white font-medium tracking-[0.1em] transition"
                >
                  Send Reply
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* WISHES WALL */}
      {eventData.enableGreetings && eventData.wishes?.length > 0 && (
        <section className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">Wishes</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Whispers In The Rain</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventData.wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="relative bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 overflow-hidden shadow-xl"
                >
                  {surfaceDroplets.slice(0, 3).map(d => (
                    <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
                  ))}
                  <div className="relative z-10">
                    <div className="text-blue-300/40 text-5xl mb-4 font-serif">❝</div>
                    <p className="text-slate-300 leading-relaxed mb-6 text-sm font-light italic">
                      {wish.message}
                    </p>
                    <div className="font-medium text-blue-200 text-sm tracking-wide">
                      — {wish.name}
                    </div>
                  </div>
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
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-blue-400/70 text-xs">Venue</span>
              <h2 className="text-4xl font-extralight mt-4 tracking-tight">Our Shelter From The Storm</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="relative bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-lg p-10 shadow-xl overflow-hidden">
                {surfaceDroplets.map(d => (
                  <WaterDroplet key={d.id} top={d.top} left={d.left} size={d.size} />
                ))}
                <div className="relative z-10">
                  <h3 className="text-3xl font-light mb-6 tracking-wide">{eventData.venue}</h3>
                  <p className="text-slate-400 leading-relaxed mb-8 font-light">{eventData.address}</p>
                  
                  {eventData.mapLink && (
                    <a
                      href={eventData.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex px-8 py-3 rounded-sm border border-blue-400/30 text-blue-200 hover:bg-blue-500/10 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-medium"
                    >
                      Get Directions
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-white/10 min-h-[450px] shadow-xl">
                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-slate-800/50">
                    <p className="text-slate-500 font-light">Map Preview Not Available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MUSIC BUTTON */}
      {eventData.musicUrl && (
        <div className="fixed bottom-6 right-6 z-[60]">
          <audio id="tropical-audio" src={eventData.musicUrl} loop />
          <button
            onClick={() => {
              const audio = document.getElementById("tropical-audio") as HTMLAudioElement;
              if (!audio) return;
              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
            className="w-14 h-14 rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 text-blue-300 text-xl shadow-2xl transition hover:bg-slate-700/80 flex items-center justify-center"
          >
            💧
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-32 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <CloudRain className="mx-auto text-slate-600 mb-6" size={28} />
          <span className="uppercase tracking-[0.3em] text-slate-500 text-xs">With Love</span>
          
          <h2 className="text-5xl md:text-7xl font-extralight mt-6 mb-8 tracking-tight text-slate-300">
            See You In<br />The Rain
          </h2>

          <div className="text-4xl md:text-6xl font-extralight text-white">
            {eventData.brideName}
            <span className="mx-4 text-blue-400/50">&</span>
            {eventData.groomName}
          </div>

          <p className="mt-12 text-slate-600 text-xs tracking-widest uppercase">
            Crafted with rainy vibes using Ente Invite
          </p>
        </div>
      </footer>

      {/* REQUIRED CSS FOR STATIC RAIN ANIMATION */}
      {/* Paste this into your global.css or inside a <style> tag in layout.tsx */}
      <style jsx global>{`
        @keyframes static-rain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-static-rain {
          animation: static-rain linear infinite;
        }
      `}</style>

    </main>
  );
}