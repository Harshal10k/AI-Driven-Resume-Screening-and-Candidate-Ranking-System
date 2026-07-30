import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {

  const token =
    localStorage.getItem("token");
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // Not logged in
  if (
    !token ||
    !user
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Logged in but wrong role
  if (
    allowedRoles &&
    !allowedRoles.includes(
      user.role
    )
  ) {
    if(user.role === "employer"){
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }
    if(user.role === "candidate"){
      return (
        <Navigate
          to="/candidate-dashboard"
          replace
        />
      );
    }
  }
  return children;
};

export default ProtectedRoute;