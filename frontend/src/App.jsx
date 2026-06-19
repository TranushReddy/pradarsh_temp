import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F6F8FD]">
          
          {/* Top Navbar Header */}
          <Navbar />
          
          {/* Main Content Viewport */}
          <main className="flex-grow flex flex-col">
            <AppRoutes />
          </main>
          
          {/* Sticky Footer */}
          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}
