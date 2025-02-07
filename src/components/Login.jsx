/* TODO - add your code to create a functional React component 
that renders a login form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

const Login = ({token, setToken, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const APIresponse = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            const result = await APIresponse.json();

            if(!APIresponse.ok) {
                throw new Error (result.message || "Login failed");
            }
            // save token to local storage
            localStorage.setItem("token", result.token);

            // if login is successful, set the token
            setToken(result.token);
            // console.log("Login success:", result.message);

            navigate("/account");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <>
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} >

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
                <button type="submit">Login</button>
            </form>
        </div>
        
        </>
    )
}
export default Login;