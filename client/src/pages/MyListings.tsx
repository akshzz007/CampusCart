import {
  Package,
  Trash2,
  IndianRupee,
  Plus,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

import ProductCard from "../components/product/ProductCard";

const MyListings = () => {
  const { user } = useAuth();

const {
  products,
  deleteProduct,
  markProductSold,
} = useProducts();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Please Login First
      </div>
    );
  }

  const myProducts =
    products.filter(
      (product) =>
        product.seller?._id ===
        user._id
    );
 console.log("USER =", user);
console.log("PRODUCTS =", products);
console.log("MY PRODUCTS =", myProducts); 

  const totalValue =
    myProducts.reduce(
      (sum, product) =>
        sum + product.price,
      0
    );

  const handleDelete =
    async (
      e: React.MouseEvent,
      productId: string
    ) => {
      e.preventDefault();

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProduct(
          productId
        );

        alert(
          "Product deleted successfully 🚀"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed to delete product"
        );
      }
    };   
   const handleSold = async (
  e: React.MouseEvent,
  productId: string,
  price: number
) => {

  e.preventDefault();

  try {

    const buyerId =
      prompt(
        "Paste Buyer ID"
      );

    if (!buyerId)
      return;

    await markProductSold(

      productId,

      price,

      buyerId

    );

    alert(
      "Product marked as sold ✅"
    );

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl mb-10">

          <h1 className="text-4xl font-bold">
            Seller Dashboard
          </h1>

          <p className="mt-3 text-white/90">
            Welcome back,
            {" "}
            {user.name}
          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-3xl p-6 shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total Listings
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {myProducts.length}
                </h2>

              </div>

              <Package
                size={40}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Inventory Value
                </p>

                <h2 className="text-4xl font-bold mt-2 text-green-600">
                  ₹
                  {totalValue.toLocaleString()}
                </h2>

              </div>

              <IndianRupee
                size={40}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <div>

              <p className="text-gray-500">
                Active Products
              </p>

              <h2 className="text-4xl font-bold mt-2 text-indigo-600">
                {myProducts.length}
              </h2>

            </div>

          </div>

        </div>

        {/* EMPTY STATE */}

        {myProducts.length === 0 ? (

          <div className="bg-white rounded-3xl p-16 text-center shadow">

            <h2 className="text-3xl font-bold">
              No Listings Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Add your first product and start selling on CampusCart.
            </p>

            <Link
              to="/add-product"
              className="inline-flex items-center gap-2 mt-8 bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Product
            </Link>

          </div>

        ) : (

          <div>

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                My Products
              </h2>

              <Link
                to="/add-product"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl hover:bg-indigo-700"
              >
                <Plus size={18} />
                Add Product
              </Link>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

             {myProducts.map(
  (product) => (
    <div
      key={product._id}
      className="relative"
    >
      <ProductCard
        product={product}
      />

      {!product.isSold && (
        <button
          onClick={(e) =>
            handleSold(
              e,
              product._id,
              product.price
            )
          }
          className="absolute top-3 right-3 bg-green-600 text-white px-3 py-2 rounded-xl shadow-lg hover:bg-green-700 z-20"
        >
          SOLD
        </button>
      )}

      {product.isSold && (
        <div className="absolute top-3 right-3 bg-black text-white px-3 py-2 rounded-xl shadow-lg z-20">
          SOLD ✓
        </div>
      )}

      <button
        onClick={(e) =>
          handleDelete(
            e,
            product._id
          )
        }
        className="absolute top-3 left-3 bg-red-500 text-white p-3 rounded-2xl shadow-lg hover:bg-red-600 z-20"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
)}
            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default MyListings;