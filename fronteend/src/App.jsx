import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import HeaderNav from "./components/HeaderNav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import CreateEvent from "./pages/CreateEvent";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import TicketConfig from "./pages/TicketConfig";
import CreateCategory from "./pages/CreateCategory";
import BrowseEvents from "./pages/BrowseEvents";
import BrowseCriminals from "./pages/BrowseCriminals";
import ReportSighting from "./pages/ReportSighting";
import AdminReview from "./pages/AdminReview";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Admin from "./pages/Admin.jsx";

function Privacy() {
  return <div className="container py-5"><h2>Privacy Policy</h2><p>This is the privacy policy page.</p></div>;
}
function Terms() {
  return <div className="container py-5"><h2>Terms of Service</h2><p>This is the terms of service page.</p></div>;
}

function AppRoutes() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // Wait for auth state to load before rendering routes
  if (loading) return null;
  return (
    <>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
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
          path="/create-event"
          element={
            <AdminRoute>
              <CreateEvent />
            </AdminRoute>
          }
        />
        <Route
          path="/event/:eventId/tickets"
          element={
            <AdminRoute>
              <TicketConfig />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route path="/browse-events" element={<BrowseEvents />} />
        <Route path="/browse-criminals" element={<BrowseCriminals />} />
        <Route path="/report-sighting" element={<ReportSighting />} />
        <Route path="/admin/review-flags" element={<AdminReview />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
