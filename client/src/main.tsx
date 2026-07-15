import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import "./index.css";

import App from "./App.tsx";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <App />

        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="light"
          duration={2500}
          expand={true}
        />
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);