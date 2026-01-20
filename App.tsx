import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Artifacts } from './components/Artifacts';
import { Testimonials } from './components/Testimonials';
import { Interests } from './components/Interests';
import { Footer } from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div
        className={`min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navigation />

        <main className="relative">
          {/* Hero - Full screen with particle animation */}
          <Hero />

          {/* About & Journey - Bento Grid */}
          <BentoGrid />

          {/* Projects */}
          <Artifacts />

          {/* Testimonials - Social proof after seeing work */}
          <Testimonials />

          {/* Interests / Beyond Work */}
          <Interests />
        </main>

        {/* Contact / Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
