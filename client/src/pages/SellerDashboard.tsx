import { useEffect, useState } from "react";

import axios from "axios";

import {

  Package,

  IndianRupee,

  ShoppingBag,

  Eye,

} from "lucide-react";

const SellerDashboard = () => {

  const [stats, setStats] =

    useState({

      totalListings: 0,

      activeProducts: 0,

      soldProducts: 0,

      totalRevenue: 0,

      totalViews: 0,

    });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const token =

        localStorage.getItem(

          "token"

        );

      const { data } =

        await axios.get(

          "http://localhost:5000/api/products/seller/stats",

          {

            headers: {

              Authorization:

                `Bearer ${token}`,

            },

          }

        );

      setStats(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-3xl p-10 shadow-xl mb-10">

          <h1 className="text-5xl font-bold">

            Seller Dashboard 📈

          </h1>

          <p className="mt-3 text-lg text-blue-100">

            Track your listings,

            sales and performance.

          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow">

            <Package

              size={38}

              className="text-blue-600"

            />

            <h2 className="text-4xl font-bold mt-4">

              {stats.totalListings}

            </h2>

            <p className="text-gray-500 mt-2">

              Total Listings

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <Package

              size={38}

              className="text-green-600"

            />

            <h2 className="text-4xl font-bold mt-4">

              {stats.activeProducts}

            </h2>

            <p className="text-gray-500 mt-2">

              Active Products

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <ShoppingBag

              size={38}

              className="text-purple-600"

            />

            <h2 className="text-4xl font-bold mt-4">

              {stats.soldProducts}

            </h2>

            <p className="text-gray-500 mt-2">

              Sold Products

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <IndianRupee

              size={38}

              className="text-emerald-600"

            />

            <h2 className="text-4xl font-bold mt-4">

              ₹{stats.totalRevenue.toLocaleString()}

            </h2>

            <p className="text-gray-500 mt-2">

              Revenue

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <Eye

              size={38}

              className="text-orange-500"

            />

            <h2 className="text-4xl font-bold mt-4">

              {stats.totalViews}

            </h2>

            <p className="text-gray-500 mt-2">

              Total Views

            </p>

          </div>

        </div>

        {/* QUICK INSIGHTS */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl p-8 shadow">

            <h3 className="text-2xl font-bold">

              🚀 Growth

            </h3>

            <p className="text-gray-500 mt-4">

              Keep adding products

              regularly to increase

              visibility.

            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow">

            <h3 className="text-2xl font-bold">

              💰 Revenue

            </h3>

            <p className="text-gray-500 mt-4">

              Track how much money

              you've earned.

            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow">

            <h3 className="text-2xl font-bold">

              👀 Reach

            </h3>

            <p className="text-gray-500 mt-4">

              More views = higher

              chances of selling.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default SellerDashboard;