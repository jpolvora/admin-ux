import React from 'react';
import './theme.css';

export function Viewport({ children }) {
  return (
    <div className="x-viewport">
      {children}
    </div>
  );
}


export function Region({ region, width, height, children, style = {} }) {
  const regionStyle = { ...style };
  
  if (region === 'center') {
    return <div className="x-region x-region-center" style={regionStyle}>{children}</div>;
  }

  if (width) regionStyle.width = width;
  if (width) regionStyle.minWidth = width;
  if (height) regionStyle.height = height;
  if (height) regionStyle.minHeight = height;

  return (
    <div className={`x-region x-region-${region}`} style={regionStyle}>
      {children}
    </div>
  );
}

export function Panel({ title, children, style = {} }) {
  return (
    <div className="x-panel" style={style}>
      {title && (
        <div className="x-panel-header">
          {title}
        </div>
      )}
      <div className="x-panel-body">
        {children}
      </div>
    </div>
  );
}
