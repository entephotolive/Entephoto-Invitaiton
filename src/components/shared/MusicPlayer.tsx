"use client";

import { useBuilder } from "@/context/BuilderContext";

export default function MusicPlayer() {
  const { eventData } = useBuilder();

  if (!eventData.musicUrl) {
    return null;
  }

  return (
    <audio
      controls
      autoPlay
      loop
      className="fixed top-4 right-4 z-50"
    >
      <source src={eventData.musicUrl} />
    </audio>
  );
}