import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  console.log(useLocation());

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(null);

    try {
      // 🔥 Firebase Login
      await signInWithEmailAndPassword(auth, data.email, data.password);

      navigate("/"); // redirect on success
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f5f4] to-[#f1ede9] font-[Poppins]">
        <div
          className="flex w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl"
          style={{ minHeight: "560px" }}
        >

          {/* Left Panel */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#C63E21] via-[#9b2c18] to-[#C63E21] px-10 py-16 flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold mb-5 leading-tight">
                Welcome Back 👋<br /> to E-Commerce
              </h2>
              <p className="text-[#ffddc0] text-base mb-12 max-w-[240px]">
                Log in to explore new products and manage your account easily.
              </p>
            </div>
            <p className="text-sm text-[#ffe7d1]">
              © {new Date().getFullYear()} Bharat
            </p>
          </div>

          {/* Right Login Form */}
          <div className="w-full md:w-1/2 bg-white px-10 py-16 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#C63E21] text-center mb-2">
              Login to Your Account
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter your credentials to access your account
            </p>

            {isError && (
              <p className="text-red-500 text-sm text-center mb-2">
                {isError}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-700 text-sm mb-2 block font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="eg. bharat@gmail.com"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#f9f8f7] border border-[#ddd] text-gray-800 rounded-lg px-4 py-3 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-gray-700 text-sm mb-2 block font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#f9f8f7] border border-[#ddd] text-gray-800 rounded-lg px-4 py-3 text-sm"
                />
                <span className="block text-xs ml-1 mt-1 text-gray-500">
                  Must be at least 6 characters.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C63E21] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#a93216] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-3"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-gray-700 text-[15px] text-center mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#C63E21] hover:underline font-semibold"
                >
                  Register Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
