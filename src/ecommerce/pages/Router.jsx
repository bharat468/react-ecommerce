import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OutletComponent from "../components/OutletComponent";
import Cart from '../pages/Cart'
import SingleProduct from "./SingleProduct";
import First from "../pages/First";
// import Wishlist from "../pages/Wishlist";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRouter";
import CartProvider from "../contexts/CartProvider";
import AuthProvider from "../contexts/AuthProvider";
import Blog from "./Blog";
import Contact from "../pages/Contact";
import CurrencyProvider from "../contexts/CurrencyProvider";


const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletComponent />,
    children: [
      {
        index: true,
        element: <First />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      //   {
      //     path: "/wishlist",
      //     element: <Wishlist />,
      //   },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shop",
        element: <First />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function Router() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default Router;
