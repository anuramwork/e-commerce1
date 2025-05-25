import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AXIOS from 'axios';
import { useParams , useNavigate} from 'react-router-dom';
import Navbaradmin from './navbarAdmin';

export default function Admineditproduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [Image, setImage] = useState(null);
  const navigate = useNavigate();
  // Fetch product data when component mounts
  useEffect(() => {
    AXIOS.get('http://localhost:3000/api/admin/viewProductById', {
      headers: { id }
    })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // Handle input field changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit updated product data
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('productName', product.productName);
    formdata.append('productPrice', product.productPrice);
    formdata.append('productDescription', product.productDescription);
    formdata.append('productQuantity', product.productQuantity);
    if (Image) {
      formdata.append('Image', Image);
    }

    AXIOS.put(`http://localhost:3000/api/admin/updateproduct/${id}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        alert(res.data.message);
        navigate("/adminviewproducts")
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbaradmin />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Edit Product</h2>

        <Form noValidate onSubmit={handleSubmit}>
          {/* Product Name and Price */}
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="productName" className="position-relative">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={product.productName || ''}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="productPrice" className="position-relative">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                value={product.productPrice || ''}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          {/* Description and Quantity */}
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="productDescription" className="position-relative">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="productDescription"
                value={product.productDescription || ''}
                onChange={handleChange}
                required
                rows={2}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="productQuantity" className="position-relative">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="productQuantity"
                value={product.productQuantity || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          {/* Image Upload */}
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Upload New Image</Form.Label>
            <Form.Control
              type="file"
              name="Image"
              onChange={handleImage}
              accept="image/*"
            />
          </Form.Group>

          {/* Optional: Preview existing image (if available) */}
           {product.image && (
            <div className="mb-3">
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt="Current"
                style={{ maxWidth: '150px', height: 'auto', borderRadius: '10px' }}
              />
            </div>
          )} 

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" variant="primary">
              Update Product
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
