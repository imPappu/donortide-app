import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Users, User, Calendar } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    { to: "/donation", icon: <Heart className="w-5 h-5" />, label: "Donate" },
    { to: "/community", icon: <Users className="w-5 h-5" />, label: "Community" },
    { to: "/events", icon: <Calendar className="w-5 h-5" />, label: "Events" },
    { to: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`flex flex-col items-center justify-center ${location.pathname === link.to ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}
        >
          {link.icon}
          <span className="text-xs">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
