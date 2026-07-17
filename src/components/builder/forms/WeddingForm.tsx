"use client";

import { useBuilder } from "@/context/BuilderContext";
import BuilderSection from "@/components/builder/BuilderSection";
import { useUploadThing } from "@/lib/uploadthing";
import { compressImage } from "@/lib/storage";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
import {
  Users,
  CalendarDays,
  MapPin,
  Image,
  Image as ImageIcon,
  Images,
  Music,
  Mail,
  MessageCircle,
  Heart,
  Timer,
  Upload,
  CheckCircle,
  Loader2,
} from "lucide-react";

// Generate time options (30 min intervals)
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

interface WeddingFormProps {
  activeTab: "details" | "modules" | "media";
}

export default function WeddingForm({ activeTab }: WeddingFormProps) {
  const { eventData, setEventData } = useBuilder() as any;

  // Upload state per section
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [musicUploading, setMusicUploading] = useState(false);
  const [bridePhotoUploading, setBridePhotoUploading] = useState(false);
  const [groomPhotoUploading, setGroomPhotoUploading] = useState(false);

  // UploadThing hooks
  const { startUpload: startCoverUpload } =
    useUploadThing("coverPhotoUploader");
  const { startUpload: startGalleryUpload } = useUploadThing("galleryUploader");
  const { startUpload: startMusicUpload } = useUploadThing("musicUploader");
  const { startUpload: startBridePhotoUpload } =
    useUploadThing("coverPhotoUploader");
  const { startUpload: startGroomPhotoUpload } =
    useUploadThing("coverPhotoUploader");
  const [mapUrlInput, setMapUrlInput] = useState("");
  const [mapUrlError, setMapUrlError] = useState("");
  const [mapUrlLoading, setMapUrlLoading] = useState(false);

  // Sync local map input when eventData loads
  useEffect(() => {
    if (eventData.mapLink && !mapUrlInput) {
      setMapUrlInput(eventData.mapLink);
    }
  }, [eventData.mapLink]);

  // Debounced Map URL Validation
  useEffect(() => {
    setMapUrlError("");
    if (!mapUrlInput) {
      setMapUrlLoading(false);
      setEventData((prev: any) => prev.mapLink ? { ...prev, mapLink: "" } : prev);
      return;
    }

    setMapUrlLoading(true);
    const timeoutId = setTimeout(() => {
      let val = mapUrlInput.trim();
      
      // If user pasted an iframe, extract the src safely
      if (val.startsWith("<iframe")) {
        const srcMatch = val.match(/src="([^"]+)"/);
        if (srcMatch && srcMatch[1]) {
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
        
        const isGoogleMap = parsed.hostname.includes("google") || parsed.hostname.includes("goo.gl");
        if (!isGoogleMap) throw new Error("Please enter a valid Google Maps link");

        // Enforce that the link contains coordinates if it's not an iframe/embed link
        if (!val.includes("output=embed") && !val.includes("/embed")) {
          const hasCoords = /@(-?\d+\.\d+),(-?\d+\.\d+)/.test(val);
          if (!hasCoords) {
            throw new Error("URL must contain @lat,lng coordinates. Please copy the full URL from your browser's address bar.");
          }
        }

        // Save exactly what they gave us (no auto-conversion here)
        // We will convert it at render-time in the templates
        if (mapUrlInput !== val) {
          setMapUrlInput(val);
        }
        setEventData((prev: any) => ({ ...prev, mapLink: val }));
        setMapUrlLoading(false);
      } catch (err: any) {
        setMapUrlError(err.message || "Invalid Google Maps URL");
        setMapUrlLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [mapUrlInput]);

  // Handler: Hero Cover Photo
  const handleCoverPhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    try {
      // Show a local preview immediately while uploading
      const localPreview = URL.createObjectURL(file);
      setEventData((prev: any) => ({ ...prev, heroImage: localPreview }));
      const compressed = await compressImage(file);
      const result = await startCoverUpload([compressed]);
      if (result?.[0]) {
        const url = result[0].ufsUrl ?? result[0].url;
        setEventData((prev: any) => ({ ...prev, heroImage: url }));
      }
    } catch (err) {
      console.error("[Cover Upload] Failed:", err);
      alert("Cover photo upload failed. Please try again.");
    } finally {
      setCoverUploading(false);
    }
  };

  // Handler: Bride Photo
  const handleBridePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBridePhotoUploading(true);
    try {
      const localPreview = URL.createObjectURL(file);
      setEventData((prev: any) => ({ ...prev, bridePhoto: localPreview }));
      const compressed = await compressImage(file);
      const result = await startBridePhotoUpload([compressed]);
      if (result?.[0]) {
        const url = result[0].ufsUrl ?? result[0].url;
        setEventData((prev: any) => ({ ...prev, bridePhoto: url }));
      }
    } catch (err) {
      console.error("[Bride Photo Upload] Failed:", err);
      alert("Bride photo upload failed. Please try again.");
    } finally {
      setBridePhotoUploading(false);
    }
  };

  // Handler: Groom Photo
  const handleGroomPhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGroomPhotoUploading(true);
    try {
      const localPreview = URL.createObjectURL(file);
      setEventData((prev: any) => ({ ...prev, groomPhoto: localPreview }));
      const compressed = await compressImage(file);
      const result = await startGroomPhotoUpload([compressed]);
      if (result?.[0]) {
        const url = result[0].ufsUrl ?? result[0].url;
        setEventData((prev: any) => ({ ...prev, groomPhoto: url }));
      }
    } catch (err) {
      console.error("[Groom Photo Upload] Failed:", err);
      alert("Groom photo upload failed. Please try again.");
    } finally {
      setGroomPhotoUploading(false);
    }
  };

  // Handler: Gallery Images
  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryUploading(true);
    try {
      // Show local previews immediately while uploading
      const localPreviews = files.map((f) => URL.createObjectURL(f));
      setEventData((prev: any) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...localPreviews],
      }));

      const compressed = await Promise.all(files.map((f) => compressImage(f)));
      const result = await startGalleryUpload(compressed);
      if (result) {
        const uploadedUrls = result.map((r) => r.ufsUrl ?? r.url);
        // Replace local blob previews with real CDN URLs
        setEventData((prev: any) => {
          const withoutPreviews = (prev.gallery || []).filter(
            (url: string) => !localPreviews.includes(url),
          );
          return { ...prev, gallery: [...withoutPreviews, ...uploadedUrls] };
        });
      }
    } catch (err) {
      console.error("[Gallery Upload] Failed:", err);
      alert("Gallery upload failed. Please try again.");
    } finally {
      setGalleryUploading(false);
    }
  };

  // Handler: Background Music
  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMusicUploading(true);
    try {
      const result = await startMusicUpload([file]);
      if (result?.[0]) {
        const url = result[0].ufsUrl ?? result[0].url;
        setEventData((prev: any) => ({ ...prev, musicUrl: url }));
      }
    } catch (err) {
      console.error("[Music Upload] Failed:", err);
      alert("Music upload failed. Please try again.");
    } finally {
      setMusicUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ================================== 
          DETAILS TAB 
         ================================== */}
      {activeTab === "details" && (
        <>
          {/* Couple Information */}
          <BuilderSection title="Couple Information" icon={<Users size={22} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    Bride Name
                  </label>
                  <input
                    type="text"
                    placeholder="Bride Name"
                    value={eventData.brideName || ""}
                    onChange={(e) =>
                      setEventData({ ...eventData, brideName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        brideParents: e.target.value,
                      })
                    }
                    className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all resize-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    Groom Name
                  </label>
                  <input
                    type="text"
                    placeholder="Groom Name"
                    value={eventData.groomName || ""}
                    onChange={(e) =>
                      setEventData({ ...eventData, groomName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        groomParents: e.target.value,
                      })
                    }
                    className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all resize-none text-sm"
                  />
                </div>
              </div>
            </div>
          </BuilderSection>

          {/* Wedding Date & Time */}
          <BuilderSection
            title="Wedding Date & Time"
            icon={<CalendarDays size={22} />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Event Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 h-[58px] font-normal text-left transition-all justify-start hover:bg-transparent",
                        !eventData.date ? "text-zinc-500" : "text-black",
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
                      selected={
                        eventData.date ? new Date(eventData.date) : undefined
                      }
                      onSelect={(date) => {
                        if (date) {
                          const formatted = format(date, "yyyy-MM-dd");
                          setEventData({
                            ...eventData,
                            date: formatted,
                            weddingDate: formatted,
                          });
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
                  onValueChange={(val) => {
                    setEventData({
                      ...eventData,
                      time: val,
                      weddingTime: val,
                    });
                  }}
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
                onChange={(e) =>
                  setEventData({ ...eventData, venue: e.target.value })
                }
                className="w-full border rounded-xl p-4 outline-none focus:border-[#b99863]"
              />
              <textarea
                rows={3}
                placeholder="Venue Physical Address"
                value={eventData.address || ""}
                onChange={(e) =>
                  setEventData({ ...eventData, address: e.target.value })
                }
                className="w-full border rounded-xl p-4 outline-none focus:border-[#b99863]"
              />
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
                    {mapUrlLoading && <Loader2 size={18} className="animate-spin text-[#b99863]" />}
                    {!mapUrlLoading && mapUrlInput && !mapUrlError && (
                      <CheckCircle size={18} className="text-emerald-500" />
                    )}
                  </div>
                </div>
                {mapUrlError && (
                  <p className="text-[11px] font-semibold text-red-500 mt-2 ml-1 tracking-wide">{mapUrlError}</p>
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
                      Copy the <strong>full URL</strong> from the browser address bar (it will contain <code className="bg-amber-100 px-1 rounded text-[10px]">@lat,lng</code> coordinates).
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-amber-600 shrink-0">4.</span>
                      Paste it here. ✓
                    </li>
                  </ol>
                  <p className="text-[10px] text-amber-600 pt-1 border-t border-amber-200">
                    ⚠️ Do <strong>not</strong> use the short share link (maps.app.goo.gl) — it does not contain coordinates and won't work correctly.
                  </p>
                </div>
              </div>
            </div>
          </BuilderSection>
        </>
      )}

      {/* ================================== 
          MODULES TAB
         ================================== */}
      {activeTab === "modules" && (
        <>
          {/* Countdown Feature */}
          <BuilderSection
            title="Countdown Timer Module"
            icon={<Timer size={22} />}
          >
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-medium">Display Countdown Clock</p>
                <p className="text-xs text-zinc-400">
                  Calculates time remaining until event date.
                </p>
              </div>
              <input
                type="checkbox"
                checked={eventData.enableCountdown || false}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    enableCountdown: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>
          </BuilderSection>

          {/* Love Story Segment */}
          <BuilderSection title="Love Story Section" icon={<Heart size={22} />}>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
              <div>
                <p className="text-sm font-medium">
                  Enable Love Story Component
                </p>
                <p className="text-xs text-zinc-400">
                  Share timeline details of how you both met.
                </p>
              </div>
              <input
                type="checkbox"
                checked={eventData.showStory || false}
                onChange={(e) =>
                  setEventData({ ...eventData, showStory: e.target.checked })
                }
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>

            {eventData.showStory && (
              <div className="space-y-4">
                {eventData.loveStory?.map((story: any, index: number) => (
                  <div
                    key={index}
                    className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#b99863]">
                        Story Entry #{index + 1}
                      </h4>
                      {eventData.loveStory.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedStories = eventData.loveStory.filter(
                              (_: any, i: number) => i !== index,
                            );
                            setEventData({
                              ...eventData,
                              loveStory: updatedStories,
                            });
                          }}
                          className="px-2 py-1 text-xs font-semibold text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Story Title"
                      value={story.title}
                      onChange={(e) => {
                        const updated = [...eventData.loveStory];
                        updated[index].title = e.target.value;
                        setEventData({ ...eventData, loveStory: updated });
                      }}
                      className="w-full border rounded-xl p-3 bg-white mb-2 outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={story.subtitle}
                      onChange={(e) => {
                        const updated = [...eventData.loveStory];
                        updated[index].subtitle = e.target.value;
                        setEventData({ ...eventData, loveStory: updated });
                      }}
                      className="w-full border rounded-xl p-3 bg-white mb-2 outline-none text-sm"
                    />
                    <textarea
                      rows={3}
                      placeholder="Story Content Description..."
                      value={story.description}
                      onChange={(e) => {
                        const updated = [...eventData.loveStory];
                        updated[index].description = e.target.value;
                        setEventData({ ...eventData, loveStory: updated });
                      }}
                      className="w-full border rounded-xl p-3 bg-white mb-2 outline-none text-sm"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEventData({
                      ...eventData,
                      loveStory: [
                        ...(eventData.loveStory || []),
                        { title: "", subtitle: "", description: "", image: "" },
                      ],
                    })
                  }
                  className="px-4 py-2 border border-dashed border-zinc-300 rounded-xl text-xs font-medium text-zinc-600 hover:border-[#b99863] hover:text-[#b99863] w-full transition-all"
                >
                  + Add Story Event Node
                </button>
              </div>
            )}
          </BuilderSection>

          {/* Wedding Schedule Timeline */}
          <BuilderSection
            title="Event Schedule Timeline"
            icon={<CalendarDays size={22} />}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
              <div>
                <p className="text-sm font-medium">Enable Timeline Display</p>
                <p className="text-xs text-zinc-400">
                  List ceremony activities and timings.
                </p>
              </div>
              <input
                type="checkbox"
                checked={eventData.showSchedule || false}
                onChange={(e) =>
                  setEventData({ ...eventData, showSchedule: e.target.checked })
                }
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>

            {eventData.showSchedule && (
              <div className="space-y-4">
                {eventData.schedule?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
                      <input
                        type="text"
                        placeholder="06:00 PM"
                        value={item.time}
                        onChange={(e) => {
                          const updated = [...eventData.schedule];
                          updated[index].time = e.target.value;
                          setEventData({ ...eventData, schedule: updated });
                        }}
                        className="col-span-1 border rounded-xl p-2.5 bg-white outline-none text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Event Header Title"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...eventData.schedule];
                          updated[index].title = e.target.value;
                          setEventData({ ...eventData, schedule: updated });
                        }}
                        className="sm:col-span-2 border rounded-xl p-2.5 bg-white outline-none text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Short itinerary snippet details..."
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...eventData.schedule];
                        updated[index].description = e.target.value;
                        setEventData({ ...eventData, schedule: updated });
                      }}
                      className="w-full border rounded-xl p-2.5 bg-white outline-none text-xs"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEventData({
                      ...eventData,
                      schedule: [
                        ...(eventData.schedule || []),
                        { title: "", time: "", description: "" },
                      ],
                    })
                  }
                  className="px-4 py-2 border border-dashed border-zinc-300 rounded-xl text-xs font-medium text-zinc-600 hover:border-[#b99863] hover:text-[#b99863] w-full transition-all"
                >
                  + Add Dynamic Itinerary Module
                </button>
              </div>
            )}
          </BuilderSection>

          {/* RSVP Configuration */}
          <BuilderSection
            title="RSVP Collection Gate"
            icon={<Mail size={22} />}
          >
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-medium">Enable Digital RSVP Form</p>
                <p className="text-xs text-zinc-400">
                  Enables logging for guest responses.
                </p>
              </div>
              <input
                type="checkbox"
                checked={eventData.rsvpEnabled || false}
                onChange={(e) =>
                  setEventData({ ...eventData, rsvpEnabled: e.target.checked })
                }
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>
          </BuilderSection>

          {/* Guest Wishes Configuration */}
          <BuilderSection
            title="Guest Wishes Board"
            icon={<MessageCircle size={22} />}
          >
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-medium">
                  Enable Live Commentary Guestbook
                </p>
                <p className="text-xs text-zinc-400">
                  Allows invited attendees to write continuous wishes.
                </p>
              </div>
              <input
                type="checkbox"
                checked={eventData.enableGreetings || false}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    enableGreetings: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>
          </BuilderSection>
        </>
      )}

      {/* ================================== 
          MEDIA UPLOADS TAB
         ================================== */}
      {activeTab === "media" && (
        <>
          {/* Cover Photo */}
          <BuilderSection title="Hero Cover Photo" icon={<Image size={22} />}>
            <div className="space-y-4">
              <label
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  coverUploading
                    ? "border-[#b99863] bg-[#faf6f0]"
                    : "border-zinc-200 hover:border-[#b99863] hover:bg-[#faf6f0]/50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={coverUploading}
                  onChange={handleCoverPhotoUpload}
                />
                {coverUploading ? (
                  <div className="flex flex-col items-center gap-2 text-[#b99863]">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-xs font-medium">
                      Compressing &amp; uploading...
                    </span>
                  </div>
                ) : eventData.heroImage &&
                  !eventData.heroImage.startsWith("blob:") ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-600">
                    <CheckCircle size={24} />
                    <span className="text-xs font-medium">
                      Photo uploaded — click to replace
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-400">
                    <Upload size={24} />
                    <span className="text-xs font-medium">
                      Click to upload cover photo
                    </span>
                    <span className="text-[11px] text-zinc-300">
                      Auto-compressed · Max 8MB · WebP output
                    </span>
                  </div>
                )}
              </label>

              <img
                src={eventData.heroImage}
                alt="Cover Preview"
                className="w-full h-52 object-cover rounded-2xl border"
              />
            </div>
          </BuilderSection>

          {/* Couple Photos */}
          <BuilderSection
            title="Couple Photos (Optional)"
            icon={<Heart size={22} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bride Photo */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Bride Photo
                </label>
                <label
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                    bridePhotoUploading
                      ? "border-[#b99863] bg-[#faf6f0]"
                      : "border-zinc-200 hover:border-[#b99863] hover:bg-[#faf6f0]/50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={bridePhotoUploading}
                    onChange={handleBridePhotoUpload}
                  />
                  {bridePhotoUploading ? (
                    <div className="flex flex-col items-center gap-2 text-[#b99863]">
                      <Loader2 size={24} className="animate-spin" />
                      <span className="text-xs font-medium">Uploading...</span>
                    </div>
                  ) : eventData.bridePhoto &&
                    !eventData.bridePhoto.startsWith("blob:") ? (
                    <div className="flex flex-col items-center gap-2 text-emerald-600">
                      <CheckCircle size={24} />
                      <span className="text-xs font-medium">
                        Click to replace
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                      <Upload size={24} />
                      <span className="text-xs font-medium">
                        Upload bride photo
                      </span>
                    </div>
                  )}
                </label>

                {eventData.bridePhoto && (
                  <div className="relative">
                    <img
                      src={eventData.bridePhoto}
                      alt="Bride Preview"
                      className="w-full h-40 object-cover rounded-2xl border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEventData({ ...eventData, bridePhoto: undefined })
                      }
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              {/* Groom Photo */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Groom Photo
                </label>
                <label
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                    groomPhotoUploading
                      ? "border-[#b99863] bg-[#faf6f0]"
                      : "border-zinc-200 hover:border-[#b99863] hover:bg-[#faf6f0]/50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={groomPhotoUploading}
                    onChange={handleGroomPhotoUpload}
                  />
                  {groomPhotoUploading ? (
                    <div className="flex flex-col items-center gap-2 text-[#b99863]">
                      <Loader2 size={24} className="animate-spin" />
                      <span className="text-xs font-medium">Uploading...</span>
                    </div>
                  ) : eventData.groomPhoto &&
                    !eventData.groomPhoto.startsWith("blob:") ? (
                    <div className="flex flex-col items-center gap-2 text-emerald-600">
                      <CheckCircle size={24} />
                      <span className="text-xs font-medium">
                        Click to replace
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                      <Upload size={24} />
                      <span className="text-xs font-medium">
                        Upload groom photo
                      </span>
                    </div>
                  )}
                </label>

                {eventData.groomPhoto && (
                  <div className="relative">
                    <img
                      src={eventData.groomPhoto}
                      alt="Groom Preview"
                      className="w-full h-40 object-cover rounded-2xl border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEventData({ ...eventData, groomPhoto: undefined })
                      }
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </BuilderSection>

          {/* Gallery Media */}
          <BuilderSection
            title="Gallery Album Grid"
            icon={<Images size={22} />}
          >
            <div className="space-y-4">
              <label
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  galleryUploading
                    ? "border-[#b99863] bg-[#faf6f0]"
                    : "border-zinc-200 hover:border-[#b99863] hover:bg-[#faf6f0]/50"
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  disabled={galleryUploading}
                  onChange={handleGalleryUpload}
                />
                {galleryUploading ? (
                  <div className="flex flex-col items-center gap-2 text-[#b99863]">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-xs font-medium">
                      Compressing &amp; uploading gallery...
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-400">
                    <Images size={24} />
                    <span className="text-xs font-medium">
                      Click to upload gallery images
                    </span>
                    <span className="text-[11px] text-zinc-300">
                      Up to 10 images · Auto-compressed · Max 8MB each
                    </span>
                  </div>
                )}
              </label>

              {eventData.gallery && eventData.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {eventData.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt="Gallery item"
                        className="h-24 w-full object-cover rounded-xl border border-zinc-100"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = eventData.gallery.filter(
                            (_: string, i: number) => i !== index,
                          );
                          setEventData({ ...eventData, gallery: updated });
                        }}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold hidden group-hover:flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </BuilderSection>

          {/* Background Ambient Audio */}
          <BuilderSection
            title="Background Ambient Audio Track"
            icon={<Music size={22} />}
          >
            <div className="space-y-3">
              <label
                className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  musicUploading
                    ? "border-[#b99863] bg-[#faf6f0]"
                    : "border-zinc-200 hover:border-[#b99863] hover:bg-[#faf6f0]/50"
                }`}
              >
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  disabled={musicUploading}
                  onChange={handleMusicUpload}
                />
                {musicUploading ? (
                  <div className="flex flex-col items-center gap-2 text-[#b99863]">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-xs font-medium">
                      Uploading audio...
                    </span>
                  </div>
                ) : eventData.musicUrl &&
                  !eventData.musicUrl.startsWith("blob:") ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-600">
                    <CheckCircle size={24} />
                    <span className="text-xs font-medium">
                      Audio uploaded — click to replace
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-400">
                    <Music size={24} />
                    <span className="text-xs font-medium">
                      Click to upload background music
                    </span>
                    <span className="text-[11px] text-zinc-300">
                      MP3 / AAC / WAV · Max 32MB
                    </span>
                  </div>
                )}
              </label>

              {eventData.musicUrl && (
                <audio
                  controls
                  src={eventData.musicUrl}
                  className="w-full rounded-xl"
                />
              )}
            </div>
          </BuilderSection>
        </>
      )}
    </div>
  );
}
