// src/sections/BenefitsSection.tsx
import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import BgImage from "../assets/beneficeImage.jpg";
import Loading from "../components/Loading";
import AnimatedSection from "../components/AnimatedSection";

const benefits = [
  {
    title: "Confiance accrue pour les clients",
    description:
      "Grâce à la prise de mensurations assistée, à la modélisation corporelle et à l'essayage virtuel, OSEL réduit les inquiétudes liées à l'achat vestimentaire à distance, renforçant la confiance du client.",
  },
  {
    title: "Processus simplifié et sécurisé pour la diaspora",
    description:
      "OSEL formalise les commandes avec un cadre structuré, des informations transparentes, un paiement sécurisé et un suivi rigoureux, minimisant le risque financier et le stress logistique.",
  },
  {
    title: "Visibilité et accès au marché international pour les artisans",
    description:
      "Les couturiers peuvent exposer leurs créations sur une vitrine numérique, renforcer leur crédibilité via les évaluations clients et atteindre une clientèle qu’ils ne pourraient toucher individuellement.",
  },
  {
    title: "Réduction des erreurs et amélioration de la qualité",
    description:
      "Standardisation des mensurations, modèles clairs et processus de commande formalisé permettent aux artisans de travailler avec moins d'incertitudes, réduisant les retouches et optimisant le temps et les coûts.",
  },
];

// Variants pour l'apparition en cascade
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

const BenefitsSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  // Préchargement de l'image
  useEffect(() => {
    const img = new Image();
    img.src = BgImage;
    img.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  return (
      <section
        id="benefits"
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/35"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            LES BENEFICES D'OSEL
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                custom={index} // pour la cascade
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-purple-700">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default BenefitsSection;

