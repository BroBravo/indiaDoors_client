// import { useEffect, useRef, useState } from "react";
// import styles from "./index.module.scss";

// export default function AddressForm({ readOnly=false, value=null, onChange=() => {} }) {
//   const [addr, setAddr] = useState({
//      line1: "", city: "", state: "", pincode: "",
//   });

//   const [errors, setErrors] = useState({});

//   // keep a hash so we only apply external value when it truly changes
//   const lastHashRef = useRef("");

//   useEffect(() => {
//     const nextHash = value ? JSON.stringify(value) : "";
//     if (nextHash !== lastHashRef.current) {
//       lastHashRef.current = nextHash;
//       if (value) setAddr(prev => ({ ...prev, ...value }));
//     }
//   }, [value]);

//   const disabled = readOnly;

//   // update local + notify parent (only when editable)
//   const update = (patch) => {
//     setAddr(prev => {
//       const next = { ...prev, ...patch };
//       if (!disabled) onChange(next);
//       return next;
//     });
//   };

//   return (
//   <form
//   className={`${styles.form} ${disabled ? styles.readonly : ""}`}
//   onSubmit={(e) => e.preventDefault()}
// >
//   <div className={styles.field}>
//     <label htmlFor="addr-line1">Address Line</label>
//     <input
//       id="addr-line1"
//       className="span2"
//       type="text"
//       placeholder="House/Flat, Building, Street"
//       value={addr.line1}
//       disabled={disabled}
//       onChange={(e) => update({ line1: e.target.value })}
//       required
//     />
//      <p className={styles.error} style={{ minHeight: "16px", visibility: errors.line1 ? "visible" : "hidden" }}>
//         {errors.line1 || "⠀"} {/* Unicode space to keep height */}
//      </p>
//   </div>

//   <div className={styles.field}>
//     <label htmlFor="addr-city">City</label>
//     <input
//       id="addr-city"
//       type="text"
//       placeholder="City"
//       value={addr.city}
//       disabled={disabled}
//       onChange={(e) => update({ city: e.target.value })}
//       required
//     />
//     <p className={styles.error} style={{ minHeight: "16px", visibility: errors.city ? "visible" : "hidden" }}>
//         {errors.city || "⠀"} {/* Unicode space to keep height */}
//     </p>
    
//   </div>

//   <div className={styles.field}>
//     <label htmlFor="addr-state">State</label>
//     <input
//       id="addr-state"
//       type="text"
//       placeholder="State"
//       value={addr.state}
//       disabled={disabled}
//       onChange={(e) => update({ state: e.target.value })}
//       required
//     />
//     <p className={styles.error} style={{ minHeight: "16px", visibility: errors.state ? "visible" : "hidden" }}>
//         {errors.state || "⠀"} {/* Unicode space to keep height */}
//      </p>
//   </div>

//   <div className={styles.field}>
//     <label htmlFor="addr-pincode">Pincode</label>
//     <input
//       id="addr-pincode"
//       type="text"
//       placeholder="6-digit pincode"
//       value={addr.pincode}
//       disabled={disabled}
//       onChange={(e) => update({ pincode: e.target.value })}
//       required
//     />
//     <p className={styles.error} style={{ minHeight: "16px", visibility: errors.pincode ? "visible" : "hidden" }}>
//         {errors.pincode || "⠀"} {/* Unicode space to keep height */}
//      </p>
//   </div>
// </form>

//   );
// }

