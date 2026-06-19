import React, { useState } from 'react';
import InputField from './InputField';
import CheckboxField from './CheckboxField';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    password: '',
    agree: false
  });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));

    if (id === 'email') {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Gmail đuôi @gmail.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!emailPattern.test(formData.email)) {
      setEmailError('Please use a valid @gmail.com email address.');
      return;
    }

    if (!formData.agree) {
      alert("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    alert(`Account registration submitted for: ${formData.fullName} (${formData.studentId})`);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <InputField
        label="Full Name"
        id="fullName"
        placeholder="John Doe"
        value={formData.fullName}
        onChange={handleChange}
      />
      
      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="name@gmail.com"
        value={formData.email}
        onChange={handleChange}
        
      />

      <div className="form-grid-row">
        <InputField
          label="Student ID"
          id="studentId"
          placeholder="SE123456"
          value={formData.studentId}
          onChange={handleChange}
        />
        
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <CheckboxField
        id="agree"
        checked={formData.agree}
        onChange={handleChange}
      />

      <button type="submit" className="submit-button">
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;