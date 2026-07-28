import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FaHeart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import gallery from "../data/gallery";

import PageWrapper from "../components/PageWrapper";
import GlassCard from "../components/GlassCard";
import ImageLoader from "../components/ImageLoader";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedImage =
    selectedIndex !== null ? gallery[selectedIndex] : null;

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + gallery.length) % gallery.length
    );
  };

  return (
    <PageWrapper className="bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 px-6 py-16">

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold text-center text-pink-600"
      >
        Our Beautiful Memories ❤️
      </motion.h1>

      <p className="text-center text-gray-600 text-lg mt-4 mb-14">
        Every picture tells a beautiful story of us.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {gallery.map((item, index) => (
          <GlassCard
            key={item.id}
            className="cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <div className="overflow-hidden">

              <ImageLoader
                src={item.image}
                alt={item.title}
                className="h-72 w-full transition-transform duration-500 hover:scale-110"
              />

            </div>

            <div className="p-6">

              <div className="flex items-center gap-2 text-pink-500 mb-3">

                <FaHeart />

                <span className="font-semibold text-sm">
                  Beautiful Memory
                </span>

              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                {item.title}
              </h2>

            </div>

          </GlassCard>
        ))}

      </div>

      <AnimatePresence>

        {selectedImage && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              <FaTimes />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-5 md:left-10 text-white text-4xl"
            >
              <FaChevronLeft />
            </button>

            <motion.img
              key={selectedImage.id}
              src={selectedImage.image}
              alt={selectedImage.title}
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="max-h-[82vh] max-w-[90vw] rounded-[32px] shadow-2xl"
            />

            <button
              onClick={nextImage}
              className="absolute right-5 md:right-10 text-white text-4xl"
            >
              <FaChevronRight />
            </button>

            <GlassCard
              hover={false}
              className="absolute bottom-8 px-8 py-5 text-center"
            >

              <h2 className="text-2xl font-bold text-gray-800">
                {selectedImage.title}
              </h2>

              <p className="mt-2 text-pink-600 font-semibold">
                {selectedIndex + 1} / {gallery.length}
              </p>

            </GlassCard>

          </motion.div>

        )}

      </AnimatePresence>

    </PageWrapper>
  );
}