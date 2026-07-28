import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaEnvelope,
  FaBirthdayCake,
  FaCog,
} from "react-icons/fa";

export default function BottomNav() {
  const navClass = ({ isActive }) =>
    `flex flex-col items-center text-xs transition-all duration-300 ${
      isActive
        ? "text-pink-600 scale-110"
        : "text-gray-500 hover:text-pink-500"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t shadow-2xl z-50">
      <div className="max-w-3xl mx-auto flex justify-around py-3">

        <NavLink to="/" className={navClass}>
          <FaHome size={22} />
          <span className="mt-1">Home</span>
        </NavLink>

        <NavLink to="/gallery" className={navClass}>
          <FaImages size={22} />
          <span className="mt-1">Gallery</span>
        </NavLink>

        <NavLink to="/letter" className={navClass}>
          <FaEnvelope size={22} />
          <span className="mt-1">Letter</span>
        </NavLink>

        <NavLink to="/countdown" className={navClass}>
          <FaBirthdayCake size={22} />
          <span className="mt-1">Countdown</span>
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          <FaCog size={22} />
          <span className="mt-1">Settings</span>
        </NavLink>

      </div>
    </nav>
  );
}