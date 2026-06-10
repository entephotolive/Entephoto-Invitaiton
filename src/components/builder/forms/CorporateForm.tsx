"use client";

import { useBuilder } from "@/context/BuilderContext";

export default function CorporateForm() {
  const { eventData, setEventData } = useBuilder();

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Company Name"
        value={eventData.host}
        onChange={(e) =>
          setEventData({
            ...eventData,
            host: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Event Name"
        value={eventData.title}
        onChange={(e) =>
          setEventData({
            ...eventData,
            title: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}