import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/fakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../Components/Button";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    // if (!email || !password) return;
    //? or:
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/App", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          {/* <button className={styles.ctaLink}>Login</button> */}
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

//& Title: Refreshing App After Login
//? Unauthorized Access Error
//* If you try to refresh the app after login, when the URL is /App/cities, you will get an error.
//* This happens when we try to open this page without being logged in.
//* If we try to just enter this URL without first going through the login flow, then we get this error.

//? Preventing Unauthorized Access
//* We need to prevent this by protecting our application against unauthorized access.

//! Title: Video 240 - Adding Fake Authentication: Protecting a Route
//? Protecting Application Against Unauthorized Access
//* The third part of the authentication flow is to protect the application against unauthorized access.
//*  We want to redirect the user back to the homepage
//* whenever they reach one of the routes that they should not reach when they are not logged in.

//? Creating ProtectedRoute Component
//* We will create a specialized component (ProtectedRoute) which will handle this redirecting
//* and then wrap the entire application in that component.
