import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div className="flex space-x-4">
      <button onClick={() => changeLanguage("fr")}>FR</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("mg")}>MG</button>
    </div>
  );
};

export default LanguageSwitcher;
