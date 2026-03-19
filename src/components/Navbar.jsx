import React from "react";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md h-16 flex items-center justify-between px-6">
      {/* Page Title will be dynamic later */}
      <h2 className="text-lg font-semibold text-gray-700">
        Company Department Management
      </h2>

      {/* Profile Section */}
      <div className="flex items-center gap-3 cursor-pointer">
        <span className="text-gray-600 text-sm">Admin</span>
        <UserCircle size={32} className="text-gray-600" />
      </div>
    </nav>
  );
};

export default Navbar;
