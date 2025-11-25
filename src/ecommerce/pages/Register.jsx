import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🔥 Register user using Firebase Authentication
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      alert("Account created successfully!");
      navigate("/login"); // redirect to login
    } catch (error) {
      console.log("Registration Error:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f5f4] to-[#f1ede9] font-[Poppins]">
        <div
          className="flex w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl"
          style={{ minHeight: "600px" }}
        >
          {/* Left panel */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#C63E21] via-[#9b2c18] to-[#C63E21] px-10 py-16 flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold mb-5 leading-tight">
                Join Our Family 🤝<br /> Create Your Account
              </h2>
              <p className="text-[#ffe7d1] text-base mb-12 max-w-[260px]">
                Start your journey with us. Register now and enjoy exclusive
                offers & updates.
              </p>
            </div>
            <p className="text-sm text-[#ffddc0]">
              © {new Date().getFullYear()} Bharat — All Rights Reserved
            </p>
          </div>

          {/* Right panel (Register form) */}
          <div className="w-full md:w-1/2 bg-white px-10 py-16 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#C63E21] text-center mb-2">
              Create an Account
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter your details to register your account
            </p>

            <form
              className="w-full max-w-md mx-auto flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-[#f9f8f7] text-gray-800 px-4 py-3 rounded-lg border border-[#ddd] placeholder:text-gray-500 focus:outline-none focus:border-[#C63E21] focus:ring-1 focus:ring-[#C63E21] flex-1"
                />
              </div>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
                required
                className="bg-[#f9f8f7] text-gray-800 px-4 py-3 rounded-lg border border-[#ddd] placeholder:text-gray-500 focus:outline-none focus:border-[#C63E21] focus:ring-1 focus:ring-[#C63E21]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
                required
                className="bg-[#f9f8f7] text-gray-800 px-4 py-3 rounded-lg border border-[#ddd] placeholder:text-gray-500 focus:outline-none focus:border-[#C63E21] focus:ring-1 focus:ring-[#C63E21]"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={data.phone}
                onChange={handleChange}
                required
                className="bg-[#f9f8f7] text-gray-800 px-4 py-3 rounded-lg border border-[#ddd] placeholder:text-gray-500 focus:outline-none focus:border-[#C63E21] focus:ring-1 focus:ring-[#C63E21]"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                required
                className="bg-[#f9f8f7] text-gray-800 px-4 py-3 rounded-lg border border-[#ddd] placeholder:text-gray-500 focus:outline-none focus:border-[#C63E21] focus:ring-1 focus:ring-[#C63E21]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C63E21] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#a93216] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-gray-700 text-[15px] text-center mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#C63E21] hover:underline font-semibold"
                >
                  Login Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

