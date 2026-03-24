import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { useCart } from "../../Context/CartContext";
import "./CheckoutPage.css"
export default function CheckoutPage() {
  const { cartItems, totals, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderDetails, setOrderDetails] = useState(null);

  const DELIVERY = 49;
  const SERVICE = 19;
  const subtotal = totals?.subtotal || 0;
  const total = subtotal + DELIVERY + SERVICE;


  const handleStepClick = (clickedStep) => {
    if (step === 4) return; // lock after order confirm
    if (clickedStep <= step) {
      setStep(clickedStep);
    }
  };

  const isAddressValid = () => {
    return (
      address.name &&
      address.phone &&
      address.street &&
      address.city &&
      address.pincode
    );
  };

  // Handle Place Order
  const handlePlaceOrder = () => {
    const orderId = "ORD" + Math.floor(Math.random() * 100000);
    setOrderDetails({ id: orderId, total });
    clearCart();
    setStep(4);
  };

  // Progress Bar Component
  const ProgressBar = () => (
    <div className="progress-bar">
      <div
        className={step >= 1 ? "active" : ""}
        onClick={() => handleStepClick(1)}
      >
        Cart
      </div>

      <div
        className={step >= 2 ? "active" : ""}
        onClick={() => handleStepClick(2)}
      >
        Address
      </div>

      <div
        className={step >= 3 ? "active" : ""}
        onClick={() => handleStepClick(3)}
      >
        Payment
      </div>

      <div
        className={step >= 4 ? "active" : ""}
        onClick={() => handleStepClick(4)}
      >
        Confirm
      </div>
    </div>
  );


  return (
    <div className="checkout-container">
      <ProgressBar />

      {/* STEP 1 - CART */}
      {step === 1 && (
        <div className="checkout-left">
          <h3>Your Cart</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <div className="item-left">
                <p className="item-title">{item.title}</p>
                <p className="item-qty">Quantity: (x{item.quantity})</p>
              </div>
              <div className="item-right">₹ {item.price * item.quantity}</div>
            </div>
          ))}

          <div className="cart-total">
            <span>Total - </span>
            <span>₹ {subtotal}</span>
          </div>


        </div>
      )}


      {/* STEP 2 - ADDRESS */}
      {step === 2 && (
        <div className="checkout-left">
          <h2>Shipping Address</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Recipient's Full Name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              placeholder="House number and street name"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Apartment, Suite, Unit (Optional)</label>
            <input
              type="text"
              placeholder="Apartment, suite, unit, building, floor, etc."
              value={address.apartment || ""}
              onChange={(e) =>
                setAddress({ ...address, apartment: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>State </label>
              <input
                type="text"
                placeholder="State"
                value={address.state || ""}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                placeholder="Country"
                value={address.country || ""}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}


      {/* STEP 3 - PAYMENT */}
      {step === 3 && (
        <div className="checkout-left">
          <h2>Select Payment Method</h2>

          <div className="payment-methods">

            {/* CARD OPTION */}
            <div
              className={`payment-option ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")}
            >
              <input
                type="radio"
                checked={paymentMethod === "card"}
                readOnly
              />
              <span>Credit / Debit Card</span>
            </div>

            {paymentMethod === "card" && (
              <div className="payment-form">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={cardDetails.nameOnCard}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, nameOnCard: e.target.value })
                  }
                />

                <div className="form-row">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* UPI OPTION */}
            <div
              className={`payment-option ${paymentMethod === "upi" ? "active" : ""}`}
              onClick={() => setPaymentMethod("upi")}
            >
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                readOnly
              />
              <span>UPI</span>
            </div>

            {paymentMethod === "upi" && (
              <div className="payment-form">
                <input
                  type="text"
                  placeholder="Enter UPI ID (example@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}

            {/* COD OPTION */}
            <div
              className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}
              onClick={() => setPaymentMethod("cod")}
            >
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                readOnly
              />
              <span>Cash on Delivery</span>
            </div>

            {paymentMethod === "cod" && (
              <div className="cod-info">
                <p>
                  Pay in cash when your order is delivered. Additional ₹20 handling
                  charges may apply.
                </p>
              </div>
            )}
          </div>
        </div>
      )}


      {/* STEP 4 - CONFIRMATION */}
      {step === 4 && (
        <div className="checkout-left success-screen">
          <h2>🎉 Order Confirmed!</h2>
          <p>Order ID: {orderDetails?.id}</p>
          <p>Total Paid: ₹ {orderDetails?.total}</p>

        </div>
      )}

      {/* RIGHT SUMMARY */}
      {step !== 4 && (
        <div className="checkout-right">
          <h3>Your Order</h3>

          <div className="price-row">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className="price-row">
            <span>Delivery</span>
            <span>₹ {DELIVERY}</span>
          </div>

          <div className="price-row">
            <span>Service</span>
            <span>₹ {SERVICE}</span>
          </div>

          <div className="price-row coupon-row">
            <input type="text" placeholder="Enter Coupon" className="coupon-input" />
            <button className="apply-coupon-btn">Apply</button>
          </div>

          <hr />

          <div className="price-total">
            <span>TO PAY</span>
            <span>₹ {total}</span>
          </div>

          {/* 🔥 Yahan Button */}
          <div className="summary-action">
            {step === 1 && (
              <button
                className="confirm-order-btn"
                disabled={cartItems.length === 0}
                onClick={() => setStep(2)}
              >
                Continue to Address
              </button>
            )}

            {step === 2 && (
              <button
                className="confirm-order-btn"
                disabled={isAddressValid()}
                onClick={() => setStep(3)}
              >
                Continue to Payment
              </button>
            )}

            {step === 3 && (
              <button
                className="confirm-order-btn"
                onClick={handlePlaceOrder}
              >
                Pay ₹ {total}
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
