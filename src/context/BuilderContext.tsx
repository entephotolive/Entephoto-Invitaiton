"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Define explicitly typed structures to clear TypeScript warnings
export interface LoveStoryNode {
  title: string;
  subtitle: string;
  description: string;
}

export interface ScheduleNode {
  title: string;
  time: string;
  description: string;
}

export interface EventData {
  brideName: string;
  groomName: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapLink: string;
  heroImage: string;
  musicUrl: string;
  gallery: string[];
  loveStory: LoveStoryNode[];
  schedule: ScheduleNode[];
  showStory: boolean;
  showSchedule: boolean;
  showGallery: boolean;
  rsvpEnabled: boolean;
  enableGreetings: boolean;
  template: string;
  slug?: string;
  shareLink?: string;
}

interface BuilderContextType {
  eventData: EventData;
  setEventData: React.Dispatch<React.SetStateAction<EventData>>;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

const defaultState: EventData = {
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
  showStory: true,
  showSchedule: true,
  showGallery: true,
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
  // Use database data when initialized by the dynamic path wrapper, or fallback cleanly to blank mock templates
  const [eventData, setEventData] = useState<EventData>(() => {
    return initialData ? { ...defaultState, ...initialData } : defaultState;
  });

  // Keep client-side state correctly synced if database values shift during live routing operations
  useEffect(() => {
    if (initialData) {
      setEventData((prev) => ({ ...prev, ...initialData }));
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