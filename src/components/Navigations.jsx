import { Link } from "react-router-dom";
import Navigations from '../css/Navigations.css'

const Navigation = () => {
  return (
    <nav className="navigation"> {/* Apply the navigation class */}
      <h1>Navigation</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register for an Account</Link>
        <Link to="/login">Login</Link>
        <Link to="/account">Account</Link>
      </div>
    </nav>
  );
}
export default Navigation;