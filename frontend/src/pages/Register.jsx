import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import logoImg from '../assets/logo.jpg';

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-hero flex flex-col justify-center py-16 sm:px-6 lg:px-8 relative overflow-hidden text-center">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 blur-[120px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center">
          <img src={logoImg} alt="Pradarsh" className="h-28 w-28 rounded-2xl shadow-xl border border-purple-900/20 object-cover mb-1" />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white border border-gray-200 px-6 py-10 rounded-3xl shadow-xl sm:px-10">
          <div className="mb-6 text-left">
            <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
            <p className="text-xs font-medium text-slate-400 mt-1">Start showcasing your projects in minutes.</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
