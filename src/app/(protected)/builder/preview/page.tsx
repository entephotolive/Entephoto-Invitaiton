"use client";

import { motion } from "framer-motion";

import WeddingTemplate from "@/components/templates/WeddingTemplate";
import BuilderSidebar from "@/components/builder/BuilderSidebar";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#43372f] antialiased selection:bg-[#c8a978]/20 relative overflow-hidden flex flex-col h-screen">
      
      {/* Dynamic Spatial Glow Elements behind the main view */}
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#b99863]/5 to-transparent blur-[120px] pointer-events-none select-none z-0" />

      <BuilderSidebar />

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
    </div>
  );
}