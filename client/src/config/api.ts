// client/src/config/api.ts
// Centralized API configuration
// Set VITE_API_URL in .env file for production

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API = {
  BASE: BASE_URL,

  // Auth
LOGIN: `${BASE_URL}/api/auth/login`,
REGISTER: `${BASE_URL}/api/auth/register`,
GOOGLE_AUTH: `${BASE_URL}/api/auth/google-auth`,
ME: `${BASE_URL}/api/auth/me`,

FORGOT_PASSWORD: `${BASE_URL}/api/auth/forgot-password`,
RESET_PASSWORD: (token: string) =>
  `${BASE_URL}/api/auth/reset-password/${token}`,

RATE_SELLER: `${BASE_URL}/api/auth/rate-seller`,
COMPLETE_PROFILE: `${BASE_URL}/api/auth/complete-profile`,
  // Products
  PRODUCTS: `${BASE_URL}/api/products`,
  PRODUCT: (id: string) => `${BASE_URL}/api/products/${id}`,
  PRODUCT_SOLD: (id: string) => `${BASE_URL}/api/products/${id}/sold`,
  SELLER_STATS: `${BASE_URL}/api/products/seller/stats`,

  // Messages
  MESSAGES: `${BASE_URL}/api/messages`,
  MY_CHATS: `${BASE_URL}/api/messages/my-chats`,
  CONVERSATION: (productId: string, userId: string) =>
    `${BASE_URL}/api/messages/${productId}/${userId}`,
  DELETE_MESSAGE: (id: string) => `${BASE_URL}/api/messages/${id}`,

  // Notifications
  NOTIFICATIONS: `${BASE_URL}/api/notifications`,
  MARK_READ: (id: string) => `${BASE_URL}/api/notifications/${id}/read`,
  MARK_ALL_READ: `${BASE_URL}/api/notifications/mark-all-read`,
};

export const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/ditgiezxh/image/upload";
export const CLOUDINARY_PRESET = "campuscart";

export default API;