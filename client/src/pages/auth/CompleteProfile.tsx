import Select from "react-select";
import colleges from "../../data/colleges.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import API from "../../config/api";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { user, login, token } = useAuth();

  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"Buyer" | "Seller">("Buyer");
  const [loading, setLoading] = useState(false);

  const handleCollegeChange = (selected: any) => {
    if (!selected) { setCollege(""); setState(""); setCity(""); return; }
    const found = (colleges as any[]).find(c => c.name === selected.value);
    if (!found) return;
    setCollege(found.name);
    setState(found.state);
    setCity(found.city);
  };

  const handleSubmit = async () => {
    if (!phone || !college || !city || !state) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(
        API.COMPLETE_PROFILE,
        { phone, college, city, state, role, profileCompleted: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(res.data.user, token || undefined);
      toast.success("Profile completed! Welcome to CampusCart 🎉");
      navigate("/home");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #FFF8E5, #FFFDF8)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px",
    }}>
      <div style={{
        width: "100%", maxWidth: "520px",
        background: "#fff", borderRadius: "24px",
        padding: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
        border: "1px solid #F3F4F6",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "18px",
            background: "#FFF3DB", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px",
          }}>
            <CheckCircle size={32} style={{ color: "#F3A847" }} />
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#111827", margin: 0 }}>
            Complete Your Profile
          </h1>
          <p style={{ color: "#6B7280", marginTop: "8px", fontSize: "14px", lineHeight: 1.6 }}>
            Welcome{user?.name ? `, ${user.name}` : ""}! Just a few more details to get you started on CampusCart.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Phone */}
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              maxLength={10}
              style={{
                width: "100%", height: "48px", borderRadius: "12px",
                border: "1.5px solid #E5E7EB", padding: "0 16px",
                fontSize: "15px", outline: "none", boxSizing: "border-box",
                background: "#FAFAFA", fontFamily: "inherit",
              }}
              onFocus={e => e.target.style.borderColor = "#F3A847"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>

          {/* College Search */}
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
              College *
            </label>
            <Select
              options={(colleges as any[]).map(c => ({
                label: `${c.name}, ${c.city}, ${c.state}`,
                value: c.name,
              }))}
              placeholder="Search your college..."
              value={college ? { label: `${college}, ${city}, ${state}`, value: college } : null}
              onChange={handleCollegeChange}
              isSearchable
              styles={{
                control: (base, state) => ({
                  ...base, height: 48, borderRadius: 12,
                  borderColor: state.isFocused ? "#F3A847" : "#E5E7EB",
                  boxShadow: state.isFocused ? "0 0 0 3px rgba(243,168,71,0.2)" : "none",
                  background: "#FAFAFA", paddingLeft: 4,
                  "&:hover": { borderColor: "#F3A847" },
                }),
                menu: base => ({ ...base, borderRadius: 12, zIndex: 9999, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }),
                option: (base, state) => ({
                  ...base, padding: "12px 14px",
                  background: state.isFocused ? "#FFF7D7" : "#fff",
                  color: "#222", cursor: "pointer",
                }),
              }}
              noOptionsMessage={() => "College not found"}
            />
          </div>

          {/* Auto State + City */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>State</label>
              <input
                value={state} readOnly placeholder="Auto-filled"
                style={{
                  width: "100%", height: "48px", borderRadius: "12px",
                  border: "1.5px solid #E5E7EB", padding: "0 14px",
                  fontSize: "14px", background: "#F9FAFB", color: "#374151",
                  boxSizing: "border-box", cursor: "not-allowed",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>City</label>
              <input
                value={city} readOnly placeholder="Auto-filled"
                style={{
                  width: "100%", height: "48px", borderRadius: "12px",
                  border: "1.5px solid #E5E7EB", padding: "0 14px",
                  fontSize: "14px", background: "#F9FAFB", color: "#374151",
                  boxSizing: "border-box", cursor: "not-allowed",
                }}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "8px" }}>
              I want to use CampusCart as *
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {(["Buyer", "Seller"] as const).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    height: "52px", borderRadius: "12px", border: "2px solid",
                    borderColor: role === r ? "#F3A847" : "#E5E7EB",
                    background: role === r ? "#FFF3DB" : "#fff",
                    color: "#111827", fontWeight: 700, fontSize: "15px",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {r === "Buyer" ? "🛒 Buyer" : "🏷️ Seller"}
                </button>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>
              {role === "Buyer" ? "Browse and buy products from your college" : "List and sell your products to college students"}
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", height: "52px", borderRadius: "12px",
              background: loading ? "#9CA3AF" : "#F3A847",
              color: "#111", fontWeight: 800, fontSize: "16px",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s", marginTop: "4px",
              boxShadow: "0 4px 16px rgba(243,168,71,0.35)",
            }}
          >
            {loading ? "Saving..." : "Complete Profile →"}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", marginTop: "20px" }}>
          You can update your profile details later from your account settings.
        </p>
      </div>
    </div>
  );
};

export default CompleteProfile;