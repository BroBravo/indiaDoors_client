import { useState } from "react";
import styles from "./index.module.scss";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const formatCurrency = (num) => `₹${num.toFixed(2)}`;

  const totalAmount = cartItems.reduce((sum, item) => {
    const qty = +item.quantity || 0;
    return sum + (+item.item_amount * qty);
  }, 0);

 const handleCheckout = async () => {
  setLoading(true);
  try {

    const res = await axios.post(`${baseURL}/pay/checkout`, {

      cartItems,
      totalAmount,
    }, { withCredentials: true });

    const { orderId, amount, currency } = res.data;

    const options = {
      key: "rzp_test_3GEW4MGgYEd2PR", // ✅ Replace with Razorpay test key
      amount,
      currency,
      name: "India Doors",
      description: "Custom Door Payment",
      order_id: orderId,
      handler: function (response) {
        alert("Payment successful!");
        clearCart();
        navigate("/order-success");
        // ✅ Optionally send response.razorpay_payment_id to backend for verification
      },
      prefill: {
        name: user?.username,
        email: "test@example.com", // can be dynamic
        contact: "9999999999"
      },
      theme: {
        color: "#F37254"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Checkout failed");
  } finally {
    setLoading(false);
  }
};


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
        <hr />
        <div className={styles.totalRow}>
          <strong>Total:</strong>
          <strong>{formatCurrency(totalAmount)}</strong>
        </div>
        <button
          className={styles.checkoutBtn}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
