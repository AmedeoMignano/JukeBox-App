import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestHome from "./components/GuestHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
