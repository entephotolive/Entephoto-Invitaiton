"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { TEMPLATES } from "@/lib/templates";
import BuilderSidebar from "@/components/builder/BuilderSidebar";

// ── Premium Loading Screen ────────────────────────────────────────────────────
function TemplateLoader() {
  const dots = [0, 1, 2];
  return (
    <div className="flex-1 w-full h-full bg-gradient-to-br from-[#061e2b] via-[#0b2d3d] to-[#0e4d5c] flex flex-col items-center justify-center gap-8 select-none relative">
      {/* Animated ring */}
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#d4a654]/20"
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#d4a654]/40"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="absolute inset-0 rounded-full border-t-2 border-[#d4a654] animate-spin" />
        <div className="absolute inset-[6px] rounded-full bg-[#d4a654]/10 flex items-center justify-center">
          <span className="text-2xl">💍</span>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center space-y-2">
        <p
          className="text-white/90 text-sm font-light tracking-[0.4em] uppercase"
          style={{ fontFamily: "'Lato', system-ui, sans-serif" }}
        >
          Preparing your invitation
        </p>
        {/* Animated dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {dots.map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#d4a654]"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.18,
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative palm emojis */}
      <div className="absolute top-8 left-8 text-5xl opacity-[0.04] pointer-events-none select-none">🌴</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-[0.04] pointer-events-none select-none">🌿</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function PreviewPage() {
  const { eventData } = useBuilder() as any;

  // Show loader only on the very first mount (one frame), then always show template.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Find the component that matches the selected template id
  const selectedTemplate = TEMPLATES.find((t) => t.id === eventData?.template);
  // Fall back to "premium" if nothing is selected or matched
  const fallbackTemplate = TEMPLATES.find((t) => t.id === "premium")!;
  const { Component: TemplateComponent } = selectedTemplate || fallbackTemplate;

  const showLoader = !mounted || !eventData;

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#43372f] antialiased selection:bg-[#c8a978]/20 relative overflow-hidden flex flex-col h-screen">
      {/* Dynamic Spatial Glow Elements behind the main view */}
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#b99863]/5 to-transparent blur-[120px] pointer-events-none select-none z-0" />

      <BuilderSidebar />

      <main className="flex-1 flex flex-col items-stretch overflow-hidden relative z-10 w-full h-full">
        {/* Template Viewport */}
        <div className="flex-1 w-full h-full bg-white overflow-y-auto relative custom-scrollbar">
          <AnimatePresence mode="wait">
            {showLoader ? (
              <motion.div
                key="loader"
                className="absolute inset-0 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TemplateLoader />
              </motion.div>
            ) : (
              <motion.div
                key={eventData?.template ?? "default"}
                className="min-h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <TemplateComponent eventData={eventData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}