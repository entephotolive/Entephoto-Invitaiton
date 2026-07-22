"use client";

import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Loader2, CheckCircle } from "lucide-react";
import { Users, CalendarDays } from "lucide-react";
import { cn, getMapEmbedUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BuilderSection from "@/components/builder/BuilderSection";

// Generate time options in 30-minute intervals
const timeOptions = Array.from({ length: 48 }).map((_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const ampm = hour < 12 ? "AM" : "PM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const valueHour = hour.toString().padStart(2, "0");
  return {
    value: `${valueHour}:${minute}`,
    label: `${displayHour}:${minute} ${ampm}`,
  };
});

interface Props {
  eventData: any;
  setEventData: (data: any) => void;
}

export default function WeddingDetailsTab({ eventData, setEventData }: Props) {
  const [mapUrlInput, setMapUrlInput] = useState(eventData.mapLink || "");
  const [mapUrlError, setMapUrlError] = useState("");
  const [mapUrlLoading, setMapUrlLoading] = useState(false);
  const hasInitializedMapRef = useRef(!!eventData.mapLink);

  // Sync mapUrlInput when eventData.mapLink is loaded from draft/context
  useEffect(() => {
    if (eventData.mapLink && !hasInitializedMapRef.current) {
      setMapUrlInput(eventData.mapLink);
      hasInitializedMapRef.current = true;
    }
  }, [eventData.mapLink]);

  // Debounced Map URL Validation (with short URL expansion)
  useEffect(() => {
    setMapUrlError("");
    if (!mapUrlInput) {
      setMapUrlLoading(false);
      setEventData((prev: any) =>
        prev.mapLink ? { ...prev, mapLink: "" } : prev
      );
      return;
    }

    setMapUrlLoading(true);
    const timeoutId = setTimeout(async () => {
      let val = mapUrlInput.trim();

      // Handle pasted <iframe> HTML — extract the src
      if (val.startsWith("<iframe")) {
        const srcMatch = val.match(/src="([^"]+)"/);
        if (srcMatch?.[1]) {
          val = srcMatch[1];
        } else {
          setMapUrlError("Could not extract URL from iframe");
          setMapUrlLoading(false);
          return;
        }
      }

      if (!val.startsWith("http")) val = "https://" + val;

      try {
        const parsed = new URL(val);
        
        // ── Expand short URLs via server-side API ──
        const isShortLink = ["maps.app.goo.gl", "goo.gl", "g.co"].includes(parsed.hostname);

        if (isShortLink) {
          const res = await fetch("/api/expand-map-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: val }),
          });
          const data = await res.json();
          if (!res.ok || !data.expandedUrl) {
            throw new Error(data.error || "Could not expand the short URL. Please paste the full link.");
          }
          val = data.expandedUrl;
          // Update the input field to show the expanded URL
          setMapUrlInput(val);
        }

        const embedUrl = getMapEmbedUrl(val);
        if (!embedUrl) {
           throw new Error("Could not generate an embeddable map from this URL. Please ensure it contains coordinates or is a valid place link.");
        }

        setEventData((prev: any) => ({ ...prev, mapLink: embedUrl }));
        setMapUrlLoading(false);
      } catch (err: any) {
        setMapUrlError(err.message || "Invalid Google Maps URL");
        setMapUrlLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [mapUrlInput]);

  const handleFieldChange = (field: string, value: string) => {
    setEventData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Couple Information */}
      <BuilderSection title="Couple Information" icon={<Users size={22} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bride */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Bride Name
              </label>
              <input
                type="text"
                placeholder="Bride Name"
                value={eventData.brideName || ""}
                onChange={(e) => handleFieldChange("brideName", e.target.value)}
                className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Bride's Parents (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Daughter of Mr. John & Mrs. Jane Doe"
                value={eventData.brideParents || ""}
                onChange={(e) => handleFieldChange("brideParents", e.target.value)}
                className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all resize-none text-sm"
              />
            </div>
          </div>

          {/* Groom */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Groom Name
              </label>
              <input
                type="text"
                placeholder="Groom Name"
                value={eventData.groomName || ""}
                onChange={(e) => handleFieldChange("groomName", e.target.value)}
                className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Groom's Parents (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Son of Mr. Robert & Mrs. Mary Smith"
                value={eventData.groomParents || ""}
                onChange={(e) => handleFieldChange("groomParents", e.target.value)}
                className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all resize-none text-sm"
              />
            </div>
          </div>
        </div>
      </BuilderSection>

      {/* Wedding Date & Time */}
      <BuilderSection title="Wedding Date & Time" icon={<CalendarDays size={22} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Event Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 h-[58px] font-normal text-left transition-all justify-start hover:bg-transparent",
                    !eventData.date ? "text-zinc-500" : "text-black"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-zinc-500" />
                  {eventData.date ? (
                    format(new Date(eventData.date), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={eventData.date ? new Date(eventData.date) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      const formatted = format(date, "yyyy-MM-dd");
                      setEventData((prev: any) => ({
                        ...prev,
                        date: formatted,
                        weddingDate: formatted,
                        rawWeddingDate: date.toISOString(),
                      }));
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Event Time
            </label>
            <Select
              value={eventData.time || ""}
              onValueChange={(val) =>
                setEventData((prev: any) => ({
                  ...prev,
                  time: val,
                  weddingTime: val,
                }))
              }
            >
              <SelectTrigger className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 h-[58px] font-normal transition-all bg-transparent text-left">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </BuilderSection>

      {/* Venue Details */}
      <BuilderSection title="Venue Details" icon={<MapPin size={22} />}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Wedding Venue Name"
            value={eventData.venue || ""}
            onChange={(e) => handleFieldChange("venue", e.target.value)}
            className="w-full border rounded-xl p-4 outline-none focus:border-[#b99863]"
          />
          <textarea
            rows={3}
            placeholder="Venue Physical Address"
            value={eventData.address || ""}
            onChange={(e) => handleFieldChange("address", e.target.value)}
            className="w-full border rounded-xl p-4 outline-none focus:border-[#b99863]"
          />

          {/* Google Maps URL Input */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Paste Google Maps URL here..."
                value={mapUrlInput}
                onChange={(e) => setMapUrlInput(e.target.value)}
                className={`w-full border rounded-xl p-4 pr-12 outline-none transition-colors ${
                  mapUrlError
                    ? "border-red-400 focus:border-red-400"
                    : "focus:border-[#b99863]"
                }`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                {mapUrlLoading && (
                  <Loader2 size={18} className="animate-spin text-[#b99863]" />
                )}
                {!mapUrlLoading && mapUrlInput && !mapUrlError && (
                  <CheckCircle size={18} className="text-emerald-500" />
                )}
              </div>
            </div>
            {mapUrlError && (
              <p className="text-[11px] font-semibold text-red-500 mt-2 ml-1 tracking-wide">
                {mapUrlError}
              </p>
            )}

            {/* How-to guide */}
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <MapPin size={12} />
                How to add your venue on Google Maps
              </p>
              <ol className="space-y-1.5 text-[11px] text-amber-800 leading-relaxed list-none">
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600 shrink-0">1.</span>
                  Open <strong>Google Maps</strong> and search for your venue.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600 shrink-0">2.</span>
                  Tap <strong>Share</strong> → <strong>Copy Link</strong> — short links like{" "}
                  <code className="bg-amber-100 px-1 rounded text-[10px]">maps.app.goo.gl/...</code> are supported! ✓
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600 shrink-0">3.</span>
                  Or copy the <strong>full URL</strong> from your browser address bar and paste it here.
                </li>
              </ol>
              <p className="text-[10px] text-emerald-700 pt-1 border-t border-amber-200">
                ✅ Short share links (<code className="bg-amber-100 px-1 rounded">maps.app.goo.gl</code>) are automatically expanded for you.
              </p>
            </div>
          </div>
        </div>
      </BuilderSection>
    </>
  );
}
