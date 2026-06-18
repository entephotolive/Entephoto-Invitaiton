"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Hero() {
  const VisualShowcase = ({ className = "" }: { className?: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`
        relative 
        w-full 
        max-w-[280px] sm:max-w-[420px] lg:max-w-[500px] 
        mx-auto 
        aspect-[4/5]
        flex
        items-center
        justify-center
        ${className}
      `}
    >
      {/* Left Flower */}
      <motion.img
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        src="/hero/flowers-left.png"
        alt=""
        className="absolute -left-10 sm:-left-16 top-[15%] w-24 sm:w-36 lg:w-44 z-10 pointer-events-none"
      />

      {/* Right Flower */}
      <motion.img
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        src="/hero/flowers-right.png"
        alt=""
        className="absolute -right-10 sm:-right-16 top-[8%] w-24 sm:w-36 lg:w-44 z-10 pointer-events-none"
      />

      {/* Main Arch/Mockup Card */}
      <motion.div
        whileHover={{ y: -6 }}
        className="absolute inset-0 rounded-[32px] sm:rounded-[40px] overflow-hidden border-[6px] sm:border-[10px] border-white bg-white shadow-[0_30px_70px_rgba(0,0,0,0.12)] z-20"
      >
        <img
          src="/hero/main-event.png"
          alt="Main Event Showcase"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating Birthday Card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 sm:-left-12 bottom-[8%] bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] rotate-[-10deg] z-30 w-[45%] sm:w-[42%]"
      >
        <img
          src="/hero/cake.avif"
          alt="Birthday"
          className="w-full aspect-[4/5] rounded-lg sm:rounded-xl object-cover"
        />
        <p className="mt-1 sm:mt-2 text-center text-[10px] sm:text-xs font-bold text-zinc-600 truncate">
          Birthday Celebration
        </p>
      </motion.div>

      {/* Floating Graduation Card */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-8 sm:-right-12 bottom-[4%] bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] rotate-[10deg] z-30 w-[45%] sm:w-[42%]"
      >
        <img
          src="/hero/graduation.jpeg"
          alt="Graduation"
          className="w-full aspect-[4/5] rounded-lg sm:rounded-xl object-cover"
        />
        <p className="mt-1 sm:mt-2 text-center text-[10px] sm:text-xs font-bold text-zinc-600 truncate">
          Graduation Day
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#fff8fb] via-[#faf7ff] to-[#f4f1ff]"
    >
      {/* Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-pink-300/30 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute right-0 top-20 h-[600px] w-[600px] rounded-full bg-purple-300/20 blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-20 md:pt-28 lg:pt-32 pb-24">
        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* LEFT CONTENT CONTAINER */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          >
            {/* Shadcn Badge styled with a glassmorphism theme */}
            <motion.div variants={fadeUp}>
              <Badge 
                variant="outline" 
                className="gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wide bg-white/60 backdrop-blur-md border-purple-200/60 text-purple-700 shadow-sm rounded-full"
              >
                <Sparkles className="h-3.5 w-3.5 text-purple-500 fill-purple-500/20 animate-pulse" />
                POWERED BY ENTE PHOTO
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[40px] sm:text-[56px] md:text-[64px] lg:text-[80px] font-black leading-[1.0] lg:leading-[0.92] tracking-[-0.04em] text-[#1d2142] max-w-2xl"
            >
              Create Beautiful
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-1">
                Digital Invitation
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600"
            >
              Build stunning wedding, birthday, graduation and event websites.
              Share invitations, collect memories, and connect seamlessly with
              Ente Photo galleries.
            </motion.p>

            {/* MOBILE & TABLET INTERPOLATED SHOWCASE */}
            <VisualShowcase className="block lg:hidden mt-12 mb-10" />

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-4 flex gap-8 sm:gap-12 justify-center lg:justify-start flex-wrap"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1d2142]">100+</h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">Templates</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1d2142]">10K+</h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">Memories Shared</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1d2142]">500+</h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">Events</p>
              </div>
            </motion.div>

            {/* Shadcn Buttons with custom gradient style overrides */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 h-12 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-[0_20px_50px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.03]"
              >
                <Link href="/builder">
                  Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 border-purple-200 bg-white/70 backdrop-blur text-purple-700 font-semibold hover:bg-white hover:text-purple-800 transition-all"
              >
                Explore Templates
              </Button>
            </motion.div>
          </motion.div>

          {/* DESKTOP VISUAL SHOWCASE */}
          <VisualShowcase className="hidden lg:flex" />

        </div>

        {/* FEATURE BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 lg:mt-32 bg-white/80 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-zinc-100">
            {[
              ["🎨", "Beautiful Templates", "Ready-made premium event designs"],
              ["🌐", "Share Anywhere", "Send invitations via social media"],
              ["👥", "Guest Management", "Manage invitations and guests"],
              ["🔒", "Secure & Reliable", "Your memories stay protected"],
            ].map(([icon, title, desc], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 p-6"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-purple-100 flex items-center justify-center text-xl shrink-0">
                  {icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm sm:text-base text-[#1d2142]">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}