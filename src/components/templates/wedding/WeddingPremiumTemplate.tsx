"use client";

import { useEffect, useState, useRef } from "react";
import { Menu, X, Heart, MapPin, Navigation, Play, Pause, Music2 } from "lucide-react";
import { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// --- Components ---

function FloatingPetals() {
  const [petals, setPetals] = useState<{id: number, left: number, delay: number, duration: number}[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 8,
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal text-2xl absolute pointer-events-none z-0"
          style={{
            left: `${petal.left}%`,
            top: "-5%",
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          🌸
        </div>
      ))}
    </>
  );
}

function HeroSection({ eventData }: { eventData: WeddingEventData }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${eventData?.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920"})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="uppercase tracking-[6px] text-white/80 text-sm mb-4">Save The Date</p>
        <h1 className="text-white text-7xl md:text-[120px] leading-none font-script mb-4">
          {eventData?.brideName || "Sophia"}
          <span className="mx-4">&</span>
          {eventData?.groomName || "Julian"}
        </h1>
        <p className="text-white/90 text-lg md:text-2xl mb-8">Together With Their Families</p>
        <div className="inline-block border border-white/30 backdrop-blur-md bg-white/10 rounded-full px-8 py-4">
          <p className="text-white text-xl">{eventData?.date || "June 19, 2027"}</p>
          <p className="text-white/80 text-sm mt-1">{eventData?.time || "04:00 PM"}</p>
        </div>
        <div className="mt-10">
          <a href="#rsvp" className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full transition">
            RSVP NOW
          </a>
        </div>
      </div>
    </section>
  );
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-8">
      <h3 className="text-5xl font-bold text-rose-500">{value}</h3>
      <p className="mt-2 text-zinc-500">{label}</p>
    </div>
  );
}

