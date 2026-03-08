import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Manifesto from './components/Manifesto';
import Archive from './components/Archive';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-base selection:bg-moss/30 selection:text-white pb-0">
      {/* Global Noise Overlay */}
      <div className="noise-overlay pointer-events-none"></div>

      <Navbar />

      <main>
        <Hero />
        <Features />
        <Manifesto />
        <Archive />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
