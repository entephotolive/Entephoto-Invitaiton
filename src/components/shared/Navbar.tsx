"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  {
    title: "Home",
    href: "#home",
    id: "home",
  },
  {
    title: "About",
    href: "#about",
    id: "about",
  },
  {
    title: "Events",
    href: "#categories",
    id: "categories",
  },
  {
    title: "Contact",
    href: "#contact",
    id: "contact",
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

        <div
          className="
            bg-white/70
            backdrop-blur-xl
            border
            border-white
            rounded-[28px]
            px-5
            sm:px-8
            py-3
            flex
            items-center
            justify-between
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          "
        >
                    {/* Logo */}

          <a
            href="#home"
            className="flex items-center gap-3"
          >
           

            <span
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-[#1d2142]
              "
            >
              Ente Invite
            </span>
          </a>

          {/* Desktop Navigation */}

          <nav
            className="
              hidden
              md:flex
              items-center
              gap-8
            "
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`
                  relative
                  pb-1
                  font-medium
                  transition
                  ${
                    activeSection === link.id
                      ? "text-purple-600"
                      : "text-zinc-600 hover:text-purple-600"
                  }
                `}
              >
                {link.title}

                <span
                  className={`
                    absolute
                    left-0
                    -bottom-1
                    h-[2px]
                    bg-purple-600
                    transition-all
                    duration-300
                    ${
                      activeSection === link.id
                        ? "w-full"
                        : "w-0"
                    }
                  `}
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}

          <a
            href="#categories"
            className="
              hidden
              md:flex
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              text-white
              px-6
              py-2.5
              rounded-full
              font-semibold
              shadow-lg
              hover:scale-105
              transition
            "
          >
            Start Creating
          </a>
                    {/* Mobile Menu */}

          <div className="md:hidden">

            <Sheet
              open={open}
              onOpenChange={setOpen}
            >
              <SheetTrigger asChild>
                <button
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="
                  w-[90vw]
                  max-w-[380px]
                  p-0
                  bg-white
                  flex
                  flex-col
                "
              >
                <SheetHeader className="hidden">
                  <SheetTitle>
                    Navigation Menu
                  </SheetTitle>
                </SheetHeader>

                <div
                  className="
                    px-8
                    py-6
                    border-b
                  "
                >
                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-[#1d2142]
                    "
                  >
                    Ente Invite
                  </h2>
                </div>

                <div
                  className="
                    flex-1
                    px-8
                    pt-10
                  "
                >
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                    className="
                      flex
                      flex-col
                      gap-8
                    "
                  >
                    {navLinks.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: 30,
                          },
                          show: {
                            opacity: 1,
                            x: 0,
                          },
                        }}
                      >
                        <SheetClose asChild>
                          <a
                            href={item.href}
                            className={`
                              block
                              text-4xl
                              font-bold
                              transition
                              ${
                                activeSection === item.id
                                  ? "text-purple-600"
                                  : "text-[#1d2142]"
                              }
                            `}
                          >
                            {item.title}
                          </a>
                        </SheetClose>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div
                  className="
                    border-t
                    p-8
                  "
                >
                  <SheetClose asChild>
                    <a
                      href="#categories"
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-3xl
                        bg-gradient-to-r
                        from-purple-600
                        to-pink-500
                        py-5
                        text-lg
                        font-semibold
                        text-white
                        shadow-lg
                      "
                    >
                      Start Creating →
                    </a>
                  </SheetClose>

                  <p
                    className="
                      mt-8
                      text-center
                      text-sm
                      text-zinc-400
                    "
                  >
                    © 2026 Ente Invite. All rights reserved.
                  </p>
                </div>

              </SheetContent>

            </Sheet>

          </div>

        </div>

      </div>
    </motion.header>
  );
}