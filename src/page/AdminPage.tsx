import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Sidebar from "../components/admin/SideBar";
import AdminHeader from "../components/admin/AdminHeader";
import SidebarMobile from "../components/admin/SideBarMobile";
import Questionnaire from "../sections/admin/Questionnaire";
import AdminEmails from "../sections/admin/Email";
import DashBoard from "../sections/admin/DashBoard";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );

  const renderContent = () => {
    switch (id) {
      case "1":
      default:
        return <DashBoard />;
      case "2":
        return <AdminEmails />;
      case "3":
        return <Questionnaire />;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      {sidebarOpen && (
        <SidebarMobile isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div className="flex-1 ml-0 md:ml-64">
        <AdminHeader toggleSidebar={toggleSidebar} />

        <main className="pt-20 px-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
