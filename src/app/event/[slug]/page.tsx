import { notFound } from "next/navigation";
import WeddingTemplate from "@/components/templates/WeddingTemplate";
import { BuilderProvider } from "@/context/BuilderContext";

interface BackendInvitationData {
  title?: string;
  description?: string;
  brideName?: string;
  groomName?: string;
  slug: string;
  coverPhoto?: string;
  weddingDate?: string;
  weddingTime?: string;
  enableCountdown?: boolean; // Form field flag
  loveStory?: string;
  weddingSchedule?: { ceremony: string; time: string; description: string }[];
  venueDetails?: {
    venueName: string;
    address: string;
    googleMapLink: string;
  };
  rsvpSettings?: { enabled: boolean };
  guestWishesSettings?: { enabled: boolean };
  template?: {
    templateId: string;
    templateName: string;
  };
  musicUrl?: string;
}

async function getInvitationData(slug: string): Promise<BackendInvitationData | null> {
  try {
    const res = await fetch(
      `https://invitation-api-x8zb.vercel.app/api/invitations/${slug}`,
      { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching invitation details:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawData = await getInvitationData(resolvedParams.slug);

  if (!rawData) {
    notFound();
  }

  // FORCE MAP EVERYTHING: We fill every possible variation of keys 
  // so whatever hidden key your template expects, it gets it perfectly.
  const sanitizedEventData = {
    brideName: rawData.brideName || "Bride",
    groomName: rawData.groomName || "Groom",
    title: rawData.title || `${rawData.brideName} & ${rawData.groomName}'s Wedding`,
    description: rawData.description || "You are warmly invited to join our celebration.",
    heroImage: rawData.coverPhoto || "https://images.unsplash.com/photo-1519741497674-611481863552",
    
    // 1. Both raw date and clean display strings
    rawWeddingDate: rawData.weddingDate || "",
    weddingDate: rawData.weddingDate || "",
    weddingTime: rawData.weddingTime || "",
    
    date: rawData.weddingDate ? new Date(rawData.weddingDate).toLocaleDateString("en-US", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) : "To Be Scheduled",
    time: rawData.weddingTime || "To Be Announced",
    
    venue: rawData.venueDetails?.venueName || "Location Confirmed Soon",
    address: rawData.venueDetails?.address || "",
    mapLink: rawData.venueDetails?.googleMapLink || "",
    musicUrl: rawData.musicUrl || "",
    
    schedule: (rawData.weddingSchedule || []).map((item) => ({
      title: item.ceremony,
      time: item.time,
      description: item.description,
    })),
    loveStory: Array.isArray(rawData.loveStory) ? rawData.loveStory : [],    
    showSchedule: !!rawData.weddingSchedule?.length,
    showStory: !!rawData.loveStory,
    
    // 2. BACKEND TO TEMPLATE OVERRIDES:
    // We fill all fallback names so the layout context can read it instantly.
    enableCountdown: rawData.enableCountdown ?? true, 
    showCountdown: rawData.enableCountdown ?? true,
    countdownEnabled: rawData.enableCountdown ?? true,
    
    rsvpEnabled: rawData.rsvpSettings?.enabled ?? true,
    enableGreetings: rawData.guestWishesSettings?.enabled ?? true,
    template: rawData.template?.templateName || "premium", 
  };

  return (
    <div className="min-h-screen bg-white">
      <BuilderProvider initialData={sanitizedEventData}>
        <WeddingTemplate />
      </BuilderProvider>
    </div>
  );
}