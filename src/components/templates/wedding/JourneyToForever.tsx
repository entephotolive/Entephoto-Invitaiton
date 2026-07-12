"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Compass,
  Navigation,
  Camera,
  Map as MapIcon,
  Tent
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function JourneyToForever({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const bride = eventData.brideName || "Bride";
  const groom = eventData.groomName || "Groom";

  // Theme Colors
  const bgMain = "bg-[#F9F7F1]";
  const textMain = "text-[#3E362E]";
  const accentColor = "text-[#C86B5E]"; // Terracotta
  const accentBg = "bg-[#C86B5E]";
  const secondaryAccent = "text-[#8BA888]"; // Sage Green
  const secondaryBg = "bg-[#8BA888]";

  return (
    <main className={`${bgMain} ${textMain} font-sans overflow-x-hidden selection:bg-[#C86B5E] selection:text-white`}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}

        <div className="absolute inset-0 bg-[#3E362E]/40" />
        
        {/* Decorative Map overlay (subtle) */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#C86B5E 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-12 md:p-20 rounded-3xl border border-white/20 shadow-2xl"
        >
          <Compass className="mx-auto w-16 h-16 text-white mb-6 opacity-90 animate-[spin_20s_linear_infinite]" strokeWidth={1} />
          
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm mb-6 text-white/90 font-bold">
            The Greatest Adventure Begins
          </p>

          <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-white mb-4">
            {bride}
          </h1>
          
          <div className="text-[#C86B5E] text-4xl font-light italic my-2 font-serif">
            &
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-white mt-4">
            {groom}
          </h1>

          <div className="mt-12 flex flex-col items-center gap-3 text-white">
            <p className="text-xl md:text-2xl font-serif tracking-widest">
              {eventData.date}
            </p>
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-80">
              <MapPin size={16} />
              <span>{eventData.venue}</span>
            </div>
          </div>
        </motion.div>

      </section>

      {/* THE COUPLE (The Adventurers) */}
      {eventData.showCoupleInfo && (
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Dashed trail line connecting sections */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F7F1] border-2 border-[#C86B5E] text-[#C86B5E] mb-6 shadow-sm">
                <Tent size={20} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
                The Co-Pilots
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 shadow-xl shadow-[#3E362E]/5 text-center relative rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
              >
                {/* Polaroid Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-3" />
                
                <div className="w-32 h-32 mx-auto rounded-full bg-[#F9F7F1] border-4 border-white shadow-inner flex items-center justify-center text-5xl mb-6">
                  👰
                </div>
                <h3 className="text-3xl font-serif mb-2">{bride}</h3>
                <p className="uppercase tracking-widest text-[#8BA888] text-xs font-bold">The Explorer</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2rem] p-8 shadow-xl shadow-[#3E362E]/5 text-center relative rotate-[2deg] hover:rotate-0 transition-transform duration-500 mt-8 md:mt-0"
              >
                {/* Polaroid Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm -rotate-3" />
                
                <div className="w-32 h-32 mx-auto rounded-full bg-[#F9F7F1] border-4 border-white shadow-inner flex items-center justify-center text-5xl mb-6">
                  🤵
                </div>
                <h3 className="text-3xl font-serif mb-2">{groom}</h3>
                <p className="uppercase tracking-widest text-[#8BA888] text-xs font-bold">The Navigator</p>
              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* LOVE STORY (The Journey So Far) */}
      {eventData.showStory && eventData.loveStory && eventData.loveStory.length > 0 && (
        <section className="py-24 px-6 bg-[#3E362E] text-[#F9F7F1]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Compass className="mx-auto text-[#C86B5E] mb-6" size={40} strokeWidth={1.5} />
              <span className="uppercase tracking-[0.2em] text-[#8BA888] text-xs font-bold block mb-4">
                Our Timeline
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                The Journey So Far
              </h2>
            </div>

            <div className="space-y-16">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  <div className={`w-full ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="bg-white p-3 rounded-xl shadow-2xl rotate-1 hover:rotate-0 transition-transform">
                      {story.image ? (
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full aspect-[4/3] object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] bg-zinc-100 rounded-lg flex items-center justify-center">
                          <Camera className="w-12 h-12 text-zinc-300" strokeWidth={1} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`w-full ${index % 2 === 0 ? 'md:order-2 text-left' : 'md:order-1 md:text-right'}`}>
                    <span className="inline-block px-4 py-1 rounded-full bg-[#8BA888]/20 text-[#8BA888] text-xs font-bold uppercase tracking-widest mb-4">
                      {story.subtitle}
                    </span>
                    <h3 className="text-3xl font-serif mb-4">
                      {story.title}
                    </h3>
                    <p className="text-white/70 font-light leading-relaxed text-lg">
                      {story.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      <section className="py-24 px-6 relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F7F1] border-2 border-[#C86B5E] text-[#C86B5E] mb-6 shadow-sm">
              <MapIcon size={20} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
              Destination Details
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5">
              <div className="w-16 h-16 rounded-full bg-[#F9F7F1] flex items-center justify-center text-[#C86B5E] mb-6">
                <CalendarDays size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-4">The Date</h3>
              <p className="text-zinc-500">{eventData.date}</p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5 mt-0 lg:-mt-8 mb-0 lg:mb-8">
              <div className="w-16 h-16 rounded-full bg-[#F9F7F1] flex items-center justify-center text-[#C86B5E] mb-6">
                <Clock3 size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-4">The Time</h3>
              <p className="text-zinc-500">{eventData.time}</p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5">
              <div className="w-16 h-16 rounded-full bg-[#F9F7F1] flex items-center justify-center text-[#C86B5E] mb-6">
                <MapPin size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-4">The Venue</h3>
              <p className="text-zinc-500">{eventData.venue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-20 px-6 bg-[#C86B5E] text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
                Next Stop: Forever
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center backdrop-blur-sm">
                  <h3 className={`text-4xl md:text-6xl font-serif font-light mb-2`}>{item.value}</h3>
                  <p className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold opacity-90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {eventData.showSchedule && eventData.schedule && eventData.schedule.length > 0 && (
        <section className="py-24 px-6 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F7F1] border-2 border-[#C86B5E] text-[#C86B5E] mb-6 shadow-sm">
                <Navigation size={20} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                The Itinerary
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#3E362E]/10 border border-[#3E362E]/5">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#C86B5E]/30 before:to-transparent">
                
                {eventData.schedule.map((item, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Marker */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#8BA888] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Clock3 size={16} />
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#F9F7F1] p-6 rounded-2xl shadow-sm border border-[#3E362E]/5 group-hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <h3 className="font-serif text-xl">{item.title}</h3>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#C86B5E]/10 text-[#C86B5E] text-xs font-bold tracking-widest whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-sm">{item.description}</p>
                    </div>

                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && eventData.gallery && eventData.gallery.length > 0 && (
        <section className="py-24 px-6 bg-[#3E362E]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Camera className="mx-auto text-[#8BA888] mb-6" size={40} strokeWidth={1.5} />
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#F9F7F1]">
                Travel Log
              </h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {eventData.gallery.map((image, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                  className="break-inside-avoid bg-white p-3 rounded-sm shadow-xl"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full object-cover rounded-sm mb-3"
                  />
                  <div className="h-8 flex items-center justify-center font-serif text-zinc-400 text-sm">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C86B5E]/30 -translate-x-1/2 z-0" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl shadow-[#3E362E]/10 border border-[#3E362E]/5">
              <div className="text-center mb-12">
                <span className="uppercase tracking-[0.2em] text-[#8BA888] text-xs font-bold block mb-4">
                  Check-in
                </span>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
                  Boarding Pass
                </h2>
                <p className="text-zinc-500 font-light">
                  Please confirm your seat for our celebration.
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Passenger Name(s)"
                    className="w-full bg-[#F9F7F1] border-none rounded-xl px-6 py-5 text-[#3E362E] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C86B5E]/50 transition"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Number of Passengers"
                    className="w-full bg-[#F9F7F1] border-none rounded-xl px-6 py-5 text-[#3E362E] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C86B5E]/50 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button type="button" className={`py-4 rounded-xl ${accentBg} text-white font-bold uppercase tracking-wider text-sm hover:opacity-90 transition`}>
                    Accept
                  </button>
                  <button type="button" className="py-4 rounded-xl bg-zinc-100 text-zinc-500 font-bold uppercase tracking-wider text-sm hover:bg-zinc-200 transition">
                    Decline
                  </button>
                </div>
                
                <button type="submit" className={`w-full py-5 rounded-xl ${secondaryBg} text-white font-bold uppercase tracking-wider text-sm hover:opacity-90 transition mt-4`}>
                  Submit Boarding Pass
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* WISHES */}
      {eventData.enableGreetings && eventData.wishes && eventData.wishes.length > 0 && (
        <section className="py-24 px-6 bg-[#8BA888] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.2em] text-white/70 text-xs font-bold block mb-4">
                Message in a Bottle
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                Notes from Travelers
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventData.wishes.map((wish, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 relative shadow-lg">
                  <Heart className="absolute top-6 right-6 text-white/20" size={32} />
                  <p className="font-serif text-lg text-white mb-6 leading-relaxed relative z-10">
                    "{wish.message}"
                  </p>
                  <span className="uppercase tracking-widest text-white/80 text-xs font-bold">
                    — {wish.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LOCATION MAP */}
      {eventData.showVenue && (
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="rounded-3xl overflow-hidden border-8 border-white h-[400px] md:h-[500px] shadow-2xl relative bg-[#F9F7F1]">
              {eventData.mapLink ? (
                <iframe
                  src={eventData.mapLink}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                  <MapIcon size={48} className="mb-4 opacity-50" />
                  Map Coordinates Unavailable
                </div>
              )}
            </div>

            <div className="text-center lg:text-left bg-white p-10 rounded-[2rem] shadow-xl shadow-[#3E362E]/5 border border-[#3E362E]/5">
              <span className="uppercase tracking-[0.3em] text-[#C86B5E] text-xs font-bold block mb-4">
                Coordinates
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">
                The Final Destination
              </h2>
              <p className="text-2xl font-serif text-[#3E362E] mb-2">{eventData.venue}</p>
              <p className="text-zinc-500 mb-8 max-w-md mx-auto lg:mx-0">
                {eventData.address}
              </p>
              
              {eventData.mapLink && (
                <a
                  href={eventData.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full ${accentBg} text-white font-bold uppercase tracking-wider text-sm hover:opacity-90 transition shadow-lg shadow-[#C86B5E]/30`}
                >
                  <Navigation size={18} /> Get Directions
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* MUSIC BUTTON */}
      {eventData.musicUrl && (
        <div className="fixed bottom-8 right-8 z-50">
          <audio id="journey-audio" src={eventData.musicUrl} loop />
          <button
            onClick={() => {
              const audio = document.getElementById("journey-audio") as HTMLAudioElement;
              if (!audio) return;
              if (audio.paused) audio.play();
              else audio.pause();
            }}
            className={`w-14 h-14 rounded-full ${secondaryBg} text-white flex items-center justify-center hover:scale-110 transition duration-500 shadow-xl shadow-[#8BA888]/40 border-2 border-white`}
          >
            <span className="text-xl">♫</span>
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-[#3E362E]/10 text-center bg-[#F9F7F1]">
        <Compass className="mx-auto w-8 h-8 text-[#C86B5E] mb-6 opacity-80" strokeWidth={1.5} />
        <h2 className="text-3xl md:text-5xl font-serif tracking-tighter mb-4 text-[#3E362E]">
          {bride} <span className="text-[#C86B5E] mx-2">&</span> {groom}
        </h2>
        <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-zinc-400 mt-8">
          The Journey to Forever • Powered by Ente Invite
        </p>
      </footer>

    </main>
  );
}
