"use client";

import { WeddingEventData } from "@/types/event";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Countdown from "./Countdown";
import Story from "./Story";
import Gallery from "./Gallery";
import Schedule from "./Schedule";
import Venue from "./Venue";
import RSVP from "./RSVP";
import Wishes from "./Wishes";

import Footer from "./Footer";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingBlackGoldTemplate({
  eventData,
}: Props) {
  return (
    <div
      className="
      min-h-screen
      bg-[#0A0A0A]
      text-white
      overflow-x-hidden
      "
    >
      {/* Navbar */}

      <Navbar
        eventData={eventData}
      />

      {/* Hero */}

      <Hero
        eventData={eventData}
      />

      {/* Countdown */}

      {eventData.enableCountdown && (
        <Countdown
          eventData={eventData}
        />
      )}

      {/* Love Story */}

      {eventData.showStory && (
        <Story
          eventData={eventData}
        />
      )}

      {/* Gallery */}

      {eventData.showGallery && (
        <Gallery
          eventData={eventData}
        />
      )}

      {/* Timeline */}
      {eventData.showSchedule && (
        <Schedule
          eventData={eventData}
        />
      )}
      

      {/* Venue */}

      {eventData.showVenue && (
        <Venue
          eventData={eventData}
        />
      )}

      {/* RSVP */}

      {eventData.showRSVP &&
        eventData.rsvpEnabled && (
          <RSVP
            eventData={eventData}
          />
        )}

      {/* Wishes */}

      {eventData.showWishes &&
        eventData.enableGreetings && (
          <Wishes
            eventData={eventData}
          />
        )}

      {/* Family */}

      {/* Footer */}

      <Footer
        eventData={eventData}
      />
    </div>
  );
}