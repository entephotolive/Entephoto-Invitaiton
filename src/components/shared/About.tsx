"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* MOBILE */}
        <div className="lg:hidden">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="
              relative
              overflow-hidden
              rounded-[32px]
              bg-white
              border
              border-zinc-100
              shadow-[0_30px_80px_rgba(0,0,0,0.08)]
              p-6
            "
          >

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[300px]
                h-[300px]
                rounded-full
                bg-purple-300
                blur-[100px]
              "
            />

            <div className="relative z-10 text-center">

              <span className="text-xs tracking-[0.3em] uppercase text-purple-500 font-semibold">
                About Evently
              </span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="
                  mt-4
                  text-4xl
                  font-black
                  text-[#1d2142]
                "
              >
                What is Evently?
              </motion.h2>

            </div>

            <div className="relative z-10 mt-8 space-y-4">

              

              <motion.img
                whileHover={{ scale: 1.02 }}
                src="/about/photo-album.png"
                alt=""
                className="
                  w-full
                  rounded-2xl
                  shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                "
              />

            </div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="
                relative
                z-10
                mt-8
                text-center
                text-base
                leading-8
                text-zinc-600
              "
            >
              Evently helps anyone create beautiful digital invitations
              without coding. Whether it is a wedding, birthday,
              graduation, corporate gathering or cultural festival,
              Evently provides stunning templates and seamless
              Ente Photo integration.
            </motion.p>

            <div className="relative z-10 mt-10 flex justify-center">

              <motion.img
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="/about/mobile-preview.png"
                alt=""
                className="w-48"
              />

            </div>

          </motion.div>

        </div>

        {/* DESKTOP */}
        <div
          className="
            hidden
            lg:block
            relative
            overflow-hidden
            rounded-[48px]
            bg-[#fdfaf6]
            border
            border-[#ece5dc]
            shadow-[0_50px_120px_rgba(0,0,0,0.10)]
            min-h-[850px]
          "
        >

          {/* Animated Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[700px]
              h-[700px]
              rounded-full
              bg-purple-300/20
              blur-[150px]
            "
          />

          {/* Wedding */}
          <motion.img
            animate={{
              y: [0, -15, 0],
              rotate: [0, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
            }}
            src="/about/wedding-frame.avif"
            alt=""
            className="
              absolute
              left-12
              top-12
              w-72
              rounded-xl
              shadow-[0_30px_80px_rgba(0,0,0,0.18)]
              z-10
            "
          />

          {/* Album */}
          <motion.img
            animate={{
              y: [0, 15, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
            }}
            src="/about/photo-album.png"
            alt=""
            className="
              absolute
              right-12
              top-12
              w-96
              rounded-xl
              shadow-[0_30px_80px_rgba(0,0,0,0.18)]
              z-10
            "
          />

          {/* Invitation */}
          <motion.img
            animate={{
              y: [0, 10, 0],
              rotate: [-8, -12, -8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
            }}
            src="/about/invitation-card.png"
            alt=""
            className="
              absolute
              left-10
              bottom-14
              w-64
              z-10
            "
          />

          {/* Phone */}
          <motion.img
            animate={{
              y: [0, -20, 0],
              rotate: [8, 10, 8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
            }}
            src="/about/mobile-preview.png"
            alt=""
            className="
              absolute
              right-8
              bottom-0
              w-56
              z-10
            "
          />

          {/* Content */}
          <div
            className="
              absolute
              inset-0
              z-30
              flex
              flex-col
              items-center
              justify-center
              px-10
            "
          >

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-purple-500
                font-semibold
              "
            >
              About Evently
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="
                mt-5
                text-7xl
                font-black
                text-[#1d2142]
              "
            >
              What is Evently?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
              className="
                mt-8
                max-w-xl
                text-center
                text-xl
                leading-[2.6rem]
                text-zinc-600
              "
            >
              Evently helps anyone create beautiful digital invitations
              without coding. Whether it is a wedding, birthday,
              graduation, corporate gathering or cultural festival,
              Evently provides stunning website templates and
              seamless Ente Photo integration for collecting
              memories.
            </motion.p>

          </div>

        </div>

      </div>
    </section>
  );
}