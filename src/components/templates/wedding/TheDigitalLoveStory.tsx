"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Smartphone,
} from "lucide-react";

import type { EventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: EventData;
}

// Reusable 3D iPhone Mockup Component
function IphoneMockup({ 
  children, 
  screenContent 
}: { 
  children?: React.ReactNode; 
  screenContent?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotateY: -15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-[280px] h-[560px] flex-shrink-0 hidden md:flex flex-col items-center justify-center"
    >
      {/* Outer Phone Shell */}
      <div className="relative w-full h-full bg-neutral-900 rounded-[3rem] border-[6px] border-neutral-800 shadow-2xl shadow-black/50 overflow-hidden">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />
        
        {/* Screen Area */}
        <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden bg-background">
          
          {/* Custom Screen Content passed via props */}
          {screenContent && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              {screenContent}
            </div>
          )}

          {/* Fallback to mapped children if no specific screenContent is provided */}
          {!screenContent && children}
          
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-600 rounded-full z-20" />
      </div>
    </motion.div>
  );
}

export default function WeddingTropicalBeach({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  return (
    <main className="bg-background text-foreground overflow-x-hidden">

      {/* HERO - Full Width Intro */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary">

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <p className="uppercase tracking-[0.5em] text-primary-foreground/70 text-sm mb-6">
            Swipe Into Our Love Story
          </p>

          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground drop-shadow-lg">
            {eventData.brideName}
          </h1>

          <div className="text-accent text-5xl my-4">&</div>

          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground drop-shadow-lg">
            {eventData.groomName}
          </h1>

          <p className="mt-10 text-xl text-primary-foreground/90">
            {eventData.date}
          </p>

          <div className="mt-10 animate-bounce text-primary-foreground/80">
            <Smartphone size={32} className="mx-auto" />
            <p className="text-sm mt-2 tracking-widest uppercase">Scroll to explore</p>
          </div>
        </motion.div>
      </section>

      {/* COUPLE SECTION - Phone 1 */}
      {eventData.showCoupleInfo && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            <div className="flex-1 text-center md:text-left">
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">The Couple</span>
              <h2 className="text-5xl font-bold mt-4 mb-8">Meet The Happy Couple</h2>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="text-4xl mb-2">👰</div>
                  <h3 className="text-2xl font-bold">{eventData.brideName}</h3>
                  <p className="text-muted-foreground">The Bride</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="text-4xl mb-2">🤵</div>
                  <h3 className="text-2xl font-bold">{eventData.groomName}</h3>
                  <p className="text-muted-foreground">The Groom</p>
                </div>
              </div>
            </div>

            <IphoneMockup 
              screenContent={
                <>
                  <div className="text-6xl mb-4">🥂</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Two Peas in a Pod</h3>
                  <p className="text-sm text-muted-foreground">Best friends turned soulmates.</p>
                </>
              } 
            />

          </div>
        </section>
      )}

      {/* EVENT DETAILS - Phone 2 (Reversed Layout) */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
          
          <IphoneMockup 
              screenContent={
                <>
                  <CalendarDays className="text-accent-foreground mx-auto mb-4" size={32} />
                  <h3 className="text-lg font-bold text-foreground mb-1">Save The Date</h3>
                  <p className="text-2xl font-bold text-accent-foreground">{eventData.date}</p>
                  <div className="my-3 w-12 h-px bg-border mx-auto"></div>
                  <Clock3 className="text-accent-foreground mx-auto mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">{eventData.time}</p>
                </>
              } 
            />

          <div className="flex-1 text-center md:text-left">
            <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">Event Details</span>
            <h2 className="text-5xl font-bold mt-4 mb-8">When & Where</h2>
            
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <CalendarDays className="text-accent-foreground flex-shrink-0" size={28} />
                <div>
                  <h4 className="font-semibold">Date</h4>
                  <p className="text-muted-foreground">{eventData.date}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <Clock3 className="text-accent-foreground flex-shrink-0" size={28} />
                <div>
                  <h4 className="font-semibold">Time</h4>
                  <p className="text-muted-foreground">{eventData.time}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <MapPin className="text-accent-foreground flex-shrink-0" size={28} />
                <div>
                  <h4 className="font-semibold">Venue</h4>
                  <p className="text-muted-foreground">{eventData.venue}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* COUNTDOWN SECTION - Phone 3 */}
      {eventData.enableCountdown && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            <div className="flex-1 text-center md:text-left">
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">Countdown</span>
              <h2 className="text-5xl font-bold mt-4 mb-10">The Clock Is Ticking</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                  { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                  { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                  { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center">
                    <h3 className="text-4xl font-bold text-accent-foreground">{item.value}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <IphoneMockup 
              screenContent={
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background">
                  <div className="text-5xl mb-4">⏳</div>
                  <div className="flex gap-2 text-center">
                    <div>
                      <p className="text-2xl font-bold text-accent-foreground">{String(timeLeft.days).padStart(2,'0')}</p>
                      <p className="text-[10px] text-muted-foreground">DAYS</p>
                    </div>
                    <span className="text-xl font-bold text-muted-foreground/50">:</span>
                    <div>
                      <p className="text-2xl font-bold text-accent-foreground">{String(timeLeft.hours).padStart(2,'0')}</p>
                      <p className="text-[10px] text-muted-foreground">HRS</p>
                    </div>
                  </div>
                </div>
              } 
            />

          </div>
        </section>
      )}

      {/* LOVE STORY - Phone 4 */}
      {eventData.showStory && eventData.loveStory?.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
            
            <IphoneMockup 
              screenContent={
                <>
                  <Heart className="text-destructive mx-auto mb-3" size={28} fill="currentColor" />
                  <p className="text-sm text-muted-foreground leading-relaxed">"{eventData.loveStory[0]?.description?.substring(0, 100)}..."</p>
                </>
              } 
            />

            <div className="flex-1 text-center md:text-left">
              <Heart className="mx-auto md:mx-0 text-accent-foreground mb-4" size={32} />
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">Our Story</span>
              <h2 className="text-5xl font-bold mt-4 mb-10">How It All Began</h2>
              
              <div className="space-y-6">
                {eventData.loveStory.slice(0, 3).map((story, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-sm text-left">
                    <p className="text-xs text-accent-foreground uppercase tracking-wider mb-1">{story.subtitle}</p>
                    <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{story.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* SCHEDULE - Phone 5 */}
      {eventData.showSchedule && eventData.schedule?.length > 0 && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            <div className="flex-1 text-center md:text-left">
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">Timeline</span>
              <h2 className="text-5xl font-bold mt-4 mb-10">The Day's Plan</h2>
              
              <div className="space-y-4">
                {eventData.schedule.map((item, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-full ml-4 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <IphoneMockup 
              screenContent={
                <div className="w-full px-4 text-left space-y-4 overflow-hidden">
                  <h4 className="text-center font-bold text-lg text-foreground mb-4">Itinerary</h4>
                  {eventData.schedule.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 border-l-2 border-accent pl-3">
                      <div>
                        <p className="text-xs font-bold text-foreground">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              } 
            />

          </div>
        </section>
      )}

      {/* GALLERY - Phone 6 */}
      {eventData.showGallery && eventData.gallery?.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
            
            <IphoneMockup 
              screenContent={
                <div className="w-full h-full p-2 space-y-2 overflow-hidden">
                  {eventData.gallery.slice(0, 3).map((img, i) => (
                    <img key={i} src={img} alt="" className="w-full h-28 object-cover rounded-xl shadow-md" />
                  ))}
                </div>
              } 
            />

            <div className="flex-1 text-center md:text-left">
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">Gallery</span>
              <h2 className="text-5xl font-bold mt-4 mb-10">Captured Moments</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {eventData.gallery.slice(0, 4).map((image, index) => (
                  <motion.img
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    src={image}
                    alt=""
                    className="w-full h-48 object-cover rounded-2xl border border-border shadow-lg cursor-pointer"
                  />
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* RSVP SECTION - Phone 7 */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            <div className="flex-1 text-center md:text-left">
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">RSVP</span>
              <h2 className="text-5xl font-bold mt-4 mb-4">Confirm Your Spot</h2>
              <p className="text-muted-foreground mb-10">Let us know if you'll be joining us.</p>
              
              <div className="bg-card border border-border rounded-[32px] p-8 shadow-lg">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Number of Guests"
                    className="w-full p-3 rounded-xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring text-sm"
                  />
                  <textarea
                    rows={3}
                    placeholder="Leave a message..."
                    className="w-full p-3 rounded-xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition text-sm"
                  >
                    Submit RSVP
                  </button>
                </form>
              </div>
            </div>

            <IphoneMockup 
              screenContent={
                <div className="text-center px-4">
                  <div className="text-5xl mb-4">✉️</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">We&apos;d love to hear from you!</h3>
                  <p className="text-xs text-muted-foreground">Fill out the form to let us know you are coming.</p>
                  <div className="mt-6 w-full h-8 bg-accent/20 rounded-lg animate-pulse"></div>
                </div>
              } 
            />

          </div>
        </section>
      )}

      {/* WISHES WALL - Phone 8 */}
      {eventData.enableGreetings && eventData.wishes?.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
            
            <IphoneMockup 
              screenContent={
                <div className="text-left px-4 space-y-3 overflow-hidden">
                  <div className="text-2xl text-center mb-2">💬</div>
                  {eventData.wishes.slice(0, 2).map((wish, i) => (
                    <div key={i} className="bg-background/50 p-3 rounded-lg border border-border">
                      <p className="text-[10px] text-muted-foreground italic">&quot;{wish.message}&quot;</p>
                      <p className="text-[10px] font-bold text-accent-foreground mt-1 text-right">- {wish.name}</p>
                    </div>
                  ))}
                </div>
              } 
            />

            <div className="flex-1 text-center md:text-left">
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">Wishes</span>
              <h2 className="text-5xl font-bold mt-4 mb-10">Heartfelt Messages</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {eventData.wishes.slice(0, 4).map((wish, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="text-accent-foreground text-3xl mb-2">❝</div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{wish.message}</p>
                    <div className="text-sm font-semibold text-accent-foreground">{wish.name}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* LOCATION - Phone 9 */}
      {eventData.showVenue && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            <div className="flex-1 text-center md:text-left">
              <span className="uppercase tracking-[0.3em] text-muted-foreground text-sm">Venue</span>
              <h2 className="text-5xl font-bold mt-4 mb-8">Find Us Here</h2>
              
              <div className="bg-card border border-border rounded-[32px] p-8 shadow-lg mb-6">
                <h3 className="text-2xl font-bold mb-4">{eventData.venue}</h3>
                <p className="text-muted-foreground mb-6">{eventData.address}</p>
                
                {eventData.mapLink && (
                  <a
                    href={eventData.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition font-semibold text-sm"
                  >
                    Get Directions
                  </a>
                )}
              </div>
            </div>

            <IphoneMockup 
              screenContent={
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted/50">
                  <MapPin className="text-accent-foreground mb-3" size={32} />
                  <p className="text-xs font-bold text-center px-4">{eventData.venue}</p>
                  <div className="mt-3 w-10 h-10 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[10px] text-muted-foreground mt-2">Loading Maps...</p>
                </div>
              } 
            />

          </div>
        </section>
      )}

      {/* MUSIC BUTTON - Kept as floating overlay */}
      {eventData.musicUrl && (
        <div className="fixed bottom-6 right-6 z-50">
          <audio id="tropical-audio" src={eventData.musicUrl} loop />
          <button
            onClick={() => {
              const audio = document.getElementById("tropical-audio") as HTMLAudioElement;
              if (!audio) return;
              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-2xl shadow-2xl transition border border-border flex items-center justify-center"
          >
            📱
          </button>
        </div>
      )}

      {/* FOOTER - Full Width Outro */}
      <footer className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] text-primary-foreground/70">
            With Love
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mt-6 mb-8">
            See You There
          </h2>

          <div className="text-4xl md:text-6xl font-bold">
            {eventData.brideName}
            <span className="mx-4 text-accent">&</span>
            {eventData.groomName}
          </div>

          <p className="mt-8 text-primary-foreground/60 text-sm">
            Crafted with modern love using Ente Invite
          </p>
        </div>
      </footer>

    </main>
  );
}