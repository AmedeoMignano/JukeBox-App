import React from "react";
import { logout } from "../services/authservice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handlelogOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="nav-bar">
      <div className="flex items-center">
        <img src="./src/assets/img/logo-nav.png" alt="logo" className="w-38" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link
          className={
            location.pathname === "/"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/"
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/eventi"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/events"
        >
          Eventi
        </Link>
        <Link
          className={
            location.pathname === "/richieste"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/requests"
        >
          Richieste
        </Link>
        <Link
          className={
            location.pathname === "/canzoni"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/songs"
        >
          Canzoni
        </Link>
        <Link
          className={
            location.pathname === "/impostazioni"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/settings"
        >
          Impostazioni
        </Link>

        <button
          className="cursor-pointer px-8 py-2 bg-red-700 hover:bg-red-800 transition text-white rounded-full"
          onClick={handlelogOut}
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
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
            location.pathname === "/"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/"
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/eventi"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/events"
        >
          Eventi
        </Link>
        <Link
          className={
            location.pathname === "/richieste"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/requests"
        >
          Richieste
        </Link>
        <Link
          className={
            location.pathname === "/canzoni"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/songs"
        >
          Canzoni
        </Link>
        <Link
          className={
            location.pathname === "/impostazioni"
              ? "text-red-700 hover:opacity-70 transition-opacity"
              : "hover:opacity-70 transition-opacity"
          }
          to="/settings"
        >
          Impostazioni
        </Link>
        <button
          className="cursor-pointer px-6 py-2 mt-2 bg-red-700 hover:bg-red-800 transition text-white rounded-full text-sm"
          onClick={handlelogOut}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
