"use client";

import { useState } from "react";
import { EventData } from "@/types/event";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Users,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

interface Props {
  eventData: EventData;
}

export default function RSVP({
  eventData,
}: Props) {
  const [submitted, setSubmitted] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      guests: "1",
      attendance: "yes",
      message: "",
    });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className="
      py-32
      bg-[#151515]
      scroll-mt-32
      "
    >
      <div className="max-w-4xl mx-auto px-6">

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
          className="text-center mb-20"
        >
          <p
            className="
            uppercase
            tracking-[6px]
            text-[#D4AF37]
            text-sm
            "
          >
            Confirm Attendance
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
            RSVP
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

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
          bg-white/5
          backdrop-blur-xl

          border
          border-[#D4AF37]/10

          rounded-[40px]

          p-8
          md:p-12
          "
        >
          {submitted ? (
            <div className="text-center py-12">

              <CheckCircle
                size={70}
                className="
                text-[#D4AF37]
                mx-auto
                "
              />

              <h3
                className="
                mt-6
                text-white
                text-3xl
                font-serif
                "
              >
                Thank You
              </h3>

              <p
                className="
                mt-4
                text-neutral-400
                "
              >
                Your RSVP has been
                received successfully.
              </p>

            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}

              <div>
                <label
                  className="
                  flex
                  items-center
                  gap-2
                  text-white
                  mb-2
                  "
                >
                  <User
                    size={16}
                    className="
                    text-[#D4AF37]
                    "
                  />
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={
                    formData.name
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name:
                        e.target
                          .value,
                    })
                  }
                  className="
                  w-full

                  bg-black/30

                  border
                  border-[#D4AF37]/10

                  rounded-2xl

                  px-5
                  py-4

                  text-white
                  "
                />
              </div>

              {/* Phone */}

              <div>
                <label
                  className="
                  flex
                  items-center
                  gap-2
                  text-white
                  mb-2
                  "
                >
                  <Phone
                    size={16}
                    className="
                    text-[#D4AF37]
                    "
                  />
                  Phone Number
                </label>

                <input
                  type="text"
                  value={
                    formData.phone
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone:
                        e.target
                          .value,
                    })
                  }
                  className="
                  w-full

                  bg-black/30

                  border
                  border-[#D4AF37]/10

                  rounded-2xl

                  px-5
                  py-4

                  text-white
                  "
                />
              </div>

              {/* Guests */}

              <div>
                <label
                  className="
                  flex
                  items-center
                  gap-2
                  text-white
                  mb-2
                  "
                >
                  <Users
                    size={16}
                    className="
                    text-[#D4AF37]
                    "
                  />
                  Number Of Guests
                </label>

                <input
                  type="number"
                  min="1"
                  value={
                    formData.guests
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guests:
                        e.target
                          .value,
                    })
                  }
                  className="
                  w-full

                  bg-black/30

                  border
                  border-[#D4AF37]/10

                  rounded-2xl

                  px-5
                  py-4

                  text-white
                  "
                />
              </div>

              {/* Attendance */}

              <div>
                <label
                  className="
                  block
                  text-white
                  mb-3
                  "
                >
                  Attendance
                </label>

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        attendance:
                          "yes",
                      })
                    }
                    className={`
                    py-4
                    rounded-2xl

                    border

                    ${
                      formData.attendance ===
                      "yes"
                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                        : "border-[#D4AF37]/20 text-white"
                    }
                  `}
                  >
                    Attending
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        attendance:
                          "no",
                      })
                    }
                    className={`
                    py-4
                    rounded-2xl

                    border

                    ${
                      formData.attendance ===
                      "no"
                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                        : "border-[#D4AF37]/20 text-white"
                    }
                  `}
                  >
                    Not Attending
                  </button>

                </div>
              </div>

              {/* Message */}

              <div>
                <label
                  className="
                  flex
                  items-center
                  gap-2
                  text-white
                  mb-2
                  "
                >
                  <MessageSquare
                    size={16}
                    className="
                    text-[#D4AF37]
                    "
                  />
                  Message
                </label>

                <textarea
                  rows={5}
                  value={
                    formData.message
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message:
                        e.target
                          .value,
                    })
                  }
                  className="
                  w-full

                  bg-black/30

                  border
                  border-[#D4AF37]/10

                  rounded-2xl

                  px-5
                  py-4

                  text-white

                  resize-none
                  "
                />
              </div>

              <button
                type="submit"
                className="
                w-full

                py-5

                rounded-full

                bg-[#D4AF37]

                text-black

                font-semibold

                hover:scale-[1.02]
                transition
                "
              >
                Confirm Attendance
              </button>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}