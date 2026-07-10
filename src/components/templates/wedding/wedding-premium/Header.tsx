"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WeddingEventData } from "@/types/event";

interface Props {
  eventData: WeddingEventData;
}

const navItems = [
  { label: "Story", href: "#story" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "Venue", href: "#venue" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Header({
  eventData,
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("#story");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY + 200;

      navItems.forEach((item) => {
        const section = document.querySelector(
          item.href
        );

        if (!section) return;

        const top =
          (section as HTMLElement).offsetTop;

        const height =
          (section as HTMLElement)
            .offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          setActiveSection(item.href);
        }
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const handleClick = (
    href: string
  ) => {
    setActiveSection(href);

    const section =
      document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur-md
        border-b
        border-rose-100
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          h-24
          px-6
          flex
          items-center
          justify-between
        "
      >
        {/* Logo */}
        <div
          className="
            text-5xl
            font-script
            text-rose-300
          "
        >
          {(eventData.brideName || "B")
            .charAt(0)
            .toUpperCase()}
          &
          {(eventData.groomName || "G")
            .charAt(0)
            .toUpperCase()}
        </div>

        {/* Desktop Navigation */}
        <nav
          className="
            hidden
            lg:flex
            items-center
            gap-10
          "
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() =>
                handleClick(item.href)
              }
              className={`
                relative
                text-lg
                transition-all
                duration-300
                ${
                  activeSection === item.href
                    ? "text-rose-500"
                    : "text-neutral-700 hover:text-rose-400"
                }
              `}
            >
              {item.label}

              <span
                className={`
                  absolute
                  left-0
                  -bottom-2
                  h-[2px]
                  bg-rose-500
                  transition-all
                  duration-300
                  ${
                    activeSection === item.href
                      ? "w-full"
                      : "w-0"
                  }
                `}
              />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          className="lg:hidden"
        >
          {mobileMenuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="
            lg:hidden
            bg-white
            border-t
            border-rose-100
          "
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() =>
                handleClick(item.href)
              }
              className={`
                block
                w-full
                text-left
                px-6
                py-4
                border-b
                border-neutral-100
                ${
                  activeSection === item.href
                    ? "bg-rose-50 text-rose-500"
                    : "hover:bg-rose-50"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}