import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';
import EBooks from './pages/EBooks';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/ebooks" element={<EBooks />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isAuthPage && (
        <footer className="bg-slate-900 py-20 mt-40 rounded-t-[5rem] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 gap-4 h-full">
              {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/10 h-full"></div>)}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 text-center space-y-8 relative z-10">
            <div className="text-4xl font-black text-white tracking-tighter">Googlopedia.</div>
            <p className="text-slate-400 font-medium max-w-md mx-auto">The digital sanctuary for literature and knowledge. Built with passion for students everywhere.</p>
            <div className="h-px bg-white/10 w-24 mx-auto"></div>
            <p className="text-slate-500 font-black text-xs uppercase tracking-[0.3em]">© 2026 Knowledge Unbound • Academic Excellence</p>
          </div>
        </footer>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
