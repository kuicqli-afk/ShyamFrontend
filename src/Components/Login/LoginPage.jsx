import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage({ closeModal }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    setError("");

    if (mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return false;
    }

    if (otp.length < 4 || otp.length > 6) {
      setError("OTP must be 4 to 6 digits");
      return false;
    }

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      closeModal();      // ✅ only close modal
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <label>Mobile Number</label>
        <input
          type="tel"
          maxLength={10}
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label>OTP</label>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <div className="login-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
}
