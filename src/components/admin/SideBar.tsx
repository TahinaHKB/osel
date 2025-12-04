import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // redirige vers login
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const menuItems = [
    { id: "1", label: "Dashboard" },
    { id: "2", label: "Emails" },
    { id: "3", label: "Questionnaires" },
  ];

  return (
    <div className="hidden md:flex w-64 bg-purple-700 text-white h-screen flex-col fixed">
      <div className="p-6 text-2xl font-bold">Admin</div>

      <nav className="flex flex-col space-y-2 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/admin/${item.id}`}
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
  );
};

export default Sidebar;
