import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-10 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-600 opacity-95 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-4">

        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          {t("footer.title")}
        </h3>

        <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
          {t("footer.description")}
        </p>

        {/* Call to action vers le questionnaire */}
        <div className="mt-6">
          <Link
            to="/question"
            className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg shadow-lg 
                     transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105
                     animate-pulse"
          >
            Remplir le questionnaire
          </Link>
        </div>

        {/* SECTION CREDIT + LOGO */}
        <div className="mt-10 flex flex-col items-center gap-3">
          {/* Logo */}
          <div className="w-16 h-16">
            {/* Remplace /logo.png par le chemin réel de ton logo */}
            <img
              src={logo}
              alt="Logo HKB"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="mt-6 text-gray-300 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} OSEL. All rights reserved
        </p>

      </div>
    </footer>
  );
};

export default Footer;
