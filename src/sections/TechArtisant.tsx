import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TechImage from "../assets/tech-artisan.jpg";
import ArtisanImage from "../assets/artisan.jpg";
import BgImage from "../assets/technoArtisanImage.jpg";
import Loading from "../components/Loading";
import AnimatedSection from "../components/AnimatedSection";

const TechArtisanSection: React.FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = BgImage;
    img.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  const cards = t("techArtisan.cards", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <AnimatedSection direction="left">
      <section
        id="tech-artisan"
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {t("techArtisan.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {cards.map((card, index) => {
              const image = index === 0 ? TechImage : ArtisanImage;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative">
                    <img
                      src={image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-64 object-cover brightness-90"
                    />
                  </div>
                  <div className="p-6 text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-700">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default TechArtisanSection;
