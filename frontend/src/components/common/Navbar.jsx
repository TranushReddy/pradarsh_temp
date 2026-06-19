import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logoImg from '../../assets/logo.jpg';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
          
          {/* Logo Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3.5 group">
              <img src={logoImg} alt="Pradarsh Logo" className="h-10 w-10 sm:h-14 sm:w-14 md:h-[72px] md:w-[72px] rounded-xl sm:rounded-2xl object-cover shadow-md border border-purple-900/10" />
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">
                Pradarsh
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                isActive('/')
                  ? 'bg-primary-50 text-primary-600 border-primary-100/60 shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-primary-600 hover:bg-gradient-to-r hover:from-white hover:to-accent-200/70 hover:border-primary-200/40 hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                isActive('/projects')
                  ? 'bg-primary-50 text-primary-600 border-primary-100/60 shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-primary-600 hover:bg-gradient-to-r hover:from-white hover:to-accent-200/70 hover:border-primary-200/40 hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/publish"
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                isActive('/publish')
                  ? 'bg-primary-50 text-primary-600 border-primary-100/60 shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-primary-600 hover:bg-gradient-to-r hover:from-white hover:to-accent-200/70 hover:border-primary-200/40 hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              Publish
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl hover:border-slate-300 transition-all cursor-pointer select-none"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-xs font-black text-white uppercase">
                    {user?.username?.substring(0, 2) || 'US'}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{user?.username}</span>
                  <span className="text-xs text-slate-400">▼</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-150 rounded-2xl shadow-xl p-2 space-y-1 text-left">
                    <div className="px-3.5 py-2">
                      <p className="text-xs font-bold text-slate-800 leading-none">{user?.username}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{user?.email}</p>
                    </div>
                    <hr className="border-slate-100" />
                    <button
                      onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}
                      className="w-full text-left text-xs font-semibold text-gray-600 hover:bg-primary-50 hover:text-primary-600 p-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Console Dashboard
                    </button>
                    <button
                      onClick={() => { navigate('/publish'); setDropdownOpen(false); }}
                      className="w-full text-left text-xs font-semibold text-gray-600 hover:bg-primary-50 hover:text-primary-600 p-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Publish Project
                    </button>
                    <hr className="border-slate-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-xs font-bold text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2.5 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-5 py-3 rounded-2xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-500 hover:text-slate-800 p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-100 px-4 pt-2 pb-6 space-y-1.5 text-left max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          >
            Explore
          </Link>
          <Link
            to="/publish"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          >
            Publish
          </Link>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-slate-150 space-y-2">
              <div className="flex items-center space-x-3 px-3 py-1">
                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-xs font-black text-white uppercase">
                  {user?.username?.substring(0, 2) || 'US'}
                </div>
                <span className="text-sm font-bold text-slate-700">{user?.username}</span>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-550 hover:bg-slate-50 hover:text-slate-800"
              >
                Console Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center text-sm font-bold bg-red-50 hover:bg-red-100/50 text-red-500 py-3 rounded-xl border border-red-100 transition-all cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-150 flex flex-col space-y-1.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-bold text-slate-600 hover:text-slate-900 py-3 rounded-xl hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-bold btn-primary py-3"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
