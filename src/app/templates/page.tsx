"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { EventData } from "@/types/event";

// Import all templates
import EditorialLuxury from "@/components/templates/wedding/EditorialLuxury";
import GoldenUnion from "@/components/templates/wedding/GoldenUnion";
import JourneyToForever from "@/components/templates/wedding/JourneyToForever";
import RomanticMidnightGarden from "@/components/templates/wedding/Romantic-midnight-garden";
import RomanticLuxuryRose from "@/components/templates/wedding/RomanticLuxuryRose";
import TheDigitalLoveStory from "@/components/templates/wedding/TheDigitalLoveStory";
import WeddingTropicalBeach from "@/components/templates/wedding/WeddingTropicalBeach";
import WeddingModern from "@/components/templates/wedding/wedding-modern";
import WeddingOceanica from "@/components/templates/wedding/wedding-ocianica";
import TraditionalTemplate from "@/components/templates/wedding/wedding-traditional";
import WeddingBlackGoldTemplate from "@/components/templates/wedding/wedding-blackgold/WeddingBlackGoldTemplate";
import WeddingPremiumTemplate from "@/components/templates/wedding/wedding-premium/WeddingPremiumTemplate";
import WeddingRoyalTemplate from "@/components/templates/wedding/wedding-royal/WeddingRoyalTemplate";

// Comprehensive dummy data to populate all templates nicely
export const dummyEventData: EventData = {
  eventType: "wedding",
  brideName: "Amelia",
  groomName: "James",
  title: "Amelia & James Wedding",
  description: "Join us in celebrating our special day.",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552",
  date: "October 15, 2026",
  time: "4:00 PM",
  rawWeddingDate: "2026-10-15T16:00:00Z",
  venue: "The Grand Estate",
  address: "123 Romance Blvd, Beverly Hills, CA",
  mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.491419734346!2d-118.41168432360252!3d34.0953330147614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04ce8e49b1%3A0xe54e6015b6756ec5!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  loveStory: [
    { title: "First Met", subtitle: "Where it all began", description: "We met at a coffee shop and talked for hours.", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486" },
    { title: "The Proposal", subtitle: "She said yes!", description: "A magical sunset proposal by the beach.", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8" }
  ],
  schedule: [
    { title: "Ceremony", time: "4:00 PM", description: "The exchange of vows." },
    { title: "Reception", time: "6:00 PM", description: "Dinner, drinks, and dancing." }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74"
  ],
  wishes: [
    { name: "Sarah & Mike", message: "Wishing you a lifetime of love and happiness!" }
  ],
  musicUrl: "",
  
  // Feature flags toggled ON to show off the full template capabilities
  showCoupleInfo: true,
  showStory: true,
  showSchedule: true,
  showGallery: true,
  showVenue: true,
  enableCountdown: true,
  enableGreetings: true,
  rsvpEnabled: true,
  
  // Unused standard fields
  host: "", birthdayPerson: "", age: "", parentsName: "", babyName: "", companyName: "", speakerDetails: "", agenda: "",
  entePhotoLink: "", shareLink: "", rsvpResponses: [], showCoverPhoto: true, showMusic: true, showRSVP: true, showWishes: true, showTimeline: true, template: "modern"
};

export const TEMPLATES = [
  { id: "modern", name: "Modern Wedding", Component: WeddingModern },
  { id: "editorial", name: "Editorial Luxury", Component: EditorialLuxury },
  { id: "golden", name: "Golden Union", Component: GoldenUnion },
  { id: "journey", name: "Journey To Forever", Component: JourneyToForever },
  { id: "midnight", name: "Midnight Garden", Component: RomanticMidnightGarden },
  { id: "rose", name: "Luxury Rose", Component: RomanticLuxuryRose },
  { id: "digital", name: "Digital Love Story", Component: TheDigitalLoveStory },
  { id: "tropical", name: "Tropical Beach", Component: WeddingTropicalBeach },
  { id: "oceanica", name: "Oceanica", Component: WeddingOceanica },
  { id: "traditional", name: "Traditional", Component: TraditionalTemplate },
  { id: "blackgold", name: "Black & Gold", Component: WeddingBlackGoldTemplate },
  { id: "premium", name: "Premium", Component: WeddingPremiumTemplate },
  { id: "royal", name: "Royal", Component: WeddingRoyalTemplate },
];


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

  return (
    <div className="min-h-screen bg-neutral-100 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">Template Gallery</h1>
            <p className="text-neutral-500">Hover over any card to view and scroll the interactive preview.</p>
          </div>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-neutral-600 hover:text-black hover:shadow transition shrink-0">
            <ArrowLeft size={16} /> Dashboard
          </Link>
        </div>

        {/* Decreased template size by using more grid columns (up to 5 on large screens) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
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

                  <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none">
                     <p className="text-white font-bold text-sm truncate">{tmpl.name}</p>
                  </div>
                </div>

                {/* 
                  Hover Pop-up (Scrollable Preview)
                  When hovering, this larger absolute popup appears anchored to the center of the card.
                  Since it's larger and scrollable, moving the mouse to scroll keeps it open!
                */}
                {isHovered && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[600px] bg-white rounded-2xl shadow-2xl z-[999] overflow-hidden flex flex-col border border-neutral-200 animate-in zoom-in-95 duration-200 cursor-auto">
                    
                    {/* Header Bar */}
                    <div className="bg-neutral-900 text-white p-3 flex justify-center items-center shrink-0 shadow-md z-50">
                      <h3 className="font-bold text-sm truncate">{tmpl.name}</h3>
                    </div>

                    {/* 
                      Scrollable Content Body
                      We use an iframe to isolate the viewport width. This ensures Tailwind's media queries 
                      trigger the mobile layout instead of inheriting the desktop window's width.
                    */}
                    <div className="flex-1 relative bg-white overflow-hidden">
                      <iframe
                        src={`/templates/preview/${tmpl.id}`}
                        className="absolute inset-0 w-full h-full border-0"
                        title={`${tmpl.name} Preview`}
                      />
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
