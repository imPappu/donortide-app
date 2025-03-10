
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ToastProvider } from "@/hooks/ToastProvider";
import { useAddonModules } from "@/hooks/useAddonModules";
import DonationCategories from "@/pages/DonationCategories";
import Events from "@/pages/Events";
import Admin from "@/components/admin/Admin";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/donation-categories",
    element: <DonationCategories />,
  },
  {
    path: "/events",
    element: <Events />
  },
  {
    path: "/admin/dashboard",
    element: <Admin initialTab="dashboard" />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/requests",
    element: <DonationCategories />
  }
]);

const App = () => {
  const { isInitialized } = useAddonModules();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
