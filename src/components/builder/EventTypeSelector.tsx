import React from "react";
import { useBuilder } from "@/context/BuilderContext";

const eventTypes = [
  "wedding",
  "birthday",
  "engagement",
  "babyshower",
  "housewarming",
  "corporate",
];

export default function EventTypeSelector() {
  const { eventData, setEventData } = useBuilder() as any;

  const selectEvent = (type: string) => {
    setEventData((prev: any) => ({
      ...prev,
      eventType: type,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {eventTypes.map((type) => (
        <button
          key={type}
          onClick={() => selectEvent(type)}
          className={`p-6 rounded-xl border text-lg capitalize transition ${
            eventData?.eventType === type
              ? "border-amber-600 bg-amber-50"
              : "border-gray-200"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}