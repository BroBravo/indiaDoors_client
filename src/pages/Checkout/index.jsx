
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AddressSection from "../../components/address/section";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const formatCurrency = (num) => `₹${num.toFixed(2)}`;
  const [shippingFee, setShippingFee] = useState(0);
  const [shipLoading, setShipLoading] = useState(false);
  const [shipError, setShipError] = useState("");

  const subtotal = cartItems.reduce((sum, item) => {
    const qty = +item.quantity || 0;
    return sum + (+item.item_amount * qty);
  }, 0);

  const grandTotal = subtotal + (Number(shippingFee) || 0);

  // ⬇️ include shipping_errors in the shape
  const [shipChoice, setShipChoice] = useState({
    selection: "custom",                 // 'billing' | 'shipping' | 'custom'
    shipping_address_id: null,           // if using saved
    shipping_address: null,              // full address object (for custom)
    shipping_errors: {},                 // ⬅️ per-field errors from AddressForm
  });

  const totalAmount = cartItems.reduce((sum, item) => {
    const qty = +item.quantity || 0;
    return sum + (+item.item_amount * qty);
  }, 0);

  useEffect(() => {
    if (!user) navigate("/home");
  }, [user, navigate]);

  // ⬇️ derived flags for UX + safety
  const hasCustomErrors =
    shipChoice.selection === "custom" &&
    shipChoice.shipping_errors &&
    Object.keys(shipChoice.shipping_errors).length > 0;

  const isCustomMissing =
    shipChoice.selection === "custom" && !shipChoice.shipping_address;

  const handleCheckout = async () => {
    if (loading) return; // prevent double click

    // Basic guards
    if (!cartItems?.length) {
      alert("Your cart is empty.");
      return;
    }
    if (!totalAmount || totalAmount <= 0) {
      alert("Invalid order amount.");
      return;
    }
    if (!shipChoice?.selection) {
      alert("Please choose a shipping address.");
      return;
    }

    // Custom address validation using per-field error object
    if (shipChoice.selection === "custom") {
      if (isCustomMissing) {
        alert("Please fill your shipping address.");
        return;
      }
      if (hasCustomErrors) {
        alert("Please fix the highlighted address fields.");
        return;
      }
    }

    setLoading(true);
    try {
      // Optional: lock cart / pending window
      await axios.post(
        `${baseURL}/user/cart/initiatePayment`,
        {},
        { withCredentials: true }
      );

      // Build payload with chosen address (no need to send shipping_errors to backend)
      const checkoutPayload = {
        cartItems,
        totalAmount: grandTotal,
        shipping_selection: shipChoice.selection,
        shipping_address_id: shipChoice.shipping_address_id,
        shipping_address: shipChoice.shipping_address,
      };

      const res = await axios.post(
        `${baseURL}/pay/checkout`,
        checkoutPayload,
        { withCredentials: true }
      );

      const { orderId, amount, currency } = res.data || {};
      if (!orderId || !amount || !currency) {
        throw new Error("Payment initialization failed: missing order details.");
      }

      if (!(window && window.Razorpay)) {
        alert("Payment SDK not loaded. Please refresh the page and try again.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount,
        currency,
        name: "India Doors",
        description: "Custom Door Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            await axios.post(
              `${baseURL}/pay/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            alert("Payment successful!");
            clearCart();
            navigate("/home");
          } catch (err) {
            console.error("Verification failed", err);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: user?.username || "Guest",
          email: user?.email || "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3b82f6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout failed", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Checkout failed. Try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const canQuote =
    cartItems?.length &&
    shipChoice?.selection === "custom" &&
    shipChoice.shipping_address &&
    !hasCustomErrors;

  if (!canQuote) {
    setShippingFee(0);
    setShipError("");
    return;
  }

  const t = setTimeout(async () => {
    setShipLoading(true);
    setShipError("");
    try {
      const resp = await axios.post(
        `${baseURL}/shipping/delhivery/quote`,
        {
          cartItems,
          shipping_address: shipChoice.shipping_address,
        },
        { withCredentials: true }
      );

      const fee = resp?.data?.quote?.shipping_fee;
      setShippingFee(Number(fee) || 0);
    } catch (e) {
      setShippingFee(0);
      setShipError(e?.response?.data?.message || "Could not fetch shipping estimate");
    } finally {
      setShipLoading(false);
    }
  }, 600); // debounce to protect rate limit

  return () => clearTimeout(t);
}, [cartItems, shipChoice, hasCustomErrors, baseURL]);


  return (
    <>
      <Helmet>
        <title>Checkout | India Doors</title>
      </Helmet>

      <div className={styles.checkoutContainer}>
        <h1>Checkout</h1>

        <div className={styles.summaryBox}>
          {cartItems.map((item, idx) => (
            <div key={idx} className={styles.summaryItem}>
              <p>{item.item_name} x {item.quantity}</p>
              <p>{formatCurrency(+item.item_amount * item.quantity)}</p>
            </div>
          ))}

          {/* <hr />
          <div className={styles.totalRow}>
            <strong>Total:</strong>
            <strong>{formatCurrency(totalAmount)}</strong>
          </div> */}

          <div className={styles.totalRow}>
            <span>Subtotal:</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>

          <div className={styles.totalRow}>
            <span>Shipping (est.):</span>
            <strong>
              {shipLoading ? "Calculating..." : formatCurrency(shippingFee)}
            </strong>
          </div>

          {shipError ? <p style={{ color: "red" }}>{shipError}</p> : null}

          <hr />

          <div className={styles.totalRow}>
            <span>Total:</span>
            <strong>{formatCurrency(grandTotal)}</strong>
          </div>


          {/* Address selector emits shipping_address + shipping_errors */}
          <AddressSection baseURL={baseURL} onChange={setShipChoice} />

          <button
            className={styles.checkoutBtn}
            onClick={handleCheckout}
            // Proactively disable when form has field errors or missing custom addr
            disabled={loading || hasCustomErrors || isCustomMissing}
            title={
              hasCustomErrors
                ? "Please fix the highlighted address fields"
                : isCustomMissing
                ? "Please fill your shipping address"
                : ""
            }
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
