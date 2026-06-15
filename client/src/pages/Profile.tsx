import {
  User,
  Heart,
  ShoppingBag,
  Package,
  CheckCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { useProducts } from "../context/ProductContext";

const Profile = () => {

  const { user } =
    useAuth();

  const { products } =
    useProducts();

  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Please Login

      </div>

    );

  }

  const wishlistIds = JSON.parse(

    localStorage.getItem(

      "campuscart-wishlist"

    ) || "[]"

  );

  const myProducts =

    products.filter(

      (p) =>

        p.seller?._id ===

        user._id

    );

  const myPurchases =

    products.filter(

      (p) =>

        p.buyer?._id ===

        user._id

    );

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl text-white p-10 shadow-xl">

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-white text-indigo-700 flex items-center justify-center text-5xl font-bold">

              {user.name.charAt(0)}

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                {user.name}

              </h1>

              <p className="mt-2 text-blue-100">

                {user.email}

              </p>

              <div className="mt-4 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full w-fit">

                <CheckCircle size={18} />

                Verified Student

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-3xl p-6 shadow">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">

                  Wishlist

                </p>

                <h2 className="text-4xl font-bold mt-2">

                  {wishlistIds.length}

                </h2>

              </div>

              <Heart size={40} className="text-red-500" />

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">

                  Purchases

                </p>

                <h2 className="text-4xl font-bold mt-2">

                  {myPurchases.length}

                </h2>

              </div>

              <ShoppingBag size={40} className="text-green-600" />

            </div>

          </div>

          {user.role === "Seller" && (

            <div className="bg-white rounded-3xl p-6 shadow">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">

                    Listings

                  </p>

                  <h2 className="text-4xl font-bold mt-2">

                    {myProducts.length}

                  </h2>

                </div>

                <Package size={40} className="text-blue-600" />

              </div>

            </div>

          )}

          <div className="bg-white rounded-3xl p-6 shadow">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">

                  Role

                </p>

                <h2 className="text-2xl font-bold mt-2">

                  {user.role}

                </h2>

              </div>

              <User size={40} className="text-purple-600" />

            </div>

          </div>

        </div>

        {/* DETAILS */}

        <div className="bg-white rounded-3xl p-10 shadow mt-10">

          <h2 className="text-3xl font-bold mb-8">

            Personal Information

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-gray-500">

                Name

              </p>

              <h3 className="font-semibold text-xl">

                {user.name}

              </h3>

            </div>

            <div>

              <p className="text-gray-500">

                Email

              </p>

              <h3 className="font-semibold text-xl">

                {user.email}

              </h3>

            </div>

            <div>

              <p className="text-gray-500">

                College

              </p>

              <h3 className="font-semibold text-xl">

                {user.college}

              </h3>

            </div>

            <div>

              <p className="text-gray-500">

                Campus

              </p>

              <h3 className="font-semibold text-xl">

                {user.campus}

              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;