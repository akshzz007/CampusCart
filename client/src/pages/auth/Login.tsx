import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import axios from "axios";

import { useAuth } from "../../context/AuthContext";

import {

signInWithPopup,

GoogleAuthProvider,

} from "firebase/auth";

import { auth } from "../../firebase";

const Login = () => {

const navigate =

useNavigate();

const {

login,

setGuest,

}=useAuth();

const [

showPassword,

setShowPassword,

]=useState(false);

const [

email,

setEmail,

]=useState("");

const [

password,

setPassword,

]=useState("");

const [

rememberMe,

setRememberMe,

]=useState(true);

const [

loading,

setLoading,

]=useState(false);

/* NORMAL LOGIN */

const handleLogin=

async()=>{

try{

if(

!email ||

!password

){

alert(

"Please enter email and password"

);

return;

}

setLoading(true);

const response=

await axios.post(

"http://localhost:5000/api/auth/login",

{

email,

password,

}

);

login(

response.data.user,

response.data.token

);

alert(

"Login Successful 🚀"

);

navigate("/");

}

catch(error:any){

console.log(error);

alert(

error.response?.data?.message ||

"Invalid Credentials"

);

}

finally{

setLoading(false);

}

};

/* GOOGLE LOGIN */

const handleGoogleLogin=

async()=>{

try{

const provider=

new GoogleAuthProvider();

const result=

await signInWithPopup(

auth,

provider

);

const user={

_id:

result.user.uid,

name:

result.user.displayName ||

"User",

email:

result.user.email ||

"",

college:

"CampusCart",

campus:

"CampusCart",

role:

"Buyer",

isVerified:true,

};

login(

user,

result.user.accessToken

);

alert(

"Google Login Successful 🚀"

);

navigate("/");

}

catch(error){

console.log(error);

alert(

"Google Login Failed"

);

}

};

const handleGuest=()=>{

setGuest(true);

navigate("/");

};

return(

<div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">

<div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid md:grid-cols-2">

{/* LEFT */}

<div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-12 flex flex-col justify-center">

<h1 className="text-6xl font-extrabold mb-6">

CampusCart

</h1>

<h2 className="text-4xl font-bold mb-6">

Buy, Sell & Connect Within Your Campus

</h2>

<p className="text-lg text-blue-100">

Buy, sell and exchange products safely within verified college communities.

</p>

</div>

{/* RIGHT */}

<div className="p-10 md:p-14 flex items-center">

<div className="w-full">

<h2 className="text-4xl font-bold mb-2">

Welcome Back 👋

</h2>

<p className="text-gray-500 mb-8">

Login with your account

</p>

<div className="space-y-5">

<input

type="email"

placeholder="University Email"

value={email}

onChange={(e)=>

setEmail(

e.target.value

)

}

className="w-full p-4 rounded-2xl border"

/>

<div className="relative">

<input

type={

showPassword

? "text"

: "password"

}

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(

e.target.value

)

}

className="w-full p-4 rounded-2xl border"

/>

<button

type="button"

onClick={()=>

setShowPassword(

!showPassword

)

}

className="absolute right-5 top-5"

>

{

showPassword

?

<EyeOff size={20}/>

:

<Eye size={20}/>

}

</button>

</div>

<label className="flex items-center gap-2 text-sm text-gray-600">

<input

type="checkbox"

checked={rememberMe}

onChange={()=>

setRememberMe(

!rememberMe

)

}

/>

Remember Me

</label>

<button

onClick={handleLogin}

disabled={loading}

className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold"

>

{

loading

?

"Logging In..."

:

"Login"

}

</button>

<button

onClick={handleGoogleLogin}

className="w-full border py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold hover:bg-gray-50"

>

<FcGoogle size={24}/>

Continue with Google

</button>

<button

onClick={handleGuest}

className="w-full border py-4 rounded-2xl font-semibold"

>

Continue as Guest

</button>

</div>

<p className="text-center mt-8 text-gray-500">

Don't have an account?

{" "}

<Link

to="/signup"

className="text-blue-600 font-semibold"

>

Create Account

</Link>

</p>

</div>

</div>

</div>

</div>

);

};

export default Login;