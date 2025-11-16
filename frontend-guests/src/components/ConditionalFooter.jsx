import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const guestSession = localStorage.getItem("guestSession");
  const guest = guestSession ? JSON.parse(guestSession) : null;
  const accessCode = guest?.accessCode;
  const location = useLocation();

  if (
    !guest ||
    location.pathname === "/" ||
    location.pathname === `/guest/event/${accessCode}`
  ) {
    return null;
  } else {
    return <Footer />;
  }
};

export default ConditionalFooter;
