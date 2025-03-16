import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from "@/hooks/use-toast"
import { AuthProvider } from './components/auth/AuthContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Donate from './pages/Donate';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Campaigns from './pages/Campaigns';
import Community from './pages/Community';
import CreateRequest from './pages/CreateRequest';
import MostDonatedItems from './pages/MostDonatedItems';
import UrgentRequests from './pages/UrgentRequests';
import NearbyVolunteers from './pages/NearbyVolunteers';
import TopConsultants from './pages/TopConsultants';
import Fundraising from './pages/Fundraising';
import CorporateGiving from './pages/CorporateGiving';
import AdminDashboard from './pages/admin/AdminDashboard';
import PaymentGatewaySettings from './components/admin/PaymentGatewaySettings';
import DonorManagement from './components/admin/DonorManagement';
import { SidebarProvider } from '@/components/ui/sidebar';

function App() {
  const { toast } = useToast()
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      toast({
        title: "No internet connection",
        description: "Some features may be unavailable.",
      })
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return (
    <AuthProvider>
      <Router>
       <SidebarProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/community/*" element={<Community />} />
            <Route path="/request" element={<CreateRequest />} />
            <Route path="/most-donated-items" element={<MostDonatedItems />} />
            <Route path="/urgent-requests" element={<UrgentRequests />} />
            <Route path="/nearby-volunteers" element={<NearbyVolunteers />} />
            <Route path="/top-consultants" element={<TopConsultants />} />
            <Route path="/fundraising" element={<Fundraising />} />
            <Route path="/corporate-giving" element={<CorporateGiving />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/payment-settings" element={<PaymentGatewaySettings />} />
            <Route path="/admin/donor-management" element={<DonorManagement />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SidebarProvider>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
