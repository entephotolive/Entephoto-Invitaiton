"use client";

import React, { useEffect, useState } from "react";

export default function RomanticWedding() {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  
  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date("Sept 19, 2026 15:30:00").getTime();
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
  }, []);

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
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="font-handwritten text-6xl md:text-8xl text-center text-[#b59343] mb-4">
          Isabella & Theodore
        </h1>
        <p className="font-serif-luxurious text-2xl mb-8">September 19, 2026</p>
        
        <div className="grid grid-cols-4 gap-4 text-center mt-12">
          <div className="bg-white p-4 rounded-xl shadow-md border border-[#f4e0a5]/50 w-24">
            <span className="block text-4xl font-serif-luxurious text-[#b59343]">{days}</span>
            <span className="text-xs uppercase tracking-widest text-[#7c6a53]">Days</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-[#f4e0a5]/50 w-24">
            <span className="block text-4xl font-serif-luxurious text-[#b59343]">{hours}</span>
            <span className="text-xs uppercase tracking-widest text-[#7c6a53]">Hours</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-[#f4e0a5]/50 w-24">
            <span className="block text-4xl font-serif-luxurious text-[#b59343]">{minutes}</span>
            <span className="text-xs uppercase tracking-widest text-[#7c6a53]">Minutes</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-[#f4e0a5]/50 w-24">
            <span className="block text-4xl font-serif-luxurious text-[#b59343]">{seconds}</span>
            <span className="text-xs uppercase tracking-widest text-[#7c6a53]">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
