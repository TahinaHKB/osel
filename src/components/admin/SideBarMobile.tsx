import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

interface SidebarMobileProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toggleSidebar(); // ferme le menu
      navigate("/"); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const menuItems = [
    { id: "1", label: "Dashboard" },
    { id: "2", label: "Emails" },
    { id: "3", label: "Questionnaires" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-40">
      <div className="w-64 bg-purple-700 text-white h-full p-6 relative">
        <h2 className="text-3xl font-bold mb-10">Admin</h2>

        {/* Bouton fermer */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

        {/* Menu */}
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={`/admin/${item.id}`}
              onClick={toggleSidebar} // ferme le menu au clic
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-purple-600 transition ${
                  isActive ? "bg-purple-800 font-bold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Bouton de déconnexion */}
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SidebarMobile;
