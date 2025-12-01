// src/sections/InteractionsSection.tsx
import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Users, Settings, Layers, Globe } from "lucide-react";
import BgImage from "../assets/interractionImage.jpg";
import Loading from "../components/Loading";
import AnimatedSection from "../components/AnimatedSection";

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

// Variants pour apparition en cascade
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // cascade
      duration: 0.6,
      type: "spring",
      stiffness: 50,
    },
  }),
};

const InteractionsSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  // Préchargement image
  useEffect(() => {
    const img = new Image();
    img.src = BgImage;
    img.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  return (
    <AnimatedSection direction="left">
    <section
      id="interactions"
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Comment OSEL transforme les interactions
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {interactionsData.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="bg-purple-100 text-purple-700 rounded-full p-4 mb-4">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </AnimatedSection>
  );
};

export default InteractionsSection;
