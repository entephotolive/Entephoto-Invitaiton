"use client";

import { WeddingEventData } from "@/types/event";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  Volume2, VolumeX, X, Clock, MapPin, 
  Calendar, Navigation, User, Phone, 
  Users, MessageSquare, CheckCircle, Loader2, Heart, Send 
} from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { submitRsvp, submitWish } from "@/lib/actions/guest";

interface Props {
  eventData: WeddingEventData;
}

import Envelope3D from "./envelope/Envelope3D";

export default function WeddingBlackGoldTemplate({ eventData }: Props) {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!eventData.musicUrl) return;
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, eventData.musicUrl]);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // RSVP state
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attendance: "yes",
    message: "",
  });
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = (eventData as any).id || eventData.slug;
    if (!eventId) return;
    
    setRsvpLoading(true);
    setRsvpError("");

    try {
      const res = await submitRsvp({
        slug: eventId,
        name: rsvpData.name,
        guests: parseInt(rsvpData.guests) || 1,
        message: rsvpData.message,
        attending: rsvpData.attendance === "yes",
      });

      if (res.success) {
        setRsvpSubmitted(true);
      } else {
        setRsvpError(res.error || "Failed to submit RSVP");
      }
    } catch (err) {
      setRsvpError("An unexpected error occurred.");
    } finally {
      setRsvpLoading(false);
    }
  };

  // Wishes state
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [wishesList, setWishesList] = useState(eventData.wishes || []);
  const [wishLoading, setWishLoading] = useState(false);
  const [wishError, setWishError] = useState("");

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = (eventData as any).id || eventData.slug;
    if (!eventId || !wishName.trim() || !wishMessage.trim()) return;

    setWishLoading(true);
    setWishError("");

    try {
      const res = await submitWish({
        slug: eventId,
        name: wishName.trim(),
        message: wishMessage.trim(),
      });

      if (res.success) {
        setWishesList([
          { name: wishName.trim(), message: wishMessage.trim() },
          ...wishesList,
        ]);
        setWishName("");
        setWishMessage("");
      } else {
        setWishError(res.error || "Failed to submit wish.");
      }
    } catch (err) {
      setWishError("An unexpected error occurred.");
    } finally {
      setWishLoading(false);
    }
  };

  // Countdown hook
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);
  const countdownCards = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const hasCoupleInfo = eventData.showCoupleInfo !== false && (eventData.brideName || eventData.groomName);
  const showCountdown = eventData.enableCountdown !== false && (eventData.date || eventData.time || eventData.rawWeddingDate);
  const showLoveStory = eventData.showStory !== false && eventData.loveStory && eventData.loveStory.length > 0;
  const showSchedule = eventData.showSchedule !== false && eventData.schedule && eventData.schedule.length > 0;
  const showGallery = eventData.showGallery !== false && eventData.gallery && eventData.gallery.length > 0;
  const showVenue = eventData.venue || eventData.address || eventData.mapLink;
  const showRSVP = eventData.rsvpEnabled !== false;
  const showGreetings = eventData.enableGreetings !== false;

  const [showMainContent, setShowMainContent] = useState(false);

  const handleOpenEnvelope = () => {
    // Auto-play music when user interacts with the envelope (bypasses browser autoplay policies)
    if (eventData.musicUrl && audioRef.current) {
      setIsPlaying(true);
    }
    setShowMainContent(true);
  };

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-white font-sans ${!showMainContent ? "h-screen overflow-hidden" : "overflow-x-hidden"}`}>
      {/* Realistic Traditional Letter / Envelope Overlay */}
      <AnimatePresence>
        {!showMainContent && (
          <Envelope3D eventData={eventData} onOpen={handleOpenEnvelope} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {eventData.heroImage ? (
          <img src={eventData.heroImage} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[#0A0A0A]" />
        )}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5" />

        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="inline-block px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] uppercase tracking-[4px] text-xs mb-8">
              You're Invited
            </span>
            {eventData.brideName && (
              <h1 className="text-white font-serif text-6xl md:text-8xl lg:text-[110px] leading-none">
                {eventData.brideName}
              </h1>
            )}
            {eventData.brideName && eventData.groomName && (
              <div className="my-6 text-[#D4AF37] text-4xl">&</div>
            )}
            {eventData.groomName && (
              <h1 className="text-white font-serif text-6xl md:text-8xl lg:text-[110px] leading-none">
                {eventData.groomName}
              </h1>
            )}
            <div className="w-32 h-px bg-[#D4AF37] mx-auto my-10" />
            {eventData.date && (
              <p className="text-[#D4AF37] uppercase tracking-[5px]">
                {eventData.date}
              </p>
            )}
            {eventData.venue && (
              <p className="mt-4 text-neutral-300 text-lg">
                {eventData.venue}
              </p>
            )}
            {showRSVP && (
              <button
                onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-10 px-10 py-4 rounded-full bg-[#D4AF37] text-black font-medium hover:scale-105 transition"
              >
                RSVP Now
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Couple Section */}
      {hasCoupleInfo && (
        <section id="couple" className="py-32 bg-[#151515] scroll-mt-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">The Couple</p>
              <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">Meet The Happy Couple</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 md:gap-10">
              {eventData.brideName && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full max-w-sm mx-auto mb-10 group">
                    {eventData.bridePhoto ? (
                      <div className="overflow-hidden rounded-[32px] border border-[#D4AF37]/10 bg-white/5">
                        <img 
                          src={eventData.bridePhoto} 
                          alt={eventData.brideName} 
                          className="w-full aspect-[4/5] object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/5] rounded-[32px] border border-[#D4AF37]/10 bg-white/5 flex items-center justify-center text-7xl">
                        
                      </div>
                    )}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#0A0A0A] px-8 py-3 rounded-full border border-[#D4AF37]/30 whitespace-nowrap shadow-xl">
                      <span className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] font-bold">The Bride</span>
                    </div>
                  </div>
                  <h3 className="text-4xl font-serif text-white">{eventData.brideName}</h3>
                </div>
              )}

              {eventData.groomName && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full max-w-sm mx-auto mb-10 group">
                    {eventData.groomPhoto ? (
                      <div className="overflow-hidden rounded-[32px] border border-[#D4AF37]/10 bg-white/5">
                        <img 
                          src={eventData.groomPhoto} 
                          alt={eventData.groomName} 
                          className="w-full aspect-[4/5] object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/5] rounded-[32px] border border-[#D4AF37]/10 bg-white/5 flex items-center justify-center text-7xl">
                        
                      </div>
                    )}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#0A0A0A] px-8 py-3 rounded-full border border-[#D4AF37]/30 whitespace-nowrap shadow-xl">
                      <span className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] font-bold">The Groom</span>
                    </div>
                  </div>
                  <h3 className="text-4xl font-serif text-white">{eventData.groomName}</h3>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Parents Section */}
      {(eventData.brideParents || eventData.groomParents) && (
        <section id="parents" className="py-24 bg-[#0A0A0A] scroll-mt-32 border-t border-[#D4AF37]/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">With The Blessings Of</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-serif text-white">Our Parents</h2>
              <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-6" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {eventData.brideParents ? (
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-serif text-white mb-4">Bride's Parents</h3>
                  <p className="text-[#D4AF37] whitespace-pre-wrap text-xl font-light leading-relaxed">{eventData.brideParents}</p>
                </div>
              ) : <div className="hidden md:block"></div>}

              {eventData.groomParents ? (
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-serif text-white mb-4">Groom's Parents</h3>
                  <p className="text-[#D4AF37] whitespace-pre-wrap text-xl font-light leading-relaxed">{eventData.groomParents}</p>
                </div>
              ) : <div className="hidden md:block"></div>}
            </div>
          </div>
        </section>
      )}

      {/* Countdown Section */}
      {showCountdown && (
        <section className="py-32 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Counting Down</p>
              <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">Until Forever Begins</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8 mb-16" />
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {countdownCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-[32px] p-8 text-center hover:border-[#D4AF37] transition"
                >
                  <div className="text-[#D4AF37] text-6xl font-serif">
                    {String(card.value).padStart(2, "0")}
                  </div>
                  <p className="mt-4 uppercase tracking-[4px] text-neutral-400 text-xs">{card.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Love Story Section */}
      {showLoveStory && (
        <section id="story" className="py-32 bg-[#151515] scroll-mt-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Our Journey</p>
              <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">Our Love Story</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8" />
            </motion.div>

            <div className="relative flex flex-col items-center">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center w-full max-w-3xl"
                >
                  {/* Heart Icon */}
                  <div className="w-14 h-14 rounded-full bg-[#151515] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)] z-10">
                    <Heart size={24} className="fill-[#D4AF37]/20" />
                  </div>
                  
                  {/* Line down to content */}
                  <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/50 to-[#D4AF37]/10 my-2" />
                  
                  {/* Content Box */}
                  <div className="w-full bg-white/5 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[32px] p-10 md:p-14 text-center hover:border-[#D4AF37]/30 transition-colors duration-500">
                    {story.subtitle && (
                      <p className="uppercase tracking-[4px] text-[#D4AF37] text-xs mb-6 font-medium">{story.subtitle}</p>
                    )}
                    <h3 className="text-4xl md:text-5xl font-serif text-white">{story.title}</h3>
                    <p className="mt-8 text-neutral-400 leading-8 whitespace-pre-wrap text-lg">{story.description}</p>
                  </div>
                  
                  {/* Line to next item */}
                  {index !== eventData.loveStory.length - 1 && (
                    <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/30 to-transparent mt-4 mb-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {showGallery && (
        <>
          <section id="gallery" className="py-32 bg-[#0A0A0A] scroll-mt-32">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24"
              >
                <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Captured Moments</p>
                <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">Wedding Gallery</h2>
                <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8" />
              </motion.div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {eventData.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="break-inside-avoid cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="overflow-hidden rounded-[32px] border border-[#D4AF37]/10 bg-white/5">
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        loading="lazy"
                        className="w-full transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-6"
                onClick={() => setSelectedImage(null)}
              >
                <button className="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition">
                  <X size={34} />
                </button>
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  src={selectedImage}
                  alt="Enlarged gallery view"
                  className="max-w-full max-h-[90vh] rounded-[24px] border border-[#D4AF37]/20 object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Schedule Section */}
      {showSchedule && (
        <section id="schedule" className="py-32 bg-[#0A0A0A] scroll-mt-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Wedding Timeline</p>
              <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">Order Of Events</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8" />
            </motion.div>

            <div className="space-y-10">
              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[30px] p-8 hover:border-[#D4AF37]/30 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-serif text-white">{item.title}</h3>
                      <p className="mt-4 text-neutral-400 leading-7 whitespace-pre-wrap">{item.description}</p>
                    </div>
                    {item.time && (
                      <div className="flex items-center gap-3 px-5 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-[#D4AF37]">
                        <Clock size={18} />
                        <span className="tracking-wider font-medium">{item.time}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Venue Section */}
      {showVenue && (
        <section id="venue" className="py-32 bg-[#0A0A0A] scroll-mt-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Venue Details</p>
              <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">Wedding Location</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[36px] p-10"
              >
                {eventData.venue && (
                  <h3 className="text-white text-4xl font-serif mb-8">{eventData.venue}</h3>
                )}
                <div className="space-y-6">
                  {eventData.address && (
                    <div className="flex gap-4">
                      <MapPin className="text-[#D4AF37] mt-1" />
                      <div>
                        <h4 className="text-white font-medium">Address</h4>
                        <p className="text-neutral-400 whitespace-pre-wrap">{eventData.address}</p>
                      </div>
                    </div>
                  )}
                  {eventData.date && (
                    <div className="flex gap-4">
                      <Calendar className="text-[#D4AF37] mt-1" />
                      <div>
                        <h4 className="text-white font-medium">Date</h4>
                        <p className="text-neutral-400">{eventData.date}</p>
                      </div>
                    </div>
                  )}
                  {eventData.time && (
                    <div className="flex gap-4">
                      <Clock className="text-[#D4AF37] mt-1" />
                      <div>
                        <h4 className="text-white font-medium">Time</h4>
                        <p className="text-neutral-400">{eventData.time}</p>
                      </div>
                    </div>
                  )}
                </div>
                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full bg-[#D4AF37] text-black font-medium hover:scale-105 transition"
                  >
                    <Navigation size={18} />
                    Open Google Maps
                  </a>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-[36px] border border-[#D4AF37]/10 bg-white/5 backdrop-blur-xl"
              >
                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    className="min-h-[500px]"
                    title="Google Map Venue Location"
                  />
                ) : (
                  <div className="min-h-[500px] flex items-center justify-center text-[#D4AF37]">
                    Map Preview
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {showRSVP && (
        <section id="rsvp" className="py-32 bg-[#151515] scroll-mt-32">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Confirm Attendance</p>
              <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">RSVP</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[40px] p-8 md:p-12"
            >
              {rsvpSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={70} className="text-[#D4AF37] mx-auto" />
                  <h3 className="mt-6 text-white text-3xl font-serif">Thank You</h3>
                  <p className="mt-4 text-neutral-400">Your RSVP has been received successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <User size={16} className="text-[#D4AF37]" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      className="w-full bg-black/30 border border-[#D4AF37]/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <Phone size={16} className="text-[#D4AF37]" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={rsvpData.phone}
                      onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                      className="w-full bg-black/30 border border-[#D4AF37]/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <Users size={16} className="text-[#D4AF37]" /> Number Of Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                      className="w-full bg-black/30 border border-[#D4AF37]/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-3">Attendance</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attendance: "yes" })}
                        className={`py-4 rounded-2xl border transition-colors ${
                          rsvpData.attendance === "yes"
                            ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                            : "border-[#D4AF37]/20 text-white hover:border-[#D4AF37]/50"
                        }`}
                      >
                        Attending
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attendance: "no" })}
                        className={`py-4 rounded-2xl border transition-colors ${
                          rsvpData.attendance === "no"
                            ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                            : "border-[#D4AF37]/20 text-white hover:border-[#D4AF37]/50"
                        }`}
                      >
                        Not Attending
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <MessageSquare size={16} className="text-[#D4AF37]" /> Message
                    </label>
                    <textarea
                      rows={5}
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      className="w-full bg-black/30 border border-[#D4AF37]/10 rounded-2xl px-5 py-4 text-white resize-none outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                  {rsvpError && <div className="text-red-400 text-sm mt-2 text-center">{rsvpError}</div>}
                  <button
                    type="submit"
                    disabled={rsvpLoading}
                    className="w-full py-5 rounded-full bg-[#D4AF37] text-black font-semibold hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {rsvpLoading && <Loader2 className="animate-spin" size={18} />}
                    {rsvpLoading ? "Submitting..." : "Confirm Attendance"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Wishes Section */}
      {showGreetings && (
        <section id="wishes" className="py-32 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Blessings</p>
              <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white">Guest Wishes</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[36px] p-8"
              >
                <h3 className="text-white text-3xl font-serif mb-8">Leave Your Wishes</h3>
                <form onSubmit={handleWishSubmit} className="space-y-6">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={wishName}
                    onChange={(e) => setWishName(e.target.value)}
                    className="w-full bg-black/30 border border-[#D4AF37]/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your wishes..."
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    className="w-full bg-black/30 border border-[#D4AF37]/10 rounded-2xl px-5 py-4 text-white resize-none outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                  {wishError && <div className="text-red-400 text-sm mt-2 text-center">{wishError}</div>}
                  <button
                    type="submit"
                    disabled={wishLoading || !wishName.trim() || !wishMessage.trim()}
                    className="w-full py-4 rounded-full bg-[#D4AF37] text-black font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition"
                  >
                    {wishLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    {wishLoading ? "Submitting..." : "Submit Wish"}
                  </button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar"
              >
                {wishesList.length === 0 && (
                  <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[32px] p-8 text-center text-neutral-400">
                    No wishes yet. Be the first to leave a message!
                  </div>
                )}
                {wishesList.map((wish, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[32px] p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart size={18} className="text-[#D4AF37]" />
                      <span className="text-white font-medium">{wish.name}</span>
                    </div>
                    <p className="text-neutral-400 leading-8 whitespace-pre-wrap">{wish.message}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Section */}
      <footer className="relative overflow-hidden bg-[#0A0A0A] border-t border-[#D4AF37]/10 py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="mt-8 text-white text-4xl md:text-6xl font-serif">
            {eventData.brideName || "Bride"}
            <span className="text-[#D4AF37] mx-4">&</span>
            {eventData.groomName || "Groom"}
          </h2>
          <p className="mt-6 text-neutral-400 max-w-2xl mx-auto">
            Thank you for being part of our beautiful journey and celebrating this special day with us.
          </p>
          <div className="w-full h-px bg-[#D4AF37]/10 my-16" />
          <div className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} {eventData.brideName || "Bride"} & {eventData.groomName || "Groom"}
          </div>
        </div>
      </footer>

      {/* Background Audio Button */}
      {eventData.musicUrl && (
        <>
          <audio ref={audioRef} src={eventData.musicUrl} loop />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#D4AF37] text-black rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 rounded-full animate-ping" />
                <Volume2 className="relative z-10 animate-[spin_4s_linear_infinite]" size={24} />
              </div>
            ) : (
              <VolumeX size={24} />
            )}
          </button>
        </>
      )}
    </div>
  );
}