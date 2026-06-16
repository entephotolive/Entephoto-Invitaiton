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
      /* EVENT TYPE */

      eventType: "wedding",

      /* GENERAL */

      slug: "",

      title: "",
      description: "",
      host: "",

      /* WEDDING */

      brideName: "",
      groomName: "",

      /* BIRTHDAY */

      birthdayPerson: "",
      age: "",

      /* BABY SHOWER */

      parentsName: "",
      babyName: "",

      /* CORPORATE */

      companyName: "",
      speakerDetails: "",
      agenda: "",

      /* COMMON */

      date: "",
      time: "",

      venue: "",
      address: "",
      mapLink: "",

      heroImage: "",

      gallery: [],

      entePhotoLink: "",

      musicUrl: "",

      /* LOVE STORY */

      loveStory: [
        {
          title: "",
          subtitle: "",
          description: "",
          image: "",
        },
      ],

      /* SCHEDULE */

      schedule: [
        {
          title: "Ceremony",
          time: "04:00 PM",
          description: "",
        },
      ],

      /* SETTINGS */

      enableCountdown: true,
      enableGreetings: true,

      wishes: [],

      /* TEMPLATE */

      template: "royal",

      shareLink: "",

      /* RSVP */

      rsvpEnabled: true,

      rsvpResponses: [],

      /* SECTION VISIBILITY */

      showCoupleInfo: true,

      showSchedule: true,

      showVenue: true,

      showCoverPhoto: true,

      showGallery: true,

      showMusic: true,

      showRSVP: true,

      showWishes: true,

      showStory: true,

      showTimeline: true,
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