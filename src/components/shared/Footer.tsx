"use client";

import { motion } from "framer-motion";
import {
  Camera,
  MessageCircle,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-zinc-200
        bg-black
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-6
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-6
        "
      >
        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="flex items-center gap-4"
        >
          

          <p className="text-zinc-300 text-lg">
            © 2026{" "}
            <span className="font-semibold">
              Ente Invite
            </span>
          </p>
        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-4
            text-zinc-300
          "
        >
          <a
            href="tel:+918075393896"
            className="hover:text-purple-600 transition"
          >
            +91 8075393896
          </a>

          <span className="hidden sm:block">•</span>

          <a
            href="mailto:entephoto.live@gmail.com"
            className="hover:text-purple-600 transition"
          >
            entephoto.live@gmail.com
          </a>

          <a
            href="https://instagram.com/_entephoto_"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hover:text-purple-600
              transition
            "
          >
            <Camera className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hover:text-purple-600
              transition
            "
          >
            

         
            <MessageCircle className="w-5 h-5" />
          </a>

          <a
            href="mailto:entephoto.live@gmail.com"
            className="
              hover:text-purple-600
              transition
            "
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}