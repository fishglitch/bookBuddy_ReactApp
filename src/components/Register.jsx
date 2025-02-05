/* TODO - add your code to create a functional React component 
that renders a registration form */

import { useState } from "react";

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

export default function SignUpForm({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] =useState("");
 
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("async");

    try {
      const response = await fetch(`${API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,// these values show up on console.log(result);
          }),
        });

      // console.log(username, password)
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "registration failed");
      }
      console.log("login", result); // shows inputted username and pw
      setToken(result.token);

      // Authenticate Component Tab step 5:
      // "use this function in our handleSubmit. Pass the token property of our API response to setToken."

      
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <div className="registration-form">
        <h2>Sign Up!</h2>
        <form onSubmit={handleSubmit} >
          <div className="form-field-firstname">
            <label>
              First Name:
              <input
              type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-field-lastname">
            <label>
              Last name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
    // react fragment, an invisible div (parent)
  );
}