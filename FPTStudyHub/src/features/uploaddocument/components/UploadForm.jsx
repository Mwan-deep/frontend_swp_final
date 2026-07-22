import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const UploadForm = ({ formData, onChange }) => {
  const [majors, setMajors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [semesters, setSemesters] = useState([]);

  // Lấy danh sách Semesters và Majors khi component vừa render
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const token = localStorage.getItem('token'); // Đảm bảo bạn lưu token ở localStorage
        const headers = { 'Authorization': `Bearer ${token}` };

        // Lấy Semesters
        const semRes = await fetch('https://backend-swp-final.onrender.com/api/v1/master-data/semesters', { headers });
        if (semRes.ok) setSemesters(await semRes.json());

        // Lấy Majors
        const majRes = await fetch('https://backend-swp-final.onrender.com/api/v1/master-data/majors', { headers });
        if (majRes.ok) setMajors(await majRes.json());
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu master:", error);
      }
    };
    fetchMasterData();
  }, []);

  // Xử lý khi người dùng chọn Ngành học (Major)
  const handleMajorChange = async (e) => {
    const majorId = e.target.value;
    onChange('majorId', majorId);
    onChange('specializationId', ''); // Reset chuyên ngành hẹp
    setSpecializations([]); // Xóa list cũ

    if (majorId) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://backend-swp-final.onrender.com/api/v1/master-data/majors/${majorId}/specializations`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setSpecializations(await res.json());
      } catch (error) {
        console.error("Lỗi khi tải chuyên ngành:", error);
      }
    }
  };

  return (
    <div className="upload-form-fields">
      
      <div className="upload-form-group">
        <label className="upload-input-label">Major</label>
        <select 
          className="upload-select" 
          value={formData.majorId} 
          onChange={handleMajorChange}
        >
          <option value="">Select Major</option>
          {majors.map((major) => (
            // Dùng majorId làm value thay vì tên
            <option key={major.majorId} value={major.majorId}>{major.majorName}</option>
          ))}
        </select>
      </div>

      <div className="upload-form-group">
        <label className="upload-input-label">Specialization</label>
        <select 
          className="upload-select" 
          value={formData.specializationId} 
          disabled={!formData.majorId}
          onChange={(e) => onChange('specializationId', e.target.value)}
        >
          <option value="">Select Specialization</option>
          {specializations.map((spec) => (
            <option key={spec.specializationId} value={spec.specializationId}>{spec.specializationName}</option>
          ))}
        </select>
      </div>

      <div className="upload-form-group">
        <label className="upload-input-label">Subject</label>
        <div className="upload-input-wrapper">
          <input 
            type="text" 
            className="upload-input" 
            placeholder="Search by course code..."
            value={formData.subjectName}
            onChange={(e) => onChange('subjectName', e.target.value)}
          />
          <Search size={18} className="upload-input-icon" />
        </div>
      </div>

      {/* Semester field */}
      <div className="upload-form-group">
        <label className="upload-input-label">Semester</label>
        <select 
          className="upload-select" 
          value={formData.semesterId} 
          onChange={(e) => onChange('semesterId', e.target.value)}
        >
          <option value="">Select Semester</option>
          {semesters.map((sem) => (
            <option key={sem.semesterId} value={sem.semesterId}>
              {sem.displayName} {/* Hiển thị tên đã ghép: "Spring 2026" */}
            </option>
          ))}
        </select>
      </div>

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