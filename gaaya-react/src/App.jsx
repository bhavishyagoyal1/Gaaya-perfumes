import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutGaaya from './components/AboutGaaya';
import Capabilities from './components/Capabilities';
import Process from './components/Process';
import FragranceArt from './components/FragranceArt';
import Journal from './components/Journal';
import Enquiry from './components/Enquiry';
import Footer from './components/Footer';

function App() {
  // ── Warm up backend on first visit (wakes Render from sleep) ──
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${API}/api/health`).catch(() => {}); // silent, fire-and-forget
  }, []);

  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <AboutGaaya />
        <Capabilities />
        <Process />
        <FragranceArt />
        <Journal />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}

export default App;
