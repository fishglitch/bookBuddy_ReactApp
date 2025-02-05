/** TODO - add your code to create a functional React component
 * that renders details for a single book.
 * Fetch the book data from the provided API.
 * You may consider conditionally rendering a 'Checkout'
 * button for logged in users.
 * */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleBook, setSingleBook] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const APIresponse = await fetch(`${API_URL}/books/${id}`);
        const json = await APIresponse.json();
        if (!APIresponse.ok) {
          throw new Error(json.error || "cannot fetch single book");
        }
        console.log(json);
        setSingleBook(json.book);
      } catch (error) {
        console.error("Can't show single book", error);
        setError(error);
      }
    };
    getSingleBook();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <>
      {singleBook && (
        <section>
          <h3>{singleBook?.title}</h3>
          <img src={singleBook?.coverimage} alt={singleBook?.title} />
          <button onClick={() => navigate("/")}>Back</button>
        </section>
      )}
    </>
  );
};
export default SingleBook;
