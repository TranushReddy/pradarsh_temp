import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logoImg from '../../assets/logo.jpg';
import InteractiveMesh from './InteractiveMesh';
import logoVideo from './logo video.mp4';

export default function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 cyber-grid bg-gradient-hero border-b border-gray-200">

      {/* Interactive Canvas Mesh Background */}
      <InteractiveMesh />

      {/* Background neon light glows */}
      <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-primary-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column - Hero content */}
          <div className="lg:col-span-6 text-left space-y-6">

            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-100/60 border border-primary-200/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary-700 tracking-wide opacity-0 animate-fade-in-up animation-delay-100">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              <span>The launchpad for developer projects</span>
            </div>

            {/* Stacked headings */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-none flex flex-col gap-2 opacity-0 animate-fade-in-up animation-delay-200">
              <span>Showcase.</span>
              <span>Discover.</span>
              <span className="text-gradient pb-2">Get Inspired.</span>
            </h1>

            {/* Description Subheading */}
            <p className="text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed opacity-0 animate-fade-in-up animation-delay-300">
              Pradarsh is a platform for developers to showcase their projects and portfolios and connect with the community.
            </p>

            {/* Row of two buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 opacity-0 animate-fade-in-up animation-delay-400">
              <button
                onClick={() => navigate('/projects')}
                className="btn-primary rounded-full px-9 py-5 text-sm font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Explore Projects <span>→</span>
              </button>

              <button
                onClick={() => navigate(isAuthenticated ? '/publish' : '/register')}
                className="btn-outline rounded-full px-9 py-5 text-sm font-bold border border-gray-200 hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isAuthenticated ? 'Publish Your Project' : 'Join Now'}
              </button>
            </div>
          </div>

          {/* Right Column - Standalone Logo */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">

            {/* Radial glow background for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/30 to-accent-500/30 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

            {/* Large Standalone Logo / Video Player */}
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-purple-900/20 transform transition-all duration-300 hover:scale-[1.02] opacity-0 animate-fade-in-right animation-delay-300">
              <video
                src={logoVideo}
                poster={logoImg}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block rounded-3xl"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
