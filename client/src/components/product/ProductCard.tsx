import type { Product } from "../../types";

import {
Heart,
Eye,
CheckCircle,
User,
MessageCircle,
TrendingUp,
Star,
BadgeIndianRupee,
} from "lucide-react";

import {
useEffect,
useState,
} from "react";

import {
Link,
useNavigate,
} from "react-router-dom";

import { useAuth }

from "../../context/AuthContext";

interface Props{

product:Product;

onWishlistToggle?:(
id:string

)=>void;

}

const ProductCard=({

product,

onWishlistToggle,

}:Props)=>{

const {

isAuthenticated,

user,

}=useAuth();

const navigate=

useNavigate();

const [

isWishlisted,

setIsWishlisted,

]=useState(false);

useEffect(()=>{

const savedWishlist=

localStorage.getItem(

"campuscart-wishlist"

);

if(savedWishlist){

const wishlistIds=

JSON.parse(

savedWishlist

);

setIsWishlisted(

wishlistIds.includes(

product._id

)

);

}

},[product._id]);

const toggleWishlist=(

e:React.MouseEvent

)=>{

e.preventDefault();

if(

!isAuthenticated

){

alert(

"Please login first"

);

navigate(

"/login"

);

return;

}

if(

user?.role!=="Buyer"

){

return;

}

const savedWishlist=

localStorage.getItem(

"campuscart-wishlist"

);

let wishlistIds=

savedWishlist

?

JSON.parse(

savedWishlist

)

:[];

if(

wishlistIds.includes(

product._id

)

){

wishlistIds=

wishlistIds.filter(

(id:string)=>

id!==product._id

);

setIsWishlisted(

false

);

}

else{

wishlistIds.push(

product._id

);

setIsWishlisted(

true

);

}

localStorage.setItem(

"campuscart-wishlist",

JSON.stringify(

wishlistIds

)

);

onWishlistToggle?.(

product._id

);

};

const isTrending=

(product.views||0)

>200;

return(

<Link

to={`/product/${product._id}`}

className="group block"

>

<div className="relative overflow-hidden rounded-3xl bg-white border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

{/* IMAGE */}

<div className="relative h-64 overflow-hidden">

<img

src={

product.images?.[0]

?

product.images[0]

:

"/logo.png"

}

alt={product.title}

className="w-full h-full object-cover group-hover:scale-110 transition duration-700"

/>

{/* SOLD */}

{product.isSold&&(

<div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold flex gap-1 items-center">

<CheckCircle

size={14}

/>

SOLD

</div>

)}

{/* CONDITION */}

{!product.isSold&&(

<div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">

{product.condition}

</div>

)}

{/* TRENDING */}

{isTrending&&(

<div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">

<TrendingUp

size={14}

/>

Trending

</div>

)}

{/* WISHLIST */}

{user?.role==="Buyer"&&(

<button

onClick={

toggleWishlist

}

className="absolute top-4 right-4 bg-white p-3 rounded-2xl shadow-lg"

>

<Heart

className={`w-5 h-5 ${

isWishlisted

?

"fill-red-500 text-red-500"

:

"text-gray-600"

}`}

/>

</button>

)}

</div>

{/* CONTENT */}

<div className="p-5">

<div className="flex justify-between mb-3">

<span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">

{product.category}

</span>

<span className="text-xs text-gray-500">

{product.campus}

</span>

</div>

<h3 className="text-xl font-bold line-clamp-2">

{product.title}

</h3>

<p className="text-gray-500 text-sm mt-2 line-clamp-2">

{product.description}

</p>

{/* STATS */}

<div className="flex gap-4 mt-4 text-gray-500 text-sm">

<div className="flex gap-1 items-center">

<Eye size={15}/>

{product.views||0}

</div>

<div className="flex gap-1 items-center">

<Star

size={15}

fill="gold"

/>

{product.rating||4.5}

</div>

</div>

{/* NEGOTIABLE */}

{product.negotiable&&(

<div className="mt-3 inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">

<BadgeIndianRupee

size={14}

/>

Negotiable

</div>

)}

{/* SELLER */}

<div className="flex items-center gap-2 mt-4">

<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">

<User

size={14}

/>

</div>

<div>

<p className="text-sm font-semibold">

{product.seller?.name}

</p>

<p className="text-xs text-gray-500">

Verified Seller

</p>

</div>

</div>

{/* PRICE */}

<div className="flex justify-between items-center mt-5">

<div>

<p className="text-3xl font-extrabold text-green-600">

₹

{product.price.toLocaleString()}

</p>

</div>

{user?.role==="Buyer"&&(

<button

className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700"

>

<MessageCircle

size={18}

/>

</button>

)}

</div>

</div>

</div>

</Link>

);

};

export default ProductCard;