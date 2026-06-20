import {

useEffect,

useState,

} from "react";

import axios from "axios";

import {

ShoppingBag,

IndianRupee,

CheckCircle,

Calendar,

} from "lucide-react";

const Purchases = () => {

const [loading,setLoading] =

useState(true);

const [data,setData] =

useState({

count:0,

totalSpent:0,

purchases:[] as any[],

});

useEffect(()=>{

fetchPurchases();

},[]);

const fetchPurchases=

async()=>{

try{

const token=

localStorage.getItem(

"token"

);

const res=

await axios.get(

"http://localhost:5000/api/products/my-purchases",

{

headers:{

Authorization:

`Bearer ${token}`,

},

}

);

setData(

res.data

);

}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};

if(loading){

return(

<div className="min-h-screen flex items-center justify-center text-2xl font-bold">

Loading Purchases...

</div>

);

}

return(

<div className="min-h-screen bg-gray-50">

<div className="max-w-7xl mx-auto px-6 py-10">

{/* HEADER */}

<div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-3xl p-10 shadow-xl mb-10">

<h1 className="text-5xl font-bold">

My Purchases 🛍️

</h1>

<p className="text-green-100 mt-3 text-lg">

Track everything you've bought.

</p>

</div>

{/* STATS */}

<div className="grid md:grid-cols-2 gap-6 mb-10">

<div className="bg-white rounded-3xl p-8 shadow">

<ShoppingBag

size={40}

className="text-blue-600"

/>

<h2 className="text-5xl font-bold mt-5">

{data.count}

</h2>

<p className="text-gray-500 mt-2">

Total Purchases

</p>

</div>

<div className="bg-white rounded-3xl p-8 shadow">

<IndianRupee

size={40}

className="text-green-600"

/>

<h2 className="text-5xl font-bold mt-5 text-green-600">

₹{data.totalSpent.toLocaleString()}

</h2>

<p className="text-gray-500 mt-2">

Total Spent

</p>

</div>

</div>

{/* HISTORY */}

<div className="bg-white rounded-3xl p-8 shadow">

<h2 className="text-3xl font-bold mb-8">

Purchase History

</h2>

{data.purchases.length===0 ?(

<div className="text-center py-20">

<h3 className="text-3xl font-bold">

No Purchases Yet 😢

</h3>

<p className="text-gray-500 mt-3">

Start exploring products.

</p>

</div>

):(

<div className="space-y-5">

{data.purchases.map(

(item)=>(

<div

key={item._id}

className="border rounded-3xl p-5 flex flex-col md:flex-row justify-between items-center gap-5"

>

<div className="flex items-center gap-5">

<img

src={

item.images?.[0]

||

"/logo.png"

}

alt={item.title}

className="w-24 h-24 rounded-2xl object-cover"

/>

<div>

<h3 className="text-2xl font-bold">

{item.title}

</h3>

<p className="text-gray-500 mt-2">

Seller:

{" "}

{item.seller?.name}

</p>

<p className="text-sm text-gray-400">

{item.seller?.campus}

</p>

</div>

</div>

<div className="text-right">

<h3 className="text-3xl font-bold text-green-600">

₹

{(

item.soldPrice

||

item.price

).toLocaleString()}

</h3>

<div className="flex items-center justify-end gap-2 text-green-600 mt-3">

<CheckCircle size={18}/>

Purchased

</div>

{item.soldAt && (

<div className="flex items-center justify-end gap-2 text-gray-500 mt-2">

<Calendar size={16}/>

{new Date(

item.soldAt

).toLocaleDateString()}

</div>

)}

</div>

</div>

)

)}

</div>

)}

</div>

</div>

</div>

);

};

export default Purchases;