import React, { useState } from "react";
import "../styles/cart.css";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const price = 80;
  const gst = 4;
  const delivery = 20;

  const total = price * quantity + gst + delivery;

  return (
    <div className="cart-container">

      {/* Header */}
      <div className="header">
        Campus Canteen
      </div>

      <h2 className="title">Shopping Cart</h2>

      {/* Cart Item */}
      <div className="card cart-item">
        <img
          src="https://source.unsplash.com/100x100/?biryani"
          alt="food"
        />

        <div className="item-details">
          <h3>Veg Biryani</h3>
          <p>Aromatic basmati rice with mixed vegetables</p>

          <div className="item-bottom">
            <span className="price">₹{price}</span>

          <div className="qty-box">
  <input
    type="number"
    min="1"
    value={quantity}
    onChange={(e) => {
      let value = e.target.value;

      // allow empty (so user can delete and type)
      if (value === "") {
        setQuantity("");
        return;
      }

      value = Number(value);

      if (value >= 1) {
        setQuantity(value);
      }
    }}
  />
</div>
          </div>
        </div>
      </div>

      {/* Bill Details */}
      <div className="card">
        <h3>Bill Details</h3>

        <div className="row">
          <span>Subtotal</span>
          <span>₹{price * quantity}</span>
        </div>

        <div className="row">
          <span>GST (5%)</span>
          <span>₹{gst}</span>
        </div>

        <div className="row">
          <span>Delivery Charges</span>
          <span>₹{delivery}</span>
        </div>

        <div className="total-box">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>

        {/* Free delivery message */}
        <div className="delivery-msg">
          🚚 Add ₹20.00 more for free delivery!
        </div>
      </div>

      {/* Buttons Card */}
      <div className="card">

       {/* Checkout Button */}
<button className="checkout-btn">
  Login to Checkout
</button>

{/* Continue Shopping Button (Same as Image) */}
<button
  className="continue-btn"
  onClick={() => window.location.href = "/"}
>
  Continue Shopping
</button>

      </div>

    </div>
  );
};

export default Cart;