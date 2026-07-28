import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Lock } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

export default function LockScreen() {
  const { login } = useAuth();

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const savedSettings = JSON.parse(
    localStorage.getItem("motuSettings") || "{}"
  );

  const question =
    savedSettings.secretQuestion ||
    "What nickname do I always call you?";

  const correctAnswer = (
    savedSettings.secretAnswer || "Nonu"
  )
    .trim()
    .toLowerCase();

  const remember =
    savedSettings.rememberLogin ?? true;

  const unlock = () => {
    if (
      answer.trim().toLowerCase() ===
      correctAnswer
    ) {
      login(remember);
      return;
    }

    setError(true);

    setTimeout(() => {
      setError(false);
    }, 600);
  };

  return (
    <PageWrapper className="flex items-center justify-center min-h-screen p-6">

      <motion.div
        className="absolute top-12 left-12 text-pink-400"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
      >
        <Heart size={28} fill="currentColor" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-12 text-rose-400"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
      >
        <Heart size={24} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={
          error
            ? {
                x: [-10, 10, -10, 10, 0],
              }
            : {}
        }
      >
        <GlassCard className="max-w-md w-full text-center p-8">

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="flex justify-center mb-5"
          >
            <Lock
              size={56}
              className="text-pink-500"
            />
          </motion.div>

          <h1 className="text-3xl font-bold mb-2">
            ❤️ Welcome My Motu ❤️
          </h1>

          <p className="opacity-80 mb-8">
            Only one special person can enter this
            little world...
          </p>

          <div className="text-left mb-3 font-semibold">
            💌 One Last Question
          </div>

          <div className="mb-6 text-lg">
            {question}
          </div>

          <input
            type="text"
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") unlock();
            }}
            placeholder="Type your answer..."
            className="w-full rounded-xl border border-pink-300 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
          />

          {error && (
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="text-red-500 mt-4"
            >
              🥺 Oops... Only my Motu knows the answer ❤️
            </motion.p>
          )}

          <div className="mt-8">
            <PrimaryButton
              className="w-full"
              onClick={unlock}
            >
              ❤️ Unlock Our Memories ❤️
            </PrimaryButton>
          </div>
        </GlassCard>
      </motion.div>

    </PageWrapper>
  );
}