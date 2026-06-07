import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
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
          <h1 className="text-xl sm:text-2xl font-bold text-[#1d2142]">
            Evently
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-zinc-600 font-medium">

            <a
              href="#about"
              className="hover:text-purple-600 transition"
            >
              About
            </a>

            <a
              href="#categories"
              className="hover:text-purple-600 transition"
            >
              Events
            </a>

            <a
              href="#contact"
              className="hover:text-purple-600 transition"
            >
              Contact
            </a>

          </nav>

          {/* CTA */}
          <Link
            href="/builder"
            className="
              bg-white
              text-[#1d2142]
              px-5
              sm:px-6
              py-2.5
              rounded-full
              font-semibold
              shadow-md
              hover:scale-105
              transition
            "
          >
            Start Creating
          </Link>

        </div>

      </div>
    </header>
  );
}