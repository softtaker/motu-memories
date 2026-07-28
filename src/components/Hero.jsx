import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaChevronDown,
  FaPlay,
  FaPause,
  FaMusic,
} from "react-icons/fa";

export default function Hero({ settings }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (settings?.music && audioRef.current) {
      audioRef.current.src = settings.music;

      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, [settings]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const scrollDown = () => {
    document
      .getElementById("timeline")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">

      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300" />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-400 blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-rose-400 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-6xl w-full rounded-[40px] border border-white/40 bg-white/30 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,.18)] p-8 md:p-12"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="flex justify-center">

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-pink-400 blur-3xl opacity-40 scale-110"></div>

              <img
                src={settings.heroImage || "/images/hero.jpg"}
                alt="Hero"
                className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-[10px] border-white shadow-2xl"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
                className="absolute -inset-5 rounded-full border-2 border-dashed border-pink-300"
              />
            </motion.div>

          </div>

          <div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              <FaHeart />
              Made With Love
            </motion.span>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .2 }}
              className="mt-6 text-5xl md:text-6xl font-extrabold text-pink-700 leading-tight"
            >
              {settings.greeting}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5 }}
              className="mt-8 text-lg md:text-xl text-gray-700 leading-9"
            >
              Every smile of yours makes my world brighter.
              Every memory with you is priceless.
              This little surprise is made with lots of love ❤️
            </motion.p>
                        <div className="mt-10 grid grid-cols-2 gap-4">

              <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
                <p className="text-gray-500 text-sm">Forever</p>
                <h3 className="text-2xl font-bold text-pink-600">
                  Together ❤️
                </h3>
              </div>

              <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
                <p className="text-gray-500 text-sm">Promise</p>
                <h3 className="text-2xl font-bold text-pink-600">
                  Always & Forever
                </h3>
              </div>

            </div>

            <div className="flex flex-wrap gap-4 mt-10">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: .95 }}
                onClick={scrollDown}
                className="bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl"
              >
                <FaHeart />
                Begin Our Journey
              </motion.button>

              {settings.music && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: .95 }}
                  onClick={toggleMusic}
                  className="bg-white text-pink-600 px-8 py-4 rounded-full shadow-xl flex items-center gap-3 font-semibold"
                >
                  <FaMusic />

                  {playing ? (
                    <>
                      <FaPause />
                      Pause Music
                    </>
                  ) : (
                    <>
                      <FaPlay />
                      Play Music
                    </>
                  )}
                </motion.button>
              )}

            </div>

          </div>

        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
        }}
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-pink-600"
      >
        <FaChevronDown
          size={36}
          className="drop-shadow-lg"
        />
      </motion.div>

      <audio ref={audioRef} hidden />
    </section>
  );
}