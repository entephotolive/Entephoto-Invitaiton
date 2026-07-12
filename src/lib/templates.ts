import type { EventData, WeddingEventData } from "@/types/event";

// Import all templates
import EditorialLuxury from "@/components/templates/wedding/EditorialLuxury";
import GoldenUnion from "@/components/templates/wedding/GoldenUnion";
import JourneyToForever from "@/components/templates/wedding/JourneyToForever";
import RomanticMidnightGarden from "@/components/templates/wedding/Romantic-midnight-garden";
import RomanticLuxuryRose from "@/components/templates/wedding/RomanticLuxuryRose";
import TheDigitalLoveStory from "@/components/templates/wedding/TheDigitalLoveStory";
import WeddingTropicalBeach from "@/components/templates/wedding/WeddingTropicalBeach";
import WeddingModern from "@/components/templates/wedding/wedding-modern";
import WeddingOceanica from "@/components/templates/wedding/wedding-ocianica";
import TraditionalTemplate from "@/components/templates/wedding/wedding-traditional";
import WeddingBlackGoldTemplate from "@/components/templates/wedding/wedding-blackgold/WeddingBlackGoldTemplate";
import WeddingPremiumTemplate from "@/components/templates/wedding/wedding-premium/WeddingPremiumTemplate";
import WeddingRoyalTemplate from "@/components/templates/wedding/wedding-royal/WeddingRoyalTemplate";
import DeepOceanMail from "@/components/templates/wedding/DeepOceanMail";
import MessageInBottle from "@/components/templates/wedding/MessageInBottke";
import NaturalEarthyBotanical from "@/components/templates/wedding/NaturalEarthy&Botanical";
import RainyDayRomance from "@/components/templates/wedding/RainyDayRomance";
import CoveringRings from "@/components/templates/wedding/CoveringRings";
import DancingGarden from "@/components/templates/wedding/DancingGarden";
import BotanicalGarden from "@/components/templates/wedding/BotanicalGarden";
import MasterCraftsmanWood from "@/components/templates/wedding/MasterCraftsmanWood";
import WarmRoseGoldEmeraldDarkModel from "@/components/templates/wedding/WarmRoseGold&EmeraldDarkModel";
import WarmWoodenRusticAesthetic from "@/components/templates/wedding/WarmWoodenRusticAesthetic";
import VintageStationery from "@/components/templates/wedding/VintageStationery";
import CelestialStarlight from "@/components/templates/wedding/CelestialStarlight";
import PastelFloralMinimalistGarden from "@/components/templates/wedding/PastelFloral&MinimalistGarden";
import HeritageWedding from "@/components/templates/wedding/HeritageWedding";
import TheArtGallery from "@/components/templates/wedding/TheArtGallery";
import DynamicBubbleLayer from "@/components/templates/wedding/DynamicBubbleLayer";
import MidnightinParis from "@/components/templates/wedding/MidnightinParis";
import EternalGraceoftheTaj from "@/components/templates/wedding/EternalGraceoftheTaj";
import RomanticWedding from "@/components/templates/wedding/RomanticWedding";
import WeddingInvitation from "@/components/templates/wedding/WeddingInvitation";
import DeepOceanHorizon from "@/components/templates/wedding/DeepOceanHorizon";

