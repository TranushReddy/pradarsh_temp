import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../../utils/constants';

const POPULAR_TECHS = ['React', 'Python', 'Node.js', 'FastAPI', 'Go', 'TypeScript', 'Kubernetes', 'C#', 'Tailwind'];

export default function FilterPanel({ selectedCategory, onSelectCategory, selectedTech = '', onSelectTech }) {
  const allCategories = ['', ...CATEGORIES, 'Others'];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDisplayLabel = selectedCategory || 'All Categories';

  return (
    <div className="w-full flex flex-col space-y-6 text-left">
      {/* Categories Section */}
      <div className="flex flex-col space-y-3" ref={dropdownRef}>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 font-mono">
          Filter Categories
        </h3>
        
        {/* Category Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-10 text-xs text-slate-700 font-bold text-left focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between"
          >
            <span>{selectedDisplayLabel}</span>
            <span className={`text-slate-400 text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Custom Dropdown Options */}
          {isOpen && (
            <div className="absolute left-0 right-0 mt-2 z-50 bg-white border border-slate-150 rounded-2xl shadow-xl p-2 space-y-1 text-left max-h-64 overflow-y-auto">
              {allCategories.map((cat) => {
                const displayLabel = cat || 'All Categories';
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left text-xs font-semibold p-2.5 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold'
                        : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {displayLabel}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <hr className="border-slate-100 hidden md:block" />

      {/* Tech Stack Section */}
      <div className="flex flex-col space-y-3.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 font-mono">
          Filter Tech Stack
        </h3>
        
        {/* Tech Search Input */}
        <div className="relative w-full group">
          <input
            type="text"
            value={selectedTech}
            onChange={(e) => onSelectTech(e.target.value)}
            placeholder="Type technology..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-8 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-all duration-200 shadow-sm"
          />
          {selectedTech && (
            <button
              onClick={() => onSelectTech('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-[10px] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Popular Tech Pills */}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {POPULAR_TECHS.map((tech) => {
            const isSelected = selectedTech.toLowerCase() === tech.toLowerCase();
            return (
              <button
                key={tech}
                onClick={() => onSelectTech(isSelected ? '' : tech)}
                className={`px-3 py-1.5 text-[10px] font-semibold rounded-lg border transition-all duration-200 cursor-pointer active:scale-95 shadow-sm ${
                  isSelected
                    ? 'bg-primary-600 border-primary-600 text-white shadow-md hover:bg-primary-700'
                    : 'bg-white border-gray-200 text-slate-500 hover:border-primary-300 hover:text-primary-600 hover:bg-slate-50'
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
