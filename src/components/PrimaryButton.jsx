import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) {
  const { colors } = useTheme();

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.04,
              y: -2,
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.97,
            }
      }
      transition={{
        duration: 0.2,
      }}
      className={`
        px-8
        py-4
        rounded-full
        font-semibold
        text-white
        bg-gradient-to-r
        ${colors.primary}
        shadow-xl
        hover:shadow-pink-300/50
        transition-all
        duration-300
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}