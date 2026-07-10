"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";

import type { EventData } from "@/types/event";

import { dummyEventData, TEMPLATES } from "@/lib/templates";


/**
 * LazyPreview
 * Renders the template inside a scaled-down box ONLY when it scrolls into view.
 * This prevents the browser from crashing when loading 13 heavy templates simultaneously.
 */
function LazyPreview({ Component, eventData }: { Component: any, eventData: any }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Once loaded, we can disconnect to keep it rendered
        observer.disconnect();
      }
    }, { rootMargin: '300px' }); // Load slightly before it scrolls into view

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full bg-neutral-100 flex items-center justify-center relative overflow-hidden">
      {inView ? (
        <div 
          className="origin-top-left absolute top-0 left-0 bg-white pointer-events-none"
          // We set width/height to 400% and scale down to 0.25 to make it flawlessly fit the parent
          style={{ width: '400%', height: '400%', transform: 'scale(0.25)' }}
        >
          <Component eventData={eventData} />
        </div>
      ) : (
        <div className="flex flex-col items-center opacity-50">
          <div className="w-6 h-6 border-2 border-neutral-400 border-t-neutral-800 rounded-full animate-spin mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Loading Theme</span>
        </div>
      )}
    </div>
  );
}


export default function TemplatesShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { eventData, setEventData } = useBuilder() as any;
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-100 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Template Gallery</h1>
            <p className="text-neutral-500 text-sm md:text-base">Tap or hover over any card to view and scroll the interactive preview.</p>
          </div>
          <Link href="/builder" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-neutral-600 hover:text-black hover:shadow transition shrink-0">
            <ArrowLeft size={16} /> Builder
          </Link>
        </div>

        {/* Decreased template size by using more grid columns (up to 5 on large screens) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {TEMPLATES.map((tmpl) => {
            const isHovered = hoveredId === tmpl.id;

            return (
              <div 
                key={tmpl.id}
                onMouseEnter={() => setHoveredId(tmpl.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative flex flex-col items-center w-full"
              >
                {/* 
                  Base Template Card
                  Always shows the loaded template inside.
                */}
                <div className={`w-full aspect-[9/16] bg-white rounded-2xl overflow-hidden shadow-md border-4 border-white transition-all duration-300 relative cursor-pointer ${isHovered ? 'ring-4 ring-primary/50' : 'hover:shadow-xl hover:-translate-y-1'}`}>
                  
                  {/* Always load the mini preview (IntersectionObserver handles performance) */}
                  <LazyPreview Component={tmpl.Component} eventData={{...dummyEventData, template: tmpl.id}} />

                  {/* Transparent overlay to block clicks during mini preview */}
                  <div className="absolute inset-0 z-10" />

                  <div className="absolute bottom-0 left-0 w-full p-2 md:p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none">
                     <p className="text-white font-bold text-xs md:text-sm truncate">{tmpl.name}</p>
                  </div>
                </div>

                {/* 
                  Hover Pop-up (Scrollable Preview)
                  When hovering, this larger absolute popup appears anchored to the center of the card.
                  Since it's larger and scrollable, moving the mouse to scroll keeps it open!
                */}
                {isHovered && (
                  <div className="fixed md:absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[375px] h-[667px] max-w-[95vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl z-[999] overflow-hidden flex flex-col border border-neutral-200 animate-in zoom-in-95 duration-200 cursor-auto">
                    
                    {/* Header Bar */}
                    <div className="bg-neutral-900 text-white p-3 flex justify-between items-center shrink-0 shadow-md z-50">
                      <h3 className="font-bold text-sm truncate mr-2">{tmpl.name}</h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEventData((prev: any) => ({ ...prev, template: tmpl.id }));
                          router.push("/builder");
                        }}
                        className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-md hover:bg-neutral-200 transition shrink-0 shadow-sm"
                      >
                        Use Template
                      </button>
                    </div>

                    {/* 
                      Scrollable Content Body
                      We scale a 400% container down to 25% to match the mini-preview layout perfectly,
                      while enabling scrolling so the user can interact with it.
                    */}
                    <div className="flex-1 relative bg-white overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 origin-top-left overflow-y-auto overflow-x-hidden bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        style={{ width: '400%', height: '400%', transform: 'scale(0.25)' }}
                      >
                        <tmpl.Component eventData={{...dummyEventData, template: tmpl.id}} />
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
