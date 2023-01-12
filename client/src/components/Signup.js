import React, { useContext, useState } from "react";
import SignPic from "../images/signup.jpg"
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Signup = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }))
    }

    const PostData = async (event) => {

        event.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            window.alert("Registration failed!");
            console.log("Registration failed!");
        } else {
            window.alert("Registration Successful!");
            console.log("Registration Successful!");
        }

        navigate('/login');

    }

    return (
        <>
            <section>
                <form method="POST" className="form-content">
                    <h3 className="form-title">Sign Up</h3>
                    <div className="mb-2">
                        <label>Your name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Your name"
                            onChange={handleChange}
                            name="name"
                            value={user.name}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email"
                            onChange={handleChange}
                            name="email"
                            value={user.email}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Mobile Number</label>
                        <input type="number" className="form-control" placeholder="Your Number"
                            onChange={handleChange}
                            name="phone"
                            value={user.phone} />
                    </div>
                    <div className="mb-2">
                        <label>Profession</label>
                        <input type="text" className="form-control" placeholder="Your Profession"
                            onChange={handleChange}
                            name="work"
                            value={user.work} />
                    </div>
                    <div className="mb-2">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleChange}
                            name="password"
                            value={user.password}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            onChange={handleChange}
                            name="cpassword"
                            value={user.cpassword}
                        />
                    </div>
                    <div className="d-grid">
                        <button onClick={PostData} type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <NavLink to="/login"> Sign In?</NavLink>
                    </p>
                </form>
            </section>
            {/* <img src={SignPic} alt="SignPic" className="sign-img" /> */}

        </>
    )
}

export default Signup;