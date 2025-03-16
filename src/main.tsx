import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { TaskProvider } from "./context/taskContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <div className="bg-[#F0F2F5] min-h-screen flex flex-col">
          <App />
        </div>
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
