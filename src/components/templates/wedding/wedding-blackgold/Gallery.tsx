"use client";

import { useState } from "react";
import { EventData } from "@/types/event";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  eventData: EventData;
}

export default function Gallery({
  eventData,
}: Props) {
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  if (
    !eventData.gallery ||
    eventData.gallery.length === 0
  ) {
    return null;
  }

  return (
    <>
      <section
        id="gallery"
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
              Captured Moments
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
              Wedding Gallery
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

          {/* Gallery Grid */}

          <div
            className="
            columns-1
            md:columns-2
            lg:columns-3
            gap-6
            space-y-6
            "
          >
            {eventData.gallery.map(
              (image, index) => (
                <motion.div
                  key={index}
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
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className="
                  break-inside-avoid
                  cursor-pointer
                  group
                  "
                  onClick={() =>
                    setSelectedImage(
                      image
                    )
                  }
                >
                  <div
                    className="
                    overflow-hidden
                    rounded-[32px]

                    border
                    border-[#D4AF37]/10

                    bg-white/5
                    "
                  >
                    <img
                      src={image}
                      alt=""
                      className="
                      w-full

                      transition-all
                      duration-700

                      group-hover:scale-110
                      group-hover:brightness-110
                      "
                    />
                  </div>
                </motion.div>
              )
            )}
          </div>

        </div>
      </section>

      {/* Lightbox */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
            fixed
            inset-0
            z-[999]

            bg-black/95

            flex
            items-center
            justify-center

            p-6
            "
            onClick={() =>
              setSelectedImage(
                null
              )
            }
          >
            <button
              className="
              absolute
              top-6
              right-6

              text-white
              "
            >
              <X size={34} />
            </button>

            <motion.img
              initial={{
                scale: 0.9,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.9,
              }}
              src={selectedImage}
              alt=""
              className="
              max-w-full
              max-h-[90vh]

              rounded-[24px]

              border
              border-[#D4AF37]/20
              "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}