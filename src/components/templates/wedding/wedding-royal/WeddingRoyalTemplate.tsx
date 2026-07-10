"use client";

import { WeddingEventData } from "@/types/event";

import RoyalNavbar from "./Navbar";
import RoyalHero from "./Hero";
import RoyalCountdown from "./Countdown";
import RoyalStory from "./Story";
import RoyalSchedule from "./Schedule";
import RoyalGallery from "./Gallery";
import RoyalVenue from "./Venue";
import RoyalRSVP from "./Rsvp";
import RoyalWishes from "./Wishes";
import RoyalFooter from "./Footer";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingRoyalTemplate({
  eventData,
}: Props) {
  return (
    <div
      className="
      min-h-screen
      bg-[#FCFBF7]
      text-[#1B1B1B]
      "
    >
      {/* Navigation */}

      <RoyalNavbar
        eventData={eventData}
      />

      {/* Hero */}

      <RoyalHero
        eventData={eventData}
      />

      {/* Countdown */}

      {eventData.enableCountdown && (
        <RoyalCountdown
          eventData={eventData}
        />
      )}

      {/* Story */}

      {eventData.showStory && (
        <RoyalStory
          eventData={eventData}
        />
      )}

      {/* Schedule */}

      {eventData.showSchedule && (
        <RoyalSchedule
          eventData={eventData}
        />
      )}

      {/* Gallery */}

      {eventData.showGallery && (
        <RoyalGallery
          eventData={eventData}
        />
      )}

      {/* Venue */}

      {eventData.showVenue && (
        <RoyalVenue
          eventData={eventData}
        />
      )}

      {/* RSVP */}

      {eventData.showRSVP &&
        eventData.rsvpEnabled && (
          <RoyalRSVP
            eventData={eventData}
          />
        )}

      {/* Wishes */}

      {eventData.showWishes &&
        eventData.enableGreetings && (
          <RoyalWishes
            eventData={eventData}
          />
        )}

      {/* Footer */}

      <RoyalFooter
        eventData={eventData}
      />
    </div>
  );
}