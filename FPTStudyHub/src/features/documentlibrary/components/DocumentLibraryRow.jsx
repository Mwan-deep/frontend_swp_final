import React from 'react';

const DocumentLibraryRow = ({ doc }) => {
  return (
    <div className="list-row-item">
      <div className="list-left-info">
        <span className="list-format-tag">{doc.format}</span>
        <div>
          <h4>{doc.title}</h4>
          <p>By {doc.author.replace('By ', '')} • {doc.date}</p>
        </div>
      </div>
      <div className="list-right-stats">
        <span>{doc.views} lượt xem</span>
        <span>{doc.downloads} lượt tải</span>
      </div>
    </div>
  );
};

export default DocumentLibraryRow;