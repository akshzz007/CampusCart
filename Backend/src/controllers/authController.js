import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (
  req,
  res
) => {
  try {
   const {
  name,
  email,
  phone,
  password,
  role,
  state,
  city,
  college,
} = req.body;

    console.log(
      "\n========== REGISTER =========="
    );

    console.log(
      "REQUEST BODY:",
      req.body
    );

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    console.log(
      "HASHED PASSWORD:",
      hashedPassword
    );

 const user = await User.create({
  name,
  email,
  phone,
  password: hashedPassword,
  role,
  state,
  city,
  college,
});

    const userData =
      user.toObject();

    delete userData.password;

    console.log(
      "REGISTER SUCCESS"
    );

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      user: userData,
    });
  } catch (error) {
    console.log(
      "REGISTER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

export const loginUser
 = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    console.log(
      "\n========== LOGIN =========="
    );

    console.log(
      "REQUEST BODY:",
      req.body
    );

    console.log(
      "EMAIL:",
      email
    );

    console.log(
      "PASSWORD:",
      password
    );

    const user =
      await User.findOne({
        email,
      });

    console.log(
      "USER FOUND:",
      user
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    console.log(
      "DB HASH:",
      user.password
    );

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );
    console.log("PASSWORD MATCH:", isMatch);

    console.log(
      "PASSWORD MATCH:",
      isMatch
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    const userData =
      user.toObject();

    delete userData.password;

    console.log(
      "TOKEN GENERATED"
    );

    console.log(
      "LOGIN SUCCESS"
    );

    res.status(200).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    console.log(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

export const getMe = async (
  req,
  res
) => {
  try {
    console.log(
      "\n========== GET ME =========="
    );

    console.log(
      "REQ USER:",
      req.user
    );

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(
      "GETME ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
export const googleAuth = async (

req,

res

)=>{

try{

const {

name,

email,

role,

}=req.body;



/* FIND USER */

let user = await User.findOne({

email,

});

/* CREATE USER */

if(!user){

const hashedPassword =

await bcrypt.hash(

"GOOGLE_AUTH",

10

);

user = await User.create({
  name,
  email,
  password: hashedPassword,
  phone: "",
  state: "",
  city: "",
  college: "",
  role: role || "Buyer",
  isVerified: true,
});

}

/* TOKEN */

const token = jwt.sign(

{

id:user._id,

},

process.env.JWT_SECRET,

{

expiresIn:"7d",

}

);

/* REMOVE PASSWORD */

const userData =

user.toObject();

delete userData.password;

res.status(200).json({

success:true,

token,

user:userData,

});

}

catch(error){

console.log(

"GOOGLE AUTH ERROR:",

error

);

res.status(500).json({

success:false,

message:

error.message,

});

}

};

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = async (req, res) => {
  try {
console.log("BODY:", req.body);

const email = req.body.email
  ?.trim()
  .toLowerCase();

console.log("Searching Email:", email);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
       console.log("User Found:", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>CampusCart Password Reset</h2>

      <p>Hello ${user.name},</p>

      <p>You requested to reset your password.</p>

      <p>
        <a href="${resetUrl}">
          Click here to reset your password
        </a>
      </p>

      <p>This link is valid for only <b>10 minutes</b>.</p>

      <p>If you didn't request this, simply ignore this email.</p>

      <hr />

      <p>CampusCart Team ❤️</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "CampusCart Password Reset",
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ================= RESET PASSWORD ================= */

export const resetPassword = async (req, res) => {
  try {
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or has expired.",
      });
    }

    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE AVATAR ================= */

export const updateAvatar = async (req, res) => {
  try {

    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Avatar URL is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user,
    });

  } catch (error) {

    console.log("UPDATE AVATAR ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/* ================= REMOVE AVATAR ================= */

export const removeAvatar = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: "",
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile picture removed successfully.",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, state, city, college } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.state = state ?? user.state;
    user.city = city ?? user.city;
    user.college = college ?? user.college;

    await user.save();

    const userData = user.toObject();
    delete userData.password;

    res.json({
      success: true,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ================= RATE SELLER ================= */

export const rateSeller = async (req, res) => {
  try {

    const {
      sellerId,
      rating,
      review,
    } = req.body;

    const buyerId = req.user.id;

    const seller = await User.findById(
      sellerId
    );

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    if (!seller.ratings) {
      seller.ratings = [];
    }

    const existing =
      seller.ratings.find(
        (r) =>
          r.buyer.toString() === buyerId
      );

    if (existing) {

      existing.rating = rating;
      existing.review = review;

    } else {

      seller.ratings.push({
        buyer: buyerId,
        rating,
        review,
      });

    }

    const total =
      seller.ratings.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      );

    seller.averageRating =
      total /
      seller.ratings.length;

    await seller.save();

    res.status(200).json({
      success: true,
      averageRating:
        seller.averageRating,
      message:
        "Rating submitted successfully.",
    });

  } catch (error) {

    console.log(
      "RATE SELLER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
