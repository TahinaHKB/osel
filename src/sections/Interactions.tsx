import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Users, Settings, Layers, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import BgImage from "../assets/interractionImage.jpg";
import Loading from "../components/Loading";

const icons = [Layers, Users, Settings, Globe];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 50,
    },
  }),
};

const InteractionsSection: React.FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  // Préchargement image
  useEffect(() => {
    const img = new Image();
    img.src = BgImage;
    img.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  const interactionsData = t("interactions.cards", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section
      id="interactions"
      className="relative py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          {t("interactions.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
          {interactionsData.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-2xl w-full max-w-full"
              >
                <div className="bg-purple-100 text-purple-700 rounded-full p-4 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractionsSection;
