import React, { useEffect, useState } from "react";
import TechImage from "../assets/tech-artisan.jpg";
import ArtisanImage from "../assets/artisan.jpg";
import BgImage from "../assets/technoArtisanImage.jpg";
import Loading from "../components/Loading";
import AnimatedSection from "../components/AnimatedSection";

const TechArtisanSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img1 = new Image();
    img1.src = BgImage;
    img1.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;
  return (
    <AnimatedSection direction="left">
      <section
        id="tech-artisan"
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="relative z-20 text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Technologie et Artisanat
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Technologie */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img
                  src={TechImage}
                  alt="Technologie OSEL"
                  loading="lazy"
                  className="w-full h-64 object-cover brightness-90"
                />
              </div>
              <div className="p-6 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                  Technologie Innovante
                </h3>
                <p className="text-gray-700">
                  OSEL utilise la capture de mensurations, la modélisation 3D et
                  l’essayage virtuel pour améliorer la précision des commandes
                  et la satisfaction des clients.
                </p>
              </div>
            </div>

            {/* Artisanat */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img
                  src={ArtisanImage}
                  alt="Artisanat OSEL"
                  loading="lazy"
                  className="w-full h-64 object-cover brightness-90"
                />
              </div>
              <div className="p-6 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                  Savoir-faire Artisanal
                </h3>
                <p className="text-gray-700">
                  Les couturiers malgaches apportent leur expertise, créativité
                  et tradition artisanale pour garantir des vêtements uniques,
                  sur-mesure et de haute qualité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default TechArtisanSection;
