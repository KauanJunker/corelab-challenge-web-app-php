import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <div className="bg-[#F0F2F5] h-full">
        <App />
      </div>
    </AuthProvider>
  </StrictMode>
);
