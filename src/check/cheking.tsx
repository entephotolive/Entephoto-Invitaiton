"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8fb] via-[#faf7ff] to-[#f4f1ff]">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-pink-200/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-purple-200/30 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-24 lg:pt-28 pb-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
<div className="mt-4 lg:mt-0 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-purple-600 shadow-md text-xs sm:text-sm font-medium">              ✨ Powered by Ente Photo
            </div>

            <h1 className="mt-8 text-[42px] sm:text-[58px] lg:text-[82px] font-black leading-[0.95] tracking-[-0.04em] text-[#1d2142]">
              Create Beautiful
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Event Websites
              </span>
            </h1>

            <p className="mt-8 text-zinc-600 text-lg leading-8 max-w-xl">
              Build stunning wedding, birthday, graduation and
              event websites. Share invitations, collect memories
              and connect seamlessly with Ente Photo galleries.
            </p>
             <div className="relative mt-14 h-[500px] lg:hidden">

              <img
                src="/hero/flowers-left.png"
                alt=""
                className="absolute left-0 top-20 w-24 z-10"
              />

              <img
                src="/hero/flowers-right.png"
                alt=""
                className="absolute right-0 top-10 w-24 z-10"
              />

              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[250px] h-[320px] rounded-t-[140px] rounded-b-[30px] overflow-hidden border-4 border-white shadow-2xl z-20">
                <img
                  src="/hero/main-event.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

            <motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute left-0 bottom-20 -rotate-12 bg-white p-2 rounded-xl shadow-xl z-30"
>
  <img
    src="/hero/birthday.avif"
    alt=""
    className="w-28 h-36 rounded-lg object-cover"
  />

  
</motion.div>

<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute right-0 bottom-8 rotate-12 bg-white p-2 rounded-xl shadow-xl z-30"
>
  <img
    src="/hero/graduation.jpeg"
    alt=""
    className="w-28 h-36 rounded-lg object-cover"
  />
</motion.div>
</div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/builder"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-center shadow-xl hover:scale-105 transition"
              >
                Start Creating →
              </Link>

              <button className="px-8 py-4 rounded-full border border-purple-300 text-purple-700 font-semibold hover:bg-purple-50">
                Explore Templates
              </button>
            </div>
            

            {/* MOBILE HERO */}
           
          </motion.div>

          {/* DESKTOP RIGHT */}
          <div className="relative hidden lg:block h-[720px]">

            <img
  src="/hero/flowers-left.png"
  alt=""
  className="
    absolute
    left-[-70px]
    top-[120px]
    w-64
    z-10
    pointer-events-none
  "
/>

           <img
  src="/hero/flowers-right.png"
  alt=""
  className="
    absolute
    right-[-60px]
    top-[80px]
    w-64
    z-10
    pointer-events-none
  "
/>

            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[520px] h-[650px] rounded-t-[260px] rounded-b-[40px] overflow-hidden border-[10px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] z-20">
              <img
                src="/hero/main-event.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute left-0 bottom-20 bg-white p-3 rounded-2xl shadow-2xl -rotate-12 z-30"
            >
              <img
                src="/hero/birthday.avif"
                alt=""
                className="w-52 h-60 rounded-xl object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute right-0 bottom-0 bg-white p-3 rounded-2xl shadow-2xl rotate-12 z-30"
            >
              <img
                src="/hero/graduation.jpeg"
                alt=""
                className="w-52 h-60 rounded-xl object-cover"
              />
            </motion.div>
          </div>

        </div>

        {/* FEATURE BAR */}
        <div className="mt-20 bg-white/80 backdrop-blur-xl rounded-[30px] border border-white shadow-xl overflow-hidden">

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
  ["🎨", "Beautiful Templates", "Stunning designs"],
  ["📷", "Photo Galleries", "Showcase your best moments"],
  ["👥", "Guest Management", "Invite and manage guests"],
  ["🔒", "Secure & Reliable", "Your memories stay safe"],
].map(([icon, title, desc]) => (
  <div
  key={title}
  className="
    flex
    items-center
    gap-4
    p-5
    border-b
    sm:border-r
    border-zinc-100
  "
>
  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-xl shrink-0">
    {icon}
  </div>

  <div className="min-w-0">
    <h3 className="font-semibold text-[#1d2142] text-base">
      {title}
    </h3>

    <p className="text-sm text-zinc-500 mt-1">
      {desc}
    </p>
  </div>
</div>
))}
          </div>

        </div>

      </div>

    </section>
  );
}