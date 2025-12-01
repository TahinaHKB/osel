// src/components/Loading.tsx
import React, { useEffect } from "react";

const Loading: React.FC = () => {
  // Bloquer le scroll pendant le chargement
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-purple-700 bg-opacity-70 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner avec animation pulse et rotation */}
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg font-semibold animate-pulse">
          Chargement...
        </p>
      </div>
    </div>
  );
};

export default Loading;
