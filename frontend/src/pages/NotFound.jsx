import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#070A13] flex items-center justify-center p-6 cyber-grid relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>

      <div className="bg-[#111827]/40 border border-gray-900 rounded-3xl p-8 sm:p-12 max-w-lg w-full backdrop-blur-sm shadow-xl text-center space-y-6 relative z-10 scanline">
        
        <div className="flex justify-center space-x-2 text-indigo-400 text-xs font-mono animate-pulse">
          <span>[!]</span>
          <span>404 PAGE_NOT_FOUND</span>
          <span>[!]</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-white font-mono tracking-tighter">404</h1>
          <h2 className="text-xl font-bold text-gray-200">Page Not Found</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-97 cursor-pointer"
          >
            Return Home
          </button>
        </div>

      </div>
    </div>
  );
}
