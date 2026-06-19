import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FAQ from '../components/home/FAQ';
import projectService from '../services/projectService';
import ProjectCard from '../components/apps/ProjectCard';
import { CATEGORIES } from '../utils/constants';

export default function Home() {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await projectService.getProjects();
        setFeaturedProjects(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans text-left">
      
      {/* Hero Header */}
      <Hero />

      {/* Featured Projects Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Featured Projects</h2>
          <p className="text-xs text-slate-500 mt-1">Handpicked builds the community is loving right now.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-slate-150 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden w-full relative py-4 mask-gradient">
            <div className="animate-marquee gap-6 pr-6">
              {featuredProjects.map((project) => (
                <div key={`${project.id}-first`} className="w-[320px] sm:w-[350px] flex-shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
              {featuredProjects.map((project) => (
                <div key={`${project.id}-second`} className="w-[320px] sm:w-[350px] flex-shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories Selection Grid */}
      <div className="bg-gray-50 border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Categories</h2>
            <p className="text-xs text-slate-500 mt-1">Find projects across every domain.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...CATEGORIES, 'Others'].map((cat) => (
              <Link
                key={cat}
                to={`/projects?category=${encodeURIComponent(cat)}`}
                className="bg-white border border-gray-200 hover:text-primary-600 hover:bg-gradient-to-r hover:from-white hover:to-accent-200/70 hover:border-primary-300 p-5 rounded-2xl text-center font-bold text-xs transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1 active:scale-[0.98] select-none block text-gray-700 shadow-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <Stats />

      {/* Call To Action Publisher Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-hero border border-gray-200 hover:border-primary-300/80 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-0.5 transition-all duration-300 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-500/5 blur-[80px] pointer-events-none"></div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight relative z-10 animate-fade">
            Ready to showcase your work?
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed relative z-10">
            Publish your project, build your portfolio, and get discovered by the developer community.
          </p>
          
          <div className="relative z-10">
            <button
              onClick={() => navigate('/publish')}
              className="btn-primary px-6 py-3.5"
            >
              Publish Your Project
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white/40 border-t border-slate-250 border-slate-200/60">
        <FAQ />
      </div>

    </div>
  );
}
