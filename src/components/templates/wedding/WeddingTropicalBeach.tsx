"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Music,
  Pause,
} from "lucide-react";
import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { getMapEmbedUrl } from "@/lib/utils";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FONT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
  .tb-h  { font-family: 'Playfair Display', Georgia, serif; }
  .tb-i  { font-family: 'Cormorant Garamond', Georgia, serif; }
  .tb-b  { font-family: 'Lato', system-ui, sans-serif; }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function hasValue(v: string | null | undefined): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Wave SVG transition between sections */
function WaveTransition({
  fromColor,
  toColor,
}: {
  fromColor: string;
  toColor: string;
}) {
  return (
    <div className="w-full overflow-hidden leading-[0] -mb-px">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        style={{ height: 56, display: "block" }}
        className="w-full"
      >
        <rect width="1440" height="56" fill={fromColor} />
        <path
          d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

/** Section heading with decorative gold lines */
function SectionHeading({
  label,
  title,
  light = false,
}: {
  label: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-16">
      <p
        className={`tb-b uppercase tracking-[0.55em] text-[10px] mb-5 ${
          light ? "text-[#d4a654]" : "text-[#b8893e]"
        }`}
      >
        {label}
      </p>
      <div className="flex items-center justify-center gap-5">
        <div
          className={`h-px flex-1 max-w-[64px] ${
            light ? "bg-[#d4a654]/30" : "bg-[#b8893e]/25"
          }`}
        />
        <h2
          className={`tb-h text-3xl sm:text-4xl lg:text-5xl font-normal break-words ${
            light ? "text-white" : "text-[#1a1a2e]"
          }`}
        >
          {title}
        </h2>
        <div
          className={`h-px flex-1 max-w-[64px] ${
            light ? "bg-[#d4a654]/30" : "bg-[#b8893e]/25"
          }`}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  eventData: WeddingEventData;
}

export default function WeddingTropicalBeach({ eventData }: Props) {
  const timeLeft = useCountdown(
    eventData.date,
    eventData.time,
    eventData.rawWeddingDate,
  );

  // ── Slider state for Ocean Meeting ─────────────────────────────────────────
  const slideX = useMotionValue(0);
  const maxSlide = 224; // 280px container - 48px thumb - 8px padding
  const groomLeft = useTransform(slideX, [0, maxSlide], ["5%", "50%"]);
  const groomX = useTransform(slideX, [0, maxSlide], ["0%", "-100%"]);
  const brideRight = useTransform(slideX, [0, maxSlide], ["5%", "50%"]);
  const brideX = useTransform(slideX, [0, maxSlide], ["0%", "100%"]);

  // Opacity of the final message
  const textOpacity = useTransform(slideX, [maxSlide - 40, maxSlide], [0, 1]);

  // ── Derived booleans ──────────────────────────────────────────────────────
  const [isUnlocked, setIsUnlocked] = useState(false);

  const hasBrideName = hasValue(eventData.brideName);
  const hasGroomName = hasValue(eventData.groomName);
  const hasEitherName = hasBrideName || hasGroomName;
  const hasBridePhoto = hasValue(eventData.bridePhoto);
  const hasGroomPhoto = hasValue(eventData.groomPhoto);
  const hasBrideParents = hasValue(eventData.brideParents);
  const hasGroomParents = hasValue(eventData.groomParents);
  const hasParentsSection = hasBrideParents || hasGroomParents;
  const hasDate = hasValue(eventData.date);
  const hasTime = hasValue(eventData.time);
  const hasVenueName = hasValue(eventData.venue);
  const hasAddress = hasValue(eventData.address);
  const hasMapLink = hasValue(eventData.mapLink);
  const hasHeroImage = hasValue(eventData.heroImage);
  const hasMusicUrl = hasValue(eventData.musicUrl);
  const hasAnyEventDetail = hasDate || hasTime || hasVenueName;
  const hasVenueSection =
    eventData.showVenue && (hasVenueName || hasAddress || hasMapLink);

  // ── Map embed URL via utility ─────────────────────────────────────────────
  const mapEmbedUrl = getMapEmbedUrl(
    eventData.mapLink ?? "",
    [eventData.venue, eventData.address].filter(hasValue).join(", "),
  );

  // ── Color tokens (used across wave transitions) ──────────────────────────
  const DARK = "#0b2d3d";
  const IVORY = "#fdf8f0";
  const DEEP = "#061e2b";
  const LAGOON = "#0e4d5c";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

      <main className="tb-b text-[#1a1a2e] overflow-x-hidden">
        {/* ================================================================== */}
        {/* OCEAN MEETING ANIMATION SECTION                                      */}
        {/* ================================================================== */}

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.section
              key="intro"
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative w-full h-[100dvh] min-h-[400px] overflow-hidden bg-[#8cb6c5]"
            >
              {/* Background Ocean Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
                  alt="Tropical ocean beach"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#061e2b]/10 to-[#061e2b]" />
              </div>

              {/* Sliding Characters Container */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* GROOM */}
                <motion.div
                  style={{ left: groomLeft, x: groomX }}
                  className="absolute bottom-[20%] sm:bottom-[25%] z-20 pointer-events-none origin-bottom-right flex justify-end"
                >
                  <img
                    src="/template/outline-groom.png"
                    className="h-[28vh] sm:h-[32vh] md:h-[40vh] w-auto max-w-[45vw] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                    alt="Groom"
                  />
                </motion.div>

                {/* BRIDE */}
                <motion.div
                  style={{ right: brideRight, x: brideX }}
                  className="absolute bottom-[18%] sm:bottom-[22%] z-10 pointer-events-none origin-bottom-left flex justify-start"
                >
                  <img
                    src="/template/outline-bride.png"
                    className="h-[35vh] sm:h-[40vh] md:h-[50vh] w-auto max-w-[45vw] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                    alt="Bride"
                  />
                </motion.div>
              </div>

              {/* Interactive Slider — centered in the bottom area */}
              <motion.div
                animate={{
                  opacity: isUnlocked ? 0 : 1,
                  pointerEvents: isUnlocked ? "none" : "auto",
                }}
                className="absolute bottom-8 sm:bottom-12 inset-x-0 z-30 flex flex-col items-center"
              >
                {/* "Two Souls / One Journey" text fades in near end of slide */}
                <motion.div
                  style={{ opacity: textOpacity }}
                  className="absolute -top-14 sm:-top-16 text-center pointer-events-none"
                >
                  <p className="tb-i italic text-white/90 text-2xl sm:text-3xl font-light">
                    Two Souls,
                  </p>
                  <p className="tb-h text-[#d4a654] text-3xl sm:text-4xl mt-1">
                    One Journey
                  </p>
                </motion.div>

                <p className="tb-b text-white/90 text-[10px] uppercase tracking-[0.35em] mb-3 sm:mb-4 drop-shadow-md">
                  Slide to Unite
                </p>

                <div className="w-[280px] h-14 bg-black/10 backdrop-blur-md rounded-full p-1 relative border border-white/30 shadow-inner">
                  {/* Track Background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-[#d4a654]/20 pointer-events-none" />

                  {/* Draggable Thumb */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: maxSlide }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > maxSlide / 2) {
                        animate(slideX, maxSlide, {
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        });
                        setIsUnlocked(true);
                      } else {
                        animate(slideX, 0, {
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        });
                        setIsUnlocked(false);
                      }
                    }}
                    style={{ x: slideX }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing relative z-10"
                  >
                    <span className="text-xl">💍</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* ================================================================== */}
              {/* HERO — Centre text fades up                                        */}
              {/* ================================================================== */}
              <section
                className="relative min-h-screen overflow-hidden flex items-end"
              style={{
                background: `linear-gradient(135deg, ${DEEP} 0%, ${LAGOON} 50%, ${DARK} 100%)`,
              }}
            >
              {/* Optional hero background image */}
              {hasHeroImage && (
                <img
                  src={eventData.heroImage}
                  alt="Wedding backdrop"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
                />
              )}

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#061e2b]/70 via-transparent to-[#061e2b]/95 pointer-events-none" />

              {/* Floating tropical leaf accents */}
              {[
                {
                  cls: "top-6  left-6",
                  e: "🌿",
                  delay: 0,
                  op: "opacity-[0.07]",
                  size: "text-8xl",
                },
                {
                  cls: "top-14 right-10",
                  e: "🌴",
                  delay: 1.5,
                  op: "opacity-[0.06]",
                  size: "text-7xl",
                },
                {
                  cls: "top-1/3 left-3",
                  e: "🌺",
                  delay: 0.7,
                  op: "opacity-[0.05]",
                  size: "text-6xl",
                },
                {
                  cls: "top-1/4 right-6",
                  e: "🌿",
                  delay: 2.2,
                  op: "opacity-[0.05]",
                  size: "text-7xl",
                },
              ].map((l, i) => (
                <motion.div
                  key={i}
                  className={`absolute pointer-events-none select-none ${l.cls} ${l.op} ${l.size}`}
                  animate={{ y: [0, -14, 0], rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 7 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: l.delay,
                  }}
                >
                  {l.e}
                </motion.div>
              ))}

              {/* ── Center Text (Fades Up) ── */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  className="tb-b text-[#d4a654] uppercase tracking-[0.4em] text-xs sm:text-sm font-semibold mb-6"
                >
                  Tropical Wedding Invitation
                </motion.p>

                {hasBrideName && (
                  <h1 className="tb-h text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-normal text-white leading-[1.05] break-words">
                    {eventData.brideName}
                  </h1>
                )}

                {hasBrideName && hasGroomName && (
                  <motion.div
                    className="my-3 xl:my-5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.05, type: "spring", stiffness: 260 }}
                  >
                    <span className="tb-i italic text-[#d4a654] text-4xl sm:text-5xl xl:text-7xl">
                      &amp;
                    </span>
                  </motion.div>
                )}

                {hasGroomName && (
                  <h1 className="tb-h text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-normal text-white leading-[1.05] break-words">
                    {eventData.groomName}
                  </h1>
                )}

                <div className="mt-8 space-y-1 pointer-events-none">
                  <p className="tb-i italic text-[#d4a654]/80 text-xl xl:text-2xl">
                    Save The Date Under The Palms
                  </p>
                  {hasDate && (
                    <p className="tb-h text-xl xl:text-2xl text-white/55 font-light tracking-wide">
                      {eventData.date}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 8px 36px rgba(212,166,84,0.45)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="pointer-events-auto mt-10 xl:mt-12 px-10 py-4 rounded-full bg-gradient-to-r from-[#d4a654] to-[#b8893e] text-[#061e2b] text-sm font-bold uppercase tracking-[0.25em] tb-b shadow-xl transition-all"
                >
                  Begin The Journey ↓
                </motion.button>
              </motion.div>
            </section>

            {/* Wave: hero dark → couple ivory */}
            <WaveTransition fromColor={DARK} toColor={IVORY} />

            {/* ================================================================== */}
            {/* COUPLE INFO                                                         */}
            {/* ================================================================== */}
            {hasEitherName && (
              <>
                <section className="py-24 px-6 bg-[#fdf8f0]">
                  <div className="max-w-4xl mx-auto">
                    <SectionHeading
                      label="The Couple"
                      title="Meet The Happy Couple"
                    />

                    <div
                      className={`grid gap-8 ${
                        hasBrideName && hasGroomName
                          ? "md:grid-cols-2"
                          : "max-w-sm mx-auto"
                      }`}
                    >
                      {/* BRIDE CARD */}
                      {hasBrideName && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ y: -6 }}
                          className="bg-white rounded-3xl shadow-md overflow-hidden border border-[#d4a654]/15 group"
                        >
                          <div className="aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-[#7e3d5c] to-[#2d1020]">
                            {hasBridePhoto ? (
                              <img
                                src={eventData.bridePhoto}
                                alt={eventData.brideName}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full border-2 border-[#d4a654]/50 bg-[#d4a654]/10 flex items-center justify-center">
                                  <span className="tb-h italic text-4xl text-[#d4a654]/60">
                                    B
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                          </div>

                          <div className="px-6 py-6 text-center">
                            <span className="inline-block bg-[#d4a654]/10 border border-[#d4a654]/25 rounded-full px-4 py-1 text-[9px] uppercase tracking-[0.45em] text-[#b8893e] tb-b mb-3">
                              Bride
                            </span>
                            <h3 className="tb-h text-2xl font-normal text-[#1a1a2e] break-words">
                              {eventData.brideName}
                            </h3>
                          </div>
                        </motion.div>
                      )}

                      {/* GROOM CARD */}
                      {hasGroomName && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -6 }}
                          className="bg-white rounded-3xl shadow-md overflow-hidden border border-[#d4a654]/15 group"
                        >
                          <div className="aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-[#1a6b7e] to-[#0b3040]">
                            {hasGroomPhoto ? (
                              <img
                                src={eventData.groomPhoto}
                                alt={eventData.groomName}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full border-2 border-[#d4a654]/50 bg-[#d4a654]/10 flex items-center justify-center">
                                  <span className="tb-h italic text-4xl text-[#d4a654]/60">
                                    G
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                          </div>

                          <div className="px-6 py-6 text-center">
                            <span className="inline-block bg-[#d4a654]/10 border border-[#d4a654]/25 rounded-full px-4 py-1 text-[9px] uppercase tracking-[0.45em] text-[#b8893e] tb-b mb-3">
                              Groom
                            </span>
                            <h3 className="tb-h text-2xl font-normal text-[#1a1a2e] break-words">
                              {eventData.groomName}
                            </h3>
                            {hasGroomParents && (
                              <p className="tb-i italic text-[#8b7355] text-sm mt-3 leading-relaxed break-words">
                                {eventData.groomParents}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={IVORY} toColor={LAGOON} />
              </>
            )}

            {/* ================================================================== */}
            {/* PARENTS SECTION                                                     */}
            {/* ================================================================== */}
            {hasParentsSection && (
              <>
                <section className="py-24 px-6 bg-[#0e4d5c]">
                  <div className="max-w-4xl mx-auto">
                    <SectionHeading
                      label="With Blessings From"
                      title="Our Parents"
                      light
                    />

                    <div
                      className={`grid gap-8 ${
                        hasBrideParents && hasGroomParents
                          ? "md:grid-cols-2"
                          : "max-w-md mx-auto"
                      }`}
                    >
                      {hasGroomParents && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="bg-white/10 backdrop-blur-md border border-[#d4a654]/20 rounded-3xl p-8 text-center"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#d4a654]/15 border border-[#d4a654]/30 flex items-center justify-center mx-auto mb-5">
                            <Heart size={20} className="text-[#d4a654]" />
                          </div>
                          {hasGroomName && (
                            <p className="tb-b text-[9px] uppercase tracking-[0.5em] text-[#d4a654]/60 mb-3">
                              {eventData.groomName}&apos;s Parents
                            </p>
                          )}
                          <p className="tb-i italic text-white/85 text-lg leading-relaxed">
                            {eventData.groomParents}
                          </p>
                        </motion.div>
                      )}

                      {hasBrideParents && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="bg-white/10 backdrop-blur-md border border-[#d4a654]/20 rounded-3xl p-8 text-center"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#d4a654]/15 border border-[#d4a654]/30 flex items-center justify-center mx-auto mb-5">
                            <Heart size={20} className="text-[#d4a654]" />
                          </div>
                          {hasBrideName && (
                            <p className="tb-b text-[9px] uppercase tracking-[0.5em] text-[#d4a654]/60 mb-3">
                              {eventData.brideName}&apos;s Parents
                            </p>
                          )}
                          <p className="tb-i italic text-white/85 text-lg leading-relaxed">
                            {eventData.brideParents}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={LAGOON} toColor={IVORY} />
              </>
            )}

            {/* ================================================================== */}
            {/* EVENT DETAILS — Date / Time / Venue                                */}
            {/* ================================================================== */}
            {hasAnyEventDetail && (
              <>
                <section className="py-24 px-6 bg-[#fdf8f0]">
                  <div className="max-w-4xl mx-auto">
                    <SectionHeading
                      label="Event Details"
                      title="Beach Wedding Information"
                    />

                    <div className="flex flex-wrap gap-6 justify-center">
                      {hasDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="flex-1 w-full sm:min-w-[190px] max-w-[270px] bg-white rounded-3xl p-8 shadow-md border border-[#d4a654]/15 text-center mx-auto"
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a654] to-[#b8893e] flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <CalendarDays size={22} className="text-white" />
                          </div>
                          <p className="tb-b text-[9px] uppercase tracking-[0.45em] text-[#8b7355] mb-2">
                            Date
                          </p>
                          <p className="tb-h text-lg text-[#1a1a2e] font-normal">
                            {eventData.date}
                          </p>
                        </motion.div>
                      )}

                      {hasTime && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="flex-1 w-full sm:min-w-[190px] max-w-[270px] bg-white rounded-3xl p-8 shadow-md border border-[#d4a654]/15 text-center mx-auto"
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a654] to-[#b8893e] flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Clock3 size={22} className="text-white" />
                          </div>
                          <p className="tb-b text-[9px] uppercase tracking-[0.45em] text-[#8b7355] mb-2">
                            Time
                          </p>
                          <p className="tb-h text-lg text-[#1a1a2e] font-normal">
                            {eventData.time}
                          </p>
                        </motion.div>
                      )}

                      {hasVenueName && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className="flex-1 w-full sm:min-w-[190px] max-w-[270px] bg-white rounded-3xl p-8 shadow-md border border-[#d4a654]/15 text-center mx-auto"
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a654] to-[#b8893e] flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <MapPin size={22} className="text-white" />
                          </div>
                          <p className="tb-b text-[9px] uppercase tracking-[0.45em] text-[#8b7355] mb-2">
                            Venue
                          </p>
                          <p className="tb-h text-lg text-[#1a1a2e] font-normal">
                            {eventData.venue}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={IVORY} toColor={DARK} />
              </>
            )}

            {/* ================================================================== */}
            {/* COUNTDOWN                                                           */}
            {/* ================================================================== */}
            {eventData.enableCountdown && (
              <>
                <section className="py-24 px-6 bg-[#0b2d3d]">
                  <div className="max-w-3xl mx-auto">
                    <SectionHeading
                      label="Countdown"
                      title="Paradise Awaits"
                      light
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                      {[
                        {
                          label: "Days",
                          value: String(timeLeft.days).padStart(2, "0"),
                        },
                        {
                          label: "Hours",
                          value: String(timeLeft.hours).padStart(2, "0"),
                        },
                        {
                          label: "Minutes",
                          value: String(timeLeft.minutes).padStart(2, "0"),
                        },
                        {
                          label: "Seconds",
                          value: String(timeLeft.seconds).padStart(2, "0"),
                        },
                      ].map((item) => (
                        <motion.div
                          key={item.label}
                          whileHover={{ y: -4 }}
                          className="bg-white/8 backdrop-blur-md border border-[#d4a654]/20 rounded-3xl p-6 md:p-8 text-center"
                        >
                          <p className="tb-h text-4xl sm:text-5xl md:text-6xl font-normal text-[#d4a654]">
                            {item.value}
                          </p>
                          <p className="tb-b text-[9px] uppercase tracking-[0.55em] text-white/45 mt-3">
                            {item.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={DARK} toColor={IVORY} />
              </>
            )}

            {/* ================================================================== */}
            {/* LOVE STORY                                                          */}
            {/* ================================================================== */}
            {eventData.showStory && (eventData.loveStory?.length ?? 0) > 0 && (
              <>
                <section className="py-24 px-6 bg-[#fdf8f0]">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                      <Heart
                        className="mx-auto text-[#d4a654] mb-5"
                        size={34}
                      />
                      <p className="tb-b uppercase tracking-[0.55em] text-[10px] text-[#b8893e] mb-5">
                        Our Story
                      </p>
                      <div className="flex items-center justify-center gap-5">
                        <div className="h-px flex-1 max-w-[64px] bg-[#b8893e]/25" />
                        <h2 className="tb-h text-4xl lg:text-5xl font-normal text-[#1a1a2e]">
                          Waves of Love
                        </h2>
                        <div className="h-px flex-1 max-w-[64px] bg-[#b8893e]/25" />
                      </div>
                    </div>

                    <div
                      className={`grid gap-8 ${
                        eventData.loveStory.length === 1
                          ? "max-w-md mx-auto"
                          : eventData.loveStory.length === 2
                            ? "md:grid-cols-2 max-w-4xl mx-auto"
                            : "md:grid-cols-2 lg:grid-cols-3"
                      }`}
                    >
                      {eventData.loveStory.map((story, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 }}
                          whileHover={{ y: -6 }}
                          className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#d4a654]/12"
                        >
                          {hasValue(story.image) && (
                            <img
                              src={story.image}
                              alt={
                                hasValue(story.title)
                                  ? story.title
                                  : "Story photo"
                              }
                              className="w-full h-52 object-cover"
                            />
                          )}
                          <div className="p-7">
                            {hasValue(story.subtitle) && (
                              <p className="tb-b text-[9px] uppercase tracking-[0.5em] text-[#b8893e] mb-2 break-words">
                                {story.subtitle}
                              </p>
                            )}
                            {hasValue(story.title) && (
                              <h3 className="tb-h text-xl font-normal text-[#1a1a2e] mb-3 break-words">
                                {story.title}
                              </h3>
                            )}
                            {hasValue(story.description) && (
                              <p className="tb-b text-sm text-[#8b7355] leading-relaxed break-words">
                                {story.description}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={IVORY} toColor={LAGOON} />
              </>
            )}

            {/* ================================================================== */}
            {/* EVENT SCHEDULE                                                      */}
            {/* ================================================================== */}
            {eventData.showSchedule &&
              (eventData.schedule?.length ?? 0) > 0 && (
                <>
                  <section className="py-24 px-6 bg-[#0e4d5c]">
                    <div className="max-w-3xl mx-auto">
                      <SectionHeading
                        label="Timeline"
                        title="Island Itinerary"
                        light
                      />

                      <div className="space-y-5">
                        {eventData.schedule.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="bg-white/10 backdrop-blur-md border border-[#d4a654]/15 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                          >
                            {hasValue(item.time) && (
                              <div className="shrink-0">
                                <span className="inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4a654] to-[#b8893e] text-[#061e2b] text-sm font-bold tb-b">
                                  {item.time}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              {hasValue(item.title) && (
                                <h3 className="tb-h text-xl font-normal text-white break-words">
                                  {item.title}
                                </h3>
                              )}
                              {hasValue(item.description) && (
                                <p className="tb-b text-sm text-white/60 mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <WaveTransition fromColor={LAGOON} toColor={IVORY} />
                </>
              )}

            {/* ================================================================== */}
            {/* GALLERY                                                             */}
            {/* ================================================================== */}
            {eventData.showGallery && (eventData.gallery?.length ?? 0) > 0 && (
              <>
                <section className="py-24 px-6 bg-[#fdf8f0]">
                  <div className="max-w-6xl mx-auto">
                    <SectionHeading label="Gallery" title="Oceanic Memories" />

                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                      {eventData.gallery.map((image, index) =>
                        hasValue(image) ? (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            className="mb-4 overflow-hidden rounded-2xl shadow-md"
                          >
                            <img
                              src={image}
                              alt={`Gallery photo ${index + 1}`}
                              loading="lazy"
                              className="w-full object-cover"
                            />
                          </motion.div>
                        ) : null,
                      )}
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={IVORY} toColor={DARK} />
              </>
            )}

            {/* ================================================================== */}
            {/* RSVP                                                                */}
            {/* ================================================================== */}
            {eventData.rsvpEnabled && (
              <>
                <section className="py-24 px-6 bg-[#0b2d3d]">
                  <div className="max-w-xl mx-auto">
                    <SectionHeading
                      label="RSVP"
                      title="Confirm Your Island Spot"
                      light
                    />
                    <p className="text-center text-white/55 tb-b text-sm -mt-8 mb-10">
                      Let us know if you&apos;ll be joining us in paradise.
                    </p>
                    <div className="bg-white/8 backdrop-blur-md border border-[#d4a654]/20 rounded-3xl p-8 md:p-10">
                      <RsvpForm />
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={DARK} toColor={IVORY} />
              </>
            )}

            {/* ================================================================== */}
            {/* WISHES WALL                                                         */}
            {/* ================================================================== */}
            {eventData.enableGreetings &&
              (eventData.wishes?.length ?? 0) > 0 && (
                <>
                  <section className="py-24 px-6 bg-[#fdf8f0]">
                    <div className="max-w-6xl mx-auto">
                      <SectionHeading
                        label="Wishes"
                        title="Messages From The Heart"
                      />

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventData.wishes.map((wish, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-3xl p-7 shadow-md border border-[#d4a654]/12"
                          >
                            <span className="tb-i italic text-[#d4a654] text-4xl leading-none block mb-4">
                              &ldquo;
                            </span>
                            {hasValue(wish.message) && (
                              <p className="tb-b text-sm text-[#8b7355] leading-relaxed mb-5 break-words">
                                {wish.message}
                              </p>
                            )}
                            {hasValue(wish.name) && (
                              <p className="tb-h italic text-[#b8893e] text-base">
                                &mdash; {wish.name}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <WaveTransition fromColor={IVORY} toColor={LAGOON} />
                </>
              )}

            {/* ================================================================== */}
            {/* VENUE / LOCATION  — uses getMapEmbedUrl for proper iframe embed    */}
            {/* ================================================================== */}
            {hasVenueSection && (
              <>
                <section className="py-24 px-6 bg-[#0e4d5c]">
                  <div className="max-w-6xl mx-auto">
                    <SectionHeading
                      label="Venue"
                      title="Our Tropical Destination"
                      light
                    />

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Info panel */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-md border border-[#d4a654]/20 rounded-3xl p-8 flex flex-col justify-between"
                      >
                        <div>
                          {hasVenueName && (
                            <h3 className="tb-h text-3xl font-normal text-white mb-4">
                              {eventData.venue}
                            </h3>
                          )}
                          {hasAddress && (
                            <p className="tb-b text-white/65 leading-relaxed mb-6">
                              {eventData.address}
                            </p>
                          )}
                        </div>
                        {hasMapLink && (
                          <a
                            href={eventData.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4a654] to-[#b8893e] text-[#061e2b] font-bold text-sm tb-b self-start transition-all hover:shadow-xl hover:shadow-[#d4a654]/30"
                          >
                            <MapPin size={15} /> Find Your Way
                          </a>
                        )}
                      </motion.div>

                      {/* Map embed */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border border-[#d4a654]/20 min-h-[380px] bg-white/5"
                      >
                        {mapEmbedUrl ? (
                          <iframe
                            src={mapEmbedUrl}
                            className="w-full h-full min-h-[380px] border-0"
                            loading="lazy"
                            title="Venue location map"
                            allowFullScreen
                          />
                        ) : (
                          <div className="h-full min-h-[380px] flex items-center justify-center">
                            <p className="tb-b text-white/35 text-sm">
                              Map not available
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </section>
                <WaveTransition fromColor={LAGOON} toColor={DEEP} />
              </>
            )}

            {/* ================================================================== */}
            {/* AMBIENT AUDIO                                                       */}
            {/* ================================================================== */}
            {hasMusicUrl && <AudioButton src={eventData.musicUrl!} />}

            {/* ================================================================== */}
            {/* FOOTER — Sunset tropical panorama                                  */}
            {/* ================================================================== */}
            <footer
              className="py-32 px-6 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(to bottom, #061e2b 0%, #0b2d3d 35%, #1a0e05 100%)",
              }}
            >
              {/* Sunset glow */}
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#d4622a]/12 via-[#d4a654]/6 to-transparent pointer-events-none" />
              {/* Radial gold shimmer */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  width: 700,
                  height: 350,
                  background:
                    "radial-gradient(ellipse at center bottom, rgba(212,166,84,0.12) 0%, transparent 70%)",
                }}
              />
              {/* Leaf accents */}
              <div className="absolute top-8 left-8 opacity-[0.05] text-8xl pointer-events-none select-none">
                🌴
              </div>
              <div className="absolute top-14 right-10 opacity-[0.04] text-7xl pointer-events-none select-none">
                🌿
              </div>

              <div className="max-w-3xl mx-auto text-center relative z-10">
                <p className="tb-b text-[#d4a654]/50 uppercase tracking-[0.65em] text-[10px] mb-8">
                  With Love
                </p>

                <h2 className="tb-h text-4xl sm:text-5xl md:text-7xl font-normal text-white leading-tight mb-6">
                  See You In
                  <br />
                  <span className="tb-i italic text-[#d4a654]">Paradise</span>
                </h2>

                {hasEitherName && (
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                    {hasBrideName && (
                      <span className="tb-h text-2xl sm:text-3xl md:text-5xl font-normal text-white/90 break-words text-center">
                        {eventData.brideName}
                      </span>
                    )}
                    {hasBrideName && hasGroomName && (
                      <span className="tb-i italic text-[#d4a654] text-3xl sm:text-4xl md:text-6xl">
                        &amp;
                      </span>
                    )}
                    {hasGroomName && (
                      <span className="tb-h text-2xl sm:text-3xl md:text-5xl font-normal text-white/90 break-words text-center">
                        {eventData.groomName}
                      </span>
                    )}
                  </div>
                )}

                {hasDate && (
                  <p className="tb-h text-lg text-white/35 font-light mt-5 tracking-wide">
                    {eventData.date}
                  </p>
                )}

                <div className="mt-14 flex items-center justify-center gap-4">
                  <div className="h-px flex-1 max-w-[60px] bg-[#d4a654]/20" />
                  <p className="tb-b text-white/20 text-[10px] uppercase tracking-[0.5em]">
                    Ente Invite
                  </p>
                  <div className="h-px flex-1 max-w-[60px] bg-[#d4a654]/20" />
                </div>
              </div>
            </footer>
          </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RSVP Form — isolated state management
// ─────────────────────────────────────────────────────────────────────────────
function RsvpForm() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (attending === null) {
      setError("Please select Attending or Not Attending.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="text-5xl mb-5">🌴</div>
        <h3 className="tb-h text-2xl font-normal text-white mb-2">
          {attending ? "See You In Paradise!" : "We'll Miss You!"}
        </h3>
        <p className="tb-b text-white/55 text-sm mt-2">
          Thank you, <strong className="text-[#d4a654]">{name}</strong>. Your
          RSVP has been received.
        </p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full p-4 rounded-2xl bg-white/5 border border-white/12 outline-none text-white placeholder:text-white/30 focus:border-[#d4a654]/50 transition tb-b text-sm";

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Your Name"
        className={inputCls}
      />
      <input
        type="number"
        placeholder="Number of Guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        min={0}
        aria-label="Number of Guests"
        className={inputCls}
      />
      <textarea
        rows={4}
        placeholder="Leave a message... (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Message"
        className={`${inputCls} resize-none`}
      />

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setAttending(true)}
          aria-pressed={attending === true}
          className={`py-4 rounded-2xl font-semibold text-sm tb-b transition ${
            attending === true
              ? "bg-emerald-500 ring-2 ring-[#d4a654]/50 text-white"
              : "bg-emerald-600/30 hover:bg-emerald-600/60 text-white"
          }`}
        >
          Attending ✓
        </button>
        <button
          type="button"
          onClick={() => setAttending(false)}
          aria-pressed={attending === false}
          className={`py-4 rounded-2xl font-semibold text-sm tb-b transition ${
            attending === false
              ? "bg-red-500 ring-2 ring-[#d4a654]/50 text-white"
              : "bg-red-600/30 hover:bg-red-600/60 text-white"
          }`}
        >
          Not Attending
        </button>
      </div>

      {error && (
        <p role="alert" className="text-[#d4a654] text-sm tb-b">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4a654] to-[#b8893e] text-[#061e2b] font-bold text-sm uppercase tracking-[0.2em] tb-b transition hover:shadow-xl hover:shadow-[#d4a654]/30"
      >
        Submit RSVP
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Audio Button — ref-based, no DOM getElementById
// ─────────────────────────────────────────────────────────────────────────────
function AudioButton({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={src} loop />
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a654] to-[#b8893e] text-[#061e2b] shadow-2xl flex items-center justify-center"
      >
        {playing ? <Pause size={20} /> : <Music size={20} />}
      </motion.button>
    </div>
  );
}
