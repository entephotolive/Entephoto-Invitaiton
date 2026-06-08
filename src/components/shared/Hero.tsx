"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#fff8fb] via-[#faf7ff] to-[#f4f1ff]">

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          -top-20
          -left-20
          h-[400px]
          w-[400px]
          rounded-full
          bg-pink-300/30
          blur-[120px]
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
          absolute
          right-0
          top-20
          h-[600px]
          w-[600px]
          rounded-full
          bg-purple-300/20
          blur-[150px]
        "
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-24 lg:pt-32 pb-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >

            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-purple-200
                bg-white
                px-5
                py-2
                text-purple-600
                shadow-md
                text-sm
                font-medium
              "
            >
              ✨ Powered by Ente Photo
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="
                mt-8
                text-[46px]
                sm:text-[64px]
                lg:text-[86px]
                font-black
                leading-[0.92]
                tracking-[-0.05em]
                text-[#1d2142]
              "
            >
              Create Beautiful

              <span className="
                block
                bg-gradient-to-r
                from-pink-500
                via-purple-500
                to-indigo-500
                bg-clip-text
                text-transparent
              ">
                Event Websites
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="
                mt-8
                max-w-xl
                text-lg
                leading-9
                text-zinc-600
              "
            >
              Build stunning wedding, birthday,
              graduation and event websites.
              Share invitations, collect memories,
              and connect seamlessly with
              Ente Photo galleries.
            </motion.p>

             {/* MOBILE MOCKUP */}
        <div className="lg:hidden mt-16 relative h-[520px]">

          <motion.img
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            src="/hero/flowers-left.png"
            alt=""
            className="absolute left-0 top-24 w-24 z-10"
          />

          <motion.img
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            src="/hero/flowers-right.png"
            alt=""
            className="absolute right-0 top-8 w-24 z-10"
          />

          {/* Main Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: false }}
            className="
              absolute
              left-1/2
              -translate-x-1/2
              top-0
              w-[260px]
              rounded-[28px]
              overflow-hidden
              border-4
              border-white
              shadow-2xl
              z-20
            "
          >
            <img
              src="/hero/main-event.png"
              alt=""
              className="w-full h-[330px] object-cover"
            />
          </motion.div>

          {/* Birthday */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              absolute
              left-0
              bottom-20
              bg-white
              p-2
              rounded-xl
              shadow-xl
              rotate-[-10deg]
              z-30
            "
          >
            <img
              src="/hero/cake.avif"
              alt=""
              className="w-28 h-36 rounded-lg object-cover"
            />
          </motion.div>

          {/* Graduation */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
              absolute
              right-0
              bottom-8
              bg-white
              p-2
              rounded-xl
              shadow-xl
              rotate-[10deg]
              z-30
            "
          >
            <img
              src="/hero/graduation.jpeg"
              alt=""
              className="w-28 h-36 rounded-lg object-cover"
            />
          </motion.div>

        </div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex gap-8 flex-wrap"
            >
              <div>
                <h3 className="text-3xl font-black text-[#1d2142]">
                  100+
                </h3>

                <p className="text-zinc-500">
                  Templates
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-[#1d2142]">
                  10K+
                </h3>

                <p className="text-zinc-500">
                  Memories Shared
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-[#1d2142]">
                  500+
                </h3>

                <p className="text-zinc-500">
                  Events
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/builder"
                className="
                  px-8
                  py-4
                  rounded-full
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-500
                  text-white
                  font-semibold
                  text-center
                  shadow-[0_20px_50px_rgba(168,85,247,0.35)]
                  transition-all
                  hover:scale-105
                "
              >
                Start Creating →
              </Link>

              <button
                className="
                  px-8
                  py-4
                  rounded-full
                  border
                  border-purple-300
                  bg-white/70
                  backdrop-blur
                  text-purple-700
                  font-semibold
                  hover:bg-white
                "
              >
                Explore Templates
              </button>
            </motion.div>
           </motion.div> 
                      {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="relative h-[700px] hidden lg:block"
          >

            {/* Main Website Mockup */}
            <motion.div
              whileHover={{
                y: -8,
              }}
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[560px]
                rounded-[32px]
                overflow-hidden
                border-[10px]
                border-white
                bg-white
                shadow-[0_40px_120px_rgba(0,0,0,0.18)]
                z-20
              "
            >
              <img
                src="/hero/main-event.png"
                alt="Event Website"
                className="w-full h-[650px] object-cover"
              />
            </motion.div>

            {/* Left Flower */}
            <motion.img
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              src="/hero/flowers-left.png"
              alt=""
              className="
                absolute
                left-[-60px]
                top-[130px]
                w-56
                z-10
                pointer-events-none
              "
            />

            {/* Right Flower */}
            <motion.img
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              src="/hero/flowers-right.png"
              alt=""
              className="
                absolute
                right-[-60px]
                top-[80px]
                w-56
                z-10
                pointer-events-none
              "
            />

            {/* Birthday Card */}
            <motion.div
              animate={{
                y: [0, -18, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-0
                bottom-24
                bg-white
                p-3
                rounded-2xl
                shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                rotate-[-10deg]
                z-30
              "
            >
              <img
                src="/hero/cake.avif"
                alt=""
                className="
                  w-52
                  h-60
                  rounded-xl
                  object-cover
                "
              />

              <p className="mt-2 text-center text-sm font-medium text-zinc-600">
                Birthday Celebration
              </p>
            </motion.div>

            {/* Graduation Card */}
            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                right-0
                bottom-10
                bg-white
                p-3
                rounded-2xl
                shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                rotate-[10deg]
                z-30
              "
            >
              <img
                src="/hero/graduation.jpeg"
                alt=""
                className="
                  w-52
                  h-60
                  rounded-xl
                  object-cover
                "
              />

              <p className="mt-2 text-center text-sm font-medium text-zinc-600">
                Graduation Day
              </p>
            </motion.div>

          </motion.div>

        </div>

       
                {/* FEATURE BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="
            mt-24
            bg-white/80
            backdrop-blur-xl
            rounded-[32px]
            border
            border-white
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            overflow-hidden
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

            {[
              [
                "🎨",
                "Beautiful Templates",
                "Ready-made premium event designs",
              ],
              [
                "📷",
                "Photo Galleries",
                "Connect with Ente Photo albums",
              ],
              [
                "👥",
                "Guest Management",
                "Manage invitations and guests",
              ],
              [
                "🔒",
                "Secure & Reliable",
                "Your memories stay protected",
              ],
            ].map(([icon, title, desc], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="
                  flex
                  items-center
                  gap-4
                  p-6
                  border-b
                  md:border-r
                  border-zinc-100
                  last:border-r-0
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-purple-100
                    flex
                    items-center
                    justify-center
                    text-xl
                    shrink-0
                  "
                >
                  {icon}
                </div>

                <div>
                  <h3
                    className="
                      font-semibold
                      text-[#1d2142]
                    "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-zinc-500
                      mt-1
                    "
                  >
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}

          </div>
        </motion.div>

      </div>
    </section>
  );
}