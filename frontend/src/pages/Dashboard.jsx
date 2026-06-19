import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import projectService from '../services/projectService';
import MyProjects from '../components/dashboard/MyProjects';
import Loader from '../components/common/Loader';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await projectService.getProjects();
        const userProjects = data.filter(p => p.userId === user?.id);
        setProjects(userProjects);
      } catch (err) {
        setError('Failed to fetch published projects telemetry.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProjects();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        alert(err.message || 'Deletion failed');
      }
    }
  };



  return (
    <div className="min-h-screen bg-[#F6F8FD] text-slate-700 pt-10 pb-20 cyber-grid text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Console Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-805 text-slate-805 text-slate-800 tracking-tight">Developer Console</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and monitor your published builder portfolios and project showcases.</p>
          </div>
          <button
            onClick={() => navigate('/publish')}
            className="btn-primary self-start sm:self-center"
          >
            ➕ Publish New Project
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-650 text-xs px-4 py-3 rounded-xl font-mono">
            ⚠️ {error}
          </div>
        )}

        {/* Dashboard Grid System */}
        <div>
          {loading ? (
            <Loader />
          ) : (
            <MyProjects projects={projects} onDelete={handleDelete} />
          )}
        </div>

      </div>
    </div>
  );
}