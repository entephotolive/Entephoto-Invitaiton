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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load draft from local storage on mount
  useEffect(() => {
    try {
      const expiry = localStorage.getItem("wedding_draft_expiry");
      if (expiry && Date.now() < parseInt(expiry, 10)) {
        const draft = localStorage.getItem("wedding_draft_data");
        if (draft) {
          const parsedDraft = JSON.parse(draft);
          setEventData((prev) => ({ ...prev, ...parsedDraft }));
        }
      } else {
        localStorage.removeItem("wedding_draft_data");
        localStorage.removeItem("wedding_draft_expiry");
      }
    } catch (e) {
      console.error("Failed to load draft", e);
    }
    setIsLoaded(true);
  }, []);

  // Save draft to local storage on change
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      // Create a shallow copy and remove any temporary blob URLs before saving
      const dataToSave = { ...eventData } as any;
      if (typeof dataToSave.heroImage === 'string' && dataToSave.heroImage.startsWith('blob:')) delete dataToSave.heroImage;
      if (typeof dataToSave.bridePhoto === 'string' && dataToSave.bridePhoto.startsWith('blob:')) delete dataToSave.bridePhoto;
      if (typeof dataToSave.groomPhoto === 'string' && dataToSave.groomPhoto.startsWith('blob:')) delete dataToSave.groomPhoto;
      if (typeof dataToSave.musicUrl === 'string' && dataToSave.musicUrl.startsWith('blob:')) delete dataToSave.musicUrl;
      if (Array.isArray(dataToSave.gallery)) {
        dataToSave.gallery = dataToSave.gallery.filter((url: string) => !url.startsWith('blob:'));
      }
      
      localStorage.setItem("wedding_draft_data", JSON.stringify(dataToSave));
      // 7 days expiry
      localStorage.setItem("wedding_draft_expiry", (Date.now() + 7 * 24 * 60 * 60 * 1000).toString());
    }, 1000);
    return () => clearTimeout(timer);
  }, [eventData, isLoaded]);

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