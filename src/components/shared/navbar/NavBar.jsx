import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import navbarLinks from "./navbarLinks";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#5C2A73]/10 bg-[#FDF8F2]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2">
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

        {/* Desktop links - Changed md:flex to lg:flex to prevent squishing on tablets */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navbarLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.path}
                className="text-sm font-semibold text-[#5C2A73] transition-colors duration-300 hover:text-[#E86A33] xl:text-base"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Button - Changed md:block to lg:block */}
        <div className="hidden lg:block">
          <a
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-[#E86A33] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#E86A33]/30 transition-colors hover:bg-[#5C2A73]"
          >
            <LogIn size={18} />
            Login / Sign Up
          </a>
        </div>

        {/* Mobile toggle - Changed md:hidden to lg:hidden */}
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
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#5C2A73] hover:bg-[#5C2A73]/10"
                >
                  {link.name}
                </a>
              </li>
            ))}
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