"use client";

import { Menu, Eye, Sparkles, Settings2, Sliders, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import WeddingForm from "@/components/builder/forms/WeddingForm";
import PublishButton from "@/components/builder/PublishButton";

export default function BuilderPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#43372f] antialiased selection:bg-[#c8a978]/20 relative overflow-hidden">
      
      {/* Subtle Background Art Accent for Visual Depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('/eventcategories/flower-left.png')] bg-no-repeat bg-contain opacity-[0.03] pointer-events-none select-none z-0 translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[url('/eventcategories/leaves-right.png')] bg-no-repeat bg-contain opacity-[0.03] pointer-events-none select-none z-0 -translate-x-20 translate-y-20" />

      {/* Premium Top Navigation Bar */}
      <header
        className="
          sticky
          top-0
          z-50
          h-20
          bg-white/80
          backdrop-blur-md
          border-b
          border-[#ece4d8]
          flex
          items-center
          justify-between
          px-6
          lg:px-12
        "
      >
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push("/categories")}
            className="group flex items-center justify-center w-9 h-9 rounded-full border border-[#ece4d8] bg-white text-zinc-500 hover:text-[#43372f] hover:border-[#b99863] transition-all duration-200"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div>
            <h1 className="text-xl font-serif tracking-wide text-[#43372f]">
              Evently<span className="text-[#b99863]">.</span>
            </h1>
            <p className="hidden sm:block text-[10px] text-zinc-400 font-sans tracking-widest uppercase mt-0.5">
              Studio Suite Console
            </p>
          </div>
        </div>

        {/* Desktop Action Array */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => router.push("/builder/preview")}
            className="
              flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-full
              border
              border-[#ece4d8]
              text-xs
              font-semibold
              tracking-wider
              uppercase
              text-zinc-600
              hover:text-[#43372f]
              hover:bg-[#faf6f0]
              transition-all
              duration-200
            "
          >
            <Eye size={14} className="text-[#b99863]" />
            Full Preview
          </button>
          <PublishButton />
        </div>

        {/* Mobile Dropdown Trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            lg:hidden
            w-10
            h-10
            rounded-full
            border
            border-[#ece4d8]
            flex
            items-center
            justify-center
            text-zinc-600
            hover:bg-[#faf6f0]
            transition-colors
          "
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Mobile Actions Drawer Menu */}
      {menuOpen && (
        <div
          className="
            lg:hidden
            bg-white
            border-b
            border-[#ece4d8]
            p-4
            space-y-3
            shadow-md
            relative
            z-50
          "
        >
          <button
            onClick={() => {
              router.push("/builder/preview");
              setMenuOpen(false);
            }}
            className="
              w-full
              flex
              items-center
              gap-2
              p-3
              rounded-xl
              text-sm
              font-medium
              text-zinc-600
              hover:bg-[#faf6f0]
              text-left
            "
          >
            <Eye size={16} className="text-[#b99863]" />
            Full Preview
          </button>
          <div className="pt-1">
            <PublishButton />
          </div>
        </div>
      )}

      {/* Centered Workspace Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Module Title Block */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6f0] border border-[#ece4d8] text-[11px] font-medium tracking-widest uppercase text-[#b99863] mb-3"
          >
            <Sliders size={12} />
            Invitation Workspace
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-[#43372f] tracking-wide">
            Wedding Builder
          </h2>
          <div className="w-16 h-[2px] bg-[#c8a978] mx-auto mt-4" />
          
          <p className="mt-4 max-w-md mx-auto text-sm text-zinc-400 leading-relaxed font-sans">
            Tailor the fine details, timelines, and aesthetic themes of your wedding invitation card suite.
          </p>
        </div>

        {/* Unified Form Master-Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="
            bg-white
            rounded-[32px]
            border
            border-[#ece4d8]
            shadow-xl
            shadow-zinc-100/40
            overflow-hidden
          "
        >
          {/* Status / Notice Sub-Header */}
          <div className="border-b border-[#faf6f0] px-6 sm:px-10 py-5 bg-gradient-to-r from-[#faf6f0]/40 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#b99863]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[#43372f]/80">Configuration Modules</span>
            </div>
            <span className="text-[11px] text-zinc-400 bg-zinc-50 border px-2.5 py-0.5 rounded-full font-mono">Draft Auto-Saved</span>
          </div>

          {/* Form Content Padding Inset */}
          <div className="p-6 sm:p-10">
            <WeddingForm />
          </div>

          {/* Luxury Card-Footer Actions row */}
          <div className="border-t border-[#faf6f0] bg-[#faf6f0]/20 px-6 sm:px-10 py-6 flex items-center justify-between">
            <p className="text-xs text-zinc-400 hidden sm:block">
              Make sure to test links inside the full preview framework before publishing.
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => router.push("/builder/preview")}
                className="px-5 py-2 rounded-full bg-white border border-[#ece4d8] text-xs font-medium text-zinc-600 hover:bg-[#faf6f0] transition-colors"
              >
                Launch Preview
              </button>
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}