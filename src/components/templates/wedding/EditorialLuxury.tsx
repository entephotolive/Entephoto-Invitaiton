"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  ArrowRight
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function EditorialLuxury({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const bride = eventData.brideName || "Bride";
  const groom = eventData.groomName || "Groom";

  return (
    <main className="bg-[#FAF9F6] text-[#111111] font-sans overflow-x-hidden selection:bg-black selection:text-white">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-12">

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-1000"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end border-b border-[#111111] pb-8"
        >
          <div className="w-full">
            <p className="uppercase tracking-[0.4em] text-xs mb-4 font-bold text-zinc-500">
              The Wedding Celebration
            </p>

            <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-none mb-2">
              {bride}
            </h1>
            
            <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-none flex items-center gap-6">
              <span className="text-4xl md:text-8xl font-sans italic font-light text-zinc-400">&</span> {groom}
            </h1>
          </div>

          <div className="text-left md:text-right mt-12 md:mt-0 w-full md:w-auto">
            <p className="text-2xl md:text-4xl font-serif italic mb-2 text-zinc-800">
              {eventData.date}
            </p>
            <p className="uppercase tracking-[0.3em] text-xs font-bold text-zinc-500">
              {eventData.venue}
            </p>
          </div>
        </motion.div>

      </section>

      {/* THE COUPLE */}
      {eventData.showCoupleInfo && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-400 block mb-6">
                Chapter One
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">
                The <br/> Protagonists
              </h2>
              <div className="space-y-6">
                <div className="border-l border-zinc-300 pl-6">
                  <h3 className="text-2xl font-serif">{bride}</h3>
                  <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 mt-2">The Bride</p>
                </div>
                <div className="border-l border-zinc-300 pl-6">
                  <h3 className="text-2xl font-serif">{groom}</h3>
                  <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 mt-2">The Groom</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[3/4] bg-zinc-200 w-full relative overflow-hidden"
            >
              {/* If they have a gallery, use the first image as a couple portrait, otherwise dummy */}
              <img 
                src={eventData.gallery && eventData.gallery.length > 0 ? eventData.gallery[0] : (eventData.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552")}
                alt="Couple"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>

          </div>
        </section>
      )}

      {/* EVENT DETAILS & COUNTDOWN */}
      <section className="py-32 px-6 bg-[#111111] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">

          <div>
            <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
              The Details
            </span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-16">
              When & Where
            </h2>

            <div className="space-y-12 border-t border-zinc-800 pt-12">
              <div className="flex items-start gap-6">
                <CalendarDays className="w-8 h-8 stroke-[1] text-zinc-400" />
                <div>
                  <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500 mb-2">Date</h3>
                  <p className="text-2xl font-serif">{eventData.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Clock3 className="w-8 h-8 stroke-[1] text-zinc-400" />
                <div>
                  <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500 mb-2">Time</h3>
                  <p className="text-2xl font-serif">{eventData.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <MapPin className="w-8 h-8 stroke-[1] text-zinc-400" />
                <div>
                  <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500 mb-2">Venue</h3>
                  <p className="text-2xl font-serif mb-2">{eventData.venue}</p>
                  <p className="text-zinc-400 font-light">{eventData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {eventData.enableCountdown && (
            <div className="flex flex-col justify-center">
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                Anticipation
              </span>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                  { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                  { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                  { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                ].map((item) => (
                  <div key={item.label} className="border border-zinc-800 p-8 flex flex-col items-center justify-center">
                    <h3 className="text-6xl font-serif tracking-tighter mb-2">{item.value}</h3>
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* LOVE STORY */}
      {eventData.showStory && eventData.loveStory && eventData.loveStory.length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-400 block mb-6">
                Our Narrative
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">
                An Editorial Romance
              </h2>
            </div>

            <div className="space-y-32">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
                >
                  <div className="w-full md:w-1/2 aspect-[4/5] bg-zinc-200 overflow-hidden">
                    {story.image ? (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-300">
                        <Heart className="w-12 h-12 stroke-[1]" />
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 space-y-6">
                    <p className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-400 border-b border-zinc-200 pb-4 inline-block">
                      {story.subtitle}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-serif tracking-tight">
                      {story.title}
                    </h3>
                    <p className="text-zinc-500 font-light leading-relaxed text-lg">
                      {story.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {eventData.showSchedule && eventData.schedule && eventData.schedule.length > 0 && (
        <section className="py-32 px-6 bg-[#EBEBEB]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                The Itinerary
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">
                Order of Events
              </h2>
            </div>

            <div className="space-y-0">
              {eventData.schedule.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row border-t border-[#111111] py-12 group hover:bg-[#FAF9F6] transition px-8 -mx-8">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <span className="text-2xl font-serif italic text-zinc-500 group-hover:text-[#111111] transition">
                      {item.time}
                    </span>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-3xl font-serif tracking-tight mb-4">{item.title}</h3>
                    <p className="text-zinc-500 font-light">{item.description}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#111111]"></div>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && eventData.gallery && eventData.gallery.length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16 border-b border-zinc-200 pb-8">
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">
                The Archives
              </h2>
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-400 hidden md:block">
                Curated Moments
              </span>
            </div>

            <div className="columns-1 md:columns-2 gap-8 space-y-8">
              {eventData.gallery.map((image, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP & WISHES */}
      <section className="py-32 px-6 bg-[#111111] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">

          {eventData.rsvpEnabled && (
            <div>
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                Répondez s'il vous plaît
              </span>
              <h2 className="text-5xl font-serif tracking-tighter mb-12">
                RSVP
              </h2>
              
              <form className="space-y-8">
                <div>
                  <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">Guests Name(s)</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">Number in Party</label>
                  <input
                    type="number"
                    className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500 block mb-3">Dietary Requirements</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-zinc-800 pb-3 outline-none focus:border-zinc-400 transition font-serif text-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button type="button" className="border border-zinc-800 py-4 hover:bg-white hover:text-black transition uppercase tracking-[0.2em] text-xs font-bold">
                    Will Attend
                  </button>
                  <button type="button" className="border border-zinc-800 py-4 hover:bg-white hover:text-black transition uppercase tracking-[0.2em] text-xs font-bold opacity-50">
                    Will Decline
                  </button>
                </div>
                
                <button type="submit" className="w-full bg-white text-black py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-zinc-200 transition">
                  Confirm RSVP
                </button>
              </form>
            </div>
          )}

          {eventData.enableGreetings && eventData.wishes && (
            <div>
              <span className="uppercase tracking-[0.4em] text-xs font-bold text-zinc-500 block mb-6">
                Guestbook
              </span>
              <h2 className="text-5xl font-serif tracking-tighter mb-12">
                Well Wishes
              </h2>

              <div className="space-y-10 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-800">
                {eventData.wishes.map((wish, index) => (
                  <div key={index} className="border-b border-zinc-800 pb-8">
                    <p className="font-serif text-xl text-zinc-300 italic mb-6 leading-relaxed">
                      "{wish.message}"
                    </p>
                    <p className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500">
                      — {wish.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* LOCATION MAP */}
      {eventData.showVenue && eventData.mapLink && (
        <section className="h-[600px] w-full relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-1000">
          <iframe
            src={eventData.mapLink}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </section>
      )}

      {/* MUSIC BUTTON */}
      {eventData.musicUrl && (
        <div className="fixed bottom-8 right-8 z-50">
          <audio id="editorial-audio" src={eventData.musicUrl} loop />
          <button
            onClick={() => {
              const audio = document.getElementById("editorial-audio") as HTMLAudioElement;
              if (!audio) return;
              if (audio.paused) audio.play();
              else audio.pause();
            }}
            className="w-14 h-14 rounded-full border border-[#111111] bg-[#FAF9F6] text-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#FAF9F6] transition duration-500"
          >
            <span className="font-serif italic text-lg">♫</span>
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-zinc-200 text-center">
        <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-8">
          {bride} <span className="font-sans italic font-light text-zinc-400 mx-2">&</span> {groom}
        </h2>
        <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-zinc-400">
          Curated Elegance by Ente Invite
        </p>
      </footer>

    </main>
  );
}
