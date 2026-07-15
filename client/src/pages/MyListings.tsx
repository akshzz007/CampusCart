import { Package, Trash2, IndianRupee, Plus, CheckCircle, TrendingUp, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/product/ProductCard";

// TASK 8 — Mark Sold Modal with real soldPrice
const SoldModal = ({
  product,
  onClose,
  onConfirm,
}: {
  product: any;
  onClose: () => void;
  onConfirm: (price: number) => void;
}) => {
  const [soldPrice, setSoldPrice] = useState(String(product.price));
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const price = Number(soldPrice);
    if (!price || price <= 0) { toast.error("Enter a valid sold price"); return; }
    setLoading(true);
    await onConfirm(price);
    setLoading(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "32px",
        width: "100%", maxWidth: "440px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#111827", margin: 0 }}>
            Complete Sale ✅
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ background: "#F9FAFB", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 4px" }}>Product</p>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{product.title}</p>
          <p style={{ fontSize: "14px", color: "#16A34A", fontWeight: 700, margin: "4px 0 0" }}>
            Listed at ₹{product.price.toLocaleString()}
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "8px" }}>
            Final Selling Price *
          </label>
          <p style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "8px" }}>
            If the buyer negotiated a lower price, enter the final agreed amount.
          </p>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontWeight: 700, color: "#374151", fontSize: "16px" }}>₹</span>
            <input
              type="number"
              value={soldPrice}
              onChange={e => setSoldPrice(e.target.value)}
              style={{
                width: "100%", height: "52px", borderRadius: "12px",
                border: "1.5px solid #E5E7EB", paddingLeft: "32px", paddingRight: "14px",
                fontSize: "20px", fontWeight: 700, outline: "none",
                boxSizing: "border-box", fontFamily: "inherit", color: "#16A34A",
              }}
              onFocus={e => e.target.style.borderColor = "#F3A847"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              height: "48px", borderRadius: "12px", border: "1.5px solid #E5E7EB",
              background: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer", color: "#374151",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            style={{
              height: "48px", borderRadius: "12px", border: "none",
              background: loading ? "#9CA3AF" : "#16A34A",
              color: "#fff", fontWeight: 700, fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Mark as Sold"}
          </button>
        </div>
      </div>
    </div>
  );
};

