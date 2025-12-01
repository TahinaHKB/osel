import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import BgImage from "../assets/beneficeImage.jpg";
import Loading from "../components/Loading";

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

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = BgImage;
    img.onload = () => setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  const benefitsData = t("benefits.cards", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section
      id="benefits"
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          {t("benefits.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
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
