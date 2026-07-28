import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart, FaEnvelopeOpenText } from "react-icons/fa";

export default function LoveLetter() {
  const [letter, setLetter] = useState(
    "You are the most beautiful part of my life. ❤️"
  );

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("motuSettings");

    if (!data) return;

    try {
      const settings = JSON.parse(data);

      if (settings.letter && settings.letter.trim() !== "") {
        setLetter(settings.letter);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center px-6 py-20">

      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300/30 blur-[140px] rounded-full"></div>

      {!opened ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setOpened(true)}
            className="cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 rounded-[40px] p-14 shadow-2xl text-white"
          >
            <FaEnvelopeOpenText className="text-7xl mx-auto mb-6" />

            <h1 className="text-4xl font-bold">
              A Letter For You ❤️
            </h1>

            <p className="mt-5 text-lg text-white/90">
              Tap to Open
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative z-10 max-w-4xl w-full"
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white overflow-hidden">

            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-center text-white">

              <FaHeart className="mx-auto text-4xl animate-pulse mb-4" />

              <h1 className="text-5xl font-bold">
                My Letter To You
              </h1>

              <p className="mt-3 text-white/90">
                Written with all my love ❤️
              </p>

            </div>

            <div className="p-10 md:p-14">

              <p className="text-xl leading-10 text-gray-700 whitespace-pre-wrap">
                {letter}
              </p>

              <div className="mt-14 border-t border-pink-100 pt-10">

                <p className="text-gray-500 italic text-lg">
                  Thank you for making every single day brighter,
                  happier and more meaningful.
                </p>

                <div className="mt-10 text-right">

                  <div className="text-4xl text-pink-500">
                    ❤️
                  </div>

                  <h2 className="text-3xl font-bold text-pink-600 mt-2">
                    Forever Yours
                  </h2>

                </div>

              </div>

            </div>

          </div>
        </motion.div>
      )}
    </div>
  );
}