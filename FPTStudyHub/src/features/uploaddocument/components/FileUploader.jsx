/* FileUploader.jsx */
import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

const FileUploader = ({ files, onFilesSelected, onRemoveFile, isSubmitting }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (isSubmitting) return; // Disable drop during upload

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      onFilesSelected(droppedFiles);
    }
  };

  const handleFileInputChange = (e) => {
    if (isSubmitting) return;

    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFilesSelected(selectedFiles);
    }
  };

  const triggerFileInput = () => {
    if (isSubmitting) return;
    fileInputRef.current.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatUploadMetrics = (uploaded, total) => {
    if (total === 0) return '0 Bytes / 0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(total) / Math.log(k));
    const unit = sizes[i];
    
    const totalFormatted = parseFloat((total / Math.pow(k, i)).toFixed(1));
    const uploadedFormatted = parseFloat((uploaded / Math.pow(k, i)).toFixed(1));
    
    return `${uploadedFormatted} ${unit} / ${totalFormatted} ${unit}`;
  };

  return (
    // Thay đổi wrapper ngoài cùng để tránh lặp class làm vỡ CSS layout grid với file cha
    <div className="file-uploader-block" style={{ width: '100%' }}>
      <label className="upload-input-label" style={{ textAlign: 'left', display: 'block' }}>Files</label>
      
      <div 
        className={`file-dropzone-container ${dragActive ? 'drag-active' : ''} ${isSubmitting ? 'disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        style={{ pointerEvents: isSubmitting ? 'none' : 'auto', opacity: isSubmitting ? 0.7 : 1 }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          multiple
          onChange={handleFileInputChange}
          accept=".pdf,.docx,.zip"
          disabled={isSubmitting}
        />

        <div className="dropzone-icon-circle">
          <UploadCloud size={24} />
        </div>

        <h4 className="dropzone-title">Drag & Drop Documents</h4>
        <p className="dropzone-subtitle">PDF, DOCX, ZIP files up to 50MB</p>

        <button 
          type="button" 
          className="browse-files-btn"
          disabled={isSubmitting}
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện click bị kích hoạt 2 lần lên dropzone
            triggerFileInput();
          }}
        >
          Browse Files
        </button>
      </div>

      {/* Danh sách các file đã chọn */}
      {files.length > 0 && (
        <div className="selected-files-list">
          {files.map((fileObj) => {
            if (!fileObj) return null;
            const { file, progress = 0, isUploading = false, id } = fileObj;
            if (!file) return null; 
            const uploadedBytes = file?.size ? (file.size * progress) / 100 : 0;
            return (
              <div key={id} className="selected-file-item">
                <div className="file-item-header">
                  <div className="file-item-left">
                    <FileText size={20} className="file-item-icon" />
                    <span className="file-item-name" title={file.name}>{file.name}</span>
                  </div>
                  <button 
                    type="button" 
                    className="remove-file-btn" 
                    disabled={isSubmitting}
                    onClick={(e) => {
                      e.stopPropagation(); // Chặn hành động click nhầm mở box chọn file
                      onRemoveFile(id);
                    }}
                    style={{ opacity: isSubmitting ? 0.5 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>

                {isUploading ? (
                  <div className="file-item-progress-section">
                    <div className="file-item-progress-bar-container">
                      <div 
                        className="file-item-progress-bar-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="file-item-progress-metrics">
                      <span className="file-item-progress-status">
                        {progress}% Uploading...
                      </span>
                      <span className="file-item-progress-sizes">
                        {formatUploadMetrics(uploadedBytes, file.size)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="file-item-static-size">
                    {formatFileSize(file.size)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploader;