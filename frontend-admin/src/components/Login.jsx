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
      console.log(err);
      console.log(err.message);
      console.log(err.errorMessages[0].slice(10));
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
    <>
      <div>
        <h1 className="text-center mb-10 mt-4 text-5xl text-red-900">
          Banda Corta Jukebox
        </h1>
        <div className="px-10 flex items-center">
          <div className="flex w-full">
            <div className="w-full hidden md:inline-block">
              <img
                className="h-full"
                src="../src/assets/img/logo 2023.jpg"
                alt="logo"
              />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
              <div className=" text-3xl mb-2 text-gray-900">
                <h2>Admin Dashboard</h2>
              </div>

              <form
                className="md:w-96 w-80 flex flex-col items-center justify-center"
                onSubmit={handleLogin}
              >
                <h3 className="text-2xl text-red-700 font-medium">Accedi</h3>

                <div className="flex items-center gap-4 w-full my-5"></div>

                <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="login-button mb-4 cursor-pointer"
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
    </>
  );
};

export default Login;
