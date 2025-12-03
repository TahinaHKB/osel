import { Home, Users, Settings, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-purple-700 text-white h-screen fixed top-0 left-0 p-6 hidden md:block">
      <h2 className="text-3xl font-bold mb-10">Admin</h2>

      <nav className="space-y-6">
        <Link
          to="/admin"
          className="flex items-center gap-3 hover:text-gray-200 text-lg"
        >
          <Home /> Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center gap-3 hover:text-gray-200 text-lg"
        >
          <Users /> Inscriptions
        </Link>

        <Link
          to="/admin/questions"
          className="flex items-center gap-3 hover:text-gray-200 text-lg"
        >
          <Settings /> Questions
        </Link>

        <Link
          to="/admin/emails"
          className="flex items-center gap-3 hover:text-gray-200 text-lg"
        >
          <Mail /> Emails
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
