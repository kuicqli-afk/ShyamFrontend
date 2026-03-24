import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeFromCart, totals, clearCart } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/">Continue to Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Order ({cartItems.length} items) </h2>

      {cartItems.map((x) => (
        <div key={x.key} className="cart-item">
          <div className="cart-product">
            {x.images?.[0] && <img src={x.images[0]} alt={x.title} />}
            <div>
              <div className="cart-product-title">{x.title}</div>
              <div className="cart-product-price">₹ {x.price}</div>
              

            </div>
          </div>

          <div className="cart-qty">
            <button onClick={() => updateQty(x.key, x.quantity - 1)}>-</button>
            <span>{x.quantity}</span>
            <button onClick={() => updateQty(x.key, x.quantity + 1)}>+</button>
          </div>

          <div className="cart-item-total">₹ {x.price * x.quantity}</div>

          <button className="cart-remove" onClick={() => removeFromCart(x.key)}>
            Remove
          </button>
        </div>
      ))}

      <hr className="cart-divider" />

      <div className="cart-summary">
        <span>Total Amount</span>
        <span>₹ {totals.subtotal}</span>

      </div>

      <div className="cart-actions">
        <button className="cart-clear" onClick={clearCart}>
          Clear Cart
        </button>
        <button className="cart-checkout" onClick={() => navigate("/checkout")}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
