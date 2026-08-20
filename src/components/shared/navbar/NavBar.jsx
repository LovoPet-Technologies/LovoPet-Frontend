import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, LogIn } from "lucide-react";
import { homeNavbarLinks, appNavbarLinks } from "./navbarLinks";
import UserDropdown from "./UserDropdown";

function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve user from Redux store (adjust state.auth.user path to match your store)
  const { user } = useSelector((state) => state.auth || {});

  const isHomePage = location.pathname === "/";
  const currentNavLinks = isHomePage ? homeNavbarLinks : appNavbarLinks;

  const [activePath, setActivePath] = useState(location.pathname);

  // Sync scroll spy and active state
  useEffect(() => {
    if (!isHomePage) {
      setActivePath(location.pathname);
      return;
    }

    const handleScroll = () => {
      const sections = homeNavbarLinks
        .map((link) =>
          link.path.startsWith("#") ? link.path.substring(1) : null,
        )
        .filter(Boolean);

      let currentActive = "/";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActive = `#${section}`;
            break;
          }
        }
      }

      if (window.scrollY < 50) {
        currentActive = "/";
      }

      setActivePath(currentActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, location.pathname]);

  const handleNavClick = (e, path) => {
    if (path.startsWith("#")) {
      if (isHomePage) {
        e.preventDefault();
        const targetElement = document.querySelector(path);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          setActivePath(path);
        }
      } else {
        e.preventDefault();
        navigate(`/${path}`);
      }
    } else if (path === "/") {
      if (isHomePage) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActivePath("/");
      } else {
        e.preventDefault();
        navigate("/");
      }
    } else {
      e.preventDefault();
      navigate(path);
    }

    setOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#5C2A73]/10 bg-[#FDF8F2]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex shrink-0 items-center gap-2"
        >
          <img
            src="/logo.png"
            alt="LovoPet Logo"
            className="h-10 w-auto object-contain sm:h-12"
          />
          <img
            src="/brandName.png"
            alt="LovoPet"
            className="hidden h-7 w-auto object-contain sm:block sm:h-8"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {currentNavLinks.map((link) => {
            const isActive = activePath === link.path;

            return (
              <li key={link.id}>
                <a
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`relative inline-block pb-1 text-[13px] font-medium tracking-wide transition-colors duration-300 xl:text-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#E86A33] after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-[#E86A33] after:origin-bottom-left after:scale-x-100"
                      : "text-[#5C2A73] hover:text-[#E86A33] after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop Action Area: Render UserDropdown if authenticated, else show Login Button */}
        <div className="hidden lg:block">
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center gap-2 rounded-full bg-[#E86A33] px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white shadow-sm shadow-[#E86A33]/30 transition-colors hover:bg-[#5C2A73] xl:text-sm"
            >
              <LogIn size={16} />
              Login / Sign Up
            </button>
          )}
        </div>

        {/* Mobile menu toggle & user quick access */}
        <div className="flex items-center gap-3 lg:hidden">
          {user && <UserDropdown user={user} />}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-md p-2 text-[#5C2A73] hover:bg-[#5C2A73]/10"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="border-t border-[#5C2A73]/10 bg-[#FDF8F2] lg:hidden">
          <ul className="space-y-1 px-4 py-3">
            {currentNavLinks.map((link) => {
              const isActive = activePath === link.path;

              return (
                <li key={link.id}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#5C2A73]/10 text-[#E86A33]"
                        : "text-[#5C2A73] hover:bg-[#5C2A73]/10 hover:text-[#E86A33]"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {!user && (
            <div className="px-4 pb-4 pt-2">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/auth");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E86A33] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#5C2A73]"
              >
                <LogIn size={18} />
                Login / Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
