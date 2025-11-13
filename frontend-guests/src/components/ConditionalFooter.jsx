import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const { accessCode } = JSON.parse(localStorage.getItem("guestSession"));
  const location = useLocation();
  if (
    location.pathname === "/" ||
    location.pathname === `/guest/event/${accessCode}`
  ) {
    return null;
  } else {
    return <Footer />;
  }
};

export default ConditionalFooter;
