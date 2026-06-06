export interface EventData {
  title: string;
  host: string;
  date: string;
  venue: string;
  description: string;

  heroImage: string;
  entePhotoLink: string;

  template: "wedding" | "birthday" | "corporate";
}