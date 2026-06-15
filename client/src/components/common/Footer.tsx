import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Footer = () => {

  const { user } =
    useAuth();

  return (

    <footer className="bg-slate-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}

          <div>

            <h2 className="text-3xl font-bold">

              CampusCart

            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">

              India's trusted student marketplace.

              Buy and sell products safely

              inside your college community.

            </p>

          </div>

          {/* EXPLORE */}

          <div>

            <h3 className="font-bold text-xl mb-4">

              Explore

            </h3>

            <div className="space-y-3 text-gray-400">

              <Link

                to="/"

                className="block hover:text-white"

              >

                Home

              </Link>

              <Link

                to="/products"

                className="block hover:text-white"

              >

                Browse Products

              </Link>

            </div>

          </div>

          {/* BUYER */}

          {user?.role === "Buyer" && (

            <div>

              <h3 className="font-bold text-xl mb-4">

                Buyer

              </h3>

              <div className="space-y-3 text-gray-400">

                <Link

                  to="/wishlist"

                  className="block hover:text-white"

                >

                  Wishlist

                </Link>

                <Link

                  to="/messages"

                  className="block hover:text-white"

                >

                  Messages

                </Link>

                <Link

                  to="/purchases"

                  className="block hover:text-white"

                >

                  Purchases

                </Link>

              </div>

            </div>

          )}

          {/* SELLER */}

          {user?.role === "Seller" && (

            <div>

              <h3 className="font-bold text-xl mb-4">

                Seller

              </h3>

              <div className="space-y-3 text-gray-400">

                <Link

                  to="/add-product"

                  className="block hover:text-white"

                >

                  Add Product

                </Link>

                <Link

                  to="/my-listings"

                  className="block hover:text-white"

                >

                  My Listings

                </Link>

                <Link

                  to="/seller-dashboard"

                  className="block hover:text-white"

                >

                  Dashboard

                </Link>

              </div>

            </div>

          )}

          {/* SUPPORT */}

          <div>

            <h3 className="font-bold text-xl mb-4">

              Support

            </h3>

            <div className="space-y-3 text-gray-400">

              <p>

                Help Center

              </p>

              <p>

                Privacy Policy

              </p>

              <p>

                Terms & Conditions

              </p>

              <p>

                Contact Us

              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">

            © 2026 CampusCart

          </p>

          <p className="text-gray-500 mt-3 md:mt-0">

            Built for Students ❤️

          </p>

        </div>

      </div>

    </footer>

  );

};

export default Footer;