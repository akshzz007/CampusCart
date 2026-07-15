import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Tag, IndianRupee,  Package, ChevronDown, X, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [condition, setCondition] = useState("Good");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setLoading(true);
    try {
      const uploadedImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("upload_preset", "campuscart");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/ditgiezxh/image/upload",
          formData
        );
        uploadedImages.push(res.data.secure_url);
      }
      setImages(uploadedImages);
      setUploadSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed ❌");
    }
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      if (!title || !price || !description || images.length === 0) {
        toast.error("Please fill all fields and upload at least one image");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) { toast.error("Please login first"); return; }

      await axios.post(
  "http://localhost:5000/api/products",
  {
    title,
    description,
    price: Number(price),
    category,
    condition,
    images,
  },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product Listed Successfully 🚀");
      navigate("/products");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  const conditions = ["New", "Like New", "Good", "Used"];
  const categories = ["Electronics", "Books & Notes", "Calculators", "Bags", "Fashion", "Hostel Essentials", "Lab Equipment"];

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", padding: "32px 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#111827", margin: 0, letterSpacing: "-0.5px" }}>
            List Your Item 🚀
          </h1>
          <p style={{ color: "#64748B", marginTop: "6px", fontSize: "14px" }}>
            Fill in the details below to list your product on CampusCart
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", alignItems: "start" }}>

          {/* LEFT — Main form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Product Info */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FFF3DB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Tag size={16} style={{ color: "#C47F00" }} />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "16px", color: "#111827", margin: 0 }}>Product Information</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Product Title *
                  </label>
                  <input
                    placeholder="e.g. Engineering Mathematics Book by R.D. Sharma"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{
                      width: "100%", height: "46px", borderRadius: "10px",
                      border: "1.5px solid #E5E7EB", padding: "0 14px",
                      fontSize: "14px", outline: "none", boxSizing: "border-box",
                      background: "#FAFAFA", fontFamily: "inherit",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#F3A847"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Description *
                  </label>
                  <textarea
                    placeholder="Describe your product — condition details, reason for selling, included accessories..."
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{
                      width: "100%", borderRadius: "10px",
                      border: "1.5px solid #E5E7EB", padding: "12px 14px",
                      fontSize: "14px", outline: "none", resize: "vertical",
                      boxSizing: "border-box", background: "#FAFAFA",
                      fontFamily: "inherit", lineHeight: 1.6,
                    }}
                    onFocus={e => e.target.style.borderColor = "#F3A847"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
              </div>
            </div>

            {/* Category & Condition */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FFF3DB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Package size={16} style={{ color: "#C47F00" }} />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "16px", color: "#111827", margin: 0 }}>Category & Condition</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Category</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      style={{
                        width: "100%", height: "46px", borderRadius: "10px",
                        border: "1.5px solid #E5E7EB", padding: "0 40px 0 14px",
                        fontSize: "14px", outline: "none", background: "#FAFAFA",
                        appearance: "none", fontFamily: "inherit", cursor: "pointer",
                        boxSizing: "border-box",
                      }}
                    >
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Condition</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {conditions.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCondition(c)}
                        style={{
                          padding: "6px 14px", borderRadius: "999px", fontSize: "13px",
                          fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                          borderColor: condition === c ? "#F3A847" : "#E5E7EB",
                          background: condition === c ? "#FFF3DB" : "#fff",
                          color: condition === c ? "#C47F00" : "#374151",
                          transition: "all 0.2s",
                        }}
                      >{c}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FFF3DB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Upload size={16} style={{ color: "#C47F00" }} />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "16px", color: "#111827", margin: 0 }}>Product Images</h2>
              </div>

              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: "2px dashed #E5E7EB", borderRadius: "12px", padding: "32px 20px",
                cursor: "pointer", background: "#FAFAFA", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#F3A847")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#FFF3DB", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <Upload size={22} style={{ color: "#C47F00" }} />
                </div>
                <p style={{ fontWeight: 700, color: "#374151", margin: 0, fontSize: "14px" }}>
                  {loading ? "Uploading..." : "Click to upload images"}
                </p>
                <p style={{ color: "#94A3B8", marginTop: "4px", fontSize: "12px" }}>PNG, JPG up to 10MB • Multiple allowed</p>
                {uploadSuccess && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#16A34A", marginTop: "8px", fontSize: "13px", fontWeight: 600 }}>
                    <CheckCircle size={14} /> {images.length} image{images.length > 1 ? "s" : ""} uploaded
                  </div>
                )}
                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: "none" }} />
              </label>

              {images.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "16px" }}>
                  {images.map((img, index) => (
                    <div key={index} style={{ position: "relative", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", border: "1.5px solid #E5E7EB" }}>
                      <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute", top: "4px", right: "4px",
                          width: "22px", height: "22px", borderRadius: "50%",
                          background: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff",
                        }}
                      >
                        <X size={12} />
                      </button>
                      {index === 0 && (
                        <span style={{
                          position: "absolute", bottom: "4px", left: "4px",
                          background: "#F3A847", color: "#111", fontSize: "10px",
                          fontWeight: 700, borderRadius: "4px", padding: "2px 6px",
                        }}>Main</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT — Price & Submit */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "sticky", top: "20px" }}>

            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FFF3DB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IndianRupee size={16} style={{ color: "#C47F00" }} />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "16px", color: "#111827", margin: 0 }}>Pricing</h2>
              </div>

              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                Set Your Price *
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                  fontWeight: 700, color: "#374151", fontSize: "16px",
                }}>₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  style={{
                    width: "100%", height: "52px", borderRadius: "10px",
                    border: "1.5px solid #E5E7EB", paddingLeft: "32px", paddingRight: "14px",
                    fontSize: "22px", fontWeight: 700, outline: "none",
                    boxSizing: "border-box", background: "#FAFAFA", fontFamily: "inherit",
                    color: "#16A34A",
                  }}
                  onFocus={e => e.target.style.borderColor = "#F3A847"}
                  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "8px" }}>
                Zero commission — you keep 100% of the amount
              </p>
            </div>

            {/* Summary */}
            <div style={{ background: "#FFF8EA", borderRadius: "16px", padding: "20px", border: "1px solid #FFE5A2" }}>
              <h3 style={{ fontWeight: 800, fontSize: "14px", color: "#C47F00", margin: "0 0 14px" }}>Listing Summary</h3>
              {[
                { label: "Title", value: title || "—" },
                { label: "Category", value: category },
                { label: "Condition", value: condition },
                { label: "Price", value: price ? `₹${Number(price).toLocaleString()}` : "—" },
                { label: "Images", value: `${images.length} uploaded` },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                  <span style={{ color: "#6B7280" }}>{row.label}</span>
                  <span style={{ fontWeight: 600, color: "#111827", maxWidth: "150px", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              disabled={loading}
              onClick={handleSubmit}
              style={{
                width: "100%", height: "52px", borderRadius: "12px",
                background: loading ? "#9CA3AF" : "#F3A847", color: "#111",
                fontWeight: 800, fontSize: "16px", border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s", boxShadow: "0 4px 16px rgba(243,168,71,0.35)",
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#E89D30"; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#F3A847"; }}
            >
              {loading ? "Uploading Images..." : "🚀 List Product"}
            </button>

            <p style={{ textAlign: "center", fontSize: "12px", color: "#94A3B8" }}>
              By listing you agree to CampusCart's Terms & Guidelines
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;