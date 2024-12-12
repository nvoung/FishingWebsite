import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import Logo from "./logo.png"

const Author = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="w-100" style={{ width: '100%' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={Logo}
              alt="Logo"
              className="d-inline-block align-top"
              style={{ height: "40px", marginRight: "20px", marginLeft: "20px"}}
            />
            {' '} NVDC Fishing
          </Navbar.Brand>
        </Container>
      </Navbar>
      
      <Container className="mt-5">
        <h1>About the Authors</h1>
        <hr className="featurette-divider" style={{ marginTop: '100px' }} />

        <Row className="featurette">
          <Col md={7} className="order-md-2">
            <h2 style={{ textDecoration: 'underline', textAlign: 'center', marginRight: '120px' }}>Nathan Voung</h2>
            <p style={{
              marginTop: '50px',
              textAlign: 'center',
              backgroundColor: 'lightgrey',
              display: 'inline-block',
              width: '800px',
              paddingTop: '25px',
              paddingBottom: '25px',
              borderRadius: '25px'
            }}>
              Hello, my name is Nathan Voung. I am a author of this website. I decided to create this website
              because of how much I enjoy Fishing and the outdoors. This website is a representation of how I would
              want my online store to look like. It is compiled of many products that I have used myself<br />
              <strong>Course:</strong> 3090 Construction Of User Interfaces <br />
              <strong>Professor Name:</strong> Abraham Aldaco <br />
              <strong>Author email:</strong> nvoung@iastate.edu <br />
              <strong>Date:</strong> December 10, 2024 <br />
            </p>
          </Col>
          <Col md={5} className="order-md-1">
            <img
              src="/photos/profile.jpg"
              alt="Profile Picture"
              style={{ marginLeft: '75px', borderRadius: '50%', paddingRight: '0px' }}
            />
          </Col>
        </Row>

        <hr className="featurette-divider" />
      </Container>

      <Container className="mt-5">
        
        <Row className="featurette">
          <Col md={7} className="order-md-2">
            <h2 style={{ textDecoration: 'underline', textAlign: 'center', marginRight: '120px' }}>Doyle Chism</h2>
            <p style={{
              marginTop: '50px',
              textAlign: 'center',
              backgroundColor: 'lightgrey',
              display: 'inline-block',
              width: '800px',
              paddingTop: '25px',
              paddingBottom: '25px',
              borderRadius: '25px'
            }}>
              My name is Doyle Chism and I created this webiste in order to display products I am interested in 
              and portay it to others. I wanted to stregthen my knowledge of developing a full-stack application
              and also integrate hobbies I am interested in.<br />
              <strong>Course:</strong> 3090 Construction Of User Interfaces <br />
              <strong>Professor Name:</strong> Abraham Aldaco <br />
              <strong>Author email:</strong> dchism03@iastate.edu <br />
              <strong>Date:</strong> December 10, 2024 <br />
            </p>
          </Col>
          <Col md={5} className="order-md-1">
            <img
              src="/photos/profileDoyle.png"
              alt="Profile Picture"
              style={{ marginLeft: '75px', borderRadius: '50%', paddingRight: '0px' }}
            />
          </Col>
        </Row>

        <hr className="featurette-divider" />
      </Container>
    </div>
  );
};

export default Author;
