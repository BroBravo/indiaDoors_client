import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import { MdLocationOn,MdEdit } from 'react-icons/md';
const AddressForm = ({ onSubmit, header }) => {
  const [address, setAddress] = useState({
    addressLine: '',
    state: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(address); // emit data to parent
  };

  return (
    <form className={styles.addressForm} >
         <div className={styles.header}>
          <h2><MdLocationOn /> {header}</h2>
           {!isEditing && (
          <MdEdit className={styles.editIcon} onClick={() => setIsEditing(true)} />
        )}
        </div>
      <div className={styles.formRow}>
        <label>Address Line</label>
        <input
          type="text"
          name="addressLine"
          value={address.addressLine}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <label>State/Province</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={address.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          required
        />
      </div>
         {isEditing && (
        <div style={{display:'flex',flexDirection:'row'}}>
          <button onClick={handleConfirm} className={styles.confirmButton}>Confirm</button>
          <button onClick={()=>setIsEditing(false)} className={styles.confirmButton}>Cancel</button>
        </div>
      )}
    
    </form>
  );
};

export default AddressForm;
