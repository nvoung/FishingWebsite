import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image, Card, Dropdown } from "react-bootstrap";
import "./Home.css"; // Import the CSS file for animations

const Home = ({ catalog }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = catalog.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, catalog]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/product?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">NVDC Fishing</a>
      </nav>
      <Row className="position-relative" style={{ marginTop: 0 }}>
        <Col>
          <Image
            src="/photos/FishingHomeIMG.jpg"
            alt="Top Half View"
            fluid
            className="w-100"
          />
          {/* Welcome text and button with fade-in effect */}
          <div className="welcome-text">
            <h1>Welcome to the NVDC Store</h1>
            <p>Check out our Products Here</p>
            <Button variant="primary" onClick={() => navigate("/product")}>Goto</Button>
          </div>
          {/* Search bar for products positioned within the image */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
            }}
          >
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search for products..."
                className="mr-sm-2 flex-grow-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="button" onClick={handleSearch}>Search</Button>
            </Form>
            {searchResults.length > 0 && (
              <Dropdown.Menu show className="w-100 mt-1">
                {searchResults.map((product) => (
                  <Dropdown.Item
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                  >
                    {product.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </div>
        </Col>
      </Row>

      {/* Bottom half with two containers */}
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="mb-3 text-center">
            <Card.Body>
              <Card.Title>Get to know us more</Card.Title>
              <Card.Text>
                Learn more about our company, our values, and our mission.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="mb-3 text-center">
            <Card.Body>
              <Card.Title>Email Us</Card.Title>
              <Button variant="primary" href="/email">Email Us</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
