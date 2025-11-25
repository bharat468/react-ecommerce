import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function ProtectedRouter({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // Wait until Firebase auth state is loaded
  if (loading) return <div className="text-center">Loading...</div>;

  // After loading, check login
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRouter;
