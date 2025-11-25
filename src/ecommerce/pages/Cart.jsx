import React, { useEffect } from "react";
import { useCart } from "../contexts/CartProvider";
import { useCurrency } from "../contexts/CurrencyProvider";
import { deleteDoc, doc } from "firebase/firestore";

// Firebase
import { setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Cart = () => {
  const { cart, setCart } = useCart();
  const { convert, currency } = useCurrency();

  // Load cart on first render
  useEffect(() => {
    const stored = localStorage.getItem("storedCart");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCart(
        parsed.map((obj) => ({
          ...obj,
          quantity: obj.quantity ?? 1,
        }))
      );
    } else if (cart.length > 0) {
      setCart(
        cart.map((obj) => ({
          ...obj,
          quantity: obj.quantity ?? 1,
        }))
      );
    }
  }, []);

  // Save cart to localStorage & Firebase
  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cart));

    cart.forEach(async (item) => {
      try {
        await setDoc(doc(db, "user_cart", item._id), {
          ...item,
          updatedAt: new Date(),
        });
      } catch (err) {
        console.log("Firebase Update Error:", err);
      }
    });
  }, [cart]);

  // Increment quantity
  function quantityPlus(id) {
    setCart(
      cart.map((obj) =>
        obj._id === id ? { ...obj, quantity: obj.quantity + 1 } : obj
      )
    );
  }

  // Decrement quantity
  function quantityLess(id) {
    setCart(
      cart.map((obj) =>
        obj._id === id
          ? { ...obj, quantity: obj.quantity > 1 ? obj.quantity - 1 : 1 }
          : obj
      )
    );
  }

  // Remove item
  async function handleRemove(id) {
    setCart(cart.filter((obj) => obj._id !== id));
    try {
      await deleteDoc(doc(db, "user_cart", id));
      console.log("Firebase item deleted");
    } catch (err) {
      console.log("Firebase Delete Error:", err);
    }
  }

  // Total
  const grandTotal = cart
    .reduce((acc, obj) => acc + convert(obj.price * obj.quantity), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          Sorry :- आपका Cart खाली है 😔
        </div>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {cart.map((obj) => (
            <div
              key={obj._id}
              className="relative flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 p-6 bg-white rounded-2xl shadow-sm border hover:shadow-lg transition"
            >
              <button
                className="absolute right-4 top-4 w-9 h-9 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100"
                onClick={() => handleRemove(obj._id)}
              >
                ❌
              </button>

              {/* Product Details */}
              <div className="flex items-center gap-6 w-full md:w-1/2">
                <img
                  src={obj.image}
                  alt={obj.name}
                  className="w-28 h-28 object-cover rounded-xl border shadow-sm"
                />
                <div>
                  <h3 className="text-xl font-semibold">{obj.name}</h3>
                  <p className="text-lg text-gray-600 mt-1">
                    {currency} {convert(obj.price).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity + Total */}
              <div className="flex flex-col md:flex-row items-center w-full md:w-1/2 gap-8 justify-end">
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 shadow-inner">
                  <button
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                    onClick={() => quantityLess(obj._id)}
                  >
                    −
                  </button>

                  <span className="text-lg font-semibold">{obj.quantity}</span>

                  <button
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                    onClick={() => quantityPlus(obj._id)}
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold">
                    {currency} {convert(obj.price * obj.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Grand Total */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-6 flex justify-between items-center">
            <p className="text-lg">Total ({cart.length} items)</p>
            <p className="text-3xl font-bold">
              {grandTotal} {currency}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
