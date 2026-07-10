"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Camera,
  Mail,
} from "lucide-react";



import type { WeddingEventData } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  eventData: WeddingEventData;
}

export default function WeddingTraditional({
  eventData,
}: Props) {
  const timeLeft = useCountdown(eventData.date, eventData.time, eventData.rawWeddingDate);

  return (
    <main className="bg-[#faf6f0] text-zinc-800 overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center">

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/45" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <p className="uppercase tracking-[0.4em] mb-6 text-sm">
            Together With Their Families
          </p>

          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            {eventData.brideName}
            <span className="mx-4 text-[#d6b273]">&</span>
            {eventData.groomName}
          </h1>

          <p className="text-lg md:text-2xl opacity-90">
            Request the pleasure of your presence
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <span className="text-[#d6b273] uppercase tracking-widest">
              Save The Date
            </span>

            <span className="text-2xl md:text-3xl">
              {eventData.date}
            </span>
          </div>
        </motion.div>
      </section>

      {/* COUPLE SECTION */}
      {eventData.showCoupleInfo && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">

            <span className="text-[#b99863] uppercase tracking-[0.3em]">
              The Couple
            </span>

            <h2 className="text-5xl font-serif mt-4 mb-10">
              Meet The Happy Couple
            </h2>

            <div className="grid md:grid-cols-2 gap-10">

              <div className="bg-white rounded-3xl p-10 shadow-lg">
                <div className="text-6xl mb-4">👰</div>

                <h3 className="text-3xl font-serif">
                  {eventData.brideName}
                </h3>

                <p className="mt-4 text-zinc-600">
                  Bride
                </p>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-lg">
                <div className="text-6xl mb-4">🤵</div>

                <h3 className="text-3xl font-serif">
                  {eventData.groomName}
                </h3>

                <p className="mt-4 text-zinc-600">
                  Groom
                </p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* EVENT DETAILS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-[#b99863] uppercase tracking-[0.3em]">
              Wedding Details
            </span>

            <h2 className="text-5xl font-serif mt-4">
              Join Our Celebration
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl p-8 shadow">
              <CalendarDays
                className="text-[#b99863] mb-4"
                size={40}
              />

              <h3 className="font-semibold text-lg mb-2">
                Date
              </h3>

              <p>{eventData.date}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow">
              <Clock3
                className="text-[#b99863] mb-4"
                size={40}
              />

              <h3 className="font-semibold text-lg mb-2">
                Time
              </h3>

              <p>{eventData.time}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow">
              <MapPin
                className="text-[#b99863] mb-4"
                size={40}
              />

              <h3 className="font-semibold text-lg mb-2">
                Venue
              </h3>

              <p>{eventData.venue}</p>
            </div>

          </div>
        </div>
      </section>

          {/* COUNTDOWN SECTION */}
      {eventData.enableCountdown && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">

            <span className="text-[#b99863] uppercase tracking-[0.3em]">
              Countdown
            </span>

            <h2 className="text-5xl font-serif mt-4 mb-12">
              Counting The Days
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
                { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#faf6f0] border border-[#b99863]/20 rounded-[32px] p-8 text-center"
                >
                  <div className="text-4xl md:text-5xl font-serif text-[#b99863]">
                    {item.value}
                  </div>
                  <p className="mt-4 uppercase tracking-[2px] text-xs text-zinc-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LOVE STORY */}
      {eventData.showStory && eventData.loveStory?.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-20">
              <Heart
                className="mx-auto text-[#b99863] mb-4"
                size={40}
              />

              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                Our Story
              </span>

              <h2 className="text-5xl font-serif mt-4">
                The Journey Of Love
              </h2>
            </div>

            <div className="relative">

              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#d6b273]" />

              {eventData.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative mb-16 flex ${
                    index % 2 === 0
                      ? "md:justify-start"
                      : "md:justify-end"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-[#b99863] border-4 border-white -translate-x-1/2" />

                  <div className="bg-white shadow-lg rounded-3xl p-8 md:w-[45%] ml-12 md:ml-0">

                    <h3 className="text-2xl font-serif mb-2">
                      {story.title}
                    </h3>

                    <p className="text-[#b99863] mb-4">
                      {story.subtitle}
                    </p>

                    <p className="text-zinc-600 leading-relaxed">
                      {story.description}
                    </p>

                    {story.image && (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="mt-6 rounded-2xl w-full h-60 object-cover"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE SECTION */}
      {eventData.showSchedule &&
        eventData.schedule?.length > 0 && (
          <section className="py-24 px-6 bg-white">

            <div className="max-w-5xl mx-auto">

              <div className="text-center mb-16">

                <span className="uppercase tracking-[0.3em] text-[#b99863]">
                  Timeline
                </span>

                <h2 className="text-5xl font-serif mt-4">
                  Wedding Schedule
                </h2>

              </div>

              <div className="space-y-6">

                {eventData.schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#faf6f0] rounded-3xl p-8 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                      <div>
                        <h3 className="text-2xl font-serif mb-2">
                          {item.title}
                        </h3>

                        <p className="text-zinc-600">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0 text-[#b99863] text-xl font-semibold">
                        {item.time}
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

            <div className="max-w-6xl mx-auto">

              <div className="text-center mb-16">

                <Camera
                  className="mx-auto text-[#b99863] mb-4"
                  size={40}
                />

                <span className="uppercase tracking-[0.3em] text-[#b99863]">
                  Memories
                </span>

                <h2 className="text-5xl font-serif mt-4">
                  Photo Gallery
                </h2>

              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {eventData.gallery?.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Gallery ${index}`}
      className="w-full h-60 object-cover rounded-2xl"
    />
  ))}
</div>

            </div>
          </section>
      )}
            {/* RSVP SECTION */}
      {eventData.rsvpEnabled && (
        <section className="py-24 px-6 bg-white">

          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-16">

              <Mail
                className="mx-auto text-[#b99863] mb-4"
                size={40}
              />

              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                RSVP
              </span>

              <h2 className="text-5xl font-serif mt-4">
                Confirm Your Attendance
              </h2>

              <p className="mt-6 text-zinc-600">
                Kindly let us know if you will be joining us.
              </p>

            </div>

            <div className="bg-[#faf6f0] rounded-[32px] p-8 md:p-12 shadow-lg">
              <form className="space-y-4">
  <input
    type="text"
    placeholder="Your Name"
    className="w-full p-4 rounded-xl border"
  />

  <select className="w-full p-4 rounded-xl border">
    <option>Will Attend</option>
    <option>Not Attending</option>
  </select>

  <textarea
    rows={4}
    placeholder="Message"
    className="w-full p-4 rounded-xl border"
  />

  <button
    type="submit"
    className="px-6 py-3 rounded-xl bg-[#b99863] text-white"
  >
    Submit RSVP
  </button>
</form>
            </div>

          </div>

        </section>
      )}

      {/* WISHES SECTION */}
      {eventData.enableGreetings &&
        eventData.wishes?.length > 0 && (
          <section className="py-24 px-6">

            <div className="max-w-6xl mx-auto">

              <div className="text-center mb-16">

                <Heart
                  className="mx-auto text-[#b99863] mb-4"
                  size={40}
                />

                <span className="uppercase tracking-[0.3em] text-[#b99863]">
                  Guest Wishes
                </span>

                <h2 className="text-5xl font-serif mt-4">
                  Messages Of Love
                </h2>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {eventData.wishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 shadow-lg"
                  >
                    <div className="text-[#b99863] text-4xl mb-4">
                      ❝
                    </div>

                    <p className="text-zinc-600 leading-relaxed mb-6">
                      {wish.message}
                    </p>

                    <div className="font-semibold">
                      {wish.name}
                    </div>

                  </motion.div>
                ))}

              </div>

            </div>
          </section>
      )}

      {/* LOCATION SECTION */}
      {eventData.showVenue && (
        <section className="py-24 px-6 bg-white">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">

              <MapPin
                className="mx-auto text-[#b99863] mb-4"
                size={40}
              />

              <span className="uppercase tracking-[0.3em] text-[#b99863]">
                Location
              </span>

              <h2 className="text-5xl font-serif mt-4">
                Wedding Venue
              </h2>

            </div>

            <div className="bg-[#faf6f0] rounded-[40px] overflow-hidden shadow-xl">

              <div className="grid lg:grid-cols-2">

                <div className="p-10 md:p-14">

                  <h3 className="text-3xl font-serif mb-6">
                    {eventData.venue}
                  </h3>

                  <p className="text-zinc-600 leading-relaxed mb-8">
                    {eventData.address}
                  </p>

                  {eventData.mapLink && (
                    <a
                      href={eventData.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 rounded-full bg-[#b99863] text-white font-medium hover:scale-105 transition"
                    >
                      Open Google Maps
                    </a>
                  )}

                </div>

                <div className="min-h-[400px]">

                  {eventData.mapLink ? (
                    <iframe
                      src={eventData.mapLink}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-[#e9ddca]">
                      <p className="text-zinc-600">
                        Map Location
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* FLOATING MUSIC BUTTON */}
      {eventData.showMusic &&
        eventData.musicUrl && (
          <div className="fixed bottom-6 right-6 z-50">

            <audio
              id="wedding-audio"
              src={eventData.musicUrl}
              loop
            />

            <button
              onClick={() => {
                const audio =
                  document.getElementById(
                    "wedding-audio"
                  ) as HTMLAudioElement;

                if (!audio) return;

                if (audio.paused) {
                  audio.play();
                } else {
                  audio.pause();
                }
              }}
              className="w-16 h-16 rounded-full bg-[#b99863] text-white shadow-xl text-2xl hover:scale-110 transition"
            >
              🎵
            </button>

          </div>
      )}

      {/* FOOTER */}
      <footer className="py-32 px-6 text-center">

        <div className="max-w-3xl mx-auto">

          <span className="uppercase tracking-[0.3em] text-[#b99863]">
            Thank You
          </span>

          <h2 className="text-5xl md:text-6xl font-serif mt-6 mb-10">
            We Can't Wait
            <br />
            To Celebrate With You
          </h2>

          <div className="text-3xl md:text-5xl font-serif mb-6">
            {eventData.brideName}
            <span className="mx-4 text-[#b99863]">&</span>
            {eventData.groomName}
          </div>

          <p className="text-zinc-600">
            With love and gratitude.
          </p>

        </div>

      </footer>

    </main>
  );
}