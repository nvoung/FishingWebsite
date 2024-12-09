import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl, Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Logo from "./logo.png";

const TopNavBar = ({
  catalog,
  setCatalog,
  filteredCatalog,
  setFilteredCatalog,
  categories,
  cart,
  cartTotal
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredCatalog(catalog);
  };

  const filterCategory = (tag) => {
    const results = catalog.filter((eachProduct) => eachProduct.category === tag);
    setFilteredCatalog(results);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const results = catalog.filter((eachProduct) => 
      e.target.value === "" ? catalog : eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredCatalog(results);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, cartTotal } });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="w-100" style={{ width: '100%' }}>
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="d-inline-block align-top"
              style={{ height: "40px", marginRight: "20px", marginLeft: "20px"}}
            />
          </Link>
          {' '} NVDC Fishing
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {categories.map((tag) => (
              <Button
                variant="warning"
                className="mb-2 me-2 btn-sm"
                style={{ marginLeft: "20px" }}
                onClick={() => filterCategory(tag)}
                key={tag}
              >
                {tag}
              </Button>
            ))}
          </Nav>
          <div className="d-flex ms-auto align-items-center">
            <Dropdown alignRight className="me-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.ItemText>Cart Summary</Dropdown.ItemText>
                {cart.map((product, index) => (
                  <Dropdown.Item key={index} className="d-flex justify-content-between">
                    <span>{product.title}</span>
                    <span>${product.price}</span>
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.ItemText><strong>Total: ${cartTotal.toFixed(2)}</strong></Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Button variant="primary" className="w-100" onClick={handleCheckout}>Go to Checkout</Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <InputGroup style={{ maxWidth: "400px" }}>
              <FormControl
                placeholder="Search products..."
                aria-label="Search products"
                value={searchTerm}
                onChange={handleChange}
              />
              <Button variant="outline-secondary" onClick={clearSearch}>
                <i className="bi bi-x"></i>
              </Button>
            </InputGroup>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
