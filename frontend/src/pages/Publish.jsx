import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import ProjectForm from '../components/publish/ProjectForm';
import ThumbnailUpload from '../components/publish/ThumbnailUpload';

export default function Publish() {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePublishSubmit = async (formData) => {
    if (!thumbnail) {
      setError('Please upload a project banner / preview image.');
      return;
    }
    setSubmitting(true);
    setError('');

    const payload = {
      ...formData,
      thumbnail
    };

    try {
      await projectService.createProject(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to instantiate project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans pt-10 pb-24 text-left cyber-grid">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Back Link UI */}
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs font-semibold tracking-wide text-slate-400 hover:text-primary-600 transition-colors duration-200 uppercase mb-4 block cursor-pointer"
        >
          ← Return to Console
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight font-sans">Publish Project</h1>
          <p className="text-xs text-slate-500 mt-1 font-mono">Fill out the parameters below to configure your project showcase.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-650 text-xs px-4 py-3 rounded-xl mb-6 font-mono">
            ⚠️ {error}
          </div>
        )}

        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm relative">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono">Project Banner / Preview Image <span className="text-red-500">*</span></label>
            <ThumbnailUpload value={thumbnail} onChange={setThumbnail} />
          </div>
          
          <hr className="border-slate-100" />
          
          <ProjectForm
            onSubmit={handlePublishSubmit}
            buttonText={submitting ? "Publishing Project..." : "Publish Project"}
          />
        </div>

      </div>
    </div>
  );
}