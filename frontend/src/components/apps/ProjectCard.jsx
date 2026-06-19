import React from 'react';
import { Link } from 'react-router-dom';
import { parseTechStack, formatDate } from '../../utils/helpers';

export default function ProjectCard({ project }) {
  const techStackList = parseTechStack(project.techStack);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="bg-white border border-slate-150/80 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-dark-card shadow-dark-card-hover hover:-translate-y-1.5 hover:no-underline text-slate-700 cursor-pointer transition-all duration-300"
    >
      
      {/* Banner / Image preview */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="category-pill">
            {project.category}
          </span>
        </div>
      </div>

      {/* Main Info */}
      <div className="p-5 flex-1 flex flex-col text-left justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold mb-2">
            <span>By {project.author}</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>

          <h3 className="text-base font-black text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack List & Links */}
        <div className="mt-5 space-y-4 pt-4 border-t border-slate-100">
          
          {/* Tech pills */}
          <div className="flex flex-wrap gap-1">
            {techStackList.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="tech-tag"
              >
                {tech}
              </span>
            ))}
            {techStackList.length > 3 && (
              <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-transparent">
                +{techStackList.length - 3} more
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            {/* View Details Link */}
            <span className="text-xs font-bold text-primary-600 group-hover:text-accent-500 transition-colors duration-200">
              View project →
            </span>

            {/* Metrics */}
            <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono font-bold">
              <span className="flex items-center space-x-1">
                <span>👁</span>
                <span>{project.views || 0}</span>
              </span>
            </div>

          </div>

        </div>

      </div>

    </Link>
  );
}
