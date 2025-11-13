import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return <Navbar />;
};

export default ConditionalNavbar;
