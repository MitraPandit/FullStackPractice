import React, { useContext, useEffect, useState } from "react";
import yashPic from "../images/yashimg.jpg";
import { useNavigate } from 'react-router-dom';
import contactPic from "../images/contactpic.jpg"
import { UserContext } from "../App";

const About = () => {

    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { state, dispatch } = useContext(UserContext);

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            // console.log(data);

            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error());
                throw error;
            }
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    };

    useEffect(() => {
        callAboutPage();
    }, [userData])

    return (
        <div className="container">
            {/* <p className="home-title">Welcome</p>
            <h1 className="home-content">About Us</h1> */}

            <form method="GET">
                <div className="row">
                    <div className="col-md-6">
                        <img src={userData.name === "Yash Shetty" ? yashPic : contactPic} alt="yash" className="profile-pic"></img>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>{userData.name}</h5>
                            <h6>{userData.work}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 pl-5">
                    <div id="home">
                        <div className="row">
                            <div className="col-md-6">
                                <label>User ID</label>
                            </div>
                            <div className="col-md-6">
                                <p>{userData._id}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Name</label>
                            </div>
                            <div className="col-md-6">
                                <p>{userData.name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Email</label>
                            </div>
                            <div className="col-md-6">
                                <p>{userData.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Phone</label>
                            </div>
                            <div className="col-md-6">
                                <p>{userData.phone}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Profession</label>
                            </div>
                            <div className="col-md-6">
                                <p>{userData.work}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default About;