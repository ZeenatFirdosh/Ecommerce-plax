/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// src/components/CheckoutForm.js
// npm install react-stripe-elements

import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = ({ stripe }) => {
  const [paymentError, setPaymentError] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await loadStripe("your-publishable-key"); 
    const body = { cartItems }; 
    // Create a payment intent on your backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const paymentIntent = await response.json();

    // Confirm the payment intent with the collected card details
    const { paymentIntent: confirmedPaymentIntent, error } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: {
        card: stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        }),
      },
    });

    if (error) {
      setPaymentError(error.message);
    } else {
      // Payment successful, handle success (e.g., redirect or show success message)
      console.log('Payment succeeded:', confirmedPaymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Card details
          <CardElement />
        </label>
      </div>
      <button type="submit">Pay</button>

      {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
    </form>
  );
};

export default injectStripe(CheckoutForm);

