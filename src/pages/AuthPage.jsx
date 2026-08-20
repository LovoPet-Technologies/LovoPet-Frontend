import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ForgotPassword from "../components/auth/Forgotpassword";
import { setAccessToken, setUser } from "../redux/slices/authSlice";

const API = import.meta.env.VITE_API_URL;

function AuthPage() {
  const [view, setView] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate(`/pet-shop`);
    }
  }, [user, navigate]);

  const loginUser = async (email, password) => {
    try {
      const res = await fetch(`${API}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403) {
          navigate("/checkEmail", {
            state: { email },
          });
          return;
        }

        throw new Error(data.message || "Login failed");
      }

      dispatch(setAccessToken(data.access_token));
      dispatch(setUser(data.user));
      navigate("/pet-shop");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const registerUser = async (name, email, mobileNumber, role, password) => {
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
        success: false,
      });
    }
    try {
      const res = await fetch(`${API}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email: email.trim().toLowerCase(),
          mobileNumber,
          role: role.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/checkEmail", {
        state: { email },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#FFF8F0]">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden border border-[#F0E1CF] shadow-2xl shadow-orange-900/10 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-[#FFF1E1] to-[#FFE4D0] border-r border-[#F0E1CF] px-10 py-12">
          <div className="space-y-10">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-11 w-11 object-contain"
              />
              <img
                src="/brandName.png"
                alt="Brand"
                className="h-8 object-contain"
              />
            </div>

            {/* TAGLINE */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold leading-tight text-[#1E2A4A]">
                Complete Care
                <br />
                <span className="text-[#F97316]">In One Platform.</span>
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Manage appointments, track health records, collaborate with
                vets, and keep every pet cared for in real-time.
              </p>
            </div>

            <p className="text-xs text-[#9A8B7A]">
              &quot;Reimagining Animal Care&quot;
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative flex items-start justify-center p-7 md:p-10 bg-white">
          <button
            onClick={() => navigate("/")}
            className="absolute top-5 right-5 text-[#9CA3AF] hover:text-[#1E2A4A] transition z-10"
          >
            <X size={20} />
          </button>

          <div className="w-full max-w-sm">
            {view === "login" && (
              <Login
                onLogin={loginUser}
                onRegister={() => setView("register")}
                onForgot={() => setView("forgot")}
              />
            )}
            {view === "register" && (
              <Register
                onLogin={() => setView("login")}
                onRegister={registerUser}
              />
            )}
            {view === "forgot" && (
              <ForgotPassword onBack={() => setView("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
