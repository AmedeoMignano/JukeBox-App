import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestHome from "./components/GuestHome";
import GuestEvent from "./components/GuestEvent";
import ConditionalNavbar from "./components/ConditionalNavbar";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/guest/event/:accessCode" element={<GuestEvent />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
