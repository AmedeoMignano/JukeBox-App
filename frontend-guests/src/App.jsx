import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestHome from "./components/GuestHome";
import GuestEvent from "./components/GuestEvent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/guest/event/:accessCode" element={<GuestEvent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
