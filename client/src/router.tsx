import { createBrowserRouter, Navigate } from "react-router-dom";
import ResetPassword from "./pages/auth/ResetPassword";
import AppLayout from "./components/layout/AppLayout";

import Home from "./pages/home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CompleteProfile from "./pages/auth/CompleteProfile";

import Wishlist from "./pages/Wishlist";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import SellerDashboard from "./pages/SellerDashboard";

import ProtectedRoute from "./components/protected/ProtectedRoute";

const hasSession = () =>
  !!(localStorage.getItem("token") || localStorage.getItem("campuscart-guest"));

const RootRedirect = () =>
  hasSession() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;

const router = createBrowserRouter([

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/complete-profile", element: <CompleteProfile /> },
  { path: "/", element: <RootRedirect /> },

{
  path: "/reset-password/:token",
  element: <ResetPassword />,
},

  {
    path: "/",
    element: <AppLayout />,
    children: [

      // PUBLIC
      { path: "home", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetail /> },

      // BUYER
      {
        path: "wishlist",
        element: <ProtectedRoute role="Buyer"><Wishlist /></ProtectedRoute>,
      },

      // SELLER
      {
        path: "add-product",
        element: <ProtectedRoute role="Seller"><AddProduct /></ProtectedRoute>,
      },
      {
        path: "my-listings",
        element: <ProtectedRoute role="Seller"><MyListings /></ProtectedRoute>,
      },
      {
        path: "seller-dashboard",
        element: <ProtectedRoute role="Seller"><SellerDashboard /></ProtectedRoute>,
      },

      // COMMON
      {
        path: "messages",
        element: <ProtectedRoute><Messages /></ProtectedRoute>,
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
    ],
  },

]);

export default router;