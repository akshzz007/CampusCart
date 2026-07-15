import { Link } from "react-router-dom";
import { ShoppingBag, Mail, ShieldCheck, Heart, FileText, HelpCircle, PhoneCall } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Footer = () => {

  const { user } = useAuth();

  return (

<footer className="mt-24 bg-[#2C3643] text-white">

<div className="mx-auto max-w-[1500px] px-6 py-16 sm:px-8">

<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">

{/* BRAND */}

<div className="lg:col-span-2">

<div className="flex items-center gap-3">

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3A847]">

<ShoppingBag

size={28}

className="text-[#232F3E]"

/>

</div>

<div>

<h2 className="text-2xl font-black tracking-tight">

CampusCart

</h2>

<p className="text-sm text-gray-400">

Student Marketplace

</p>

</div>

</div>

<p className="mt-6 max-w-md text-[15px] leading-7 text-gray-300">

CampusCart is a trusted marketplace where students
can safely buy, sell and exchange products inside
their verified college community.

</p>

<div className="mt-7 flex w-fit items-center gap-3 rounded-xl bg-white/[0.06] px-4 py-3 transition-colors hover:bg-white/10">

<Mail size={17} className="text-[#F3A847]"/>

<span className="text-sm text-gray-200">

support@campuscart.in

</span>

</div>

</div>

{/* EXPLORE */}

<div>

<h3 className="mb-5 text-[13px] font-bold uppercase tracking-[0.08em] text-gray-400">

Explore

</h3>

<div className="space-y-3.5 text-[14.5px] text-gray-300">

<Link to="/" className="block transition-colors hover:text-[#F3A847]">

Home

</Link>

<Link to="/products" className="block transition-colors hover:text-[#F3A847]">

Products

</Link>

<Link to="/signup" className="block transition-colors hover:text-[#F3A847]">

Create Account

</Link>

<Link to="/login" className="block transition-colors hover:text-[#F3A847]">

Login

</Link>

</div>

</div>

{/* ACCOUNT */}

<div>

<h3 className="mb-5 text-[13px] font-bold uppercase tracking-[0.08em] text-gray-400">

Account

</h3>

<div className="space-y-3.5 text-[14.5px] text-gray-300">

{user?.role==="Buyer" && (

<>

<Link to="/wishlist" className="block transition-colors hover:text-[#F3A847]">

Wishlist

</Link>

<Link to="/messages" className="block transition-colors hover:text-[#F3A847]">

Messages

</Link>

<Link to="/purchases" className="block transition-colors hover:text-[#F3A847]">

My Orders

</Link>

</>

)}

{user?.role==="Seller" && (

<>

<Link to="/add-product" className="block transition-colors hover:text-[#F3A847]">

Sell Product

</Link>

<Link to="/my-listings" className="block transition-colors hover:text-[#F3A847]">

My Listings

</Link>

<Link to="/seller-dashboard" className="block transition-colors hover:text-[#F3A847]">

Dashboard

</Link>

</>

)}

{!user && (

<>

<p className="text-gray-500">

Login to access your dashboard.

</p>

</>

)}

</div>

</div>

{/* SUPPORT */}

<div>

<h3 className="mb-5 text-[13px] font-bold uppercase tracking-[0.08em] text-gray-400">

Support

</h3>

<div className="space-y-3.5 text-[14.5px] text-gray-300">

<div className="flex items-center gap-2.5 transition-colors hover:text-[#F3A847]">

<ShieldCheck size={16}/>

Privacy Policy

</div>

<div className="flex items-center gap-2.5 transition-colors hover:text-[#F3A847]">

<FileText size={16}/>

Terms & Conditions

</div>

<div className="flex items-center gap-2.5 transition-colors hover:text-[#F3A847]">

<HelpCircle size={16}/>

Help Center

</div>

<div className="flex items-center gap-2.5 transition-colors hover:text-[#F3A847]">

<PhoneCall size={16}/>

Contact Us

</div>

</div>

</div>

</div>

{/* Divider */}

<div className="my-12 border-t border-white/[0.08]"/>

{/* Bottom */}

<div className="flex flex-col items-center justify-between gap-4 text-[13px] text-gray-400 md:flex-row">

<p>

© 2026 CampusCart. All Rights Reserved.

</p>

<div className="flex items-center gap-1.5">

Built with

<Heart

size={15}

className="fill-red-500 text-red-500"

/>

for Students

</div>

</div>

</div>

</footer>

);

};

export default Footer;