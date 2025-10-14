// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import AddressForm , {validateAddress} from "./form";
// import styles from "./index.module.scss";

// /**
//  * AddressSection
//  * Responsibilities:
//  * - Fetch saved addresses (billing/shipping) for the logged-in user
//  * - Show radio options based on availability:
//  *   * Billing (read-only) if available
//  *   * Shipping (read-only) if available
//  *   * Custom (editable) always
//  * - If none exist -> show "No saved address" and default to Custom
//  * - Emits the currently selected shipping address upward via onChange(addressPayload)
//  *
//  * API EXPECTATION (adjust if your API differs):
//  * GET {baseURL}/user/addresses  ->  { billing: Address | null, shipping: Address | null }
//  *
//  * Emitted payload shape (proposal):
//  * {
//  *   selection: "billing" | "shipping" | "custom",
//  *   shipping_address_id: number | null,   // if using saved id (for billing or shipping)
//  *   shipping_address: Address | null      // full address (for "custom" or to echo selected)
//  * }
//  */
// export default function AddressSection({ baseURL, onChange = () => {} }) {
//   const [loading, setLoading] = useState(true);
//   const [saved, setSaved] = useState({ billing: null, shipping: null });
//   const [selected, setSelected] = useState("custom"); // "billing" | "shipping" | "custom"
//   const [customAddr, setCustomAddr] = useState(null);
//   const [error, setError] = useState("");

//   // Fetch saved addresses
//   useEffect(() => {
//     let isMounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${baseURL}/user/addresses`, {
//           withCredentials: true,
//         });
//         const billing = res.data?.billing || null;
//         const shipping = res.data?.shipping || null;

//         if (!isMounted) return;
//         setSaved({ billing, shipping });

//         // Choose a sensible default
//         if (shipping) setSelected("shipping");
//         else if (billing) setSelected("billing");
//         else setSelected("custom");
//       } catch (e) {
//         // If API fails, just fall back to custom
//         setSaved({ billing: null, shipping: null });
//         setSelected("custom");
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     })();
//     return () => (isMounted = false);
//   }, [baseURL]);

//   // Keep parent informed of current selection
//   useEffect(() => {
//     const payload = (() => {
//       if (selected === "billing" && saved.billing) {
//         return {
//           selection: "billing",
//           shipping_address_id: saved.billing.id ?? null,
//           shipping_address: saved.billing, // echo full address (handy for summary)
//         };
//       }
//       if (selected === "shipping" && saved.shipping) {
//         return {
//           selection: "shipping",
//           shipping_address_id: saved.shipping.id ?? null,
//           shipping_address: saved.shipping,
//         };
//       }
//       // custom
//       return {
//         selection: "custom",
//         shipping_address_id: null,
//         shipping_address: customAddr || null,
//       };
//     })();

//     onChange(payload);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selected, customAddr, saved]);

//   const hasAnySaved = !!(saved.billing || saved.shipping);

//   const showNoSavedMessage = !saved.billing && !saved.shipping;

//   // Validate only for custom
//   useEffect(() => {
//     if (selected !== "custom") {
//       setError("");
//       return;
//     }
//     const err = validateAddress(customAddr || {});
//     setError(err || "");
//   }, [selected, customAddr]);

//   return (
//     <section className={styles.addressSection}>
//       <h2>Choose Shipping Address</h2>

//       {loading ? (
//         <div className={styles.skeleton}>Loading addresses…</div>
//       ) : (
//         <>
//           {showNoSavedMessage && (
//             <div className={styles.noSaved}>No saved address found.</div>
//           )}

//           <div className={styles.radioGroup}>
//             {saved.billing && (
//               <label className={styles.radioItem}>
//                 <input
//                   type="radio"
//                   name="ship-address"
//                   value="billing"
//                   checked={selected === "billing"}
//                   onChange={() => setSelected("billing")}
//                 />
//                 <span>Use Billing Address</span>
//               </label>
//             )}

//             {saved.shipping && (
//               <label className={styles.radioItem}>
//                 <input
//                   type="radio"
//                   name="ship-address"
//                   value="shipping"
//                   checked={selected === "shipping"}
//                   onChange={() => setSelected("shipping")}
//                 />
//                 <span>Use Shipping Address</span>
//               </label>
//             )}

//             <label className={styles.radioItem}>
//               <input
//                 type="radio"
//                 name="ship-address"
//                 value="custom"
//                 checked={selected === "custom"}
//                 onChange={() => setSelected("custom")}
//               />
//               <span>Ship to Custom Address</span>
//             </label>
//           </div>

//           {/* Billing (read-only) */}
//           {selected === "billing" && saved.billing && (
//             <div className={styles.block}>
//               <h4>Billing Address</h4>
//               <AddressForm readOnly value={saved.billing} onChange={() => {}} />
//             </div>
//           )}

