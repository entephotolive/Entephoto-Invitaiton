"use client";

import { useBuilder } from "@/context/BuilderContext";
import BuilderSection from "@/components/builder/BuilderSection";
import {
  Users,
  CalendarDays,
  MapPin,
  Image,
  Images,
  Music,
  Mail,
  MessageCircle,
  Heart,
  Timer
} from "lucide-react";

interface WeddingFormProps {
  activeTab: "details" | "modules" | "media";
}

export default function WeddingForm({ activeTab }: WeddingFormProps) {
  // Cast context to 'any' to bypass strict property definition errors
  const { eventData, setEventData } = useBuilder() as any;

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
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Bride Name</label>
                <input
                  type="text"
                  placeholder="Bride Name"
                  value={eventData.brideName || ""}
                  onChange={(e) => setEventData({ ...eventData, brideName: e.target.value })}
                  className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Groom Name</label>
                <input
                  type="text"
                  placeholder="Groom Name"
                  value={eventData.groomName || ""}
                  onChange={(e) => setEventData({ ...eventData, groomName: e.target.value })}
                  className="w-full border border-zinc-200 focus:border-[#b99863] focus:ring-1 focus:ring-[#b99863] outline-none rounded-xl p-4 transition-all"
                />
              </div>
            </div>
          </BuilderSection>

          {/* Wedding Date & Time */}
          <BuilderSection title="Wedding Date & Time" icon={<CalendarDays size={22} />}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Event Date</label>
                <input
                  type="date"
                  value={eventData.date || ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setEventData({ 
                      ...eventData, 
                      date: selectedDate,
                      weddingDate: selectedDate 
                    });
                  }}
                  className="w-full border border-zinc-200 rounded-xl p-4 outline-none focus:border-[#b99863]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Event Time</label>
                <input
                  type="time"
                  value={eventData.time || ""}
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    setEventData({ 
                      ...eventData, 
                      time: selectedTime,
                      weddingTime: selectedTime 
                    });
                  }}
                  className="w-full border border-zinc-200 rounded-xl p-4 outline-none focus:border-[#b99863]"
                />
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
                onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                className="w-full border rounded-xl p-4 outline-none focus:border-[#b99863]"
              />
              <textarea
                rows={3}
                placeholder="Venue Physical Address"
                value={eventData.address || ""}
                onChange={(e) => setEventData({ ...eventData, address: e.target.value })}
                className="w-full border rounded-xl p-4 outline-none focus:border-[#b99863]"
              />
              <input
                type="text"
                placeholder="Google Maps URL"
                value={eventData.mapLink || ""}
                onChange={(e) => setEventData({ ...eventData, mapLink: e.target.value })}
                className="w-full border rounded-xl p-4 outline-none focus:border-[#b99863]"
              />
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
          <BuilderSection title="Countdown Timer Module" icon={<Timer size={22} />}>
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-medium">Display Countdown Clock</p>
                <p className="text-xs text-zinc-400">Calculates time remaining until event date.</p>
              </div>
              <input
                type="checkbox"
                checked={eventData.enableCountdown || false}
                onChange={(e) => setEventData({ ...eventData, enableCountdown: e.target.checked })}
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>
          </BuilderSection>

          {/* Love Story Segment */}
          <BuilderSection title="Love Story Section" icon={<Heart size={22} />}>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
              <div>
                <p className="text-sm font-medium">Enable Love Story Component</p>
                <p className="text-xs text-zinc-400">Share timeline details of how you both met.</p>
              </div>
              <input
                type="checkbox"
                checked={eventData.showStory || false} 
                onChange={(e) => setEventData({ ...eventData, showStory: e.target.checked })}
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>

            {eventData.showStory && (
              <div className="space-y-4">
                {eventData.loveStory?.map((story: any, index: number) => (
                  <div key={index} className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#b99863]">Story Entry #{index + 1}</h4>
                      {eventData.loveStory.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedStories = eventData.loveStory.filter((_: any, i: number) => i !== index);
                            setEventData({ ...eventData, loveStory: updatedStories });
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
                  onClick={() => setEventData({
                    ...eventData,
                    loveStory: [...(eventData.loveStory || []), { title: "", subtitle: "", description: "", image: "" }]
                  })}
                  className="px-4 py-2 border border-dashed border-zinc-300 rounded-xl text-xs font-medium text-zinc-600 hover:border-[#b99863] hover:text-[#b99863] w-full transition-all"
                >
                  + Add Story Event Node
                </button>
              </div>
            )}
          </BuilderSection>

          {/* Wedding Schedule Timeline */}
          <BuilderSection title="Event Schedule Timeline" icon={<CalendarDays size={22} />}>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
              <div>
                <p className="text-sm font-medium">Enable Timeline Display</p>
                <p className="text-xs text-zinc-400">List ceremony activities and timings.</p>
              </div>
              <input
                type="checkbox"
                checked={eventData.showSchedule || false} 
                onChange={(e) => setEventData({ ...eventData, showSchedule: e.target.checked })}
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>

            {eventData.showSchedule && (
              <div className="space-y-4">
                {eventData.schedule?.map((item: any, index: number) => (
                  <div key={index} className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50">
                    <div className="grid grid-cols-3 gap-3 mb-2">
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
                        className="col-span-2 border rounded-xl p-2.5 bg-white outline-none text-xs"
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
                  onClick={() => setEventData({
                    ...eventData,
                    schedule: [...(eventData.schedule || []), { title: "", time: "", description: "" }]
                  })}
                  className="px-4 py-2 border border-dashed border-zinc-300 rounded-xl text-xs font-medium text-zinc-600 hover:border-[#b99863] hover:text-[#b99863] w-full transition-all"
                >
                  + Add Dynamic Itinerary Module
                </button>
              </div>
            )}
          </BuilderSection>

          {/* RSVP Configuration */}
          <BuilderSection title="RSVP Collection Gate" icon={<Mail size={22} />}>
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-medium">Enable Digital RSVP Form</p>
                <p className="text-xs text-zinc-400">Enables logging for guest responses.</p>
              </div>
              <input
                type="checkbox"
                checked={eventData.rsvpEnabled || false}
                onChange={(e) => setEventData({ ...eventData, rsvpEnabled: e.target.checked })}
                className="w-5 h-5 accent-[#b99863] cursor-pointer"
              />
            </div>
          </BuilderSection>

          {/* Guest Wishes Configuration */}
          <BuilderSection title="Guest Wishes Board" icon={<MessageCircle size={22} />}>
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-medium">Enable Live Commentary Guestbook</p>
                <p className="text-xs text-zinc-400">Allows invited attendees to write continuous wishes.</p>
              </div>
              <input
                type="checkbox"
                checked={eventData.enableGreetings || false}
                onChange={(e) => setEventData({ ...eventData, enableGreetings: e.target.checked })}
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setEventData({ ...eventData, heroImage: URL.createObjectURL(file) });
                }}
                className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#faf6f0] file:text-[#43372f] hover:file:bg-zinc-100 cursor-pointer"
              />
              {eventData.heroImage && (
                <img src={eventData.heroImage} alt="Cover Preview" className="w-full h-52 object-cover rounded-2xl border" />
              )}
            </div>
          </BuilderSection>

          {/* Gallery Media */}
          <BuilderSection title="Gallery Album Grid" icon={<Images size={22} />}>
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const urls = files.map((file) => URL.createObjectURL(file));
                  setEventData({ ...eventData, gallery: [...(eventData.gallery || []), ...urls] });
                }}
                className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#faf6f0] file:text-[#43372f] hover:file:bg-zinc-100 cursor-pointer"
              />
              {eventData.gallery && eventData.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {eventData.gallery.map((image: string, index: number) => (
                    <img key={index} src={image} alt="Gallery item" className="h-24 w-full object-cover rounded-xl border border-zinc-100" />
                  ))}
                </div>
              )}
            </div>
          </BuilderSection>

          {/* Background Ambient Audio */}
          <BuilderSection title="Background Ambient Audio Track" icon={<Music size={22} />}>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setEventData({ ...eventData, musicUrl: URL.createObjectURL(file) });
              }}
              className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#faf6f0] file:text-[#43372f] hover:file:bg-zinc-100 cursor-pointer"
            />
          </BuilderSection>
        </>
      )}

    </div>
  );
}