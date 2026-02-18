import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  scrollProgress: number;
  scrollY: number;
  prefersReducedMotion: boolean;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollProgress: 0,
  scrollY: 0,
  prefersReducedMotion: false,
});

export const useLenis = () => useContext(LenisContext);

const SCROLL_OFFSET = -80; // Offset for fixed header (matches scroll-padding-top: 5rem)

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
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

    const onScroll = () => {
      const limit = instance.limit;
      setScrollProgress(limit > 0 ? instance.scroll / limit : 0);
      setScrollY(instance.scroll);
    };

    instance.on('scroll', onScroll);

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
        scrollProgress,
        scrollY,
        prefersReducedMotion,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
};

/** Scroll to top using Lenis if available, else native. */
export function scrollToTopWithLenis(lenis: Lenis | null, e?: React.MouseEvent<HTMLElement>) {
  if (e) e.preventDefault();
  if (lenis) {
    lenis.scrollTo(0, { immediate: false });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/** Scroll to element/section using Lenis if available, else native scrollIntoView. */
export function scrollToSectionWithLenis(
  lenis: Lenis | null,
  targetId: string,
  e?: React.MouseEvent<HTMLElement>
) {
  if (e) e.preventDefault();
  const target = document.getElementById(targetId);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: SCROLL_OFFSET });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
