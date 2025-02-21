import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBooks } from "../api"; // Import fetch all books API function
import "../css/Books.css";

const Books = ({ filteredBooks }) => {


  const [availableBooks, setAvailableBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const getAllBooks = async () => {
    try {
      const books = await fetchAllBooks(); // Use API function
      setAvailableBooks(books);
    } catch (error) {
      console.error("Can't get all books!", error);
      setError(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []); // Runs once when component mounts

  if (error) {
    return <div>Error fetching books: {error.message}</div>;
  }

  // when i have fetched results I want that to be passed to parent component
  // if there are any filtered books it will be passed to

  if (filteredBooks.length > 0) {
    return (
      <div className="books-container">
        {filteredBooks.map((book) => {
          return (
            <div
              key={book.id}
              className="books-item"
              onClick={() => {
                navigate(`/books/${book.id}`);
              }}
            >
              {book.coverimage && (
                <img src={book.coverimage} alt={`${book.title} cover`} />
              )}
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>

      <div className="books-container">
        {availableBooks.length > 0 ? (
          availableBooks.map((book) => (
            <div
              key={book.id}
              className="books-item"
              onClick={() => {
                navigate(`/books/${book.id}`);
              }}
            >
              {book.coverimage && (
                <img src={book.coverimage} alt={`${book.title} cover`} />
              )}
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </>
  );
};

export default Books;
