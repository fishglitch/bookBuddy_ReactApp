import { Link } from "react-router-dom";
import '../css/Navigations.css';
import React, { useEffect, useState } from "react";

const Navigation = ({ token, setToken, }) => {

  const [userLogin, setUserLogin] = useState(null);
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  
  return (
    <nav className="navigation">
      {" "}
      {/* Apply the navigation class */}
      <h1>Navigation</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register for an Account</Link>

        {/* Ternary operator below means: 
        "If there is a token (indicating the user is logged in), 
        show a link to the 'Account' page and a 'Logout' button; 
        otherwise, show a link to the 'Login' page. */}
        {token ? (
          <>
            <Link to="/account">Account </Link>
            <button onClick={handleLogout}>Logout: {userLogin.email}</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};
export default Navigation;


// If there is a token (indicating the user is logged in), show a link to the "Account" page and a "Logout" button; otherwise, show a link to the "Login" page.
// 