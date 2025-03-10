import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Calendar, Settings } from "lucide-react";

const NavSection = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-200">
          <Home className="h-5 w-5 mr-2" />
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className="flex items-center p-2 rounded-md hover:bg-gray-200">
          <Users className="h-5 w-5 mr-2" />
          Users
        </NavLink>
        <NavLink to="/admin/events" className="flex items-center p-2 rounded-md hover:bg-gray-200">
          <Calendar className="h-5 w-5 mr-2" />
          Event Management
        </NavLink>
        <NavLink to="/admin/settings" className="flex items-center p-2 rounded-md hover:bg-gray-200">
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default NavSection;