// Comprehensive dummy data to populate all templates nicely
export const dummyEventData: WeddingEventData = {
  eventType: "wedding",
  brideName: "Amelia",
  groomName: "James",
  title: "Amelia & James Wedding",
  description: "Join us in celebrating our special day.",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552",
  date: "October 15, 2026",
  time: "4:00 PM",
  rawWeddingDate: "2026-10-15T16:00:00Z",
  venue: "The Grand Estate",
  address: "123 Romance Blvd, Beverly Hills, CA",
  mapLink:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.491419734346!2d-118.41168432360252!3d34.0953330147614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04ce8e49b1%3A0xe54e6015b6756ec5!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  loveStory: [
    {
      title: "First Met",
      subtitle: "Where it all began",
      description: "We met at a coffee shop and talked for hours.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
    },
    {
      title: "The Proposal",
      subtitle: "She said yes!",
      description: "A magical sunset proposal by the beach.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8",
    },
  ],
  schedule: [
    {
      title: "Ceremony",
      time: "4:00 PM",
      description: "The exchange of vows.",
    },
    {
      title: "Reception",
      time: "6:00 PM",
      description: "Dinner, drinks, and dancing.",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74",
  ],
  wishes: [
    {
      name: "Sarah & Mike",
      message: "Wishing you a lifetime of love and happiness!",
    },
  ],
  musicUrl: "",

  // Feature flags toggled ON to show off the full template capabilities
  showCoupleInfo: true,
  showStory: true,
  showSchedule: true,
  showGallery: true,
  showVenue: true,
  enableCountdown: true,
  enableGreetings: true,
  rsvpEnabled: true,
};

export const TEMPLATES = [
  { id: "modern", name: "Modern Wedding", Component: WeddingModern },
  { id: "editorial", name: "Editorial Luxury", Component: EditorialLuxury },
  { id: "golden", name: "Golden Union", Component: GoldenUnion },
  { id: "journey", name: "Journey To Forever", Component: JourneyToForever },
  { id: "midnight",name: "Midnight Garden",Component: RomanticMidnightGarden,},
  { id: "rose", name: "Luxury Rose", Component: RomanticLuxuryRose },
  { id: "digital", name: "Digital Love Story", Component: TheDigitalLoveStory },
  { id: "tropical", name: "Tropical Beach", Component: WeddingTropicalBeach },
  { id: "oceanica", name: "Oceanica", Component: WeddingOceanica },
  { id: "traditional", name: "Traditional", Component: TraditionalTemplate },
  { id: "blackgold",name: "Black & Gold",Component: WeddingBlackGoldTemplate,},
  { id: "premium", name: "Premium", Component: WeddingPremiumTemplate },
  { id: "royal", name: "Royal", Component: WeddingRoyalTemplate },
  { id: "deep-ocean", name: "Deep Ocean Mail", Component: DeepOceanMail },
  { id: "message-bottle",name: "Message In Bottle",Component: MessageInBottle,},
  { id: "natural-earthy",name: "Natural Earthy",Component: NaturalEarthyBotanical,},
  { id: "rainy-day", name: "Rainy Day Romance", Component: RainyDayRomance },
  { id: "covering-rings", name: "Covering Rings", Component: CoveringRings },
  { id: "dancing-garden", name: "Dancing Garden", Component: DancingGarden },
  { id: "botanical-garden",name: "Botanical Garden",Component: BotanicalGarden,},
  { id: "MasterCraftsmanWood",name: "Master Craftsman Wood",Component: MasterCraftsmanWood,},
  { id: "WarmRoseGoldEmeraldDarkModel",name: "Warm Rose Gold & Emerald Dark Model",Component: WarmRoseGoldEmeraldDarkModel,},
  { id: "warm wooden/rustic aesthetic",name: "warm wooden/rustic aesthetic",Component: WarmWoodenRusticAesthetic,},
  { id: "VintageStationery",name: "Vintage Stationery",Component: VintageStationery,},
  { id: "CelestialStarlight",name: "Celestial Starlight",Component: CelestialStarlight,},
  { id: "HeritageWedding",name: "Heritage Wedding",Component: HeritageWedding,},
  { id: "Pastel Floral & Minimalist Garden",name: "Pastel Floral & Minimalist Garden",Component:PastelFloralMinimalistGarden,},
  { id: "Midnight-in-Paris",name: "Midnight in Paris",Component: MidnightinParis,},
  { id: "TheArtGallery", name: "TheArtGallery", Component: TheArtGallery },
  { id: "DynamicBubbleLayer",name: "Dynamic Bubble Layer",Component: DynamicBubbleLayer,},
  { id: "EternalGraceoftheTaj",name: "EternalGraceoftheTaj",Component: EternalGraceoftheTaj,},
  { id: "romantic-wedding",name: "Romantic Wedding",Component: RomanticWedding,},
  { id: "wedding-invitation",name: "Wedding Invitation",Component: WeddingInvitation,},
  { id: "DeepOceanHorizon",name: "Deep Ocean Horizon",Component: DeepOceanHorizon,},
];
