import { Link } from "react-router-dom";
import PageNav from "../Components/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>
      {/* //* <a></a> anchor element will cause page reload  */}
      {/* <a href="/pricing">Pricing</a> */}
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Homepage;