import Product from "../models/Product.js";

export const createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.create({
        ...req.body,
        seller: req.user.id,
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

export const getProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find()
          .populate(
            "seller",
            "name email campus"
          )
          .populate(
            "buyer",
            "name email campus"
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

export const getProductById =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        )
          .populate(
            "seller",
            "name email campus"
          )
          .populate(
            "buyer",
            "name email campus"
          );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
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

export const updateProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      if (
        product.seller.toString() !==
        req.user.id
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
          .populate(
            "seller",
            "name email campus"
          )
          .populate(
            "buyer",
            "name email campus"
          );

      res.status(200).json({
        success: true,
        product:
          updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      if (
        product.seller.toString() !==
        req.user.id
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      await product.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const markProductSold =
  async (req, res) => {
    try {
      const {
        buyerId,
        soldPrice,
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      if (
        product.seller.toString() !==
        req.user.id
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      product.isSold = true;

      product.status = "Sold";

      product.buyer =
        buyerId || null;

      product.soldPrice =
        soldPrice ||
        product.price;

      product.soldAt =
        new Date();

      await product.save();

      const updatedProduct =
        await Product.findById(
          product._id
        )
          .populate(
            "seller",
            "name email campus"
          )
          .populate(
            "buyer",
            "name email campus"
          );

      res.status(200).json({
        success: true,
        message:
          "Product marked as sold",
        product:
          updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const getSellerStats =
  async (req, res) => {
    try {
      const products =
        await Product.find({
          seller: req.user.id,
        });

      const totalListings =
        products.length;

      const soldProducts =
        products.filter(
          (p) => p.isSold
        );

      const activeProducts =
        products.filter(
          (p) => !p.isSold
        );

      const totalRevenue =
        soldProducts.reduce(
          (sum, p) =>
            sum +
            (p.soldPrice ||
              p.price),
          0
        );

      const totalViews =
        products.reduce(
          (sum, p) =>
            sum +
            (p.views || 0),
          0
        );

      res.status(200).json({
        success: true,
        totalListings,
        activeProducts:
          activeProducts.length,
        soldProducts:
          soldProducts.length,
        totalRevenue,
        totalViews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const getMyPurchases =
  async (req, res) => {
    try {
      const purchases =
        await Product.find({
          buyer: req.user.id,
        })
          .populate(
            "seller",
            "name email campus"
          )
          .sort({
            soldAt: -1,
          });

      const totalSpent =
        purchases.reduce(
          (sum, p) =>
            sum +
            (p.soldPrice ||
              p.price),
          0
        );

      res.status(200).json({
        success: true,
        count:
          purchases.length,
        totalSpent,
        purchases,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };