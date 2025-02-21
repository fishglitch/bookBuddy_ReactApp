import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Change Router to BrowserRouter
import bookLogo from "./assets/burningBook.png";
import Navigations from "./components/Navigations";
import Login from "./components/Login";
import Books from "./components/Books";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";

function App({}) {
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [token, setToken] = useState(null);

  return (
    <div>
      <div className="header-container">
        <img id="logo-image" src={bookLogo} alt="Book Logo" />
        <h1>
          Reading is <br></br>
          <span className="slanted1"> Revo</span>
          <span className="slanted2">lutio</span>
          <span className="slanted3">nary!!</span>
        </h1>
      </div>

      <Navigations
        token={token}
        setToken={setToken}
        setFilteredBooks={setFilteredBooks}
      />
      <Routes>
        <Route path="/" element={<Books filteredBooks={filteredBooks} />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
