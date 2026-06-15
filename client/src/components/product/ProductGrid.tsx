import { useProducts } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products } = useProducts();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.slice(0, 8).map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;