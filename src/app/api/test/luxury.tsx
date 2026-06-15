"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Camera, 
  MessageSquare, 
  Menu, 
  X, 
  Gift, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX, 
  Mail, 
  Users, 
  Check,
  Send,
  Info
} from 'lucide-react';

// --- STYLING CONSTANTS & ASSETS ---
const COLOR_PALETTE = {
  ivory: 'bg-[#FCFBF7]',
  softBeige: 'bg-[#F5F2EB]',
  champagneGold: 'text-[#C5A880]',
  goldBorder: 'border-[#C5A880]/30',
  goldHover: 'hover:border-[#C5A880]',
  goldBg: 'bg-[#C5A880]',
  darkSlate: 'text-[#2C2A29]',
  mutedText: 'text-[#615E58]',
};

// Royal Filigree SVG Decorator
const RoyalDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8 opacity-80">
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent" />
    <svg className="w-8 h-8 text-[#C5A880]" viewBox="0 0 100 100" fill="currentColor">
      <path d="M50,15 C40,30 20,40 20,50 C20,65 35,70 50,85 C65,70 80,65 80,50 C80,40 60,30 50,15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" className="animate-pulse" />
      <path d="M30,50 C40,48 45,45 50,35 C55,45 60,48 70,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#C5A880] to-transparent" />
  </div>
);

