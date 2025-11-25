import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../contexts/CartProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useCurrency } from "../contexts/CurrencyProvider";
import { HiMenuAlt3, HiX } from "react-icons/hi";


const Navbar = () => {

  const { cart } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { user, isLoggedIn, logout } = useAuth();



  const [isOpen, setIsOpen] = useState(false); // mobile menu state

  return (
    <header className="bg-gradient-to-r from-[#005f82] to-[#002f56] text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-semibold tracking-wide font-[Poppins]">
          <Link to="/" className="hover:text-[#ffcc66] transition">
            My Website
          </Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-[16px] font-[Poppins] items-center">

          <li>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66]"
              }
            >
              Home
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66]"
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66]"
              }
            >
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1 flex items-center gap-2"
                  : "hover:text-[#ffcc66] flex items-center gap-2"
              }
            >
              <FaCartShopping className="text-[18px]" />
              Cart ({cart.length})
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66]"
              }
            >
              Contact
            </NavLink>
          </li>

          {/* Currency */}
          <li>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#ffcc66] text-[#002f56] font-semibold px-3 py-1 rounded-full cursor-pointer shadow-md"
            >
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select>
          </li>

          {/* Login / Logout */}
          <li>
            {user ? (
              <button
                onClick={logout}
                className="bg-[#ffcc66] text-[#002f56] font-semibold px-4 py-2 rounded-full hover:scale-105 transition shadow-md"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="hover:text-[#ffcc66]">
                Login
              </NavLink>
            )}
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden bg-[#003b5c] text-white w-full px-6 py-5 flex flex-col gap-5 font-[Poppins] transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <NavLink to="/" onClick={() => setIsOpen(false)} className="hover:text-[#ffcc66]">Home</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)} className="hover:text-[#ffcc66]">About</NavLink>
        <NavLink to="/blog" onClick={() => setIsOpen(false)} className="hover:text-[#ffcc66]">Blog</NavLink>
        <NavLink to="/cart" onClick={() => setIsOpen(false)} className="hover:text-[#ffcc66]">
          Cart ({cart.length})
        </NavLink>
        <NavLink to="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#ffcc66]">Contact</NavLink>

        {/* Currency */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-[#ffcc66] text-[#002f56] font-semibold px-3 py-2 rounded-full cursor-pointer shadow-md"
        >
          <option value="INR">INR ₹</option>
          <option value="USD">USD $</option>
          <option value="EUR">EUR €</option>
        </select>

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-[#ffcc66] text-[#002f56] font-semibold px-4 py-2 rounded-full hover:scale-105 transition shadow-md"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="hover:text-[#ffcc66]">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
