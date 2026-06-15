import { useParams, Link, useNavigate } from "react-router-dom";

import { useProducts } from "../context/ProductContext";

import { useAuth } from "../context/AuthContext";

import {
  MapPin,
  ShieldCheck,
  MessageCircle,
  Flag,
} from "lucide-react";

const ProductDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    products,
    getProductById,
    markProductSold,
  } = useProducts();

  if (products.length === 0) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }

  const product =
    getProductById(id || "");

  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Product Not Found

      </div>

    );

  }

  const isSeller =

    user?._id ===
    product.seller?._id;

  const handleBuyNow = async () => {

    if (!user) {

      navigate("/login");

      return;

    }

    const confirmBuy =

      window.confirm(

        `Buy ${product.title} for ₹${product.price}?`

      );

    if (!confirmBuy)

      return;

    try {

      await markProductSold(

        product._id,

        product.price,

        user._id

      );

      alert(

        "Purchase successful 🎉"

      );

      navigate("/purchases");

    } catch (error) {

      console.log(error);

      alert(

        "Purchase failed"

      );

    }

  };

  const similarProducts =

    products.filter(

      (p) =>

        p.category ===
          product.category &&

        p._id !==
          product._id &&

        !p.isSold

    );

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-2 gap-14">

        {/* IMAGE */}

        <div>

          <img

            src={
              product.images?.[0] ||

              "/logo.png"

            }

            alt={product.title}

            className="w-full h-[550px] rounded-3xl object-cover shadow-xl"

          />

        </div>

        {/* DETAILS */}

        <div>

          <div className="flex gap-3 mb-5">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

              {product.category}

            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

              {product.condition}

            </span>

          </div>

          <h1 className="text-5xl font-bold">

            {product.title}

          </h1>

          <p className="text-5xl text-green-600 font-bold mt-6">

            ₹{product.price.toLocaleString()}

          </p>

          <div className="flex items-center gap-2 mt-5 text-gray-500">

            <MapPin size={18} />

            {product.campus}

          </div>

          <p className="mt-8 text-lg text-gray-600">

            {product.description}

          </p>

          {/* SELLER */}

          <div className="bg-white shadow rounded-3xl p-6 mt-10">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold">

                {product.seller?.name?.charAt(0)}

              </div>

              <div>

                <h3 className="font-bold text-xl">

                  {product.seller?.name}

                </h3>

                <p className="text-gray-500">

                  {product.seller?.campus}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 mt-4 text-green-600">

              <ShieldCheck size={18} />

              Verified Student

            </div>

          </div>

          {/* BUYER ACTIONS */}

          {!isSeller && !product.isSold && (

            <div className="grid md:grid-cols-2 gap-4 mt-8">

              <Link

                to={`/messages?seller=${product.seller._id}&product=${product._id}`}

                className="flex justify-center items-center gap-2 bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700"

              >

                <MessageCircle size={20} />

                Message Seller

              </Link>

              <button

                onClick={handleBuyNow}

                className="bg-green-600 text-white py-4 rounded-2xl font-semibold hover:bg-green-700"

              >

                Buy Now

              </button>

            </div>

          )}

          {/* YOUR PRODUCT */}

          {isSeller && (

            <div className="mt-8 bg-indigo-100 text-indigo-700 p-5 rounded-2xl font-semibold">

              This is your product 👑

            </div>

          )}

          {/* SOLD */}

          {product.isSold && (

            <div className="mt-8 bg-green-100 text-green-700 p-5 rounded-2xl font-semibold">

              Product Sold ✅

            </div>

          )}

          <button className="flex gap-2 mt-6 text-red-500">

            <Flag size={18} />

            Report Listing

          </button>

        </div>

      </div>

      {/* SIMILAR PRODUCTS */}

      {similarProducts.length > 0 && (

        <div className="mt-24">

          <h2 className="text-3xl font-bold mb-8">

            Similar Products

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {similarProducts.map(

              (item) => (

                <Link

                  key={item._id}

                  to={`/product/${item._id}`}

                  className="bg-white rounded-3xl shadow overflow-hidden"

                >

                  <img

                    src={

                      item.images?.[0] ||

                      "/logo.png"

                    }

                    alt={item.title}

                    className="h-56 w-full object-cover"

                  />

                  <div className="p-4">

                    <h3 className="font-semibold">

                      {item.title}

                    </h3>

                    <p className="text-green-600 font-bold mt-2">

                      ₹{item.price.toLocaleString()}

                    </p>

                  </div>

                </Link>

              )

            )}

          </div>

        </div>

      )}

    </div>

  );

};

export default ProductDetail;