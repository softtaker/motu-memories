import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="py-10 text-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="flex justify-center"
      >
        <FaHeart className="text-pink-600 text-5xl drop-shadow-lg" />
      </motion.div>

      <h1 className="mt-4 text-5xl md:text-6xl font-extrabold text-pink-700">

        Motu Memories

      </h1>

      <p className="mt-4 text-lg text-gray-600">

        Every Moment With You Is My Favourite Memory ❤️

      </p>
    </motion.header>
  );
}