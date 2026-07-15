import Product from "../models/Product.js";
import User from "../models/User.js";

/* CREATE PRODUCT */

export const createProduct = async (req, res) => {
  try {
    const seller = await User.findById(req.user.id);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    const product = await Product.create({
      ...req.body,

      seller: req.user.id,

      college: seller.college,
      city: seller.city,
      state: seller.state,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL PRODUCTS */

export const getProducts = async (req, res) => {
  try {
    const { city, college, all } = req.query;

    const filter = {};

    if (!all) {
      if (college) {
        filter.college = college;
      } else if (city) {
        filter.city = city;
      }
    }

    const products = await Product.find(filter)
      .populate(
        "seller",
        "name email college city state"
      )
      .populate(
        "buyer",
        "name email college city state"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* GET PRODUCT BY ID */

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate(
        "seller",
        "name email college city state"
      )
      .populate(
        "buyer",
        "name email college city state"
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.views += 1;

    await product.save();

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE PRODUCT */

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const seller = await User.findById(req.user.id);

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,

          college: seller.college,
          city: seller.city,
          state: seller.state,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "seller",
          "name email college city state"
        )
        .populate(
          "buyer",
          "name email college city state"
        );

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* DELETE PRODUCT */

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* BUY NOW */

export const markProductSold = async (req, res) => {
  try {
    const { buyerId, soldPrice } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.isSold) {
      return res.status(400).json({
        success: false,
        message: "Product already sold",
      });
    }

    // Seller marked product as sold
const sellerMarking =
  product.seller.toString() === req.user.id;

product.isSold = true;
product.status = "Sold";

// Buyer optional
if (buyerId) {
  product.buyer = buyerId;
}

product.soldPrice =
  Number(soldPrice) || product.price;

product.soldAt = new Date();

await product.save();

    const updatedProduct = await Product.findById(product._id)
      .populate(
        "seller",
        "name email college city state"
      )
      .populate(
        "buyer",
        "name email college city state"
      );

    res.status(200).json({
      success: true,
      message: "Product marked as sold successfully",      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* SELLER DASHBOARD */

export const getSellerStats = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
    });

    const totalListings = products.length;

    const soldProducts = products.filter(
      (p) => p.isSold
    );

    const activeProducts = products.filter(
      (p) => !p.isSold
    );

    const totalRevenue = soldProducts.reduce(
      (sum, p) => sum + (p.soldPrice || p.price),
      0
    );

    const totalViews = products.reduce(
      (sum, p) => sum + (p.views || 0),
      0
    );

    res.status(200).json({
      success: true,
      totalListings,
      activeProducts: activeProducts.length,
      soldProducts: soldProducts.length,
      totalRevenue,
      totalViews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* MY PURCHASES */

export const getMyPurchases = async (req, res) => {
  try {
    const purchases = await Product.find({
      buyer: req.user.id,
    })
      .populate(
        "seller",
        "name email college city state"
      )
      .sort({
        soldAt: -1,
      });

    const totalSpent = purchases.reduce(
      (sum, p) => sum + (p.soldPrice || p.price),
      0
    );

    res.status(200).json({
      success: true,
      count: purchases.length,
      totalSpent,
      purchases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};