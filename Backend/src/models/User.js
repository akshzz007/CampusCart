import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

{

name:{

type:String,

required:true,

trim:true,

},

email:{

type:String,

required:true,

unique:true,

lowercase:true,

trim:true,

},

password:{

type:String,

required:true,

},

college:{

type:String,

default:"",

},

campus:{

type:String,

default:"",

},

role:{

type:String,

enum:[

"Buyer",

"Seller",

],

default:"Buyer",

},

isVerified:{

type:Boolean,

default:false,

},

},

{

timestamps:true,

}

);

const User = mongoose.model(

"User",

userSchema

);

export default User;