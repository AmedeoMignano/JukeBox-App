import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestHome from "./components/GuestHome";
import GuestEvent from "./components/GuestEvent";
import ConditionalNavbar from "./components/ConditionalNavbar";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/guest/event/:accessCode" element={<GuestEvent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