//           {/* Shipping (read-only) */}
//           {selected === "shipping" && saved.shipping && (
//             <div className={styles.block}>
//               <h4>Shipping Address</h4>
//               <AddressForm readOnly value={saved.shipping} onChange={() => {}} />
//             </div>
//           )}

//           {/* Custom (editable) */}
//           {selected === "custom" && (
//             <div className={styles.block}>
//               <h4>Custom Shipping Address</h4>
//               <AddressForm
//                 readOnly={false}
//                 value={customAddr}
//                 onChange={setCustomAddr}
//               />
//               {error && <div className={styles.error}>{error}</div>}
//             </div>
//           )}
//         </>
//       )}
//     </section>
//   );
// }
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import AddressForm from "./form";
import styles from "./index.module.scss";

export default function AddressSection({ baseURL, onChange = () => {} }) {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState({ billing: null, shipping: null });
  const [selected, setSelected] = useState("custom"); // "billing" | "shipping" | "custom"
  const [customAddr, setCustomAddr] = useState(null);
  const [customErrors, setCustomErrors] = useState({}); // ⬅️ per-field errors from AddressForm

  // Fetch saved addresses
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/user/addresses`, {
          withCredentials: true,
        });
        const billing = res.data?.billing || null;
        const shipping = res.data?.shipping || null;

        if (!isMounted) return;
        setSaved({ billing, shipping });

        // default choice
        if (shipping) setSelected("shipping");
        else if (billing) setSelected("billing");
        else setSelected("custom");
      } catch {
        if (!isMounted) return;
        setSaved({ billing: null, shipping: null });
        setSelected("custom");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [baseURL]);

  // Build payload (stable identity when content unchanged)
  const payload = useMemo(() => {
    if (selected === "billing" && saved.billing) {
      return {
        selection: "billing",
        shipping_address_id: saved.billing.id ?? null,
        shipping_address: saved.billing,
        shipping_errors: {}, // none for saved addresses
      };
    }
    if (selected === "shipping" && saved.shipping) {
      return {
        selection: "shipping",
        shipping_address_id: saved.shipping.id ?? null,
        shipping_address: saved.shipping,
        shipping_errors: {},
      };
    }
    // custom
    return {
      selection: "custom",
      shipping_address_id: null,
      shipping_address: customAddr || null,
      shipping_errors: customErrors || {}, // ⬅️ include per-field errors
    };
  }, [selected, saved.billing, saved.shipping, customAddr, customErrors]);

  // Emit payload upward only when it actually changes
  const lastHashRef = useRef("");
  useEffect(() => {
    const hash = JSON.stringify(payload);
    if (hash !== lastHashRef.current) {
      lastHashRef.current = hash;
      onChange(payload);
    }
  }, [payload, onChange]);

  const showNoSavedMessage = !saved.billing && !saved.shipping;
 

  return (
    <section className={styles.addressSection}>
      <h2>Choose Shipping Address</h2>

      {loading ? (
        <div className={styles.skeleton}>Loading addresses…</div>
      ) : (
        <>
          {showNoSavedMessage && (
            <div className={styles.noSaved}>No saved address found.</div>
          )}

          <div className={styles.radioGroup}>
            {saved.billing && (
              <label className={styles.radioItem}>
                <input
                  type="radio"
                  name="ship-address"
                  value="billing"
                  checked={selected === "billing"}
                  onChange={() => setSelected("billing")}
                />
                <span>Use Billing Address</span>
              </label>
            )}

            {saved.shipping && (
              <label className={styles.radioItem}>
                <input
                  type="radio"
                  name="ship-address"
                  value="shipping"
                  checked={selected === "shipping"}
                  onChange={() => setSelected("shipping")}
                />
                <span>Use Shipping Address</span>
              </label>
            )}

            <label className={styles.radioItem}>
              <input
                type="radio"
                name="ship-address"
                value="custom"
                checked={selected === "custom"}
                onChange={() => setSelected("custom")}
              />
              <span>Ship to Custom Address</span>
            </label>
          </div>

          {/* Billing (read-only) */}
          {selected === "billing" && saved.billing && (
            <div className={styles.block}>
              <h4>Billing Address</h4>
              <AddressForm readOnly value={saved.billing} onChange={() => {}} />
            </div>
          )}

          {/* Shipping (read-only) */}
          {selected === "shipping" && saved.shipping && (
            <div className={styles.block}>
              <h4>Shipping Address</h4>
              <AddressForm readOnly value={saved.shipping} onChange={() => {}} />
            </div>
          )}

          {/* Custom (editable) */}
          {selected === "custom" && (
            <div className={styles.block}>
              <h4>Custom Shipping Address</h4>
              {/* Bubble both value and per-field errors up */}
              <AddressForm
                value={customAddr}
                onChange={setCustomAddr}
                readOnly={false}
                onErrorsChange={setCustomErrors} // ⬅️ NEW
              />

             
            </div>
          )}
        </>
      )}
    </section>
  );
}
