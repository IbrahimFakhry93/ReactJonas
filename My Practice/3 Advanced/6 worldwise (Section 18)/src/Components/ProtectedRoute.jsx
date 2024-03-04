// we will wrap the entire application

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/fakeAuthContext";
import { useEffect } from "react";

// into this component.

// So it'll receive basically as children, all the application.

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //   we should not call the navigate function

  // from the top level code.

  // So that's basically an effect.

  // And so effects belong in useEffect.
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
