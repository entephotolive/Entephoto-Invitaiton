"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Eye, Sliders, LayoutTemplate } from "lucide-react";


import PublishButton from "@/components/builder/PublishButton";
import TemplatePicker from "@/components/builder/TemplatePicker";
import Link from "next/link";

export default function BuilderSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const isPreview = pathname === "/builder/preview";

  return (
    <>
      {/* Permanent Logo */}
      <div className="fixed top-6 left-5 sm:left-6 z-50 pointer-events-auto">
        <Image 
          src="/login/logo2.png" 
          alt="Ente Invite" 
          width={1498} 
          height={422} 
          className="w-auto h-13 sm:h-15 object-contain rounded-xl shadow-sm bg-white/80 backdrop-blur-md p-1 border border-white/40"
          priority
        />
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
        className="fixed top-0 left-0 w-72 h-full bg-white/95 backdrop-blur-xl border-r border-[#ece4d8] shadow-2xl z-40 flex flex-col pt-20"
        onMouseLeave={() => setDrawerOpen(false)}
      >
        {/* Side Drawer Trigger */}
        <div 
          className="absolute left-full top-1/2 -translate-y-1/2 flex items-center"
          onMouseEnter={() => setDrawerOpen(true)}
        >
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="bg-black text-white py-3 px-1 rounded-r-xl shadow-lg hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            <motion.div
              animate={!drawerOpen && !shouldReduceMotion ? { x: [0, 5, 0] }: { x: 0, opacity: 1 }}
              transition={{ repeat: !shouldReduceMotion ? Infinity : 0, duration: 2, ease: "easeInOut" }}
            >
              <ChevronRight className="w-3 h-12 text-white" preserveAspectRatio="none" />
            </motion.div>
          </button>
        </div>
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

          <div className="w-full flex justify-center [&>*]:w-full mt-2">
            <PublishButton />
          </div>

          <div className="pt-6 mt-4 border-t border-[#ece4d8]/50 flex flex-col gap-4">
            <TemplatePicker />
            
            <Link
              href="/builder/templates"
              className="flex justify-center items-center gap-3 px-5 py-3 rounded-xl border border-[#ece4d8] text-sm font-semibold tracking-wider uppercase text-zinc-600 hover:text-[#43372f] hover:bg-[#faf6f0] transition-all duration-200 w-full"
            >
              <LayoutTemplate size={18} className="text-[#b99863]" />
              All Templates
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
