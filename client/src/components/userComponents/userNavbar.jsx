import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Image from "react-bootstrap/Image";

export default function Navbaruser() {
  const navigate = useNavigate();

  // Retrieve token from local storage
  const token = localStorage.getItem("token");
  let username = "";

  // Decode token to get user's name
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.name.toUpperCase() || "User";
    
    } catch (error) {
      console.error("Token decode failed:", error);
    }
  }

  // Handle logout by clearing localStorage and navigating to login
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm mb-3">
        <Container>
          {/* Brand Name */}
          <Navbar.Brand href="/userhome" className="fw-bold">
            {username}'s Dashboard
          </Navbar.Brand>

          {/* Responsive Toggle */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left side navigation */}
            <Nav className="me-auto">
              <Nav.Link href="/userhome">Products</Nav.Link>
              <Nav.Link href="/usercart">Cart</Nav.Link>
              <Nav.Link href="/orderpage">Orders</Nav.Link>
            </Nav>

            {/* Right side: User profile + dropdown */}
            <Nav className="ms-auto align-items-center">
              {/* Display circular profile image */}
              <Image
                src="https://via.placeholder.com/40"
                roundedCircle
                alt="profile"
                width="40"
                height="40"
                className="me-2"
              />

              {/* Username with dropdown menu */}
              <NavDropdown title={username} id="user-nav-dropdown" align="end">
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Delivered</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
