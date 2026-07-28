import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function Welcome({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-200 to-pink-100 flex items-center justify-center overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Floating Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500"
          initial={{
            y: 500,
            x: Math.random() * window.innerWidth,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: -200,
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 3,
          }}
        >
          <FaHeart size={18 + Math.random() * 20} />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-6xl font-bold text-pink-700"
        >
          ❤️ Welcome Motu ❤️
        </motion.h1>

        <p className="mt-6 text-2xl text-gray-700">
          I made something special just for you...
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onStart}
          className="mt-12 bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full text-xl shadow-2xl"
        >
          Tap to Begin 💖
        </motion.button>
      </motion.div>
    </div>
  );
}