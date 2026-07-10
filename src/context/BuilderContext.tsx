"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import type { EventData, WeddingEventData } from "@/types/event";

interface BuilderContextType {
  eventData: EventData;
  setEventData: React.Dispatch<React.SetStateAction<EventData>>;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

const defaultState: WeddingEventData = {
  eventType: "wedding",
  brideName: "",
  groomName: "",
  title: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  address: "",
  mapLink: "",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552",
  musicUrl: "",
  gallery: [],
  loveStory: [],
  schedule: [],
  wishes: [],
  showStory: true,
  showCoupleInfo: true,
  showSchedule: true,
  showGallery: true,
  showVenue: true,
  rsvpEnabled: true,
  enableGreetings: true,
  template: "premium",
};

export function BuilderProvider({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode; 
  initialData?: Partial<EventData>; 
}) {
  const [eventData, setEventData] = useState<EventData>(() => {
    return initialData ? { ...defaultState, ...initialData } as EventData : defaultState;
  });

  useEffect(() => {
    if (initialData) {
      setEventData((prev) => ({ ...prev, ...initialData }) as EventData);
    }
  }, [initialData]);

  return (
    <BuilderContext.Provider value={{ eventData, setEventData }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used inside BuilderProvider"); // Safeguards against context omissions
  }
  return context;
}