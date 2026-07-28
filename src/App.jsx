import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import LoveLetter from "./pages/LoveLetter";
import Countdown from "./pages/Countdown";
import Welcome from "./pages/Welcome";
import Surprise from "./pages/Surprise";

import Timeline from "./components/Timeline";
import BottomNav from "./components/BottomNav";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route
          path="/timeline"
          element={<Timeline />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/letter"
          element={<LoveLetter />}
        />

        <Route
          path="/countdown"
          element={<Countdown />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/surprise"
          element={<Surprise />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <Welcome
        onStart={() => setStarted(true)}
      />
    );
  }

  return (
    <>
      <ScrollToTop />

      <AnimatedRoutes />

      <BottomNav />
    </>
  );
}