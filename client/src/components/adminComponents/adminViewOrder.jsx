import React, { useEffect, useState } from 'react';
import { Table, Form, Container } from 'react-bootstrap';
import AXIOS from 'axios';
import Navbaradmin from './navbarAdmin'; // Assuming you have an Admin Navbar component

export default function ViewOrdersAdmin() {
  const [orderList, setOrderList] = useState([]);

  // Fetch all orders on component mount
  useEffect(() => {
    AXIOS.get("http://localhost:3000/api/admin/adminvieworders")
      .then((res) => {
        console.log(res.data);
        // Ensure data is always treated as an array
        setOrderList(Array.isArray(res.data) ? res.data : [res.data]);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  // Handle order status update
  const handleStatus = (id, status) => {
    AXIOS.patch("http://localhost:3000/api/admin/updatestatus", { status, id })
      .then((res) => {
        alert("Status updated successfully");
        // Optionally, refresh the order list here
      })
      .catch((err) => {
        console.error("Failed to update status:", err);
      });
  };

  return (
    <>
      <Navbaradmin/>
      <Container className="mt-4">
        <h2 className="mb-4">Orders Placed</h2>
        <Table striped bordered hover responsive className="w-100 mx-auto" style={{ width: "90%" }}>

          <thead className="table-dark">
            <tr>
              <th>Products (Quantity)</th>
              <th>Total Amount</th>
              <th>Delivery Address</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.cartId?.product?.map((item) => (
                    <div key={item._id}>
                      {item.productId?.productName} ({item.quantity})
                    </div>
                  ))}
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{order.address}</td>
                <td>{order.payment}</td>
                <td>
                  <strong>{order.status}</strong>
                </td>
                <td>
                  <Form.Select
                    defaultValue={order.status}
                    onChange={(e) => handleStatus(order._id, e.target.value)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
