/* TODO - add your code to create a functional React component 
that renders a registration form */

// frog@frog.com pw: frog

import { useState } from "react";

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

const Register = ({ setToken }) => {

  // this is the body from POST api/users/register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  async function handleRegistration(event) {
    event.preventDefault();
    console.log(firstName);

    try {
      const APIresponse = await fetch(`${API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email,
            password,// need to review this portion
          }),
        });

      const result = await APIresponse.json();
      console.log("API Response", APIresponse);
      console.log("parsed result", result);

      if (!APIresponse.ok) {
        throw new Error(result.message || "registration failed");
      }

      // if successful, set token and redirect
      setToken(result.token);

      localStorage.setItem("token", result.token);
      console.log("Registration successful:", result.message);
      
      
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <div className="registration-form">
        <h2>Sign Up!</h2>
        <form onSubmit={handleRegistration} >
          <div>
            <label>
              First Name:
              <input
              type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Last name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
export default Register