import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleBook, updateBookAvailability } from '../api'; // Import API functions
import '../css/SingleBook.css';

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleBook, setSingleBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const book = await fetchSingleBook(id); // use new API function
        setSingleBook(book);
      } catch (error) {
        console.error("Can't show single book", error);
        setError(error);
      } finally {
        setLoading(false); // set to this state after fetch
      }
    };
    getSingleBook();
  }, [id]);

  const handleAvailabilityUpdate = async (available) => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("user"))?.id; // retrieve user id to check book reservations
    try {
      // check if the book is already checked out by the logged in user 
      if (!available && singleBook.checkedOutBy !==userId) {
        alert("Sorry, cannot be checked out because this book is currently checked out by another user.");
        return;
      }
      const updatedBook = await updateBookAvailability(id, available, token); // Call API function to update book availability
      setSingleBook(updatedBook);

      if (available) {
        navigate("/account"); // go to Account if checked out book
      } else {
        alert("Book returned, thanks!");
      }
    } catch (error) {
      console.error("Can't update book availability", error);
      setError(error);
    }
  };

  if (loading) {
    return <p>loading... </p>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const token = localStorage.getItem("token");

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
            {token ? (
            <button
            onClick={() => handleAvailabilityUpdate(!singleBook.available)}>
            {singleBook.available ? "Checkout" : "Return"}
          </button>
            ) : (
              <button onClick={() => navigate("/login")}>
                Login required to {singleBook.available ? "Checkout" : "Return"}
              </button>
            )}

          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleBook;