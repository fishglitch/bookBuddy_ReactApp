import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../api";
import "../css/Navigations.css";

const Navigation = ({ token, setToken }) => {
  const [userLogin, setUserLogin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLogin = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setUserLogin(null);
        return;
      }

      try {
        const userData = await fetchUserDetails(storedToken);
        setUserLogin(userData); // set user login info
      } catch (error) {
        console.error("Failed to fetch user details", error);
        setUserLogin(null); // If fetching fails, treat user as not logged in
      }
    };
    getUserLogin();
  }, [token]); // depend on the token to refetch when it changes

  const handleLogout = () => {
    setToken(null); // clear token state
    localStorage.removeItem("token");
    setUserLogin(null); // clear user login on logout
    navigate("/");
  };
  return (
    <nav className="navigation">
      <div>
        <Link to="/">Home</Link>

        {/* Ternary operator below means: 
        "If there is a token (indicating the user is logged in), 
        show a link to the 'Account' page and a 'Logout' button; 
        otherwise, show a link to the 'Login' page. */}
        {userLogin ? ( // userLogin state to conditionally render
          <>
            <Link to="/account">Account</Link>
            <button onClick={handleLogout}>Logout: [{userLogin?.email}]</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Create an Account</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navigation;

// If there is a token (indicating the user is logged in), show a link to the "Account" page and a "Logout" button; otherwise, show a link to the "Login" page.
//
