import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  googleAuth,
  forgotPassword,
  resetPassword,
  updateAvatar,
  removeAvatar,
  updateProfile,
  rateSeller,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* REGISTER */
router.post("/register", registerUser);

/* LOGIN */
router.post("/login", loginUser);

/* GOOGLE AUTH */
router.post("/google-auth", googleAuth);

/* GET USER */
router.get("/me", protect, getMe);

/* UPDATE PROFILE */
router.put(
  "/profile",
  protect,
  updateProfile
);

/* UPDATE AVATAR */
router.put(
  "/avatar",
  protect,
  updateAvatar
);

/* REMOVE AVATAR */
router.delete(
  "/avatar",
  protect,
  removeAvatar
);

/* RATE SELLER */
router.post(
  "/rate-seller",
  protect,
  rateSeller
);

/* FORGOT PASSWORD */
router.post("/forgot-password", forgotPassword);

/* RESET PASSWORD */
router.post("/reset-password/:token", resetPassword);

export default router;