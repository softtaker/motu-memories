import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageLoader({
  src,
  alt,
  className = "",
  onClick,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-inherit bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100" />
      )}

      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        initial={{
          opacity: 0,
          scale: 1.05,
        }}
        animate={{
          opacity: loaded ? 1 : 0,
          scale: loaded ? 1 : 1.05,
        }}
        transition={{
          duration: 0.5,
        }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}