"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
} from "lucide-react";

import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function NaturalEarthyBotanical({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  return (
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

        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center px-6"
        >
          <p className="uppercase tracking-[0.5em] text-primary-foreground/80 text-sm mb-6">
            A Celebration of Nature and Love
          </p>

          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground">
            {eventData.brideName}
          </h1>

          <div className="text-muted-foreground text-5xl my-4">
            &
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground">
            {eventData.groomName}
          </h1>

          <p className="mt-10 text-xl text-primary-foreground/90">
            Rooted In Love, Growing Together
          </p>

          <p className="text-3xl font-light mt-3 text-primary-foreground">
            {eventData.date}
          </p>

          <button className="mt-10 px-8 py-4 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition">
            Discover Our Garden
          </button>
        </motion.div>

      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section className="py-24 px-6 bg-muted/50">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                The Couple
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Meet The Happy Couple
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-card text-card-foreground backdrop-blur-md border border-border rounded-[32px] p-10 shadow-lg"
              >
                <div className="text-7xl mb-6">
                  👰
                </div>

                <h3 className="text-3xl font-bold">
                  {eventData.brideName}
                </h3>

                <p className="text-muted-foreground mt-3">
                  Bride
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-card text-card-foreground backdrop-blur-md border border-border rounded-[32px] p-10 shadow-lg"
              >
                <div className="text-7xl mb-6">
                  🤵
                </div>

                <h3 className="text-3xl font-bold">
                  {eventData.groomName}
                </h3>

                <p className="text-muted-foreground mt-3">
                  Groom
                </p>
              </motion.div>

            </div>

          </div>

        </section>
      )}

      {/* EVENT DETAILS */}
      <section className="py-24 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">

            <span className="uppercase tracking-[0.3em] text-muted-foreground">
              Event Details
            </span>

            <h2 className="text-5xl font-bold mt-4">
              Wedding Information
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm">
              <CalendarDays
                className="text-accent-foreground mb-4"
                size={40}
              />

              <h3 className="font-semibold text-xl mb-2">
                Date
              </h3>

              <p className="text-muted-foreground">
                {eventData.date}
              </p>
            </div>

            <div className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm">
              <Clock3
                className="text-accent-foreground mb-4"
                size={40}
              />

              <h3 className="font-semibold text-xl mb-2">
                Time
              </h3>

              <p className="text-muted-foreground">
                {eventData.time}
              </p>
            </div>

            <div className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm">
              <MapPin
                className="text-accent-foreground mb-4"
                size={40}
              />

              <h3 className="font-semibold text-xl mb-2">
                Venue
              </h3>

              <p className="text-muted-foreground">
                {eventData.venue}
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-24 px-6 bg-muted/50">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                Countdown
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Nature Awaits
              </h2>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card text-card-foreground backdrop-blur-md border border-border rounded-[32px] p-8 text-center shadow-lg"
                >
                  <h3 className="text-5xl font-bold text-accent-foreground">
                    {item.value}
                  </h3>

                  <p className="mt-3 text-muted-foreground">
                    {item.label}
                  </p>
                </motion.div>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory &&
        eventData.loveStory?.length > 0 && (
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

                <h2 className="text-5xl font-bold mt-4">
                  A Love That Blossomed
                </h2>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {eventData.loveStory.map((story, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                    className="bg-card text-card-foreground border border-border rounded-[32px] overflow-hidden backdrop-blur-md shadow-lg"
                  >
                    {story.image && (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-60 object-cover"
                      />
                    )}

                    <div className="p-8">

                      <p className="text-accent-foreground text-sm uppercase tracking-wider mb-2">
                        {story.subtitle}
                      </p>

                      <h3 className="text-2xl font-bold mb-4">
                        {story.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {story.description}
                      </p>

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
      )}

      {/* SCHEDULE */}
      {eventData.showSchedule &&
        eventData.schedule?.length > 0 && (
          <section className="py-24 px-6 bg-muted/50">

            <div className="max-w-5xl mx-auto">

              <div className="text-center mb-20">

                <span className="uppercase tracking-[0.3em] text-muted-foreground">
                  Timeline
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  Garden Itinerary
                </h2>

              </div>

              <div className="space-y-8">

                {eventData.schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -50,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                      <div>

                        <h3 className="text-2xl font-bold mb-2">
                          {item.title}
                        </h3>

                        <p className="text-muted-foreground">
                          {item.description}
                        </p>

                      </div>

                      <div className="mt-4 md:mt-0">

                        <span className="inline-flex px-5 py-3 rounded-full bg-accent text-accent-foreground font-semibold">
                          {item.time}
                        </span>

                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
      )}

      {/* GALLERY */}
      {eventData.showGallery &&
        eventData.gallery?.length > 0 && (
          <section className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">

                <span className="uppercase tracking-[0.3em] text-muted-foreground">
                  Gallery
                </span>

                <h2 className="text-5xl font-bold mt-4">
                  Organic Memories
                </h2>

              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-4">

                {eventData.gallery.map((image, index) => (
                  <motion.img
                    key={index}
                    whileHover={{
                      scale: 1.03,
                    }}
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
                Confirm Your Presence
              </h2>

              <p className="mt-4 text-muted-foreground">
                Let us know if you'll be joining us in the garden.
              </p>

            </div>

            <div className="bg-card text-card-foreground border border-border backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-lg">

              <form className="space-y-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />

                <input
                  type="number"
                  placeholder="Number of Guests"
                  className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />

                <textarea
                  rows={5}
                  placeholder="Leave a message..."
                  className="w-full p-4 rounded-2xl bg-background border border-input outline-none text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    className="py-4 rounded-2xl bg-accent hover:bg-accent/90 transition text-accent-foreground font-semibold"
                  >
                    Attending
                  </button>

                  <button
                    type="button"
                    className="py-4 rounded-2xl bg-destructive hover:bg-destructive/90 transition text-destructive-foreground"
                  >
                    Not Attending
                  </button>

                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition"
                >
                  Submit RSVP
                </button>

              </form>

            </div>

          </div>

        </section>
      )}

      {/* WISHES WALL */}
      {eventData.enableGreetings &&
        eventData.wishes?.length > 0 && (
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {eventData.wishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8 }}
                    className="bg-card text-card-foreground border border-border rounded-[32px] p-8 backdrop-blur-md shadow-sm"
                  >
                    <div className="text-accent-foreground text-5xl mb-4">
                      ❝
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {wish.message}
                    </p>

                    <div className="font-semibold text-accent-foreground">
                      {wish.name}
                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
      )}

      {/* LOCATION */}
      {eventData.showVenue && (
        <section className="py-24 px-6 bg-muted/50">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">

              <span className="uppercase tracking-[0.3em] text-muted-foreground">
                Venue
              </span>

              <h2 className="text-5xl font-bold mt-4">
                Our Natural Setting
              </h2>

            </div>

            <div className="grid lg:grid-cols-2 gap-10">

              <div className="bg-card text-card-foreground border border-border rounded-[32px] p-10 backdrop-blur-md shadow-lg">

                <h3 className="text-3xl font-bold mb-6">
                  {eventData.venue}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {eventData.address}
                </p>

                {eventData.mapLink && (
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

                {eventData.mapLink ? (
                  <iframe
                    src={eventData.mapLink}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted">
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
      {eventData.musicUrl && (
        <div className="fixed bottom-6 right-6 z-50">

          <audio
            id="tropical-audio"
            src={eventData.musicUrl}
            loop
          />

          <button
            onClick={() => {
              const audio =
                document.getElementById(
                  "tropical-audio"
                ) as HTMLAudioElement;

              if (!audio) return;

              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
            className="w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground text-2xl shadow-2xl transition border border-border"
          >
            🌿
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
            See You In
            <br />
            The Garden
          </h2>

          <div className="text-4xl md:text-6xl font-bold">

            {eventData.brideName}

            <span className="mx-4 text-accent-foreground">
              &
            </span>

            {eventData.groomName}

          </div>

          <p className="mt-8 text-muted-foreground">
            Crafted with natural elegance using Ente Invite
          </p>

        </div>

      </footer>

    </main>
  );
}