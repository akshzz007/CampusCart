import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  markProductSold,
  getSellerStats,
  getMyPurchases,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createProduct
);

router.get(
  "/seller/stats",
  protect,
  getSellerStats
);

router.get(
  "/my-purchases",
  protect,
  getMyPurchases
);

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProductById
);

router.put(
  "/:id",
  protect,
  updateProduct
);

router.put(
  "/:id/sold",
  protect,
  markProductSold
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

export default router;