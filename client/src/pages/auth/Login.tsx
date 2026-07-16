import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import API from "../../config/api";
import studentLogin from "../../assets/auth/student-login.png";

const Login = () => {
  const navigate = useNavigate();
  const { login, setGuest } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] =
  useState(false);

const [forgotEmail, setForgotEmail] =
  useState("");

  const handleLogin = async () => {
    if (!email || !password) { toast.error("Please enter email and password"); return; }
    setLoading(true);
    try {
      const res = await axios.post(API.LOGIN, { email, password });
      login(res.data.user, res.data.token);
      toast.success("Welcome Back 👋");
      navigate("/home");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
  prompt: "select_account",
});
      const result = await signInWithPopup(auth, provider);

      // Try backend Google auth first
      try {
const res = await axios.post(API.GOOGLE_LOGIN, {
            name: result.user.displayName,
          email: result.user.email,
        });
        const userData = res.data.user;
        login(userData, res.data.token);

        // TASK 2 — if profile not completed, redirect to complete-profile
        if (!userData.profileCompleted && (!userData.college || !userData.city)) {
          toast.success("Google Login Successful! Please complete your profile.");
          navigate("/complete-profile");
        } else {
          toast.success("Google Login Successful 🎉");
          navigate("/home");
        }
        } catch (error: any) {

        if (error.response?.status === 404) {
          toast.error("Account not found. Please create an account first.");
          navigate("/signup");
          return;
        }

        toast.error(
          error.response?.data?.message ||
          "Google Login Failed"
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Google Login Failed");
    }
  };

  const handleGuest = () => {
    setGuest(true);
    toast.success("Guest Mode Enabled");
    navigate("/home");
  };

  const handleForgotPassword = async () => {

  if (!forgotEmail) {
    toast.error("Please enter your email");
    return;
  }

  try {

    setLoading(true);

    const res = await axios.post(
      API.FORGOT_PASSWORD,
      {
        email: forgotEmail,
      }
    );

    toast.success(res.data.message);

    setShowForgotModal(false);

    setForgotEmail("");

  } catch (err: any) {

    toast.error(
      err.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }

};

  return (
  <>
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FFF8E5 0%, #FFF5DA 50%, #FAFAF8 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 24px",
    }}>
      <div style={{
        width: "100%", maxWidth: "1100px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        background: "#fff", borderRadius: "32px",
        overflow: "hidden",
        boxShadow: "0 25px 70px rgba(0,0,0,0.10)",
      }}>

        {/* LEFT */}
        <div style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg, #FFD768 0%, #F7C948 50%, #F3B93A 100%)",
          padding: "48px 48px 0",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.10)", filter: "blur(30px)" }} />
          <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
            <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#222", margin: "0 0 24px", letterSpacing: "-1px" }}>
              CampusCart
            </h1>
            <h2 style={{ fontSize: "48px", lineHeight: "1.05", fontWeight: 900, color: "#222", margin: 0, letterSpacing: "-1.5px" }}>
              Buy. Sell.<br />Exchange.<br />Inside Campus.
            </h2>
            <p style={{ marginTop: "20px", fontSize: "16px", lineHeight: 1.75, color: "#555", maxWidth: "340px" }}>
              Buy, sell and exchange products safely inside your verified college community.
            </p>
            <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
              <img
                src={studentLogin}
                alt="CampusCart Student"
                style={{ width: "380px", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ padding: "48px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#222", margin: "0 0 6px" }}>Welcome Back</h2>
            <p style={{ fontSize: "15px", color: "#777", marginBottom: "32px" }}>Login to your CampusCart account</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input
                type="email"
                placeholder="University Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#F4BE37"}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              />

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  style={{ ...inputStyle, paddingRight: "48px" }}
                  onFocus={e => e.target.style.borderColor = "#F4BE37"}
                  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: "13px" }}>
                <button
  type="button"
  onClick={() => setShowForgotModal(true)}
  style={{
    background: "none",
    border: "none",
    color: "#D39A00",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "13px",
  }}
>
  Forgot Password?
</button>

              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                style={btnDark(loading)}
              >
                {loading ? "Logging In..." : "Login"}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
                <span style={{ fontSize: "13px", color: "#9CA3AF" }}>OR</span>
                <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
              </div>

              <button onClick={handleGoogleLogin} style={btnOutline}>
                <FcGoogle size={20} /> Continue with Google
              </button>

              <button onClick={handleGuest} style={{ ...btnOutline, color: "#6B7280" }}>
                Continue as Guest
              </button>
            </div>

            <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#6B7280" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ fontWeight: 700, color: "#D39A00", textDecoration: "none" }}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
     </div>

    {showForgotModal && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: "420px",
            background: "#fff",
            borderRadius: "22px",
            padding: "30px",
            boxShadow: "0 20px 60px rgba(0,0,0,.18)",
            animation: "fadeIn .25s ease",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: 800,
              color: "#222",
            }}
          >
            Forgot Password
          </h2>

          <p
            style={{
              marginTop: "10px",
              color: "#666",
              lineHeight: 1.6,
              fontSize: "14px",
            }}
          >
            Enter your registered email address.
            We'll send you a password reset link.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) =>
              setForgotEmail(e.target.value)
            }
            style={{
              width: "100%",
              height: "52px",
              marginTop: "18px",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              padding: "0 16px",
              fontSize: "14px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            <button
              onClick={() =>
                setShowForgotModal(false)
              }
              style={{
                flex: 1,
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              style={{
                flex: 1,
                height: "48px",
                borderRadius: "12px",
                border: "none",
                background: "#F4BE37",
                color: "#111",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {loading
                ? "Sending..."
                : "Send Link"}
            </button>
          </div>
        </div>
      </div>
       )}
  </>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%", height: "50px", borderRadius: "12px",
  border: "1.5px solid #E5E7EB", padding: "0 16px",
  fontSize: "14px", outline: "none", background: "#FAFAFA",
  fontFamily: "inherit", boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const btnDark = (disabled: boolean): React.CSSProperties => ({
  width: "100%", height: "50px", borderRadius: "12px",
  background: disabled ? "#9CA3AF" : "#2F333A",
  color: "#fff", fontWeight: 700, fontSize: "15px",
  border: "none", cursor: disabled ? "not-allowed" : "pointer",
  transition: "all 0.2s",
});

const btnOutline: React.CSSProperties = {
  width: "100%", height: "50px", borderRadius: "12px",
  border: "1.5px solid #E5E7EB", background: "#fff",
  fontWeight: 600, fontSize: "14px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
  color: "#333", transition: "all 0.2s",
};

export default Login;