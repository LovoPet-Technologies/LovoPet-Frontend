import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Menu,
  X,
  LogIn,
  Search,
  MapPin,
  Phone,
  Users,
  ChevronDown,
} from "lucide-react";
import { homeNavbarLinks, appNavbarLinks } from "./navbarLinks";
import UserDropdown from "./UserDropdown";
import MegaMenuPanel from "./MegaMenuPanel";

const SCROLL_HIDE_THRESHOLD = 120; // px scrolled down
const SUBNAV_BG = "#2E1A38";
const SUBNAV_BORDER = "rgba(255,255,255,0.08)";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [subnavVisible, setSubnavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

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

  // Hide the subnav on scroll-down, reveal it on scroll-up; a hamburger
  // button takes its place while hidden so it can be reopened manually.
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 8);

      if (currentY > lastScrollY.current && currentY > SCROLL_HIDE_THRESHOLD) {
        setSubnavVisible(false);
        setOpenMenuId(null);
      } else if (currentY < lastScrollY.current) {
        setSubnavVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setOpenMenuId(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Small hover-out delay so the pointer can travel from the link to the panel
  const openMenu = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenuId(id);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenuId(null), 150);
  };

  const activeMegaLink = currentNavLinks.find(
    (link) => link.id === openMenuId && link.megaMenu,
  );

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-[#5C2A73]/10 bg-[#FDF8F2]/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_12px_rgba(46,26,56,0.12)]" : ""
      }`}
    >
      {/* Top bar: subnav toggle (appears when collapsed), logo, search, utility icons, auth */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
        {/* Reveals the subnav again once it's been hidden by scrolling */}
        {!subnavVisible && (
          <button
            type="button"
            onClick={() => setSubnavVisible(true)}
            aria-label="Show categories"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#5C2A73]/20 text-[#5C2A73] transition-colors hover:border-[#E86A33]/60 hover:text-[#E86A33] lg:flex"
          >
            <Menu size={20} />
          </button>
        )}

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

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden flex-1 items-center md:flex"
        >
          <div className="flex w-full max-w-xl items-center overflow-hidden rounded-full border border-[#5C2A73]/15 bg-white shadow-sm transition-colors focus-within:border-[#E86A33]/60">
            <Search size={16} className="ml-4 shrink-0 text-[#5C2A73]/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search food, medicine, toys..."
              className="w-full bg-transparent px-3 py-2.5 text-sm text-[#5C2A73] placeholder:text-[#5C2A73]/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-full shrink-0 items-center justify-center bg-[#E86A33] px-4 py-2.5 text-white transition-colors hover:bg-[#5C2A73]"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right-side utility icons + auth */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          <button
            type="button"
            onClick={() => {
              /* hook up geolocation / address modal here */
            }}
            className="hidden items-center gap-1.5 rounded-full border border-[#5C2A73]/15 px-3 py-2 text-xs font-medium text-[#5C2A73] transition-colors hover:border-[#E86A33]/50 hover:text-[#E86A33] lg:flex"
          >
            <MapPin size={16} />
            <span className="max-w-[110px] truncate">Detect location</span>
          </button>

          <a
            href="tel:+910000000000"
            aria-label="Call us"
            className="hidden items-center justify-center rounded-full p-2 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/10 hover:text-[#E86A33] sm:flex"
          >
            <Phone size={18} />
          </a>

          <a
            href="/team"
            onClick={(e) => handleNavClick(e, "/team")}
            aria-label="Meet the team"
            className="hidden items-center justify-center rounded-full p-2 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/10 hover:text-[#E86A33] sm:flex"
          >
            <Users size={18} />
          </a>

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
          <div className="flex items-center gap-2 lg:hidden">
            {user && <UserDropdown user={user} />}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#5C2A73]/15 text-[#5C2A73] transition-colors hover:border-[#E86A33]/50 hover:text-[#E86A33]"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#5C2A73]/10 px-4 py-2.5 md:hidden">
        <form onSubmit={handleSearchSubmit}>
          <div className="flex items-center overflow-hidden rounded-full border border-[#5C2A73]/15 bg-white">
            <Search size={16} className="ml-3.5 shrink-0 text-[#5C2A73]/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search food, medicine, toys..."
              className="w-full bg-transparent px-3 py-2.5 text-sm text-[#5C2A73] placeholder:text-[#5C2A73]/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-full shrink-0 items-center justify-center bg-[#E86A33] px-4 py-2.5 text-white"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      {/*
        Sub navbar wrapper: this outer element stays overflow-visible so the
        mega menu panel (a sibling below the bar, not a child clipped by it)
        can render fully. Only the thin bar itself animates/collapses.
      */}
      <div className="relative hidden lg:block" onMouseLeave={scheduleClose}>
        <div
          className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
          style={{
            maxHeight: subnavVisible ? "3.5rem" : "0rem",
            opacity: subnavVisible ? 1 : 0,
            backgroundColor: SUBNAV_BG,
            borderTop: `1px solid ${SUBNAV_BORDER}`,
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center gap-6 xl:gap-8">
              {currentNavLinks.map((link) => {
                const isActive = activePath === link.path;
                const hasMega = Boolean(link.megaMenu);

                return (
                  <li
                    key={link.id}
                    onMouseEnter={() => hasMega && openMenu(link.id)}
                  >
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`flex items-center gap-1 py-3 text-[13px] font-medium tracking-wide transition-colors duration-200 xl:text-sm ${
                        isActive || openMenuId === link.id
                          ? "text-[#F2A365]"
                          : "text-white/85 hover:text-[#F2A365]"
                      }`}
                    >
                      {link.name}
                      {hasMega && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            openMenuId === link.id ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Dropdown lives outside the collapsing/clipping container above */}
        {subnavVisible && activeMegaLink && (
          <div
            className="absolute inset-x-0 top-full z-40"
            onMouseEnter={() => openMenu(activeMegaLink.id)}
            onMouseLeave={scheduleClose}
          >
            <MegaMenuPanel
              columns={activeMegaLink.megaMenu}
              onNavigate={handleNavClick}
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="border-t border-[#5C2A73]/10 bg-[#FDF8F2] lg:hidden">
          <div className="flex items-center gap-2 px-4 pt-3">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#5C2A73]/15 px-3 py-2 text-xs font-medium text-[#5C2A73]"
            >
              <MapPin size={15} />
              Location
            </button>
            <a
              href="tel:+910000000000"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#5C2A73]/15 px-3 py-2 text-xs font-medium text-[#5C2A73]"
            >
              <Phone size={15} />
              Call
            </a>
            <a
              href="/team"
              onClick={(e) => handleNavClick(e, "/team")}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#5C2A73]/15 px-3 py-2 text-xs font-medium text-[#5C2A73]"
            >
              <Users size={15} />
              Team
            </a>
          </div>

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

                  {link.megaMenu && (
                    <ul className="ml-3 mt-1 space-y-1 border-l border-[#5C2A73]/10 pl-3">
                      {link.megaMenu
                        .flatMap((col) => col.items)
                        .map((item) => (
                          <li key={item.path}>
                            <a
                              href={item.path}
                              onClick={(e) => handleNavClick(e, item.path)}
                              className="block rounded-md px-2 py-1.5 text-[13px] text-[#5C2A73]/80 hover:bg-[#5C2A73]/10 hover:text-[#E86A33]"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                    </ul>
                  )}
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
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
