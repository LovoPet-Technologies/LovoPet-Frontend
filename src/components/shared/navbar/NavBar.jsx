import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import navbarLinks from "./navbarLinks";

function NavBar() {
  const [open, setOpen] = useState(false);
  // Default to whatever the actual URL is on page load
  const [activePath, setActivePath] = useState(window.location.pathname);

  // Listen to scroll to highlight the active link on the homepage
  useEffect(() => {
    const handleScroll = () => {
      // 1. If we are on a separate page (like /team), keep the underline there and STOP here.
      if (window.location.pathname !== "/") {
        setActivePath(window.location.pathname);
        return;
      }

      // 2. If we are on the Homepage, run the scroll-spy logic for hash links
      const sections = navbarLinks
        .map((link) =>
          link.path.startsWith("#") ? link.path.substring(1) : null,
        )
        .filter(Boolean);

      let currentActive = "/"; // Default to home

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the screen
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActive = `#${section}`;
            break;
          }
        }
      }

      // If we are at the very top of the homepage, force "Home" to be active
      if (window.scrollY < 50) {
        currentActive = "/";
      }

      setActivePath(currentActive);
    };

    // Run once on load to catch the immediate active state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scrolling function
  const handleNavClick = (e, path) => {
    // If it's a hash link AND we are on the homepage, scroll smoothly
    if (path.startsWith("#")) {
      if (window.location.pathname === "/") {
        e.preventDefault();
        const targetElement = document.querySelector(path);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setActivePath(path);
        }
      }
      // Note: If we are on /team and click a hash link, we let the browser
      // naturally navigate back to the homepage and jump to the hash.
    } else if (path === "/") {
      // If clicking "Home" while already on the home page, just scroll up
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setActivePath("/");
      }
    }
    // For standard paths like "/team", we don't preventDefault.
    // We just let the browser navigate naturally!

    setOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#5C2A73]/10 bg-[#FDF8F2]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex shrink-0 items-center gap-2"
        >
          {/* Logo */}
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
          {navbarLinks.map((link) => {
            const isActive = activePath === link.path;

            return (
              <li key={link.id}>
                {/* 
                  NOTE: If a user is on /team and clicks #services, the link.path is #services.
                  To ensure it routes back to the homepage from another page, 
                  we dynamically prepend a "/" to hash links if we aren't currently on the homepage.
                */}
                <a
                  href={
                    window.location.pathname !== "/" &&
                    link.path.startsWith("#")
                      ? `/${link.path}`
                      : link.path
                  }
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

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <a
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-[#E86A33] px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white shadow-sm shadow-[#E86A33]/30 transition-colors hover:bg-[#5C2A73] xl:text-sm"
          >
            <LogIn size={16} />
            Login / Sign Up
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#5C2A73] hover:bg-[#5C2A73]/10 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="border-t border-[#5C2A73]/10 bg-[#FDF8F2] lg:hidden">
          <ul className="space-y-1 px-4 py-3">
            {navbarLinks.map((link) => {
              const isActive = activePath === link.path;

              return (
                <li key={link.id}>
                  <a
                    href={
                      window.location.pathname !== "/" &&
                      link.path.startsWith("#")
                        ? `/${link.path}`
                        : link.path
                    }
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
          <div className="px-4 pb-4 pt-2">
            <a
              href="/auth"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E86A33] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#5C2A73]"
            >
              <LogIn size={18} />
              Login / Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
