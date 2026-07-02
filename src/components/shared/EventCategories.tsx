"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Gem,
  Cake,
  HeartHandshake,
  Baby,
  House,
  BriefcaseBusiness,
  X,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Wedding",
    image: "/eventcategories/wedding.jpeg",
    icon: Gem,
  },
  {
    title: "Birthday",
    image: "/eventcategories/birthday.jpeg",
    icon: Cake,
  },
  {
    title: "Engagement",
    image: "/eventcategories/engagement.jpeg",
    icon: HeartHandshake,
  },
  {
    title: "Baby Shower",
    image: "/eventcategories/babyshower.jpeg",
    icon: Baby,
  },
  {
    title: "Housewarming",
    image: "/eventcategories/housewarming.jpeg",
    icon: House,
  },
  {
    title: "Corporate",
    image: "/eventcategories/corporate.jpeg",
    icon: BriefcaseBusiness,
  },
];

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

export default function EventCategories() {
  const router = useRouter(); 
  
  // Custom Popup State Management
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleCategoryClick = (title: string) => {
    if (title.toLowerCase() === "wedding") {
      router.push("/builder?type=wedding");
    } else {
      setSelectedEvent(title);
      setModalOpen(true);
    }
  };

  return (
    <section
      id="categories"
      className="
        relative
        overflow-x-hidden
        py-20
        md:py-28
        bg-gradient-to-b
        from-[#fdfaf6]
        to-[#faf7f3]
      "
    >
      
      {/* Decorative Assets */}
      <motion.img
        src="/eventcategories/flower-left.png"
        alt=""
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 md:-left-20 lg:-left-25 top-10 w-24 sm:w-36 lg:w-72 opacity-30 md:opacity-60 lg:opacity-100 pointer-events-none select-none z-0"
      />

      <motion.img
        src="/eventcategories/candle.png"
        alt=""
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 md:-right-12 lg:-right-8 top-4 w-20 sm:w-32 lg:w-72 opacity-30 md:opacity-60 lg:opacity-100 pointer-events-none select-none z-0"
      />

      <motion.img
        src="/eventcategories/leaves-right.png"
        alt=""
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-12 md:-right-20 lg:-right-25 bottom-12 w-24 sm:w-40 lg:w-72 opacity-20 md:opacity-50 lg:opacity-100 pointer-events-none select-none z-0"
      />

      <motion.img
        src="/eventcategories/ribbon-left.png"
        alt=""
        animate={{ rotate: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 md:-left-16 lg:-left-25 bottom-12 w-20 sm:w-32 lg:w-56 opacity-20 md:opacity-50 lg:opacity-100 pointer-events-none select-none z-0"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <img
            src="/eventcategories/flower-top.png"
            alt=""
            className="mx-auto w-16 sm:w-20 md:w-24 mb-4 md:mb-6 pointer-events-none select-none"
          />

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#43372f]">
            Event Categories
          </h2>

          <div className="w-20 sm:w-28 h-[2px] bg-[#c8a978] mx-auto mt-4 md:mt-5" />

          <p className="mt-4 md:mt-6 max-w-xl mx-auto text-sm sm:text-base text-zinc-500 leading-7 md:leading-8">
            Choose the perfect category for your event and create unforgettable memories.
          </p>
        </motion.div>

        {/* Cards Grid Framework */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-stretch">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeUp}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="cursor-pointer select-none active:scale-[0.98] transition-transform duration-200"
                onClick={() => handleCategoryClick(item.title)}
              >
                <Card className="h-full overflow-hidden border-0 rounded-[20px] md:rounded-[24px] bg-white shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-28 sm:h-40 lg:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />

                    {/* Icon Circle */}
                    <div className="absolute left-1/2 bottom-[-20px] sm:bottom-[-26px] -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#faf6f0] border border-[#ece4d8] shadow-sm flex items-center justify-center z-10">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#b99863]" strokeWidth={1.75} />
                    </div>
                  </div>

                  <CardContent className="pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
                    <h3 className="text-base sm:text-xl lg:text-2xl font-serif text-[#43372f]">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Elegant Custom Modal - No Browser Native Headers! */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Overlap */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Premium Announcement Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm overflow-hidden bg-[#faf8f5] border border-[#eaddcd] rounded-2xl shadow-2xl p-6 text-center z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Styled Accent Spark */}
              <div className="mx-auto w-12 h-12 rounded-full bg-[#f3ede2] flex items-center justify-center mb-4 text-[#b99863]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              {/* Headline Content */}
              <h4 className="text-xl font-serif text-[#43372f] mb-2">
                Coming Soon!
              </h4>
              <p className="text-sm text-stone-500 leading-relaxed px-2">
                We are actively polishing up the specialized dashboard tools for the <span className="font-semibold text-stone-700">{selectedEvent} Builder</span>. Stay tuned!
              </p>

              {/* Modal Confirmation Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="mt-6 w-full py-2.5 px-4 bg-[#43372f] hover:bg-[#57483e] text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}