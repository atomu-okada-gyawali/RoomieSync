import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token"); // Check for a token in local storage


  return token ? <Outlet /> : <Navigate to="/" replace/>;
};

export default ProtectedRoutes;
