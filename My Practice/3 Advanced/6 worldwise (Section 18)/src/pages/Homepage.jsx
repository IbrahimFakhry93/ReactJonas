import { Link } from "react-router-dom";
import PageNav from "../Components/PageNav";
import AppNav from "../Components/AppNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>WorldWise</h1>
      {/* //* <a></a> anchor element will cause page reload  */}
      {/* <a href="/pricing">Pricing</a> */}
      <Link to="/pricing">Pricing</Link>
      <Link to="/app">Go to App</Link>
    </div>
  );
}

export default Homepage;
