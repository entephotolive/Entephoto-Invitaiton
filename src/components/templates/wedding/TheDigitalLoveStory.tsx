"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin, Heart, Smartphone } from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { hasValue } from "@/lib/utils";

interface Props {
  eventData: WeddingEventData;
}

// ─── Reusable 3D iPhone Mockup — always 280 × 560, content centred ────────────
function IphoneMockup({ screenContent }: { screenContent: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: -10 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-[280px] h-[560px] flex-shrink-0 mx-auto"
    >
      {/* Phone Shell */}
      <div className="absolute inset-0 bg-neutral-900 rounded-[3rem] border-[6px] border-neutral-800 shadow-2xl shadow-black/50">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

        {/* Screen */}
        <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden bg-background">
          <div
            className="w-full h-full flex flex-col items-center justify-center p-5 text-center overflow-hidden"
            style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
          >
            {screenContent}
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-neutral-600 rounded-full z-20" />
      </div>
    </motion.div>
  );
}

// ─── Section heading label ──────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <span className="uppercase tracking-[0.35em] text-muted-foreground text-xs font-semibold">
      {label}
    </span>
  );
}

// ─── Main Template ──────────────────────────────────────────────────────────────
export default function TheDigitalLoveStory({ eventData }: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  const bride    = hasValue(eventData.brideName) ? eventData.brideName : null;
  const groom    = hasValue(eventData.groomName) ? eventData.groomName : null;
  const hasNames = bride || groom;

  // Shared countdown content (used in both desktop + mobile to avoid duplication)
  const countdownScreenContent = (
    <div className="w-full flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-primary/10 to-background py-4">
      <div className="text-5xl">⏳</div>
      <div className="grid grid-cols-2 gap-3 w-full px-2">
        {[
          { label: "DAYS", value: String(timeLeft.days).padStart(2, "0") },
          { label: "HRS",  value: String(timeLeft.hours).padStart(2, "0") },
          { label: "MIN",  value: String(timeLeft.minutes).padStart(2, "0") },
          { label: "SEC",  value: String(timeLeft.seconds).padStart(2, "0") },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border rounded-xl p-3 text-center shadow-sm">
            <p className="text-xl font-bold text-accent-foreground">{item.value}</p>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Shared map iframe content
  const hasMapData = hasValue(eventData.mapLink) || hasValue(eventData.venue) || hasValue(eventData.address);
  const mapSrc     = eventData.mapLink || "";

  return (
    <main className="bg-background text-foreground overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
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

          {hasNames && (
            <>
              {bride && (
                <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground drop-shadow-lg">
                  {bride}
                </h1>
              )}
              {bride && groom && <div className="text-accent text-5xl my-4">&</div>}
              {groom && (
                <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground drop-shadow-lg">
                  {groom}
                </h1>
              )}
            </>
          )}

          {hasValue(eventData.date) && (
            <p className="mt-10 text-xl text-primary-foreground/90">{eventData.date}</p>
          )}

          <div className="mt-10 animate-bounce text-primary-foreground/80">
            <Smartphone size={32} className="mx-auto" />
            <p className="text-sm mt-2 tracking-widest uppercase">Scroll to explore</p>
          </div>
        </motion.div>
      </section>

      {/* ── COUPLE ────────────────────────────────────────────────────────────── */}
      {eventData.showCoupleInfo && hasNames && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel label="The Couple" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Meet The Happy Couple</h2>
            </div>

            <div className={`grid gap-8 ${bride && groom ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"}`}>
              {bride && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-card border border-border rounded-3xl overflow-hidden shadow-md group"
                >
                  {hasValue(eventData.bridePhoto) ? (
                    <div className="relative overflow-hidden h-72 sm:h-80">
                      <img
                        src={eventData.bridePhoto}
                        alt="Bride"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-xs uppercase tracking-wider text-white/70 mb-1">The Bride</p>
                        <h3 className="text-2xl font-bold">{bride}</h3>
                        {hasValue(eventData.brideParents) && (
                          <p className="text-sm text-white/60 mt-1">{eventData.brideParents}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-5xl mx-auto mb-6">
                        👰
                      </div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">The Bride</p>
                      <h3 className="text-2xl font-bold">{bride}</h3>
                      {hasValue(eventData.brideParents) && (
                        <p className="text-sm text-muted-foreground mt-2">{eventData.brideParents}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {groom && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-card border border-border rounded-3xl overflow-hidden shadow-md group"
                >
                  {hasValue(eventData.groomPhoto) ? (
                    <div className="relative overflow-hidden h-72 sm:h-80">
                      <img
                        src={eventData.groomPhoto}
                        alt="Groom"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-xs uppercase tracking-wider text-white/70 mb-1">The Groom</p>
                        <h3 className="text-2xl font-bold">{groom}</h3>
                        {hasValue(eventData.groomParents) && (
                          <p className="text-sm text-white/60 mt-1">{eventData.groomParents}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-5xl mx-auto mb-6">
                        🤵
                      </div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">The Groom</p>
                      <h3 className="text-2xl font-bold">{groom}</h3>
                      {hasValue(eventData.groomParents) && (
                        <p className="text-sm text-muted-foreground mt-2">{eventData.groomParents}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── EVENT DETAILS ─────────────────────────────────────────────────────── */}
      {(hasValue(eventData.date) || hasValue(eventData.time) || hasValue(eventData.venue)) && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

            {/* Phone — decoration, desktop/tablet only */}
            <div className="hidden md:block">
              <IphoneMockup
                screenContent={
                  <>
                    <CalendarDays className="text-accent-foreground mx-auto mb-4" size={32} />
                    <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2">Save The Date</h3>
                    {hasValue(eventData.date) && (
                      <p className="text-2xl font-bold text-accent-foreground line-clamp-1">{eventData.date}</p>
                    )}
                    <div className="my-3 w-12 h-px bg-border mx-auto" />
                    <Clock3 className="text-accent-foreground mx-auto mb-2" size={24} />
                    {hasValue(eventData.time) && (
                      <p className="text-sm text-muted-foreground line-clamp-1">{eventData.time}</p>
                    )}
                  </>
                }
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <SectionLabel label="Event Details" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8">When &amp; Where</h2>

              <div className="space-y-4">
                {hasValue(eventData.date) && (
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
                    <CalendarDays className="text-accent-foreground flex-shrink-0" size={28} />
                    <div>
                      <h4 className="font-semibold">Date</h4>
                      <p className="text-muted-foreground">{eventData.date}</p>
                    </div>
                  </div>
                )}
                {hasValue(eventData.time) && (
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
                    <Clock3 className="text-accent-foreground flex-shrink-0" size={28} />
                    <div>
                      <h4 className="font-semibold">Time</h4>
                      <p className="text-muted-foreground">{eventData.time}</p>
                    </div>
                  </div>
                )}
                {hasValue(eventData.venue) && (
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
                    <MapPin className="text-accent-foreground flex-shrink-0" size={28} />
                    <div>
                      <h4 className="font-semibold">Venue</h4>
                      <p className="text-muted-foreground">{eventData.venue}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── COUNTDOWN ─────────────────────────────────────────────────────────── */}
      {eventData.enableCountdown && (hasValue(eventData.rawWeddingDate) || hasValue(eventData.date)) && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">

            {/* Heading — always outside the phone */}
            <div className="text-center mb-12">
              <SectionLabel label="Countdown" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4">The Clock Is Ticking</h2>
            </div>

            {/* Desktop: tiles left, phone right */}
            <div className="hidden md:flex items-center gap-16">
              <div className="flex-1 grid grid-cols-2 gap-4">
                {[
                  { label: "Days",    value: String(timeLeft.days).padStart(2, "0") },
                  { label: "Hours",   value: String(timeLeft.hours).padStart(2, "0") },
                  { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                  { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center">
                    <h3 className="text-4xl font-bold text-accent-foreground">{item.value}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <IphoneMockup screenContent={countdownScreenContent} />
            </div>

            {/* Mobile: phone only */}
            <div className="md:hidden flex justify-center">
              <IphoneMockup screenContent={countdownScreenContent} />
            </div>

          </div>
        </section>
      )}

      {/* ── LOVE STORY ────────────────────────────────────────────────────────── */}
      {eventData.showStory && (eventData.loveStory?.length ?? 0) > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-14">
              <Heart className="mx-auto text-accent-foreground mb-4" size={32} />
              <SectionLabel label="Our Story" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4">How It All Began</h2>
            </div>

            {/* Desktop: phone left, story cards right */}
            <div className="hidden md:flex items-start gap-16">
              <IphoneMockup
                screenContent={
                  <>
                    <Heart className="text-destructive mx-auto mb-3" size={28} fill="currentColor" />
                    <p className="text-sm text-muted-foreground leading-relaxed px-2 line-clamp-4 break-words">
                      &ldquo;{eventData.loveStory[0]?.description?.substring(0, 120)}&rdquo;
                    </p>
                  </>
                }
              />

              <div className="flex-1 space-y-6">
                {eventData.loveStory.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-card border border-border rounded-2xl p-6 shadow-sm text-left"
                  >
                    {hasValue(story.subtitle) && (
                      <p className="text-xs text-accent-foreground uppercase tracking-wider mb-1">
                        {story.subtitle}
                      </p>
                    )}
                    <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                    <p className="text-sm text-muted-foreground">{story.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile: one phone per story entry */}
            <div className="md:hidden flex flex-col items-center gap-10">
              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <IphoneMockup
                    screenContent={
                      <div className="flex flex-col items-center text-center gap-3 px-2 w-full">
                        <Heart className="text-destructive flex-shrink-0" size={24} fill="currentColor" />
                        {hasValue(story.subtitle) && (
                          <p className="text-[10px] uppercase tracking-widest text-accent-foreground">
                            {story.subtitle}
                          </p>
                        )}
                        <h3 className="text-base font-bold text-foreground leading-tight line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 break-words">
                          {story.description}
                        </p>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── SCHEDULE (Day's Plan) ──────────────────────────────────────────────── */}
      {eventData.showSchedule && (eventData.schedule?.length ?? 0) > 0 && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-14">
              <CalendarDays className="mx-auto text-accent-foreground mb-4" size={32} />
              <SectionLabel label="Timeline" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4">The Day&apos;s Plan</h2>
            </div>

            {/* Desktop: schedule cards left, phone right */}
            <div className="hidden md:flex items-start gap-16">
              <div className="flex-1 space-y-4">
                {eventData.schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between"
                  >
                    <div className="text-left">
                      <h3 className="font-bold">{item.title}</h3>
                      {hasValue(item.description) && (
                        <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                      )}
                    </div>
                    <span className="bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-full ml-4 whitespace-nowrap">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>

              <IphoneMockup
                screenContent={
                  <div className="w-full px-2 text-left space-y-4">
                    <h4 className="text-center font-bold text-base text-foreground mb-4">Itinerary</h4>
                    {eventData.schedule.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-start gap-3 border-l-2 border-accent pl-3">
                        <div>
                          <p className="text-xs font-bold text-foreground line-clamp-2 break-words">{item.title}</p>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>

            {/* Mobile: one phone per schedule item */}
            <div className="md:hidden flex flex-col items-center gap-10">
              {eventData.schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <IphoneMockup
                    screenContent={
                      <div className="flex flex-col items-center text-center gap-3 px-2 w-full">
                        <CalendarDays className="text-accent-foreground flex-shrink-0" size={24} />
                        <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                          {item.time}
                        </span>
                        <h3 className="text-base font-bold text-foreground leading-tight line-clamp-2">
                          {item.title}
                        </h3>
                        {hasValue(item.description) && (
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 break-words">
                            {item.description}
                          </p>
                        )}
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── GALLERY ───────────────────────────────────────────────────────────── */}
      {eventData.showGallery && (eventData.gallery?.length ?? 0) > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

            {/* Phone — desktop only, hidden on mobile */}
            <div className="hidden md:block">
              <IphoneMockup
                screenContent={
                  <div className="w-full h-full p-2 space-y-2 overflow-hidden">
                    {eventData.gallery.slice(0, 3).map((img, i) => (
                      <img key={i} src={img} alt="" className="w-full h-28 object-cover rounded-xl shadow-md" />
                    ))}
                  </div>
                }
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <SectionLabel label="Gallery" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-10">Captured Moments</h2>

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

      {/* ── RSVP ──────────────────────────────────────────────────────────────── */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

            <div className="flex-1 text-center md:text-left">
              <SectionLabel label="RSVP" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Confirm Your Spot</h2>
              <p className="text-muted-foreground mb-10">Let us know if you&apos;ll be joining us.</p>

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

            {/* Phone — desktop only */}
            <div className="hidden md:block">
              <IphoneMockup
                screenContent={
                  <div className="text-center px-4">
                    <div className="text-5xl mb-4">✉️</div>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">We&apos;d love to hear from you!</h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">Fill out the form to let us know you are coming.</p>
                    <div className="mt-6 w-full h-8 bg-accent/20 rounded-lg animate-pulse" />
                  </div>
                }
              />
            </div>

          </div>
        </section>
      )}

      {/* ── WISHES ────────────────────────────────────────────────────────────── */}
      {eventData.enableGreetings && (eventData.wishes?.length ?? 0) > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

            {/* Phone — desktop only */}
            <div className="hidden md:block">
              <IphoneMockup
                screenContent={
                  <div className="text-left px-4 space-y-3 w-full">
                    <div className="text-2xl text-center mb-2">💬</div>
                    {eventData.wishes.slice(0, 2).map((wish, i) => (
                      <div key={i} className="bg-background/50 p-3 rounded-lg border border-border">
                        <p className="text-[10px] text-muted-foreground italic line-clamp-3">&quot;{wish.message}&quot;</p>
                        <p className="text-[10px] font-bold text-accent-foreground mt-1 text-right line-clamp-1">- {wish.name}</p>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <SectionLabel label="Wishes" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-10">Heartfelt Messages</h2>

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

      {/* ── LOCATION (MAP) ────────────────────────────────────────────────────── */}
      {eventData.showVenue && (hasValue(eventData.venue) || hasValue(eventData.address) || hasValue(eventData.mapLink)) && (
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

            <div className="flex-1 text-center md:text-left">
              <SectionLabel label="Venue" />
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8">Find Us Here</h2>

              <div className="bg-card border border-border rounded-[32px] p-8 shadow-lg mb-6">
                {hasValue(eventData.venue) && (
                  <h3 className="text-2xl font-bold mb-3">{eventData.venue}</h3>
                )}
                {hasValue(eventData.address) && (
                  <p className="text-muted-foreground mb-6">{eventData.address}</p>
                )}
                {hasValue(eventData.mapLink) && (
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

              {/* Mobile: full-width map iframe */}
              {hasMapData && (
                <div className="md:hidden w-full rounded-2xl overflow-hidden border border-border shadow-lg aspect-[4/3]">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            {/* Desktop: map inside phone mockup */}
            <div className="hidden md:block">
              <IphoneMockup
                screenContent={
                  hasMapData ? (
                    <div className="w-full h-full overflow-hidden">
                      <iframe
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : (
                    <>
                      <MapPin className="text-accent-foreground mb-3" size={32} />
                      <p className="text-xs font-bold">Map Not Available</p>
                    </>
                  )
                }
              />
            </div>

          </div>
        </section>
      )}

      {/* ── MUSIC BUTTON (floating) ────────────────────────────────────────────── */}
      {hasValue(eventData.musicUrl) && (
        <div className="fixed bottom-6 right-6 z-50">
          <audio id="tropical-audio" src={eventData.musicUrl as string} loop />
          <button
            onClick={() => {
              const audio = document.getElementById("tropical-audio") as HTMLAudioElement;
              if (!audio) return;
              audio.paused ? audio.play() : audio.pause();
            }}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl shadow-2xl transition border border-border flex items-center justify-center"
            aria-label="Toggle music"
          >
            🎵
          </button>
        </div>
      )}

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] text-primary-foreground/70">With Love</span>
          <h2 className="text-5xl md:text-7xl font-bold mt-6 mb-8">See You There</h2>

          {hasNames && (
            <div className="text-4xl md:text-6xl font-bold flex flex-wrap justify-center items-center gap-4">
              {bride && <span>{bride}</span>}
              {bride && groom && <span className="text-accent">&</span>}
              {groom && <span>{groom}</span>}
            </div>
          )}

          <p className="mt-8 text-primary-foreground/60 text-sm">
            Crafted with modern love using Ente Invite
          </p>
        </div>
      </footer>

    </main>
  );
}