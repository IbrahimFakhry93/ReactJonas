import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/fakeAuthContext";
import { useEffect } from "react";

//* we will wrap the entire application into this component.
//* So it'll receive basically as children, all the application.

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //! we should not call the navigate function from the top level code.
  //* So that's basically an effect. And so effects belong in useEffect.
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

//& Title: Debugging Protected Routes

//* Attempted to implement protected routes and tested the functionality.

//* Encountered an issue: The user component was still trying to render, causing an error.

//? Problem Analysis
//* The error occurred because the user component was trying to read from the 'avatar' property of the user object, which didn't exist.

//? Applying useEffect to Solve the Issue
//* Realized that the useEffect hook executes after the component has already been rendered.
//* This means that the user component was being rendered before the navigation could occur, causing the error.

//^ Solution: Conditional Rendering to the Rescue
//* Implemented conditional rendering to solve the issue.
//* If the user is authenticated, the children components are rendered; otherwise, null is returned.
//* This prevents the user component from rendering when the user is not authenticated.

//* Retested the functionality by logging in and reloading the page.
//* Confirmed that the user is redirected as expected when not authenticated.
