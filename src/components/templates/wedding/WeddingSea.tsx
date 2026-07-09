/* STREAMING_CHUNK:Initializing dependencies and setup... */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Waves,
  Music,
  Send,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

export default function WeddingSea({ eventData }: Props) {
  const timeLeft = useCountdown(
    eventData.date,
    eventData.time,
    eventData.rawWeddingDate
  );

  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    const audio = document.getElementById("sea-audio") as HTMLAudioElement;
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleAudio = () => {
    const audio = document.getElementById("sea-audio") as HTMLAudioElement;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="min-h-screen text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* STREAMING_CHUNK:Rendering background video layer... */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-[-100]"
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ocean-small.mp4"
      />
      <div className="fixed inset-0 bg-slate-900/40 z-[-99]" />

      {/* STREAMING_CHUNK:Defining entrance overlay... */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-lg"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleEnter}
              className="px-10 py-4 border border-white/20 rounded-full text-sm uppercase tracking-[0.3em] font-light"
            >
              Enter The Tide
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STREAMING_CHUNK:Rendering hero section... */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 20 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <Waves className="mx-auto mb-6 text-cyan-300" size={48} />
          <h1 className="text-7xl md:text-9xl font-serif font-light italic">{eventData.brideName}</h1>
          <div className="text-cyan-200 text-3xl my-6">&</div>
          <h1 className="text-7xl md:text-9xl font-serif font-light italic">{eventData.groomName}</h1>
          <p className="mt-10 tracking-[0.4em] uppercase text-sm opacity-80">{eventData.date}</p>
        </motion.div>
      </section>

      {/* STREAMING_CHUNK:Rendering content blocks... */}
      <div className="space-y-24 py-24 px-6 z-10 relative">
        
        {/* Couple Section */}
        {eventData.showCoupleInfo && (
          <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[ {name: eventData.brideName, title: "Bride"}, {name: eventData.groomName, title: "Groom"} ].map((p) => (
              <div key={p.name} className="p-10 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <h3 className="text-3xl font-light mb-2">{p.name}</h3>
                <p className="text-cyan-200 uppercase tracking-widest text-xs">{p.title}</p>
              </div>
            ))}
          </section>
        )}

        {/* Details Grid */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[ 
            { label: "Date", icon: <CalendarDays/>, val: eventData.date },
            { label: "Time", icon: <Clock3/>, val: eventData.time },
            { label: "Venue", icon: <MapPin/>, val: eventData.venue }
          ].map((item) => (
            <div key={item.label} className="p-8 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <div className="text-cyan-300 flex justify-center mb-4">{item.icon}</div>
              <h3 className="uppercase tracking-widest text-[10px] mb-2 text-white/60">{item.label}</h3>
              <p className="font-light">{item.val}</p>
            </div>
          ))}
        </section>

        {/* Countdown */}
        {eventData.enableCountdown && (
          <section className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[ {l: "Days", v: timeLeft.days}, {l: "Hours", v: timeLeft.hours}, {l: "Min", v: timeLeft.minutes}, {l: "Sec", v: timeLeft.seconds} ].map((c) => (
              <div key={c.l} className="p-6 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <h3 className="text-3xl font-light text-cyan-200">{String(c.v).padStart(2, '0')}</h3>
                <p className="text-[10px] uppercase tracking-widest mt-2 text-white/50">{c.l}</p>
              </div>
            ))}
          </section>
        )}

        {/* Story */}
        {eventData.showStory && eventData.loveStory?.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-center text-4xl font-light mb-12">Our Journey</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {eventData.loveStory.map((s, i) => (
                <div key={i} className="rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-md border border-white/10">
                  {s.image && <img src={s.image} alt={s.title} className="w-full h-48 object-cover opacity-80" />}
                  <div className="p-8">
                    <h3 className="text-xl mb-2">{s.title}</h3>
                    <p className="text-sm opacity-70">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Location Section */}
        {eventData.showVenue && (
          <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-10 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/10">
              <h2 className="text-3xl mb-6">{eventData.venue}</h2>
              <p className="mb-8 opacity-70">{eventData.address}</p>
              {eventData.mapLink && <a href={eventData.mapLink} target="_blank" className="px-8 py-3 rounded-full border border-white/20">Navigate</a>}
            </div>
            <div className="rounded-[32px] overflow-hidden border border-white/10 h-96 bg-black/20">
              {eventData.mapLink && <iframe src={eventData.mapLink} className="w-full h-full opacity-60 invert" />}
            </div>
          </section>
        )}
      </div>

      {/* STREAMING_CHUNK:Rendering audio player... */}
      {eventData.musicUrl && (
        <div className="fixed bottom-8 left-8 z-50">
          <audio id="sea-audio" src={eventData.musicUrl} loop />
          <button onClick={toggleAudio} className="w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg flex items-center justify-center">
            <Music size={20} />
          </button>
        </div>
      )}
    </main>
  );
}
