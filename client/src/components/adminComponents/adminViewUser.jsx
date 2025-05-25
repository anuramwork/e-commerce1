import React, { useEffect, useState } from "react";
import Navbaradmin from "./navbarAdmin";
import AXIOS from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function AdminViewUser() {
  const [users, setUsers] = useState([]);        // Holds the user list
  const [loading, setLoading] = useState(true);  // Tracks loading state

  // Fetch users when component mounts
  useEffect(() => {
    AXIOS.get("http://localhost:3000/api/admin/viewusers")
      .then((res) => {
        setUsers(res.data.users || []);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        alert("Error fetching users.");
      })
      .finally(() => {
        setLoading(false); // Hide loader regardless of success/failure
      });
  }, []);

  // Delete user from backend and update local state
  const deleteUser = (id) => {
    //confirm the user delete call
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    AXIOS.delete("http://localhost:3000/api/admin/deleteuser", {
      headers: { userid: id },
    })
      .then((res) => {
        alert(res.data || "User deleted successfully.");
        // Remove the deleted user from UI
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete user.");
      });
  };

  return (
    <>
      <Navbaradmin />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">User Management Dashboard</h2>

        {/* Show loader while fetching data */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
            <p className="mt-2">Loading users...</p>
          </div>
        ) : (
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th style={{ width: "120px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((customer, index) => (
                  <tr key={customer._id}>
                    <td>{index + 1}</td>
                    <td>{customer.username}</td>
                    <td>{customer.email}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteUser(customer._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}
