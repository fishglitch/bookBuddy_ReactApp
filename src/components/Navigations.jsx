import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserDetails, fetchAllBooks } from "../api";
import "../css/Navigations.css";

const Navigation = ({ token, setToken, setFilteredBooks }) => {
  const [userLogin, setUserLogin] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // moved from Books component
  const [availableBooks, setAvailableBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

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

    // moved from Books component; fetch all books from the API
    const getAllBooks = async () => {
      try {
        const books = await fetchAllBooks(); // Use API function
        setAvailableBooks(books);
      } catch (error) {
        console.error("Can't get all books!", error);
        setError(error);
      }
    };

    getUserLogin();
    getAllBooks();
  }, [token]); // depend on the token to refetch when it changes

  const handleLogout = () => {
    setToken(null); // clear token state
    localStorage.removeItem("token");
    setUserLogin(null); // clear user login on logout
    navigate("/");
  };

  useEffect(() => {
    const filteredBooks = availableBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
  }, [searchTerm]);

  return (
    <nav className="navigation">
      <div>
        <Link to="/">Home</Link>
        <input
          type="text"
          id="searchBar"
          placeholder="search book title or author"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)} // update search term state
        />

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
