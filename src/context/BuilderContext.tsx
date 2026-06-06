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
      title: "",
      host: "",
      date: "",
      venue: "",
      description: "",
      heroImage: "",
      entePhotoLink: "",
      template: "wedding",
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