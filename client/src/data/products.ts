import type { Product } from "../types";

import laptop from "../assets/laptop.png";
import books from "../assets/books.jpg";
import headphone from "../assets/headphone.jpg";
import bag from "../assets/bag.jpg";
import calc from "../assets/calc.png";
import charger from "../assets/charger.png";
import extensionBoard from "../assets/electrical-extension-board.png";
import files from "../assets/files.jpg";
import hoodie from "../assets/hoodie.png";
import ipad from "../assets/ipad.jpg";
import kettle from "../assets/kettle.jpg";
import keyboard from "../assets/keyboard.png";
import lamp from "../assets/lamp.jpg";
import mattress from "../assets/mattress.jpg";
import miniFan from "../assets/mini fan.png";
import monitor from "../assets/monitor.jpg";
import notes from "../assets/notes.jpg";
import shoes from "../assets/shoes.png";

export const products: Product[] = [
 {
  _id: "1",
  title: "Laptop",
  description: "16GB RAM, 512GB SSD, excellent condition.",
  price: 84900,
  images: [laptop],

  condition: "Like New",
  status: "Available",

  views: 412,
  wishlistCount: 67,
  isSold: false,

  category: "Electronics",
  campus: "IIT Bombay",

  seller: {
    _id: "s1",
    name: "Rahul Sharma",
    campus: "IIT Bombay",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "2",
  title: "Engineering Mathematics Notes",
  description: "Complete first year notes.",
  price: 400,
  images: [notes],

  condition: "Good",
  status: "Available",

  views: 185,
  wishlistCount: 24,
  isSold: false,

  category: "Books & Notes",
  campus: "PCU Pune",

  seller: {
    _id: "s2",
    name: "Akash Patil",
    campus: "PCU Pune",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "3",
  title: "Sony WH-1000XM4",
  description: "Noise cancelling headphones.",
  price: 18500,
  images: [headphone],

  condition: "Good",
  status: "Reserved",

  views: 289,
  wishlistCount: 41,
  isSold: false,

  category: "Electronics",
  campus: "MIT-WPU",

  seller: {
    _id: "s3",
    name: "Priya Verma",
    campus: "MIT-WPU",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "4",
  title: "Campus Backpack",
  description: "Large capacity laptop bag.",
  price: 1200,
  images: [bag],

  condition: "New",
  status: "Available",

  views: 143,
  wishlistCount: 18,
  isSold: false,

  category: "Bags",
  campus: "COEP",

  seller: {
    _id: "s4",
    name: "Rohit Joshi",
    campus: "COEP",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "5",
  title: "Casio Scientific Calculator",
  description: "FX-991ES Plus.",
  price: 850,
  images: [calc],

  condition: "Good",
  status: "Available",

  views: 95,
  wishlistCount: 12,
  isSold: false,

  category: "Calculators",
  campus: "VIT Pune",

  seller: {
    _id: "s5",
    name: "Sneha Kulkarni",
    campus: "VIT Pune",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "6",
  title: "65W Fast Charger",
  description: "Type-C laptop charger.",
  price: 700,
  images: [charger],

  condition: "Like New",
  status: "Available",

  views: 132,
  wishlistCount: 17,
  isSold: false,

  category: "Gadgets",
  campus: "Symbiosis",

  seller: {
    _id: "s6",
    name: "Aditya Singh",
    campus: "Symbiosis",
  },

  createdAt: new Date().toISOString(),
},
{
  _id: "7",
  title: "Extension Board",
  description: "Useful for hostel rooms.",
  price: 450,
  images: [extensionBoard],

  condition: "Good",
  status: "Available",

  views: 164,
  wishlistCount: 21,
  isSold: false,

  category: "Hostel Essentials",
  campus: "Bharati Vidyapeeth",

  seller: {
    _id: "s7",
    name: "Raghav Mishra",
    campus: "Bharati Vidyapeeth",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "8",
  title: "Document Files Set",
  description: "Placement and internship files.",
  price: 250,
  images: [files],

  condition: "New",
  status: "Sold",

  views: 203,
  wishlistCount: 26,
  isSold: true,

  category: "Books & Notes",
  campus: "DY Patil",

  seller: {
    _id: "s8",
    name: "Neha Jain",
    campus: "DY Patil",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "9",
  title: "Oversized Hoodie",
  description: "Winter wear for campus.",
  price: 900,
  images: [hoodie],

  condition: "Like New",
  status: "Available",

  views: 241,
  wishlistCount: 39,
  isSold: false,

  category: "Fashion",
  campus: "IIT Delhi",

  seller: {
    _id: "s9",
    name: "Ankit Mehra",
    campus: "IIT Delhi",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "10",
  title: "Apple iPad Air",
  description: "Perfect for digital notes.",
  price: 39999,
  images: [ipad],

  condition: "Like New",
  status: "Available",

  views: 378,
  wishlistCount: 58,
  isSold: false,

  category: "Electronics",
  campus: "NSUT",

  seller: {
    _id: "s10",
    name: "Aryan Kapoor",
    campus: "NSUT",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "11",
  title: "Electric Kettle",
  description: "Hostel essential.",
  price: 850,
  images: [kettle],

  condition: "Good",
  status: "Reserved",

  views: 191,
  wishlistCount: 28,
  isSold: false,

  category: "Hostel Essentials",
  campus: "DTU",

  seller: {
    _id: "s11",
    name: "Sahil Gupta",
    campus: "DTU",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "12",
  title: "Mechanical Keyboard",
  description: "RGB Gaming Keyboard.",
  price: 3200,
  images: [keyboard],

  condition: "Like New",
  status: "Available",

  views: 315,
  wishlistCount: 44,
  isSold: false,

  category: "Electronics",
  campus: "IIT Madras",

  seller: {
    _id: "s12",
    name: "Vikram Iyer",
    campus: "IIT Madras",
  },

  createdAt: new Date().toISOString(),
},
{
  _id: "13",
  title: "Study Table Lamp",
  description: "LED lamp with brightness control.",
  price: 600,
  images: [lamp],

  condition: "New",
  status: "Available",

  views: 127,
  wishlistCount: 14,
  isSold: false,

  category: "Hostel Essentials",
  campus: "IIIT Hyderabad",

  seller: {
    _id: "s13",
    name: "Sai Teja",
    campus: "IIIT Hyderabad",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "14",
  title: "Single Bed Mattress",
  description: "Comfortable hostel mattress.",
  price: 2500,
  images: [mattress],

  condition: "Good",
  status: "Available",

  views: 182,
  wishlistCount: 23,
  isSold: false,

  category: "Hostel Essentials",
  campus: "BITS Pilani",

  seller: {
    _id: "s14",
    name: "Rishi Agarwal",
    campus: "BITS Pilani",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "15",
  title: "Mini Fan",
  description: "USB powered mini fan.",
  price: 500,
  images: [miniFan],

  condition: "New",
  status: "Available",

  views: 138,
  wishlistCount: 19,
  isSold: false,

  category: "Hostel Essentials",
  campus: "PCU Pune",

  seller: {
    _id: "s15",
    name: "Harsh Patil",
    campus: "PCU Pune",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "16",
  title: "Dell Monitor 24 Inch",
  description: "Full HD IPS Monitor.",
  price: 8500,
  images: [monitor],

  condition: "Like New",
  status: "Reserved",

  views: 291,
  wishlistCount: 37,
  isSold: false,

  category: "Electronics",
  campus: "MIT-WPU",

  seller: {
    _id: "s16",
    name: "Ritika Sharma",
    campus: "MIT-WPU",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "17",
  title: "Reference Books Bundle",
  description: "Semester exam preparation books.",
  price: 1200,
  images: [books],

  condition: "Good",
  status: "Sold",

  views: 224,
  wishlistCount: 31,
  isSold: true,

  category: "Books & Notes",
  campus: "COEP",

  seller: {
    _id: "s17",
    name: "Omkar Deshmukh",
    campus: "COEP",
  },

  createdAt: new Date().toISOString(),
},

{
  _id: "18",
  title: "Sports Shoes",
  description: "Nike running shoes.",
  price: 1800,
  images: [shoes],

  condition: "Like New",
  status: "Available",

  views: 248,
  wishlistCount: 35,
  isSold: false,

  category: "Fashion",

  campus: "VIT Pune",

  seller: {
    _id: "s18",
    name: "Aman Yadav",
    campus: "VIT Pune",
  },

  createdAt: new Date().toISOString(),
},
];

export const categories = [
  "All",
  "Electronics",
  "Calculators",
  "Books & Notes",
  "Gadgets",
  "Bags",
  "Fashion",
  "Hostel Essentials",
  "Lab Equipment",
];