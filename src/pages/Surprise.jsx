import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaGift,
  FaBirthdayCake,
  FaStar,
} from "react-icons/fa";
import gallery from "../data/gallery";

export default function Surprise() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (gallery.length <= 1) return;

    const slider = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(slider);
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 5,
      size: 12 + Math.random() * 22,
    }));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-pink-300/30 blur-[140px]" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-rose-300/30 blur-[140px]" />

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "110vh",
            opacity: 0,
          }}
          animate={{
            y: "-20vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size,
          }}
          className="absolute text-pink-400"
        >
          ❤️
        </motion.div>
      ))}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-full max-w-5xl overflow-hidden rounded-[40px] border border-white/70 bg-white/40 shadow-2xl backdrop-blur-xl"
        >

          {/* Header */}

          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-10 text-center text-white">

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 6, -6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
            >
              <FaGift className="mx-auto text-6xl" />
            </motion.div>

            <h1 className="mt-6 text-5xl font-extrabold">
              A Special Surprise ❤️
            </h1>

            <p className="mt-4 text-lg text-white/90">
              Made with all my love, just for you.
            </p>

          </div>

          {/* Image */}

          {gallery.length > 0 && (
            <div className="p-8">

              <motion.img
                key={currentImage}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                }}
                src={gallery[currentImage].image}
                alt={gallery[currentImage].title}
                className="h-[420px] w-full rounded-3xl object-cover shadow-xl"
              />

              <h2 className="mt-6 text-center text-2xl font-bold text-pink-600">
                {gallery[currentImage].title}
              </h2>

            </div>
          )}

          {/* Message */}

          {showMessage && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="px-10 pb-12"
            >

              <div className="rounded-[30px] bg-gradient-to-r from-pink-500 to-rose-500 p-10 text-center text-white shadow-xl">

                <FaBirthdayCake className="mx-auto mb-6 text-5xl" />

                <h2 className="text-4xl font-bold">
                  Happy Birthday, My Love ❤️
                </h2>

                <p className="mt-8 text-lg leading-9 text-white/95">

                  Thank you for coming into my life.

                  <br />
                  <br />

                  Every smile of yours makes my world brighter.

                  <br />
                  <br />

                  Every moment with you becomes a memory I'll cherish forever.

                  <br />
                  <br />

                  I don't know what the future holds,
                  but I know one thing...

                  <br />
                  <br />

                  I want every chapter of my life to have you in it.

                </p>

              </div>

            </motion.div>
          )}

          {/* Quote */}

          <div className="px-10 pb-12">

            <div className="rounded-[30px] border border-pink-200 bg-white/60 p-8 text-center backdrop-blur">

              <FaStar className="mx-auto mb-5 text-4xl text-yellow-500" />

              <h3 className="text-3xl font-bold text-pink-600">
                My Promise
              </h3>

              <p className="mt-6 text-lg leading-9 text-gray-700">

                No matter how many birthdays we celebrate,

                <br />
                <br />

                I'll always choose you.

                <br />

                Again.

                <br />

                Again.

                <br />

                And Forever.

              </p>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="mt-8 flex justify-center"
              >
                <FaHeart className="text-5xl text-pink-500" />
              </motion.div>

              <h4 className="mt-6 text-3xl font-bold text-pink-600">
                ❤️ Forever Yours ❤️
              </h4>

            </div>

          </div>

        </motion.div>

      </div>
    </div>
  );
}