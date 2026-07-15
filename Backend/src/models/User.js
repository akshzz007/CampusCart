import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

avatar: {
  type: String,
  default: "",
},

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Buyer", "Seller"],
      default: "Buyer",
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    profileCompleted: {
  type: Boolean,
  default: true,
},

averageRating: {
  type: Number,
  default: 0,
},

ratings: [
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],

resetPasswordToken: {
  type: String,
},

resetPasswordExpire: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;