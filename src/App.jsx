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
import LockScreen from "./pages/LockScreen";

import Timeline from "./components/Timeline";
import MusicPlayer from "./components/MusicPlayer";
import BottomNav from "./components/BottomNav";

import { AuthProvider, useAuth } from "./context/AuthContext";

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

function AppContent() {
  const [started, setStarted] = useState(false);
  const { authenticated } = useAuth();

  // ===== DEBUG =====
  console.log("========== APP STATE ==========");
  console.log("Started:", started);
  console.log("Authenticated:", authenticated);
  console.log(
    "motuAuth:",
    localStorage.getItem("motuAuth")
  );
  console.log(
    "motuSettings:",
    localStorage.getItem("motuSettings")
  );
  console.log("===============================");
  // =================

  if (!started) {
    return (
      <Welcome
        onStart={() => {
          console.log("Tap To Begin Clicked");
          setStarted(true);
        }}
      />
    );
  }

  if (!authenticated) {
    console.log("Showing LockScreen");
    return <LockScreen />;
  }

  console.log("Showing Main App");

  return (
    <>
      <ScrollToTop />

      <AnimatedRoutes />

      <MusicPlayer />

      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}