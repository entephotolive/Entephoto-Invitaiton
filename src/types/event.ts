export interface EventData {
  eventType: string;

  slug?: string;

  title: string;
  description: string;
  host: string;

  brideName: string;
  groomName: string;

  birthdayPerson: string;
  age: string;

  parentsName: string;
  babyName: string;

  companyName: string;
  speakerDetails: string;
  agenda: string;

  date: string;
  time: string;

  venue: string;
  address: string;

  mapLink: string;

  heroImage: string;

  gallery: string[];

  entePhotoLink: string;

  musicUrl: string;

  enableCountdown: boolean;
  enableGreetings: boolean;

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

  template: string;

  shareLink: string;

  rsvpEnabled: boolean;

  rsvpResponses: {
    name: string;
    attending: boolean;
    guests: number;
  }[];

  /* SECTION VISIBILITY */

  showCoupleInfo: boolean;

  showSchedule: boolean;

  showVenue: boolean;

  showCoverPhoto: boolean;

  showGallery: boolean;

  showMusic: boolean;

  showRSVP: boolean;

  showWishes: boolean;

  showStory: boolean;

  showTimeline: boolean;
}