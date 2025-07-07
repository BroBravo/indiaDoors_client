import {MdEdit,MdPerson,MdEmail,MdPhone} from 'react-icons/md';
import styles from './index.module.scss';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useUser } from "../../context/userContext";
const ProfileInfo = ({ userDetails }) => {

   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState(userDetails);

  useEffect(() => {
    setFormData(userDetails); // Sync when parent prop updates
  }, [userDetails]);
    const user=useUser();
  
  
   const handleConfirm = async () => {
    try {
      // replace with your actual endpoint
      await axios.post('/api/profile/update', formData); 
      setIsEditing(false); // exit edit mode after save
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
    return(
    <div className={styles.profileInfoContainer} >
        <div className={styles.header}>
          <h2><MdPerson /> Personal Information</h2>
           {!isEditing && (
          <MdEdit className={styles.editIcon} onClick={() => setIsEditing(true)} />
        )}
        </div>

       <div className={styles.formRow}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          readOnly={!isEditing}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          readOnly={!isEditing}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label>Your Gender</label>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              disabled={!isEditing}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              disabled={!isEditing}
              onChange={handleChange}
            />
            Female
          </label>
           <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              disabled={!isEditing}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
      </div>

      <div className={styles.formRow}>
        <label><MdEmail /> Email Address</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          readOnly={!isEditing}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label><MdPhone /> Mobile Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          readOnly
          onChange={handleChange}
        />
      </div>

      {isEditing && (
        <div style={{display:'flex',flexDirection:'row'}}>
          <button onClick={handleConfirm} className={styles.confirmButton}>Confirm</button>
          <button onClick={()=>{setIsEditing(false);
                                setFormData(userDetails);
          }} className={styles.confirmButton}>Cancel</button>
        </div>
      )}
    </div>
    );
}

export default ProfileInfo;