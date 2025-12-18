import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
