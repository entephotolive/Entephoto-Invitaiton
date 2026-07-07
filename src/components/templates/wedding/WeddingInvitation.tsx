"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MapPin, Calendar, Clock, Music, VolumeX, 
  Users, ChevronDown, Gift, Send, 
  Info, CheckCircle2
} from 'lucide-react';

interface Props {
  eventData?: any;
}

export default function WeddingInvitation({ eventData }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRSVPThankYou, setShowRSVPThankYou] = useState(false);
  const [showBlessingThankYou, setShowBlessingThankYou] = useState(false);
  const audioRef = useRef<any>(null);

  // Fallbacks mapped from eventData
  const bride = eventData?.brideName || "Sophia";
  const groom = eventData?.groomName || "Alexander";
  const weddingDateObj = eventData?.weddingDate ? new Date(eventData.weddingDate) : new Date('2026-12-31T16:00:00');
  const weddingDate = weddingDateObj.getTime();
  const formattedDate = weddingDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedDateDots = `${weddingDateObj.getDate()} . ${weddingDateObj.getMonth() + 1} . ${weddingDateObj.getFullYear()}`;
  
  const venueName = eventData?.venueDetails?.venueName || "The Grand Estate";
  const address = eventData?.venueDetails?.address || "123 Villa Strada, Florence, Italy 50122";
  const musicUrl = eventData?.musicUrl || 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_73d4df4898.mp3?filename=beautiful-piano-108133.mp3';

  const storyElements = eventData?.loveStory?.length > 0 ? eventData.loveStory : [
    {
      title: "The First Meeting",
      subtitle: "October 14, 2021",
      description: "It was a rainy afternoon in a tiny Parisian café. A conversation about a worn-out copy of Hemingway turned into a four-hour coffee date. Time simply stood still."
    }
  ];

  const galleryImages = eventData?.gallery?.length >= 3 ? eventData.gallery : [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800"
  ];

  const scheduleEvents = eventData?.weddingSchedule?.length > 0 ? eventData.weddingSchedule : [
    { time: '10:00 AM', ceremony: 'Mehendi & Haldi', description: 'A morning of vibrant colors, traditional henna, and joyful blessings.' },
    { time: '02:00 PM', ceremony: 'The Engagement', description: 'Exchange of rings surrounded by close family.' },
    { time: '04:00 PM', ceremony: 'Wedding Ceremony', description: 'The sacred vows and the beginning of our forever.' },
    { time: '07:30 PM', ceremony: 'Grand Reception', description: 'Dinner, toasts, and dancing under the stars.' }
  ];

  const [timeLeft, setTimeLeft] = useState(weddingDate - new Date().getTime());

  // Background Music Logic
  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [musicUrl]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e: any) => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Countdown Timer Logic
  useEffect(() => {
    if (isOpened) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        setTimeLeft(distance > 0 ? distance : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpened, weddingDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const handleOpenLetter = () => {
    setIsAnimating(true);
    if (!isPlaying) {
      audioRef.current.play().catch((e: any) => console.log("Audio play failed, user needs to click play"));
      setIsPlaying(true);
    }
    setTimeout(() => {
      setIsOpened(true);
    }, 2000);
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRSVPThankYou(true);
  };

  const handleBlessingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBlessingThankYou(true);
  };

  return (
    <div className="font-sans text-gray-800 antialiased overflow-x-hidden relative min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Alex+Brush&family=Lato:wght@300;400;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-script { font-family: 'Alex Brush', cursive; font-size: 1.5em; }
        .font-sans { font-family: 'Lato', sans-serif; }
        .bg-ivory { background-color: #FDFBF7; background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); }
        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        .glass-card { background: rgba(253, 251, 247, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.2); }
        .fade-in { animation: fadeIn 2s ease-in-out forwards; }
        .slide-up { animation: slideUp 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .glow-text { text-shadow: 0 0 20px rgba(212, 175, 55, 0.5); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .envelope-wrapper { transition: all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .envelope-open-anim { transform: scale(1.5) translateY(100vh); opacity: 0; }
        .envelope-flap { transition: transform 0.8s ease-in-out; transform-origin: top; }
        .flap-open { transform: rotateX(180deg); }
        html { scroll-behavior: smooth; }
      `}</style>

      {isOpened && (
        <button 
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full glass-card text-gold shadow-2xl hover:scale-110 transition-transform duration-300"
        >
          {isPlaying ? <Music size={24} /> : <VolumeX size={24} />}
        </button>
      )}

      {!isOpened && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-1000 ${isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,rgba(10,10,10,1)_60%)]"></div>
          <div className={`relative z-10 flex flex-col items-center envelope-wrapper ${isAnimating ? 'envelope-open-anim' : ''}`}>
            <div className="relative w-80 h-56 md:w-96 md:h-64 bg-[#1a1a1a] border border-gray-800 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] flex justify-center items-center">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full border-t-[140px] border-l-[160px] border-r-[160px] border-b-[140px] border-t-transparent border-l-[#222] border-r-[#222] border-b-[#252525] md:border-l-[192px] md:border-r-[192px] md:border-t-[160px] md:border-b-[160px]"></div>
              </div>
              <div className={`absolute z-20 w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isAnimating ? 'scale-0' : 'scale-100'}`}>
                <span className="font-serif text-white text-2xl tracking-widest">{bride[0]}&{groom[0]}</span>
              </div>
              <div className={`absolute top-0 left-0 w-full h-0 border-t-[140px] border-l-[160px] border-r-[160px] border-x-transparent border-t-[#1c1c1c] z-10 envelope-flap md:border-t-[160px] md:border-l-[192px] md:border-r-[192px] ${isAnimating ? 'flap-open' : ''}`}></div>
            </div>
            <p className="mt-12 text-white/80 font-serif italic text-lg md:text-xl glow-text text-center px-4 fade-in">
              "A beautiful story is waiting to be opened..."
            </p>
            <button 
              onClick={handleOpenLetter}
              className="mt-8 px-8 py-3 border border-gold text-gold font-sans uppercase tracking-widest text-sm hover:bg-gold hover:text-white transition-all duration-500 rounded-sm fade-in"
            >
              Open Letter
            </button>
          </div>
        </div>
      )}

      {isOpened && (
        <div className="bg-ivory min-h-screen w-full slide-up">
          
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>
            <svg className="w-32 h-32 md:w-48 md:h-48 text-gold opacity-20 absolute top-10 left-10" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z"/>
            </svg>
            <svg className="w-32 h-32 md:w-48 md:h-48 text-gold opacity-20 absolute bottom-10 right-10" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z"/>
            </svg>
            <span className="font-sans uppercase tracking-[0.3em] text-sm text-gray-500 mb-6 slide-up" style={{animationDelay: '0.2s'}}>We invite you to celebrate the wedding of</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-gray-900 mb-4 slide-up" style={{animationDelay: '0.4s'}}>{bride}</h1>
            <span className="font-script text-gold text-4xl md:text-5xl my-2 slide-up" style={{animationDelay: '0.6s'}}>&</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-gray-900 mb-8 slide-up" style={{animationDelay: '0.8s'}}>{groom}</h1>
            <p className="font-sans tracking-widest text-gray-600 uppercase mt-8 slide-up" style={{animationDelay: '1s'}}>
              {formattedDate} • {venueName}
            </p>
            <div className="absolute bottom-10 animate-bounce slide-up" style={{animationDelay: '1.5s'}}>
              <ChevronDown className="text-gold w-8 h-8 opacity-70" />
            </div>
          </section>

          <section className="py-24 px-6 max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-8">A Letter From Us</h2>
            <div className="glass-card p-10 md:p-16 rounded-lg relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-ivory px-4">
                <Heart className="w-8 h-8 text-gold fill-gold/20" />
              </div>
              <p className="font-serif italic text-lg md:text-xl leading-relaxed text-gray-700">
                "Dearest family and friends,<br/><br/>
                As we look forward to the day we say 'I do', we realize that our story wouldn't be complete without you. You have been our support, our joy, and our greatest blessing. We are thrilled to invite you to witness our vows and celebrate the beginning of our forever.<br/><br/>
                With all our love,"
              </p>
              <p className="font-script mt-8 text-right text-gray-900 pr-8">{bride} & {groom}</p>
            </div>
          </section>

          <section className="py-24 bg-white/50 border-y border-gold/10">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-900 mb-16">Our Beginning</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-2 bg-gold/20 transform rotate-2 rounded-lg opacity-50 transition-transform group-hover:rotate-3"></div>
                  <img src={eventData?.coverPhoto || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000"} alt="Couple" className="relative z-10 w-full rounded-sm shadow-xl sepia-[.2] transition-transform duration-500 group-hover:-translate-y-2" />
                </div>
                <div className="space-y-6">
                  {storyElements.slice(0,1).map((story: any, idx: number) => (
                    <div key={idx} className="glass-card p-8 rounded-sm relative shadow-sm">
                      <div className="absolute -top-3 right-8 w-6 h-6 bg-red-400/80 rounded-full shadow-inner transform rotate-12"></div>
                      <span className="font-script text-gray-500 block mb-2">{story.subtitle}</span>
                      <h3 className="font-serif text-2xl text-gray-900 mb-3">{story.title}</h3>
                      <p className="font-sans text-gray-600 leading-relaxed">{story.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {eventData?.showGallery !== false && (
            <section className="py-32 px-6 overflow-hidden">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-900 mb-20">Favorite Memories</h2>
              <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12 relative">
                {galleryImages.slice(0, 3).map((img: string, idx: number) => (
                  <div key={idx} style={{ marginTop: `${idx * 16}px` }} className={`bg-white p-4 pb-16 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-sm transform ${idx%2===0?'-rotate-3':'rotate-2'} hover:rotate-0 hover:z-10 hover:scale-105 transition-all duration-300 w-64 md:w-80 border border-gray-100`}>
                    <img src={img} alt={`Memory ${idx+1}`} className="w-full aspect-square object-cover sepia-[.1]" />
                    <p className="font-script text-center mt-6 text-2xl text-gray-700">Memory #{idx+1}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {eventData?.enableCountdown !== false && (
            <section className="py-24 px-6 text-center">
              <h2 className="font-sans uppercase tracking-[0.2em] text-gold mb-4 text-sm font-bold">Save The Date</h2>
              <div className="font-serif text-5xl md:text-7xl text-gray-900 mb-16 tracking-wide">
                {formattedDateDots}
              </div>
              <div className="flex justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hours', value: hours },
                  { label: 'Mins', value: minutes },
                  { label: 'Secs', value: seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 glass-card rounded-lg flex items-center justify-center mb-3 shadow-lg">
                      <span className="font-serif text-2xl md:text-4xl text-gray-900">{item.value < 10 ? `0${item.value}` : item.value}</span>
                    </div>
                    <span className="font-sans uppercase text-xs tracking-widest text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="py-24 bg-white/40">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-900 mb-16">Celebration Timeline</h2>
              <div className="relative border-l border-gold/30 ml-4 md:ml-1/2 md:translate-x-[-50%] space-y-12">
                {scheduleEvents.map((item: any, index: number) => (
                  <div key={index} className="relative pl-8 md:pl-0">
                    <div className="absolute left-[-5px] md:left-[50%] md:translate-x-[-5px] top-4 w-3 h-3 bg-gold rounded-full ring-4 ring-ivory"></div>
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                      <div className="glass-card p-6 rounded-sm hover:shadow-lg transition-shadow duration-300">
                        <div className={`flex items-center gap-2 mb-2 text-gold ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          <Clock size={16} />
                          <span className="font-sans font-bold text-sm tracking-wider">{item.time}</span>
                        </div>
                        <h3 className="font-serif text-xl text-gray-900 mb-2">{item.ceremony}</h3>
                        <p className="font-sans text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-10">The Venue</h2>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 shadow-2xl rounded-lg overflow-hidden border border-gold/20">
              <div className="h-64 md:h-auto bg-gray-200 relative group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" alt="Map Location" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-full shadow-lg text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                    <MapPin size={32} />
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 md:p-16 flex flex-col justify-center text-left relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl"></div>
                <h3 className="font-serif text-2xl text-gray-900 mb-4">{venueName}</h3>
                <p className="font-sans text-gray-600 mb-6 leading-relaxed">{address}</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Info className="text-gold mt-1 shrink-0" size={18} />
                    <p className="font-sans text-sm text-gray-600">Complimentary valet parking available on site.</p>
                  </div>
                </div>
                <a href={eventData?.venueDetails?.googleMapLink || "#"} target="_blank" rel="noreferrer" className="self-start px-6 py-3 bg-gray-900 text-white font-sans uppercase text-xs tracking-widest hover:bg-gold transition-colors duration-300">
                  Get Directions
                </a>
              </div>
            </div>
          </section>

          {eventData?.rsvpSettings?.enabled !== false && (
            <section className="py-32 px-6 bg-[url('https://images.unsplash.com/photo-1505902722417-38f3750bd820?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed relative">
              <div className="absolute inset-0 bg-ivory/90 backdrop-blur-sm"></div>
              <div className="max-w-3xl mx-auto relative z-10">
                <div className="bg-white p-10 md:p-16 shadow-2xl rounded-sm border border-gold/20 text-center">
                  <h2 className="font-serif text-4xl text-gray-900 mb-2">RSVP</h2>
                  <p className="font-sans text-gray-500 mb-10">Kindly reply by the requested date</p>
                  {showRSVPThankYou ? (
                    <div className="py-12 fade-in">
                      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="font-serif text-2xl text-gray-900 mb-2">Thank You!</h3>
                      <p className="font-sans text-gray-600">Your response has been beautifully recorded.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRSVPSubmit} className="space-y-6 text-left fade-in">
                      <div>
                        <label className="block font-sans text-sm font-bold text-gray-700 mb-2">Full Name(s)</label>
                        <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all font-sans" placeholder="e.g. Jane & John Doe" />
                      </div>
                      <button type="submit" className="w-full py-4 bg-gray-900 text-white font-sans uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300 flex justify-center items-center gap-2">
                        <Send size={18} /> Confirm Attendance
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          )}

          {eventData?.guestWishesSettings?.enabled !== false && (
            <section className="py-24 px-6 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6">Leave Your Blessings</h2>
              <p className="font-sans text-gray-600 mb-10 max-w-2xl mx-auto">Your warm wishes mean the world to us. Please leave a note in our digital guestbook.</p>
              <div className="max-w-2xl mx-auto">
                {showBlessingThankYou ? (
                  <div className="p-8 glass-card border border-gold/20 rounded-sm fade-in">
                    <p className="font-script text-3xl text-gold mb-2">Thank you</p>
                    <p className="font-sans text-gray-600">Your blessing has been added to our memories.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBlessingSubmit} className="space-y-4">
                    <input required type="text" placeholder="Your Name" className="w-full p-4 border-b-2 border-gray-200 focus:border-gold outline-none bg-transparent font-sans transition-colors" />
                    <textarea required rows={3} placeholder="Write your heartfelt wishes here..." className="w-full p-4 border-b-2 border-gray-200 focus:border-gold outline-none bg-transparent font-sans resize-none transition-colors"></textarea>
                    <button type="submit" className="px-8 py-3 border border-gray-900 text-gray-900 font-sans uppercase tracking-widest text-xs hover:bg-gray-900 hover:text-white transition-colors duration-300 mt-4">
                      Sign Guestbook
                    </button>
                  </form>
                )}
              </div>
            </section>
          )}

          <footer className="relative py-40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center sepia-[.4]"></div>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            <div className="relative z-10 text-center px-6">
              <h2 className="font-script text-5xl md:text-7xl text-gold mb-6 drop-shadow-lg">The Next Chapter</h2>
              <p className="font-serif text-xl md:text-3xl text-white tracking-wide">...begins with your presence.</p>
              <div className="mt-20">
                <span className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase">{bride} & {groom}</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}