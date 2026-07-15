import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Package,
  MapPin,
  Building2,
  Globe2,
  ArrowUpRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/product/ProductCard";

const categories = [
  "All",
  "Electronics",
  "Books & Notes",
  "Calculators",
  "Bags",
  "Fashion",
  "Hostel Essentials",
  "Lab Equipment",
];

type LocationFilter = "city" | "college" | "all";

const Products = () => {
  const { user } = useAuth();
  const {
    products,
    fetchProducts,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  // sortBy / showSold are kept as-is (unchanged default behavior in filtering logic below).
  // Their UI controls have been removed per request — logic and defaults are untouched.
  const [sortBy] = useState("latest");
  const [showSold] = useState(false);

  const [locationFilter, setLocationFilter] = useState<LocationFilter>("city");

  useEffect(() => {
    fetchProducts(locationFilter);
  }, [locationFilter]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    data = data.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.seller?.name?.toLowerCase().includes(query) ||
        product.college?.toLowerCase().includes(query) ||
        product.campus?.toLowerCase().includes(query) ||
        product.condition?.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ? true : product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (!showSold) {
      data = data.filter((item) => !item.isSold);
    }

    switch (sortBy) {
      case "low":
        data.sort((a, b) => a.price - b.price);
        break;
      case "high":
        data.sort((a, b) => b.price - a.price);
        break;
      case "views":
        data.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return data;
  }, [products, search, category, sortBy, showSold]);

  const locationOptions: { key: LocationFilter; label: string; icon: typeof MapPin }[] = [
    { key: "city", label: "My City", icon: MapPin },
    { key: "college", label: "My College", icon: Building2 },
    { key: "all", label: "All India", icon: Globe2 },
  ];

  const locationLabel =
    locationFilter === "city"
      ? `${user?.city || "your city"}`
      : locationFilter === "college"
      ? `${user?.college || "your college"}`
      : "all of India";

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    background: "#FFF2CC",
    borderRadius: "999px",
    padding: "6px 16px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#C47F00",
    letterSpacing: "0.4px",
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: "38px",
    fontWeight: 900,
    color: "#111827",
    margin: "10px 0 0",
    letterSpacing: "-1px",
    lineHeight: 1.1,
  };

  const sectionSubStyle: React.CSSProperties = {
    fontSize: "15px",
    color: "#94A3B8",
    marginTop: "6px",
  };

  return (
    // No min-height/height/overflow-hidden anywhere — page height comes purely from content.
    <div style={{ backgroundColor: "#FAFAFA", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #FFF8EA 0%, #FFFDF8 55%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "56px",
        paddingBottom: "56px",
      }}>
        <div style={{
          position: "absolute", right: "-60px", top: "-40px",
          height: "500px", width: "500px", borderRadius: "50%",
          background: "#FFE5A2", opacity: 0.32, filter: "blur(120px)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: "1360px", margin: "0 auto", padding: "0 48px",
          display: "flex", flexWrap: "wrap", alignItems: "flex-end",
          justifyContent: "space-between", gap: "32px",
        }}>
          <div>
            <span style={badgeStyle}>✦ Campus Marketplace</span>

            <h1 style={{
              fontSize: "48px", lineHeight: "1.08", fontWeight: 900,
              color: "#111827", margin: "16px 0 0", letterSpacing: "-1.5px",
            }}>
              Discover Amazing Deals
            </h1>

            <p style={{
              fontSize: "16px", color: "#64748B", lineHeight: "1.75",
              maxWidth: "480px", margin: "14px 0 0",
            }}>
              Buy and sell books, electronics, calculators, hostel essentials and much more from verified students across your campus.
            </p>
          </div>

          {!user ? (
            <div style={{
              display: "flex", alignItems: "center", gap: "14px",
              background: "#fff", border: "1px solid #E8E2D9",
              borderRadius: "14px", padding: "18px 22px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)", flexShrink: 0,
            }}>
              <span style={{ fontSize: "22px" }}>👋</span>
              <div>
                <p style={{ margin: 0, fontWeight: 800, fontSize: "13.5px", color: "#111827" }}>Guest Mode</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94A3B8" }}>Login to wishlist & chat with sellers</p>
              </div>
            </div>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", gap: "14px",
              background: "#fff", border: "1px solid #E8E2D9",
              borderRadius: "14px", padding: "18px 22px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)", flexShrink: 0,
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "40px", width: "40px", borderRadius: "10px", background: "#FFF2CC",
              }}>
                <Package size={18} color="#C47F00" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#C47F00", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                  Live on CampusCart
                </p>
                <p style={{ margin: "2px 0 0", fontSize: "26px", fontWeight: 900, color: "#111827", lineHeight: 1 }}>
                  {products.length}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94A3B8" }}>listings currently available near you</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SEARCH + LOCATION FILTERS ONLY — sort dropdown, show-sold toggle,
          and the count badge have been removed per request ── */}
      <section style={{ background: "#ffffff", padding: "48px 0" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <Search
              size={18}
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books, laptops, bags..."
              style={{
                height: "52px", width: "100%", borderRadius: "12px",
                border: "1px solid #E8E2D9", background: "#FAFAFA",
                paddingLeft: "46px", paddingRight: "16px", fontSize: "15px",
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Location toggle */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginTop: "18px" }}>
            <span style={{ fontSize: "11.5px", fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.4px" }}>
              Browse
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#F1EFE7", borderRadius: "10px", padding: "4px" }}>
              {locationOptions.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setLocationFilter(key)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    whiteSpace: "nowrap", borderRadius: "8px", padding: "8px 14px",
                    fontSize: "12.5px", fontWeight: 700, border: "none", cursor: "pointer",
                    background: locationFilter === key ? "#fff" : "transparent",
                    color: locationFilter === key ? "#111827" : "#94A3B8",
                    boxShadow: locationFilter === key ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#C47F00" }}>
              📍 Showing products from {locationLabel}
            </span>
          </div>
        </div>
      </section>

      {/* ── CATEGORY CHIPS — filtering only, never affects grid layout ── */}
      <section style={{ background: "#ffffff", borderTop: "1px solid #F1EFE7", borderBottom: "1px solid #F1EFE7", padding: "24px 0" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                style={{
                  flexShrink: 0, borderRadius: "999px", padding: "8px 20px",
                  fontSize: "13.5px", fontWeight: 700, cursor: "pointer",
                  border: category === item ? "none" : "1px solid #E8E2D9",
                  background: category === item ? "#232F3E" : "#fff",
                  color: category === item ? "#fff" : "#374151",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID —
          Fixed responsive column classes only (grid-cols-1 / sm:2 / lg:3 / xl:4).
          No auto-fit/minmax, so cards never stretch and a single filtered result
          stays the same width as any other card, aligned to the left. ── */}
      <section style={{ background: "#F8F8F8", padding: "64px 0" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span style={badgeStyle}>Available Now</span>
              <h2 style={sectionHeadingStyle}>Available Products</h2>
              <p style={sectionSubStyle}>Fresh listings from students near you.</p>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{
              borderRadius: "20px", border: "1px dashed #E8E2D9", background: "#fff",
              padding: "80px 24px", textAlign: "center",
            }}>
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>📦</div>
              <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#111827", margin: 0 }}>
                No Products Found
              </h2>
              <p style={{ margin: "8px auto 0", maxWidth: "480px", fontSize: "15px", color: "#64748B" }}>
                We couldn't find anything matching your search.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                style={{
                  marginTop: "24px", borderRadius: "12px", border: "none",
                  background: "#232F3E", color: "#fff", fontWeight: 800,
                  fontSize: "14px", padding: "12px 28px", cursor: "pointer",
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#232F3E", padding: "60px 0", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", right: 0, top: 0, height: "300px", width: "300px",
          borderRadius: "50%", background: "rgba(243,168,71,0.07)",
          filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{
          maxWidth: "1360px", margin: "0 auto", padding: "0 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "40px", flexWrap: "wrap",
        }}>
          <div>
            <h2 style={{ fontSize: "38px", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-1px", lineHeight: 1.15 }}>
              Didn't Find What<br />You Need?
            </h2>
            <p style={{ fontSize: "15px", color: "#94A3B8", marginTop: "12px", maxWidth: "480px", lineHeight: 1.75 }}>
              Thousands of products are listed every semester by verified students. Keep exploring, or become a seller and earn from items you no longer use.
            </p>
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", flexShrink: 0 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#F3A847", color: "#111", fontWeight: 800, fontSize: "15px",
                padding: "15px 36px", borderRadius: "12px", border: "none", cursor: "pointer",
                boxShadow: "0 6px 20px rgba(243,168,71,0.28)",
              }}
            >
              Back To Top <ArrowUpRight size={16} />
            </button>

            {user?.role === "Seller" && (
              <button
                onClick={() => (window.location.href = "/add-product")}
                style={{
                  display: "inline-block", border: "2px solid rgba(255,255,255,0.50)",
                  color: "#fff", fontWeight: 800, fontSize: "15px",
                  padding: "13px 34px", borderRadius: "12px", background: "transparent",
                  cursor: "pointer",
                }}
              >
                Sell a Product
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;