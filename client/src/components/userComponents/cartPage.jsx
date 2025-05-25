import React, { useState, useEffect } from "react";
import Navbaruser from "./userNavbar";
import AXIOS from "axios";
import { jwtDecode } from "jwt-decode";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Cartpage() {
  // State declarations
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState("");
  const [cartId, setCartId] = useState("");

  // Decode the user's token to extract user ID
  const token = jwtDecode(localStorage.getItem("token"));

  // Fetch cart data on component mount
  useEffect(() => {
    AXIOS.get("http://localhost:3000/api/user/viewcartbyid", {
      headers: { id: token.id },
    })
      .then((res) => {
        setCart(res.data.product);
        setCartId(res.data._id);
      })
      .catch((err) => {
        console.error("Failed to load cart:", err);
      });
  }, []);

  // Calculate total cart amount
  const totalAmount = cart.reduce((sum, item) => {
    return sum + item.quantity * item.productId.productPrice;
  }, 0);

  // Handle form submission (Place Order)
  const handleSubmit = (e) => {
    e.preventDefault();

    

    AXIOS.post(
      "http://localhost:3000/api/user/addorder",
      {
        cartId,
        address,
        payment,
        totalAmount,
      },
      {
        headers: { userId: token.id },
      }
    )
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.error("Order placement failed:", err);
      });
  };

  return (
    <>
      <Navbaruser />

      <Container className="mt-4">
        <h2 className="text-center mb-4">Your Shopping Cart</h2>

        {/* Cart Table */}
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((items, index) => (
              <tr key={items._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${items.productId.image}`}
                    alt={items.productId.productName}
                    style={{
                      height: "80px",
                      width: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>
                <td>{items.productId.productName}</td>
                <td>{items.quantity}</td>
                <td>₹{items.quantity * items.productId.productPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Total amount */}
        <h4 className="mt-4 text-end">Total Amount: ₹{totalAmount}</h4>

        {/* Address and Payment Form */}
        <Form onSubmit={handleSubmit} className="mt-5 shadow-sm p-4 bg-light rounded">
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label><strong>Delivery Address</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label><strong>Payment Method</strong></Form.Label>
            <div>
              <Form.Check
                inline
                label="Cash on Delivery"
                name="payment"
                type="radio"
                value="COD"
                onChange={(e) => setPayment(e.target.value)}
                required
              />
              <Form.Check
                inline
                label="Online Payment"
                name="payment"
                type="radio"
                value="Online Payment"
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Place Order
          </Button>
        </Form>
      </Container>
    </>
  );
}
