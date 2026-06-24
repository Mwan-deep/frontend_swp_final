import React from 'react';
import { Plus } from 'lucide-react';

const AddNewSetCard = ({ onClick }) => {
  return (
    <div className="add-new-card" onClick={onClick}>
      <Plus size={32} className="add-icon" />
      <h3 className="add-title">Add New Set</h3>
      <p className="add-subtitle">Import from bank or create from scratch</p>
    </div>
  );
};

export default AddNewSetCard;