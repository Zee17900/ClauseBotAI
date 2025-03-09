import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Choose a Payment Plan</h1>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Payment;
