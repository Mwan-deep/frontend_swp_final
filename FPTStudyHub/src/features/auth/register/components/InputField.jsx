import React from 'react';

const InputField = ({ label, id, type = 'text', placeholder, value, onChange, hintText, required = true }) => {
  return (
    <div className="form-field-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          id={id}
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
      {hintText && <span className="field-hint-text">{hintText}</span>}
    </div>
  );
};

export default InputField;