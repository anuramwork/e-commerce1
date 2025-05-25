import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbaruser from './userNavbar';
import { Table, Container, Card } from 'react-bootstrap';

export default function Orderpage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = jwtDecode(localStorage.getItem('token'));
    axios
      .get('http://localhost:3000/api/user/vieworders', {
        headers: {
          id: token.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        // order list in latest to last
        setOrders(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbaruser />
      <Container className="mt-4">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <Card key={order._id} className="mb-4 shadow">
              <Card.Body>
                <Card.Title>Order #{index + 1}</Card.Title>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Payment:</strong> {order.payment}</p>

                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartId?.product?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.productId?.productName}</td>
                        <td>{item.productId?.productDescription}</td>
                        <td>₹{item.productId?.productPrice}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}
