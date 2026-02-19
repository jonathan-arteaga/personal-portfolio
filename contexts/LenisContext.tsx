import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  prefersReducedMotion: boolean;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  prefersReducedMotion: false,
});

export const useLenis = () => useContext(LenisContext);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(reducedMotion);

    if (reducedMotion) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    setLenis(instance);
    const root = document.documentElement;
    root.classList.add('lenis', 'lenis-smooth');

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
      root.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return (
    <LenisContext.Provider
      value={{
        lenis,
        prefersReducedMotion,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
};
