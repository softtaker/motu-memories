import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaImages,
  FaEnvelopeOpenText,
  FaBirthdayCake,
  FaHeart,
  FaGift,
} from "react-icons/fa";

import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import FloatingHearts from "../components/FloatingHearts";
import Header from "../components/Header";

import PageWrapper from "../components/PageWrapper";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

export default function Home() {
  const [settings, setSettings] = useState({
    greeting: "Welcome Motu ❤️",
    heroImage: "/images/hero.jpg",
    music: "",
    birthday: "",
    letter:
      "Every moment with you becomes my favourite memory. ❤️",
  });

  useEffect(() => {
    const saved = localStorage.getItem("motuSettings");

    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const countdown = useMemo(() => {
    if (!settings.birthday)
      return {
        text: "Set birthday in Settings ❤️",
      };

    const today = new Date();
    const birth = new Date(settings.birthday);

    const next = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (next < today) {
      next.setFullYear(today.getFullYear() + 1);
    }

    const diff = next - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      text: `${days} Days Left ❤️`,
    };
  }, [settings.birthday]);

  return (
    <PageWrapper className="bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 pb-28">

      <FloatingHearts />

      <Header />

      <Hero settings={settings} />

      <motion.section
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="max-w-6xl mx-auto px-5 mt-8"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link to="/gallery">
            <GlassCard className="p-7 text-center h-full">

              <FaImages className="mx-auto text-pink-500 text-5xl mb-5" />

              <h2 className="text-2xl font-bold text-gray-800">
                Gallery
              </h2>

              <p className="mt-3 text-gray-600">
                Relive every beautiful memory together.
              </p>

            </GlassCard>
          </Link>

          <Link to="/countdown">
            <GlassCard className="p-7 text-center h-full">

              <FaBirthdayCake className="mx-auto text-rose-500 text-5xl mb-5" />

              <h2 className="text-2xl font-bold text-gray-800">
                Countdown
              </h2>

              <p className="mt-3 text-pink-600 font-semibold">
                {countdown.text}
              </p>

            </GlassCard>
          </Link>

          <Link to="/letter">
            <GlassCard className="p-7 text-center h-full">

              <FaEnvelopeOpenText className="mx-auto text-red-400 text-5xl mb-5" />

              <h2 className="text-2xl font-bold text-gray-800">
                Love Letter
              </h2>

              <p className="mt-3 text-gray-600 line-clamp-3">
                {settings.letter}
              </p>

            </GlassCard>
          </Link>

          <Link to="/surprise">
            <GlassCard className="p-7 text-center h-full">

              <FaGift className="mx-auto text-yellow-500 text-5xl mb-5" />

              <h2 className="text-2xl font-bold text-gray-800">
                Surprise
              </h2>

              <p className="mt-3 text-gray-600">
                Open your special birthday surprise.
              </p>

            </GlassCard>
          </Link>

        </div>
      </motion.section>

      <motion.section
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="max-w-5xl mx-auto px-5 mt-12"
      >
        <GlassCard className="p-10 text-center">

          <FaHeart className="mx-auto text-pink-500 text-5xl mb-5 animate-pulse" />

          <h2 className="text-4xl font-bold text-pink-600">
            Every Moment With You Is A Treasure ❤️
          </h2>

          <p className="mt-6 text-gray-700 leading-8 text-lg">
            Thank you for filling my life with happiness,
            laughter, love and unforgettable memories.
            This little app is just one small way of saying
            how much you mean to me.
          </p>

          <div className="mt-8">
            <Link to="/surprise">
              <PrimaryButton>
                🎁 Open Special Surprise
              </PrimaryButton>
            </Link>
          </div>

        </GlassCard>
      </motion.section>

      <div className="mt-14">
        <Timeline />
      </div>

    </PageWrapper>
  );
}