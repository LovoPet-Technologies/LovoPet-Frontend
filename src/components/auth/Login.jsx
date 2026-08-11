import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import OAuth from "./OAuth";

function Login({ onLogin, onRegister, onForgot }) {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onLogin(formData.identifier, formData.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Detect whether user is typing an email or username
  const isEmail = formData.identifier.includes("@");

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#1E2A4A]">Welcome back</h2>
        <p className="mt-1 text-xs text-[#6B7280]">
          Sign in to continue
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* OAUTH BUTTONS */}
      <OAuth />

      {/* DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#F0E1CF]" />
        <span className="text-xs text-[#9CA3AF]">or</span>
        <div className="flex-1 h-px bg-[#F0E1CF]" />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-[#1E2A4A]">Email or username</label>

            {formData.identifier.length > 0 && (
              <span className="text-xs text-[#9A8B7A]">
                {isEmail ? "signing in with email" : "signing in with username"}
              </span>
            )}
          </div>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="username or email"
            required
            autoComplete="username"
            className="w-full bg-[#FFF8F0] border border-[#F0E1CF] rounded-xl px-3 py-2.5 text-sm text-[#1E2A4A] placeholder:text-[#B8AB9B] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]/60 transition"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-[#1E2A4A]">Password</label>
            <button
              type="button"
              onClick={onForgot}
              className="text-xs text-[#F97316] hover:text-[#EA580C] transition"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full bg-[#FFF8F0] border border-[#F0E1CF] rounded-xl px-3 py-2.5 pr-10 text-sm text-[#1E2A4A] placeholder:text-[#B8AB9B] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]/60 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1E2A4A] transition"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={17} />
              ) : (
                <AiOutlineEye size={17} />
              )}
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-60 disabled:hover:bg-[#F97316] text-white rounded-xl py-2.5 text-sm font-medium transition-all duration-200 shadow-md shadow-orange-500/20 mt-1"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* FOOTER */}
      <p className="text-center text-xs text-[#6B7280]">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="text-[#F97316] hover:text-[#EA580C] font-medium transition"
        >
          Create one
        </button>
      </p>
    </div>
  );
}

export default Login;