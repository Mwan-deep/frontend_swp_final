import React, { useState } from 'react';
import UploadForm from '../uploaddocument/components/UploadForm';
import FileUploader from '../uploaddocument/components/FileUploader';
import RecentContributions from '../uploaddocument/components/RecentContributions';
import './UploadDocument.css';

const UploadDocument = () => {
  // Thay đổi State để khớp với ID mà Backend yêu cầu
  const [formData, setFormData] = useState({
    majorId: '',
    specializationId: '',
    subjectName: '',
    semesterId: '',
    title: '',
    description: ''
  });

  const [files, setFiles] = useState([]);
  const [complyChecked, setComplyChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFilesSelected = (selectedFiles) => {
    const newFiles = selectedFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      file,
      progress: 0,
      isUploading: false, // Sẽ bật true khi bấm Submit
      status: 'pending' // pending | success | error
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const isFormValid = () => {
    return (
      formData.specializationId !== '' &&
      formData.semesterId !== '' &&
      formData.subjectName.trim() !== '' &&
      formData.title.trim() !== '' &&
      files.length > 0 &&
      complyChecked
    );
  };

  // Hàm xử lý Upload gọi thẳng API Backend
  const uploadSingleFile = (fileObj) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      const data = new FormData();
      
      // Khớp 100% với @RequestParam trong StudyMaterialController
      data.append('specializationId', formData.specializationId);
      data.append('semesterId', formData.semesterId);
      data.append('subjectName', formData.subjectName);
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('file', fileObj.file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8080/api/v1/documents/upload', true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);

      // Lắng nghe tiến trình upload thật
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id ? { ...f, progress: percentComplete, isUploading: true } : f
          ));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id ? { ...f, progress: 100, isUploading: false, status: 'success' } : f
          ));
          resolve(xhr.response);
        } else {
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id ? { ...f, isUploading: false, status: 'error' } : f
          ));
          reject(xhr.responseText);
        }
      };

      xhr.onerror = () => reject("Lỗi kết nối mạng");
      xhr.send(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      // Chạy upload tuần tự hoặc song song tùy ý. Ở đây chạy song song (Promise.all)
      const uploadPromises = files.map(fileObj => uploadSingleFile(fileObj));
      await Promise.all(uploadPromises);

      alert(`Successfully uploaded ${files.length} document(s) to AI Study Hub!`);
      
      // Reset form
      setFormData({
        majorId: '', specializationId: '', subjectName: '', semesterId: '', title: '', description: ''
      });
      setFiles([]);
      setComplyChecked(false);

    } catch (error) {
      alert("Đã xảy ra lỗi trong quá trình upload: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All unsaved inputs will be lost.")) {
      setFormData({
        majorId: '', specializationId: '', subjectName: '', semesterId: '', title: '', description: ''
      });
      setFiles([]);
      setComplyChecked(false);
    }
  };

  return (
    <div className="upload-page-wrapper">
      <div className="upload-header-container">
        <h1 className="upload-page-title">Upload Study Material</h1>
        <p className="upload-page-subtitle">
          Share your knowledge with the community and let AI help you organize it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="upload-card-container">
        <div className="upload-grid-layout">
          <UploadForm formData={formData} onChange={handleFormChange} />
          
          <div className="upload-files-side">
            <FileUploader
              files={files}
              onFilesSelected={handleFilesSelected}
              onRemoveFile={handleRemoveFile}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        <div className="integrity-checkbox-container">
          <input
            type="checkbox"
            id="integrity-check"
            className="integrity-checkbox-input"
            checked={complyChecked}
            onChange={(e) => setComplyChecked(e.target.checked)}
            disabled={isSubmitting}
          />
          <label htmlFor="integrity-check" className="integrity-checkbox-label">
            I confirm these materials comply with academic integrity policies.
          </label>
        </div>

        <div className="upload-submit-actions">
          <button type="button" className="upload-cancel-btn" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="upload-submit-btn" disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? 'Uploading to Server...' : 'Submit Material'}
          </button>
        </div>
      </form>
      <RecentContributions />
    </div>
  );
};

export default UploadDocument;