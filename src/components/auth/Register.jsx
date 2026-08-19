import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import OAuth from "./OAuth";

function PasswordInput({ name, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-[#FFF8F0] border border-[#F0E1CF] rounded-xl px-3 py-2.5 pr-10 text-sm text-[#1E2A4A] placeholder:text-[#B8AB9B] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1E2A4A]"
      >
        {show ? (
          <AiOutlineEyeInvisible size={17} />
        ) : (
          <AiOutlineEye size={17} />
        )}
      </button>
    </div>
  );
}

function Register({ onLogin, onRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = formData.email.trim().toLowerCase();
    const role = formData.role;

    if (!email) return setError("Email required");
    if (!role) return setError("Please tell us who you are");

    if (formData.password.length < 8)
      return setError("Password must be at least 8 characters");

    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match");

    setLoading(true);

    try {
      await onRegister(email, role, formData.password);
    } catch (err) {
      setError(err?.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#1E2A4A]">Create account</h2>
        <p className="text-xs text-[#6B7280] mt-1">Start caring with us</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      <OAuth />

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full bg-[#FFF8F0] border border-[#F0E1CF] rounded-xl px-3 py-2.5 text-sm text-[#1E2A4A] placeholder:text-[#B8AB9B] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
        />

        {/* New Role Dropdown */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className={`
            w-full 
            bg-[#FFF8F0] 
            border border-[#F0E1CF] 
            rounded-xl 
            px-3 py-2.5 
            text-sm 
            cursor-pointer
            transition-all duration-200 ease-in-out
            hover:border-[#F97316]/50
            hover:shadow-sm
            hover:bg-white
            focus:outline-none 
            focus:border-[#F97316] 
            focus:ring-4 focus:ring-[#F97316]/10 
            ${formData.role === "" ? "text-[#B8AB9B]" : "text-[#1E2A4A]"}
          `}
        >
          <option value="" disabled className="text-[#B8AB9B] bg-white">
            Which best describes you?
          </option>
          <option value="pet_parent" className="text-[#1E2A4A] bg-white py-1">
            Pet Parent
          </option>
          <option value="animal_lover" className="text-[#1E2A4A] bg-white py-1">
            Animal Lover
          </option>
          <option value="ngo_rescue" className="text-[#1E2A4A] bg-white py-1">
            NGO / Rescue
          </option>
          <option value="veterinarian" className="text-[#1E2A4A] bg-white py-1">
            Veterinarian
          </option>
          <option value="volunteer" className="text-[#1E2A4A] bg-white py-1">
            Volunteer
          </option>
        </select>

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <button
          disabled={loading}
          className="
            w-full
            bg-[#F97316]
            hover:bg-[#EA580C]
            disabled:opacity-60
            disabled:hover:bg-[#F97316]
            rounded-xl
            py-2.5
            text-white
            text-sm
            font-medium
            transition-all
            duration-200
            shadow-md
            shadow-orange-500/20
            mt-2
          "
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-xs text-[#6B7280]">
        Already have an account?{" "}
        <button
          onClick={onLogin}
          type="button"
          className="text-[#F97316] hover:text-[#EA580C] font-medium transition"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}

export default Register;
