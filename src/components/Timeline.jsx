import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

import memories from "../data/memories";

import GlassCard from "./GlassCard";
import ImageLoader from "./ImageLoader";

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-28 px-6 overflow-hidden bg-gradient-to-b from-white via-pink-50 to-rose-100"
    >
      {/* Background Glow */}

      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-pink-300/30 blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-rose-300/30 blur-[120px]" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-24 text-center text-5xl font-extrabold text-pink-600 md:text-6xl"
      >
        ❤️ Our Beautiful Journey ❤️
      </motion.h2>

      {/* Timeline Line */}

      <div className="absolute left-1/2 top-48 bottom-16 hidden w-1 -translate-x-1/2 bg-gradient-to-b from-pink-300 via-rose-400 to-pink-300 md:block" />

      <div className="relative mx-auto max-w-6xl space-y-20">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className={`flex flex-col items-center gap-10 md:flex-row ${
              index % 2 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}

            <div className="relative flex justify-center md:w-1/2">
              <motion.div
                whileHover={{
                  scale: 1.04,
                  rotate: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="w-full max-w-md"
              >
                <ImageLoader
                  src={memory.image}
                  alt={memory.title}
                  className="h-full w-full rounded-[30px] border-4 border-white object-cover shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Content */}

            <div className="relative md:w-1/2">
              <div className="absolute -left-16 top-10 hidden h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-white shadow-xl md:flex">
                <FaHeart />
              </div>

              <GlassCard className="p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 font-semibold text-pink-600">
                  <FaHeart />
                  {memory.date}
                </span>

                <h3 className="mt-6 text-3xl font-bold text-gray-800">
                  {memory.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  {memory.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-pink-500">
                  <FaHeart className="animate-pulse" />
                  Forever Together
                </div>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ending Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.2,
        }}
        className="mx-auto mt-24 max-w-3xl"
      >
        <GlassCard
          hover={false}
          className="p-10 text-center"
        >
          <FaHeart className="mx-auto mb-5 text-4xl animate-pulse text-pink-500" />

          <h3 className="text-3xl font-bold text-pink-600">
            The Journey Has Just Begun ❤️
          </h3>

          <p className="mt-5 text-lg leading-8 text-gray-700">
            Every memory we've created together is a treasure that
            will stay in my heart forever. Here's to countless more
            smiles, adventures, laughter and beautiful moments
            together.
          </p>
        </GlassCard>
      </motion.div>
    </section>
  );
}