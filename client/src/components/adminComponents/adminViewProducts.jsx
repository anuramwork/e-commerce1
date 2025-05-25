import React, { useEffect, useState } from "react";
import AXIOS from "axios";
import Navbaradmin from "./navbarAdmin";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function AdminViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products when component loads
  useEffect(() => {
    AXIOS.get("http://localhost:3000/api/admin/viewproducts")
      .then((res) => {
        console.log("Products:", res.data);
        setProducts(res.data.products || []);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  // Navigate to product edit page
  const editProduct = (id) => {
    navigate(`/admineditproduct/${id}`);
  };

  // Handle product deletion
  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    AXIOS.delete(`http://localhost:3000/api/admin/deleteproduct/${id}`)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message || "Product deleted");
        // Update local state after deletion
        setProducts((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete product.");
      });
  };

  return (
    <>
      <Navbaradmin />
      <div className="px-3 py-4" style={{ width: '100%', overflowX: 'auto' }}>
        <h2 className="mb-4 text-center">Available Products</h2>

        {/* Product Table */}
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Description</th>
              <th colSpan={2} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No products found.</td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>

                  {/* Product Image */}
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/${product.image}`}
                      alt={product.productName}
                      onError={(e) => (e.target.src = "/default-product.png")} // fallback image
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </td>

                  {/* Product Details */}
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productQuantity}</td>
                  <td>{product.productDescription}</td>

                  {/* Actions */}
                  <td className="text-center">
                    <Button variant="warning" onClick={() => editProduct(product._id)}>
                      Edit
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button variant="danger" onClick={() => deleteProduct(product._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
