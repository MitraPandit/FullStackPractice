import React, { useContext, useState } from "react";
import loginImg from "../images/login.jpg";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (event) => {
        event.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });


        const data = await res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid credentials");
        } else {
            dispatch({ type: "USER", payload: true })
            window.alert("Login Successful");
            navigate('/');
        }
    }

    return (
        <div>
            <form method="POST" className="form-content-login">
                <h3 className="form-title">Sign In</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Your email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button onClick={loginUser} type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Create an Account?<NavLink to="/signup"> Sign Up</NavLink>
                </p>
            </form>
            {/* <img src={loginImg} alt="LoginImg" className="login-img" /> */}
        </div>
    )
}

export default Login;