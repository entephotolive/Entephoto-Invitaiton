"use client";

import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { TEMPLATES } from "@/lib/templates";
import BuilderSidebar from "@/components/builder/BuilderSidebar";

export default function PreviewPage() {
  const { eventData } = useBuilder() as any;

  // Find the component that matches the selected template id
  const selectedTemplate = TEMPLATES.find((t) => t.id === eventData?.template);
  // Fall back to "premium" if nothing is selected or matched
  const fallbackTemplate = TEMPLATES.find((t) => t.id === "premium")!;
  const { Component: TemplateComponent } = selectedTemplate || fallbackTemplate;

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#43372f] antialiased selection:bg-[#c8a978]/20 relative overflow-hidden flex flex-col h-screen">
      
      {/* Dynamic Spatial Glow Elements behind the main view */}
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#b99863]/5 to-transparent blur-[120px] pointer-events-none select-none z-0" />

      <BuilderSidebar />

        <main className="flex-1 flex flex-col items-stretch overflow-hidden relative z-10 w-full h-full">
          
          {/* The Live Premium Fine-Art Invitation Viewport (Full Screen) */}
          <motion.div 
            key={eventData?.template}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 w-full h-full bg-white overflow-y-auto relative custom-scrollbar"
          >
            <div className="min-h-full w-full">
              <TemplateComponent eventData={eventData} />
            </div>
          </motion.div>

        </main>
    </div>
  );
}