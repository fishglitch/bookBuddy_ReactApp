/** TODO - add your code to create a functional React component 
that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to 
navigate to the SingleBook component and view its details. */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Books.css";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";

// const cohortName ="2409-GHP-ET-WEB-PT";
// ${cohortName}

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

const Books = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAllBooks = async () => {
    try {
      const APIresponse = await fetch(`${API_URL}/books`);
      const data = await APIresponse.json();
      if (!APIresponse.ok) {
        throw new Error(`HTTP error! status: ${APIresponse.status}`);
      }

      console.log("Successfully fetched books:", data);
      setAvailableBooks(data.books);
    } catch (error) {
      console.error("Can't get all books!", error);
      setError(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (error) {
    return <div>Error fetching books: {error.message}</div>;
  }

  return (
    <div className="books-container">
      {availableBooks.map((book) => (
        <div
          key={book.id} 
          className="books-item" 
          onClick={() => {navigate(`/${book.id}`)}}
          >
          {book.coverimage && (
            <img src={book.coverimage} alt={`${book.title}cover`} />
          )}
           <span className="book-title">{book.title}</span>
           <span className="book-author">{book.author}</span> 
        </div>
      ))}
    </div>
  );
};

export default Books;

