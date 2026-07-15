import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useProducts } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products } = useProducts();

  const featuredProducts = products.slice(0, 8);

  return (
    <section className="w-full">
      {featuredProducts.length === 0 && (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#E7E7E7] bg-white px-6 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-[#232F3E]">
            No Products Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Be the first student to list a product.
          </p>
        </div>
      )}

      {featuredProducts.length > 0 && (
        <>
          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product._id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {products.length > 8 && (
            <div className="mt-14 flex justify-center">
              <Link
                to="/products"
                className="group flex items-center gap-3 rounded-2xl bg-[#232F3E] px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#37475A] hover:shadow-xl"
              >
                View All Products

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductGrid;