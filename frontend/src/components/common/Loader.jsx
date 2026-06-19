import React from 'react';

export default function Loader({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-14 w-14 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-10">
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className={`animate-ping absolute inset-0 rounded-full bg-indigo-500/10 blur-md ${
          size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-10 w-10' : 'h-14 w-14'
        }`}></div>
        
        {/* Spinner */}
        <div className={`animate-spin rounded-full border-t-indigo-600 border-r-transparent border-b-purple-600 border-l-transparent ${sizeClasses[size]}`}></div>
      </div>
      {size !== 'sm' && (
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-600/80 uppercase animate-pulse">
          Loading Registry...
        </span>
      )}
    </div>
  );
}
