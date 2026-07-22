export interface BaseEventData {
  slug?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue?: string;
  address?: string;
  mapLink?: string;
  heroImage?: string;
  gallery: string[];
  musicUrl?: string;
  enableCountdown?: boolean;
  enableGreetings?: boolean;
  template?: string;
  shareLink?: string;
  rsvpEnabled: boolean;
  rsvpResponses?: {
    name: string;
    attending: boolean;
    guests: number;
  }[];

  /* SECTION VISIBILITY */
  showVenue: boolean;
  showGallery: boolean;
  showMusic?: boolean;
  showRSVP?: boolean;
  showWishes?: boolean;
  showTimeline?: boolean;
}

export interface WeddingEventData extends BaseEventData {
  eventType: "wedding";
  brideName: string;
  groomName: string;
  bridePhoto?: string;
  groomPhoto?: string;
  brideParents?: string;
  groomParents?: string;
  rawWeddingDate?: string;
  wishes: {
    name: string;
    message: string;
  }[];
  loveStory: {
    title: string;
    subtitle: string;
    description: string;
  }[];
  schedule: {
    title: string;
    time: string;
    description: string;
  }[];
  showCoupleInfo: boolean;
  showSchedule: boolean;
  showStory: boolean;
}

export type EventData = WeddingEventData;