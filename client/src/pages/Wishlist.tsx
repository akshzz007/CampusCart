import { useEffect, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import ProductCard, { getWishlistKey } from "../components/product/ProductCard";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { products } = useProducts();
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user?._id) return;
    const key = getWishlistKey(user._id);
    const saved = localStorage.getItem(key);
    if (saved) setWishlistIds(JSON.parse(saved));
  }, [user?._id]);

  const wishlistProducts = products.filter(p => wishlistIds.includes(p._id));

  const handleRemove = (id: string) => {
    setWishlistIds(prev => {
      const next = prev.filter(wid => wid !== id);
      if (user?._id) localStorage.setItem(getWishlistKey(user._id), JSON.stringify(next));
      return next;
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", padding: "32px 0" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>

        <div style={{
          background: "linear-gradient(135deg, #EC4899 0%, #EF4444 100%)",
          borderRadius: "20px", padding: "28px 32px", marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={26} style={{ color: "#fff", fill: "#fff" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#fff", margin: 0 }}>My Wishlist</h1>
              <p style={{ color: "rgba(255,255,255,0.8)", marginTop: "2px", fontSize: "14px" }}>All your favourite products in one place</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "12px", padding: "12px 20px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", margin: 0, fontWeight: 600 }}>SAVED</p>
            <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", margin: "2px 0 0" }}>{wishlistProducts.length}</h3>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", margin: 0 }}>Saved Products</h2>
            <p style={{ fontSize: "13px", color: "#9CA3AF", margin: "4px 0 0" }}>Products you've added to wishlist</p>
          </div>
          <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#F3A847", color: "#111", fontWeight: 700, padding: "9px 18px", borderRadius: "10px", textDecoration: "none", fontSize: "13px" }}>
            Browse More <ArrowRight size={15} />
          </Link>
        </div>

        {wishlistProducts.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "20px", padding: "64px 20px", textAlign: "center", border: "2px dashed #FCE7F3" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#FFF1F2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Heart size={32} style={{ color: "#EC4899" }} />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#374151", margin: 0 }}>Wishlist is Empty</h2>
            <p style={{ color: "#9CA3AF", marginTop: "8px", maxWidth: "360px", margin: "8px auto 0", fontSize: "14px", lineHeight: 1.6 }}>
              Browse products and click the heart icon to save your favourite items
            </p>
            <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "20px", background: "#F3A847", color: "#111", fontWeight: 700, padding: "12px 24px", borderRadius: "12px", textDecoration: "none" }}>
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {wishlistProducts.map(product => (
              <ProductCard key={product._id} product={product} onWishlistToggle={handleRemove} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;