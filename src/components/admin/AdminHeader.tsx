import React from "react";
import { Menu } from "lucide-react";

interface Props {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-white shadow-md h-16 flex items-center px-6 md:ml-64 fixed top-0 left-0 z-40">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-purple-700 mr-4"
      >
        <Menu className="w-8 h-8" />
      </button>

      <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>
    </header>
  );
};

export default AdminHeader;
