import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    condition: {
      type: String,
      enum: [
        "New",
        "Like New",
        "Good",
        "Used",
      ],
      default: "Good",
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Reserved",
        "Sold",
      ],
      default: "Available",
    },

    category: {
      type: String,
      required: true,
    },

    campus: {
      type: String,
      required: true,
    },

    city: String,

    state: String,

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // NEW
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // NEW
    soldPrice: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    wishlistCount: {
      type: Number,
      default: 0,
    },

    isSold: {
      type: Boolean,
      default: false,
    },

    // NEW
    soldAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;