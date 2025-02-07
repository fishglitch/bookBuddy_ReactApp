import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBooks } from "../api"; // Import fetch all books API function
import "../css/Books.css";

const Books = () => {
  // moved to Navigations component
  // const [searchTerm, setSearchTerm] = useState("");

  const [availableBooks, setAvailableBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // moved these functionalities to Navigations component
  // fetch all books from the API
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

  // moved these functionalities to Navigations component
  // const filteredBooks = availableBooks.filter(
  //   (book) =>
  //     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     book.author.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      {/* <input
        type="text"
        id="searchBar"
        placeholder="search book title or author"
        value={searchTerm}
        onChange={handleSearchChange}
      /> */}
      <div className="books-container">
        {availableBooks.length > 0 ? (
          availableBooks.map((book) => (
            <div
              key={book.id}
              className="books-item"
              onClick={() => {
                navigate(`/${book.id}`);
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
