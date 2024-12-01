import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import TopNavBar from "./TopNavBar";
import Footer from './footer'; // Import Footer component

function ProductDetail({ catalog, cart, setCart, cartTotal }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!catalog) {
    return <div>Loading...</div>;
  }

  const product = catalog.find(item => item.id === parseInt(id));
  const recommendedProducts = catalog
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    const updatedCart = [...cart];
    for (let i = 0; i < quantity; i++) {
      updatedCart.push(product);
    }
    setCart(updatedCart);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
  };

  const goBack = () => {
    navigate('/');
  };

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <TopNavBar 
        catalog={catalog} 
        cart={cart} 
        cartTotal={cartTotal} 
        setCatalog={() => {}} // Dummy function to prevent errors
        filteredCatalog={[]}  // Dummy prop to prevent errors
        setFilteredCatalog={() => {}} // Dummy function to prevent errors
        categories={[]} // Dummy prop to prevent errors
      />
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img variant="top" src={product.image} />
            </Card>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <Card className="w-100">
              <Card.Body className="text-center">
                <Card.Title className="mb-4">{product.title}</Card.Title>
                <Card.Text className="mb-4">
                  <strong>Price:</strong> ${product.price} <br />
                  <strong>Category:</strong> {product.category} <br />
                  <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews) <br />
                  <strong>Description:</strong> This is a detailed description of the product.
                </Card.Text>
                <ButtonGroup className="mb-4">
                  <Button variant="light" onClick={() => handleQuantityChange(-1)}>-</Button>
                  <Button variant="light" disabled>{quantity}</Button>
                  <Button variant="light" onClick={() => handleQuantityChange(1)}>+</Button>
                </ButtonGroup>
                <br />
                <Button variant="primary" className="mt-3 me-2" onClick={handleAddToCart}>Add to Cart</Button>
                <Button variant="secondary" className="mt-3" onClick={goBack}>Back to Products</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Recommended Products</h4>
          </Col>
        </Row>
        <Row>
          {recommendedProducts.map(recProduct => (
            <Col md={4} key={recProduct.id} className="mb-4">
              <Card onClick={() => goToProductDetail(recProduct.id)} style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={recProduct.image} />
                <Card.Body>
                  <Card.Title>{recProduct.title}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${recProduct.price} <br />
                    <strong>Rating:</strong> {recProduct.rating.rate} ({recProduct.rating.count} reviews)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default ProductDetail;
