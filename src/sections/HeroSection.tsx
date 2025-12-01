import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import BgImage from "../assets/header.jpg";
import Loading from "../components/Loading";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img1 = new Image();
    img1.src = BgImage;
    img1.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  return (
    <section
      id="hero"
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 z-10"></div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t("hero_title")}
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          {t("hero_subtitle")}
        </p>
        <ScrollLink
          to="interactions"
          smooth={true}
          duration={500}
          offset={-70}
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition cursor-pointer"
        >
          {t("hero_button")}
        </ScrollLink>
      </div>

      {/* Flèche d’animation */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <svg
          className="w-10 h-10 animate-bounce text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
