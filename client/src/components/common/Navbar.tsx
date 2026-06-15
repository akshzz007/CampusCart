import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  Search,
  Heart,
  PlusCircle,
  User,
  MessageCircle,
  Package,
  LogOut,
  BarChart3,
  ShoppingBag,
} from "lucide-react";

const Navbar = () => {

  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between gap-6">

          {/* LOGO */}

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >

            CampusCart

          </Link>

          {/* SEARCH */}

          {user && (

            <div className="hidden md:flex flex-1 max-w-lg relative">

              <Search
                size={18}

                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"

                placeholder="Search products..."

                className="w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          )}

          {/* NAV */}

          <div className="flex items-center gap-5">

            <Link
              to="/"

              className="text-sm font-medium hover:text-blue-600"
            >

              Home

            </Link>

            <Link
              to="/products"

              className="text-sm font-medium hover:text-blue-600"
            >

              Products

            </Link>

            {/* GUEST */}

            {!user && (

              <>

                <Link
                  to="/login"

                  className="font-medium hover:text-blue-600"
                >

                  Login

                </Link>

                <Link
                  to="/signup"

                  className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
                >

                  Signup

                </Link>

              </>

            )}

            {/* BUYER */}

            {user?.role === "Buyer" && (

              <>

                <Link
                  to="/messages"

                  className="hover:text-blue-600"
                >

                  <MessageCircle size={22} />

                </Link>

                <Link
                  to="/wishlist"

                  className="hover:text-red-500"
                >

                  <Heart size={22} />

                </Link>

                <Link
                  to="/purchases"

                  className="hover:text-green-600"
                >

                  <ShoppingBag size={22} />

                </Link>

                <Link
                  to="/profile"

                  className="hover:text-blue-600"
                >

                  <User size={22} />

                </Link>

                <button
                  onClick={handleLogout}

                  className="hover:text-red-600"
                >

                  <LogOut size={22} />

                </button>

              </>

            )}

            {/* SELLER */}

            {user?.role === "Seller" && (

              <>

                <Link
                  to="/messages"

                  className="hover:text-blue-600"
                >

                  <MessageCircle size={22} />

                </Link>

                <Link
                  to="/add-product"

                  className="hover:text-green-600"
                >

                  <PlusCircle size={22} />

                </Link>

                <Link
                  to="/my-listings"

                  className="hover:text-indigo-600"
                >

                  <Package size={22} />

                </Link>

                <Link
                  to="/seller-dashboard"

                  className="hover:text-purple-600"
                >

                  <BarChart3 size={22} />

                </Link>

                <Link
                  to="/profile"

                  className="hover:text-blue-600"
                >

                  <User size={22} />

                </Link>

                <button
                  onClick={handleLogout}

                  className="hover:text-red-600"
                >

                  <LogOut size={22} />

                </button>

              </>

            )}

          </div>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;