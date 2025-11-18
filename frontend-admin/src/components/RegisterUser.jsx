import React, { useState } from "react";
import { createUser } from "../services/userservice";
import Alert from "./Alert";
import toast from "react-hot-toast";

const RegisterUser = () => {
  const initialFormState = {
    username: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialFormState);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const user = createUser({ ...form });

    await toast.promise(user, {
      loading: "Creazione utente...",
      success: "Creazione utente completata!",
      error: (err) => {
        console.log(err);
        return "Impossibile creare utente!";
      },
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
        <h1 className="text-center mb-5 text-2xl text-red-700">
          Registra Utente
        </h1>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full border p-2 rounded mb-2"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border p-2 rounded mb-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            required
            className="w-full border p-2 rounded mb-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="flex justify-end">
            <button className="shadow-button-red cursor-pointer" type="submit">
              Registra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
