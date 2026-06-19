import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatDate, parseTechStack } from '../../utils/helpers';

export default function MyProjects({ projects = [], onDelete }) {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-white flex flex-col items-center justify-center space-y-4 shadow-sm">
        <div className="text-4xl text-slate-300">⚙️</div>
        <p className="text-slate-500 text-xs font-semibold">You haven't published any projects yet.</p>
        <button
          onClick={() => navigate('/publish')}
          className="btn-primary px-4 py-2.5"
        >
          Publish First Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const techList = parseTechStack(project.techStack);
        return (
          <div
            key={project.id}
            className="bg-white border border-slate-150/80 rounded-3xl overflow-hidden flex flex-col justify-between shadow-dark-card hover:shadow-lg transition-all duration-300"
          >
            {/* Banner / Image preview */}
            <Link
              to={`/projects/${project.id}`}
              className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100 block"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="category-pill">
                  {project.category}
                </span>
              </div>
            </Link>

            {/* Main Info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold mb-2">
                  <span>By {project.author || 'You'}</span>
                  <span>{formatDate(project.createdAt)}</span>
                </div>

                <Link to={`/projects/${project.id}`} className="hover:no-underline group">
                  <h3 className="text-base font-black text-gray-900 tracking-tight hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack List & Metrics */}
              <div className="mt-5 space-y-4 pt-4 border-t border-slate-100">
                {/* Tech pills */}
                <div className="flex flex-wrap gap-1">
                  {techList.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {techList.length > 3 && (
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-transparent">
                      +{techList.length - 3} more
                    </span>
                  )}
                </div>

                {/* Metrics and View link */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono font-bold">
                    <span className="flex items-center space-x-1">
                      <span>👁</span>
                      <span>{project.views || 0}</span>
                    </span>
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="text-xs font-bold text-primary-600 hover:text-accent-500 transition-colors duration-200 hover:no-underline"
                  >
                    View project →
                  </Link>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100/60 bg-slate-50/35 flex items-center justify-between gap-2.5">
              <button
                onClick={() => navigate(`/edit-project/${project.id}`)}
                className="flex-1 text-center text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 transition-all text-xs font-semibold active:scale-95 cursor-pointer shadow-sm"
              >
                Modify
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="flex-1 text-center text-red-500 hover:text-red-650 bg-red-50 hover:bg-red-100/40 px-4 py-2.5 rounded-xl border border-red-100 hover:border-red-200 transition-all text-xs font-semibold active:scale-95 cursor-pointer shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
