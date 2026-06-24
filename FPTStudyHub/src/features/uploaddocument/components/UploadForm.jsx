/* UploadForm.jsx */
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MAJORS_DATA, SEMESTERS } from '../../../data/uploaddocument';

const UploadForm = ({ formData, onChange }) => {
  const [selectedMajor, setSelectedMajor] = useState('');
  const [specsList, setSpecsList] = useState([]);

  const handleMajorChange = (e) => {
    const major = e.target.value;
    setSelectedMajor(major);
    setSpecsList(MAJORS_DATA[major] || []);
    onChange('major', major);
    onChange('specialization', ''); // Reset specialization khi đổi major
  };

  return (
    <div className="upload-form-fields">
      
      {/* Major field */}
      <div className="upload-form-group">
        <label className="upload-input-label">Major</label>
        <select 
          className="upload-select" 
          value={formData.major} 
          onChange={handleMajorChange}
        >
          <option value="">Select Major</option>
          {Object.keys(MAJORS_DATA).map((major, idx) => (
            <option key={idx} value={major}>{major}</option>
          ))}
        </select>
      </div>

      {/* Specialization field */}
      <div className="upload-form-group">
        <label className="upload-input-label">Specialization</label>
        <select 
          className="upload-select" 
          value={formData.specialization} 
          disabled={!selectedMajor}
          onChange={(e) => onChange('specialization', e.target.value)}
        >
          <option value="">Select Specialization</option>
          {specsList.map((spec, idx) => (
            <option key={idx} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {/* Subject field */}
      <div className="upload-form-group">
        <label className="upload-input-label">Subject</label>
        <div className="upload-input-wrapper">
          <input 
            type="text" 
            className="upload-input" 
            placeholder="Search by course code..."
            value={formData.subject}
            onChange={(e) => onChange('subject', e.target.value)}
          />
          <Search size={18} className="upload-input-icon" />
        </div>
      </div>

      {/* Semester field */}
      <div className="upload-form-group">
        <label className="upload-input-label">Semester</label>
        <select 
          className="upload-select" 
          value={formData.semester} 
          onChange={(e) => onChange('semester', e.target.value)}
        >
          <option value="">Select Semester</option>
          {SEMESTERS.map((sem, idx) => (
            <option key={idx} value={sem}>{sem}</option>
          ))}
        </select>
      </div>

      {/* Title field */}
      <div className="upload-form-group form-group-full">
        <label className="upload-input-label">Title</label>
        <input 
          type="text" 
          className="upload-input" 
          placeholder="e.g., PRN211 Midterm Prep Guide"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      {/* Description field */}
      <div className="upload-form-group form-group-full">
        <label className="upload-input-label">Description</label>
        <textarea 
          className="upload-textarea" 
          placeholder="Briefly describe what's inside this document..."
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
        ></textarea>
      </div>

    </div>
  );
};

export default UploadForm;