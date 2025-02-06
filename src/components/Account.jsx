/** TODO - add your code to create a functional React component 
that renders account details for a logged in user. Fetch the 
account data from the provided API. You may consider 
conditionally rendering a message for other users that 
prompts them to log in or create an account.  */

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Account.css";

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

const Account = () => {
  const [userLogin, setUserLogin] = useState(null);
  const [books, setBooks] = useState([]); // this array stores checked out books for a logged in user
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLogin = async () => {
      const token = localStorage.getItem("token"); // added this in relation to const [books,setBooks]

      if (!token) {
        // if there is no token, redirect to login
        navigate("/login");
        return;
      }

      try {
        const APIresponse = await fetch(`${API_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // incl. token in header
          },
        });
        const json = await APIresponse.json();

        if (!APIresponse.ok) {
          throw new Error(json.error || "cannot fetch logged in user!!");
        }
        console.log("fetched user login info:", json);
        setUserLogin(json);
        setBooks(json.books || []);
      } catch (error) {
        console.error("can't fetch logged in user!", error);
        setError(error);
      }
    };
    getUserLogin();
  }, [navigate]); // understand why nav is in dependency array

  if (error) {
    return (
      <div>
        <h2>Error fetching account details</h2>
        <p>{error}</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  if(!userLogin) {
    return (
      <div>
        <h2>Login required to access your account details</h2>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  return (
    <>
      <div className="account-container">
        <h2>Account Details</h2>
        <p><strong>First Name:</strong> {userLogin.firstname}</p>
        <p><strong>Last Name:</strong> {userLogin.lastname}</p>
        <p><strong>Email:</strong> {userLogin.email}</p>
        <h3>Checked Out Books</h3>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
          <li key={book.id}>
          <strong>{book.title}</strong> by {book.author}
        </li>
            ))}
          </ul>
        ) : ( <p>No books checked out</p>

        )}
      </div>
    </>
  );
};

export default Account;
