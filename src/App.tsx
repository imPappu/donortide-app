import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CommunityFeed from './pages/CommunityFeed';
import DonationPage from './pages/DonationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './components/auth/AuthContext';
import { Roles } from './types/user';
import ErrorComponent from './components/ErrorComponent';
import ErrorBoundary from "./components/ErrorBoundary";
import EventsPage from './pages/events/EventsPage';
import CreateEvent from './pages/events/CreateEvent';

const AppContent = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.role === Roles.Admin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/community" element={isAuthenticated ? <CommunityFeed /> : <Navigate to="/login" />} />
      <Route path="/donation" element={isAuthenticated ? <DonationPage /> : <Navigate to="/login" />} />
      <Route path="/events" element={isAuthenticated ? <EventsPage /> : <Navigate to="/login" />} />
      <Route path="/events/create" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
      {isAdmin && (
        <Route path="/admin/*" element={<AdminDashboard />} />
      )}
      <Route path="/error" element={<ErrorComponent />} />
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
};

export default App;
