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

  template: string;

  shareLink: string;

  rsvpEnabled: boolean;

rsvpResponses: {
  name: string;
  attending: boolean;
  guests: number;
}[];
}