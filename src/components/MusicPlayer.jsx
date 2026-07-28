import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaMusic,
  FaRedo,
} from "react-icons/fa";

import GlassCard from "./GlassCard";

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [music, setMusic] = useState("");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loop, setLoop] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("motuSettings");

    if (!data) return;

    try {
      const settings = JSON.parse(data);

      if (settings.music) {
        setMusic(settings.music);
        setVisible(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.loop = loop;
  }, [loop]);

  const toggleMusic = async () => {
    if (!audioRef.current || !music) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!visible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={music}
        onEnded={() => setPlaying(false)}
      />

      <AnimatePresence>

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 80,
          }}
          transition={{
            duration: 0.4,
          }}
          className="fixed bottom-24 right-6 z-50"
        >
          <GlassCard
            hover={false}
            className="w-80 p-5"
          >
            <div className="flex items-center gap-4">

              <motion.div
                animate={
                  playing
                    ? {
                        rotate: 360,
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "linear",
                }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-xl shadow-lg"
              >
                <FaMusic />
              </motion.div>

              <div className="flex-1">

                <h3 className="font-bold text-gray-800">
                  Background Music
                </h3>

                <p className="text-sm text-gray-500">
                  Playing your special song ❤️
                </p>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <button
                onClick={toggleMusic}
                className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-105 transition"
              >
                {playing ? <FaPause /> : <FaPlay />}
              </button>

              <div className="flex items-center gap-2">

                <FaVolumeUp className="text-pink-500" />

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) =>
                    setVolume(Number(e.target.value))
                  }
                  className="w-28 accent-pink-500"
                />

              </div>

              <button
                onClick={() => setLoop(!loop)}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                  loop
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FaRedo />
              </button>

            </div>

          </GlassCard>

        </motion.div>

      </AnimatePresence>
    </>
  );
}