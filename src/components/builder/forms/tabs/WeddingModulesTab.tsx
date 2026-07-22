"use client";

import { CalendarDays, Heart, Mail, MessageCircle, Timer } from "lucide-react";
import BuilderSection from "@/components/builder/BuilderSection";
import { useRef } from "react";

import type { WeddingEventData } from "@/types/event";

interface Props {
  eventData: WeddingEventData;
  setEventData: React.Dispatch<React.SetStateAction<WeddingEventData>>;
}

export default function WeddingModulesTab({ eventData, setEventData }: Props) {
  const handleToggle = (field: keyof WeddingEventData, checked: boolean) => {
    setEventData((prev: WeddingEventData) => ({ ...prev, [field]: checked }));
  };

  const updateArrayItem = (
    arrayKey: "loveStory" | "schedule",
    index: number,
    field: string,
    value: string,
  ) => {
    const updated = [...(eventData[arrayKey] || [])] as any[];
    updated[index] = { ...updated[index], [field]: value };
    setEventData((prev: WeddingEventData) => ({ ...prev, [arrayKey]: updated }));
  };

  const removeArrayItem = (arrayKey: "loveStory" | "schedule", index: number) => {
    const updated = (eventData[arrayKey] || []).filter(
      (_: any, i: number) => i !== index,
    );
    setEventData((prev: WeddingEventData) => ({ ...prev, [arrayKey]: updated }));
  };

  const addArrayItem = (arrayKey: "loveStory" | "schedule", template: object) => {
    const newItem = { ...template, _id: Math.random().toString(36).substring(2, 11) };
    setEventData((prev: WeddingEventData) => ({
      ...prev,
      [arrayKey]: [...(prev[arrayKey] || []), newItem],
    }));
  };
 
  return (
    <>
      {/* Countdown Timer */}
      <BuilderSection title="Countdown Timer Module" icon={<Timer size={22} />}>
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
            onChange={(e) => handleToggle("enableCountdown", e.target.checked)}
            className="w-5 h-5 accent-[#b99863] cursor-pointer"
          />
        </div>
      </BuilderSection>

      {/* Love Story Section */}
      <BuilderSection title="Love Story Section" icon={<Heart size={22} />}>
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
          <div>
            <p className="text-sm font-medium">Enable Love Story Component</p>
            <p className="text-xs text-zinc-400">
              Share timeline details of how you both met.
            </p>
          </div>
          <input
            type="checkbox"
            checked={eventData.showStory || false}
            onChange={(e) => handleToggle("showStory", e.target.checked)}
            className="w-5 h-5 accent-[#b99863] cursor-pointer"
          />
        </div>

        {eventData.showStory && (
          <div className="space-y-4">
            {(eventData.loveStory || []).map((story: any, index: number) => (
              <div
                key={story._id || index}
                className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#b99863]">
                    Story Entry #{index + 1}
                  </h4>
                  {(eventData.loveStory || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("loveStory", index)}
                      className="px-2 py-1 text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Story Title"
                  value={story.title || ""}
                  onChange={(e) =>
                    updateArrayItem("loveStory", index, "title", e.target.value)
                  }
                  className="w-full border rounded-xl p-3 bg-white mb-2 outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  value={story.subtitle || ""}
                  onChange={(e) =>
                    updateArrayItem(
                      "loveStory",
                      index,
                      "subtitle",
                      e.target.value,
                    )
                  }
                  className="w-full border rounded-xl p-3 bg-white mb-2 outline-none text-sm"
                />
                <textarea
                  rows={3}
                  placeholder="Story Content Description..."
                  value={story.description || ""}
                  onChange={(e) =>
                    updateArrayItem(
                      "loveStory",
                      index,
                      "description",
                      e.target.value,
                    )
                  }
                  className="w-full border rounded-xl p-3 bg-white mb-2 outline-none text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addArrayItem("loveStory", {
                  title: "",
                  subtitle: "",
                  description: "",
                  image: "",
                })
              }
              className="px-4 py-2 border border-dashed border-zinc-300 rounded-xl text-xs font-medium text-zinc-600 hover:border-[#b99863] hover:text-[#b99863] w-full transition-all"
            >
              + Add Story Event Node
            </button>
          </div>
        )}
      </BuilderSection>

      {/* Event Schedule Timeline */}
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
            onChange={(e) => handleToggle("showSchedule", e.target.checked)}
            className="w-5 h-5 accent-[#b99863] cursor-pointer"
          />
        </div>

        {eventData.showSchedule && (
          <div className="space-y-4">
            {(eventData.schedule || []).map((item: any, index: number) => (
              <div
                key={item._id || index}
                className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
                  <input
                    type="text"
                    placeholder="06:00 PM"
                    value={item.time || ""}
                    onChange={(e) =>
                      updateArrayItem("schedule", index, "time", e.target.value)
                    }
                    className="col-span-1 border rounded-xl p-2.5 bg-white outline-none text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Event Header Title"
                    value={item.title || ""}
                    onChange={(e) =>
                      updateArrayItem(
                        "schedule",
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                    className="sm:col-span-2 border rounded-xl p-2.5 bg-white outline-none text-xs"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Short itinerary snippet details..."
                  value={item.description || ""}
                  onChange={(e) =>
                    updateArrayItem(
                      "schedule",
                      index,
                      "description",
                      e.target.value,
                    )
                  }
                  className="w-full border rounded-xl p-2.5 bg-white outline-none text-xs"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addArrayItem("schedule", {
                  title: "",
                  time: "",
                  description: "",
                })
              }
              className="px-4 py-2 border border-dashed border-zinc-300 rounded-xl text-xs font-medium text-zinc-600 hover:border-[#b99863] hover:text-[#b99863] w-full transition-all"
            >
              + Add Dynamic Itinerary Module
            </button>
          </div>
        )}
      </BuilderSection>

      {/* RSVP */}
      <BuilderSection title="RSVP Collection Gate" icon={<Mail size={22} />}>
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
            onChange={(e) => handleToggle("rsvpEnabled", e.target.checked)}
            className="w-5 h-5 accent-[#b99863] cursor-pointer"
          />
        </div>
      </BuilderSection>

      {/* Guest Wishes */}
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
            onChange={(e) => handleToggle("enableGreetings", e.target.checked)}
            className="w-5 h-5 accent-[#b99863] cursor-pointer"
          />
        </div>
      </BuilderSection>
    </>
  );
}
