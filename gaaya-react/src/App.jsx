import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Collection from './components/Collection';
import Spotlight from './components/Spotlight';
import Journal from './components/Journal';
import Enquiry from './components/Enquiry';
import Footer from './components/Footer';

function App() {
  const [spotlightData, setSpotlightData] = useState(null);

  // ── Warm up backend on first visit (wakes Render from sleep) ──
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${API}/api/health`).catch(() => {}); // silent, fire-and-forget
  }, []);

  const handleSelectSpotlight = (spotlight, image) => {
    setSpotlightData({ spotlight, image });
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <Collection onSelectSpotlight={handleSelectSpotlight} />
        <Spotlight spotlightData={spotlightData} />
        <Journal />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}

export default App;
