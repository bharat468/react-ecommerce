import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#005f82] to-[#002f56] text-white py-12 px-8 shadow-inner">

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Column 1 - Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#ffcc66]">Quick Links</h3>
          <ul className="space-y-2 text-[16px] font-[Poppins]">
            <li><Link to="/about" className="hover:text-[#ffcc66] transition">About Us</Link></li>
            <li><Link to="/shop" className="hover:text-[#ffcc66] transition">Shop</Link></li>
            <li><Link to="/locate" className="hover:text-[#ffcc66] transition">Locate Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#ffcc66] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Column 2 - Customer Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#ffcc66]">Customer Support</h3>
          <ul className="space-y-2 text-[16px] font-[Poppins]">
            <li><Link to="/faq" className="hover:text-[#ffcc66] transition">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-[#ffcc66] transition">Shipping Info</Link></li>
            <li><Link to="/returns" className="hover:text-[#ffcc66] transition">Return Policy</Link></li>
            <li><Link to="/privacy" className="hover:text-[#ffcc66] transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#ffcc66]">Contact Us</h3>
          <ul className="space-y-3 text-[16px] font-[Poppins]">
            <li className="flex justify-center md:justify-start items-center gap-3">
              <FaMapMarkerAlt className="text-[#ffcc66]" />
              jaipur, Rajasthan
            </li>
            <li className="flex justify-center md:justify-start items-center gap-3">
              <FaPhoneAlt className="text-[#ffcc66]" />
              +91 8003953815
            </li>
            <li className="flex justify-center md:justify-start items-center gap-3">
              <FaEnvelope className="text-[#ffcc66]" />
              support@example.com
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start mt-5 gap-5">
            <a href="#" className="text-white hover:text-[#ffcc66] text-xl transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-[#ffcc66] text-xl transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-[#ffcc66] text-xl transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-white/30 w-[90%] mx-auto"></div>

      {/* Bottom Note */}
      <div className="text-center mt-5 text-sm text-gray-300 tracking-wide">
        © {new Date().getFullYear()} All Rights Reserved — 
        <span className="text-[#ffcc66] font-semibold"> Bharat</span>
      </div>
    </footer>
  );
};

export default Footer;
