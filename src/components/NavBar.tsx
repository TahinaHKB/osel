// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Home, Users, Gift, Settings, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Accueil", to: "hero", icon: <Home className="inline mr-2" /> },
    { name: "Interactions", to: "interactions", icon: <Users className="inline mr-2" /> },
    { name: "Bénéfices", to: "benefits", icon: <Gift className="inline mr-2" /> },
    { name: "Relation", to: "tech-artisan", icon: <Settings className="inline mr-2" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-purple-700">OSEL</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <li
              key={item.to}
              className="cursor-pointer text-gray-800 hover:text-purple-700 font-medium flex items-center"
            >
              {item.icon}
              <ScrollLink to={item.to} smooth={true} duration={500} offset={-70}>
                {item.name}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {isOpen ? <X className="h-8 w-8 text-purple-700" /> : <Home className="h-8 w-8 text-purple-700" />}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-purple-700 text-white flex flex-col justify-center items-center z-40 animate-fadeIn">
          {/* Bouton de fermeture */}
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-10 w-10" />
          </button>

          {/* Menu items */}
          <div className="flex flex-col justify-center items-center space-y-10 text-2xl">
            {menuItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-gray-300 transition-transform transform hover:scale-110 flex items-center"
              >
                {item.icon}
                {item.name}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
