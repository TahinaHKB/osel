import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import BenefitsSection from "./sections/Benefits";
import HeroSection from "./sections/HeroSection";
import InteractionsSection from "./sections/Interactions";
import TechArtisanSection from "./sections/TechArtisant";

function App() {
  return (
    <div className="App font-sans text-gray-800">
      <Navbar />
      <main className="mt-16">
        <HeroSection />
        <InteractionsSection />
        <BenefitsSection />
        <TechArtisanSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
