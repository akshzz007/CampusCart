import type { Product } from "../../types";
import { Heart, CheckCircle2, User, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  product: Product;
  onWishlistToggle?: (id: string) => void;
}

const getWishlistKey = (userId: string) => `campuscart-wishlist-${userId}`;

const ProductCard = ({ product, onWishlistToggle }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    const key = getWishlistKey(user._id);
    const saved = localStorage.getItem(key);
    if (!saved) return;
    const ids: string[] = JSON.parse(saved);
    setIsWishlisted(ids.includes(product._id));
  }, [product._id, user?._id]);

  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated || !user) { navigate("/login"); return; }
    if (user.role !== "Buyer") return;

    const key = getWishlistKey(user._id);
    const saved = localStorage.getItem(key);
    let ids: string[] = saved ? JSON.parse(saved) : [];

    if (ids.includes(product._id)) {
      ids = ids.filter(id => id !== product._id);
      setIsWishlisted(false);
    } else {
      ids.push(product._id);
      setIsWishlisted(true);
    }
    localStorage.setItem(key, JSON.stringify(ids));
    onWishlistToggle?.(product._id);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-[#ECEAE4] bg-white shadow-[0_2px_10px_rgba(20,25,33,0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#F3A847]/50 hover:shadow-[0_22px_44px_rgba(35,47,62,0.13)]"
    >
      {/* IMAGE LAYER */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F6F5F1]">
        <img
          src={product.images?.[0] || "/logo.png"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* subtle top gradient so badges stay legible on bright photos */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent" />

        {/* Badges Layer */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          {!product.isSold ? (
            <span className="rounded-full bg-[#232F3E]/85 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase shadow-sm backdrop-blur-md">
              {product.condition}
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase shadow-sm">
              <CheckCircle2 size={10} /> Sold
            </span>
          )}

          {/* Wishlist Icon Button */}
          {user?.role === "Buyer" && (
            <button
              onClick={toggleWishlist}
              aria-label="Toggle Wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-500 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:text-red-500 active:scale-95"
            >
              <Heart
                size={15}
                className={isWishlisted ? "fill-red-500 text-red-500" : "transition-colors"}
              />
            </button>
          )}
        </div>
      </div>

      {/* CARD CONTENT BODY */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category Pill */}
        <span className="mb-2.5 w-fit rounded-md bg-[#FFF3DB] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#C88400]">
          {product.category}
        </span>

        {/* Title Heading */}
        <h3 className="line-clamp-1 text-[15.5px] font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-[#232F3E]">
          {product.title}
        </h3>

        {/* Description Paragraph */}
        <p className="mt-1.5 line-clamp-2 min-h-[32px] text-[12.5px] leading-relaxed text-gray-400">
          {product.description}
        </p>

        {/* Info & CTA Footer Section */}
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-50 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
              <User size={12} className="text-gray-400" />
            </div>
            <p className="truncate text-xs font-semibold text-gray-600">
              {product.seller?.name}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[11px] font-medium text-gray-400">
              {product.isSold ? "Sold For" : "Price"}
            </p>
            <p className="text-xl font-black tracking-tight text-[#232F3E]">
              ₹{product.isSold
                ? product.soldPrice?.toLocaleString()
                : product.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Button Segment */}
        {user?.role === "Buyer" && !product.isSold && (
          <button
            onClick={e => {
              e.preventDefault();
             navigate(
  `/messages?seller=${product.seller._id}&product=${product._id}&sellerName=${encodeURIComponent(
    product.seller.name
  )}&productTitle=${encodeURIComponent(product.title)}`
);

            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#232F3E]/10 bg-[#F7F7F5] py-2.5 text-xs font-bold text-gray-700 transition-all duration-200 hover:border-[#232F3E] hover:bg-[#232F3E] hover:text-white"
          >
            <MessageCircle size={13} />
            <span>Contact Seller</span>
          </button>
        )}
      </div>
    </Link>
  );
};

export { getWishlistKey };
export default ProductCard;