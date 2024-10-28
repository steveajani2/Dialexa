'use client';

import React from 'react';

interface IconButtonProps {
  onClick?: () => void;
  tooltip: string;
  icon: JSX.Element;
  className?: string;
  children?: React.ReactNode;
  color: string
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, tooltip, icon, className, children, color }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      aria-label={tooltip}
      title={tooltip}
      style={{ backgroundColor: color }}
    >
      {icon}
      {children}
    </button>
  );
};

export default IconButton;
