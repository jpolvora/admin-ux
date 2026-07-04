import React, { useState, useRef, useEffect } from 'react';

export function Window({ title, width = 400, height = 300, onClose, children, buttons }) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Position center on load relative to parent
  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const initialX = Math.max(0, (containerRect.width - width) / 2);
      const initialY = Math.max(0, (containerRect.height - height) / 2);
      setPosition({ x: initialX, y: initialY });
    }
  }, [width, height]);

  const handleMouseDown = (e) => {
    // Ignore close button clicks
    if (e.target.closest('.x-window-close')) return;
    
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Prevent text selection during drag
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let newX = e.clientX - dragStart.current.x;
    let newY = e.clientY - dragStart.current.y;

    // Constrain to parent container bounds
    const maxX = containerRect.width - width;
    const maxY = containerRect.height - height;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Clean up event listeners if component unmounts during drag
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="x-window-mask" ref={containerRef} style={{ display: 'block', position: 'absolute' }}>
      <div 
        className="x-window" 
        style={{ 
          width, 
          height, 
          position: 'absolute', 
          left: position.x, 
          top: position.y,
          margin: 0
        }}
      >
        <div className="x-window-header" onMouseDown={handleMouseDown} style={{ cursor: 'move' }}>
          <span>{title}</span>
          {onClose && (
            <span className="x-window-close" onClick={onClose} style={{ cursor: 'pointer' }}>✕</span>
          )}
        </div>
        <div className="x-window-body">
          {children}
        </div>
        {buttons && (
          <div className="x-toolbar-bottom">
            {buttons}
          </div>
        )}
      </div>
    </div>
  );
}
