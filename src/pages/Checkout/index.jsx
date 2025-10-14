// import { useState, useEffect } from "react";
// import styles from "./index.module.scss";
// import { useCart } from "../../context/cartContext";
// import { useUser } from "../../context/userContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import AddressSection from "../../components/address/section";
// //import { validateAddress } from "../../components/address/form";

// const CheckoutPage = () => {
//   const { cartItems, clearCart } = useCart();
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const baseURL = process.env.REACT_APP_BASE_URL;
//   const formatCurrency = (num) => `₹${num.toFixed(2)}`;

// // ⬇️ hold the selected address details from AddressSection
//   const [shipChoice, setShipChoice] = useState({
//     selection: "custom",            // 'billing' | 'shipping' | 'custom'
//     shipping_address_id: null,      // if using saved
//     shipping_address: null          // full address object (for custom)
//   });

//   const totalAmount = cartItems.reduce((sum, item) => {
//     const qty = +item.quantity || 0;
//     return sum + (+item.item_amount * qty);
//   }, 0);

// //  const handleCheckout = async () => {
// //   setLoading(true);
// //   try {

// //     const res = await axios.post(`${baseURL}/pay/checkout`, {

// //       cartItems,
// //       totalAmount,
// //     }, { withCredentials: true });

// //     const { orderId, amount, currency } = res.data;

// //     const options = {
// //       key: "rzp_test_3GEW4MGgYEd2PR", // ✅ Replace with Razorpay test key
// //       amount,
// //       currency,
// //       name: "India Doors",
// //       description: "Custom Door Payment",
// //       order_id: orderId,
// //       handler: function (response) {
// //         alert("Payment successful!");
// //         clearCart();
// //         navigate("/order-success");
// //         // ✅ Optionally send response.razorpay_payment_id to backend for verification
// //       },
// //       prefill: {
// //         name: user?.username,
// //         email: "test@example.com", // can be dynamic
// //         contact: "9999999999"
// //       },
// //       theme: {
// //         color: "#F37254"
// //       }
// //     };

// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   } catch (err) {
// //     console.error(err);
// //     alert("Checkout failed");
// //   } finally {
// //     setLoading(false);
// //   }
// // };
//  useEffect(() => {
//   if (!user) {
//     navigate("/home");
//   }
// }, [user, navigate]);

//   // const isCustomInvalid =
//   //   shipChoice.selection === "custom" &&
//   //   !!validateAddress(shipChoice.shipping_address || {});

// const handleCheckout = async () => {
    
//    if (shipChoice.selection === "custom") {
//       const err = validateAddress(shipChoice.shipping_address || {});
//       if (err) {
//         alert(`Please fix address: ${err}`);
//         return;
//       }
//     }
  
//   setLoading(true);
//     try {
//       await axios.post(`${baseURL}/user/cart/initiatePayment`, {}, { withCredentials: true });

//     // Build payload with address choice
//       const checkoutPayload = {
//         cartItems,
//         totalAmount,
//         shipping_selection: shipChoice.selection,           // 'billing' | 'shipping' | 'custom'
//         shipping_address_id: shipChoice.shipping_address_id, // numeric or null
//         shipping_address: shipChoice.shipping_address,       // full object if custom (do NOT persist to address book unless backend decides to)
//       };

//       // 1️⃣ Call backend to create order + payments entry + Razorpay order
//       const res = await axios.post(
//         `${baseURL}/pay/checkout`,
//          checkoutPayload,
//         { withCredentials: true }
//       );

//       const { orderId, amount, currency } = res.data;

//       // 2️⃣ Razorpay options
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY, // use env key, not hardcoded
//         amount,
//         currency,
//         name: "India Doors",
//         description: "Custom Door Payment",
//         order_id: orderId, // Razorpay orderId (not our DB id)
//         handler: async function (response) {
//           try {
//             // 3️⃣ Verify payment on backend
//             await axios.post(
//               `${baseURL}/pay/verify`,
//               {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               },
//               { withCredentials: true }
//             );

//             alert("Payment successful!");
//             clearCart();
//             navigate("/home");
//           } catch (err) {
//             console.error("Verification failed", err);
//             alert("Payment verification failed!");
//           }
//         },
//         prefill: {
//           name: user?.username || "Guest",
//           email: user?.email || "test@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3b82f6",
//         },
//       };

//       // 4️⃣ Open Razorpay Checkout
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Checkout failed", err);
//       alert("Checkout failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <>
//        <Helmet>
//                 <title>Checkout | India Doors</title>
//        </Helmet>
//     <div className={styles.checkoutContainer}>
       
//       <h1>Checkout</h1>
//       <div className={styles.summaryBox}>
//         {cartItems.map((item, idx) => (
//           <div key={idx} className={styles.summaryItem}>
//             <p>{item.item_name} x {item.quantity}</p>
//             <p>{formatCurrency(+item.item_amount * item.quantity)}</p>
//           </div>
//         ))}
//         <hr />
//         <div className={styles.totalRow}>
//           <strong>Total:</strong>
//           <strong>{formatCurrency(totalAmount)}</strong>
//         </div>

//          <AddressSection baseURL={baseURL} onChange={setShipChoice} />
//         <button
//           className={styles.checkoutBtn}
//           onClick={handleCheckout}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Confirm & Pay"}
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default CheckoutPage;
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
        totalAmount,
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
