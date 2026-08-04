import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#F8F3EC] border-t border-[#E5D8C9]">
      <div className="mx-auto w-full px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <img src="/brandName.png" alt="LovoPet" className="h-10 w-auto" />

            <p className="mt-5 text-sm leading-6 text-gray-600">
              Connecting pets, veterinarians, rescuers and communities through
              AI-powered healthcare and animal welfare.
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

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#5C2A73]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#5C2A73]">Services</h3>

            <ul className="space-y-3 text-gray-600">
              <li>Online Vet Care</li>
              <li>Pet Pharmacy</li>
              <li>Pet Shop</li>
              <li>Pet Adoption</li>
              <li>AI Health Support</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#5C2A73]">Support</h3>

            <ul className="space-y-3 text-gray-600">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#5C2A73]">
              Stay Updated
            </h3>

            <p className="mb-4 text-sm text-gray-600">
              Subscribe to receive pet care tips and platform updates.
            </p>

            <div className="flex">
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
