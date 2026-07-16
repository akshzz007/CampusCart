import API from "../../config/api";
import colleges from "../../data/colleges.json";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "sonner";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

import studentSignup from "../../assets/auth/student-signup.png";

const Signup = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Location
  const [college, setCollege] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] =
    useState<"Buyer" | "Seller">("Buyer");

  const handleCollegeChange = (selected: any) => {
    if (!selected) {
      setCollege("");
      setState("");
      setCity("");
      return;
    }

    const selectedCollege = colleges.find(
      (college) => college.name === selected.value
    );

    if (!selectedCollege) return;

    setCollege(selectedCollege.name);
    setState(selectedCollege.state);
    setCity(selectedCollege.city);
  };

  const handleSignup = async () => {
    try {
      if (
        !name ||
        !email ||
        !password ||
        !college ||
        !state ||
        !city
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      setLoading(true);

   await axios.post(
  API.REGISTER,
        {
          name,
          email,
          phone,
          password,
          role,
          state,
          city,
          college,
        }
      );

      toast.success("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      setGoogleUser(result.user);
      setShowRoleModal(true);
    } catch (error) {
      console.log(error);
      toast.error("Google Signup Failed");
    }
  };

  const completeGoogleSignup = async (
    selectedRole: "Buyer" | "Seller"
  ) => {
    try {
      const response =await axios.post(
  API.GOOGLE_AUTH,
        {
          name: googleUser.displayName,
          email: googleUser.email,
          role: selectedRole,
        }
      );

      login(
        response.data.user,
        response.data.token
      );

      toast.success(
        `Logged in as ${selectedRole}`
      );

      setShowRoleModal(false);

      navigate("/");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Google Signup Failed"
      );
    }
  };

  // Same tokens as Login's inputStyle/btnDark/btnOutline, translated to Tailwind
  const sectionLabelCls =
    "text-[12px] font-bold uppercase tracking-[0.09em] text-[#D39A00]";
  const fieldInputCls =
    "h-[50px] w-full rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#FAFAFA] px-4 text-[14px] text-[#1a1a1a] outline-none transition-colors duration-200 placeholder:text-[#9CA3AF] focus:border-[#F4BE37]";

  return (
    // Outer page: generous, even padding on all sides so the card sits centered
    // with real breathing room — never glued to the viewport edges.
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#FFF8E5] via-[#FFF5DA] to-[#FAFAF8] px-12 py-12 sm:px-14 sm:py-14 lg:px-16 lg:py-16">

      {/* ONE single card: one shared radius, one shared shadow, one straight joining
          edge between the two halves — not two separate floating rounded blocks. */}
      <div className="grid w-full max-w-[1300px] grid-cols-1 overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:grid-cols-[0.8fr_1.2fr]">

        {/* LEFT — 40% visual weight, logo/heading/description up top, large breathing
            space, illustration lower */}
        <div className="relative hidden flex-col overflow-hidden bg-gradient-to-br from-[#FFD768] via-[#F7C948] to-[#F3B93A] px-14 py-14 lg:flex">
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/15 blur-[40px]" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-[30px]" />

          <div className="relative z-10 flex h-full flex-col">
            <h1 className="text-[32px] font-black leading-none tracking-tight text-[#222]">
              CampusCart
            </h1>

            <h2 className="mt-9 text-[42px] font-black leading-[1.08] tracking-tight text-[#222]">
              Start Your
              <br />
              Campus
              <br />
              Journey
            </h2>

            <p className="mt-5 max-w-[300px] text-[15.5px] leading-7 text-[#555]">
              Buy, sell and exchange products safely inside your verified college community.
            </p>

            {/* Large empty breathing space, then illustration sits lower */}
            <div className="flex flex-1 items-end justify-center pt-16">
              <img
                src={studentSignup}
                alt="Signup Illustration"
                className="w-full max-w-[300px] select-none object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT — 60% visual weight, 40-48px internal padding, form untouched */}
        <div className="flex items-center px-10 py-12 sm:px-12">
          <div className="mx-auto w-full max-w-[420px]">

            <h2 className="mb-1.5 text-[34px] font-black leading-none tracking-tight text-[#222]">
              Create your account
            </h2>
            <p className="mb-8 text-[15px] text-[#777]">
              Join India's trusted student marketplace — buy, sell and exchange safely inside verified colleges.
            </p>

            <div className="flex flex-col gap-3.5">

              {/* Personal Details */}
              <p className={sectionLabelCls}>Personal Details</p>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldInputCls}
              />

              <div className="grid grid-cols-2 gap-3.5">
                <input
                  type="email"
                  placeholder="College Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldInputCls}
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldInputCls}
                />
              </div>

              {/* College Details */}
              <p className={`${sectionLabelCls} mt-4`}>College Details</p>

              <Select
                options={colleges.map((college) => ({
                  label: `${college.name}, ${college.city}, ${college.state}`,
                  value: college.name,
                }))}
                placeholder="Search your college"
                value={
                  college
                    ? {
                        label: `${college}, ${city}, ${state}`,
                        value: college,
                      }
                    : null
                }
                onChange={handleCollegeChange}
                isSearchable
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: 50,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: state.isFocused ? "#F4BE37" : "#E5E7EB",
                    backgroundColor: "#FAFAFA",
                    boxShadow: "none",
                    paddingLeft: 4,
                    cursor: "text",
                    "&:hover": {
                      borderColor: "#F4BE37",
                    },
                  }),

                  menu: (base) => ({
                    ...base,
                    borderRadius: 12,
                    overflow: "hidden",
                    zIndex: 9999,
                    boxShadow: "0 16px 36px rgba(0,0,0,.12)",
                  }),

                  option: (base, state) => ({
                    ...base,
                    padding: "11px 16px",
                    backgroundColor: state.isFocused ? "#FFF7D7" : "#fff",
                    color: "#222",
                    cursor: "pointer",
                  }),
                }}
                noOptionsMessage={() => "College not found"}
              />

              <div className="grid grid-cols-2 gap-3.5">
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  readOnly
                  className={`${fieldInputCls} cursor-not-allowed text-[#8A8A8A]`}
                />

                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  readOnly
                  className={`${fieldInputCls} cursor-not-allowed text-[#8A8A8A]`}
                />
              </div>

              {/* Security */}
              <p className={`${sectionLabelCls} mt-4`}>Security</p>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${fieldInputCls} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition-colors hover:text-[#333]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="-mt-1.5 flex items-center gap-2.5">
                  <div className="flex h-1 flex-1 gap-1">
                    <div
                      className={`flex-1 rounded-full transition-colors ${
                        password.length >= 1 ? "bg-red-400" : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full transition-colors ${
                        password.length >= 5 ? "bg-yellow-400" : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full transition-colors ${
                        password.length >= 8 ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  </div>
                  <span className="whitespace-nowrap text-[11.5px] font-medium text-gray-500">
                    {password.length >= 8
                      ? "Strong"
                      : password.length >= 5
                      ? "Medium"
                      : "Weak"}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-1 rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#FAFAFA] p-1">
                <button
                  type="button"
                  onClick={() => setRole("Buyer")}
                  className={`h-10 rounded-lg text-[13.5px] font-semibold transition-colors duration-150 ${
                    role === "Buyer"
                      ? "bg-white text-[#222] shadow-sm ring-1 ring-[#F4BE37]/50"
                      : "text-gray-500 hover:text-[#222]"
                  }`}
                >
                  Buy Products
                </button>

                <button
                  type="button"
                  onClick={() => setRole("Seller")}
                  className={`h-10 rounded-lg text-[13.5px] font-semibold transition-colors duration-150 ${
                    role === "Seller"
                      ? "bg-white text-[#222] shadow-sm ring-1 ring-[#F4BE37]/50"
                      : "text-gray-500 hover:text-[#222]"
                  }`}
                >
                  Sell Products
                </button>
              </div>

              {/* Same CTA/divider/google pattern as Login, same order */}
              <button
                onClick={handleSignup}
                disabled={loading}
                className={`mt-1 h-[50px] w-full rounded-xl text-[15px] font-bold text-white transition-colors duration-200 ${
                  loading
                    ? "cursor-not-allowed bg-[#9CA3AF]"
                    : "bg-[#2F333A] hover:bg-[#1F2328]"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E5E7EB]" />
                <span className="text-[13px] text-[#9CA3AF]">OR</span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              <button
                onClick={handleGoogleSignup}
                className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-[#E5E7EB] bg-white text-[14px] font-semibold text-[#333] transition-colors duration-200 hover:border-[#F4BE37] hover:bg-[#FFFDF8]"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>

            <p className="mt-6 text-center text-[12px] leading-6 text-[#9CA3AF]">
              By creating an account you agree to our{" "}
              <span className="cursor-pointer font-semibold text-[#D39A00]">
                Terms
              </span>{" "}
              and{" "}
              <span className="cursor-pointer font-semibold text-[#D39A00]">
                Privacy Policy
              </span>
            </p>

            <p className="mt-4 text-center text-[13px] text-[#6B7280]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#D39A00] no-underline hover:text-[#B37F00]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showRoleModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4">
          <div className="w-[420px] max-w-full rounded-[20px] bg-white p-[30px] shadow-[0_20px_60px_rgba(0,0,0,.18)]">
            <h2 className="m-0 text-[26px] font-extrabold text-[#222]">
              Choose Your Role
            </h2>

            <p className="mt-2.5 text-[14px] leading-6 text-[#666]">
              Select how you want to use CampusCart.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => completeGoogleSignup("Buyer")}
                className="h-12 rounded-xl bg-[#2F333A] text-[14px] font-bold text-white transition-colors duration-150 hover:bg-black"
              >
                Buyer
              </button>

              <button
                type="button"
                onClick={() => completeGoogleSignup("Seller")}
                className="h-12 rounded-xl border-2 border-[#F4BE37] bg-[#FFF8E5] text-[14px] font-bold text-[#222] transition-colors duration-150 hover:bg-[#FFF2BF]"
              >
                Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;