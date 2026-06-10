"use client";

import { useBuilder } from "@/context/BuilderContext";

export default function BirthdayForm() {
  const { eventData, setEventData } = useBuilder();

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Birthday Person Name"
        value={eventData.title}
        onChange={(e) =>
          setEventData({
            ...eventData,
            title: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        value={eventData.date}
        onChange={(e) =>
          setEventData({
            ...eventData,
            date: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="time"
        value={eventData.time}
        onChange={(e) =>
          setEventData({
            ...eventData,
            time: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}