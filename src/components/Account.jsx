/** TODO - add your code to create a functional React component 
that renders account details for a logged in user. Fetch the 
account data from the provided API. You may consider 
conditionally rendering a message for other users that 
prompts them to log in or create an account.  */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/Account.css";

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

const Account = () => {
  const [userLogin, setUserLogin] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLogin = async () => {
      try {
        const APIresponse = await fetch(`${API_URL}/user/register`);
        const json = await APIresponse.json();
        if (!APIresponse.ok) {
          throw new Error(json.error || "cannot fetch logged in user!!");
        }
        console.log("fetched user login info:", json);
        setUserLogin(json.user);
      } catch (error) {
        console.error("can't fetch logged in user!", error);
        setError(error);
      }
    };
    getUserLogin();
  }, []); // double check whether this dependency array should be empty

  return (
    <>
      {" "}
      <div className="account-container">
        <h2>Account Details</h2>
        <p>
          <strong>Name:</strong> {userLogin.name}
        </p>
        <p>
          <strong>Email:</strong> {userLogin.email}
        </p>
      </div>
    </>
  );
};

export default Account;
