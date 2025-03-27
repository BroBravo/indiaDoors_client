import React, { useState } from "react";
import styles from "./index.module.scss"
const DynamicForm = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index} className={styles.fieldContainer}>
          <label>{field.label}</label>

          {/* Handle different input types */}
          {field.type === "select" ? (
            <select name={field.name} value={formData[field.name] || ""}  onChange={handleChange}>
              <option value="">Select an option</option>
              {field.options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
