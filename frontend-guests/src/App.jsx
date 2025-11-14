import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestHome from "./components/GuestHome";
import GuestEvent from "./components/GuestEvent";
import ConditionalNavbar from "./components/ConditionalNavbar";
import Contact from "./components/Contact";
import About from "./components/About";
import ConditionalFooter from "./components/ConditionalFooter";
import { Toaster } from "react-hot-toast";
import { WebSocketProvider } from "./context/WebSocketContext";

function App() {
  return (
    <>
      <WebSocketProvider>
        <BrowserRouter>
          <ConditionalNavbar />
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<GuestHome />} />
            <Route path="/guest/event/:accessCode" element={<GuestEvent />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <ConditionalFooter />
        </BrowserRouter>
      </WebSocketProvider>
    </>
  );
}

export default App;
