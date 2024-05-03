import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTE } from "../../constants/route";

function ProtectedRoute({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  return currentUser ? children : <Navigate to={ROUTE.LOGIN} />;
}

export default ProtectedRoute;
