"use client";

import { Menu, Eye, Sliders, ArrowLeft, FileText, Blocks, Image } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import WeddingForm from "@/components/builder/forms/WeddingForm";
import PublishButton from "@/components/builder/PublishButton";

type TabType = "details" | "modules" | "media";

export default function BuilderPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("details");

  const tabs = [
    { id: "details" as TabType, label: "Details", icon: <FileText size={16} /> },
    { id: "modules" as TabType, label: "Modules", icon: <Blocks size={16} /> },
    { id: "media" as TabType, label: "Media", icon: <Image size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#43372f] antialiased selection:bg-[#c8a978]/20 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('/eventcategories/flower-left.png')] bg-no-repeat bg-contain opacity-[0.03] pointer-events-none select-none z-0 translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[url('/eventcategories/leaves-right.png')] bg-no-repeat bg-contain opacity-[0.03] pointer-events-none select-none z-0 -translate-x-20 translate-y-20" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-[#ece4d8] flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-6">
         
          <div>
            <h1 className="text-xl font-serif tracking-wide text-[#43372f]">
              Ente Invite<span className="text-[#b99863]"></span>
            </h1>
            <p className="hidden sm:block text-[10px] text-zinc-400 font-sans tracking-widest uppercase mt-0.5">
              Studio Suite Console
            </p>
          </div>
        </div>

        {/* Desktop Header Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => router.push("/builder/preview")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#ece4d8] text-xs font-semibold tracking-wider uppercase text-zinc-600 hover:text-[#43372f] hover:bg-[#faf6f0] transition-all duration-200"
          >
            <Eye size={14} className="text-[#b99863]" />
            Full Preview
          </button>
          <PublishButton />
        </div>

        {/* Mobile Dropdown Trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-10 h-10 rounded-full border border-[#ece4d8] flex items-center justify-center text-zinc-600 hover:bg-[#faf6f0] transition-colors"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-[#ece4d8] p-4 space-y-3 shadow-md relative z-50">
          <button
            onClick={() => {
              router.push("/builder/preview");
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-3 rounded-xl text-sm font-medium text-zinc-600 hover:bg-[#faf6f0] text-left"
          >
            <Eye size={16} className="text-[#b99863]" />
            Full Preview
          </button>
          <div className="pt-1">
            <PublishButton />
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Module Title Block */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6f0] border border-[#ece4d8] text-[11px] font-medium tracking-widest uppercase text-[#b99863] mb-3"
          >
            <Sliders size={12} />
            Invitation Workspace
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-[#43372f] tracking-wide">
            Wedding Builder
          </h2>
          <div className="w-16 h-[2px] bg-[#c8a978] mx-auto mt-4" />
        </div>

        {/* Tab Selection Row */}
        <div className="flex justify-center border-b border-[#ece4d8] mb-8 bg-white rounded-2xl p-1.5 shadow-sm max-w-md mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#43372f] text-white shadow-sm"
                  : "text-zinc-500 hover:text-[#43372f] hover:bg-zinc-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Unified Form Master-Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[32px] border border-[#ece4d8] shadow-xl shadow-zinc-100/40 overflow-hidden"
        >
          {/* Status Header */}
          <div className="border-b border-[#faf6f0] px-6 sm:px-10 py-5 bg-gradient-to-r from-[#faf6f0]/40 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#b99863]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[#43372f]/80">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Config Suite
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 bg-zinc-50 border px-2.5 py-0.5 rounded-full font-mono">Draft Auto-Saved</span>
          </div>

          {/* Form Area passing activeTab */}
          <div className="p-6 sm:p-10">
            <WeddingForm activeTab={activeTab} />
          </div>

          {/* Luxury Card-Footer */}
          <div className="border-t border-[#faf6f0] bg-[#faf6f0]/20 px-6 sm:px-10 py-6 flex items-center justify-between">
            <p className="text-xs text-zinc-400 hidden sm:block">
              Make sure to test workflows inside preview mode before deploying live.
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