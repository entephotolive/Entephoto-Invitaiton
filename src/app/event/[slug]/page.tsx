import { MapPin, Calendar, Clock, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Interface mirroring your EventData structure
interface EventData {
  title: string;
  description: string;
  brideName?: string;
  groomName?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapLink?: string;
  heroImage?: string;
  gallery?: string[];
  showStory?: boolean;
  loveStory?: { title: string; subtitle: string; description: string }[];
  showSchedule?: boolean;
  schedule?: { title: string; time: string; description: string }[];
}

// 1. Fetching function to load saved database information
async function getInvitationData(slug: string): Promise<EventData | null> {
  try {
    // Replace with your exact absolute or relative production endpoint URL configuration
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/invitations?slug=${slug}`, {
      cache: "no-store", // Ensure real-time lookups
    });
    
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
  const data = await getInvitationData(resolvedParams.slug);

  // Fallback to Next.js 404 page frame if data row entry is non-existent
  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#43372f] font-sans antialiased selection:bg-[#b99863]/20">
      
      {/* Hero Banner Section Cover */}
      <div className="relative h-[65vh] w-full flex items-end justify-center pb-12 overflow-hidden shadow-md">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${data.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf6f0] via-black/20 to-black/40" />
        
        <div className="relative text-center px-4 max-w-3xl z-10 animate-fade-in text-white drop-shadow-sm">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-200 block mb-3">You Are Warmly Invited</span>
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 text-[#faf6f0]">
            {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : data.title}
          </h1>
          <p className="text-sm md:text-base font-serif italic max-w-xl mx-auto opacity-90 text-zinc-100">{data.description}</p>
        </div>
      </div>

      {/* Primary Detail Content Container Core Panel */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        
        {/* Date, Timing, & Venue Card */}
        <section className="bg-white rounded-[24px] p-8 md:p-12 border border-zinc-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-zinc-100">
          <div className="flex flex-col items-center md:items-start justify-center pb-6 md:pb-0">
            <Calendar className="text-[#b99863] mb-3" size={26} />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Date</span>
            <p className="font-semibold text-lg mt-1">{data.date || "To Be Scheduled"}</p>
          </div>
          <div className="flex flex-col items-center justify-center py-6 md:py-0 md:px-8">
            <Clock className="text-[#b99863] mb-3" size={26} />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Time</span>
            <p className="font-semibold text-lg mt-1">{data.time || "To Be Announced"}</p>
          </div>
          <div className="flex flex-col items-center md:items-start justify-center pt-6 md:pt-0 md:pl-8">
            <MapPin className="text-[#b99863] mb-3" size={26} />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Venue</span>
            <p className="font-semibold mt-1 text-zinc-800 leading-tight">{data.venue || "Location Confirmed soon"}</p>
            <p className="text-xs text-zinc-400 mt-1">{data.address}</p>
            {data.mapLink && (
              <Link 
                href={data.mapLink} 
                target="_blank" 
                className="text-xs font-bold text-[#b99863] hover:underline uppercase tracking-wider mt-3 inline-block"
              >
                View Google Map
              </Link>
            )}
          </div>
        </section>

        {/* Dynamic Chapter Segment: Love Story Timeline Node Grid Mapping */}
        {data.showStory && data.loveStory && data.loveStory.length > 0 && (
          <section className="space-y-8 animate-fade-in">
            <div className="text-center">
              <Heart className="text-rose-400 mx-auto mb-2" size={24} />
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-zinc-800">Our Shared Journey</h2>
              <div className="w-12 h-0.5 bg-[#b99863]/40 mx-auto mt-3" />
            </div>

            <div className="relative border-l border-zinc-200 max-w-xl mx-auto ml-4 sm:mx-auto space-y-10 py-4">
              {data.loveStory.map((story, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#b99863] group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#b99863] bg-amber-50 px-2 py-0.5 rounded-full">{story.subtitle}</span>
                  <h3 className="text-lg font-serif font-semibold mt-1 text-zinc-800">{story.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{story.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Chapter Segment: Scheduled Events Itinerary Progression Map */}
        {data.showSchedule && data.schedule && data.schedule.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <Clock className="text-amber-600 mx-auto mb-2" size={24} />
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-zinc-800">Celebration Schedule</h2>
              <div className="w-12 h-0.5 bg-[#b99863]/40 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {data.schedule.map((item, i) => (
                <div key={i} className="bg-white border border-zinc-100 p-5 rounded-2xl shadow-2xs flex gap-4 items-start">
                  <div className="bg-[#faf6f0] text-xs font-mono font-bold px-3 py-1.5 rounded-lg text-[#b99863] shrink-0">
                    {item.time}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-800">{item.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Media Album Photo Grid Mapping Gallery Block */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-zinc-400">Captured Moments</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white shadow-xs group bg-zinc-100">
                  <img 
                    src={img} 
                    alt={`Gallery asset chunk ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Sticky Bottom Digital Response RSVP Floating Frame Drawer placeholder */}
      <footer className="border-t border-zinc-100 bg-white py-8 text-center text-xs text-zinc-400">
        <p className="font-serif italic text-zinc-500 mb-1">Thank you for being a monumental part of our life story.</p>
        <p>&copy; {new Date().getFullYear()} — Generated Digital Invitation Panel</p>
      </footer>

    </div>
  );
}