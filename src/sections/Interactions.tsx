// src/components/InteractionsSection.tsx
import React, { useEffect, useState } from "react";
import { Users, Settings, Layers, Globe } from "lucide-react";
import BgImage from "../assets/interractionImage.jpg";
import Loading from "../components/Loading";

const interactionsData = [
  {
    title: "Transmission d'informations morphologiques",
    description:
      "Grâce au scan corporel, les mensurations sont standardisées et directement utilisables par les couturiers, réduisant les erreurs de confection.",
    icon: Layers,
  },
  {
    title: "Visualisation et essayage virtuel",
    description:
      "Les clients peuvent voir leurs vêtements sur un avatar 3D avant de finaliser la commande, améliorant la précision et la satisfaction.",
    icon: Users,
  },
  {
    title: "Transactions sécurisées",
    description:
      "Un système de paiement fiable et formalisé minimise les risques financiers et les litiges entre la diaspora et les artisans.",
    icon: Settings,
  },
  {
    title: "Suivi logistique transparent",
    description:
      "La livraison est suivie en temps réel, réduisant l'incertitude et améliorant l'expérience globale du client.",
    icon: Globe,
  },
];

const InteractionsSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img1 = new Image();
    img1.src = BgImage;
    img1.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;
  return (
    <section
      id="interactions"
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
          Comment OSEL transforme les interactions
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {interactionsData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="bg-purple-100 text-purple-700 rounded-full p-4 mb-4">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractionsSection;
