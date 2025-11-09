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
      {}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
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
