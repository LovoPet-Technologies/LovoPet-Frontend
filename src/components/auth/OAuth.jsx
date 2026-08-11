import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

function OAuth() {
  const googleLogin = () => {
    window.location.href = `${API}/auth/google/`;
  };

  const githubLogin = () => {
    window.location.href = `${API}/auth/github/`;
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={githubLogin}
        className="
          flex items-center justify-center gap-2
          border border-[#F0E1CF]
          bg-white
          hover:bg-[#FFF1E1]
          transition-all duration-200
          rounded-xl py-2.5
          text-[#1E2A4A]
          text-xs font-medium
        "
      >
        <FaGithub size={15} />
        GitHub
      </button>

      <button
        type="button"
        onClick={googleLogin}
        className="
          flex items-center justify-center gap-2
          border border-[#F0E1CF]
          bg-white
          hover:bg-[#FFF1E1]
          transition-all duration-200
          rounded-xl py-2.5
          text-[#1E2A4A]
          text-xs font-medium
        "
      >
        <FcGoogle size={16} />
        Google
      </button>
    </div>
  );
}

export default OAuth;