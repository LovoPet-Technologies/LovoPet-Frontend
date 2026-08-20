import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  User,
  Package,
  Ticket,
  Zap,
  Sparkles,
  CreditCard,
  MapPin,
  Heart,
  Gift,
  Bell,
  LogOut,
} from "lucide-react";

// Import your clearUser action from your Redux auth slice
import { clearUser } from "../../../redux/slices/authSlice";

export default function UserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // Ensures backend receiving/clearing refresh token cookies
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      // Clear Redux user state and reset navigation regardless of network outcome
      dispatch(clearUser());
      setIsOpen(false);
      navigate("/");
    }
  };

  const menuItems = [
    { label: "My Profile", icon: User, path: "/profile" },
    { label: "Orders", icon: Package, path: "/orders" },
    { label: "Coupons", icon: Ticket, path: "/coupons" },
    { label: "Supercoin", icon: Zap, path: "/supercoin" },
    { label: "LovoPet Plus Zone", icon: Sparkles, path: "/plus-zone" },
    { label: "Saved Cards & Wallet", icon: CreditCard, path: "/wallet" },
    { label: "Saved Addresses", icon: MapPin, path: "/addresses" },
    { label: "Wishlist", icon: Heart, path: "/wishlist" },
    { label: "Gift Cards", icon: Gift, path: "/gift-cards" },
    { label: "Notifications", icon: Bell, path: "/notifications" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar / Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-[#E86A33]/30 bg-[#5C2A73]/5 transition-all hover:border-[#E86A33] focus:outline-none"
        aria-label="User menu"
      >
        {user?.avatar || user?.profilePic ? (
          <img
            src={user.avatar || user.profilePic}
            alt={user.name || "User Profile"}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <User className="h-5 w-5 text-[#5C2A73]" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white py-3 shadow-xl ring-1 ring-black/5 z-50">
          <div className="px-5 py-2">
            <p className="text-base font-bold text-gray-900">Your Account</p>
          </div>

          <div className="mt-1 space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3.5 px-5 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#E86A33] transition-colors"
                >
                  <Icon className="h-4 w-4 shrink-0 text-gray-500" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3.5 px-5 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0 text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
