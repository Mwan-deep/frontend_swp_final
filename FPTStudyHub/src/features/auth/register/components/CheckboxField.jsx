import React from 'react';

const CheckboxField = ({ id, checked, onChange }) => {
  return (
    <div className="checkbox-field-container">
      <input
        type="checkbox"
        id={id}
        className="custom-checkbox-input"
        checked={checked}
        onChange={onChange}
        required
      />
      <label htmlFor={id} className="checkbox-label">
        I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a> regarding academic data processing
      </label>
    </div>
  );
};

export default CheckboxField;