function CountdownSection({ eventData }: { eventData: WeddingEventData }) {
  const timeLeft = useCountdown(eventData?.date || "", eventData?.time || "", eventData?.rawWeddingDate);
  return (
    <section className="py-24 bg-[#1a1817]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-serif mb-4 text-white">Countdown</h2>
        <p className="text-zinc-400 mb-12">Counting down to our special day</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CountdownCard value={timeLeft.days} label="Days" />
          <CountdownCard value={timeLeft.hours} label="Hours" />
          <CountdownCard value={timeLeft.minutes} label="Minutes" />
          <CountdownCard value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}

function StorySection({ data }: { data: WeddingEventData }) {
  if (!data?.loveStory || data.loveStory.length === 0) return null;
  return (
    <section id="story" className="py-24 bg-white relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-rose-500 uppercase tracking-[4px] mb-3">Our Journey</p>
          <h2 className="text-5xl md:text-6xl font-heading">Our Love Story</h2>
          <div className="flex justify-center mt-6">
            <Heart className="text-rose-400" size={28} />
          </div>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-rose-200" />
          {data.loveStory.map((story, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="grid md:grid-cols-2 gap-12 mb-20 items-center">
                {isLeft ? (
                  <>
                    <div className="md:text-right">
                      <div className="bg-[#fffaf7] p-8 rounded-3xl shadow-sm">
                        <span className="text-rose-500 font-medium">{story.title}</span>
                        <h3 className="text-3xl md:text-4xl font-heading mt-3 mb-4">{story.subtitle}</h3>
                        <p className="text-zinc-600 leading-8">{story.description}</p>
                      </div>
                    </div>
                    <div>
                      {story.image && (
                        <img src={story.image} alt={story.title} className="w-full h-[350px] object-cover rounded-[32px] shadow-lg" />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      {story.image && (
                        <img src={story.image} alt={story.title} className="w-full h-[350px] object-cover rounded-[32px] shadow-lg" />
                      )}
                    </div>
                    <div>
                      <div className="bg-[#fffaf7] p-8 rounded-3xl shadow-sm">
                        <span className="text-rose-500 font-medium">{story.title}</span>
                        <h3 className="text-2xl md:text-4xl font-serif mt-3 mb-4">{story.subtitle}</h3>
                        <p className="text-zinc-600 leading-8">{story.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection({ eventData }: { eventData: WeddingEventData }) {
  if (!eventData?.schedule || eventData.schedule.length === 0) return null;
  return (
    <section id="schedule" className="py-24 bg-[#faf7f4]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-5xl text-center mb-16">Wedding Schedule</h2>
        <div className="space-y-8">
          {eventData.schedule.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="text-rose-500 text-xl font-semibold">{item.time}</div>
              <h3 className="text-3xl font-heading mt-2">{item.title}</h3>
              <p className="text-zinc-600 mt-3">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VenueSection({ eventData }: { eventData: WeddingEventData }) {
  if (!eventData?.venue) return null;
  return (
    <section id="venue" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-rose-500 uppercase tracking-[4px] mb-3">Location</p>
          <h2 className="text-5xl font-heading">Wedding Venue</h2>
        </div>
        <div className="bg-[#fffaf7] rounded-[32px] border p-10 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center">
            <MapPin className="text-rose-500" size={36} />
          </div>
          <h3 className="text-3xl font-serif mt-6">{eventData.venue}</h3>
          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">{eventData.address || "Venue Address"}</p>
          {eventData.mapLink && (
            <a href={eventData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full transition">
              <Navigation size={18} />
              Open In Google Maps
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ eventData }: { eventData: WeddingEventData }) {
  if (!eventData?.gallery || eventData.gallery.length === 0) return null;
  return (
    <section id="gallery" className="py-24 bg-[#fffaf7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-rose-500 uppercase tracking-[4px] mb-3">Memories</p>
          <h2 className="text-5xl font-heading">Gallery</h2>
        </div>
        <div className="relative px-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {eventData.gallery.map((image, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="overflow-hidden rounded-3xl shadow-sm bg-white group h-full">
                    <img src={image} alt="" className="w-full h-[350px] object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 bg-white/50 hover:bg-white text-rose-500 border-none" />
            <CarouselNext className="-right-12 bg-white/50 hover:bg-white text-rose-500 border-none" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function RSVPSection() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("attending");
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${name}! RSVP Submitted.`);
    setName("");
    setGuests(1);
    setStatus("attending");
  };

  return (
    <section id="rsvp" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-rose-500 uppercase tracking-[4px] mb-3 font-heading text-5xl">Join Us</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#fffaf7] rounded-[32px] border p-8 md:p-12 shadow-sm">
          <div className="space-y-6">
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-2xl border p-4 outline-none" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-2xl border p-4">
              <option value="attending">Will Attend</option>
              <option value="not-attending">Cannot Attend</option>
            </select>
            <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full rounded-2xl border p-4" />
            <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl transition">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function WishesSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<{name: string; message: string}[]>([
    { name: "Sarah", message: "Wishing you both a lifetime of happiness and love ❤️" },
    { name: "Michael", message: "Congratulations on your beautiful journey together." },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setWishes([{ name, message }, ...wishes]);
    setName("");
    setMessage("");
  };

  return (
    <section className="py-24 bg-[#fffaf7]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-rose-500 uppercase tracking-[4px] mb-3">Blessings</p>
          <h2 className="text-5xl font-serif">Guest Wishes</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-[32px] border p-8 shadow-sm">
            <h3 className="text-2xl font-serif mb-6">Leave A Wish</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border p-4" />
              <textarea rows={5} placeholder="Write Your Wishes..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-2xl border p-4" />
              <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full">Send Wish</button>
            </form>
          </div>
          <div className="space-y-5">
            {wishes.map((wish, index) => (
              <div key={index} className="bg-white rounded-3xl border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="text-rose-500" size={18} />
                  <span className="font-medium">{wish.name}</span>
                </div>
                <p className="text-zinc-600">{wish.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicPlayer({ musicUrl }: { musicUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [playing]);

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={musicUrl} />
      </audio>
      <button onClick={() => setPlaying(!playing)} className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-xl flex items-center justify-center transition">
        {playing ? <Pause size={24} /> : <Play size={24} />}
      </button>
      {!playing && (
        <div className="fixed bottom-24 right-6 z-50 bg-white px-4 py-2 rounded-full shadow flex items-center gap-2">
          <Music2 size={16} className="text-rose-500" />
          <span className="text-sm">Play Music</span>
        </div>
      )}
    </>
  );
}

function Footer({ eventData }: { eventData: WeddingEventData }) {
  return (
    <footer className="py-24 bg-[#faf7f4]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-script text-6xl md:text-8xl text-[#d68b95] leading-tight">
          {eventData?.brideName || "Sophia"}
          <span className="mx-8 md:mx-12">&</span>
          {eventData?.groomName || "Julian"}
        </h2>
        <p className="mt-6 text-sm md:text-base tracking-[4px] uppercase text-[#8b7c78]">
          With all our love, forever and always.
        </p>
        <div className="w-16 h-px bg-[#e6d8d3] mx-auto my-8" />
        <p className="text-[11px] md:text-xs tracking-[2px] uppercase text-[#b8aaa6]">
          © {new Date().getFullYear()} {eventData?.brideName || "Sophia"} & {eventData?.groomName || "Julian"}. Designed with care.
        </p>
        <div className="mt-4">
        </div>
      </div>
    </footer>
  );
}

// --- Main Template ---

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingPremiumTemplate({ eventData }: Props) {
  if (!eventData) return null;

  return (
    <div className="bg-white font-heading relative overflow-hidden">
      <FloatingPetals />
      
      
      
      <HeroSection eventData={eventData} />
      
      {(eventData.date || eventData.time || eventData.rawWeddingDate) && (
        <CountdownSection eventData={eventData} />
      )}
      
      {eventData.loveStory && eventData.loveStory.length > 0 && (
        <StorySection data={eventData} />
      )}
      
      {eventData.schedule && eventData.schedule.length > 0 && (
        <ScheduleSection eventData={eventData} />
      )}
      
      {eventData.venue && (
        <VenueSection eventData={eventData} />
      )}
      
      {eventData.gallery && eventData.gallery.length > 0 && (
        <GallerySection eventData={eventData} />
      )}
      
      <RSVPSection />
      
      <WishesSection />
      
      {eventData.musicUrl && (
        <MusicPlayer musicUrl={eventData.musicUrl} />
      )}
      
      <Footer eventData={eventData} />
    </div>
  );
}