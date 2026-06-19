/* UploadDocument.jsx */
import React, { useState } from 'react';

// Path adjusted for your features/pages/uploaddocument/components structure
import UploadForm from '../uploaddocument/components/UploadForm';
import FileUploader from '../uploaddocument/components/FileUploader';
import RecentContributions from '../uploaddocument/components/RecentContributions';
import './UploadDocument.css';

const UploadDocument = () => {
  const [formData, setFormData] = useState({
    major: '',
    specialization: '',
    subject: '',
    semester: '',
    title: '',
    description: ''
  });

  // Each file entry will be an object: { id, file, progress, isUploading }
  const [files, setFiles] = useState([]);
  const [complyChecked, setComplyChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Wrap selected files with metadata and start a mock upload for each
  const handleFilesSelected = (selectedFiles) => {
    const newFiles = selectedFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,          // unique identifier
      file,
      progress: 0,
      isUploading: true,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Kick‑off a simulated upload for every newly added file
    newFiles.forEach(f => simulateFileUpload(f.id));
  };

  // Simulate per‑file upload progress (2 s total)
  const simulateFileUpload = (fileId) => {
    const duration = 2000;          // 2 seconds total
    const intervalTime = 100;       // update every 100 ms
    const step = 100 / (duration / intervalTime); // % increase per tick

    const timer = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id !== fileId) return f;

        const nextProgress = f.progress + step;
        if (nextProgress >= 100) {
          clearInterval(timer);
          return { ...f, progress: 100, isUploading: false };
        }
        return { ...f, progress: Math.round(nextProgress) };
      }));
    }, intervalTime);
  };

  // Remove a file by its unique id
  const handleRemoveFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // Form can be submitted only when every file has finished uploading
  const isFormValid = () => {
    return (
      formData.major !== '' &&
      formData.specialization !== '' &&
      formData.title.trim() !== '' &&
      files.length > 0 &&
      files.every(f => !f.isUploading) && // all uploads finished
      complyChecked
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    // Mock saving form metadata
    setTimeout(() => {
      alert(`Successfully uploaded ${files.length} document(s) for "${formData.title}"!`);

      // Reset everything
      setFormData({
        major: '',
        specialization: '',
        subject: '',
        semester: '',
        title: '',
        description: ''
      });
      setFiles([]);
      setComplyChecked(false);
      setIsSubmitting(false);
    }, 800);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All unsaved inputs will be lost.")) {
      setFormData({
        major: '',
        specialization: '',
        subject: '',
        semester: '',
        title: '',
        description: ''
      });
      setFiles([]);
      setComplyChecked(false);
    }
  };

  return (
    <div className="upload-page-wrapper">

      {/* 1. Page Header Block (Breadcrumbs removed) */}
      <div className="upload-header-container">
        <h1 className="upload-page-title">Upload Study Material</h1>
        <p className="upload-page-subtitle">
          Share your knowledge with the community and let AI help you organize it.
        </p>
      </div>

      {/* 2. Main Form Card */}
      <form onSubmit={handleSubmit} className="upload-card-container">

        {/* Grid layout containing left form fields & right file dropzone */}
        <div className="upload-grid-layout">

          {/* Left: Input Fields */}
          <UploadForm
            formData={formData}
            onChange={handleFormChange}
          />

          {/* Right: File dropzone */}
          <div className="upload-files-side">
            <FileUploader
              files={files}
              onFilesSelected={handleFilesSelected}
              onRemoveFile={handleRemoveFile}
              isSubmitting={isSubmitting}
            />
          </div>

        </div>

        {/* 3. Honor Code / Integrity Checkbox */}
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

        {/* 4. Footer Actions (Cancel / Submit) */}
        <div className="upload-submit-actions">
          <button
            type="button"
            className="upload-cancel-btn"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="upload-submit-btn"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'Uploading...' : 'Submit Material'}
          </button>
        </div>

      </form>

      {/* 5. Recent Contributions Listing */}
      <RecentContributions />
    </div>
  );
};

export default UploadDocument;