// export function validateAddress(a) {
//   let newErrors = {};
//   if (!a) return "Please fill all address fields";
//   if (!a.line1?.trim()){
//     newErrors.line1 = "Address Line is required";
//   };
//   if (!a.city?.trim()) {
//     newErrors.city = "City is required";
//   }
//   if (!a.state?.trim()){
//     newErrors.state = "State is required";
//   }
//   if (!a.pincode?.trim()){
//     newErrors.pincode = "Pincode is required";
//   } 
//   setErrors(newErrors);
//   //if (!/^\d{6}$/.test(String(a.pincode || ""))) return "Please fill all address fields";
//   return newErrors;
// }
// AddressForm.jsx
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export default function AddressForm({
  readOnly = false,
  value = null,
  onChange = () => {},
  onErrorsChange = () => {},   // ⬅️ NEW
}) {
  const [addr, setAddr] = useState({ line1: "", city: "", state: "", pincode: "" });
  const [errors, setErrors] = useState({});
  const lastHashRef = useRef("");

  useEffect(() => {
    const nextHash = value ? JSON.stringify(value) : "";
    if (nextHash !== lastHashRef.current) {
      lastHashRef.current = nextHash;
      if (value) setAddr(prev => ({ ...prev, ...value }));
    }
  }, [value]);

  // 🔎 simple per-field validator
  const validateField = (name, val) => {
    if (name === "line1") return val?.trim() ? null : "Address Line is required";
    if (name === "city") return val?.trim() ? null : "City is required";
    if (name === "state") return val?.trim() ? null : "State is required";
    if (name === "pincode") {
      if (!val?.trim()) return "Pincode is required";
      return /^\d{6}$/.test(String(val)) ? null : "Enter a valid 6-digit pincode";
    }
    return null;
  };

  // 📤 bubble full errors object upward whenever it changes
  useEffect(() => {
    onErrorsChange(errors);
  }, [errors, onErrorsChange]);

  const update = (patch) => {
    setAddr(prev => {
      const next = { ...prev, ...patch };
      // validate only the changed field
      const name = Object.keys(patch)[0];
      const msg = validateField(name, next[name]);
      setErrors(prevErrs => {
        const copy = { ...prevErrs };
        if (msg) copy[name] = msg; else delete copy[name];
        return copy;
      });
      if (!readOnly) onChange(next);
      return next;
    });
  };

  const disabled = readOnly;

  return (
    <form className={`${styles.form} ${disabled ? styles.readonly : ""}`} onSubmit={(e)=>e.preventDefault()}>
      <div className={styles.field}>
        <label htmlFor="addr-line1" style={{fontWeight:"bold"}}>Address Line</label>
        <input
          id="addr-line1"
          className="span2"
          type="text"
          placeholder="House/Flat, Building, Street"
          value={addr.line1}
          disabled={disabled}
          onChange={(e) => update({ line1: e.target.value })}
          required
        />
        <p className={styles.error} style={{ minHeight: 16, visibility: errors.line1 ? "visible" : "hidden" }}>
          {errors.line1 || "⠀"}
        </p>
      </div>

      <div className={styles.field}>
        <label htmlFor="addr-city" style={{fontWeight:"bold"}}>City</label>
        <input
          id="addr-city"
          type="text"
          placeholder="City"
          value={addr.city}
          disabled={disabled}
          onChange={(e) => update({ city: e.target.value })}
          required
        />
        <p className={styles.error} style={{ minHeight: 16, visibility: errors.city ? "visible" : "hidden" }}>
          {errors.city || "⠀"}
        </p>
      </div>

      <div className={styles.field}>
        <label htmlFor="addr-state" style={{fontWeight:"bold"}}>State</label>
        <input
          id="addr-state"
          type="text"
          placeholder="State"
          value={addr.state}
          disabled={disabled}
          onChange={(e) => update({ state: e.target.value })}
          required
        />
        <p className={styles.error} style={{ minHeight: 16, visibility: errors.state ? "visible" : "hidden" }}>
          {errors.state || "⠀"}
        </p>
      </div>

      <div className={styles.field}>
        <label htmlFor="addr-pincode" style={{fontWeight:"bold"}}>Pincode</label>
        <input
          id="addr-pincode"
          type="text"
          placeholder="6-digit pincode"
          value={addr.pincode}
          disabled={disabled}
          onChange={(e) => update({ pincode: e.target.value })}
          required
        />
        <p className={styles.error} style={{ minHeight: 16, visibility: errors.pincode ? "visible" : "hidden" }}>
          {errors.pincode || "⠀"}
        </p>
      </div>
    </form>
  );
}
