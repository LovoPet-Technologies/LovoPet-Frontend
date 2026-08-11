import { FcGoogle } from "react-icons/fc";

const API = import.meta.env.VITE_API_URL;

function OAuth() {
  const googleLogin = () => {
    window.location.href = `${API}/auth/google/`;
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={googleLogin}
        className="
          w-full
          flex items-center justify-center gap-2
          border border-[#F0E1CF]
          bg-white
          hover:bg-[#FFF1E1]
          transition-all duration-200
          rounded-xl py-3
          text-[#1E2A4A]
          text-sm font-medium
        "
      >
        <FcGoogle size={18} />
        Continue with Google
      </button>
    </div>
  );
}

export default OAuth;