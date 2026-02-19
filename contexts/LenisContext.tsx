import React, { createContext, useContext, useEffect, useRef, useSyncExternalStore } from 'react';
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

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const subscribersRef = useRef(new Set<() => void>());

  const subscribe = (callback: () => void) => {
    subscribersRef.current.add(callback);
    return () => { subscribersRef.current.delete(callback); };
  };

  const lenis = useSyncExternalStore(
    subscribe,
    () => lenisRef.current,
    () => null,
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = instance;
    const subscribers = subscribersRef.current;
    subscribers.forEach((cb) => { cb(); });

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
      lenisRef.current = null;
      subscribers.forEach((cb) => { cb(); });
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
