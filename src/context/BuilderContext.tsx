"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { EventData } from "@/types/event";

interface BuilderContextType {
  eventData: EventData;
  setEventData: React.Dispatch<
    React.SetStateAction<EventData>
  >;
}

const BuilderContext =
  createContext<BuilderContextType | null>(null);

export function BuilderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [eventData, setEventData] =
    useState<EventData>({
      // General
      eventType: "wedding",

      title: "",
      description: "",
      host: "",

      // Wedding
      brideName: "",
      groomName: "",

      // Birthday
      birthdayPerson: "",
      age: "",

      // Baby Shower
      parentsName: "",
      babyName: "",

      // Corporate
      companyName: "",
      speakerDetails: "",
      agenda: "",

      // Common
      date: "",
      time: "",

      venue: "",
      address: "",

      mapLink: "",

      heroImage: "",

      gallery: [],
      entePhotoLink: "",

      musicUrl: "",

      enableCountdown: true,
      enableGreetings: true,

      wishes: [],

      template: "",

      shareLink: "",

      
      slug: "",

      rsvpEnabled: true,

rsvpResponses: [],
    });

  return (
    <BuilderContext.Provider
      value={{
        eventData,
        setEventData,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error(
      "useBuilder must be used inside BuilderProvider"
    );
  }

  return context;
}