import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
}) {
  const { theme } = useTheme();

  const borderColors = {
    pink: "border-pink-200/60",
    rose: "border-rose-200/60",
    purple: "border-purple-200/60",
    gold: "border-yellow-200/60",
  };

  const shadowColors = {
    pink: "shadow-pink-200/40",
    rose: "shadow-rose-200/40",
    purple: "shadow-purple-200/40",
    gold: "shadow-yellow-200/40",
  };

  const hoverGlow = {
    pink: "hover:shadow-pink-300/50",
    rose: "hover:shadow-rose-300/50",
    purple: "hover:shadow-purple-300/50",
    gold: "hover:shadow-yellow-300/50",
  };

  const borderClass = borderColors[theme] || borderColors.pink;
  const shadowClass = shadowColors[theme] || shadowColors.pink;
  const hoverClass = hoverGlow[theme] || hoverGlow.pink;

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.02,
            }
          : {}
      }
      whileTap={
        hover
          ? {
              scale: 0.99,
            }
          : {}
      }
      transition={{
        duration: 0.25,
      }}
      className={`
        bg-white/40
        backdrop-blur-xl
        border
        ${borderClass}
        rounded-[32px]
        shadow-2xl
        ${shadowClass}
        ${hoverClass}
        overflow-hidden
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}