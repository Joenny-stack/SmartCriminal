import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ProfileRoute from "./routes/ProfileRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Admin from "./pages/Admin.jsx";
import AdminReview from "./pages/AdminReview.jsx";
import Upload from "./pages/Upload.jsx";
import History from "./pages/History.jsx";
import ReportSighting from "./pages/ReportSighting.jsx";
import BrowseCriminals from "./pages/BrowseCriminals.jsx";
import AuthProvider from "./context/AuthContext.jsx";

function Privacy() {
  return (
    <div className="container py-5">
      <h2>Privacy Policy</h2>
      <p>This is the privacy policy page.</p>
    </div>
  );
}
function Terms() {
  return (
    <div className="container py-5">
      <h2>Terms of Service</h2>
      <p>This is the terms of service page.</p>
    </div>
  );
}

function AppRoutes() {
  const { loading } = useContext(AuthContext);
  if (loading)
    return <div className="container py-5 text-center">Loading...</div>;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Navigate to="/login" />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <Upload />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/review"
        element={
          <AdminRoute>
            <AdminReview />
          </AdminRoute>
        }
      />
      <Route
        path="/report-sighting"
        element={
          <PrivateRoute>
            <ReportSighting />
          </PrivateRoute>
        }
      />
      <Route path="/browse-criminals" element={<BrowseCriminals />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        path="*"
        element={
          <div className="container py-5 text-center">404 Not Found</div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
