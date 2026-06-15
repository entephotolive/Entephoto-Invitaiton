"use client";

import { motion } from "framer-motion";
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
  return (
    <section
      id="categories"
      className="
        relative
        overflow-hidden
        py-28
        bg-gradient-to-b
        from-[#fdfaf6]
        to-[#faf7f3]
      "
    >
      
      {/* Decorations */}

      <motion.img
  src="/eventcategories/flower-left.png"
  alt=""
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 8,
    repeat: Infinity,
  }}
  className="
  absolute
-left-25
top-10
w-20
sm:w-28
lg:w-72
opacity-60
lg:opacity-100"
/>

      <motion.img
  src="/eventcategories/candle.png"
  alt=""
  animate={{ y: [0, -8, 0] }}
  transition={{
    duration: 6,
    repeat: Infinity,
  }}
  className="
   absolute
-right-8
top-4
w-20
sm:w-28
lg:w-72
opacity-60
lg:opacity-100
  "
/>

      <motion.img
  src="/eventcategories/leaves-right.png"
  alt=""
  animate={{ y: [0, 10, 0] }}
  transition={{
    duration: 7,
    repeat: Infinity,
  }}
  className="
    absolute
-right-25
bottom-12
w-20
sm:w-28
lg:w-72
opacity-60
lg:opacity-100
  "
/>

      <motion.img
  src="/eventcategories/ribbon-left.png"
  alt=""
  animate={{ rotate: [0, -3, 0] }}
  transition={{
    duration: 8,
    repeat: Infinity,
  }}
  className="
    absolute
-left-25
bottom-12
w-16
sm:w-24
lg:w-56
opacity-60
lg:opacity-100
  "
/>

      <div className="max-w-7xl mx-auto px-6">

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
            className="mx-auto w-24 mb-6"
          />

          <h2
            className="
              text-5xl
              md:text-6xl
              font-serif
              text-[#43372f]
            "
          >
            Event Categories
          </h2>

          <div className="w-28 h-[2px] bg-[#c8a978] mx-auto mt-5" />

          <p
            className="
              mt-6
              max-w-xl
              mx-auto
              text-zinc-500
              leading-8
            "
          >
            Choose the perfect category for your event
            and create unforgettable memories.
          </p>
        </motion.div>

        {/* Cards */}

        <div
          className="
            mt-16
            grid
            grid-cols-2
            lg:grid-cols-3
            gap-4
            lg:gap-8
            items-stretch
          "
        >
   {categories.map((item, index) => {
  const Icon = item.icon;

  return (
    <motion.div
    className="cursor-pointer"
      key={item.title}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={fadeUp}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
      }}
      whileHover={{
        y: -10,
      }}
    >
      <Card
      onClick={() =>
    router.push(
      `/builder?type=${item.title.toLowerCase().replace(" ", "")}`
    )
  }
        className="
        cursor-pointer
          h-full
          overflow-hidden
          border-0
          rounded-[24px]
          bg-white
          shadow-lg
          hover:shadow-2xl
          transition-all
        "
      >
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="
              h-32
              sm:h-40
              lg:h-52
              w-full
              object-cover
            "
          />

          {/* Icon Circle */}
          <div
            className="
              absolute
              left-1/2
              bottom-[-26px]
              -translate-x-1/2
              w-14
              h-14
              rounded-full
              bg-[#faf6f0]
              border
              border-[#ece4d8]
              shadow-lg
              flex
              items-center
              justify-center
            "
          >
            <Icon
              className="
                w-7
                h-7
                text-[#b99863]
              "
              strokeWidth={1.75}
            />
          </div>
        </div>

        <CardContent className="pt-10 pb-8 text-center">
          <h3
            className="
               text-lg
    sm:text-xl
    lg:text-2xl
    font-serif
    text-[#43372f]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-zinc-500
            "
          >
           
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
})}
        </div>
        
  

      </div>
    </section>
  );
}