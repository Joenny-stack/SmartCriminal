import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user || !user.role || user.role !== "admin") return <Navigate to="/login" replace />;
  return children;
};

export default AdminRoute;
