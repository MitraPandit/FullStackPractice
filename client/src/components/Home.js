import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const Home = () => {

    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const { state, dispatch } = useContextontext(UserContext);

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            // console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userHomePage();
    }, [0])
    return (
        <div className="container home">
            <p className="home-title">Welcome</p>
            <h3 className="home-content">{userName}</h3>
            <h5 className="home-content">{show ? 'Happy to see you back!!' : 'We are Chess Enthusiasts'}</h5>
        </div>
    )
}

export default Home;