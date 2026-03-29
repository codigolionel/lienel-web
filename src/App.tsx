import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Archive from './components/Archive';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AbautUs from './components/AbautUs';
import Service from './components/Service';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-surface selection:bg-moss/30 selection:text-white pb-0">
      {/* Global Noise Overlay */}
      <div className="noise-overlay pointer-events-none"></div>

      <Navbar />
      <ScrollToTop />
      <WhatsAppFloat />

      <main>
        <Hero />
        <Service />
        <AbautUs />
        <Archive />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
