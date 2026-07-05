"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye, LayoutGrid, Sliders } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import PublishButton from "@/components/builder/PublishButton";
import TemplatePicker from "@/components/builder/TemplatePicker";

export default function BuilderSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isPreview = pathname === "/builder/preview";

  return (
    <>
      {/* Permanent Logo */}
      <div className="fixed top-6 left-13 z-50 pointer-events-auto">
        <Image 
          src="/login/logo2.png" 
          alt="Ente Invite" 
          width={1498} 
          height={422} 
          className="w-auto h-10 sm:h-15 object-contain rounded-xl shadow-sm bg-white/80 backdrop-blur-md p-1 border border-white/40"
          priority
        />
      </div>

      {/* Side Drawer Trigger */}
      <div 
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
        onMouseEnter={() => setDrawerOpen(true)}
      >
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="bg-black text-white p-3 rounded-r-xl shadow-lg hover:bg-zinc-800 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className={`w-8 h-8 transition-transform duration-300 ${drawerOpen ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Side Drawer Backdrop for mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: drawerOpen ? 0 : "-100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="fixed top-0 left-0 w-72 h-full bg-white/95 backdrop-blur-xl border-r border-[#ece4d8] shadow-2xl z-30 flex flex-col pt-20"
        onMouseLeave={() => setDrawerOpen(false)}
      >
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-4 custom-scrollbar">
          {isPreview ? (
            <button
              onClick={() => router.push("/builder")}
              className="flex justify-center items-center gap-3 px-5 py-3 rounded-xl border border-[#ece4d8] text-sm font-semibold tracking-wider uppercase text-zinc-600 hover:text-[#43372f] hover:bg-[#faf6f0] transition-all duration-200"
            >
              <Sliders size={18} className="text-[#b99863]" />
              Edit Form Fields
            </button>
          ) : (
            <button
              onClick={() => router.push("/builder/preview")}
              className="flex justify-center items-center gap-3 px-5 py-3 rounded-xl border border-[#ece4d8] text-sm font-semibold tracking-wider uppercase text-zinc-600 hover:text-[#43372f] hover:bg-[#faf6f0] transition-all duration-200"
            >
              <Eye size={18} className="text-[#b99863]" />
              Full Preview
            </button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="flex justify-center items-center gap-3 px-5 py-3 rounded-xl border border-[#ece4d8] text-sm font-semibold tracking-wider uppercase text-zinc-600 hover:text-[#43372f] hover:bg-[#faf6f0] transition-all duration-200"
              >
                <LayoutGrid size={18} className="text-[#b99863]" />
                Change Template
              </button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-full sm:max-w-md bg-white/95 backdrop-blur-xl border-r border-[#ece4d8] p-6 flex flex-col justify-stretch shadow-2xl z-[100]"
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

              <div className="flex-1 overflow-y-auto pt-6 custom-scrollbar">
                <TemplatePicker />
              </div>
            </SheetContent>
          </Sheet>

          <div className="w-full flex justify-center [&>*]:w-full mt-2">
            <PublishButton />
          </div>
        </div>
      </motion.div>
    </>
  );
}
