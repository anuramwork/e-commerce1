import React, { useState } from 'react';
import AXIOS from 'axios';
import './Registerpage.css'; // Import custom CSS

export default function Registerpage() {
    // Manage input field states
    const [record, setRecord] = useState({
        username: "",
        email: "",
        password: ""
    });

    // Update state on input change
    const handleChange = (e) => {
        setRecord({ ...record, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior

        // Send form data to backend
        AXIOS.post("http://localhost:3000/api/user/register", record)
            .then((res) => {
                console.log(res.data);
                alert("User registered successfully");
            }).catch((err) => {
                console.log(err);
                alert("User registration failed");
            });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Create an Account</h1>

                {/* Registration form */}
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="submit"
                        value="Register"
                        className="register-button"
                    />
                </form>

                {/* Link to login page */}
                <p className="login-redirect">
                    Already have an account? <a href="/">Login</a>
                </p>
            </div>
        </div>
    );
}
