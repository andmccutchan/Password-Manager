import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AuthProvider>
      <div className={`d-flex flex-column min-vh-100 ${
          isHomePage ? 'bg-body-tertiary gradient-background' : 'bg-body'
        }`}
      >
        <Header />
        <div className="d-flex flex-column flex-grow-1 justify-content-start">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />} >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
