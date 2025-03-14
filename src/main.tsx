import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Header } from "./components/header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-[#F0F2F5]">
      <Header />
      <App />
    </div>
  </StrictMode>
);
