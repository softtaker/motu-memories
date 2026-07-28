import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBirthdayCake, FaHeart } from "react-icons/fa";

export default function Countdown() {
  const [birthday, setBirthday] = useState("");
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("motuSettings");

    if (saved) {
      try {
        const settings = JSON.parse(saved);
        if (settings.birthday) {
          setBirthday(settings.birthday);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (!birthday) return;

    const updateCountdown = () => {
      const now = new Date();

      const birth = new Date(birthday);

      const nextBirthday = new Date(
        now.getFullYear(),
        birth.getMonth(),
        birth.getDate(),
        0,
        0,
        0
      );

      if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      const diff = nextBirthday - now;

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [birthday]);

  const Card = ({ value, label }) => (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.05,
      }}
      className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-7 w-36"
    >
      <h2 className="text-5xl font-extrabold text-pink-600 text-center">
        {value}
      </h2>

      <p className="text-center mt-4 text-gray-600 font-semibold">
        {label}
      </p>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center px-6 py-20">

      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300/30 blur-[140px] rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 max-w-5xl w-full bg-white/30 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white p-10"
      >
        <div className="text-center">

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <FaBirthdayCake className="mx-auto text-pink-600 text-6xl" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-pink-700 mt-6">
            Birthday Countdown ❤️
          </h1>

          <p className="mt-5 text-lg text-gray-700 max-w-2xl mx-auto leading-8">
            Every passing second brings us one step closer to another
            beautiful celebration together.
          </p>

        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-14">

          <Card value={time.days} label="Days" />
          <Card value={time.hours} label="Hours" />
          <Card value={time.minutes} label="Minutes" />
          <Card value={time.seconds} label="Seconds" />

        </div>

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-center text-white shadow-xl"
        >
          <FaHeart className="mx-auto text-4xl mb-4 animate-pulse" />

          <h2 className="text-3xl font-bold">
            Can't Wait To Celebrate With You ❤️
          </h2>

          <p className="mt-4 text-white/90 text-lg leading-8">
            Until then, let's continue making unforgettable memories,
            laughing together, and filling every day with love.
          </p>
        </motion.div>

        {!birthday && (
          <div className="mt-10 text-center text-pink-700 font-semibold">
            Please set the birthday from <b>Settings</b>.
          </div>
        )}
      </motion.div>
    </div>
  );
}