import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Register from "./pages/register";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashBoard />} />
          </Route>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
