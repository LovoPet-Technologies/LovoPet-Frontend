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
      navigate(`/${user.username}`);
    }
  }, [user, navigate]);

  const loginUser = async (identifier, password) => {
    try {
      const res = await fetch(`${API}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403) {
          navigate("/checkEmail", {
            state: { identifier },
          });
          return;
        }

        throw new Error(data.message || "Login failed");
      }
      dispatch(setAccessToken(data.access_token));
      dispatch(setUser(data.user));
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const res = await fetch(`${API}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "Registration failed";

        if (data.message) {
          errorMessage = data.message;
        }

        // DRF serializer error handling
        else if (data.username) {
          errorMessage = data.username[0];
        } else if (data.email) {
          errorMessage = data.email[0];
        } else if (data.password) {
          errorMessage = data.password[0];
        }

        throw new Error(errorMessage);
      }
      navigate("/checkEmail", { state: { email } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#FFF8F0]">
      <div
        className="
          w-full max-w-4xl rounded-2xl overflow-hidden border border-[#F0E1CF] shadow-2xl shadow-orange-900/10 grid grid-cols-1 md:grid-cols-2"
      >
        {/* LEFT PANEL */}
        <div
          className="
            hidden md:flex flex-col justify-center bg-gradient-to-br from-[#FFF1E1] to-[#FFE4D0] border-r border-[#F0E1CF] px-10 py-12"
        >
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
          {/* CLOSE and go back to root*/}
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