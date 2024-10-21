// PrivateRoute.js
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Add PropTypes for the component
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a required prop
};

export default PrivateRoute;
