import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyADg3voz_YULCaYp6iP2X0XUL484MCScck",

  authDomain: "campus-cart-a6175.firebaseapp.com",

  projectId: "campus-cart-a6175",

  storageBucket: "campus-cart-a6175.firebasestorage.app",

  messagingSenderId: "615394132519",

  appId: "1:615394132519:web:297fa34b8c7acb1b38c402",

  measurementId: "G-87PG0PGEWZ",

};

const app = initializeApp(

  firebaseConfig

);

export const auth =

  getAuth(app);

export default app;