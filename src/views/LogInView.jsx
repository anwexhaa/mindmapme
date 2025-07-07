import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err) {
      setError("Login failed. Check email or password.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FDFBF8] via-[#FAF9F6] to-[#F5F3EF] flex flex-col items-center justify-center px-4">
      {/* Optional flower emoji */}
      <div className="text-5xl mb-4">🌼</div>

      {/* Login Card */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Welcome Back 💛</h2>
        <p className="text-center text-sm text-gray-500">Log in to continue your mood journey</p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginView;
