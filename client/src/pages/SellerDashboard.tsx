import API from "../config/api";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0, activeProducts: 0, soldProducts: 0, totalRevenue: 0, totalViews: 0,
  });

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(API.SELLER_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats({
        totalListings: data.totalListings || 0,
        activeProducts: data.activeProducts || 0,
        soldProducts: data.soldProducts || 0,
        totalRevenue: data.totalRevenue || 0,
        totalViews: data.totalViews || 0,
      });
    } catch (error) { console.log(error); }
    finally { setLoading(false); }
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "4px solid #F3A847", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#6B7280", fontWeight: 600 }}>Loading dashboard...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const mainStats = [
    { label: "Total Listings", value: stats.totalListings, icon: <Package size={22} style={{ color: "#4F46E5" }} />, color: "#EEF2FF" },
    { label: "Active Products", value: stats.activeProducts, icon: <TrendingUp size={22} style={{ color: "#16A34A" }} />, color: "#F0FDF4" },
    { label: "Sold Products", value: stats.soldProducts, icon: <ShoppingBag size={22} style={{ color: "#7C3AED" }} />, color: "#F5F3FF" },
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <IndianRupee size={22} style={{ color: "#D97706" }} />, color: "#FFF7ED", highlight: true },
   
  ];

const insights = [

  {
    icon: <TrendingUp size={20} style={{ color: "#16A34A" }} />,
    color: "#F0FDF4",

    title: "Selling Tips 🚀",

    desc:
      "Use clear product images, fair pricing and reply quickly to buyers."
  },

  {
    icon: <IndianRupee size={20} style={{ color: "#D97706" }} />,
    color: "#FFF7ED",

    title: "Revenue 💰",

    desc:
      `Total earnings: ₹${stats.totalRevenue.toLocaleString()}`
  },

  {
    icon: <ShoppingBag size={20} style={{ color: "#2563EB" }} />,
    color: "#EFF6FF",

    title: "Inventory 📦",

    desc:
      `${stats.activeProducts} Active • ${stats.soldProducts} Sold`
  }

];

  const conversionRate = stats.totalListings > 0 ? Math.round((stats.soldProducts / stats.totalListings) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", padding: "32px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{
         background: "#2C3643",
          borderRadius: "20px", padding: "28px 32px", marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#fff", margin: 0 }}>Seller Dashboard 📈</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", marginTop: "4px", fontSize: "14px" }}>
              Track your listings, sales and performance
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/add-product" style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "#F3A847", color: "#111", fontWeight: 800,
              padding: "11px 20px", borderRadius: "12px", textDecoration: "none", fontSize: "14px",
            }}>
              + Add Product
            </Link>
            <Link to="/my-listings" style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700,
              padding: "11px 20px", borderRadius: "12px", textDecoration: "none", fontSize: "14px",
            }}>
              My Listings <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "20px" }}>
          {mainStats.map((stat, i) => (
            <div key={i} style={{
              background: stat.highlight ? "linear-gradient(135deg, #16A34A, #15803D)" : "#fff",
              borderRadius: "14px", padding: "18px 20px",
              border: stat.highlight ? "none" : "1px solid #E5E7EB",
              boxShadow: stat.highlight ? "0 4px 20px rgba(22,163,74,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: stat.highlight ? "rgba(255,255,255,0.2)" : stat.color,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px",
              }}>
                {stat.highlight ? <IndianRupee size={22} style={{ color: "#fff" }} /> : stat.icon}
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: stat.highlight ? "#fff" : "#111827", margin: 0 }}>{stat.value}</h2>
              <p style={{ fontSize: "12px", color: stat.highlight ? "rgba(255,255,255,0.8)" : "#6B7280", margin: "4px 0 0" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Conversion Rate */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #E5E7EB", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <BarChart3 size={20} style={{ color: "#4F46E5" }} />
            <h3 style={{ fontWeight: 800, fontSize: "16px", color: "#111827", margin: 0 }}>Conversion Rate</h3>
            <span style={{ marginLeft: "auto", fontSize: "24px", fontWeight: 900, color: conversionRate > 50 ? "#16A34A" : conversionRate > 25 ? "#D97706" : "#4F46E5" }}>
             {stats.soldProducts}/{stats.totalListings}
            </span>
          </div>
          <div style={{ height: "10px", borderRadius: "999px", background: "#F3F4F6", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "999px",
              background: conversionRate > 50 ? "#16A34A" : conversionRate > 25 ? "#F3A847" : "#4F46E5",
              width: `${conversionRate}%`, transition: "width 0.6s ease",
            }} />
          </div>
          <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "8px" }}>
           You have sold {stats.soldProducts} out of {stats.totalListings} products.
          </p>
        </div>

        {/* Insights */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {insights.map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "22px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>{item.title}</h3>
              <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SellerDashboard;