import React, { useState } from "react";
import Navbaradmin from "./navbarAdmin";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AXIOS from "axios";

export default function AdminAddProducts() {
  // State to store product details
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productQuantity: "",
  });

  // State to store selected image file
  const [Image, setImage] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle image input
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("productName", product.productName);
    formdata.append("productPrice", product.productPrice);
    formdata.append("productDescription", product.productDescription);
    formdata.append("productQuantity", product.productQuantity);
    if (Image) {
      formdata.append("Image", Image);
    }

    // Make API call to backend
    AXIOS.post("http://localhost:3000/api/admin/addproducts", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        alert(res.data.message || "Product added successfully!");
        // Reset form after success
        setProduct({
          productName: "",
          productPrice: "",
          productDescription: "",
          productQuantity: "",
        });
        setImage(null);
        document.getElementById("add-product-form").reset();
      })
      .catch((err) => {
        console.error("Product upload failed:", err);
        alert("Failed to add product.");
      });
  };

  return (
    <>
      <Navbaradmin />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Add New Product</h2>

        {/* Product form */}
        <Form id="add-product-form" noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Product Name */}
            <Form.Group
              as={Col}
              md="4"
              controlId="formProductName"
              className="position-relative"
            >
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Product Price */}
            <Form.Group
              as={Col}
              md="4"
              controlId="formProductPrice"
              className="position-relative"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                value={product.productPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* Description */}
            <Form.Group
              as={Col}
              md="6"
              controlId="formProductDescription"
              className="position-relative"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="productDescription"
                value={product.productDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Quantity */}
            <Form.Group
              as={Col}
              md="4"
              controlId="formProductQuantity"
              className="position-relative"
            >
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="productQuantity"
                value={product.productQuantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          {/* Image upload */}
          <Form.Group
            controlId="formProductImage"
            className="position-relative mb-4"
          >
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              name="Image"
              accept="image/*"
              onChange={handleImage}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button type="submit" className="px-4">
            Submit Product
          </Button>
        </Form>
      </div>
    </>
  );
}
