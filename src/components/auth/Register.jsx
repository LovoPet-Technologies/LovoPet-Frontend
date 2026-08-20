import { useState, useRef, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ChevronDown } from "lucide-react";
import OAuth from "./OAuth";

const ROLE_OPTIONS = [
  { value: "pet_parent", label: "Pet Parent" },
  { value: "animal_lover", label: "Animal Lover" },
  { value: "ngo_rescue", label: "NGO / Rescue" },
  { value: "veterinarian", label: "Veterinarian" },
  { value: "volunteer", label: "Volunteer" },
];

// Custom Dropdown matching the UI theme
function CustomSelect({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between bg-[#FFF8F0] border rounded-xl px-3 py-2.5 text-sm transition-all duration-200 outline-none ${
          isOpen
            ? "border-[#F97316] ring-2 ring-[#F97316]/20 bg-white"
            : "border-[#F0E1CF] hover:border-[#F97316]/50 hover:bg-white"
        }`}
      >
        <span
          className={
            selectedOption ? "text-[#1E2A4A] font-medium" : "text-[#B8AB9B]"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#9CA3AF] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#F97316]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1.5 bg-white border border-[#F0E1CF] rounded-xl shadow-lg shadow-orange-950/5 overflow-hidden py-1 max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-sm transition-colors duration-150 flex items-center justify-between ${
                value === option.value
                  ? "bg-[#FFF8F0] text-[#F97316] font-semibold"
                  : "text-[#1E2A4A] hover:bg-[#FFF8F0]/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
    name: "",
    email: "",
    mobileNumber: "",
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

  const handleRoleChange = (roleValue) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      role: roleValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const mobileNumber = formData.mobileNumber.trim();
    const role = formData.role;

    if (!name) return setError("Full name required");
    if (!email) return setError("Email required");
    if (!role) return setError("Please select your role");

    if (formData.password.length < 8)
      return setError("Password must be at least 8 characters");

    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match");

    setLoading(true);

    try {
      await onRegister(name, email, mobileNumber, role, formData.password);
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

      {/* Or */}
      <div className="relative flex items-center justify-center py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#F0E1CF]" />
        </div>
        <div className="relative bg-white px-3 text-xs uppercase text-[#B8AB9B] font-medium tracking-wider">
          or
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name */}
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full bg-[#FFF8F0] border border-[#F0E1CF] rounded-xl px-3 py-2.5 text-sm text-[#1E2A4A] placeholder:text-[#B8AB9B] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
        />

        {/* Email Address */}
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full bg-[#FFF8F0] border border-[#F0E1CF] rounded-xl px-3 py-2.5 text-sm text-[#1E2A4A] placeholder:text-[#B8AB9B] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
        />

        {/* Mobile Number (OPTIONAL) */}
        <input
          name="mobileNumber"
          type="tel"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number (Optional)"
          className="w-full bg-[#FFF8F0] border border-[#F0E1CF] rounded-xl px-3 py-2.5 text-sm text-[#1E2A4A] placeholder:text-[#B8AB9B] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
        />

        {/* Custom Styled Role Dropdown */}
        <CustomSelect
          value={formData.role}
          onChange={handleRoleChange}
          options={ROLE_OPTIONS}
          placeholder="Which best describes you?"
        />

        {/* Password */}
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        {/* Confirm Password */}
        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <button
          disabled={loading}
          className="w-full bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-60 disabled:hover:bg-[#F97316] rounded-xl py-2.5 text-white text-sm font-medium
          transition-all duration-200 shadow-md shadow-orange-500/20 mt-2"
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
