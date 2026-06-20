import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      college,
      campus,
      role,
    } = req.body;

    console.log(
      "\n========== REGISTER =========="
    );

    console.log(
      "REQUEST BODY:",
      req.body
    );

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    console.log(
      "HASHED PASSWORD:",
      hashedPassword
    );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        college,
        campus,
        role,
      });

    const userData =
      user.toObject();

    delete userData.password;

    console.log(
      "REGISTER SUCCESS"
    );

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      user: userData,
    });
  } catch (error) {
    console.log(
      "REGISTER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

export const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    console.log(
      "\n========== LOGIN =========="
    );

    console.log(
      "REQUEST BODY:",
      req.body
    );

    console.log(
      "EMAIL:",
      email
    );

    console.log(
      "PASSWORD:",
      password
    );

    const user =
      await User.findOne({
        email,
      });

    console.log(
      "USER FOUND:",
      user
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    console.log(
      "DB HASH:",
      user.password
    );

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log(
      "PASSWORD MATCH:",
      isMatch
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    const userData =
      user.toObject();

    delete userData.password;

    console.log(
      "TOKEN GENERATED"
    );

    console.log(
      "LOGIN SUCCESS"
    );

    res.status(200).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    console.log(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

export const getMe = async (
  req,
  res
) => {
  try {
    console.log(
      "\n========== GET ME =========="
    );

    console.log(
      "REQ USER:",
      req.user
    );

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(
      "GETME ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
export const googleAuth = async (

req,

res

)=>{

try{

const {

name,

email,

role,

}=req.body;

/* FIND USER */

let user = await User.findOne({

email,

});

/* CREATE USER */

if(!user){

const hashedPassword =

await bcrypt.hash(

"GOOGLE_AUTH",

10

);

user = await User.create({

name,

email,

password:

hashedPassword,

college:

"CampusCart",

campus:

"CampusCart",

role:

role || "Buyer",

isVerified:true,

});

}

/* TOKEN */

const token = jwt.sign(

{

id:user._id,

},

process.env.JWT_SECRET,

{

expiresIn:"7d",

}

);

/* REMOVE PASSWORD */

const userData =

user.toObject();

delete userData.password;

res.status(200).json({

success:true,

token,

user:userData,

});

}

catch(error){

console.log(

"GOOGLE AUTH ERROR:",

error

);

res.status(500).json({

success:false,

message:

error.message,

});

}

};