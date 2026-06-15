import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [college, setCollege] =
    useState("");

  const [campus, setCampus] =
    useState("");

  const [password, setPassword] =
    useState("");

  // UPDATED
  const [role, setRole] = useState<
    "Buyer" | "Seller"
  >("Buyer");

  const handleSignup = async () => {
    try {
      if (
        !name ||
        !email ||
        !password ||
        !college ||
        !campus
      ) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          phone,

          password,

          college,

          campus,

          role,
        }
      );

      alert(
        "Account Created Successfully 🚀"
      );

      navigate("/login");

    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid md:grid-cols-2">

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center">

          <h1 className="text-6xl font-extrabold mb-6">
            CampusCart
          </h1>

          <h2 className="text-4xl font-bold mb-6">
            Join the smartest student marketplace.
          </h2>

          <p className="text-lg text-blue-100">
            Buy, sell and connect with students
            across your campus.
          </p>

        </div>

        <div className="p-10 md:p-14 overflow-y-auto">

          <h2 className="text-4xl font-bold mb-2">
            Create Account 🚀
          </h2>

          <p className="text-gray-500 mb-8">
            Start buying and selling today.
          </p>

          <div className="space-y-4">

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full p-4 rounded-2xl border"
            />

            <input
              placeholder="College Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 rounded-2xl border"
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full p-4 rounded-2xl border"
            />

            <select
              value={college}
              onChange={(e) =>
                setCollege(e.target.value)
              }
              className="w-full p-4 rounded-2xl border"
            >

              <option value="">
                Select College
              </option>

              <option>PCU Pune</option>

              <option>MIT-WPU</option>

              <option>COEP Pune</option>

              <option>VIT Pune</option>

              <option>Bharati Vidyapeeth</option>

            </select>

            <input
              placeholder="Campus / City"
              value={campus}
              onChange={(e) =>
                setCampus(e.target.value)
              }
              className="w-full p-4 rounded-2xl border"
            />

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                placeholder="Password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                className="w-full p-4 rounded-2xl border"
              />

              <button
                type="button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

                className="absolute right-5 top-5"
              >

                {showPassword ? (

                  <EyeOff size={20} />

                ) : (

                  <Eye size={20} />

                )}

              </button>

            </div>

            {/* UPDATED */}

            <div>

              <label className="font-semibold">

                Select Role

              </label>

              <div className="grid grid-cols-2 gap-3 mt-3">

                <button
                  type="button"

                  onClick={() =>
                    setRole("Buyer")
                  }

                  className={`p-3 rounded-xl border ${
                    role === "Buyer"

                      ? "bg-blue-600 text-white"

                      : ""
                  }`}
                >

                  Buyer

                </button>

                <button
                  type="button"

                  onClick={() =>
                    setRole("Seller")
                  }

                  className={`p-3 rounded-xl border ${
                    role === "Seller"

                      ? "bg-blue-600 text-white"

                      : ""
                  }`}
                >

                  Seller

                </button>

              </div>

            </div>

            <button
              onClick={handleSignup}

              disabled={loading}

              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold"
            >

              {loading

                ? "Creating Account..."

                : "Create Account"}

            </button>

          </div>

          <p className="text-center mt-8 text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"

              className="text-blue-600 font-semibold"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Signup;