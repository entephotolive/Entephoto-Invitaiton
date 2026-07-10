import { notFound } from "next/navigation";
import { BuilderProvider } from "@/context/BuilderContext";
import { getInvitationAction } from "@/lib/actions/invitation";
import { TEMPLATES } from "@/lib/templates";

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
  gallery?: string[];
  loveStory?: { title: string; subtitle: string; description: string }[];
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const res = await getInvitationAction(resolvedParams.slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const rawData = res.data as BackendInvitationData;

  const bride = rawData.brideName || "Bride";
  const groom = rawData.groomName || "Groom";

  // FORCE MAP EVERYTHING: We fill every possible variation of keys 
  // so whatever hidden key your template expects, it gets it perfectly.
  const sanitizedEventData = {
    brideName: bride,
    groomName: groom,
    title: rawData.title || `${bride} & ${groom}'s Wedding`,
    description: rawData.description || "You are warmly invited to join our celebration.",
    heroImage: rawData.coverPhoto || "https://images.unsplash.com/photo-1519741497674-611481863552",
    
    // 1. Both raw date and clean display strings
    rawWeddingDate: rawData.weddingDate || "",
    weddingDate: rawData.weddingDate || "",
    weddingTime: rawData.weddingTime || "",
    
    date: (rawData.weddingDate && !isNaN(new Date(rawData.weddingDate).getTime())) 
      ? new Date(rawData.weddingDate).toLocaleDateString("en-US", {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        }) 
      : "To Be Scheduled",
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
    showStory: !!rawData.loveStory?.length,
    gallery: rawData.gallery || [],
    showGallery: !!rawData.gallery?.length,
    
    // 2. BACKEND TO TEMPLATE OVERRIDES:
    // We fill all fallback names so the layout context can read it instantly.
    enableCountdown: rawData.enableCountdown ?? true, 
    showCountdown: rawData.enableCountdown ?? true,
    countdownEnabled: rawData.enableCountdown ?? true,
    
    rsvpEnabled: rawData.rsvpSettings?.enabled ?? true,
    enableGreetings: rawData.guestWishesSettings?.enabled ?? true,
    showCoupleInfo: true,
    showVenue: !!(rawData.venueDetails?.venueName),
    wishes: [],
    // Use templateId for lookup in the TEMPLATES registry
    template: rawData.template?.templateId || "premium",
    eventType: "wedding" as const,
  };

  // Resolve the template component from the registry
  const templateId = (rawData.template?.templateId) || "premium";
  const matchedTemplate = TEMPLATES.find((t) => t.id === templateId);
  const fallbackTemplate = TEMPLATES.find((t) => t.id === "premium")!;
  const { Component: TemplateComponent } = matchedTemplate || fallbackTemplate;

  return (
    <div className="min-h-screen bg-white">
      <BuilderProvider initialData={sanitizedEventData as any}>
        <TemplateComponent eventData={sanitizedEventData as any} />
      </BuilderProvider>
    </div>
  );
}