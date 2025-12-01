import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-10 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-600 opacity-95 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          {t("footer.title")}
        </h3>
        <p className="mb-4 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
          {t("footer.description")}
        </p>
        <p className="mt-6 text-gray-300 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} OSEL. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
