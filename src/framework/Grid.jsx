import React, { useState } from 'react';

export function Grid({ columns, data, onSelectionChange }) {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (item, index) => {
    setSelectedRow(index);
    if (onSelectionChange) {
      onSelectionChange(item);
    }
  };

  return (
    <div className="x-grid">
      <div className="x-grid-header-container">
        {columns.map((col, i) => (
          <div key={i} className="x-grid-header" style={{ width: col.width || 100, flex: col.flex }}>
            {col.text}
          </div>
        ))}
      </div>
      <div className="x-grid-body">
        {data.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`x-grid-row ${selectedRow === rowIndex ? 'x-selected' : ''}`}
            onClick={() => handleRowClick(row, rowIndex)}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="x-grid-cell" style={{ width: col.width || 100, flex: col.flex }}>
                {row[col.dataIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
