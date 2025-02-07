import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleBook, updateBookAvailability } from '../api'; // Import API functions
import '../css/SingleBook.css';

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleBook, setSingleBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const book = await fetchSingleBook(id); // use new API function
        setSingleBook(book);
      } catch (error) {
        console.error("Can't show single book", error);
        setError(error);
      }
    };
    getSingleBook();
  }, [id]);

  const handleAvailabilityUpdate = async (available) => {
    const token = localStorage.getItem("token");
    try {
      const updatedBook = await updateBookAvailability(id, available, token); // Use new API function
      setSingleBook(updatedBook);
    } catch (error) {
      console.error("Can't update book availability", error);
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="single-book-container">
      {singleBook ? (
        <>
          <img src={singleBook.coverimage} alt={singleBook.title} />
          <div className="book-details">
            <h3>{singleBook.title}</h3>
            <p><strong>Author:</strong> {singleBook.author}</p>
            <p><strong>Description:</strong> {singleBook.description}</p>
            <p><strong>Status:</strong> {singleBook.available ? "Available" : "Checked out"}</p>
            <button onClick={() => navigate("/")}>Back</button>
            <button
              onClick={() => handleAvailabilityUpdate(!singleBook.available)}>
              {singleBook.available ? "Checkout" : "Return"}
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleBook;