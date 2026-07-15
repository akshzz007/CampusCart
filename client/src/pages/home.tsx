import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductGrid from "../components/product/ProductGrid";
import CategorySlider from "../components/home/CategorySlider";
import heroStudent from "../assets/real/hero-student.png";
import verifiedIcon from "../assets/icons/verified.png";
import chatIcon from "../assets/icons/chat.png";
import exchangeIcon from "../assets/icons/exchange.png";
import moneyIcon from "../assets/icons/money.png";

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ backgroundColor: "#FAFAFA", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #FFF8EA 0%, #FFFDF8 55%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "56px",
        paddingBottom: "56px",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", right: "-60px", top: "-40px",
          height: "500px", width: "500px", borderRadius: "50%",
          background: "#FFE5A2", opacity: 0.32, filter: "blur(120px)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: "1360px", margin: "0 auto", padding: "0 48px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "48px", alignItems: "center",
        }}>
          {/* LEFT */}
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center",
              background: "#FFF2CC", borderRadius: "999px",
              padding: "6px 16px", fontSize: "12px", fontWeight: 700,
              color: "#C47F00", letterSpacing: "0.4px", marginBottom: "20px",
            }}>
              ✦ Trusted Student Marketplace
            </span>

            <h1 style={{
              fontSize: "72px", lineHeight: "1.0", fontWeight: 900,
              color: "#111827", margin: 0, letterSpacing: "-2.5px",
            }}>
              Buy.<br />Sell.<br />Exchange.
            </h1>

            <h2 style={{
              fontSize: "56px", lineHeight: "1.05", fontWeight: 900,
              color: "#F3A847", margin: "8px 0 0", letterSpacing: "-1.5px",
            }}>
              Inside Campus.
            </h2>

            <p style={{
              fontSize: "16px", color: "#64748B", lineHeight: "1.75",
              maxWidth: "400px", margin: "18px 0 0",
            }}>
              Buy books, electronics, calculators, hostel essentials and daily
              student needs directly from verified students inside your college community.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "28px" }}>
              {!user && (
                <>
                  <Link to="/products" style={{
                    display: "inline-block", background: "#F3A847", color: "#111",
                    fontWeight: 800, fontSize: "15px", padding: "13px 30px",
                    borderRadius: "12px", textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(243,168,71,0.38)",
                  }}>Browse Products</Link>
                  <Link to="/signup" style={{
                    display: "inline-block", border: "2px solid #F3A847",
                    color: "#F3A847", fontWeight: 800, fontSize: "15px",
                    padding: "11px 30px", borderRadius: "12px", textDecoration: "none",
                    background: "transparent",
                  }}>Join CampusCart</Link>
                </>
              )}
              {user?.role === "Buyer" && (
                <>
                  <Link to="/products" style={{
                    display: "inline-block", background: "#F3A847", color: "#111",
                    fontWeight: 800, fontSize: "15px", padding: "13px 30px",
                    borderRadius: "12px", textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(243,168,71,0.38)",
                  }}>Browse Products</Link>
                  <Link to="/wishlist" style={{
                    display: "inline-block", border: "2px solid #F3A847",
                    color: "#F3A847", fontWeight: 800, fontSize: "15px",
                    padding: "11px 30px", borderRadius: "12px", textDecoration: "none",
                    background: "transparent",
                  }}>My Wishlist</Link>
                </>
              )}
              {user?.role === "Seller" && (
                <>
                  <Link to="/add-product" style={{
                    display: "inline-block", background: "#F3A847", color: "#111",
                    fontWeight: 800, fontSize: "15px", padding: "13px 30px",
                    borderRadius: "12px", textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(243,168,71,0.38)",
                  }}>+ List a Product</Link>
                  <Link to="/seller-dashboard" style={{
                    display: "inline-block", border: "2px solid #F3A847",
                    color: "#F3A847", fontWeight: 800, fontSize: "15px",
                    padding: "11px 30px", borderRadius: "12px", textDecoration: "none",
                    background: "transparent",
                  }}>Dashboard</Link>
                </>
              )}
            </div>

            {/* Feature cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px", marginTop: "32px",
            }}>
              {[
                { icon: verifiedIcon, label: "Verified\nStudents" },
                { icon: chatIcon, label: "Instant\nChat" },
                { icon: moneyIcon, label: "Affordable\nDeals" },
                { icon: exchangeIcon, label: "Quick\nExchange" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#fff", border: "1px solid #E8E2D9",
                  borderRadius: "14px", padding: "16px 12px",
                  display: "flex", flexDirection: "column", gap: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <img src={item.icon} alt="" style={{ height: "36px", width: "36px", objectFit: "contain" }} />
                  <span style={{ fontWeight: 700, fontSize: "12px", color: "#1F2937", lineHeight: "1.35", whiteSpace: "pre-line" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — hero image */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              position: "absolute", height: "420px", width: "420px",
              borderRadius: "50%", background: "rgba(255,215,122,0.20)",
              filter: "blur(80px)", pointerEvents: "none",
            }} />
            <img src={heroStudent} alt="CampusCart Hero" style={{
              position: "relative", zIndex: 1,
              width: "100%", maxWidth: "580px",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12))",
            }} />
          </div>
        </div>
      </section>

      {/* ── POPULAR CATEGORIES ── */}
      <section style={{ background: "#ffffff", padding: "64px 0" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
            <div>
              <span style={{
                display: "inline-flex", background: "#FFF2CC", borderRadius: "999px",
                padding: "6px 16px", fontSize: "12px", fontWeight: 700, color: "#C47F00",
              }}>Browse Categories</span>
              <h2 style={{ fontSize: "38px", fontWeight: 900, color: "#111827", margin: "10px 0 0", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Popular Categories
              </h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", marginTop: "6px" }}>
                Everything students need inside one marketplace.
              </p>
            </div>
            <Link to="/products" style={{ color: "#F3A847", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
              View All →
            </Link>
          </div>
          <CategorySlider />
        </div>
      </section>

      {/* ── PROMO BAND ── */}
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
              Find Amazing Deals<br />Across Your Campus
            </h2>
            <p style={{ fontSize: "15px", color: "#94A3B8", marginTop: "12px", maxWidth: "480px", lineHeight: 1.75 }}>
              Browse thousands of verified books, laptops, calculators, bags, hostel essentials and much more from students around you.
            </p>
          </div>
          <Link to="/products" style={{
            display: "inline-block", background: "#F3A847", color: "#111",
            fontWeight: 800, fontSize: "15px", padding: "15px 36px",
            borderRadius: "12px", textDecoration: "none", flexShrink: 0,
            boxShadow: "0 6px 20px rgba(243,168,71,0.28)",
          }}>Explore Marketplace</Link>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ background: "#F8F8F8", padding: "64px 0" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
            <div>
              <span style={{
                display: "inline-flex", background: "#FFF2CC", borderRadius: "999px",
                padding: "6px 16px", fontSize: "12px", fontWeight: 700, color: "#C47F00",
              }}>Trending Products</span>
              <h2 style={{ fontSize: "38px", fontWeight: 900, color: "#111827", margin: "10px 0 0", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Featured Products
              </h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", marginTop: "6px" }}>
                Fresh listings uploaded by verified students.
              </p>
            </div>
            <Link to="/products" style={{ color: "#F3A847", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
              Browse All →
            </Link>
          </div>
          <ProductGrid />
        </div>
      </section>

      {/* ── WHY CAMPUSCART ── */}
      <section style={{ background: "#ffffff", padding: "64px 0" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{
              display: "inline-flex", background: "#FFF2CC", borderRadius: "999px",
              padding: "6px 16px", fontSize: "12px", fontWeight: 700, color: "#C47F00",
            }}>Why CampusCart</span>
            <h2 style={{ fontSize: "38px", fontWeight: 900, color: "#111827", margin: "10px 0 0", letterSpacing: "-1px" }}>
              Built For College Students
            </h2>
            <p style={{ fontSize: "15px", color: "#94A3B8", marginTop: "8px", maxWidth: "440px", margin: "8px auto 0", lineHeight: 1.75 }}>
              Safe buying. Easy selling. Quick exchange. Everything students need inside one trusted marketplace.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {[
              { icon: verifiedIcon, title: "Verified Students", desc: "Only verified students from your college can buy or sell products." },
              { icon: chatIcon, title: "Instant Chat", desc: "Connect directly with buyers and sellers without any middleman." },
              { icon: exchangeIcon, title: "Quick Exchange", desc: "Meet students nearby and complete product exchange quickly." },
              { icon: moneyIcon, title: "Zero Commission", desc: "No hidden fees. Buy and sell directly with confidence." },
            ].map((f, i) => (
              <div key={i} style={{
                background: "#FAFAFA", border: "1px solid #E8E2D9",
                borderRadius: "20px", padding: "32px 24px",
              }}>
                <img src={f.icon} alt="" style={{ height: "44px", width: "44px", objectFit: "contain" }} />
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", margin: "18px 0 8px" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.75, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #232F3E 0%, #34455E 100%)",
        padding: "80px 0", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: "-60px", top: "-60px",
          height: "400px", width: "400px", borderRadius: "50%",
          background: "rgba(243,168,71,0.07)", filter: "blur(100px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "620px", margin: "0 auto",
          padding: "0 40px", textAlign: "center",
        }}>
          <h2 style={{ fontSize: "52px", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-2px", lineHeight: 1.05 }}>
            Ready To Buy<br />Or Sell?
          </h2>
          <p style={{ fontSize: "16px", color: "#94A3B8", marginTop: "20px", lineHeight: 1.8 }}>
            Join thousands of students already using CampusCart to buy, sell and exchange books, laptops, calculators, hostel essentials, furniture and much more.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "36px" }}>
            <Link to="/products" style={{
              display: "inline-block", background: "#F3A847", color: "#111",
              fontWeight: 800, fontSize: "16px", padding: "15px 40px",
              borderRadius: "12px", textDecoration: "none",
            }}>Browse Products</Link>
            <Link to="/signup" style={{
              display: "inline-block", border: "2px solid rgba(255,255,255,0.50)",
              color: "#fff", fontWeight: 800, fontSize: "16px",
              padding: "13px 40px", borderRadius: "12px", textDecoration: "none",
              background: "transparent",
            }}>Create Account</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;