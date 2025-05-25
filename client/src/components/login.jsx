import React, { useState } from 'react';
import AXIOS from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginpage.css'; // Import CSS for styling

export default function Loginpage() {
    // State for form fields
    const [record, setRecord] = useState({
        email: "",
        password: ""
    });

    // React Router navigation
    const navigate = useNavigate();

    // Handle changes to input fields
    const handleChange = (e) => {
        setRecord({ ...record, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default behavior
        

        // CHECK ADMIN LOGIN CHANGE LATER
       if(record.email=="admin@gmail.com" && record.password =="admin@123"){
            alert("WELCOME ADMIN")
            navigate("/adminhome");
            return;
       }





        // POST login credentials to backend
        AXIOS.post("http://localhost:3000/api/user/login", record)
            .then((res) => {
                alert(res.data.message);
                console.log(res.data);
                if (res.data.status === 200) {
                    // Save token and navigate to user home
                    localStorage.setItem("token", res.data.token);
                    navigate("/userhome");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("User login failed");
            });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Welcome Back</h1>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                    <input
                        type="submit"
                        value="Login"
                        className="login-button"
                    />
                </form>

                {/* Link to register */}
                <p className="register-redirect">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
}
