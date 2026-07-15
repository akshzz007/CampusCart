import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";
import type { Product } from "../types";

import axios from "axios";
import { useAuth } from "./AuthContext";

interface ProductContextType {
  products: Product[];

  fetchProducts: (
    filter?: "city" | "college" | "all"
  ) => Promise<void>;

  addProduct: (
    product: Product
  ) => Promise<void>;

  deleteProduct: (
    productId: string
  ) => Promise<void>;

  updateProduct: (
    productId: string,
    updatedData: Partial<Product>
  ) => Promise<void>;

  markProductSold: (
    productId: string,
    soldPrice: number,
    buyerId?: string
  ) => Promise<void>;

  purchaseProduct: (
    productId: string
  ) => Promise<void>;

  getProductById: (
    productId: string
  ) => Product | undefined;
}

const ProductContext =
  createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [products, setProducts] =
    useState<Product[]>([]);

  const { user } = useAuth();

  useEffect(() => {

    fetchProducts();

  }, [

    user?.city,

    user?.college,

  ]);

  const fetchProducts = async (
    filter: "city" | "college" | "all" = "city"
  ) => {

    try {

      let url =
        "http://localhost:5000/api/products";

      if (filter === "all") {

        url += "?all=true";

      }

      else if (user) {

        if (
          filter === "city" &&
          user.city
        ) {

          url += `?city=${encodeURIComponent(
            user.city
          )}`;

        }

        else if (
          filter === "college" &&
          user.college
        ) {

          url += `?college=${encodeURIComponent(
            user.college
          )}`;

        }

      }

      const res =
        await axios.get(url);

      setProducts(
        res.data.products || []
      );

    }

    catch (error) {

      console.log(
        "Fetch Products Error:",
        error
      );

    }

  };

  const addProduct = async (
    product: Product
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        "http://localhost:5000/api/products",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProducts();

    }

    catch (error) {

      console.log(
        "Add Product Error:",
        error
      );

    }

  };

  const deleteProduct = async (
    productId: string
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(
        `http://localhost:5000/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProducts();

    }

    catch (error) {

      console.log(
        "Delete Product Error:",
        error
      );

    }

  };

  const updateProduct = async (
    productId: string,
    updatedData: Partial<Product>
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProducts();

    }

    catch (error) {

      console.log(
        "Update Product Error:",
        error
      );

    }

  };

  const markProductSold = async (
    productId: string,
    soldPrice: number,
    buyerId?: string
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `http://localhost:5000/api/products/${productId}/sold`,
        {
          buyerId: buyerId || null,
          soldPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProducts();

    }

    catch (error) {

      console.log(
        "Mark Sold Error:",
        error
      );

    }

  };

  const purchaseProduct = async (
    productId: string
  ) => {

    try {

      const product =
        products.find(
          (p) => p._id === productId
        );

      if (!product) return;

      await markProductSold(
        productId,
        product.price
      );

    }

    catch (error) {

      console.log(
        "Purchase Error:",
        error
      );

    }

  };

  const getProductById = (
    productId: string
  ) => {

    return products.find(
      (product) =>
        product._id === productId
    );

  };

  return (

    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        markProductSold,
        purchaseProduct,
        getProductById,
      }}
    >

      {children}

    </ProductContext.Provider>

  );

};

export const useProducts = () => {

  const context =
    useContext(ProductContext);

  if (!context) {

    throw new Error(
      "useProducts must be used inside ProductProvider"
    );

  }

  return context;

};

export default ProductContext;