import React from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>Register Page</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>This page is currently under construction.</p>
        <button 
          onClick={() => navigate('/login')}
          style={{ padding: '10px 20px', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
