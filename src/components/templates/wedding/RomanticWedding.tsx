"use client";

import React, { useEffect, useState } from "react";
import { dummyEventData } from "@/lib/templates";
import { Heart, MapPin, Clock, CalendarDays } from "lucide-react";

interface Props {
  eventData?: any;
}

export default function RomanticWedding({ eventData }: Props) {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  
  const data = { ...dummyEventData, ...eventData };
  const bride = data.brideName;
  const groom = data.groomName;
  const weddingDateStr = data.date;
  const targetDateStr = data.rawWeddingDate;

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff < 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setDays(d < 10 ? "0" + d : d.toString());
      setHours(h < 10 ? "0" + h : h.toString());
      setMinutes(m < 10 ? "0" + m : m.toString());
      setSeconds(s < 10 ? "0" + s : s.toString());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return (
    <div className="bg-[#FAF6F0] text-[#4A4238] min-h-screen relative font-sans overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-serif-luxurious { font-family: 'Playfair Display', serif; }
        .font-handwritten { font-family: 'Alex Brush', cursive; }
        .gold-foil-text {
            background: linear-gradient(135deg, #b89742 0%, #f4e0a5 25%, #b89742 50%, #f4e0a5 75%, #9a7a2a 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
      `}} />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {data.heroImage && (
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img src={data.heroImage} alt="Hero Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/50 to-[#FAF6F0]"></div>
          </div>
        )}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="font-handwritten text-7xl md:text-9xl text-center text-[#b59343] mb-6 drop-shadow-sm">
            {bride} & {groom}
          </h1>
          <p className="font-serif-luxurious text-2xl md:text-3xl mb-4 tracking-wider">{weddingDateStr}</p>
          <p className="uppercase tracking-[0.3em] text-sm mb-12 opacity-80">{data.venue}</p>
          
          {data.enableCountdown && (
            <div className="grid grid-cols-4 gap-4 md:gap-8 text-center mt-8">
              {[ {label: "Days", val: days}, {label: "Hours", val: hours}, {label: "Mins", val: minutes}, {label: "Secs", val: seconds} ].map(t => (
                <div key={t.label} className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-sm border border-[#f4e0a5]/50 w-24 md:w-32 transform hover:-translate-y-1 transition-transform">
                  <span className="block text-4xl md:text-5xl font-serif-luxurious text-[#b59343]">{t.val}</span>
                  <span className="text-xs md:text-sm uppercase tracking-widest text-[#7c6a53] mt-2 block">{t.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-32 py-20 relative z-10">
        
        {/* Love Story */}
        {data.showStory && data.loveStory?.length > 0 && (
          <section className="text-center">
            <Heart className="w-8 h-8 text-[#b59343] mx-auto mb-6 opacity-70" />
            <h2 className="font-serif-luxurious text-4xl md:text-5xl mb-16 text-[#b59343]">Our Love Story</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {data.loveStory.map((story: any, idx: number) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-[#f4e0a5]/30">
                  {story.image && (
                    <div className="w-full h-64 mb-6 rounded-xl overflow-hidden">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <h3 className="font-serif-luxurious text-2xl mb-2 text-[#4A4238]">{story.title}</h3>
                  <p className="text-sm uppercase tracking-widest text-[#b59343] mb-4">{story.subtitle}</p>
                  <p className="leading-relaxed opacity-80">{story.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Schedule */}
        {data.showSchedule && data.schedule?.length > 0 && (
          <section className="text-center">
            <Clock className="w-8 h-8 text-[#b59343] mx-auto mb-6 opacity-70" />
            <h2 className="font-serif-luxurious text-4xl md:text-5xl mb-16 text-[#b59343]">Event Schedule</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {data.schedule.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-white/50 p-6 rounded-2xl border border-[#f4e0a5]/30">
                  <div className="md:w-1/3 text-xl font-serif-luxurious text-[#b59343]">{item.time}</div>
                  <div className="md:w-2/3 text-left">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="opacity-80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {data.showGallery && data.gallery?.length > 0 && (
          <section className="text-center">
            <h2 className="font-serif-luxurious text-4xl md:text-5xl mb-16 text-[#b59343]">Sweet Memories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.gallery.map((img: string, idx: number) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Venue */}
        {data.showVenue && (
          <section className="text-center">
            <MapPin className="w-8 h-8 text-[#b59343] mx-auto mb-6 opacity-70" />
            <h2 className="font-serif-luxurious text-4xl md:text-5xl mb-16 text-[#b59343]">When & Where</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-sm border border-[#f4e0a5]/30">
              <div className="text-left space-y-6">
                <div>
                  <h3 className="font-serif-luxurious text-2xl mb-2">{data.venue}</h3>
                  <p className="opacity-80">{data.address}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <CalendarDays className="text-[#b59343]" size={20} />
                  <p>{data.date} at {data.time}</p>
                </div>
                {data.mapLink && (
                  <a href={data.mapLink} target="_blank" rel="noreferrer" className="inline-block mt-4 px-8 py-3 bg-[#b59343] text-white rounded-full uppercase tracking-widest text-xs hover:bg-[#9a7a2a] transition-colors">
                    Get Directions
                  </a>
                )}
              </div>
              {data.mapLink && (
                <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-[#f4e0a5]/50">
                  <iframe src={data.mapLink} className="w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              )}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
