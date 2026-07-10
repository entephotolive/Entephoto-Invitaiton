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
  entePhotoLink?: string;
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
  showCoverPhoto?: boolean;
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
  rawWeddingDate?: string;
  wishes: {
    name: string;
    message: string;
  }[];
  loveStory: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
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

export interface BirthdayEventData extends BaseEventData {
  eventType: "birthday";
  birthdayPerson?: string;
  age?: string;
  wishes: {
    name: string;
    message: string;
  }[];
  schedule: {
    title: string;
    time: string;
    description: string;
  }[];
}

export interface BabyShowerEventData extends BaseEventData {
  eventType: "babyShower";
  parentsName?: string;
  babyName?: string;
  wishes?: {
    name: string;
    message: string;
  }[];
}

export interface CorporateEventData extends BaseEventData {
  eventType: "corporate";
  companyName?: string;
  speakerDetails?: string;
  agenda?: string;
  schedule?: {
    title: string;
    time: string;
    description: string;
  }[];
}

export interface EngagementEventData extends BaseEventData {
  eventType: "engagement";
  brideName?: string;
  groomName?: string;
}

export interface HousewarmingEventData extends BaseEventData {
  eventType: "housewarming";
  host?: string;
}

export type EventData = 
  | WeddingEventData 
  | BirthdayEventData 
  | BabyShowerEventData 
  | CorporateEventData
  | EngagementEventData
  | HousewarmingEventData;