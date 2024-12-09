import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto" style={{width: '100%'}}>
      <Container>
        <Row>
          <Col className="text-end">
            <Link to="/about" className="text-light">
              About Us
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
