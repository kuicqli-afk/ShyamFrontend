import React, { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return <h2>No Orders Found</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Order History</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ₹ {order.total}</p>
        </div>
      ))}
    </div>
  );
}
