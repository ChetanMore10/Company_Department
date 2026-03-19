import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, Users } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Departments", icon: <Building2 size={20} />, path: "/departments" },
    { name: "Employees", icon: <Users size={20} />, path: "/employees" },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-5 fixed">
      <h1 className="text-2xl font-bold mb-10">Company CMS</h1>

      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition 
                ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
