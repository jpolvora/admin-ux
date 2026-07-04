import React from 'react';

export function Form({ children }) {
  return (
    <div className="x-form">
      {children}
    </div>
  );
}

export function TextField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="x-field">
      {label && <div className="x-field-label">{label}:</div>}
      <input 
        type={type} 
        className="x-input" 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
      />
    </div>
  );
}

export function Button({ text, onClick, primary = false }) {
  const className = `x-button ${primary ? 'x-button-primary' : ''}`;
  return (
    <button type="button" className={className} onClick={onClick}>
      {text}
    </button>
  );
}
