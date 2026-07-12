"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Anchor,
  Compass,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  Map,
  Music,
  Maximize2,
  Gift,
  X,
  Sun,
  Moon
} from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";

const defaultEventData = {
  brideName: "Aurelia Sterling",
  groomName: "Julian Vance",
  date: "2026-09-18",
  time: "17:00",
  enableCountdown: true,
  loveStory: [
    {
      title: "First Port of Call",
      subtitle: "Where We Met",
      description: "Our paths crossed on a breezy afternoon along the shores of Monaco. Julian was rigging a classical wooden yacht, and Aurelia was sketching the rolling tide line. A simple question about coastal navigation sparked an endless conversation.",
      image: "image_8f0740.png"
    },
    {
      title: "Charting Coastal Waters",
      subtitle: "Our First Voyage Together",
      description: "We set sail on a joint expedition along the Amalfi Coast. Navigating moonlit bays, mapping stars, and sharing coffee at sunrise cemented our absolute trust and deep companionship on the open ocean.",
      image: "image_8f0761.png"
    },
    {
      title: "Dropping Anchor",
      subtitle: "The Proposal at Sunset",
      description: "In the warm, golden glow of a Greek archipelago sunset, Julian steered the boat to a secluded cove, knelt on the teak bow, and asked Aurelia to navigate life's beautiful seas side-by-side forever.",
      image: "image_8f12c7.png"
    }
  ],
  schedule: [
    {
      title: "The Guest Embarkation",
      time: "04:30 PM",
      description: "Champagne welcome reception at the Grand Pavilion Marina Gate, accompanied by classical maritime string melodies."
    },
    {
      title: "The Oceanfront Vows",
      time: "05:15 PM",
      description: "The exchange of ocean promises and gold bands overlooking the breaking waves and the infinite horizon."
    },
    {
      title: "The Captain's Banquet",
      time: "06:30 PM",
      description: "Fine sea-to-table culinary dining experience under a clear-top pavilion with panoramic views of the twilight yacht harbor."
    },
    {
      title: "Dancing on Deck",
      time: "09:00 PM",
      description: "A lively, star-studded celebration featuring vintage swing jazz, custom signature cocktails, and the midnight lantern launch."
    }
  ],
  venue: "The Royal Sovereign Yacht Club",
  address: "Pier 77, Grand Horizon Marina Road, San Francisco, CA",
  mapLink: "https://maps.google.com",
  heroImage: "image_8f0740.png",
  gallery: [
    "image_8f0740.png",
    "image_8f0761.png",
    "image_8f12c7.png",
    "image_8f0761.png",
    "image_8f12c7.png",
    "image_8f0740.png"
  ],
  rsvpEnabled: true,
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  enableGreetings: true
};

const CinematicStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Montserrat:wght@100;200;300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
    
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-montserrat { font-family: 'Montserrat', sans-serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }

    @keyframes floatYacht {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(1.5deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes waveMotion1 {
      0% { transform: translateX(0) scaleY(1); }
      50% { transform: translateX(-25%) scaleY(1.03); }
      100% { transform: translateX(-50%) scaleY(1); }
    }
    @keyframes waveMotion2 {
      0% { transform: translateX(-50%) scaleY(1); }
      50% { transform: translateX(-25%) scaleY(0.97); }
      100% { transform: translateX(0) scaleY(1); }
    }
    @keyframes subtlePulse {
      0%, 100% { transform: scale(1); opacity: 0.95; }
      50% { transform: scale(1.02); opacity: 1; }
    }
    @keyframes spinSlow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes shimmerGold {
      0% { background-position: -200% 0%; }
      100% { background-position: 200% 0%; }
    }
    @keyframes floatStar {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
      50% { transform: translateY(-8px) scale(1.2); opacity: 0.9; }
    }
    
    .animate-float-yacht {
      animation: floatYacht 8s ease-in-out infinite;
    }
    .animate-wave-1 {
      animation: waveMotion1 16s ease-in-out infinite;
    }
    .animate-wave-2 {
      animation: waveMotion2 20s ease-in-out infinite;
    }
    .animate-pulse-subtle {
      animation: subtlePulse 6s ease-in-out infinite;
    }
    .animate-spin-slow {
      animation: spinSlow 35s linear infinite;
    }
    .animate-star-float {
      animation: floatStar 4s ease-in-out infinite;
    }
    .glass-premium {
      background: rgba(10, 23, 44, 0.72);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(212, 175, 55, 0.22);
    }
    .glass-premium-light {
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(212, 175, 55, 0.32);
    }
    .text-gold-gradient {
      background: linear-gradient(135deg, #fcefa6 0%, #d4af37 50%, #a37a10 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% auto;
    }
    .bg-gold-gradient {
      background: linear-gradient(135deg, #fcefa6 0%, #d4af37 50%, #a37a10 100%);
    }
    html {
      scroll-behavior: smooth;
    }
  ` }} />
);

interface WeddingOceanicaProps {
  eventData?: any;
}

export default function WeddingOceanica({ eventData }: WeddingOceanicaProps) {
  // Gracefully merge provided custom eventData with safe fallback coordinates
  const mergedData = {
    brideName: eventData?.brideName || defaultEventData.brideName,
    groomName: eventData?.groomName || defaultEventData.groomName,
    date: eventData?.date || defaultEventData.date,
    time: eventData?.time || defaultEventData.time,
    enableCountdown: typeof eventData?.enableCountdown === "boolean" ? eventData.enableCountdown : defaultEventData.enableCountdown,
    loveStory: eventData?.loveStory || defaultEventData.loveStory,
    schedule: eventData?.schedule || defaultEventData.schedule,
    venue: eventData?.venue || defaultEventData.venue,
    address: eventData?.address || defaultEventData.address,
    mapLink: eventData?.mapLink || defaultEventData.mapLink,
    heroImage: eventData?.heroImage || defaultEventData.heroImage,
    gallery: eventData?.gallery || defaultEventData.gallery,
    showGallery: typeof eventData?.showGallery === "boolean" ? eventData.showGallery : true,
    rsvpEnabled: typeof eventData?.rsvpEnabled === "boolean" ? eventData.rsvpEnabled : defaultEventData.rsvpEnabled,
    musicUrl: eventData?.musicUrl || defaultEventData.musicUrl,
    enableGreetings: typeof eventData?.enableGreetings === "boolean" ? eventData.enableGreetings : defaultEventData.enableGreetings,
  };

  const [hasSailed, setHasSailed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const countdownTime = useCountdown(mergedData.date, mergedData.time, eventData?.rawWeddingDate);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 25 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 3}s`
    })));
  }, []);

  const [rsvpSubmissions, setRsvpSubmissions] = useState([
    { name: "Captain Raymond Fletcher", guests: 2, status: "attending", dietary: "standard", message: "Fair winds and absolute congratulations to both!" },
    { name: "Lady Cassandra Vance", guests: 1, status: "attending", dietary: "vegan", message: "I wouldn't miss this coastal voyage for the world!" }
  ]);
  const [newRsvp, setNewRsvp] = useState({ name: "", email: "", guests: 1, status: "attending", dietary: "standard", message: "" });
  const [greetings, setGreetings] = useState([
    { author: "Evelyn & Thomas", message: "May your sails always match the wind, and your anchors hold steady in life's currents!", date: "10 mins ago" },
    { author: "Commodore Harrison", message: "An elegant wedding choice. Smooth sailing ahead for Aurelia & Julian!", date: "2 hours ago" },
  ]);
  const [newGreeting, setNewGreeting] = useState({ author: "", message: "" });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSetSail = () => {
    setHasSailed(true);
    setIsMuted(false);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((err: any) => console.log("Audio autoplay protected state: ", err));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const targetMute = !isMuted;
      audioRef.current.muted = targetMute;
      setIsMuted(targetMute);
      setIsPlaying(!targetMute);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRsvp.name || !newRsvp.email) return;
    setRsvpSubmissions([
      {
        name: newRsvp.name,
        guests: Number(newRsvp.guests),
        status: newRsvp.status,
        dietary: newRsvp.dietary,
        message: newRsvp.message || "Charting the coordinates to celebrate with you!"
      },
      ...rsvpSubmissions
    ]);
    setNewRsvp({ name: "", email: "", guests: 1, status: "attending", dietary: "standard", message: "" });
  };

  const handleAddGreeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGreeting.author || !newGreeting.message) return;
    setGreetings([
      {
        author: newGreeting.author,
        message: newGreeting.message,
        date: "Just released"
      },
      ...greetings
    ]);
    setNewGreeting({ author: "", message: "" });
  };

  const WaveBackground = () => (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 pointer-events-none z-10">
      <svg className="relative block w-full h-[150px] md:h-[220px]" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C150,90 350,20 500,60 C650,100 850,40 1000,70 C1150,100 1300,50 1400,60 L1400,120 L0,120 Z" fill={isDarkMode ? "#020617" : "#f8fafc"} opacity="0.3" className="animate-wave-1"></path>
        <path d="M0,50 C200,10 400,80 600,40 C800,0 1000,70 1200,30 L1200,120 L0,120 Z" fill={isDarkMode ? "#0f172a" : "#f1f5f9"} opacity="0.5" className="animate-wave-2"></path>
        <path d="M0,60 C300,100 600,30 900,75 C1200,120 1500,20 1800,60 L1800,120 L0,120 Z" fill={isDarkMode ? "#020617" : "#ffffff"} className="animate-wave-1"></path>
      </svg>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} font-montserrat transition-colors duration-500 overflow-x-hidden relative`}>
      <CinematicStyles />
      
      {/* Background audio simulation */}
      {mergedData.musicUrl && (
        <audio 
          ref={audioRef} 
          src={mergedData.musicUrl} 
          loop 
          autoPlay={isPlaying}
          muted={isMuted}
        />
      )}

      {/* Intro Sailing Gate */}
      {!hasSailed && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-center overflow-hidden">
          
          <div className="absolute inset-0 pointer-events-none">
            {stars.map((star) => (
              <div 
                key={star.id} 
                className="absolute w-1 h-1 bg-amber-200 rounded-full animate-star-float opacity-40"
                style={{
                  top: star.top,
                  left: star.left,
                  animationDelay: star.animationDelay,
                  animationDuration: star.animationDuration
                }}
              />
            ))}
          </div>

          <div className="relative max-w-xl p-8 rounded-[2rem] border border-amber-500/30 glass-premium animate-pulse-subtle shadow-2xl flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-full flex items-center justify-center border border-amber-400 bg-slate-950 shadow-lg shadow-amber-400/20 mb-5">
              <Anchor className="text-amber-400 w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-cinzel mb-2">You Are Cordially Invited</span>
            <h1 className="text-2xl md:text-4xl font-cinzel text-gold-gradient font-black tracking-widest leading-normal mb-3">
              {mergedData.brideName?.split(" ")[0]} & {mergedData.groomName?.split(" ")[0]}
            </h1>
            
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent my-4 animate-shimmerGold"></div>
            
            <p className="font-playfair italic text-slate-300 text-base md:text-lg mb-8 tracking-wide">
              
            </p>

            <button
              onClick={handleSetSail}
              className="group relative px-8 py-3.5 overflow-hidden rounded-full font-cinzel tracking-widest text-xs bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-slate-950 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="relative flex items-center gap-3">
                <Compass className="w-4 h-4 animate-spin-slow" />
                WE ARE WELCOMING
              </span>
            </button>
            
            <p className="text-[9px] text-slate-400 mt-5 tracking-widest italic">
              Enable speakers to hear our sea prelude
            </p>
          </div>
        </div>
      )}

      {hasSailed && (
        <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="w-10 h-10 rounded-full glass-premium flex items-center justify-center hover:scale-105 transition-all text-white bg-slate-900/50 border border-amber-500/20"
            title="Toggle theme mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
          
          <div className="flex items-center gap-2 glass-premium px-3.5 py-1.5 rounded-full border border-amber-500/20 text-white bg-slate-900/80">
            {isPlaying && (
              <div className="flex items-center gap-[3px] h-3 px-1">
                <span className="w-[2px] bg-amber-400 rounded-full h-2 animate-bounce"></span>
                <span className="w-[2px] bg-amber-300 rounded-full h-3 animate-bounce" style={{animationDelay: "0.2s"}}></span>
                <span className="w-[2px] bg-amber-400 rounded-full h-1 animate-bounce" style={{animationDelay: "0.4s"}}></span>
              </div>
            )}
            <button 
              onClick={toggleMute}
              className="hover:text-amber-300 transition-colors"
              title={isMuted ? "Unmute Prelude Music" : "Mute Prelude Music"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>
      )}

      {hasSailed && (
        <header className="fixed top-0 left-0 w-full z-30 bg-slate-950/20 backdrop-blur-md border-b border-white/5 transition-all duration-500">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Anchor className="text-amber-500 w-4 h-4" />
              <span className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] font-bold text-gold-gradient">
                {mergedData.brideName?.split(" ")[0]} & {mergedData.groomName?.split(" ")[0]}
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-[10px] font-cinzel tracking-widest text-slate-300">
              <a href="#hero" className="hover:text-amber-400 transition-colors">Vows</a>
              <a href="#story" className="hover:text-amber-400 transition-colors">Our Voyage</a>
              <a href="#schedule" className="hover:text-amber-400 transition-colors">Itinerary</a>
              <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
              <a href="#venue" className="hover:text-amber-400 transition-colors">Coordinates</a>
              {mergedData.rsvpEnabled && (
                <a href="#rsvp" className="hover:text-amber-400 transition-colors px-3 py-1 border border-amber-500/20 rounded-full bg-amber-500/10">RSVP</a>
              )}
            </nav>
          </div>
        </header>
      )}

      {/* Main Page Content */}
      {}
      {hasSailed && (
        <main className="space-y-0">
          
          {/* Animated Hero Header */}
          <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              {isDarkMode ? (
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950">
                  <div className="absolute bottom-[20%] left-0 w-full h-[30%] bg-gradient-to-t from-amber-600/25 via-pink-900/10 to-transparent blur-3xl pointer-events-none"></div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-sky-100 to-white">
                  <div className="absolute bottom-[20%] left-0 w-full h-[30%] bg-gradient-to-t from-orange-200/40 via-sky-200/10 to-transparent blur-3xl pointer-events-none"></div>
                </div>
              )}
              
              <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <img 
                  src={mergedData.heroImage || "image_8f0740.png"} 
                  alt="Scenic Ocean Sunset" 
                  className="w-full h-full object-cover scale-105 transform translate-y-10 transition-transform duration-[6000ms]"
                />
              </div>

              {/* Sailing yacht animation silhouette */}
              <div className="absolute bottom-[130px] right-[10%] md:right-[22%] z-20 animate-float-yacht pointer-events-none">
                <svg className="w-24 md:w-40 h-auto opacity-75 drop-shadow-2xl" viewBox="0 0 200 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 10 100 C 60 101 140 101 190 100 C 180 85 160 85 145 85 L 145 65 L 165 75 C 165 75 160 55 145 55 L 145 25 L 125 15 L 125 55 L 105 45 L 105 85 L 50 85 L 35 100 Z" fill={isDarkMode ? "#0d1b2a" : "#475569"} />
                  <line x1="125" y1="15" x2="125" y2="105" stroke={isDarkMode ? "rgba(251,191,36,0.4)" : "rgba(245,158,11,0.3)"} strokeWidth="1.5" />
                </svg>
              </div>

              <WaveBackground />
            </div>

            <div className="relative z-20 text-center px-6 max-w-4xl pt-24 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center animate-spin-slow mb-4 bg-slate-900/40">
                <Compass className="w-5 h-5 text-amber-500" />
              </div>

              <span className="text-[9px] md:text-xs uppercase tracking-[0.4em] text-amber-500 font-cinzel font-bold mb-3">
                Together we raise our sails
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-7xl font-cinzel font-black tracking-widest text-gold-gradient leading-none mb-3">
                {mergedData.brideName?.split(" ")[0]} <br />
                <span className="text-2xl sm:text-3xl md:text-4xl font-playfair font-normal italic lowercase text-slate-300 my-1 block">&</span>
                {mergedData.groomName?.split(" ")[0]}
              </h2>

              <p className="font-playfair text-sm sm:text-lg text-slate-300 italic max-w-lg mx-auto my-4 leading-relaxed">
                "Together we embark on a lifetime cruise across uncharted tides, bound by deep winds and beautiful harbors."
              </p>

              {/* Countdown panel */}
              {mergedData.enableCountdown && (
                <div className="w-full max-w-md mt-4">
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {[
                      { label: "Days", value: countdownTime.days },
                      { label: "Hours", value: countdownTime.hours },
                      { label: "Mins", value: countdownTime.minutes },
                      { label: "Secs", value: countdownTime.seconds }
                    ].map((unit, i) => (
                      <div key={i} className="flex flex-col items-center bg-slate-950/70 backdrop-blur-md rounded-xl p-2.5 border border-white/5 shadow-md">
                        <span className="text-lg sm:text-2xl font-cinzel text-amber-400 font-bold tracking-widest mb-0.5">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                        <span className="text-[7px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Love Story Segment */}
          {}
          <section id="story" className={`py-20 px-6 relative z-20 ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-amber-500 font-bold mb-1 block">The Logbook</span>
                <h2 className="text-2xl md:text-4xl font-cinzel text-gold-gradient font-bold tracking-wide mb-3">Our Love Voyage</h2>
                <p className={`font-playfair italic ${isDarkMode ? "text-slate-400" : "text-slate-600"} text-base`}>
                  "The milestones of our beautiful path, written in wind and water."
                </p>
              </div>

              {mergedData.loveStory && mergedData.loveStory.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 rounded-[2rem] p-6 md:p-10 border border-amber-500/10 backdrop-blur-md">
                  
                  <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-video lg:aspect-square shadow-xl">
                    {mergedData.loveStory.map((story: any, idx: number) => (
                      story.image && (
                        <img
                          key={idx}
                          src={story.image}
                          alt={story.title}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform scale-100 ${
                            idx === activeStoryIndex ? "opacity-100 z-10 scale-100" : "opacity-0 -z-10 scale-95"
                          }`}
                        />
                      )
                    ))}

                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-amber-500/20">
                      <Map className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[8px] font-mono tracking-widest text-slate-200">N 43.73° / E 7.42°</span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-between h-full py-2 pl-0 lg:pl-6 text-left">
                    <div className="flex gap-1.5 mb-4">
                      {mergedData.loveStory.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStoryIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            idx === activeStoryIndex ? "w-8 bg-amber-400" : "w-2.5 bg-white/20"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="min-h-[180px]">
                      <span className="text-xs font-cinzel uppercase tracking-[0.2em] text-amber-400 mb-1.5 block">
                        {mergedData.loveStory[activeStoryIndex]?.subtitle || "Voyage Milestone"}
                      </span>
                      <h3 className="text-xl md:text-3xl font-cinzel font-bold text-white mb-3">
                        {mergedData.loveStory[activeStoryIndex]?.title || "A Beautiful Port"}
                      </h3>
                      <p className="font-montserrat leading-relaxed text-xs md:text-sm text-slate-300">
                        {mergedData.loveStory[activeStoryIndex]?.description || "Milestone description..."}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                      <button
                        onClick={() => setActiveStoryIndex(prev => (prev === 0 ? mergedData.loveStory.length - 1 : prev - 1))}
                        className="w-10 h-10 rounded-full border border-amber-400/20 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 text-amber-400 transition-all duration-300 active:scale-95 bg-slate-900/60"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <span className="font-cinzel text-[10px] tracking-widest text-slate-400">
                        Chapter {activeStoryIndex + 1} of {mergedData.loveStory.length}
                      </span>

                      <button
                        onClick={() => setActiveStoryIndex(prev => (prev === mergedData.loveStory.length - 1 ? 0 : prev + 1))}
                        className="w-10 h-10 rounded-full border border-amber-400/20 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 text-amber-400 transition-all duration-300 active:scale-95 bg-slate-900/60"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 italic text-sm">Our story chapters are currently loading...</p>
                </div>
              )}
            </div>
          </section>

          {/* Coastal Schedule & Itinerary */}
          {}
          <section id="schedule" className={`py-20 px-6 relative z-20 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}>
            <div className="max-w-5xl mx-auto">
              
              <div className="text-center max-w-xl mx-auto mb-16">
                <Anchor className="w-6 h-6 text-amber-500 mx-auto mb-3 animate-bounce" />
                <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-amber-500 font-bold block mb-1">Itinerary Details</span>
                <h2 className="text-2xl md:text-4xl font-cinzel text-gold-gradient font-bold tracking-wide mb-3">Sailing Schedule</h2>
                <p className={`font-playfair italic ${isDarkMode ? "text-slate-400" : "text-slate-600"} text-base`}>
                  "The coordinates and timing for our elegant coastal celebrations."
                </p>
              </div>

              {mergedData.schedule && mergedData.schedule.length > 0 ? (
                <div className="relative border-l border-amber-500/20 ml-3 md:ml-12 md:left-1/2 md:-translate-x-1/2">
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-amber-500/60 via-yellow-400/30 to-transparent hidden md:block md:left-1/2 md:-translate-x-1/2"></div>

                  {mergedData.schedule.map((item: any, index: number) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div 
                        key={index} 
                        className={`relative mb-10 md:mb-14 md:w-1/2 ${
                          isEven ? "md:left-0 md:pr-10 text-left" : "md:left-1/2 md:pl-10 text-left"
                        }`}
                      >
                        <div className="absolute -left-[20px] md:left-auto md:right-0 top-1 md:translate-x-1/2 flex items-center justify-center z-10">
                          <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400 shadow-md flex items-center justify-center text-amber-400">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="ml-6 md:ml-0 glass-premium rounded-2xl p-5 md:p-6 hover:border-amber-400/40 transition-all duration-300 shadow-lg relative overflow-hidden bg-slate-900/70">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-500 to-yellow-600"></div>
                          
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-2 pl-2">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                              {item.time}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-cinzel font-bold text-white mb-1.5 pl-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-xs leading-relaxed text-slate-300 pl-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 italic text-sm">The timeline is being configured...</p>
                </div>
              )}

            </div>
          </section>

          {/* Luxury Gallery Grid */}
          {}
          {mergedData.showGallery && (
          <section id="gallery" className={`py-20 px-6 relative z-20 ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-amber-500 font-bold block mb-1">Visual Log</span>
                <h2 className="text-2xl md:text-4xl font-cinzel text-gold-gradient font-bold tracking-wide mb-3">Sailing Memories</h2>
                <p className={`font-playfair italic ${isDarkMode ? "text-slate-400" : "text-slate-600"} text-base`}>
                  "Moments captured along our coastal voyages under clear skies."
                </p>
              </div>

              {mergedData.gallery && mergedData.gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {mergedData.gallery.map((image: string, index: number) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedGalleryImg(image)}
                      className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-md border border-white/5 bg-slate-900 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-amber-400/10"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                        <span className="text-[10px] font-cinzel tracking-widest text-amber-400 uppercase mb-0.5">Maritime Journal</span>
                        <h4 className="text-xs font-cinzel font-bold text-white flex items-center gap-1.5">
                          Enlarge Log <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        </h4>
                      </div>

                      <img 
                        src={image} 
                        alt={`Sailing Gallery ${index + 1}`} 
                        className="w-full h-full object-cover transition-all duration-1000 transform scale-100 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 italic text-sm">Gallery images will display here.</p>
                </div>
              )}

            </div>
          </section>
          )}

          {selectedGalleryImg && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedGalleryImg(null)}
            >
              <div className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-xl border border-amber-500/20 glass-premium">
                <button 
                  onClick={() => setSelectedGalleryImg(null)}
                  className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5 hover:bg-amber-400 hover:text-slate-950 transition-all z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <img 
                  src={selectedGalleryImg} 
                  alt="Expanded nautical moment" 
                  className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Dynamic Radar Coordinates Map */}
          {}
          <section id="venue" className={`py-20 px-6 relative z-20 overflow-hidden ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}>
            <div className="max-w-7xl mx-auto">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-5 text-left space-y-5">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400">
                    <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Embarkation Coordinates</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-cinzel text-gold-gradient font-bold tracking-wide">
                    The Yacht Harbor Venue
                  </h2>

                  <p className="text-xs leading-relaxed text-slate-300">
                    Our celebrations will commence at Pier 77. Standard dock transfers, coastal winds, and panoramic sunset sails are perfectly catered to. Please read details below to correctly locate our anchor point.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-cinzel uppercase tracking-wider text-white">Anchor Location</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{mergedData.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Map className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-cinzel uppercase tracking-wider text-white">Pier Address</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{mergedData.address}</p>
                      </div>
                    </div>
                  </div>

                  {mergedData.mapLink && (
                    <a 
                      href={mergedData.mapLink}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-cinzel text-[10px] tracking-widest font-bold hover:shadow-lg hover:scale-102 transition-all mt-3"
                    >
                      <Compass className="w-3.5 h-3.5" /> OPEN CHART NAVIGATION
                    </a>
                  )}
                </div>

                <div className="lg:col-span-7 relative h-[340px] rounded-[2rem] overflow-hidden shadow-xl border border-amber-500/20 glass-premium group">
                  <div className="absolute inset-0 bg-[#061021]">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-amber-500/10 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border border-amber-500/5 flex items-center justify-center animate-spin-slow">
                        <div className="w-32 h-32 rounded-full border border-dashed border-amber-500/10"></div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="relative inline-block">
                        <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping"></span>
                        <div className="relative w-7 h-7 rounded-full bg-amber-500 border border-white flex items-center justify-center text-xs shadow-md">
                          ⚓
                        </div>
                      </div>
                      
                      <div className="mt-3 glass-premium p-3 rounded-lg border border-amber-400/30 shadow-lg max-w-xs text-left">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-amber-300 font-bold">Harbor Coordinates</span>
                        <h4 className="text-[10px] font-cinzel text-white font-bold mt-0.5">{mergedData.venue}</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5">{mergedData.address}</p>
                      </div>
                    </div>

                    <div className="absolute bottom-3 right-3 text-amber-400/40 text-[9px] font-mono text-right">
                      <div>WIND DIRECTION: NE 12 KNOTS</div>
                      <div>SEA TIDES: SECURE DECK HIGH</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Interactive RSVP Form */}
          {}
          {mergedData.rsvpEnabled && (
            <section id="rsvp" className={`py-20 px-6 relative z-20 overflow-hidden ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
              <div className="max-w-4xl mx-auto">
                
                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-amber-500 font-bold block mb-1">Cabin Registry</span>
                  <h2 className="text-2xl md:text-4xl font-cinzel text-gold-gradient font-bold tracking-wide mb-3">Confirm Boarding Pass</h2>
                  <p className={`font-playfair italic ${isDarkMode ? "text-slate-400" : "text-slate-600"} text-base`}>
                    "Please submit your details below to secure your cabin registry state."
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  <div className="md:col-span-7 glass-premium rounded-3xl p-5 md:p-6 border border-amber-500/20 shadow-xl bg-slate-900/50">
                    <form onSubmit={handleRsvpSubmit} className="space-y-3.5 text-left">
                      
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-slate-300 font-cinzel font-bold mb-1">Passholder Full Name</label>
                        <input
                          type="text"
                          required
                          value={newRsvp.name}
                          onChange={(e) => setNewRsvp({...newRsvp, name: e.target.value})}
                          placeholder="Guest Signature / Captain Name"
                          className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white font-medium text-xs focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-slate-300 font-cinzel font-bold mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            value={newRsvp.email}
                            onChange={(e) => setNewRsvp({...newRsvp, email: e.target.value})}
                            placeholder="sailor@maritime.com"
                            className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white font-medium text-xs focus:outline-none focus:border-amber-400 transition"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-slate-300 font-cinzel font-bold mb-1">Cabin Size (Guests)</label>
                          <select
                            value={newRsvp.guests}
                            onChange={(e) => setNewRsvp({...newRsvp, guests: Number(e.target.value)})}
                            className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white font-medium text-xs focus:outline-none focus:border-amber-400 transition"
                          >
                            <option value="1" className="bg-slate-950 text-white">Just Myself (1)</option>
                            <option value="2" className="bg-slate-950 text-white">Crew Duo (2)</option>
                            <option value="3" className="bg-slate-950 text-white">Crew Trio (3)</option>
                            <option value="4" className="bg-slate-950 text-white">Crew Quad (4)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-slate-300 font-cinzel font-bold mb-1">Boarding Choice</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setNewRsvp({...newRsvp, status: "attending"})}
                            className={`px-3 py-2 rounded-xl border font-cinzel text-[9px] tracking-widest uppercase font-bold transition ${
                              newRsvp.status === "attending"
                                ? "bg-gradient-to-r from-amber-600 to-amber-500 border-amber-400 text-slate-950 shadow-md"
                                : "bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20"
                            }`}
                          >
                            Boarding (Attending)
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setNewRsvp({...newRsvp, status: "declined"})}
                            className={`px-3 py-2 rounded-xl border font-cinzel text-[9px] tracking-widest uppercase font-bold transition ${
                              newRsvp.status === "declined"
                                ? "bg-red-950/20 border-red-500 text-red-400 shadow-md"
                                : "bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20"
                            }`}
                          >
                            Regretfully Anchor
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-slate-300 font-cinzel font-bold mb-1">Galley Preference</label>
                        <select
                          value={newRsvp.dietary}
                          onChange={(e) => setNewRsvp({...newRsvp, dietary: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white font-medium text-xs focus:outline-none focus:border-amber-400 transition"
                        >
                          <option value="standard" className="bg-slate-950 text-white">Seafood Delight (Standard)</option>
                          <option value="vegetarian" className="bg-slate-950 text-white">Rustic Coastal Salad (Vegetarian)</option>
                          <option value="vegan" className="bg-slate-950 text-white">Pacific Kelp Roast (Vegan)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-slate-300 font-cinzel font-bold mb-1">Warm Message</label>
                        <textarea
                          rows={2}
                          value={newRsvp.message}
                          onChange={(e) => setNewRsvp({...newRsvp, message: e.target.value})}
                          placeholder="Your blessings for our maritime voyage..."
                          className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-slate-950 font-cinzel font-black tracking-widest text-[10px] shadow-md transition duration-300 flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" /> EMIT DECK PASS
                      </button>

                    </form>
                  </div>

                  <div className="md:col-span-5 space-y-3.5">
                    <div className="glass-premium rounded-3xl p-4 border border-amber-500/10 shadow-lg text-left bg-slate-900/40">
                      <span className="text-[8px] font-mono tracking-widest uppercase text-amber-400 font-bold">Harbor Registry Ledgers</span>
                      <h4 className="text-xs font-cinzel text-white font-bold mt-0.5">Active Deck Passes</h4>
                      
                      <div className="mt-3.5 space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                        {rsvpSubmissions.map((sub, i) => (
                          <div key={i} className="p-2.5 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden text-xs">
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${sub.status === "attending" ? "bg-emerald-400" : "bg-red-400"}`}></span>
                              <span className="text-[7px] font-mono uppercase text-slate-400">{sub.status}</span>
                            </div>
                            <h5 className="font-cinzel text-xs text-white font-bold pr-14">{sub.name}</h5>
                            <p className="text-[8px] text-amber-300/80 mt-0.5">Guests: {sub.guests} | Diet: {sub.dietary}</p>
                            <p className="text-[9px] text-slate-300 italic mt-1 pt-1 border-t border-white/5">"{sub.message}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>
          )}

          {/* Guest Wishes Section */}
          {}
          {mergedData.enableGreetings && (
            <section id="guestbook" className={`py-20 px-6 relative z-20 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}>
              <div className="max-w-5xl mx-auto">
                
                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-amber-500 font-bold block mb-1">Message Lanterns</span>
                  <h2 className="text-2xl md:text-4xl font-cinzel text-gold-gradient font-bold tracking-wide mb-3">Release a Wish</h2>
                  <p className={`font-playfair italic ${isDarkMode ? "text-slate-400" : "text-slate-600"} text-base`}>
                    "Release a glowing sky wish lantern into our celestial guestbook ocean."
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  <div className="md:col-span-5 glass-premium rounded-3xl p-5 border border-amber-500/20 shadow-lg text-left bg-slate-900/50">
                    <span className="text-[8px] font-mono tracking-widest text-amber-300 uppercase font-bold">Sea Ledger</span>
                    <h3 className="text-sm font-cinzel text-white font-bold mt-0.5 mb-3">Write Your Blessing</h3>
                    
                    <form onSubmit={handleAddGreeting} className="space-y-3">
                      <div>
                        <label className="block text-[8px] uppercase tracking-widest text-slate-300 font-cinzel mb-0.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newGreeting.author}
                          onChange={(e) => setNewGreeting({...newGreeting, author: e.target.value})}
                          placeholder="Your Signature"
                          className="w-full px-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] uppercase tracking-widest text-slate-300 font-cinzel mb-0.5">Blessing Message</label>
                        <textarea
                          rows={3}
                          required
                          value={newGreeting.message}
                          onChange={(e) => setNewGreeting({...newGreeting, message: e.target.value})}
                          placeholder="May your beautiful marriage voyage carry absolute gold..."
                          className="w-full px-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-cinzel font-bold text-[9px] tracking-widest shadow-md hover:bg-amber-400 transition duration-300 flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" /> CAST WISH LANTERN
                      </button>
                    </form>
                  </div>

                  <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {greetings.map((wish, index) => (
                      <div 
                        key={index} 
                        className="glass-premium p-4 rounded-2xl border border-white/5 relative overflow-hidden group shadow-md text-left bg-slate-900/30"
                      >
                        <div className="absolute -top-8 -right-8 w-16 h-16 bg-amber-400/5 rounded-full blur-xl group-hover:bg-amber-400/10 transition-all"></div>
                        
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="font-cinzel text-xs text-white font-bold flex items-center gap-1">
                            <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {wish.author}
                          </span>
                          <span className="text-[7px] font-mono text-slate-400">{wish.date}</span>
                        </div>

                        <p className="text-[11px] font-playfair italic text-slate-200 leading-relaxed">
                          "{wish.message}"
                        </p>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </section>
          )}

          {/* Registry Segment */}
          <section className={`py-14 px-6 relative z-20 ${isDarkMode ? "bg-slate-950" : "bg-white"} border-t border-white/5`}>
            <div className="max-w-3xl mx-auto text-center">
              <Gift className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="text-xl font-cinzel text-white font-bold tracking-wider mb-2">The Maritime Registry Chest</h3>
              <p className="font-playfair italic text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-4">
                "Sharing this special voyage with you is our absolute treasure. For those wishing to contribute to our future harbors, a dedicated deck chest will be placed at the reception."
              </p>
              <span className="text-[9px] uppercase tracking-widest font-mono text-amber-400 border border-amber-500/20 rounded-full px-3 py-1 bg-amber-500/5 inline-block">
                Registry: Aurelia & Julian Voyage Fund
              </span>
            </div>
          </section>

          {/* Footer Navigation */}
          {}
          <footer className="relative z-20 bg-slate-950 text-white py-14 px-6 border-t border-amber-500/15">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
              
              <div className="w-12 h-12 rounded-full border border-amber-400 flex items-center justify-center mb-4">
                <Anchor className="w-6 h-6 text-amber-400" />
              </div>

              <h2 className="text-xl md:text-3xl font-cinzel font-extrabold tracking-widest text-gold-gradient mb-2">
                {mergedData.brideName?.split(" ")[0]} & {mergedData.groomName?.split(" ")[0]}
              </h2>

              <p className="font-playfair text-slate-400 italic text-xs max-w-xs text-center mb-4 leading-relaxed">
                "A ship in harbor is safe, but that is not what ships are built for."
              </p>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4"></div>

              <span className="text-[8px] font-mono tracking-widest uppercase text-slate-500 text-center">
                @entephoto.co.in
              </span>

              

            </div>
          </footer>

        </main>
      )}

    </div>
  );
}