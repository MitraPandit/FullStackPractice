import React, { useContext } from "react";
import { UserContext } from "../App";

const Contact = () => {

    const { state, dispatch } = useContext(UserContext);

    return (
        <div className="container home">
            <p className="home-title">Welcome</p>
            <h1 className="home-content">Contact Us</h1>
        </div>
    )
}

export default Contact;