// High-end placeholder or thematic images
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
  story1: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800", // First Meeting
  story2: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800", // The Proposal
  story3: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800", // Ring / Engagement
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800"
  ],
  bridesmaids: [
    { name: "Eleanor Sterling", role: "Maid of Honor", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500" },
    { name: "Genevieve Thorne", role: "Bridesmaid", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500" },
    { name: "Victoria Sinclair", role: "Bridesmaid", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=500" },
  ],
  groomsmen: [
    { name: "Alistair Vance", role: "Best Man", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500" },
    { name: "Maximilian Roth", role: "Groomsman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500" },
    { name: "Sebastian Sterling", role: "Groomsman", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500" },
  ]
};

export default function App() {
  // Navigation State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Gallery Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // RSVP Form State
  const [rsvpData, setRsvpData] = useState({
    fullName: '',
    email: '',
    attendance: 'attending',
    guests: '1',
    mealPreference: 'standard',
    dietaryRestrictions: '',
    songRequest: '',
    message: ''
  });
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);

  // Guest Wishes State
  const [wishes, setWishes] = useState([
    { name: "Lord & Lady Kensington", date: "June 12, 2026", text: "To a union graced with absolute beauty. May your chapters ahead be filled with eternal romance and harmony." },
    { name: "The Montgomery Family", date: "June 14, 2026", text: "Wishing you both a lifetime of grandeur and pure joy. We cannot wait to raise a glass to your beautiful love story!" },
    { name: "Dr. Evelyn Pierre", date: "June 15, 2026", text: "Simply magnificent. Two wonderful souls destined for eternity. Sending all my warmest blessings." }
  ]);
  const [newWishName, setNewWishName] = useState('');
  const [newWishText, setNewWishText] = useState('');

  // Audio setup
  useEffect(() => {
    // Royalty-free smooth ambient wedding piano
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play deferred for user interaction."));
    }
    setIsPlaying(!isPlaying);
  };

  // Target Date: December 18, 2026 at 4:00 PM
  useEffect(() => {
    const targetDate = new Date("December 18, 2026 16:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.fullName || !rsvpData.email) return;
    setIsRsvpSubmitted(true);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishName.trim() || !newWishText.trim()) return;
    
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    setWishes([
      { name: newWishName, date: today, text: newWishText },
      ...wishes
    ]);
    setNewWishName('');
    setNewWishText('');
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % IMAGES.gallery.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + IMAGES.gallery.length) % IMAGES.gallery.length);
    }
  };

  return (
    <div className={`min-h-screen ${COLOR_PALETTE.ivory} ${COLOR_PALETTE.darkSlate} font-sans relative overflow-x-hidden antialiased selection:bg-[#C5A880]/30 selection:text-[#2C2A29]`}>
      
      {/* Decorative Custom CSS Elements */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        
        .font-cinzel {
          font-family: 'Cinzel', Georgia, serif;
        }
        .font-playfair {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-sans {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        /* Premium Soft Gold Shimmer */
        @keyframes gold-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .gold-shimmer-text {
          background: linear-gradient(90deg, #9F825B 0%, #D8C3A5 25%, #9F825B 50%, #D8C3A5 75%, #9F825B 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gold-shimmer 8s linear infinite;
        }

        /* Ambient subtle gold floating particles */
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(197,168,128,0.7) 0%, rgba(197,168,128,0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      {/* Floating Audio Toggle - Elegant Miniature Visualizer */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button 
          onClick={toggleMusic}
          className="bg-white/80 backdrop-blur-md border border-[#C5A880]/50 p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 group flex items-center gap-2"
          aria-label="Toggle Background Music"
        >
          {isPlaying ? (
            <div className="flex gap-[2px] items-end h-4 w-4">
              <span className="w-[2px] bg-[#C5A880] animate-bounce" style={{ animationDuration: '0.6s' }}></span>
              <span className="w-[2px] bg-[#C5A880] animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.1s' }}></span>
              <span className="w-[2px] bg-[#C5A880] animate-bounce" style={{ animationDuration: '0.5s', animationDelay: '0.2s' }}></span>
              <span className="w-[2px] bg-[#C5A880] animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.3s' }}></span>
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-[#C5A880]" />
          )}
          <span className="text-xs font-cinzel text-[#8A704C] max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 whitespace-nowrap">
            {isPlaying ? "Mute Melody" : "Play Melody"}
          </span>
        </button>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-[#C5A880]/15 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Monogram */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="font-cinzel text-xl md:text-2xl tracking-[0.25em] font-medium text-[#2C2A29] group-hover:text-[#C5A880] transition-colors">
              H <span className="text-xs align-super text-[#C5A880] font-light">&</span> M
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Our Story', 'Timeline', 'Schedule', 'Gallery', 'Venue', 'RSVP', 'Wishes'].map((sec) => {
              const id = sec.toLowerCase().replace(' ', '');
              return (
                <a
                  key={sec}
                  href={`#${id}`}
                  onClick={() => setActiveSection(id)}
                  className={`font-cinzel text-xs tracking-widest uppercase transition-colors relative py-2 ${
                    activeSection === id ? 'text-[#C5A880]' : 'text-[#615E58] hover:text-[#C5A880]'
                  }`}
                >
                  {sec}
                  {activeSection === id && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[#C5A880]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Navigation CTA */}
          <a 
            href="#rsvp" 
            className="hidden lg:inline-flex items-center justify-center font-cinzel text-xs tracking-[0.2em] uppercase border border-[#C5A880] text-[#2C2A29] hover:bg-[#C5A880] hover:text-white px-5 py-2.5 rounded-sm transition-all duration-500"
          >
            RSVP NOW
          </a>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#2C2A29] hover:text-[#C5A880] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 border-b border-[#C5A880]/30 backdrop-blur-lg animate-fade-in">
            <nav className="flex flex-col items-center gap-5 py-8">
              {['Home', 'Our Story', 'Timeline', 'Schedule', 'Gallery', 'Venue', 'RSVP', 'Wishes'].map((sec) => {
                const id = sec.toLowerCase().replace(' ', '');
                return (
                  <a
                    key={sec}
                    href={`#${id}`}
                    onClick={() => {
                      setActiveSection(id);
                      setIsMenuOpen(false);
                    }}
                    className="font-cinzel text-sm tracking-widest uppercase text-[#2C2A29] hover:text-[#C5A880] transition-colors"
                  >
                    {sec}
                  </a>
                );
              })}
              <a 
                href="#rsvp" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 font-cinzel text-xs tracking-[0.2em] uppercase bg-[#C5A880] text-white px-6 py-3 rounded-sm hover:bg-[#b0936d] transition-all"
              >
                RSVP NOW
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Fullscreen Hero Background Image with Premium Dark/Warm Gold Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="The Happy Couple" 
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_8s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A19]/70 via-[#2C2A29]/80 to-[#1C1A19]" />
          
          {/* Elegant Moving Gold Ornaments */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full border border-[#C5A880]/40 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full border border-[#C5A880]/30 animate-reverse-spin" style={{ animationDuration: '50s' }} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white flex flex-col items-center mt-8">
          
          {/* Celestial / Royal Crest Motif */}
          <div className="mb-6 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full border border-[#C5A880] flex items-center justify-center p-2 backdrop-blur-sm bg-[#1a1817]/40">
              <span className="font-cinzel text-2xl text-[#C5A880] tracking-widest">HM</span>
            </div>
          </div>

          <p className="font-cinzel text-xs md:text-sm tracking-[0.4em] uppercase text-[#D8C3A5] mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            The Honour of Your Presence is Requested
          </p>

          {/* Names of Bride & Groom */}
          <h1 className="font-playfair text-5xl md:text-8xl font-light tracking-wide mb-6 leading-tight select-none">
            <span className="block italic text-[#FAF9F5]">Helena Marie</span>
            <span className="font-cinzel text-xl md:text-3xl block my-2 gold-shimmer-text tracking-[0.3em] uppercase">AND</span>
            <span className="block italic text-[#FAF9F5]">Mateo Sterling</span>
          </h1>

          <p className="font-cinzel text-sm md:text-lg tracking-[0.25em] text-[#D8C3A5]/90 max-w-xl mx-auto mb-10 leading-relaxed border-t border-b border-[#C5A880]/30 py-3">
            DECEMBER 18, 2026 • PARIS, FRANCE
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a 
              href="#rsvp" 
              className="bg-gradient-to-r from-[#C5A880] to-[#E3CBB0] text-[#1E1A14] font-cinzel text-xs tracking-[0.25em] uppercase font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-[#C5A880]/30 hover:scale-105 transition-all duration-300"
            >
              Request RSVP
            </a>
            <a 
              href="#ourstory" 
              className="border border-white/40 backdrop-blur-sm text-white font-cinzel text-xs tracking-[0.25em] uppercase py-4 px-8 rounded-full hover:bg-white hover:text-[#2C2A29] transition-all duration-300"
            >
              Our Story
            </a>
          </div>

          {/* Scrolling Arrow */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 animate-bounce">
            <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#D8C3A5]">Explore</span>
            <div className="w-[1px] h-10 bg-[#C5A880]" />
          </div>
        </div>
      </section>

      {/* COUNTDOWN TIMER SECTION */}
      <section className="py-16 bg-[#1a1817] text-white border-b border-[#C5A880]/20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880]">The Royal Celebration Begins In</span>
          </div>

          {/* Timer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-3xl mx-auto">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((unit, idx) => (
              <div 
                key={idx} 
                className="bg-[#242120] border border-[#C5A880]/20 rounded-lg p-6 flex flex-col justify-center items-center relative overflow-hidden group"
              >
                {/* Decorative Inner Corner Accents */}
                <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#C5A880]/50" />
                <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#C5A880]/50" />
                <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#C5A880]/50" />
                <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#C5A880]/50" />
                
                <span className="font-cinzel text-3xl md:text-5xl font-light text-[#E3CBB0] mb-1 tracking-wider">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-cinzel text-[10px] tracking-widest text-[#9A958D]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIDE & GROOM PROFILE */}
      <section id="ourstory" className={`py-24 ${COLOR_PALETTE.softBeige} relative overflow-hidden`}>
        {/* Fine gold borders wrapping the section content */}
        <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#C5A880]/20 pointer-events-none hidden lg:block" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">The Happy Couple</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">Meet Helena & Mateo</h2>
            <RoyalDivider />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* The Bride */}
            <div className="bg-white p-8 md:p-12 rounded-lg border border-[#C5A880]/20 shadow-xl relative group">
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C5A880]/50" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C5A880]/50" />
              
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#C5A880]/30">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                  alt="Helena Marie" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <span className="font-cinzel text-[#C5A880] text-xs tracking-widest uppercase block mb-1">The Bride</span>
                <h3 className="font-playfair text-2xl font-semibold mb-4 text-[#2C2A29]">Helena Marie Sterling</h3>
                <p className="font-sans text-sm leading-relaxed text-[#615E58]">
                  An artist of timeless aesthetics, Helena paints world narratives with grace and passion. Raised in the romantic lanes of Florence, her heart found its true north in Paris alongside Mateo, the anchor to her brilliant ocean of dreams.
                </p>
                <div className="mt-6 inline-flex gap-4 text-[#C5A880]">
                  <span className="h-[1px] w-8 bg-[#C5A880]/50 self-center"></span>
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                  <span className="h-[1px] w-8 bg-[#C5A880]/50 self-center"></span>
                </div>
              </div>
            </div>

            {/* The Groom */}
            <div className="bg-white p-8 md:p-12 rounded-lg border border-[#C5A880]/20 shadow-xl relative group">
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C5A880]/50" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C5A880]/50" />
              
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#C5A880]/30">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Mateo Sterling" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <span className="font-cinzel text-[#C5A880] text-xs tracking-widest uppercase block mb-1">The Groom</span>
                <h3 className="font-playfair text-2xl font-semibold mb-4 text-[#2C2A29]">Mateo Sterling</h3>
                <p className="font-sans text-sm leading-relaxed text-[#615E58]">
                  With an architectural mind and a romantic soul, Mateo shapes elegance into structure. Deeply inspired by heritage, his ultimate monument and masterpiece was defined the afternoon he first met Helena beneath Paris' golden autumn skies.
                </p>
                <div className="mt-6 inline-flex gap-4 text-[#C5A880]">
                  <span className="h-[1px] w-8 bg-[#C5A880]/50 self-center"></span>
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                  <span className="h-[1px] w-8 bg-[#C5A880]/50 self-center"></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR LOVE STORY TIMELINE */}
      <section id="timeline" className={`py-24 ${COLOR_PALETTE.ivory} relative`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">Our Journey</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">How It All Began</h2>
            <RoyalDivider />
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-[#C5A880]/30 md:border-l-0 md:grid md:grid-cols-2 md:gap-x-12 ml-4 md:ml-0 before:absolute before:content-[''] before:w-[1.5px] before:bg-gradient-to-b before:from-[#C5A880] before:to-[#E3CBB0] before:top-0 before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:hidden md:before:block">
            
            {/* Event 1 */}
            <div className="relative mb-16 md:mb-24 md:text-right md:pr-12 md:col-start-1">
              {/* Dot decoration */}
              <div className="absolute -left-[29px] top-1 md:left-auto md:right-[-43px] w-8 h-8 rounded-full bg-[#FCFBF7] border-2 border-[#C5A880] flex items-center justify-center z-10 shadow-lg">
                <span className="w-3.5 h-3.5 rounded-full bg-[#C5A880] animate-pulse" />
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-[#C5A880]/20 shadow-md hover:shadow-xl transition-all duration-300">
                <span className="font-cinzel text-xs text-[#C5A880] tracking-widest font-semibold block mb-2">OCTOBER 12, 2023</span>
                <h3 className="font-playfair text-xl mb-3 text-[#2C2A29]">First Glance in Paris</h3>
                <p className="font-sans text-sm text-[#615E58] leading-relaxed mb-4">
                  Fate aligned during a gentle autumn afternoon at a rustic café overlooking the Seine. A dropped sketchbook, shared laughter, and an unspoken connection kindled the light of an enduring love.
                </p>
                <div className="rounded overflow-hidden h-48 w-full border border-stone-100">
                  <img src={IMAGES.story1} alt="Paris First Glance" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative mb-16 md:mb-24 md:pt-12 md:pl-12 md:col-start-2">
              {/* Dot decoration */}
              <div className="absolute -left-[29px] top-1 md:left-[-41px] w-8 h-8 rounded-full bg-[#FCFBF7] border-2 border-[#C5A880] flex items-center justify-center z-10 shadow-lg">
                <span className="w-3.5 h-3.5 rounded-full bg-[#C5A880] animate-pulse" />
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#C5A880]/20 shadow-md hover:shadow-xl transition-all duration-300">
                <span className="font-cinzel text-xs text-[#C5A880] tracking-widest font-semibold block mb-2">AUGUST 24, 2024</span>
                <h3 className="font-playfair text-xl mb-3 text-[#2C2A29]">The Beautiful Proposal</h3>
                <p className="font-sans text-sm text-[#615E58] leading-relaxed mb-4">
                  Surrounded by a private garden of white roses in the heart of Provence, Mateo knelt beneath a grand starry sky. Time paused, and with joyous tears, Helena spoke the most meaningful "Yes."
                </p>
                <div className="rounded overflow-hidden h-48 w-full border border-stone-100">
                  <img src={IMAGES.story2} alt="The Proposal" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative mb-12 md:text-right md:pr-12 md:col-start-1">
              {/* Dot decoration */}
              <div className="absolute -left-[29px] top-1 md:left-auto md:right-[-43px] w-8 h-8 rounded-full bg-[#FCFBF7] border-2 border-[#C5A880] flex items-center justify-center z-10 shadow-lg">
                <span className="w-3.5 h-3.5 rounded-full bg-[#C5A880] animate-pulse" />
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#C5A880]/20 shadow-md hover:shadow-xl transition-all duration-300">
                <span className="font-cinzel text-xs text-[#C5A880] tracking-widest font-semibold block mb-2">DECEMBER 18, 2026</span>
                <h3 className="font-playfair text-xl mb-3 text-[#2C2A29]">The Royal Beginning</h3>
                <p className="font-sans text-sm text-[#615E58] leading-relaxed mb-4">
                  The day our paths merge forever. With your presence, laughter, and support, we step into the grand adventure of eternity.
                </p>
                <div className="rounded overflow-hidden h-48 w-full border border-stone-100">
                  <img src={IMAGES.story3} alt="Wedding Rings" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WEDDING SCHEDULE */}
      <section id="schedule" className={`py-24 ${COLOR_PALETTE.softBeige} relative overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">Our Schedule</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">The Order of Events</h2>
            <RoyalDivider />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Event 1 */}
            <div className="bg-white p-8 rounded-lg border border-[#C5A880]/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#FCFBF7] rounded-full flex items-center justify-center mb-6 border border-[#C5A880]/30 mx-auto">
                  <Heart className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div className="text-center mb-6">
                  <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase bg-[#C5A880]/10 text-[#C5A880] px-3 py-1 rounded-full">
                    Ceremony
                  </span>
                  <h3 className="font-playfair text-2xl font-semibold text-[#2C2A29] mt-3 mb-1">The Holy Vows</h3>
                  <p className="font-sans text-xs text-[#9A958D] tracking-wider font-semibold">4:00 PM — 5:00 PM</p>
                </div>
                <hr className="border-[#C5A880]/20 my-4" />
                <p className="font-sans text-sm text-[#615E58] text-center leading-relaxed">
                  Join us as we declare our sacred oaths in the historic halls of Notre-Dame des Victoires with breathtaking string accompaniment.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-stone-200 text-center">
                <span className="font-cinzel text-xs tracking-wider text-[#C5A880]">Chic & Elegant Attire</span>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-[#FAF9F5] p-8 rounded-lg border-2 border-[#C5A880] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative flex flex-col justify-between group">
              {/* Highlight badge for reception */}
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#C5A880] text-white text-[9px] font-cinzel tracking-widest uppercase px-4 py-1.5 rounded-full shadow">
                Highly Recommended
              </div>
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 border border-[#C5A880] mx-auto">
                  <Clock className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div className="text-center mb-6">
                  <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase bg-[#C5A880] text-white px-3 py-1 rounded-full">
                    Festivities
                  </span>
                  <h3 className="font-playfair text-2xl font-semibold text-[#2C2A29] mt-3 mb-1">The Grand Toast</h3>
                  <p className="font-sans text-xs text-[#C5A880] tracking-wider font-semibold">5:30 PM — 7:30 PM</p>
                </div>
                <hr className="border-[#C5A880]/30 my-4" />
                <p className="font-sans text-sm text-[#615E58] text-center leading-relaxed">
                  Enjoy gourmet appetizers, gold-plated cocktails, and rare vintage wines while taking in grand panoramic views of the scenic gardens.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-[#C5A880]/30 text-center">
                <span className="font-cinzel text-xs tracking-wider text-[#C5A880]">Sunset Garden Courtyard</span>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-white p-8 rounded-lg border border-[#C5A880]/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#FCFBF7] rounded-full flex items-center justify-center mb-6 border border-[#C5A880]/30 mx-auto">
                  <Calendar className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div className="text-center mb-6">
                  <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase bg-[#C5A880]/10 text-[#C5A880] px-3 py-1 rounded-full">
                    Feasting
                  </span>
                  <h3 className="font-playfair text-2xl font-semibold text-[#2C2A29] mt-3 mb-1">Dinner & Dancing</h3>
                  <p className="font-sans text-xs text-[#9A958D] tracking-wider font-semibold">8:00 PM — Late</p>
                </div>
                <hr className="border-[#C5A880]/20 my-4" />
                <p className="font-sans text-sm text-[#615E58] text-center leading-relaxed">
                  A high culinary dinner experience followed by a beautiful ballroom waltz, premium jazz band, and champagne fireworks at midnight.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-stone-200 text-center">
                <span className="font-cinzel text-xs tracking-wider text-[#C5A880]">Royal Banquet Hall</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section id="gallery" className={`py-24 ${COLOR_PALETTE.ivory} relative`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">Our Portrait Gallery</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">Capturing Moments</h2>
            <RoyalDivider />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMAGES.gallery.map((image, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-[#C5A880]/20 transition-all duration-500"
              >
                {/* Visual Image */}
                <img 
                  src={image} 
                  alt={`Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Accent */}
                <div className="absolute inset-0 bg-[#2C2A29]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="border border-[#C5A880]/60 p-4 rounded-full m-4 scale-75 group-hover:scale-100 transition-transform duration-500 bg-[#2c2a29]/50">
                    <Camera className="w-6 h-6 text-[#C5A880]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIGHTBOX MODAL */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-[#1c1a19]/95 backdrop-blur-md flex items-center justify-center p-4">
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-[#C5A880] transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button 
              onClick={prevLightbox}
              className="absolute left-6 text-white hover:text-[#C5A880] transition-colors focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
              <img 
                src={IMAGES.gallery[lightboxIndex]} 
                alt={`Lightbox Portrait ${lightboxIndex + 1}`} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-[#C5A880]/30 shadow-2xl"
              />
              <span className="font-cinzel text-xs text-[#FAF9F5] tracking-widest uppercase mt-4">
                Portrait {lightboxIndex + 1} of {IMAGES.gallery.length}
              </span>
            </div>

            <button 
              onClick={nextLightbox}
              className="absolute right-6 text-white hover:text-[#C5A880] transition-colors focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>
        )}
      </section>

      {/* WEDDING PARTY */}
      <section className={`py-24 ${COLOR_PALETTE.softBeige} relative`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">The Entourage</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">Wedding Party</h2>
            <RoyalDivider />
          </div>

          <div className="mb-16">
            <h3 className="font-cinzel text-sm tracking-[0.3em] uppercase text-center text-[#C5A880] mb-8">The Bridesmaids</h3>
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {IMAGES.bridesmaids.map((member, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-[#C5A880]/20 text-center shadow-md">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-[#C5A880]/30">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-playfair text-lg font-semibold text-[#2C2A29]">{member.name}</h4>
                  <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#C5A880] block mt-1">{member.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-cinzel text-sm tracking-[0.3em] uppercase text-center text-[#C5A880] mb-8">The Groomsmen</h3>
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {IMAGES.groomsmen.map((member, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-[#C5A880]/20 text-center shadow-md">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-[#C5A880]/30">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-playfair text-lg font-semibold text-[#2C2A29]">{member.name}</h4>
                  <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#C5A880] block mt-1">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VENUE DETAILS & INTERACTIVE MAP */}
      <section id="venue" className={`py-24 ${COLOR_PALETTE.ivory} relative`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">Location & Details</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">The Royal Chateau</h2>
            <RoyalDivider />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
            
            {/* Location Description */}
            <div className="bg-white p-8 md:p-12 rounded-lg border border-[#C5A880]/20 shadow-xl flex flex-col justify-between">
              <div>
                <span className="font-cinzel text-xs tracking-widest text-[#C5A880] font-semibold block mb-2">THE DESTINATION</span>
                <h3 className="font-playfair text-3xl font-light text-[#2C2A29] mb-6">Château de Grand-Luce</h3>
                <p className="font-sans text-sm text-[#615E58] leading-relaxed mb-6">
                  Set amidst spectacular 18th-century gardens in the heart of Loire Valley, this breathtaking castle stands as the epitome of classic French architecture.
                </p>
                
                {/* Specifics */}
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold">ADDRESS</h4>
                      <p className="font-sans text-sm text-[#615E58]">9 Rue de la Châtaigneraie, 72340 Le Grand-Lucé, France</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Calendar className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold">DATE & TIME</h4>
                      <p className="font-sans text-sm text-[#615E58]">Friday, December 18, 2026, at 4:00 PM CET</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Info className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold">ACCOMMODATION INFO</h4>
                      <p className="font-sans text-sm text-[#615E58]">Suites are fully booked inside the Chateau for closest kin. Excellent guest villas are reserved nearby with dedicated private luxury shuttle services.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#2C2A29] text-white hover:bg-[#C5A880] text-center font-cinzel text-xs tracking-widest uppercase py-3.5 px-6 rounded-md transition-all duration-300 shadow-md"
                >
                  Open in Google Maps
                </a>
                <a 
                  href="#rsvp" 
                  className="border border-[#C5A880] text-[#2C2A29] hover:bg-[#C5A880]/10 text-center font-cinzel text-xs tracking-widest uppercase py-3.5 px-6 rounded-md transition-all duration-300"
                >
                  Confirm Attendance
                </a>
              </div>
            </div>

            {/* Custom Interactive Map Stylization */}
            <div className="bg-[#2C2A29] text-white rounded-lg border border-[#C5A880]/30 shadow-xl overflow-hidden relative min-h-[350px] flex flex-col justify-between">
              
              {/* Premium Map SVG Graphics */}
              <div className="absolute inset-0 opacity-40">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0,100 Q 150,120 300,80 T 600,140" fill="none" stroke="#C5A880" strokeWidth="2" />
                  <path d="M 100,0 Q 120,250 80,500" fill="none" stroke="#C5A880" strokeWidth="1" />
                  <path d="M 400,0 Q 380,200 450,500" fill="none" stroke="#C5A880" strokeWidth="1" />
                  <circle cx="300" cy="80" r="12" fill="#C5A880" className="animate-ping" />
                  <circle cx="300" cy="80" r="6" fill="#C5A880" />
                </svg>
              </div>

              {/* Map Floating Card */}
              <div className="relative z-10 m-6 bg-[#1C1A19]/90 backdrop-blur-md p-6 rounded-lg border border-[#C5A880]/30 max-w-sm">
                <span className="font-cinzel text-[10px] tracking-widest text-[#C5A880] uppercase block mb-1">Chateau de Grand-Luce</span>
                <h4 className="font-playfair text-xl text-white mb-2 font-semibold">Loire Valley Countryside</h4>
                <p className="font-sans text-xs text-[#FAF9F5]/75 leading-relaxed mb-4">
                  Located approximately 2 hours southwest of Paris. High-speed rail transport options are available from Paris Montparnasse to Le Mans Station.
                </p>
                <div className="flex gap-2 text-xs text-[#C5A880]">
                  <Check className="w-4 h-4" />
                  <span>Free Valet Parking Available on Premises</span>
                </div>
              </div>

              {/* Map Legend Footer */}
              <div className="relative z-10 p-6 bg-[#1a1817]/80 border-t border-[#C5A880]/30 flex justify-between items-center text-xs">
                <span className="font-cinzel text-[#FAF9F5]">Coordinate Grid: 47.8649° N, 0.4821° E</span>
                <span className="text-[#C5A880] animate-pulse">● Destination Hub</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* RSVP FORM SECTION */}
      <section id="rsvp" className={`py-24 ${COLOR_PALETTE.softBeige} relative overflow-hidden`}>
        {/* Absolute Background Accent Patterns */}
        <div className="absolute top-0 left-0 w-32 h-32 border-b border-r border-[#C5A880]/20 rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-t border-l border-[#C5A880]/20 rounded-tl-full" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">Kindly Respond</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">RSVP of Attendance</h2>
            <p className="font-sans text-xs text-[#615E58] mt-4 tracking-widest uppercase">Please respond by November 1, 2026</p>
            <RoyalDivider />
          </div>

          <div className="bg-white rounded-lg border border-[#C5A880]/30 shadow-2xl p-8 md:p-12">
            
            {!isRsvpSubmitted ? (
              <form onSubmit={handleRsvpSubmit} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase">
                      Your Full Name
                    </label>
                    <input 
                      type="text" 
                      id="fullName"
                      value={rsvpData.fullName}
                      onChange={(e) => setRsvpData({...rsvpData, fullName: e.target.value})}
                      required
                      placeholder="e.g. Honorable David Kensington"
                      className="border-b border-stone-300 focus:border-[#C5A880] outline-none py-2 text-sm transition-colors text-[#2C2A29]"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({...rsvpData, email: e.target.value})}
                      required
                      placeholder="e.g. guest@royalwedding.com"
                      className="border-b border-stone-300 focus:border-[#C5A880] outline-none py-2 text-sm transition-colors text-[#2C2A29]"
                    />
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Attendance Switch */}
                  <div className="flex flex-col gap-2">
                    <span className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase mb-2">
                      Will you Attend?
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setRsvpData({...rsvpData, attendance: 'attending'})}
                        className={`font-cinzel text-xs tracking-widest py-3 border rounded transition-all duration-300 ${
                          rsvpData.attendance === 'attending' 
                            ? 'bg-[#2C2A29] border-[#2C2A29] text-white' 
                            : 'border-stone-300 text-[#2C2A29] hover:border-[#C5A880]'
                        }`}
                      >
                        Joyfully Accept
                      </button>
                      <button 
                        type="button"
                        onClick={() => setRsvpData({...rsvpData, attendance: 'declined'})}
                        className={`font-cinzel text-xs tracking-widest py-3 border rounded transition-all duration-300 ${
                          rsvpData.attendance === 'declined' 
                            ? 'bg-stone-500 border-stone-500 text-white' 
                            : 'border-stone-300 text-[#2C2A29] hover:border-[#C5A880]'
                        }`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {/* Total Guests count */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guests" className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase">
                      Number of Guests (including yourself)
                    </label>
                    <select 
                      id="guests"
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({...rsvpData, guests: e.target.value})}
                      className="border-b border-stone-300 focus:border-[#C5A880] bg-white outline-none py-2.5 text-sm transition-colors text-[#2C2A29]"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>

                </div>

                {rsvpData.attendance === 'attending' && (
                  <div className="grid md:grid-cols-2 gap-8 pt-2">
                    
                    {/* Meal Preferences */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="meal" className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase">
                        Gastronomy Option
                      </label>
                      <select 
                        id="meal"
                        value={rsvpData.mealPreference}
                        onChange={(e) => setRsvpData({...rsvpData, mealPreference: e.target.value})}
                        className="border-b border-stone-300 focus:border-[#C5A880] bg-white outline-none py-2.5 text-sm transition-colors text-[#2C2A29]"
                      >
                        <option value="standard">Beef Wellington Masterpiece</option>
                        <option value="vegan">Signature Herb Truffle Risotto (Vegan)</option>
                        <option value="fish">Seared Seabass over Caviar Saffron</option>
                      </select>
                    </div>

                    {/* Dietary Restrictions */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dietary" className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase">
                        Allergies / Dietary Needs
                      </label>
                      <input 
                        type="text" 
                        id="dietary"
                        value={rsvpData.dietaryRestrictions}
                        onChange={(e) => setRsvpData({...rsvpData, dietaryRestrictions: e.target.value})}
                        placeholder="e.g. Gluten Free, Peanut Allergy"
                        className="border-b border-stone-300 focus:border-[#C5A880] outline-none py-2 text-sm transition-colors text-[#2C2A29]"
                      />
                    </div>

                  </div>
                )}

                {/* Song Request & Message */}
                <div className="grid md:grid-cols-2 gap-8 pt-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="song" className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase">
                      Song Recommendation for the Dancefloor
                    </label>
                    <input 
                      type="text" 
                      id="song"
                      value={rsvpData.songRequest}
                      onChange={(e) => setRsvpData({...rsvpData, songRequest: e.target.value})}
                      placeholder="Song Title & Artist"
                      className="border-b border-stone-300 focus:border-[#C5A880] outline-none py-2 text-sm transition-colors text-[#2C2A29]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-cinzel text-xs tracking-wider text-[#2C2A29] font-bold uppercase">
                      Note to the Bride & Groom
                    </label>
                    <input 
                      type="text" 
                      id="message"
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                      placeholder="Sending our blessings..."
                      className="border-b border-stone-300 focus:border-[#C5A880] outline-none py-2 text-sm transition-colors text-[#2C2A29]"
                    />
                  </div>
                </div>

                <div className="text-center pt-6">
                  <button 
                    type="submit"
                    className="bg-[#2C2A29] text-white hover:bg-[#C5A880] px-12 py-4 font-cinzel text-xs tracking-[0.25em] uppercase rounded-full shadow-lg transition-all duration-500 hover:scale-105"
                  >
                    Submit Response
                  </button>
                </div>

              </form>
            ) : (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-[#C5A880]/15 text-[#C5A880] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-3xl font-light text-[#2C2A29]">Response Received</h3>
                <p className="font-sans text-sm text-[#615E58] max-w-md mx-auto leading-relaxed">
                  {rsvpData.attendance === 'attending' 
                    ? `Thank you, ${rsvpData.fullName}! We are overjoyed to celebrate our wedding day with you at the Grand Chateau.` 
                    : `Thank you, ${rsvpData.fullName}. Although we will miss you dearly, we truly appreciate your warm wishes from afar.`}
                </p>
                <button 
                  onClick={() => setIsRsvpSubmitted(false)}
                  className="font-cinzel text-xs tracking-widest text-[#C5A880] border-b border-[#C5A880] hover:text-[#2C2A29] hover:border-[#2C2A29] transition-all pt-4"
                >
                  Edit Response
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* GUESTBOOK / WISHES SECTION */}
      <section id="wishes" className={`py-24 ${COLOR_PALETTE.ivory} relative`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A880] block mb-2">Guestbook</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-[#2C2A29]">Wishes for the Couple</h2>
            <RoyalDivider />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-[#C5A880]/30 shadow-md">
              <h3 className="font-cinzel text-xs tracking-widest uppercase text-[#C5A880] mb-4 font-bold">Write Your Wish</h3>
              <form onSubmit={handleAddWish} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="wishName" className="font-sans text-xs text-[#2C2A29] font-semibold uppercase">Your Name</label>
                  <input 
                    type="text" 
                    id="wishName"
                    value={newWishName}
                    onChange={(e) => setNewWishName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="border border-stone-200 focus:border-[#C5A880] rounded px-3 py-2 text-sm outline-none text-[#2C2A29]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="wishText" className="font-sans text-xs text-[#2C2A29] font-semibold uppercase">Your Blessing</label>
                  <textarea 
                    id="wishText"
                    value={newWishText}
                    onChange={(e) => setNewWishText(e.target.value)}
                    required
                    rows={4}
                    placeholder="May your life together be beautiful..."
                    className="border border-stone-200 focus:border-[#C5A880] rounded px-3 py-2 text-sm outline-none text-[#2C2A29] resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#2C2A29] text-white hover:bg-[#C5A880] py-2.5 font-cinzel text-xs tracking-widest uppercase rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Blessing
                </button>
              </form>
            </div>

            {/* Display Column */}
            <div className="lg:col-span-2 space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {wishes.map((wish, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-[#C5A880]/15 shadow-sm relative group hover:border-[#C5A880]/50 transition-colors">
                  <div className="absolute top-6 right-6 text-[#C5A880]/20 group-hover:text-[#C5A880]/40 transition-colors">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4 className="font-playfair text-lg text-[#2C2A29] font-semibold">{wish.name}</h4>
                  <span className="text-[10px] text-[#C5A880] tracking-widest font-cinzel block mb-3 uppercase">{wish.date}</span>
                  <p className="font-sans text-sm text-[#615E58] leading-relaxed italic">
                    "{wish.text}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1C1A19] text-[#FAF9F5]/90 py-16 border-t border-[#C5A880]/30 relative overflow-hidden">
        
        {/* Abstract design elements */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50" x2="100%" y2="50" stroke="#C5A880" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
          
          <div className="font-cinzel text-4xl tracking-[0.25em] text-[#C5A880]">
            H <span className="text-xl align-middle font-light">&</span> M
          </div>

          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#D8C3A5]">
            Thank you for being part of our beautiful beginning.
          </p>

          <div className="flex justify-center gap-8 text-[#FAF9F5]/70 hover:text-white transition-colors text-xs font-cinzel tracking-wider">
            <a href="#home" className="hover:text-[#C5A880] transition-colors">Home</a>
            <a href="#ourstory" className="hover:text-[#C5A880] transition-colors">Our Story</a>
            <a href="#rsvp" className="hover:text-[#C5A880] transition-colors">RSVP</a>
          </div>

          <hr className="border-[#C5A880]/20 max-w-sm mx-auto" />

          <div className="text-[10px] text-stone-500 font-sans tracking-widest uppercase">
            © 2026 Helena & Mateo Sterling. All Rights Reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}