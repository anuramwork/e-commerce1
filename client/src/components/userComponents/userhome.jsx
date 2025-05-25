import React, { useEffect, useState } from "react";
import AXIOS from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Navbaruser from "./userNavbar";
import { jwtDecode } from "jwt-decode";

export default function Userhome() {
  // State to hold products
  const [product, setProduct] = useState([]);
  // State to track added items in the cart
  const [addedItems, setAddedItems] = useState([]);
  // Loading indicator while fetching products
  const [loading, setLoading] = useState(true);

  // Get JWT token from local storage
  const token = localStorage.getItem("token");
  // Decode token to extract user ID
  const decode = jwtDecode(token);
  const userId = decode.id;

  // Fetch product list on component mount
  useEffect(() => {
    AXIOS.get("http://localhost:3000/api/user/getProducts", {
      headers: {
        token: token,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data.products);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Handle Add to Cart
  const addtoCart = (productId) => {
    AXIOS.post(
      "http://localhost:3000/api/user/addcart",
      { productId, Quantity: 1 },
      {
        headers: {
          userId: userId,
        },
      }
    )
      .then((res) => {
        alert(res.data.message);
        // Add the product ID to addedItems list
        setAddedItems((prev) => [...prev, productId]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Top navigation bar for user */}
      <Navbaruser />

      {/* Main container for page content */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Explore Our Products</h2>

        {/* Show loader while fetching data */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4">
            {/* Loop through and render each product */}
            {product.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0 rounded-4">
                  {/* Product image */}
                  <div
                    style={{
                      height: "220px",
                      overflow: "hidden",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  >
                    <Card.Img
                      src={`http://localhost:3000/uploads/${item.image}`}
                      alt={item.productName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Product content */}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold text-primary">
                      {item.productName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      ₹ {item.productPrice}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: "0.9rem" }}>
                      {item.productDescription}
                    </Card.Text>

                    {/* Add to Cart button */}
                    <Button
                      variant={
                        addedItems.includes(item._id) ? "success" : "primary"
                      }
                      onClick={() => addtoCart(item._id)}
                      // disabled={addedItems.includes(item._id)}
                      className="mt-auto"
                    >
                      {addedItems.includes(item._id)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
