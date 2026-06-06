import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 pt-6">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-5 flex items-center justify-between shadow-2xl">

          <h1 className="text-2xl font-bold text-white">
            Evently
          </h1>

          <nav className="hidden md:flex gap-10 text-zinc-300">

            <a
              href="#about"
              className="hover:text-white transition"
            >
              About
            </a>

            <a
              href="#categories"
              className="hover:text-white transition"
            >
              Events
            </a>

            <a
              href="#contact"
              className="hover:text-white transition"
            >
              Contact
            </a>

          </nav>

          <Link
            href="/builder"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Start Creating
          </Link>

        </div>

      </div>
    </header>
  );
}