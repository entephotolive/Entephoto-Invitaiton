"use client";

import { useBuilder } from "@/context/BuilderContext";
import { useState } from "react";
import { Copy, Check, X, QrCode, MessageSquare, Download } from "lucide-react";
import { createInvitation } from "@/lib/api";

export default function PublishButton() {
  const { eventData, setEventData } = useBuilder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      // Create a deterministic fallback slug from names if none exists
      const fallbackSlug = `${(eventData.brideName || "bride")}-${(eventData.groomName || "groom")}-${Date.now()}`
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "");

      const payload = {
        // Essential Schema Properties
        brideName: eventData.brideName || "test bride",
        groomName: eventData.groomName || "test groom",
        slug: eventData.slug || fallbackSlug,
        coverPhoto: eventData.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552", // placeholder image string if empty

        // Date/Time Fallbacks
        weddingDate: eventData.date
          ? new Date(eventData.date).toISOString()
          : new Date().toISOString(),
        weddingTime: eventData.time || "00:00",
        loveStory: eventData.loveStory || "",

        // Iterative Arrays
        weddingSchedule: (eventData.schedule || []).map((item) => ({
          ceremony: item.title || "Ceremony Event",
          time: item.time || "00:00",
          description: item.description || "",
        })),

        // Deep Object Structures
        venueDetails: {
          venueName: eventData.venue || "TBD Venue",
          address: eventData.address || "TBD Address",
          googleMapLink: eventData.mapLink || "https://maps.google.com",
        },

        rsvpSettings: {
          enabled: typeof eventData.rsvpEnabled === "boolean" ? eventData.rsvpEnabled : true,
        },

        guestWishesSettings: {
          enabled: typeof eventData.enableGreetings === "boolean" ? eventData.enableGreetings : true,
        },

        // Clean Template Node 
        // NOTE: If your backend strictly validates templateId as a MongoDB 24-character hex ID, 
        // swap "royal" below out for a hardcoded valid ObjectId string like "65f1a2b3c4d5e6f7a8b9c0d1"
        template: {
          templateId: eventData.template || "royal", 
          templateName: eventData.template || "royal",
        },

        // Clean out empty strings that violate backend URL validators
        musicUrl: eventData.musicUrl && eventData.musicUrl.trim() !== "" ? eventData.musicUrl : undefined,
      };

      console.log("PAYLOAD JSON:", JSON.stringify(payload, null, 2));
      
      const data = await createInvitation(payload);
      console.log("FULL RESPONSE:", data);

      // Extract the slug dynamically back from response paths
      const slug = data?.data?.slug || data?.slug || payload.slug;
      const shareLink = `${window.location.origin}/event/${slug}`;

      setEventData({
        ...eventData,
        slug,
        shareLink,
      });

      // Automatically copy link to clipboard safely
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareLink).catch((e) => console.error("Clipboard failed", e));
      }
      
      setIsModalOpen(true);
    } catch (error) {
      console.error("Publishing failure tracking:", error);
      alert("Something went wrong saving your invitation layout. Please check your console errors.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (eventData.shareLink && typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(eventData.shareLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Navbar Action Trigger Button */}
      <button
        onClick={handlePublish}
        disabled={isLoading}
        className="bg-[#43372f] hover:bg-[#57483e] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors disabled:opacity-50"
      >
        {isLoading ? "Publishing..." : "Publish Invitation"}
      </button>

      {/* =========================================================
          THE PUBLISH SUCCESS MODAL CANVAS
         ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative flex flex-col items-center">
            
            {/* Close Cross Top Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Top Minimal Abstract Icon Graphic Frame */}
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <QrCode size={22} />
            </div>

            {/* Title Header Lines */}
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight text-center">Your Invitation is Live!</h3>
            <p className="text-sm text-zinc-500 text-center mt-1 mb-6">Use the public link or QR code below to invite guests.</p>

            {/* Section 1: Public Invitation Link Field wrapper */}
            <div className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 mb-6">
              <span className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Public Invitation Link</span>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={eventData.shareLink || ""} 
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-xs text-zinc-600 font-mono outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Section 2: QR Code Wrapper Block & Interactive Social Shortcuts Row */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
              {/* Left Side placeholder for actual generated QR Code graphic frame mapping */}
              <div className="border border-zinc-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-white aspect-square max-w-[180px] mx-auto w-full">
                <div className="w-28 h-28 border-2 border-dashed border-zinc-300 rounded-xl flex items-center justify-center text-zinc-400 mb-2 relative p-2">
                  <div className="grid grid-cols-3 gap-1 w-full h-full opacity-60">
                    <div className="bg-zinc-800 rounded-sm"></div><div className="bg-zinc-800 rounded-sm"></div><div></div>
                    <div className="bg-zinc-800 rounded-sm"></div><div></div><div className="bg-zinc-800 rounded-sm"></div>
                    <div></div><div className="bg-zinc-800 rounded-sm"></div><div className="bg-zinc-800 rounded-sm"></div>
                  </div>
                </div>
                <button className="text-[10px] font-bold tracking-wide uppercase text-indigo-600 hover:underline flex items-center gap-1">
                  <Download size={10} /> Download QR Code
                </button>
              </div>

              {/* Right Side Instant Social Channel triggers */}
              <div className="space-y-3 w-full">
                <span className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase text-center sm:text-left">Instant Social Share</span>
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(eventData.shareLink || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl font-bold tracking-wide text-xs text-center uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare size={14} /> WhatsApp Share
                </a>
                                   
                {/* Micro Tip block */}
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 text-[11px] text-indigo-700 leading-normal">
                  📲 <strong>Tip:</strong> Share this link directly on your Instagram Bio or create a custom story share to invite all your followers!
                </div>
              </div>
            </div>

            {/* Divider line layer layout split node */}
            <div className="w-full h-px bg-zinc-100 mb-6" />

            {/* Section 3: iMessage & WhatsApp Dynamic Mock Embed Meta Wrapper Link */}
            <div className="w-full mb-6">
              <span className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-3">iMessage & WhatsApp Social Link Preview</span>
              <div className="border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm bg-zinc-50/40">
                <div className="h-32 bg-zinc-200 w-full relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${eventData.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552'})` }}>
                  {!eventData.heroImage && <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300 to-zinc-100 flex items-center justify-center text-zinc-400 text-xs">Using Default Cover Placement</div>}
                </div>
                <div className="p-4 bg-white border-t border-zinc-100">
                  <h4 className="font-semibold text-sm text-zinc-800">{eventData.title || "Our Special Day Invitation"}</h4>
                  <p className="text-zinc-400 text-xs line-clamp-2 mt-1 italic font-serif">
                    {eventData.description || '"We welcome you to join us in celebrating our union. Your presence is the greatest gift we could receive."'}
                  </p>
                  <span className="text-[10px] text-indigo-500 font-mono mt-3 block">{eventData.shareLink?.replace('http://', '').replace('https://', '') || "localhost:3000/invite/..."}</span>
                </div>
              </div>
            </div>

            {/* Footer Action Confirm Bottom Triggers */}
            <div className="w-full grid grid-cols-2 gap-3 mt-2">
              <a 
                href={eventData.shareLink || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold uppercase tracking-wider rounded-xl py-3 text-center transition-colors"
              >
                Visit Public Page
              </a>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-[#11131e] hover:bg-[#1a1d2e] text-white text-xs font-bold uppercase tracking-wider rounded-xl py-3 text-center transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}