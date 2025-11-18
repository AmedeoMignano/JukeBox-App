import React, { useState } from "react";
import { login } from "../services/authservice";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsloading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      //   console.log(err);
      //   console.log(err.message);
      //   console.log(err.errorMessages[0].slice(10));
      if (err.errorMessages && err.errorMessages.length > 0) {
        setError(err.errorMessages[0].slice(10));
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Errore di validazione");
      }
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-center mb-10 mt-12 text-5xl sm:text-6xl text-red-900 font-imperial">
        Banda Corta Jukebox
      </h1>

      <div className="px-4 w-full max-w-5xl flex justify-center items-start mb-5">
        <div className="flex w-full">
          <div className="w-1/2 hidden md:block pr-8">
            <img className="w-full h-auto" src="/logo 2023.jpg" alt="logo" />
          </div>

          <div className="login-card">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-1 font-playfair">
                Admin Dashboard
              </h2>
              <h3 className="text-2xl text-red-700 font-medium font-poppins">
                Accedi
              </h3>
            </div>

            <form
              className="w-full max-w-xs sm:max-w-sm flex flex-col items-center justify-center"
              onSubmit={handleLogin}
            >
              <div className="flex items-center w-full bg-transparent border border-red-700/60 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 mb-4">
                <svg
                  width="16"
                  height="11"
                  viewBox="0 0 16 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent text-red-700/80 placeholder-red-700/80 outline-none text-sm w-full h-full py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center w-full bg-transparent border border-red-700/60 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 mt-2">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-red-700/80 placeholder-red-700/80 outline-none text-sm w-full h-full py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 transition-colors text-white font-bold py-2 px-4 rounded-full w-full my-6 shadow-lg shadow-red-700/40 cursor-pointer"
              >
                Login
              </button>

              {isloading && <Spinner />}
              {error && <Alert errors={error} />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
