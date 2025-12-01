import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Home, Users, Gift, Settings, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    {
      name: t("navbar.home"),
      to: "hero",
      icon: <Home className="inline mr-2" />,
    },
    {
      name: t("navbar.interactions"),
      to: "interactions",
      icon: <Users className="inline mr-2" />,
    },
    {
      name: t("navbar.benefits"),
      to: "benefits",
      icon: <Gift className="inline mr-2" />,
    },
    {
      name: t("navbar.techArtisan"),
      to: "tech-artisan",
      icon: <Settings className="inline mr-2" />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-purple-700">OSEL</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <li
              key={item.to}
              className="cursor-pointer text-gray-800 hover:text-purple-700 font-medium flex items-center"
            >
              {item.icon}
              <ScrollLink
                to={item.to}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {item.name}
              </ScrollLink>
            </li>
          ))}

          {/* Language Switcher - Desktop */}
          <li>
            <div className="hidden md:flex items-center space-x-4 ml-6">
              {["fr", "en", "mg"].map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={`px-3 py-1 rounded ${
                    i18n.language === lng
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? (
              <X className="h-8 w-8 text-purple-700" />
            ) : (
              <Home className="h-8 w-8 text-purple-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-purple-700 text-white flex flex-col justify-center items-center z-40 animate-fadeIn">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-10 w-10" />
          </button>

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

          <div className="flex space-x-4 mt-10">
            {["fr", "en", "mg"].map((lng) => (
              <button
                key={lng}
                onClick={() => {
                  changeLanguage(lng);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded font-semibold ${
                  i18n.language === lng
                    ? "bg-white text-purple-700"
                    : "bg-purple-500 text-white"
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
