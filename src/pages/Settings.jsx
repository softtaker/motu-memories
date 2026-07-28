import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaImage,
  FaMusic,
  FaSave,
  FaHeart,
  FaCalendarAlt,
  FaCheckCircle,
  FaPlay,
  FaPause,
  FaPalette,
  FaLock,
} from "react-icons/fa";

import PageWrapper from "../components/PageWrapper";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

export default function Settings() {
  const audioRef = useRef(null);

  const [settings, setSettings] = useState({
    greeting: "Welcome Motu ❤️",
    heroImage: "/images/hero.jpg",
    music: "",
    birthday: "",
    letter: "",
    theme: "pink",

    // NEW
    secretQuestion:
      "What nickname do I always call you?",
    secretAnswer: "Motu",
    rememberLogin: true,
  });

  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicName, setMusicName] = useState("");

  useEffect(() => {
    try {
      const data = localStorage.getItem("motuSettings");

      if (data) {
        const parsed = JSON.parse(data);

        setSettings((prev) => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const update = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const imageChanged = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      update("heroImage", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const musicChanged = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMusicName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      update("music", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const toggleMusic = () => {
    if (!settings.music) return;

    if (!audioRef.current.src) {
      audioRef.current.src = settings.music;
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const save = () => {
    try {
      localStorage.setItem(
        "motuSettings",
        JSON.stringify(settings)
      );

      // For LockScreen compatibility
      localStorage.setItem(
        "motuQuestion",
        settings.secretQuestion
      );

      localStorage.setItem(
        "motuAnswer",
        settings.secretAnswer
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Unable to save settings.");
    }
  };

  return (
    <PageWrapper className="bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 py-12 px-6">

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-6 right-6 z-50"
          >
            <GlassCard
              hover={false}
              className="flex items-center gap-3 px-6 py-4 bg-green-500/90 text-white"
            >
              <FaCheckCircle size={22} />
              <span className="font-semibold">
                Settings Saved Successfully ❤️
              </span>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassCard className="max-w-5xl mx-auto p-8 md:p-10">

        <h1 className="text-5xl font-bold text-pink-600 mb-10">
          ⚙️ Settings
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          <div>

            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaHeart />
              Greeting
            </label>

            <input
              className="w-full rounded-2xl border border-pink-200 bg-white/70 p-4 mb-8 outline-none focus:ring-2 focus:ring-pink-300"
              value={settings.greeting}
              onChange={(e) =>
                update("greeting", e.target.value)
              }
            />

            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaCalendarAlt />
              Birthday
            </label>

            <input
              type="date"
              className="w-full rounded-2xl border border-pink-200 bg-white/70 p-4 mb-8 outline-none focus:ring-2 focus:ring-pink-300"
              value={settings.birthday}
              onChange={(e) =>
                update("birthday", e.target.value)
              }
            />

            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaImage />
              Hero Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={imageChanged}
              className="mb-4"
            />

            <img
              src={settings.heroImage}
              alt="Hero Preview"
              className="w-48 h-48 rounded-3xl object-cover shadow-xl mb-8"
            />

            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaMusic />
              Background Music
            </label>

            <input
              type="file"
              accept="audio/*"
              onChange={musicChanged}
              className="mb-4"
            />

            {musicName && (
              <p className="text-sm text-gray-600 mb-4">
                Selected: {musicName}
              </p>
            )}

            {settings.music && (
              <PrimaryButton
                onClick={toggleMusic}
                className="mb-8"
              >
                {playing ? (
                  <>
                    <FaPause className="mr-2" />
                    Pause Music
                  </>
                ) : (
                  <>
                    <FaPlay className="mr-2" />
                    Preview Music
                  </>
                )}
              </PrimaryButton>
            )}

          </div>

          <div>

            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaPalette />
              Theme
            </label>

            <select
              value={settings.theme}
              onChange={(e) =>
                update("theme", e.target.value)
              }
              className="w-full rounded-2xl border border-pink-200 bg-white/70 p-4 mb-8"
            >
              <option value="pink">Pink</option>
              <option value="rose">Rose</option>
              <option value="purple">Purple</option>
              <option value="gold">Golden</option>
            </select>

            {/* PART 2 STARTS HERE */}
                        <GlassCard
              hover={false}
              className="p-6 mb-8 border-2 border-pink-200"
            >
              <h3 className="text-2xl font-bold text-pink-600 flex items-center gap-2 mb-6">
                <FaLock />
                App Security
              </h3>

              <label className="font-semibold mb-2 block">
                Secret Question
              </label>

              <input
                value={settings.secretQuestion}
                onChange={(e) =>
                  update(
                    "secretQuestion",
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-pink-200 bg-white/70 p-4 mb-6 outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="What nickname do I always call you?"
              />

              <label className="font-semibold mb-2 block">
                Secret Answer
              </label>

              <input
                value={settings.secretAnswer}
                onChange={(e) =>
                  update(
                    "secretAnswer",
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-pink-200 bg-white/70 p-4 mb-6 outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Motu"
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.rememberLogin}
                  onChange={(e) =>
                    update(
                      "rememberLogin",
                      e.target.checked
                    )
                  }
                />

                <span>
                  Remember login for 30 days
                </span>
              </label>
            </GlassCard>

            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaHeart />
              Love Letter ❤️
            </label>

            <textarea
              rows="10"
              value={settings.letter}
              onChange={(e) =>
                update("letter", e.target.value)
              }
              placeholder="Write your beautiful message here..."
              className="w-full rounded-2xl border border-pink-200 bg-white/70 p-5 outline-none resize-none focus:ring-2 focus:ring-pink-300"
            />

            <div className="flex justify-between items-center mt-2 mb-8">
              <span className="text-sm text-gray-500">
                This message will appear in the Love Letter page.
              </span>

              <span className="text-sm font-semibold text-pink-600">
                {settings.letter.length} Characters
              </span>
            </div>

            <GlassCard
              hover={false}
              className="p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-3">
                Live Preview ❤️
              </h3>

              <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                {settings.letter ||
                  "Your love letter preview will appear here... ❤️"}
              </p>
            </GlassCard>

            <PrimaryButton
              onClick={save}
              className="w-full justify-center text-lg py-4"
            >
              <FaSave className="mr-2" />
              Save Settings
            </PrimaryButton>

          </div>

        </div>

      </GlassCard>

      <audio
        ref={audioRef}
        hidden
        onEnded={() => setPlaying(false)}
      />

    </PageWrapper>
  );
}