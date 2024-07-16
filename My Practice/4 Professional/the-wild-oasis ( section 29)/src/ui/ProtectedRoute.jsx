import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //* 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //* 2. If there is No authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  //* 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //* 4. If there is a user, render the app (return children)
  //   if (isAuthenticated) return children;
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

//* if we reload the dashboard page, we will see the spinner because the user is being fetched again from supabase

//! note:

//* const navigate = useNavigate();
//* we are only allowed to call this function navigate
//* inside some other function like in a callback or in a use effect.
//* So not at the top level of the ProtectedRoute component.
