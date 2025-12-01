import { motion, type Variants } from "framer-motion";
import React, { type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: "left" | "right"; // la direction peut être "left" ou "right"
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, direction = "left" }) => {
  // Ici direction est bien défini grâce aux props
  const variants: Variants = {
    hidden: { opacity: 0, x: direction === "left" ? -50 : 50, y: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { duration: 1, ease: "easeOut" } 
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
