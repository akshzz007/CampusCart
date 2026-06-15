import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import ProductGrid from "../components/product/ProductGrid";

const categories = [
  {
    icon: "💻",
    name: "Electronics",
  },

  {
    icon: "📚",
    name: "Books & Notes",
  },

  {
    icon: "🧮",
    name: "Calculators",
  },

  {
    icon: "🎒",
    name: "Bags",
  },

  {
    icon: "🛏",
    name: "Hostel Essentials",
  },

  {
    icon: "🧪",
    name: "Lab Equipment",
  },
];

const Home = () => {

  const { user } = useAuth();

  return (

    <div>

      {/* HERO */}

      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-4xl">

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">

              Student Marketplace

              <br />

              Built For Campus Life 🚀

            </h1>

            <p className="text-lg md:text-xl mt-8 text-blue-100 max-w-2xl">

              Buy books, electronics, calculators,

              hostel essentials and connect with

              students inside your campus.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              {/* GUEST */}

              {!user && (

                <>

                  <Link

                    to="/products"

                    className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"

                  >

                    Explore Marketplace

                  </Link>

                  <Link

                    to="/signup"

                    className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-700 transition"

                  >

                    Become a Seller

                  </Link>

                </>

              )}

              {/* BUYER */}

              {user?.role === "Buyer" && (

                <>

                  <Link

                    to="/products"

                    className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"

                  >

                    Explore Products

                  </Link>

                  <Link

                    to="/wishlist"

                    className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-700 transition"

                  >

                    My Wishlist

                  </Link>

                </>

              )}

              {/* SELLER */}

              {user?.role === "Seller" && (

                <>

                  <Link

                    to="/add-product"

                    className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"

                  >

                    Sell Product

                  </Link>

                  <Link

                    to="/seller-dashboard"

                    className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-700 transition"

                  >

                    Dashboard

                  </Link>

                </>

              )}

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

            <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

              <h2 className="text-2xl font-bold">

                🔒

              </h2>

              <p className="text-blue-100 mt-2">

                Campus Safe

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

              <h2 className="text-2xl font-bold">

                🎓

              </h2>

              <p className="text-blue-100 mt-2">

                Student Verified

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

              <h2 className="text-2xl font-bold">

                💬

              </h2>

              <p className="text-blue-100 mt-2">

                Direct Chat

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

              <h2 className="text-2xl font-bold">

                💸

              </h2>

              <p className="text-blue-100 mt-2">

                Zero Commission

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">

            Popular Categories

          </h2>

          <Link

            to="/products"

            className="text-blue-600 font-semibold"

          >

            View All →

          </Link>

        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">

          {categories.map((item) => (

            <Link

              key={item.name}

              to="/products"

              className="bg-white rounded-3xl shadow-md hover:shadow-xl p-8 text-center font-semibold transition hover:-translate-y-1"

            >

              <div className="text-4xl mb-4">

                {item.icon}

              </div>

              {item.name}

            </Link>

          ))}

        </div>

      </section>

      {/* WHY */}

      <section className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">

            Why Students Choose CampusCart

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl p-8 shadow">

              <h3 className="text-2xl font-bold mb-4">

                🔒 Verified Students

              </h3>

              <p className="text-gray-600">

                Buy and sell safely inside your college network.

              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow">

              <h3 className="text-2xl font-bold mb-4">

                💬 Direct Negotiation

              </h3>

              <p className="text-gray-600">

                Chat with sellers instantly and negotiate.

              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow">

              <h3 className="text-2xl font-bold mb-4">

                ⚡ Quick Deals

              </h3>

              <p className="text-gray-600">

                Find nearby buyers and sellers faster.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">

            Featured Products

          </h2>

          <Link

            to="/products"

            className="text-blue-600 font-semibold"

          >

            View All →

          </Link>

        </div>

        <ProductGrid />

      </section>

    </div>

  );
};

export default Home;