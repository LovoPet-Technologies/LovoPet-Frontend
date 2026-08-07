import { useState } from "react";
import { Menu, X, PawPrint, LogIn } from "lucide-react";
import navbarLinks from "./navbarLinks";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full  top-0 z-50 border-b border-[#5C2A73]/10 bg-orange-100 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="LovoPet Logo"
            className="h-14 w-16 object-contain pt-0.5"
          />
          <img
            src="/brandName.png"
            alt="LovoPet"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navbarLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.path}
                className="text-base font-semibold text-[#5C2A73] transition-colors duration-300 hover:text-[#E86A33]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#E86A33] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#E86A33]/30 transition-colors hover:bg-[#5C2A73]"
          >
            <LogIn size={18} />
            Login / Sign Up
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#5C2A73] hover:bg-[#5C2A73]/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#5C2A73]/10 bg-[#FDF8F2] md:hidden">
          <ul className="space-y-1 px-4 py-3">
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-[#5C2A73] hover:bg-[#5C2A73]/10"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-[#E86A33] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#5C2A73]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
