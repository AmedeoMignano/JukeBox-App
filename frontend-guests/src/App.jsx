import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestHome from "./components/GuestHome";
import GuestEvent from "./components/GuestEvent";
import ConditionalNavbar from "./components/ConditionalNavbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/guest/event/:accessCode" element={<GuestEvent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
