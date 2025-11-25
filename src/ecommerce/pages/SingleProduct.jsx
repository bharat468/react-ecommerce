import instance from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Contexts
import { useCart } from "../contexts/CartProvider";
import { useCurrency } from "../contexts/CurrencyProvider";
import { useAuth } from "../contexts/AuthProvider";

// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function SingleProduct() {
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const { convert, currency } = useCurrency();
  const { firebaseUser } = useAuth(); // logged-in user
  const navigate = useNavigate();

  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product by ID
  useEffect(() => {
    getSingleData(id);
  }, [id]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cart));
  }, [cart]);

  async function getSingleData(id) {
    try {
      setLoading(true);

      const response = await instance.get("/product/product/" + id);

      if (!response.data) {
        setError("Product not found");
      } else {
        setSingleProduct(response.data);
      }
    } catch (error) {
      console.log(error)
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Add product to cart
  async function handleAddToCart(product) {
    const already = cart.some((item) => item._id === product._id);

    if (already) {
      alert("This product is already in your cart!");
      return;
    }

    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);

    // Firebase save — per-user cart
    if (firebaseUser) {
      try {
        await setDoc(
          doc(db, "user_cart", `${firebaseUser.uid}_${product._id}`),
          {
            ...product,
            quantity: 1,
            userId: firebaseUser.uid,
            addedAt: new Date(),
          }
        );
      } catch (err) {
        console.log("Firebase cart error:", err);
      }
    }

    navigate("/cart");
  }

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#faf7fc] to-[#f3f0f7] flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 font-[Poppins]">

      {/* LEFT SECTION - IMAGE */}
      <div className="lg:w-1/2 w-full flex justify-center items-center p-10">
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">

          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#C63E21]/20 blur-3xl rounded-full"></div>

          <img
            src={singleProduct.image}
            alt={singleProduct.name}
            className="relative z-10 object-contain h-[330px] w-[330px] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center">

        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1f3340] tracking-wide">
            {singleProduct.name}
          </h1>

          <span className="text-3xl font-semibold text-[#C63E21] drop-shadow-md">
            {currency} {convert(singleProduct.price).toFixed(2)}
          </span>

          <div className="w-20 h-[3px] bg-[#C63E21] mt-3 rounded-full"></div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed bg-white/60 backdrop-blur-xl border border-white/40 p-5 rounded-xl shadow-md">
          {singleProduct.description}
        </p>

        <div className="mt-8">
          <button
            onClick={() => handleAddToCart(singleProduct)}
            className="px-14 py-4 rounded-xl bg-[#C63E21] text-white font-semibold text-lg
            shadow-md hover:shadow-xl hover:-translate-y-1
            transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}

export default SingleProduct;
