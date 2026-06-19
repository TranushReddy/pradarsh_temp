import api, { requestHandler } from './api';
import uploadService from './uploadService';
import { CATEGORIES } from '../utils/constants';

const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false;
  if (url.includes('streamlit.app')) return false;
  return true;
};

const mapProjectFromBackend = (p) => {
  if (!p) return null;
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    techStack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : (p.tech_stack || ''),
    description: p.description,
    demoUrl: p.project_url || '',
    thumbnail: isValidImageUrl(p.thumbnail_url)
      ? p.thumbnail_url
      : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    userId: p.developer_id,
    author: p.profiles?.username || 'Anonymous',
    stars: 0,
    views: p.visits_count || 0,
    createdAt: p.created_at
  };
};

const projectService = {
  getProjects: async (search = '', category = '', technology = '') => {
    return requestHandler(
      async () => {
        // Query the /search endpoint which supports filtering
        const isOthers = category.toLowerCase() === 'others';
        const searchCategory = isOthers ? '' : category;
        const res = await api.get('/search/', { params: { q: search, category: searchCategory, technology } });
        const list = res.data?.data?.projects || res.data?.projects || [];
        let mapped = list.map(mapProjectFromBackend);
        
        if (isOthers) {
          const lowercasePredefined = CATEGORIES.map(c => c.toLowerCase());
          mapped = mapped.filter(p => p.category && !lowercasePredefined.includes(p.category.toLowerCase()));
        }
        return { data: mapped };
      },
      () => {
        let projects = JSON.parse(localStorage.getItem('nimbus_mock_projects') || '[]');
        
        if (category) {
          if (category.toLowerCase() === 'others') {
            const lowercasePredefined = CATEGORIES.map(c => c.toLowerCase());
            projects = projects.filter(p => p.category && !lowercasePredefined.includes(p.category.toLowerCase()));
          } else {
            projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
          }
        }

        if (technology) {
          const queryTech = technology.toLowerCase();
          projects = projects.filter(p => 
            p.techStack.toLowerCase().split(',').map(s => s.trim()).includes(queryTech)
          );
        }

        if (search) {
          const query = search.toLowerCase();
          projects = projects.filter(p => 
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.techStack.toLowerCase().includes(query)
          );
        }

        return projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    );
  },

  getProjectById: async (id) => {
    return requestHandler(
      async () => {
        const res = await api.get(`/projects/${id}`);
        const details = res.data?.data || res.data || {};
        const mappedProj = mapProjectFromBackend(details.project);
        if (mappedProj && details.developer) {
          mappedProj.author = details.developer.username || mappedProj.author;
        }
        return { data: mappedProj };
      },
      () => {
        const projects = JSON.parse(localStorage.getItem('nimbus_mock_projects') || '[]');
        const project = projects.find(p => String(p.id) === String(id));
        
        if (!project) {
          throw new Error('Project not found');
        }

        project.views = (project.views || 0) + 1;
        localStorage.setItem('nimbus_mock_projects', JSON.stringify(projects));
        
        return project;
      }
    );
  },

  createProject: async (projectData) => {
    return requestHandler(
      async () => {
        const { thumbnail, ...rest } = projectData;
        const backendData = {
          title: rest.title,
          short_description: rest.description.slice(0, 150) || 'No description provided.',
          description: rest.description,
          category: rest.category,
          tech_stack: rest.techStack ? rest.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
          project_url: rest.demoUrl || '',
          thumbnail_url: null
        };

        const res = await api.post('/projects/', backendData);
        const createdProject = res.data?.data?.project || res.data?.project || res.data?.data || res.data;

        // If a file thumbnail object was passed, upload it now using the new project ID
        if (thumbnail && typeof thumbnail !== 'string') {
          try {
            const uploadRes = await uploadService.uploadThumbnail(createdProject.id, thumbnail);
            const url = uploadRes.data?.thumbnail_url || uploadRes.thumbnail_url;
            if (url) {
              createdProject.thumbnail_url = url;
            }
          } catch (err) {
            console.error("Failed to upload thumbnail after project creation:", err);
          }
        }

        return { data: mapProjectFromBackend(createdProject) };
      },
      () => {
        const projects = JSON.parse(localStorage.getItem('nimbus_mock_projects') || '[]');
        const storedUser = localStorage.getItem('nimbus_user');
        const user = storedUser ? JSON.parse(storedUser) : { id: 1, username: 'Anonymous' };

        const newProject = {
          id: Date.now(),
          title: projectData.title,
          category: projectData.category,
          techStack: projectData.techStack,
          description: projectData.description,
          demoUrl: projectData.demoUrl || '',
          thumbnail: projectData.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          userId: user.id,
          author: user.username,
          stars: 0,
          views: 0,
          createdAt: new Date().toISOString()
        };

        projects.push(newProject);
        localStorage.setItem('nimbus_mock_projects', JSON.stringify(projects));
        return newProject;
      }
    );
  },

  updateProject: async (id, projectData) => {
    return requestHandler(
      async () => {
        const { thumbnail, ...rest } = projectData;
        const backendData = {
          title: rest.title,
          short_description: rest.description.slice(0, 150) || 'No description provided.',
          description: rest.description,
          category: rest.category,
          tech_stack: rest.techStack ? rest.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
          project_url: rest.demoUrl || ''
        };

        if (thumbnail && typeof thumbnail !== 'string') {
          try {
            const uploadRes = await uploadService.uploadThumbnail(id, thumbnail);
            const url = uploadRes.data?.thumbnail_url || uploadRes.thumbnail_url;
            if (url) {
              backendData.thumbnail_url = url;
            }
          } catch (err) {
            console.error("Failed to upload thumbnail during project update:", err);
          }
        } else if (typeof thumbnail === 'string') {
          backendData.thumbnail_url = thumbnail;
        }

        const res = await api.put(`/projects/${id}`, backendData);
        const updatedProject = res.data?.data?.project || res.data?.project || res.data?.data || res.data;
        return { data: mapProjectFromBackend(updatedProject) };
      },
      () => {
        const projects = JSON.parse(localStorage.getItem('nimbus_mock_projects') || '[]');
        const idx = projects.findIndex(p => String(p.id) === String(id));
        
        if (idx === -1) {
          throw new Error('Project module not found');
        }

        const updatedProject = {
          ...projects[idx],
          title: projectData.title,
          category: projectData.category,
          techStack: projectData.techStack,
          description: projectData.description,
          demoUrl: projectData.demoUrl || '',
          thumbnail: typeof thumbnail === 'string' ? thumbnail : projects[idx].thumbnail
        };

        projects[idx] = updatedProject;
        localStorage.setItem('nimbus_mock_projects', JSON.stringify(projects));
        return updatedProject;
      }
    );
  },

  deleteProject: async (id) => {
    return requestHandler(
      async () => {
        const res = await api.delete(`/projects/${id}`);
        return { data: res.data };
      },
      () => {
        let projects = JSON.parse(localStorage.getItem('nimbus_mock_projects') || '[]');
        const initialLength = projects.length;
        projects = projects.filter(p => String(p.id) !== String(id));
        
        if (projects.length === initialLength) {
          throw new Error('Project not found');
        }

        localStorage.setItem('nimbus_mock_projects', JSON.stringify(projects));
        return { success: true, message: 'Project deleted successfully' };
      }
    );
  }
};

export default projectService;

