import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Footer from './footer'; // Import Footer component


function CartCheckout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const cart = location.state?.cart || [];
  const cartTotal = location.state?.cartTotal || 0;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/purchase', { state: { cart, cartTotal, fullName: data.firstName + " " + data.lastName, cardNumber: data.creditCard, email: data.email } });
  };

  const handleBack = () => {
    navigate('/', { state: { cart, cartTotal } });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <button className="btn btn-secondary" onClick={handleBack}>
            Back to Products
          </button>
        </div>
      </nav>
      <div className="container">
        <h1>Your Cart</h1>
      </div>
      <div className="container mb-4 p-3 bg-light border rounded">
        <h2>Cart Items</h2>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <img src={product.image} alt={product.title} width={50} />
              <div>{product.title}</div>
              <div>${product.price}</div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h2>Total: ${cartTotal.toFixed(2)}</h2>
      </div>
      <div className="container">
        <h1>Checkout</h1>
      </div>
      <div className="container p-3 bg-light border rounded">
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          <div className="form-group">
            <input
              {...register("firstName", { required: true })}
              placeholder="First Name"
              className="form-control"
            />
            {errors.firstName && (
              <p className="text-danger">First Name is required.</p>
            )}
          </div>
          <div className="form-group">
            <input
              {...register("lastName", { required: true })}
              placeholder="Last Name"
              className="form-control"
            />
            {errors.lastName && (
              <p className="text-danger">Last Name is required.</p>
            )}
          </div>
          <div className="form-group">
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email"
              className="form-control"
            />
            {errors.email && <p className="text-danger">Email is required.</p>}
          </div>
          <div className="form-group">
            <input
              {...register("address", { required: true })}
              placeholder="Address"
              className="form-control"
            />
            {errors.address && (
              <p className="text-danger">Address is required.</p>
            )}
          </div>
          <div className="form-group">
            <input
              {...register("address2")}
              placeholder="Address 2"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              {...register("city", { required: true })}
              placeholder="City"
              className="form-control"
            />
            {errors.city && <p className="text-danger">City is required.</p>}
          </div>
          <div className="form-group">
            <input
              {...register("state", { required: true })}
              placeholder="State"
              className="form-control"
            />
            {errors.state && <p className="text-danger">State is required.</p>}
          </div>
          <div className="form-group">
            <input
              {...register("zip", { required: true })}
              placeholder="Zip"
              className="form-control"
            />
            {errors.zip && <p className="text-danger">Zip is required.</p>}
          </div>
          <h4 className="mb-3">Payment</h4>
          <div className="my-3">
            <div className="form-check">
              <input
                id="credit"
                {...register("paymentMethod", {
                  required: "Payment method is required",
                })}
                type="radio"
                value="credit"
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="credit">
                Credit card
              </label>
            </div>
            <div className="form-check">
              <input
                id="debit"
                {...register("paymentMethod", {
                  required: "Payment method is required",
                })}
                type="radio"
                value="debit"
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="debit">
                Debit card
              </label>
            </div>
            <div className="form-check">
              <input
                id="paypal"
                {...register("paymentMethod", {
                  required: "Payment method is required",
                })}
                type="radio"
                value="paypal"
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="paypal">
                PayPal
              </label>
            </div>
          </div>
          {errors.paymentMethod && (
            <p className="text-danger">{errors.paymentMethod.message}</p>
          )}
          <div className="form-group">
            <input
              {...register("creditCard", { required: true })}
              placeholder="Credit Card #"
              className="form-control"
            />
            {errors.creditCard && (
              <p className="text-danger">Credit Card Number is required.</p>
            )}
          </div>
          <div className="form-group">
            <input
              {...register("expiration", { required: true })}
              placeholder="Expiration Date"
              className="form-control"
            />
            {errors.expiration && (
              <p className="text-danger">Expiration Date is required.</p>
            )}
          </div>
          <div className="form-group">
            <input
              {...register("cvv", { required: true })}
              placeholder="CVV #"
              className="form-control"
            />
            {errors.cvv && (
              <p className="text-danger">CVV Number is required.</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Purchase
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default CartCheckout;
