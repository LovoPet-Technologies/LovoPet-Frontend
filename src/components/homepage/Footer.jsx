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
    <footer className="bg-[#F8F3EC] border-t border-[#E5D8C9]">
      <div className="mx-auto w-full px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img src="/brandName.png" alt="LovoPet" className="h-10 w-auto" />

            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-[#E86A33]">
              Reimagining Animal Care
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Connecting pets, farm animals, and their people with
              veterinarians, rescuers, and AI-powered support — one platform for
              every kind of animal.
            </p>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/share/1St6eCttX4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                >
                  <FaFacebook size={22} />
                </a>
                <a
                  href="https://www.instagram.com/lovopetofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                >
                  <FaInstagram size={22} />
                </a>
                <a
                  href="https://x.com/lovopetofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                >
                  <FaXTwitter size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/company/lovopetofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A73] transition-all duration-300 hover:scale-110 hover:text-[#E86A33]"
                >
                  <FaLinkedin size={22} />
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <FaEnvelope className="text-[#E86A33]" />
                <a
                  href="mailto:lovopet.info@gmail.com"
                  className="text-sm text-gray-600 transition-colors hover:text-[#E86A33]"
                >
                  lovopet.info@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-[#5C2A73]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="/" className="hover:text-[#E86A33]">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E86A33]">
                  Services
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#E86A33]">
                  Shop
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-[#E86A33]">
                  Why LovoPet
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E86A33]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-[#5C2A73]">Services</h3>
            <ul className="space-y-3 text-gray-600">
              <li>Online Vet Care</li>
              <li>Animal Pharmacy</li>
              <li>Animal Shop</li>
              <li>Animal Adoption</li>
              <li>AI Health Support</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-[#5C2A73]">Support</h3>
            <ul className="space-y-3 text-gray-600">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#E5D8C9] bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h3 className="text-base font-bold text-[#5C2A73]">Stay Updated</h3>
            <p className="mt-1 text-sm text-gray-600">
              Subscribe for animal care tips and platform updates.
            </p>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:w-72">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-lg border border-[#E5D8C9] px-4 py-3 outline-none"
            />
            <button className="rounded-r-lg bg-[#E86A33] px-4 text-white hover:bg-[#5C2A73]">
              <FaEnvelope size={18} />
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} LovoPet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
