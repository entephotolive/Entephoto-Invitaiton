"use client";

import { ArrowLeft, Menu, Sliders, LayoutGrid, Monitor, Sparkles, Palette } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

// Shadcn UI components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import TemplatePicker from "@/components/builder/TemplatePicker";
import WeddingTemplate from "@/components/templates/WeddingTemplate";
import PublishButton from "@/components/builder/PublishButton";

export default function PreviewPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#43372f] antialiased selection:bg-[#c8a978]/20 relative overflow-hidden flex flex-col h-screen">
      
      {/* Dynamic Spatial Glow Elements behind the main view */}
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#b99863]/5 to-transparent blur-[120px] pointer-events-none select-none z-0" />

      {/* Reusable Sheet context wrapping everything to handle both desktop and mobile triggers easily */}
      <Sheet>
        {/* Modern Studio Navbar */}
        <header
          className="
            sticky
            top-0
            z-50
            h-20
            bg-white/60
            backdrop-blur-xl
            border-b
            border-white/40
            shadow-[0_2px_20px_-10px_rgba(67,55,47,0.05)]
            flex
            items-center
            justify-between
            px-6
            lg:px-12
            flex-shrink-0
          "
        >
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push("/builder")}
              className="group flex items-center justify-center w-9 h-9 rounded-full border border-[#ece4d8] bg-white/80 backdrop-blur-sm text-zinc-500 hover:text-[#43372f] hover:border-[#b99863] transition-all duration-200 active:scale-95"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
            <div>
              <h1 className="text-xl font-serif tracking-wide text-[#43372f]">
                Evently<span className="text-[#b99863]">.</span>
              </h1>
              <p className="hidden sm:block text-[10px] text-zinc-400 font-sans tracking-widest uppercase mt-0.5">
                Immersive Canvas Preview
              </p>
            </div>
          </div>

          {/* Desktop Interface Deck Actions */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Desktop Sheet Trigger */}
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-full
                  border-white/60
                  bg-white/40
                  backdrop-blur-md
                  text-xs
                  font-semibold
                  tracking-wider
                  uppercase
                  text-zinc-600
                  hover:text-[#43372f]
                  hover:bg-white/80
                  shadow-sm
                  transition-all
                  duration-300
                "
              >
                <LayoutGrid size={13} className="text-[#b99863]" />
                Change Template Layout
              </Button>
            </SheetTrigger>

            <button
              onClick={() => router.push("/builder")}
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-full
                border
                border-transparent
                bg-zinc-100/80
                text-xs
                font-semibold
                tracking-wider
                uppercase
                text-zinc-600
                hover:bg-[#faf6f0]
                transition-all
                duration-200
              "
            >
              <Sliders size={13} />
              Edit Form Fields
            </button>
            
            <PublishButton />
          </div>

          {/* Mobile Navigation Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              lg:hidden
              w-10
              h-10
              rounded-full
              border
              border-white/60
              bg-white/40
              backdrop-blur-md
              flex
              items-center
              justify-center
              text-zinc-600
              hover:bg-white/80
              transition-colors
            "
          >
            <Menu size={18} />
          </button>
        </header>

        {/* Mobile Actions Overlay Dropdown Drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-[#ece4d8] p-4 space-y-3 shadow-md relative z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                router.push("/builder");
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-3 rounded-xl text-sm font-medium text-zinc-600 hover:bg-[#faf6f0] text-left"
            >
              <Sliders size={16} className="text-zinc-400" />
              Edit Form Fields
            </button>
            <div className="pt-1">
              <PublishButton />
            </div>
          </div>
        )}

        {/* Immersive Canvas Workspace Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col items-stretch overflow-hidden relative z-10">
          
          {/* ========================================================
              CANVAS STATUS BAR WITH INTEGRATED MOBILE TEMPLATE BUTTON
              ======================================================== */}
          <div className="flex items-center justify-between px-2 pb-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-wider text-[#b99863] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Preview Display Frame
              </span>
              
              {/* Visible ONLY on mobile viewports for quick accessible layouts changes */}
              <SheetTrigger asChild>
                <button className="lg:hidden flex items-center gap-1 bg-[#43372f] hover:bg-[#58483e] text-white px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase active:scale-95 transition-all shadow-xs">
                  <Palette size={10} className="text-[#c8a978]" />
                  Change Template Layout
                </button>
              </SheetTrigger>
            </div>
            
            
          </div>

          {/* The Live Premium Fine-Art Invitation Viewport */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 bg-white border border-[#ece4d8] rounded-[32px] shadow-2xl overflow-y-auto relative custom-scrollbar"
          >
            <div className="min-h-full w-full">
              <WeddingTemplate />
            </div>
          </motion.div>

        </main>

        {/* Unified Slide-out Sheet Panel content used by both desktop and mobile triggers */}
        <SheetContent 
          side="left" 
          className="w-full sm:max-w-md bg-white/80 backdrop-blur-xl border-r border-white/40 p-6 flex flex-col justify-stretch shadow-2xl"
        >
          <SheetHeader className="border-b border-zinc-100 pb-5 text-left">
            <div className="mb-2">
              <Badge variant="outline" className="bg-[#faf6f0] text-[#b99863] border-[#ece4d8] rounded-full text-[9px] px-2.5 uppercase font-sans font-medium tracking-wider">
                Design Configurator
              </Badge>
            </div>
            <SheetTitle className="font-serif text-2xl text-[#43372f]">Select Invitation Theme</SheetTitle>
            <SheetDescription className="text-xs text-zinc-400 leading-relaxed pt-1">
              Choose an alternative typographic or spatial layout. Your changes map immediately across onto the live background viewport wrapper.
            </SheetDescription>
          </SheetHeader>

          {/* Dynamic scroll content zone for template gallery list */}
          <div className="flex-1 overflow-y-auto pt-6 custom-scrollbar">
            <TemplatePicker />
          </div>
        </SheetContent>

      </Sheet>
    </div>
  );
}