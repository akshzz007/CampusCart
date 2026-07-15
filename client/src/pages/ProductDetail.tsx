import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Eye,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/product/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const {
    products,
    getProductById,
  } = useProducts();

  if (products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB]">
        <div className="rounded-[28px] border border-[#ECE8DE] bg-white px-12 py-10 shadow-xl">

          <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-[#F3A847] border-t-transparent"></div>

          <h2 className="text-center text-xl font-black text-[#232F3E]">
            Loading Product...
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Please wait while we fetch the product.
          </p>

        </div>
      </div>
    );
  }

  const product = getProductById(id || "");

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB] px-6">

        <div className="max-w-lg rounded-[28px] border border-[#ECE8DE] bg-white p-12 text-center shadow-xl">

          <div className="mb-6 text-7xl">
            📦
          </div>

          <h1 className="text-3xl font-black text-[#232F3E]">
            Product Not Found
          </h1>

          <p className="mt-4 leading-7 text-gray-500">
            This listing may have been removed or is no longer available.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-[#232F3E] px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#37475A]"
          >
            <ArrowLeft size={18} />
            Back To Products
          </Link>

        </div>

      </div>
    );
  };

  const isSeller =
    user?._id === product.seller?._id;

  const similarProducts =
    products.filter(
      (item: any) =>
        item.category === product.category &&
        item._id !== product._id &&
        !item.isSold
    );

  return (

    <div className="min-h-screen bg-[#F8F9FB]">

      {/* ================= TOP BAR ================= */}

      <section className="border-b border-[#ECE8DE] bg-gradient-to-r from-[#FFF7E8] via-white to-[#FFF7E8]">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-8">

          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 rounded-xl border border-[#ECE8DE] bg-white px-5 py-2.5 text-sm font-bold text-[#232F3E] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <ArrowLeft size={17} />
            Back To Products
          </Link>

          <div className="hidden rounded-full bg-[#FFF3DB] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#C88400] md:block">
            CampusCart Verified Listing
          </div>

        </div>

      </section>

      {/* ================= MAIN SECTION ================= */}

      <section className="mx-auto max-w-[1400px] px-6 py-10 sm:px-8 sm:py-14">

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
                    {/* ================= LEFT IMAGE ================= */}

          <div className="h-fit lg:sticky lg:top-24">

            <div className="overflow-hidden rounded-[26px] border border-[#ECE8DE] bg-white shadow-xl">

              <div className="relative bg-[#F8F8F6]">

                <img
                  src={product.images?.[0] || "/logo.png"}
                  alt={product.title}
                  className="aspect-square w-full object-cover"
                />

                {product.isSold ? (
                  <div className="absolute left-5 top-5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                    SOLD
                  </div>
                ) : (
                  <div className="absolute left-5 top-5 rounded-full bg-[#232F3E] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                    {product.condition}
                  </div>
                )}

              </div>

              <div className="grid grid-cols-3 divide-x divide-[#ECE8DE] border-t border-[#ECE8DE]">

                <div className="flex flex-col items-center py-5">

                  <Eye
                    size={17}
                    className="mb-2 text-[#F3A847]"
                  />

                  <span className="text-base font-bold text-[#232F3E]">
                    {product.views}
                  </span>

                  <span className="text-[11px] text-gray-500">
                    Views
                  </span>

                </div>

                <div className="flex flex-col items-center py-5">

                  <Tag
                    size={17}
                    className="mb-2 text-[#F3A847]"
                  />

                  <span className="line-clamp-1 max-w-full px-1 text-center text-[13px] font-bold text-[#232F3E]">
                    {product.category}
                  </span>

                  <span className="text-[11px] text-gray-500">
                    Category
                  </span>

                </div>

                <div className="flex flex-col items-center py-5">

                  <CalendarDays
                    size={17}
                    className="mb-2 text-[#F3A847]"
                  />

                  <span className="text-[13px] font-bold text-[#232F3E]">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>

                  <span className="text-[11px] text-gray-500">
                    Listed On
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE START ================= */}

          <div className="flex flex-col gap-6">

                      {/* ================= TITLE & PRICE ================= */}

            <div className="rounded-[26px] border border-[#ECE8DE] bg-white p-7 shadow-xl sm:p-8">

              <div className="flex flex-wrap items-center gap-2.5">

                <span className="rounded-full bg-[#FFF3DB] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#C88400]">
                  {product.category}
                </span>

                <span
                  className={`rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                    product.isSold
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {product.isSold ? "Sold" : product.condition}
                </span>

              </div>

              <h1 className="mt-4 text-[32px] font-black leading-tight text-[#232F3E] sm:text-[40px]">
                {product.title}
              </h1>

              <p className="mt-3 text-[36px] font-black text-[#16A34A] sm:text-[42px]">
                ₹{product.price.toLocaleString()}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-[14px] text-gray-600">

                <div className="flex items-center gap-2">
                  <MapPin size={17} />
                  {product.college}
                </div>

                <div className="flex items-center gap-2 text-green-600">
                  <ShieldCheck size={17} />
                  Verified Student
                </div>

              </div>

              <div className="mt-7 rounded-2xl border border-[#ECE8DE] bg-[#FAFAFA] p-5">

                <h3 className="mb-2.5 text-base font-bold text-[#232F3E]">
                  Description
                </h3>

                <p className="leading-7 text-gray-600">
                  {product.description}
                </p>

              </div>

            </div>

            {/* ================= SELLER CARD ================= */}

            <div className="rounded-[24px] border border-[#ECE8DE] bg-white p-6 shadow-xl sm:p-7">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xl font-bold uppercase text-[#4F46E5]">
                  {product.seller?.name?.charAt(0)}
                </div>

                <div>

                  <h2 className="text-xl font-bold text-[#232F3E]">
                    {product.seller?.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Verified Campus Seller
                  </p>

                </div>

              </div>

              <div className="mt-6 grid gap-3.5 sm:grid-cols-2">

                <div className="rounded-xl border border-[#ECE8DE] bg-[#FAFAFA] p-4">

                  <p className="text-xs text-gray-500">
                    College
                  </p>

                  <p className="mt-1.5 text-sm font-bold text-[#232F3E]">
                    {product.seller?.college || "Not Available"}
                  </p>

                </div>

                <div className="rounded-xl border border-[#ECE8DE] bg-[#FAFAFA] p-4">

                  <p className="text-xs text-gray-500">
                    City
                  </p>

                  <p className="mt-1.5 text-sm font-bold text-[#232F3E]">
                    {product.seller?.city || "Not Available"}
                  </p>

                </div>

                <div className="rounded-xl border border-[#ECE8DE] bg-[#FAFAFA] p-4">

                  <p className="text-xs text-gray-500">
                    Product Condition
                  </p>

                  <p className="mt-1.5 text-sm font-bold text-[#232F3E]">
                    {product.condition}
                  </p>

                </div>

                <div className="rounded-xl border border-[#ECE8DE] bg-[#FAFAFA] p-4">

                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p
                    className={`mt-1.5 text-sm font-bold ${
                      product.isSold
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.isSold ? "Sold" : "Available"}
                  </p>

                </div>

              </div>

              {!isSeller && !product.isSold && (

               <Link
  to={`/messages?seller=${product.seller._id}&product=${product._id}&sellerName=${encodeURIComponent(
    product.seller.name
  )}&productTitle=${encodeURIComponent(product.title)}`}
                  className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#232F3E] text-[15px] font-bold text-white shadow-md shadow-[#232F3E]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#37475A] hover:shadow-lg"
                >

                  <MessageCircle size={19} />

                  Chat with Seller

                </Link>

              )}

              {isSeller && (

                <div className="mt-7 rounded-2xl border border-[#C7D2FE] bg-[#EEF2FF] p-5 text-center">

                  <h3 className="text-base font-bold text-[#3730A3]">
                    This is your listing 👑
                  </h3>

                  <p className="mt-1.5 text-sm text-[#4338CA]">
                    You can manage this product from My Listings.
                  </p>

                </div>

              )}

            </div>
                        {/* ================= SOLD INFO ================= */}

            {product.isSold && (

              <div className="rounded-[24px] border border-green-200 bg-green-50 p-6">

                <h3 className="text-lg font-black text-green-700">
                  Product Sold
                </h3>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm text-gray-600">
                    Sold Price
                  </span>

                  <span className="text-xl font-black text-green-700">
                    ₹{product.soldPrice?.toLocaleString()}
                  </span>

                </div>

                {product.soldAt && (

                  <div className="mt-3 flex items-center justify-between">

                    <span className="text-sm text-gray-600">
                      Sold On
                    </span>

                    <span className="text-sm font-semibold">
                      {new Date(product.soldAt).toLocaleDateString()}
                    </span>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>

      </section>

      {/* ================= SIMILAR PRODUCTS ================= */}

      {similarProducts.length > 0 && (

        <section className="mx-auto max-w-[1400px] px-6 pb-20 sm:px-8">

          <div className="mb-7">

            <h2 className="font-serif text-[32px] text-[#232F3E] sm:text-[36px]">
              Similar Products
            </h2>

            <p className="mt-1.5 text-gray-500">
              You may also like these products.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

           {similarProducts
  .slice(0, 4)
  .map((item: any) => (
    <ProductCard
      key={item._id}
      product={item}
    />
))}

          </div>

        </section>

      )}

    </div>

  );

};

export default ProductDetail;