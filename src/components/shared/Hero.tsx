import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f4f8] via-[#faf7f6] to-[#f3eef5] min-h-screen">

      {/* Background Decorations */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border text-sm font-medium text-purple-700">
              ✨ Build • Share • Collect Memories
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-[#23203f]">

              Create Beautiful

              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Event Websites
              </span>

            </h1>

            {/* Description */}
            <p className="mt-8 text-xl text-gray-600 leading-8 max-w-xl">
              Design stunning websites for weddings,
              birthdays, corporate events and more.
              Share moments, collect memories and
              connect with Ente Photo effortlessly.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/builder"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                Start Creating →
              </Link>

              <button className="px-8 py-4 rounded-full border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition">
                Explore Events
              </button>

            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-2xl">🎨</div>
                <h4 className="font-semibold mt-2">
                  Templates
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Beautiful designs
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-2xl">📷</div>
                <h4 className="font-semibold mt-2">
                  Galleries
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Ente Photo support
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-2xl">👥</div>
                <h4 className="font-semibold mt-2">
                  Guests
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Manage attendees
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-2xl">🔒</div>
                <h4 className="font-semibold mt-2">
                  Secure
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Safe memories
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div className="relative h-[700px]">

            {/* Main Card */}
            <div className="absolute top-0 right-10 w-[420px] h-[560px] rounded-[220px] overflow-hidden border-[8px] border-white shadow-2xl bg-white">

              <img
                src="/hero/main-event.png"
                alt="Main Event"
                className="w-full h-full object-cover"
              />

            </div>

            {/* Floating Card 1 */}
            <div className="absolute top-10 right-[-20px] rotate-12 bg-white p-3 rounded-xl shadow-2xl">

              <img
                src="/hero/birthday.avif"
                alt="Birthday"
                className="w-48 h-56 object-cover rounded-lg"
              />

              <p className="text-center text-sm mt-2 text-gray-600 italic">
                Unforgettable Moments
              </p>

            </div>

            {/* Floating Card 2 */}
            <div className="absolute bottom-20 left-0 -rotate-12 bg-white p-3 rounded-xl shadow-2xl">

              <img
                src="/hero/graduation.jpeg"
                alt="Graduation"
                className="w-48 h-56 object-cover rounded-lg"
              />

              <p className="text-center text-sm mt-2 text-gray-600 italic">
                Dreams Achieved
              </p>

            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-20 text-6xl opacity-20">
              ✨
            </div>

            <div className="absolute bottom-10 right-10 text-6xl opacity-20">
              🌸
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}