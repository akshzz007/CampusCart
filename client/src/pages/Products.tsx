import { useState } from "react";

import {
Search,
TrendingUp,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import ProductCard from "../components/product/ProductCard";

import { useProducts } from "../context/ProductContext";

const categories=[

"All",

"Electronics",

"Books & Notes",

"Calculators",

"Bags",

"Fashion",

"Hostel Essentials",

"Lab Equipment",

];

const Products=()=>{

const { user }=

useAuth();

const { products }=

useProducts();

const [search,setSearch]=

useState("");

const [category,setCategory]=

useState("All");

const [sortBy,setSortBy]=

useState("latest");

const [showSold,

setShowSold]=

useState(false);

let filteredProducts=

products.filter(

(product)=>{

const matchesSearch=

product.title

?.toLowerCase()

.includes(

search.toLowerCase()

)

||

product.description

?.toLowerCase()

.includes(

search.toLowerCase()

);

const matchesCategory=

category==="All"

? true

: product.category===category;

return (

matchesSearch

&&

matchesCategory

);

}

);

if(

!showSold

){

filteredProducts=

filteredProducts.filter(

(product)=>

!product.isSold

);

}

if(

sortBy==="low"

){

filteredProducts.sort(

(a,b)=>

a.price-b.price

);

}

if(

sortBy==="high"

){

filteredProducts.sort(

(a,b)=>

b.price-a.price

);

}

if(

sortBy==="views"

){

filteredProducts.sort(

(a,b)=>

(b.views||0)

-

(a.views||0)

);

}

if(

sortBy==="latest"

){

filteredProducts.sort(

(a,b)=>

new Date(

b.createdAt

).getTime()

-

new Date(

a.createdAt

).getTime()

);

}

const trending=

products.filter(

(product)=>

(product.views||0)

>200

);

return(

<div className="max-w-7xl mx-auto px-6 py-10">

{/* HEADER */}

<div className="mb-10">

<h1 className="text-5xl font-bold">

Marketplace 🛒

</h1>

<p className="text-gray-500 mt-3">

Buy & sell with students.

</p>

{!user &&(

<div className="mt-5 bg-blue-100 text-blue-700 p-4 rounded-2xl">

👀 Guest Mode Enabled

Login to chat,

wishlist and purchase.

</div>

)}

</div>

{/* TRENDING */}

<div className="bg-indigo-50 rounded-3xl p-6 mb-8">

<div className="flex items-center gap-2 mb-4">

<TrendingUp/>

<h2 className="font-bold text-2xl">

Trending Products

</h2>

</div>

<div className="flex gap-3 overflow-x-auto">

{trending.slice(0,5)

.map((item)=>(

<div

key={item._id}

className="bg-white px-4 py-2 rounded-xl whitespace-nowrap shadow"

>

🔥 {item.title}

</div>

))}

</div>

</div>

{/* FILTER */}

<div className="bg-white rounded-3xl shadow p-6 mb-8">

<div className="grid md:grid-cols-4 gap-4">

<div className="relative">

<Search

size={20}

className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

/>

<input

type="text"

placeholder="Search..."

value={search}

onChange={(e)=>

setSearch(

e.target.value

)

}

className="w-full pl-12 pr-4 py-3 border rounded-2xl"

/>

</div>

<select

value={category}

onChange={(e)=>

setCategory(

e.target.value

)

}

className="border rounded-2xl px-4 py-3"

>

{categories.map(

(item)=>(

<option

key={item}

value={item}

>

{item}

</option>

)

)}

</select>

<select

value={sortBy}

onChange={(e)=>

setSortBy(

e.target.value

)

}

className="border rounded-2xl px-4 py-3"

>

<option value="latest">

Latest

</option>

<option value="low">

Price Low → High

</option>

<option value="high">

Price High → Low

</option>

<option value="views">

Most Viewed

</option>

</select>

<button

onClick={()=>

setShowSold(

!showSold

)

}

className="bg-indigo-600 text-white rounded-2xl"

>

{showSold

? "Hide Sold"

: "Show Sold"}

</button>

</div>

</div>

{/* COUNT */}

<div className="flex justify-between items-center mb-8">

<h2 className="text-2xl font-bold">

Products

</h2>

<div className="flex gap-3">

<div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">

{filteredProducts.length}

Products

</div>

<div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">

{products.filter(

(p)=>p.isSold

).length}

Sold

</div>

</div>

</div>

{/* EMPTY */}

{filteredProducts.length===0

?(

<div className="bg-white rounded-3xl shadow p-14 text-center">

<h2 className="text-3xl font-bold">

No Products 😢

</h2>

<p className="text-gray-500 mt-3">

Try another keyword.

</p>

</div>

)

:(

<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

{filteredProducts.map(

(product)=>(

<ProductCard

key={product._id}

product={product}

/>

)

)}

</div>

)}

</div>

);

};

export default Products;