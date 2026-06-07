"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Camera, ArrowRight } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "entephoto.live@gmail.com",
    href: "mailto:entephoto.live@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 80753 93896",
    href: "https://wa.me/918075393896",
  },
  {
    icon: Camera,
    label: "Instagram",
    value: "@entephoto",
    href: "https://www.instagram.com/_entephoto_/",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#faf7f3] py-16 md:py-20"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span
            className="
              uppercase
              tracking-[0.25em]
              text-sm
              text-[#9c7a58]
              font-medium
            "
          >
            Contact Us
          </span>

          <h2
            className="
              mt-6
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-serif
              text-[#2f2620]
              leading-tight
            "
          >
            Ready To Share
            <br />
            Your Special Day?
          </h2>

          <p
            className="
              mt-8
              max-w-2xl
              mx-auto
              text-lg
              leading-8
              text-zinc-600
            "
          >
            Create a beautiful digital invitation website
            for weddings, engagements, birthdays,
            baby showers and housewarming celebrations.
          </p>

          {/* CTA Button */}

        
        </motion.div>

        {/* Contact Details */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="
            mt-24
            max-w-3xl
            mx-auto
            border-t
            border-[#e7ddd2]
            pt-12
          "
        >
          <div className="space-y-8">

            {contacts.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-2
                    text-center
                    sm:text-left
                    group
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      sm:justify-start
                      gap-3
                    "
                  >
                    <Icon
                      className="
                        w-5
                        h-5
                        text-[#8c6847]
                      "
                    />

                    <span
                      className="
                        text-[#2f2620]
                        font-medium
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  <span
                    className="
                      text-zinc-600
                      group-hover:text-black
                      transition
                    "
                  >
                    {item.value}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Small Footer */}

          <p
            className="
              mt-12
              text-center
              text-sm
              text-zinc-500
            "
          >
            We usually reply within 24 hours.
          </p>
        </motion.div>

      </div>
    </section>
  );
}