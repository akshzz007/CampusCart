import {
  User,
  Heart,
  Package,
  CheckCircle,
  Camera,
  Edit2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

import { toast } from "sonner";

import API, {
  CLOUDINARY_PRESET,
  CLOUDINARY_URL,
} from "../config/api";

import colleges from "../data/colleges.json";
import Select from "react-select";

const Profile = () => {

  const {
    user,
    setUser,
    token,
  } = useAuth();

  const { products } =
    useProducts();

  const [pfp, setPfp] =
    useState<string | null>(
      user?.avatar || null
    );

  const fileRef =
    useRef<HTMLInputElement>(null);

  /* ===============================
        UPLOAD PROFILE PHOTO
  =============================== */

  const handlePfpChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        CLOUDINARY_PRESET
      );

      toast.loading(
        "Uploading image...",
        {
          id: "avatar",
        }
      );

      const cloudinaryRes =
        await axios.post(
          CLOUDINARY_URL,
          formData
        );

      const avatar =
        cloudinaryRes.data.secure_url;

      await axios.put(
        `${API.BASE}/api/auth/avatar`,
        {
          avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res =
        await axios.get(
          `${API.BASE}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setUser(res.data.user);

      localStorage.setItem(
        "campuscart-user",
        JSON.stringify(res.data.user)
      );

      setPfp(
        res.data.user.avatar
      );

      toast.success(
        "Profile picture updated!",
        {
          id: "avatar",
        }
      );

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Image upload failed",
        {
          id: "avatar",
        }
      );

    }

  };

 const [editing, setEditing] = useState(false);

const [form, setForm] = useState({
  name: user?.name || "",
  phone: user?.phone || "",
  state: user?.state || "",
  city: user?.city || "",
  college: user?.college || "",
});

useEffect(() => {
  if (user) {
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      state: user.state || "",
      city: user.city || "",
      college: user.college || "",
    });
  }
}, [user]);

/* ===============================
      REMOVE PROFILE PHOTO
=============================== */

const handleRemovePhoto = async () => {

  try {

    await axios.delete(
      `${API.BASE}/api/auth/avatar`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedUser = {
      ...user!,
      avatar: "",
    };

    setUser(updatedUser);

    localStorage.setItem(
      "campuscart-user",
      JSON.stringify(updatedUser)
    );

    setPfp(null);

    toast.success(
      "Profile picture removed."
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to remove profile picture."
    );

  }

};

/* ===============================
      SAVE PROFILE
=============================== */

const handleSaveProfile = async () => {

  try {

    const res = await axios.put(
      `${API.BASE}/api/auth/profile`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data.user);

    localStorage.setItem(
      "campuscart-user",
      JSON.stringify(res.data.user)
    );

    setEditing(false);

    toast.success(
      "Profile updated!"
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to update profile."
    );

  }

};

/* ===============================
      COLLEGE SELECT (reused from Signup)
=============================== */

const handleCollegeChange = (selected: any) => {

  if (!selected) {
    setForm({
      ...form,
      college: "",
    });
    return;
  }

  setForm({
    ...form,
    college: selected.value,
  });

};

const collegeSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: state.isFocused ? "#F3A847" : "#E5E7EB",
    backgroundColor: state.isFocused ? "#fff" : "#F8F9FB",
    boxShadow: state.isFocused ? "0 0 0 4px rgba(243,168,71,0.15)" : "none",
    paddingLeft: 4,
    cursor: "text",
    "&:hover": {
      borderColor: "#F3A847",
    },
  }),

  menu: (base: any) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    zIndex: 9999,
    boxShadow: "0 16px 36px rgba(0,0,0,.12)",
  }),

  option: (base: any, state: any) => ({
    ...base,
    padding: "11px 16px",
    backgroundColor: state.isFocused ? "#FFF7D7" : "#fff",
    color: "#222",
    cursor: "pointer",
  }),

  valueContainer: (base: any) => ({
    ...base,
    padding: "2px 8px",
  }),

  placeholder: (base: any) => ({
    ...base,
    color: "#9CA3AF",
    fontSize: "15px",
  }),

  singleValue: (base: any) => ({
    ...base,
    fontSize: "15px",
    fontWeight: 500,
    color: "#111827",
  }),
};

    

  if (!user) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >

        <h2>
          Please login first
        </h2>

        <Link
          to="/login"
          style={{
            background: "#F3A847",
            color: "#111",
            padding: "12px 30px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Login
        </Link>

      </div>

    );

  };

  const wishlistIds =
    JSON.parse(
      localStorage.getItem(
        "campuscart-wishlist"
      ) || "[]"
    );

  const myProducts =
    products.filter(
      (p) =>
        p.seller?._id === user._id
    );

  const stats = [

    {
      label: "Wishlist",
      value: wishlistIds.length,
      icon: (
        <Heart
          size={22}
          style={{
            color: "#EF4444",
          }}
        />
      ),
      color: "#FEF2F2",
      link: "/wishlist",
      show:
        user.role === "Buyer",
    },

    {
      label: "Listings",
      value: myProducts.length,
      icon: (
        <Package
          size={22}
          style={{
            color: "#4F46E5",
          }}
        />
      ),
      color: "#EEF2FF",
      link: "/my-listings",
      show:
        user.role === "Seller",
    },

    {
      label: "Role",
      value: user.role,
      icon: (
        <User
          size={22}
          style={{
            color: "#8B5CF6",
          }}
        />
      ),
      color: "#F5F3FF",
      link: null,
      show: true,
    },

  ].filter(
    (item) => item.show
  );

  // Shared styling tokens for the redesigned Personal Information section only
  const fieldLabelCls = "mb-2 block text-[13px] font-semibold text-[#374151]";
  const fieldBoxCls =
    "flex h-[52px] w-full items-center rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] px-4 text-[15px] font-medium text-[#111827]";
  const fieldInputCls =
    "h-[52px] w-full rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] px-4 text-[15px] font-medium text-[#111827] outline-none transition-colors focus:border-[#F3A847] focus:bg-white focus:ring-4 focus:ring-[#F3A847]/15";

     return (
  <div
    style={{
      maxWidth: "1100px",
      margin: "40px auto",
      padding: "20px",
    }}
  >

    {/* Cover */}

    <div
      style={{
        background:
          "linear-gradient(90deg,#263547,#F3A847)",
        height: "170px",
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
      }}
    />

    {/* Profile Card */}

    <div
      style={{
        background: "#fff",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        padding: "35px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.08)",
        marginBottom: "30px",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >

        {/* LEFT */}

        <div>

          <div
            style={{
              position: "relative",
              width: "140px",
            }}
          >

            <img
              src={
                pfp ||
                `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt=""
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                border: "5px solid white",
                objectFit: "cover",
                marginTop: "-95px",
              }}
            />

            <button
              onClick={() =>
                fileRef.current?.click()
              }
              style={{
                position: "absolute",
                bottom: 8,
                right: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: "#F3A847",
                cursor: "pointer",
              }}
            >
              <Camera size={18} />
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={
                handlePfpChange
              }
            />

          </div>

          <h1
            style={{
              marginTop: "15px",
              fontSize: "36px",
            }}
          >
            {user.name}
          </h1>

          <p
            style={{
              color: "#666",
            }}
          >
            {user.email}
          </p>

          <div
            style={{
              marginTop: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ECFDF5",
              color: "#16A34A",
              padding:
                "8px 15px",
              borderRadius: "999px",
              fontWeight: 700,
            }}
          >
            <CheckCircle size={18} />

            Verified Student
          </div>

        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "12px",
          }}
        >

          <button
            onClick={() =>
              fileRef.current?.click()
            }
            style={{
              padding:
                "12px 24px",
              borderRadius: "12px",
              border:
                "1px solid #ddd",
              background:
                "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <Edit2
              size={16}
            />{" "}
            Edit Photo
          </button>

          {pfp && (

            <button
              onClick={
                handleRemovePhoto
              }
              style={{
                padding:
                  "12px 24px",
                borderRadius:
                  "12px",
                border: "none",
                background:
                  "#FEE2E2",
                color:
                  "#DC2626",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              🗑 Remove Photo
            </button>

          )}

        </div>

      </div>

    </div>

        {/* Stats */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {stats.map((item) => (
        <Link
          key={item.label}
          to={item.link || "#"}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              background: item.color,
              padding: "22px",
              borderRadius: "18px",
            }}
          >
            {item.icon}

            <h2
              style={{
                marginTop: "15px",
                fontSize: "30px",
              }}
            >
              {item.value}
            </h2>

            <p
              style={{
                color: "#555",
              }}
            >
              {item.label}
            </p>
          </div>
        </Link>
      ))}
    </div>

    {/* ================= Personal Information — redesigned ================= */}

    <div className="mb-8 rounded-[20px] bg-white p-10 shadow-[0_10px_25px_rgba(0,0,0,0.05)] sm:p-12">

      <div className="mb-9 flex flex-wrap items-start justify-between gap-4">

        <div>
          <h2 className="text-[22px] font-bold text-[#111827]">
            👤 Personal Information
          </h2>
          <p className="mt-1.5 text-[14px] text-[#6B7280]">
            Manage your account details.
          </p>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="h-12 rounded-xl bg-[#F3A847] px-6 text-[14px] font-bold text-[#111] shadow-[0_4px_14px_rgba(243,168,71,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E89D30] hover:shadow-[0_8px_20px_rgba(243,168,71,0.45)]"
          >
            ✏️ Edit
          </button>
        ) : (
          <button
            onClick={handleSaveProfile}
            className="h-12 rounded-xl bg-[#F3A847] px-6 text-[14px] font-bold text-[#111] shadow-[0_4px_14px_rgba(243,168,71,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E89D30] hover:shadow-[0_8px_20px_rgba(243,168,71,0.45)]"
          >
            💾 Save
          </button>
        )}

      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">

        {/* ===== LEFT COLUMN ===== */}
        <div className="flex flex-col gap-7">

          <div>
            <label className={fieldLabelCls}>Full Name</label>
            {editing ? (
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className={fieldInputCls}
              />
            ) : (
              <div className={fieldBoxCls}>{user.name}</div>
            )}
          </div>

          <div>
            <label className={fieldLabelCls}>Phone Number</label>
            {editing ? (
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className={fieldInputCls}
              />
            ) : (
              <div className={fieldBoxCls}>{user.phone || "-"}</div>
            )}
          </div>

          <div>
            <label className={fieldLabelCls}>State</label>
            {editing ? (
              <input
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state: e.target.value,
                  })
                }
                className={fieldInputCls}
              />
            ) : (
              <div className={fieldBoxCls}>{user.state || "-"}</div>
            )}
          </div>

          <div>
            <label className={fieldLabelCls}>Role</label>
            <div className={fieldBoxCls}>{user.role}</div>
          </div>

        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="flex flex-col gap-7">

          <div>
            <label className={fieldLabelCls}>Email</label>
            <div className={fieldBoxCls}>{user.email}</div>
          </div>

          <div>
            <label className={fieldLabelCls}>City</label>
            {editing ? (
              <input
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value,
                  })
                }
                className={fieldInputCls}
              />
            ) : (
              <div className={fieldBoxCls}>{user.city || "-"}</div>
            )}
          </div>

          <div>
            <label className={fieldLabelCls}>College</label>
            {editing ? (
              <Select
                options={colleges.map((c) => ({
                  label: `${c.name}, ${c.city}, ${c.state}`,
                  value: c.name,
                }))}
                placeholder="Search your college"
                value={
                  form.college
                    ? {
                        label: form.college,
                        value: form.college,
                      }
                    : null
                }
                onChange={handleCollegeChange}
                isSearchable
                isClearable
                styles={collegeSelectStyles}
                noOptionsMessage={() => "College not found"}
              />
            ) : (
              <div className={fieldBoxCls}>{user.college || "-"}</div>
            )}
          </div>

        </div>

      </div>

    </div>

    {/* Quick Actions */}

    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      {user.role === "Buyer" && (
        <Link
          to="/wishlist"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              padding: "12px 22px",
              borderRadius: "12px",
              border: "none",
              background: "#F3A847",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ❤️ Wishlist
          </button>
        </Link>
      )}

      {user.role === "Seller" && (
        <>
          <Link
            to="/my-listings"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                padding: "12px 22px",
                borderRadius: "12px",
                border: "none",
                background: "#F3A847",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              📦 My Listings
            </button>
          </Link>

          <Link
            to="/seller-dashboard"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                padding: "12px 22px",
                borderRadius: "12px",
                border: "none",
                background: "#263547",
                color: "white",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              📊 Dashboard
            </button>
          </Link>
        </>
      )}
    </div>

  </div>
);
};

export default Profile;