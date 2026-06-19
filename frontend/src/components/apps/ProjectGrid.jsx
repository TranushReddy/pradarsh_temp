import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects = [] }) {
  if (projects.length === 0) {
    return (
      <div className="w-full text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-white flex flex-col items-center justify-center space-y-3 shadow-sm">
        <div className="text-3xl text-slate-300">⚡</div>
        <h4 className="text-base font-bold text-slate-750 text-slate-700">No Projects Listed</h4>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          No showcases matching your search query or selected category were found in this directory.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
