import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Home from "./pages/home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Wishlist from "./pages/Wishlist";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";

import SellerDashboard from "./pages/SellerDashboard";
import Purchases from "./pages/Purchases";

import ProtectedRoute from "./components/protected/ProtectedRoute";

const router = createBrowserRouter([

  {
    path: "/login",

    element: <Login />,
  },

  {
    path: "/signup",

    element: <Signup />,
  },

  {
    path: "/",

    element: <AppLayout />,

    children: [

      // PUBLIC ROUTES

      {
        index: true,

        element: <Home />,
      },

      {
        path: "products",

        element: <Products />,
      },

      {
        path: "product/:id",

        element: <ProductDetail />,
      },

      // BUYER ROUTES

      {
        path: "wishlist",

        element: (
          <ProtectedRoute role="Buyer">

            <Wishlist />

          </ProtectedRoute>
        ),
      },

      {
        path: "purchases",

        element: (
          <ProtectedRoute role="Buyer">

            <Purchases />

          </ProtectedRoute>
        ),
      },

      // SELLER ROUTES

      {
        path: "add-product",

        element: (
          <ProtectedRoute role="Seller">

            <AddProduct />

          </ProtectedRoute>
        ),
      },

      {
        path: "my-listings",

        element: (
          <ProtectedRoute role="Seller">

            <MyListings />

          </ProtectedRoute>
        ),
      },

      {
        path: "seller-dashboard",

        element: (
          <ProtectedRoute role="Seller">

            <SellerDashboard />

          </ProtectedRoute>
        ),
      },

      // COMMON ROUTES

      {
        path: "messages",

        element: (
          <ProtectedRoute>

            <Messages />

          </ProtectedRoute>
        ),
      },

      {
        path: "profile",

        element: (
          <ProtectedRoute>

            <Profile />

          </ProtectedRoute>
        ),
      },

    ],
  },

]);

export default router;