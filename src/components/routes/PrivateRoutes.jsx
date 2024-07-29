import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <>{props.children}</>;
};
export default PrivateRoutes;
