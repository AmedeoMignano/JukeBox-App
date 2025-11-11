import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import { isAuthenticated } from "./services/authservice";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Event from "./components/Event";
import EventDetailPage from "./components/EventDetailPage";

function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}
function AppContent() {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, [location]);

  return (
    <>
      {isAuth && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route
          path="/events"
          element={<ProtectedRoute element={<Event />} />}
        />
        <Route
          path="/events/:id"
          element={<ProtectedRoute element={<EventDetailPage />} />}
        />
      </Routes>
    </>
  );
}
export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
