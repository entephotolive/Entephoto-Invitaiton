"use client";

import { WeddingEventData } from "@/types/event";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
} from "lucide-react";

interface Props {
  eventData: WeddingEventData;
}

export default function Venue({
  eventData,
}: Props) {
  return (
    <section
      id="venue"
      className="
      py-32
      bg-[#0A0A0A]
      scroll-mt-32
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-24"
        >
          <p
            className="
            uppercase
            tracking-[6px]
            text-[#D4AF37]
            text-sm
            "
          >
            Venue Details
          </p>

          <h2
            className="
            mt-4
            text-5xl
            md:text-6xl
            font-serif
            text-white
            "
          >
            Wedding Location
          </h2>

          <div
            className="
            w-24
            h-px
            bg-[#D4AF37]
            mx-auto
            mt-8
            "
          />
        </motion.div>

        <div
          className="
          grid
          lg:grid-cols-2
          gap-10
          "
        >
          {/* Details Card */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
            bg-white/5
            backdrop-blur-xl

            border
            border-[#D4AF37]/10

            rounded-[36px]

            p-10
            "
          >
            <h3
              className="
              text-white
              text-4xl
              font-serif
              mb-8
              "
            >
              {eventData.venue ||
                "Royal Ballroom"}
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4">
                <MapPin
                  className="
                  text-[#D4AF37]
                  mt-1
                  "
                />

                <div>
                  <h4
                    className="
                    text-white
                    font-medium
                    "
                  >
                    Address
                  </h4>

                  <p
                    className="
                    text-neutral-400
                    "
                  >
                    {eventData.address ||
                      "Wedding Venue Address"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Calendar
                  className="
                  text-[#D4AF37]
                  mt-1
                  "
                />

                <div>
                  <h4
                    className="
                    text-white
                    font-medium
                    "
                  >
                    Date
                  </h4>

                  <p
                    className="
                    text-neutral-400
                    "
                  >
                    {eventData.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock
                  className="
                  text-[#D4AF37]
                  mt-1
                  "
                />

                <div>
                  <h4
                    className="
                    text-white
                    font-medium
                    "
                  >
                    Time
                  </h4>

                  <p
                    className="
                    text-neutral-400
                    "
                  >
                    {eventData.time}
                  </p>
                </div>
              </div>

            </div>

            {eventData.mapLink && (
              <a
                href={eventData.mapLink}
                target="_blank"
                rel="noreferrer"
                className="
                inline-flex
                items-center
                gap-3

                mt-10

                px-8
                py-4

                rounded-full

                bg-[#D4AF37]
                text-black

                font-medium

                hover:scale-105
                transition
                "
              >
                <Navigation size={18} />

                Open Google Maps
              </a>
            )}
          </motion.div>

          {/* Map Card */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
            overflow-hidden

            rounded-[36px]

            border
            border-[#D4AF37]/10

            bg-white/5

            backdrop-blur-xl
            "
          >
            {eventData.mapLink ? (
              <iframe
                src={eventData.mapLink}
                width="100%"
                height="100%"
                loading="lazy"
                className="
                min-h-[500px]
                "
              />
            ) : (
              <div
                className="
                min-h-[500px]

                flex
                items-center
                justify-center

                text-[#D4AF37]
                "
              >
                Map Preview
              </div>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}