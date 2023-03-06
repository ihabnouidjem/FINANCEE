import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

function Payment() {
  return (
    <div className="payment" id="homePayment">
      <div className="payment-header">
        <h4 className="h4 black-90">PAYMENT PROCESSIGN</h4>
      </div>
      <div className="payment-p-item">
        <p className="p black-50 text-center">
          We use two payment processing functionalities, Stripe, and satim.
          which accepts payments through a variety of methods.
        </p>
      </div>
      <div className="payment-btn-container">
        <Link
          href="https://stripe.com"
          target={"_blank"}
          className="payment-btn hover-text-btn"
        >
          <h6 className="h6 black-90">Stripe</h6>
          <i className="icon-32 black-90">
            <FiArrowUpRight />
          </i>
        </Link>
        <Link
          href="https://satim.dz/fr/"
          target={"_blank"}
          className="payment-btn hover-text-btn"
        >
          <h6 className="h6 black-90">Satim</h6>
          <i className="icon-32 black-90">
            <FiArrowUpRight />
          </i>
        </Link>
      </div>
    </div>
  );
}

export default Payment;
