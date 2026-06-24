import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

// Nhận thêm selectedIds, onSelect, onSelectAll từ props
const QuestionTable = ({ data, onEdit, onDelete, selectedIds = [], onSelect, onSelectAll }) => {
  if (!data || data.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>No questions available.</div>;
  }

  // Kiểm tra xem tất cả câu hỏi có đang được tích chọn không
  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="gq-table-container">
      <table className="gq-table">
        <thead>
          <tr>
            <th style={{ width: '40px', textAlign: 'center' }}>
              {/* Checkbox "Chọn tất cả" trên thanh tiêu đề */}
              <input 
                type="checkbox" 
                checked={isAllSelected}
                onChange={onSelectAll}
                style={{ cursor: 'pointer' }}
              />
            </th>
            <th>ID</th>
            <th>Content</th>
            <th>Subject</th>
            <th>Difficulty</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td style={{ textAlign: 'center' }}>
                {/* Checkbox của từng dòng */}
                <input 
                  type="checkbox" 
                  checked={selectedIds?.includes(row.id) || false}
                  onChange={() => onSelect(row.id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td className="gq-col-id">{row.id}</td>
              <td className="gq-col-content">
                <strong>{row.content}</strong>
              </td>
              <td>{row.subject}</td>
              <td>
                <span className={`gq-badge ${row.difficulty?.toLowerCase()}`}>
                  {row.difficulty}
                </span>
              </td>
              <td>{row.created || 'Oct 24, 2023'}</td>
              <td className="gq-actions-cell">
                <Edit2 
                  size={16} 
                  className="gq-icon-action" 
                  title="Edit" 
                  onClick={() => onEdit(row.id)}
                />
                
                <Trash2 
                  size={16} 
                  className="gq-icon-action" 
                  title="Delete" 
                  onClick={() => onDelete(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;