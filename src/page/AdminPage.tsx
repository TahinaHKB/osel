import { useState } from "react";
import Sidebar from "../components/admin/SideBar";
import AdminHeader from "../components/admin/AdminHeader";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden">
          <div className="w-64 bg-purple-700 text-white h-full p-6">
            <h2 className="text-3xl font-bold mb-10">Admin</h2>
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-white"
            >
              ✕
            </button>
            <p>Menu mobile ici...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64">
        <AdminHeader toggleSidebar={toggleSidebar} />

        <main className="pt-20 px-6">
          <h2 className="text-3xl font-bold mb-6">Bienvenue dans l’admin 🎛️</h2>
          <p className="text-gray-700">
            Ici tu vas gérer : inscriptions, questions, emails…  
            On va construire ça étape par étape 🔥
          </p>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
