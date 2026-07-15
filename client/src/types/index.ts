export interface User {
  _id: string;

  name: string;
  email: string;

  phone?: string;
  avatar?: string;

  college?: string;
  city?: string;
  state?: string;

  role: "Buyer" | "Seller";

  isVerified: boolean;

  profileCompleted?: boolean;

  averageRating?: number;

  ratings?: {
    buyer: string;
    rating: number;
    review: string;
  }[];

  createdAt?: string;
}

export interface Product {
  _id: string;

  title: string;
  description: string;

  price: number;
  soldPrice?: number;
  soldAt?: string;

  buyer?: {
    _id: string;
    name: string;
    email?: string;
    college?: string;
    city?: string;
    state?: string;
  } | null;

  images: string[];

  condition:
    | "New"
    | "Like New"
    | "Good"
    | "Used";

  status:
    | "Available"
    | "Reserved"
    | "Sold";

  category:
    | "Electronics"
    | "Calculators"
    | "Books & Notes"
    | "Gadgets"
    | "Bags"
    | "Fashion"
    | "Hostel Essentials"
    | "Lab Equipment";

  college?: string;
  city?: string;
  state?: string;
  campus?: string;

  seller: {
    _id: string;
    name: string;

    email?: string;
    college?: string;
    city?: string;
    state?: string;

    campus?: string;
    avatar?: string;
    averageRating?: number;
  };

  views?: number;
  wishlistCount?: number;
  isSold?: boolean;

  rating?: number;
  ratingByBuyer?: number;
  reviewByBuyer?: string;

  negotiable?: boolean;
  isFeatured?: boolean;

  createdAt: string;
}

export interface ChatMessage {
  _id: string;

  sender: string;
  receiver: string;
  product: string;

  text: string;

  createdAt: string;

  isDelivered?: boolean;
  isRead?: boolean;
}

export interface Offer {
  _id: string;

  productId: string;
  buyerId: string;
  sellerId: string;

  offeredPrice: number;

  status:
    | "Pending"
    | "Accepted"
    | "Rejected";

  createdAt: string;
}