const MyListings = () => {
  const { user } = useAuth();
  const { products, deleteProduct, markProductSold } = useProducts();
  const [soldModal, setSoldModal] = useState<any>(null);

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#374151" }}>Please login first</h2>
          <Link to="/login" style={{ display: "inline-block", marginTop: "16px", background: "#F3A847", color: "#111", fontWeight: 700, padding: "12px 28px", borderRadius: "10px", textDecoration: "none" }}>Login</Link>
        </div>
      </div>
    );
  }

  const myProducts = products.filter(p => p.seller?._id === user._id);
  const activeProducts = myProducts.filter(p => !p.isSold);
  const soldProducts = myProducts.filter(p => p.isSold);
  const totalValue = activeProducts.reduce((sum, p) => sum + p.price, 0);
  // TASK 8 — Revenue = sum of soldPrice, not original price
  const totalRevenue = soldProducts.reduce((sum, p) => sum + (p.soldPrice || 0), 0);
  const totalViews = myProducts.reduce((sum, p) => sum + (p.views || 0), 0);

  const handleDelete = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    // TASK 1 — No window.confirm, use toast with action
    const id = toast.loading("Deleting product...");
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully", { id });
    } catch (error) {
      toast.error("Failed to delete product", { id });
    }
  };

  const handleSoldConfirm = async (price: number) => {
    const id = toast.loading("Marking as sold...");
    try {
      await markProductSold(soldModal._id, price);
      toast.success(`Product sold for ₹${price.toLocaleString()} ✅`, { id });
      setSoldModal(null);
    } catch (error) {
      toast.error("Failed to mark as sold", { id });
    }
  };

  const statCards = [
    { label: "Total Listings", value: myProducts.length, icon: <Package size={22} style={{ color: "#4F46E5" }} />, color: "#EEF2FF" },
    { label: "Active", value: activeProducts.length, icon: <TrendingUp size={22} style={{ color: "#16A34A" }} />, color: "#F0FDF4" },
    { label: "Inventory Value", value: `₹${totalValue.toLocaleString()}`, icon: <IndianRupee size={22} style={{ color: "#D97706" }} />, color: "#FFF7ED" },
    { label: "Revenue Earned", value: `₹${totalRevenue.toLocaleString()}`, icon: <IndianRupee size={22} style={{ color: "#7C3AED" }} />, color: "#F5F3FF" },
    { label: "Total Views", value: totalViews, icon: <Eye size={22} style={{ color: "#0EA5E9" }} />, color: "#F0F9FF" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", padding: "32px 0" }}>
      {soldModal && (
        <SoldModal
          product={soldModal}
          onClose={() => setSoldModal(null)}
          onConfirm={handleSoldConfirm}
        />
      )}

      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #232F3E 0%, #3D5A7A 100%)",
          borderRadius: "20px", padding: "28px 32px", marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#fff", margin: 0 }}>My Listings 📦</h1>
            <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "4px", fontSize: "14px" }}>
              {user.name} · {myProducts.length} product{myProducts.length !== 1 ? "s" : ""} listed
            </p>
          </div>
          <Link to="/add-product" style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#F3A847", color: "#111", fontWeight: 800,
            padding: "12px 22px", borderRadius: "12px", textDecoration: "none", fontSize: "14px",
          }}>
            <Plus size={18} /> Add Product
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "28px" }}>
          {statCards.map((stat, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "14px", padding: "18px 20px",
              border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: stat.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                {stat.icon}
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#111827", margin: 0 }}>{stat.value}</h2>
              <p style={{ fontSize: "12px", color: "#6B7280", margin: "4px 0 0" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        {myProducts.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "20px", padding: "64px 20px", textAlign: "center", border: "2px dashed #E5E7EB" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>📦</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#374151", margin: 0 }}>No listings yet</h2>
            <p style={{ color: "#9CA3AF", marginTop: "8px", fontSize: "14px" }}>Start earning by listing your first product</p>
            <Link to="/add-product" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              marginTop: "20px", background: "#F3A847", color: "#111",
              fontWeight: 700, padding: "12px 24px", borderRadius: "12px", textDecoration: "none",
            }}>
              <Plus size={18} /> Add First Product
            </Link>
          </div>
        ) : (
          <>
  {/* Active Listings */}

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    }}
  >
    <h2
      style={{
        fontSize: "20px",
        fontWeight: 800,
        color: "#111827",
        margin: 0,
      }}
    >
      🟢 Active Listings
      <span
        style={{
          marginLeft: "10px",
          fontSize: "14px",
          fontWeight: 600,
          color: "#9CA3AF",
        }}
      >
        ({activeProducts.length})
      </span>
    </h2>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
    }}
  >
    {activeProducts.map((product) => (
      <div key={product._id} style={{ position: "relative" }}>
        <ProductCard product={product} />

        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            right: "12px",
            display: "flex",
            justifyContent: "space-between",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <button
            onClick={(e) => handleDelete(e, product._id)}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "#EF4444",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              pointerEvents: "all",
            }}
          >
            <Trash2 size={15} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              setSoldModal(product);
            }}
            style={{
              height: "34px",
              borderRadius: "8px",
              background: "#16A34A",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#fff",
              padding: "0 12px",
              fontSize: "12px",
              fontWeight: 700,
              pointerEvents: "all",
            }}
          >
            Mark Sold
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Sold Products */}

  {soldProducts.length > 0 && (
    <>
      <div
        style={{
          marginTop: "40px",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          ✅ Sold Products ({soldProducts.length})
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {soldProducts.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  )}
</>
        )}

      </div>
    </div>
  );
};

export default MyListings;