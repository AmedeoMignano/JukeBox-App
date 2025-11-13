import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const guestSession = JSON.parse(localStorage.getItem("guestSession"));
  // console.log(guestSession);
  return (
    <nav className="nav-bar">
      <div className="flex items-center">
        <img src="/src/assets/img/logo-nav.png" alt="logo" className="w-38" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link
          className={
            location.pathname === `/guest/event/${guestSession.accessCode}`
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to={`/guest/event/${guestSession.accessCode}`}
        >
          Jukebox
        </Link>
        <Link
          className={
            location.pathname === "/about"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/about"
        >
          About
        </Link>
        <Link
          className={
            location.pathname === "/contact"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/contact"
        >
          Contact
        </Link>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden cursor-pointer"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[80px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link
          className={
            location.pathname === `/guest/event/${guestSession.accessCode}`
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to={`/guest/event/${guestSession.accessCode}`}
        >
          Jukebox
        </Link>
        <Link
          className={
            location.pathname === "/about"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/about"
        >
          About
        </Link>
        <Link
          className={
            location.pathname === "/contact"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/contact"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
