import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function PageWrapper({
  children,
  className = "",
}) {
  const { colors, theme } = useTheme();

  const glowColors = {
    pink: {
      top: "bg-pink-300/25",
      bottom: "bg-rose-300/25",
      center: "bg-pink-200/20",
    },
    rose: {
      top: "bg-rose-300/25",
      bottom: "bg-red-300/25",
      center: "bg-rose-200/20",
    },
    purple: {
      top: "bg-purple-300/25",
      bottom: "bg-fuchsia-300/25",
      center: "bg-purple-200/20",
    },
    gold: {
      top: "bg-yellow-300/25",
      bottom: "bg-amber-300/25",
      center: "bg-yellow-200/20",
    },
  };

  const glow = glowColors[theme] || glowColors.pink;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${colors.background} ${className}`}
    >
      {/* Top Glow */}
      <div
        className={`absolute -top-40 -left-40 h-96 w-96 rounded-full ${glow.top} blur-[140px]`}
      />

      {/* Bottom Glow */}
      <div
        className={`absolute -bottom-40 -right-40 h-96 w-96 rounded-full ${glow.bottom} blur-[140px]`}
      />

      {/* Center Glow */}
      <div
        className={`absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full ${glow.center} blur-[120px]`}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}