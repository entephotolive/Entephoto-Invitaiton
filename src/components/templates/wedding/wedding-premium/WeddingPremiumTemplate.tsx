"use client";

import { WeddingEventData } from "@/types/event";

import FloatingPetals from "./FloatingPetals";
import HeroSection from "./HeroSection";
import CountdownSection from "./CountdownSection";
import StorySection from "./StorySection";
import ScheduleSection from "./ScheduleSection";
import VenueSection from "./VenueSection";
import GallerySection from "./GallerySection";
import RSVPSection from "./RSVPSection";
import WishesSection from "./WishesSection";
import MusicPlayer from "./MusicPlayer";
import { data } from "framer-motion/client";
import Header from "./Header";
import FooterSection from "./FooterSection";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingPremiumTemplate({
  eventData,
}: Props) {
  return (
    <div className="bg-white font-heading">

      <FloatingPetals />

      <Header eventData={eventData} />

      <HeroSection eventData={eventData} />

      {eventData.enableCountdown && (
        <CountdownSection
          eventData={eventData}
        />
      )}

      <StorySection data={eventData}/>

      <ScheduleSection
        eventData={eventData}
      />

      <VenueSection
        eventData={eventData}
      />

      {eventData.showGallery && (
        <GallerySection
          eventData={eventData}
        />
      )}

      {eventData.rsvpEnabled && (
        <RSVPSection />
      )}

      {eventData.enableGreetings && (
        <WishesSection />
      )}

      <MusicPlayer
        musicUrl={eventData.musicUrl || ""}
      />

      <FooterSection eventData={eventData}/>

    </div>
  );
}