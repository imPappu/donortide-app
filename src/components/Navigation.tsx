
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, PlusCircle, Bell, UserCircle } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: <Home className="h-6 w-6" />, label: "Home" },
    { to: "/donors", icon: <Users className="h-6 w-6" />, label: "Donors" },
    { to: "/create", icon: <PlusCircle className="h-6 w-6" />, label: "Create" },
    { to: "/requests", icon: <Bell className="h-6 w-6" />, label: "Requests" },
    { to: "/profile", icon: <UserCircle className="h-6 w-6" />, label: "Profile" }
  ];

  return (
    <nav className="fixed bottom-0 w-full border-t bg-background z-10">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
