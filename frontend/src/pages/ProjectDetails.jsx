import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import Loader from '../components/common/Loader';
import { formatDate, parseTechStack } from '../utils/helpers';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch project details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);



  if (loading) return <div className="min-h-screen bg-[#F6F8FD] flex items-center justify-center"><Loader size="lg" /></div>;

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 border border-red-100 rounded-3xl max-w-md space-y-4 shadow-sm">
          <span className="text-3xl">⚠️</span>
          <h2 className="text-lg font-bold">Registry Fetch Error</h2>
          <p className="text-xs text-slate-500">{error || 'Could not locate project details.'}</p>
          <button onClick={() => navigate('/projects')} className="btn-primary px-4 py-2">
            Return to Explore
          </button>
        </div>
      </div>
    );
  }

  const techStackList = parseTechStack(project.techStack);

  return (
    <div className="min-h-screen bg-white text-slate-700 pt-10 pb-24 font-sans text-left cyber-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate('/projects')}
          className="text-xs font-semibold text-slate-500 hover:text-primary-600 mb-6 transition-colors flex items-center space-x-1 cursor-pointer"
        >
          <span>← Back to Explore</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Left Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Project Banner Image */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-slate-150 shadow-md relative">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="category-pill">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Header Details */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">{project.title}</h1>
              
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 font-mono font-bold">
                <span>By <strong className="text-slate-700 font-bold">{project.author}</strong></span>
                <span>•</span>
                <span>Published: {formatDate(project.createdAt)}</span>
                <span>•</span>
                <span>👁 {project.views || 0} views</span>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-3 pt-4 border-t border-slate-205 border-slate-200/80">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">About this project</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-white p-6 rounded-3xl border border-slate-150/80 shadow-sm">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-450 text-slate-500 font-mono">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStackList.map((tech, idx) => (
                  <span
                    key={idx}
                    className="tech-tag !text-[11px] !px-3 !py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Right Column - External Links & Profiles */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Host Links panel */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 space-y-4.5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono border-b border-slate-100 pb-3">
                Project Resources
              </h3>

              <div className="flex flex-col gap-3">
                {project.demoUrl && project.demoUrl.trim() ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary py-3.5 px-4"
                  >
                    🌐 Live Demo ↗
                  </a>
                ) : (
                  <div>
                    <button
                      onClick={() => alert("Warning: The live demo link is not provided for this project.")}
                      className="w-full bg-slate-50 text-slate-400 font-bold py-3.5 px-4 rounded-xl border border-dashed border-slate-200 text-xs text-center cursor-pointer hover:bg-slate-100 hover:text-slate-500 transition-all"
                    >
                      🌐 Live Demo (Not Provided)
                    </button>
                    <p className="text-[10px] text-amber-600 font-semibold mt-2 text-center flex items-center justify-center gap-1 font-mono">
                      <span>⚠️ Demo link not provided</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 text-left space-y-3 shadow-sm">
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-sm font-black text-white uppercase border border-purple-500/10">
                  {project.author.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">{project.author}</h4>
                  <p className="text-[10px] text-slate-450 mt-1 font-mono font-bold">Verified Builder</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pt-2">
                Active member shipping in public and contributing to the Pradarsh developer directory.
              </p>
            </div>



          </div>

        </div>

      </div>
    </div>
  );
}
