import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function ProtectedRouter({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRouter;