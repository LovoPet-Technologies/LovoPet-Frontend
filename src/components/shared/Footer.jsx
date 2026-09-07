// components/homepage/Footer.jsx
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="border-t border-[#E5D8C9] bg-[#F8F3EC]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-2">
            <img src="/brandName.png" alt="LovoPet" className="h-10 w-auto" />

            <p className="mt-4 text-xs sm:text-sm font-bold tracking-wide text-[#E86A33] uppercase">
              Reimagining Animal Care
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600 max-w-sm sm:max-w-none">
              Connecting pets, farm animals, and their people with
              veterinarians, rescuers, and AI-powered support in one platform
              for every kind of animal.
            </p>

            <div className="mt-6 flex flex-col items-center sm:items-start">
              {/* Social Icons */}
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <a
                  href="https://www.facebook.com/share/1St6eCttX4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                  aria-label="Facebook"
                >
                  <FaFacebook size={22} />
                </a>

                <a
                  href="https://www.instagram.com/lovopetofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                  aria-label="Instagram"
                >
                  <FaInstagram size={22} />
                </a>

                <a
                  href="https://x.com/lovopetofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                  aria-label="Twitter/X"
                >
                  <FaXTwitter size={22} />
                </a>

                <a
                  href="https://www.linkedin.com/company/lovopetofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </a>
              </div>

              {/* Email Link */}
              <div className="mt-4 flex items-center gap-2">
                <FaEnvelope className="text-[#E86A33] shrink-0" />
                <a
                  href="mailto:lovopet.info@gmail.com"
                  className="text-sm text-gray-600 transition-colors hover:text-[#E86A33] break-all"
                >
                  lovopet.info@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold text-[#5C2A73]">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-[#E86A33] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E86A33] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#E86A33] transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-[#E86A33] transition-colors">
                  Why LovoPet
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E86A33] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold text-[#5C2A73]">
              Services
            </h3>

            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <a
                  href="/vet"
                  className="transition-colors hover:text-[#E86A33]"
                >
                  Online Vet Care
                </a>
              </li>

              <li>
                <a
                  href="/animal-pharmacy"
                  className="transition-colors hover:text-[#E86A33]"
                >
                  Animal Pharmacy
                </a>
              </li>

              <li>
                <a
                  href="/pet-shop"
                  className="transition-colors hover:text-[#E86A33]"
                >
                  Animal Shop
                </a>
              </li>

              <li>Animal Adoption</li>
              <li>AI Health Support</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold text-[#5C2A73]">
              Stay Updated
            </h3>
            <p className="mb-3 text-xs sm:text-sm text-gray-600 max-w-sm mx-auto sm:mx-0">
              Subscribe to our newsletter for animal care tips and updates.
            </p>
            <div className="flex w-full max-w-xs mx-auto sm:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-md border border-[#E5D8C9] bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-[#E86A33]"
              />
              <button 
                type="submit"
                aria-label="Subscribe"
                className="flex items-center justify-center rounded-r-md bg-[#E86A33] px-3.5 text-white transition-colors hover:bg-[#5C2A73] shrink-0"
              >
                <FaEnvelope size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 sm:mt-12 border-t border-[#E5D8C9]/60 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} LovoPet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;