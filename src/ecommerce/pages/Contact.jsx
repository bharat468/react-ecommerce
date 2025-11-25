import React, { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("")
    const formData = new FormData(event.target);
    formData.append("access_key", "f51169bd-a31e-4e62-b50b-914601ffe84d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.success ? "Message sent successfully!" : "Something went wrong!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbff] to-[#f3f0f7] flex flex-col items-center py-14 px-6 font-[Poppins]">

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#C63E21] drop-shadow-sm">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-3 text-lg sm:text-xl max-w-xl mx-auto">
          We’re here to help! Send us your message anytime.
        </p>
        <div className="w-24 h-[3px] bg-[#C63E21] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Contact Information */}
        <div className="bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 rounded-2xl p-8 flex flex-col gap-8">

          <h2 className="text-2xl font-semibold text-[#1f3340] mb-2">Get in Touch</h2>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">📞</span>
            <div>
              <p className="font-semibold text-lg text-[#1f3340]">Phone</p>
              <p className="text-gray-700">+91 8003953815</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">📧</span>
            <div>
              <p className="font-semibold text-lg text-[#1f3340]">Email</p>
              <p className="text-gray-700">bharatpareek256@gmail.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">📍</span>
            <div>
              <p className="font-semibold text-lg text-[#1f3340]">Address</p>
              <p className="text-gray-700">Sardarshahar, Rajasthan - 331403</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold text-[#1f3340] mb-6">
            Send a Message
          </h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="px-5 py-3 bg-gray-100 rounded-xl shadow-inner outline-none
              focus:ring-2 focus:ring-[#C63E21] transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="px-5 py-3 bg-gray-100 rounded-xl shadow-inner outline-none
              focus:ring-2 focus:ring-[#C63E21] transition"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
              className="px-5 py-3 bg-gray-100 rounded-xl shadow-inner outline-none
              focus:ring-2 focus:ring-[#C63E21] transition resize-none"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#C63E21] text-white font-semibold text-lg rounded-xl
              shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Submit
            </button>
          </form>

          {/* Submit Message */}
          <p className="text-center mt-4 font-semibold text-[#C63E21]">{result}</p>
        </div>
      </div>
    </div>
  );
}
