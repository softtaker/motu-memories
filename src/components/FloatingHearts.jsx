import { motion } from "framer-motion";

const hearts = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 12 + Math.random() * 28,
  duration: 8 + Math.random() * 8,
  delay: Math.random() * 6,
}));

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "110vh",
            opacity: 0,
            x: 0,
            rotate: 0,
          }}
          animate={{
            y: "-15vh",
            opacity: [0, 1, 1, 0],
            x: [0, -20, 20, -15, 0],
            rotate: [0, 20, -20, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            position: "absolute",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}