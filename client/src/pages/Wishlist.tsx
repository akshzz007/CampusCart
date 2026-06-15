import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { useProducts } from "../context/ProductContext";

const Wishlist = () => {
  const { products } = useProducts();

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem(
      "campuscart-wishlist"
    );

    if (savedWishlist) {
      setWishlistIds(JSON.parse(savedWishlist));
    }
  }, []);

  const wishlistProducts = products.filter((product) =>
    wishlistIds.includes(product._id)
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-3xl p-8 text-white mb-10 shadow-xl">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-2xl">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                My Wishlist
              </h1>

              <p className="text-white/90 mt-2">
                All your favourite products in one place.
              </p>
            </div>

          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Saved Products
            </h2>

            <p className="text-gray-500">
              Products you've added to wishlist.
            </p>
          </div>

          <div className="bg-white px-6 py-4 rounded-2xl shadow border">
            <p className="text-sm text-gray-500">
              Total Saved
            </p>

            <h3 className="text-3xl font-bold text-pink-600">
              {wishlistProducts.length}
            </h3>
          </div>

        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 shadow-lg text-center">

            <div className="flex justify-center mb-5">
              <Heart
                size={70}
                className="text-pink-500"
              />
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Wishlist is Empty
            </h2>

            <p className="text-gray-500 max-w-md mx-auto">
              Browse products and click the heart icon
              to save your favourite items.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {wishlistProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Wishlist;