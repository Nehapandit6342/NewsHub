import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "@/utils/token";
export default function ProtectedRoute({ allowedRoles }) {
  const token = getToken();
  const role = getRole();

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
