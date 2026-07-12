"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, LogOut, History, User } from "lucide-react";
import { getCurrentUserAction, logoutAction } from "@/lib/actions/auth";
import { getMyInvitationsAction } from "@/lib/actions/invitation";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getCurrentUserAction();
        if (res?.user) {
          setUser(res.user);
          const eventsRes = await getMyInvitationsAction();
          if (eventsRes?.data) {
            setMyEvents(eventsRes.data);
          }
        }
      } catch (err) {
        // Not logged in or session expired
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
      setUser(null);
      setMyEvents([]);
      setDropdownOpen(false);
      router.push("/login");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

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
      },
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
          <a href="#home" className="flex items-center gap-3">
            <Image
              src="/login/logo2.png"
              alt="Ente Invite"
              width={1498}
              height={422}
              className="w-auto h-10 sm:h-12 object-contain rounded-xl shadow-sm"
              priority
            />
          </a>

          {/* Desktop Navigation */}

          <nav
            className="
              hidden
              lg:flex
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
                  text-sm
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
                    ${activeSection === link.id ? "w-full" : "w-0"}
                  `}
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Profile */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#categories"
              className="
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

            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-purple-100/50 animate-pulse ml-2 border-2 border-purple-100"></div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full border-2 border-purple-200 overflow-hidden shadow-sm hover:ring-2 hover:ring-purple-400 transition ml-2"
                >
                  {user.picture ? (
                    <Image
                      src={user.picture}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <p className="font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                      <p className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <History className="w-3 h-3" /> My Events
                      </p>
                      {myEvents.length > 0 ? (
                        myEvents.map((ev) => (
                          <a
                            key={ev._id}
                            href={`/event/${ev.slug}`}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition"
                          >
                            <div className="font-medium truncate">
                              {ev.brideName} & {ev.groomName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(ev.createdAt).toLocaleDateString()}
                            </div>
                          </a>
                        ))
                      ) : (
                        <div className="px-3 py-4 text-center text-sm text-gray-500">
                          No events created yet.
                        </div>
                      )}
                    </div>

                    <div className="p-2 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="text-zinc-600 hover:text-purple-600 font-medium transition ml-2 px-4 py-2"
              >
                Sign In
              </a>
            )}
          </div>
          {/* Mobile Menu */}

          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
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
                  overflow-y-auto
                  custom-scrollbar
                "
              >
                <SheetHeader className="hidden">
                  <SheetTitle>Navigation Menu</SheetTitle>
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
                              text-2xl
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
                    pb-12
                  "
                >
                  {isLoading ? (
                    <div className="mb-6 flex flex-col gap-4">
                      <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-gray-200/60"></div>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-32 bg-gray-200/60 rounded"></div>
                          <div className="h-3 w-48 bg-gray-200/60 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ) : user ? (
                    <div className="mb-6 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                          {user.picture ? (
                            <Image
                              src={user.picture}
                              alt={user.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>

                      <div className="border border-gray-100 rounded-xl p-3 bg-gray-50 max-h-48 overflow-y-auto custom-scrollbar">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <History className="w-3 h-3" /> My Events
                        </p>
                        {myEvents.length > 0 ? (
                          myEvents.map((ev) => (
                            <a
                              key={ev._id}
                              href={`/event/${ev.slug}`}
                              className="block py-2 border-b border-gray-200 last:border-0"
                            >
                              <div className="font-medium text-sm text-gray-700">
                                {ev.brideName} & {ev.groomName}
                              </div>
                              <div className="text-xs text-gray-400">
                                {new Date(ev.createdAt).toLocaleDateString()}
                              </div>
                            </a>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            No events created yet.
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full py-3 text-red-600 bg-red-50 rounded-xl font-medium"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <a
                        href="/login"
                        className="
                          flex
                          items-center
                          justify-center
                          rounded-3xl
                          bg-white
                          border-2
                          border-purple-600
                          py-4
                          text-lg
                          font-semibold
                          text-purple-600
                          shadow-sm
                          mb-4
                        "
                      >
                        Sign In
                      </a>
                    </SheetClose>
                  )}

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
