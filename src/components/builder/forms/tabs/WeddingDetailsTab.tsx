"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Loader2, CheckCircle } from "lucide-react";
import { Users, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
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

  // Sync mapUrlInput when eventData.mapLink is loaded from draft/context
  useEffect(() => {
    if (eventData.mapLink && !mapUrlInput) {
      setMapUrlInput(eventData.mapLink);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData.mapLink]);

  // Debounced Map URL Validation
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
    const timeoutId = setTimeout(() => {
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
        if (!parsed.hostname.includes(".")) throw new Error("Invalid URL format");

        const isGoogleMap =
          parsed.hostname.includes("google") || parsed.hostname.includes("goo.gl");
        if (!isGoogleMap) throw new Error("Please enter a valid Google Maps link");

        // Require coordinates unless it's already an embed
        if (!val.includes("output=embed") && !val.includes("/embed")) {
          const hasCoords = /@(-?\d+\.\d+),(-?\d+\.\d+)/.test(val);
          if (!hasCoords) {
            throw new Error(
              "URL must contain @lat,lng coordinates. Please copy the full URL from your browser's address bar."
            );
          }
        }

        // Normalise the input if we mutated it
        if (mapUrlInput !== val) setMapUrlInput(val);
        setEventData((prev: any) => ({ ...prev, mapLink: val }));
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
                How to get the correct Google Maps link
              </p>
              <ol className="space-y-1.5 text-[11px] text-amber-800 leading-relaxed list-none">
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600 shrink-0">1.</span>
                  Open <strong>Google Maps</strong> in your browser and search for your venue.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600 shrink-0">2.</span>
                  Click on the venue pin to select it.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600 shrink-0">3.</span>
                  Copy the <strong>full URL</strong> from the browser address bar (it will contain{" "}
                  <code className="bg-amber-100 px-1 rounded text-[10px]">@lat,lng</code> coordinates).
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600 shrink-0">4.</span>
                  Paste it here. ✓
                </li>
              </ol>
              <p className="text-[10px] text-amber-600 pt-1 border-t border-amber-200">
                ⚠️ Do <strong>not</strong> use the short share link (maps.app.goo.gl) — it does not
                contain coordinates and won&apos;t work correctly.
              </p>
            </div>
          </div>
        </div>
      </BuilderSection>
    </>
  );
}
