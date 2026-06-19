import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projectService from '../services/projectService';
import ProjectForm from '../components/publish/ProjectForm';
import ThumbnailUpload from '../components/publish/ThumbnailUpload';
import Loader from '../components/common/Loader';

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
        setThumbnail(data.thumbnail || '');
      } catch (err) {
        setError('Failed to load project details for adjustment.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdateSubmit = async (formData) => {
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
      await projectService.updateProject(id, payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to update project configurations.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F8FD] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans pt-10 pb-24 text-left cyber-grid">
      <div className="max-w-3xl mx-auto px-4">
        
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs font-semibold tracking-wide text-slate-400 hover:text-primary-600 transition-colors duration-200 uppercase mb-4 block cursor-pointer"
        >
          ← Cancel Adjustments
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight font-sans">Modify Project Settings</h1>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Modify configuration details
          </p>
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

          {project && (
            <ProjectForm
              initialData={{
                title: project.title,
                description: project.description,
                category: project.category,
                techStack: project.techStack,
                demoUrl: project.demoUrl
              }}
              onSubmit={handleUpdateSubmit}
              buttonText={submitting ? "Saving Changes..." : "Save Project Settings"}
            />
          )}
        </div>

      </div>
    </div>
  );
}