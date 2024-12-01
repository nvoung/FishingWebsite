import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
function PurchaseInfo() {
  const navigate = useNavigate();
  const location = useLocation(); // Retrieve data from location.state
  const cart = location.state?.cart || [];
  const cartTotal = location.state?.cartTotal || 0;
  const { fullName, cardNumber, email } = location.state || {
    fullName: "User",
    cardNumber: "",
    email: "user@example.com",
  }; // Extract last four digits of card number
  // const lastFourDigits = (typeof cardNumber === 'string' && cardNumber.length >= 4) ? cardNumber.substring(cardNumber.length - 4) : "0000";
  const handleBackToProducts = () => {
    navigate("/");
  };
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
        </div>
      </nav>
    <div className="container">
      <h1>Thank You for Your Purchase!</h1>
      
      <div className="mb-4 p-3 bg-light border rounded">
        <h2>Order Summary</h2>
        <p>Name: {fullName}</p>
      {/* <p>Last Four Digits of Card Number: **** **** **** {cardNumber}</p> */}
      <p>Email: {email}</p>
        <h2>Cart Items</h2>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <img src={product.image} alt={product.title} width={50} />
              <div>{product.title}</div> <div>${product.price}</div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h2>Total: ${cartTotal.toFixed(2)}</h2>
      </div>
      <button className="btn btn-primary" onClick={handleBackToProducts}>
        {" "}
        Back to Store{" "}
      </button>
    </div>
    </div>
  );
}

export default PurchaseInfo;
