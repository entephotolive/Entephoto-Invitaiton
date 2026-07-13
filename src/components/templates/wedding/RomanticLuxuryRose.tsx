"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin, Heart } from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { getMapEmbedUrl, hasValue } from "@/lib/utils";
import { submitRsvp, submitWish } from "@/lib/actions/guest";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingTropicalBeach({ eventData }: Props) {
  const timeLeft = useCountdown(
    eventData.date,
    eventData.time,
    eventData.rawWeddingDate,
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Computed data checks
  const bride = hasValue(eventData.brideName) ? eventData.brideName : null;
  const groom = hasValue(eventData.groomName) ? eventData.groomName : null;
  const hasHeroNames = bride || groom;
  const hasCoupleContent =
    bride ||
    groom ||
    hasValue(eventData.bridePhoto) ||
    hasValue(eventData.groomPhoto);
  const hasParentsContent =
    hasValue(eventData.brideParents) || hasValue(eventData.groomParents);

  const validStories =
    eventData.loveStory?.filter(
      (story) =>
        hasValue(story.title) ||
        hasValue(story.description) ||
        hasValue(story.image),
    ) || [];

  const validSchedule =
    eventData.schedule?.filter(
      (item) =>
        hasValue(item.title) ||
        hasValue(item.description) ||
        hasValue(item.time),
    ) || [];

  const validGallery = eventData.gallery?.filter((img) => hasValue(img)) || [];

  const validWishes =
    eventData.wishes?.filter(
      (wish) => hasValue(wish.message) && hasValue(wish.name),
    ) || [];

  // RSVP Form State
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    guests: 1,
    attending: true,
    message: "",
  });
  const [isRsvpSubmitting, setIsRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRsvpSubmitting(true);
    setRsvpError("");

    try {
      await submitRsvp({
        slug: eventData.slug || "",
        ...rsvpForm,
      });
      setRsvpSuccess(true);
    } catch (err: any) {
      setRsvpError(err.message || "Failed to submit RSVP");
    } finally {
      setIsRsvpSubmitting(false);
    }
  };

  // Wishes Form State
  const [wishForm, setWishForm] = useState({ name: "", message: "" });
  const [isWishSubmitting, setIsWishSubmitting] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);
  const [wishError, setWishError] = useState("");

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasValue(wishForm.name) || !hasValue(wishForm.message)) {
      setWishError("Please fill out both fields.");
      return;
    }

    setIsWishSubmitting(true);
    setWishError("");

    try {
      await submitWish({
        slug: eventData.slug || "",
        name: wishForm.name,
        message: wishForm.message,
      });
      setWishSuccess(true);
      setWishForm({ name: "", message: "" });
    } catch (err: any) {
      setWishError(err.message || "Failed to submit wish");
    } finally {
      setIsWishSubmitting(false);
    }
  };

  return (
    // Main background mapped to shadcn's bg-background, using custom CSS variables in your globals.css
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center">
        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* shadcn overlay using bg-primary with opacity */}
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center px-6"
        >
          <p className="uppercase tracking-[0.5em] text-primary-foreground/80 text-sm mb-6">
            A Celebration of Eternal Love
          </p>

          {hasHeroNames && (
            <>
              {bride && (
                <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground">
                  {bride}
                </h1>
              )}

              {bride && groom && (
                <div className="text-muted-foreground text-5xl my-4">&</div>
              )}

              {groom && (
                <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground">
                  {groom}
                </h1>
              )}
            </>
          )}

          <p className="mt-10 text-xl text-primary-foreground/90">
            Two Souls, One Beautiful Journey
          </p>

          {hasValue(eventData.date) && (
            <p className="text-3xl font-light mt-3 text-primary-foreground">
              {eventData.date}
            </p>
          )}

          {/* shadcn styled button using bg-accent, text-accent-foreground */}
          <button className="mt-10 px-8 py-4 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition">
            View Our Love Story
          </button>
        </motion.div>
      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && hasCoupleContent && (
        <section className="py-24 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                The Couple
              </span>
              <h2 className="text-5xl font-bold mt-4">Meet The Happy Couple</h2>
            </div>

            <div
              className={`grid gap-8 ${bride && groom ? "md:grid-cols-2" : "grid-cols-1 max-w-xl mx-auto"}`}
            >
              {bride && (
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-card text-card-foreground backdrop-blur-md border border-border rounded-[32px] p-10 shadow-lg text-center flex flex-col items-center"
                >
                  {hasValue(eventData.bridePhoto) ? (
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-border shadow-xl mx-auto">
                      <img
                        src={eventData.bridePhoto}
                        alt="Bride"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-7xl mb-6 flex justify-center">👰</div>
                  )}
                  <h3 className="text-3xl font-bold">{bride}</h3>
                  <p className="text-muted-foreground mt-3">Bride</p>
                </motion.div>
              )}

              {groom && (
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-card text-card-foreground backdrop-blur-md border border-border rounded-[32px] p-10 shadow-lg text-center flex flex-col items-center"
                >
                  {hasValue(eventData.groomPhoto) ? (
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-border shadow-xl mx-auto">
                      <img
                        src={eventData.groomPhoto}
                        alt="Groom"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-7xl mb-6 flex justify-center">🤵</div>
                  )}
                  <h3 className="text-3xl font-bold">{groom}</h3>
                  <p className="text-muted-foreground mt-3">Groom</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAMILIES SECTION */}
      {hasParentsContent && (
        <section className="py-24 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                The Families
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                With Blessings From
              </h2>
            </div>

            <div
              className={`grid gap-12 ${hasValue(eventData.brideParents) && hasValue(eventData.groomParents) ? "md:grid-cols-2" : "grid-cols-1 max-w-xl mx-auto"}`}
            >
              {hasValue(eventData.brideParents) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card text-card-foreground p-10 rounded-[32px] border border-border text-center shadow-md"
                >
                  <Heart className="mx-auto text-accent mb-6" size={32} />
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    Bride's Family
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                    {eventData.brideParents}
                  </p>
                </motion.div>
              )}

              {hasValue(eventData.groomParents) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card text-card-foreground p-10 rounded-[32px] border border-border text-center shadow-md"
                >
                  <Heart className="mx-auto text-accent mb-6" size={32} />
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    Groom's Family
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                    {eventData.groomParents}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      {(hasValue(eventData.date) ||
        hasValue(eventData.time) ||
        hasValue(eventData.venue)) && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                Event Details
              </span>
              <h2 className="text-5xl font-bold mt-4">Wedding Information</h2>
            </div>

            <div
              className={`grid gap-6 ${
                [eventData.date, eventData.time, eventData.venue].filter(
                  hasValue,
                ).length === 3
                  ? "lg:grid-cols-3"
                  : [eventData.date, eventData.time, eventData.venue].filter(
                        hasValue,
                      ).length === 2
                    ? "md:grid-cols-2 max-w-4xl mx-auto"
                    : "grid-cols-1 max-w-xl mx-auto"
              }`}
            >
              {hasValue(eventData.date) && (
                <div className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm">
                  <CalendarDays
                    className="text-accent-foreground mb-4"
                    size={40}
                  />
                  <h3 className="font-semibold text-xl mb-2">Date</h3>
                  <p className="text-muted-foreground">{eventData.date}</p>
                </div>
              )}

              {hasValue(eventData.time) && (
                <div className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm">
                  <Clock3 className="text-accent-foreground mb-4" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Time</h3>
                  <p className="text-muted-foreground">{eventData.time}</p>
                </div>
              )}

              {hasValue(eventData.venue) && (
                <div className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm">
                  <MapPin className="text-accent-foreground mb-4" size={40} />
                  <h3 className="font-semibold text-xl mb-2">Venue</h3>
                  <p className="text-muted-foreground">{eventData.venue}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown &&
        (hasValue(eventData.rawWeddingDate) || hasValue(eventData.date)) &&
        !isNaN(
          new Date(eventData.rawWeddingDate || eventData.date).getTime(),
        ) && (
          <section className="py-24 px-6 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="uppercase tracking-[0.3em] text-muted-foreground">
                  Countdown
                </span>
                <h2 className="text-5xl font-bold mt-4">The Big Day Awaits</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                    whileHover={{ scale: 1.05 }}
                    className="bg-card text-card-foreground backdrop-blur-md border border-border rounded-[32px] p-8 text-center shadow-lg"
                  >
                    <h3 className="text-5xl font-bold text-accent-foreground">
                      {item.value}
                    </h3>
                    <p className="mt-3 text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* LOVE STORY */}
      {eventData.showStory && validStories.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Heart
                className="mx-auto text-accent-foreground mb-4"
                size={40}
              />
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                Our Story
              </span>
              <h2 className="text-5xl font-bold mt-4">A Journey of Love</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {validStories.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-card text-card-foreground border border-border rounded-[32px] overflow-hidden backdrop-blur-md shadow-lg"
                >
                  {hasValue(story.image) && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-60 object-cover"
                    />
                  )}
                  <div className="p-8">
                    {hasValue(story.subtitle) && (
                      <p className="text-accent-foreground text-sm uppercase tracking-wider mb-2">
                        {story.subtitle}
                      </p>
                    )}
                    {hasValue(story.title) && (
                      <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                    )}
                    {hasValue(story.description) && (
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {story.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {eventData.showSchedule && validSchedule.length > 0 && (
        <section className="py-24 px-6 bg-muted/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                Timeline
              </span>
              <h2 className="text-5xl font-bold mt-4">Evening Itinerary</h2>
            </div>

            <div className="space-y-8">
              {validSchedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      {hasValue(item.title) && (
                        <h3 className="text-2xl font-bold mb-2">
                          {item.title}
                        </h3>
                      )}
                      {hasValue(item.description) && (
                        <p className="text-muted-foreground whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {hasValue(item.time) && (
                      <div className="mt-4 md:mt-0">
                        <span className="inline-flex px-5 py-3 rounded-full bg-accent text-accent-foreground font-semibold">
                          {item.time}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery && validGallery.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                Gallery
              </span>
              <h2 className="text-5xl font-bold mt-4">Precious Memories</h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {validGallery.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  src={image}
                  alt=""
                  className="mb-4 rounded-[32px] w-full shadow-2xl cursor-pointer border border-border"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                RSVP
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Confirm Your Attendance
              </h2>

              <p className="mt-4 text-muted-foreground">
                Let us know if you'll be joining us on our special day.
              </p>
            </div>

            <div className="bg-card text-card-foreground border border-border backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-lg">
              {rsvpSuccess ? (
                <div className="bg-primary/20 text-primary p-8 rounded-2xl text-center">
                  <h3 className="text-2xl font-bold mb-2">RSVP Received</h3>
                  <p>Thank you for letting us know!</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  {rsvpError && (
                    <div className="bg-destructive/20 text-destructive-foreground p-4 rounded-xl text-center text-sm">
                      {rsvpError}
                    </div>
                  )}

                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />

                  <input
                    type="number"
                    required
                    min="1"
                    max="10"
                    value={rsvpForm.guests}
                    onChange={(e) =>
                      setRsvpForm({
                        ...rsvpForm,
                        guests: parseInt(e.target.value) || 1,
                      })
                    }
                    placeholder="Number of Guests"
                    className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />

                  <textarea
                    rows={5}
                    value={rsvpForm.message}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, message: e.target.value })
                    }
                    placeholder="Leave a message..."
                    className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setRsvpForm({ ...rsvpForm, attending: true })
                      }
                      className={`py-4 rounded-2xl transition font-semibold ${
                        rsvpForm.attending
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground"
                      }`}
                    >
                      Attending
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRsvpForm({ ...rsvpForm, attending: false })
                      }
                      className={`py-4 rounded-2xl transition font-semibold ${
                        !rsvpForm.attending
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground"
                      }`}
                    >
                      Not Attending
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isRsvpSubmitting}
                    className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition disabled:opacity-50"
                  >
                    {isRsvpSubmitting ? "Submitting..." : "Submit RSVP"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WISHES WALL */}
      {eventData.enableGreetings && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                Wishes
              </span>
              <h2 className="text-5xl font-bold mt-4">
                Messages From The Heart
              </h2>
            </div>

            <div className="max-w-3xl mx-auto mb-20 bg-card text-card-foreground border border-border backdrop-blur-md rounded-[32px] p-8 shadow-sm">
              {wishSuccess ? (
                <div className="text-center text-primary font-semibold py-8">
                  Your beautiful message has been added to our wall of wishes.
                </div>
              ) : (
                <form onSubmit={handleWishSubmit} className="space-y-6">
                  {wishError && (
                    <div className="text-destructive-foreground text-center text-sm">
                      {wishError}
                    </div>
                  )}
                  <input
                    type="text"
                    required
                    value={wishForm.name}
                    onChange={(e) =>
                      setWishForm({ ...wishForm, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <textarea
                    required
                    rows={3}
                    value={wishForm.message}
                    onChange={(e) =>
                      setWishForm({ ...wishForm, message: e.target.value })
                    }
                    placeholder="Write your wishes..."
                    className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isWishSubmitting}
                    className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition disabled:opacity-50"
                  >
                    {isWishSubmitting ? "Sending..." : "Send Wish"}
                  </button>
                </form>
              )}
            </div>

            {validWishes.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {validWishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8 }}
                    className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm"
                  >
                    <div className="text-accent-foreground text-5xl mb-4">
                      ❝
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 break-words">
                      {wish.message}
                    </p>
                    <div className="font-semibold text-accent-foreground">
                      {wish.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* LOCATION */}
      {eventData.showVenue &&
        (hasValue(eventData.venue) ||
          hasValue(eventData.address) ||
          hasValue(eventData.mapLink)) && (
          <section className="py-24 px-6 bg-muted/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="uppercase tracking-[0.3em] text-muted-foreground">
                  Venue
                </span>
                <h2 className="text-5xl font-bold mt-4">Our Wedding Venue</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                <div className="bg-card text-card-foreground border border-border rounded-[32px] p-10 backdrop-blur-md shadow-lg">
                  {hasValue(eventData.venue) && (
                    <h3 className="text-3xl font-bold mb-6">
                      {eventData.venue}
                    </h3>
                  )}
                  {hasValue(eventData.address) && (
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {eventData.address}
                    </p>
                  )}
                  {hasValue(eventData.mapLink) && (
                    <a
                      href={eventData.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex px-8 py-4 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition font-semibold"
                    >
                      Find Your Way
                    </a>
                  )}
                </div>

                <div className="rounded-[32px] overflow-hidden border border-border min-h-[450px] shadow-lg">
                  {hasValue(eventData.mapLink) ? (
                    <iframe
                      src={getMapEmbedUrl(
                        eventData.mapLink || "",
                        `${eventData.venue || ""} ${eventData.address || ""}`,
                      )}
                      className="w-full h-full border-0 min-h-[450px]"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-muted min-h-[450px]">
                      <p className="text-muted-foreground">
                        Map Preview Not Available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

      {/* MUSIC BUTTON */}
      {hasValue(eventData.musicUrl) && (
        <div className="fixed bottom-6 right-6 z-50">
          <audio ref={audioRef} src={eventData.musicUrl} loop />
          <button
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                } else {
                  audioRef.current.play();
                  setIsPlaying(true);
                }
              }
            }}
            className="w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground text-2xl shadow-2xl transition border border-border flex items-center justify-center"
          >
            {isPlaying ? "⏸" : "💍"}
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-32 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] text-muted-foreground">
            With Love
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mt-6 mb-8">
            See You At
            <br />
            The Aisle
          </h2>

          {hasHeroNames && (
            <div className="text-4xl md:text-6xl font-bold flex items-center justify-center flex-wrap gap-4">
              {bride && <span>{bride}</span>}
              {bride && groom && (
                <span className="mx-4 text-accent-foreground">&</span>
              )}
              {groom && <span>{groom}</span>}
            </div>
          )}

          <p className="mt-8 text-muted-foreground">
            Crafted with elegance using Ente Invite
          </p>
        </div>
      </footer>
    </main>
  );
}
