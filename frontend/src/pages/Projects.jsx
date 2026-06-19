import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import projectService from '../services/projectService';
import SearchBar from '../components/apps/SearchBar';
import FilterPanel from '../components/apps/FilterPanel';
import ProjectGrid from '../components/apps/ProjectGrid';
import Loader from '../components/common/Loader';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const techParam = searchParams.get('tech') || '';

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await projectService.getProjects(search, categoryParam, techParam);
        setProjects(data);
      } catch (err) {
        setError('Failed to query the project registry.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProjects();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, categoryParam, techParam]);

  const handleSelectCategory = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category) {
      nextParams.set('category', category);
    } else {
      nextParams.delete('category');
    }
    setSearchParams(nextParams);
  };

  const handleSelectTech = (tech) => {
    const nextParams = new URLSearchParams(searchParams);
    if (tech) {
      nextParams.set('tech', tech);
    } else {
      nextParams.delete('tech');
    }
    setSearchParams(nextParams);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 pt-10 pb-20 cyber-grid text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-sans">Explore developer projects</h1>
          <p className="text-xs text-slate-500 mt-1 font-mono">Search across projects, developers and technologies.</p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Filters Column */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <FilterPanel
                selectedCategory={categoryParam}
                onSelectCategory={handleSelectCategory}
                selectedTech={techParam}
                onSelectTech={handleSelectTech}
              />
            </div>
          </div>

          {/* Search and Grid Column */}
          <div className="md:col-span-9 space-y-6">
            <SearchBar value={search} onChange={setSearch} />
            
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="text-center py-20 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-xs font-mono">
                ⚠️ {error}
              </div>
            ) : (
              <ProjectGrid projects={projects} />
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
