export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const CATEGORIES = [
  'Web Development',
  'Mobile Apps',
  'AI & Machine Learning',
  'Generative AI',
  'SaaS Products',
  'Portfolio',
  'Open Source',
  'Cyber Security',
  'Cloud Computing',
  'Dev Tools'
];

export const INITIAL_MOCK_PROJECTS = [
  {
    id: 1,
    title: "Nebula Analytics",
    category: "SaaS Products",
    techStack: "React, TypeScript, Node.js",
    description: "Real-time product analytics with beautiful dashboards, custom events pipeline, and active telemetry queries reporting visual statistics instantly.",
    demoUrl: "https://nebula.app",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    userId: 1,
    author: "Aarav Mehta",
    stars: 142,
    views: 920,
    createdAt: "2026-05-15T12:00:00.000Z"
  },
  {
    id: 2,
    title: "Synapse AI",
    category: "AI & Machine Learning",
    techStack: "Python, FastAPI, LangChain",
    description: "Open-source agent framework for building autonomous LLM apps with local vector indexing, semantic routing, and tool-use loop handlers.",
    demoUrl: "https://synapse.ai",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    userId: 2,
    author: "Priya Sharma",
    stars: 254,
    views: 1480,
    createdAt: "2026-06-01T08:30:00.000Z"
  },
  {
    id: 3,
    title: "Pixel Drift",
    category: "Dev Tools", // mapped to Dev Tools / Game dev
    techStack: "Unity, C#, Aseprite",
    description: "A cozy roguelite about racing through procedural cities. Features pixel-art graphics and custom physics-based drift systems.",
    demoUrl: "https://pixeldrift.app",
    thumbnail: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=800&q=80",
    userId: 3,
    author: "Rahul Verma",
    stars: 189,
    views: 1120,
    createdAt: "2026-06-10T15:45:00.000Z"
  },
  {
    id: 4,
    title: "Orbit — Cloud Cost Radar",
    category: "Cloud Computing",
    techStack: "Go, ClickHouse, Kubernetes",
    description: "Real-time multi-cloud cost intelligence with anomaly detection. Connects directly to clusters and pulls pricing structures automatically.",
    demoUrl: "https://orbitcost.io",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    userId: 4,
    author: "Noah Lindqvist",
    stars: 98,
    views: 650,
    createdAt: "2026-06-12T10:00:00.000Z"
  }
];
