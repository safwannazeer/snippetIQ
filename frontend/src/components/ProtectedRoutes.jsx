import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const isValidToken = token && token !== "undefined" && token !== "null";

  if (!isValidToken) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}