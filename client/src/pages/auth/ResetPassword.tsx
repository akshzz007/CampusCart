import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import API from "../../config/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        API.RESET_PASSWORD(token!),
        {
          password,
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "35px",
          borderRadius: "18px",
          boxShadow:
            "0 10px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Reset Password
        </h2>

        {/* Password */}

        <div
          style={{
            position: "relative",
            marginBottom: "18px",
          }}
        >
          <input
            type={
              showPassword ? "text" : "password"
            }
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              height: "50px",
              padding: "0 45px 0 15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "15px",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={{
              position: "absolute",
              right: "12px",
              top: "13px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {/* Confirm Password */}

        <div
          style={{
            position: "relative",
            marginBottom: "22px",
          }}
        >
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: "50px",
              padding: "0 45px 0 15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "15px",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            style={{
              position: "absolute",
              right: "12px",
              top: "13px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            height: "50px",
            border: "none",
            borderRadius: "10px",
            background: "#F3A847",
            color: "#111",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;