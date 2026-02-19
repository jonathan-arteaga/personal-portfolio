import React, { useEffect, useRef } from 'react';

const SELECTOR = 'a, button, [role="button"], input, select, textarea, label';
const DOT_SIZE = 8;
const STIFFNESS = 0.12;
const DAMPING = 0.72;
const PADDING = 8;
const BORDER_RADIUS_PILL = 20;

interface SpringVal {
  current: number;
  velocity: number;
  target: number;
}

const spring = (s: SpringVal): number => {
  s.velocity += (s.target - s.current) * STIFFNESS;
  s.velocity *= DAMPING;
  s.current += s.velocity;
  return s.current;
};

export const CustomCursor: React.FC = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const mouse = { x: -100, y: -100 };
    let hoveredEl: HTMLElement | null = null;

    const sx: SpringVal = { current: -100, velocity: 0, target: -100 };
    const sy: SpringVal = { current: -100, velocity: 0, target: -100 };
    const sw: SpringVal = { current: DOT_SIZE, velocity: 0, target: DOT_SIZE };
    const sh: SpringVal = { current: DOT_SIZE, velocity: 0, target: DOT_SIZE };
    const sr: SpringVal = { current: DOT_SIZE / 2, velocity: 0, target: DOT_SIZE / 2 };
    const so: SpringVal = { current: 1, velocity: 0, target: 1 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hoveredEl = target.closest<HTMLElement>(SELECTOR);
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest(SELECTOR)) {
        hoveredEl = null;
      }
    };

    const animate = () => {
      const el = elRef.current;
      if (!el) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (hoveredEl) {
        const rect = hoveredEl.getBoundingClientRect();
        const isLink = hoveredEl.tagName === 'A' || hoveredEl.closest('a');

        if (isLink) {
          // Underline morph — slide under the element
          sx.target = rect.left - PADDING / 2;
          sy.target = rect.bottom + 2;
          sw.target = rect.width + PADDING;
          sh.target = 2;
          sr.target = 1;
          so.target = 0.6;
        } else {
          // Button/element outline morph
          sx.target = rect.left - PADDING;
          sy.target = rect.top - PADDING;
          sw.target = rect.width + PADDING * 2;
          sh.target = rect.height + PADDING * 2;
          sr.target = Math.min(BORDER_RADIUS_PILL, (rect.height + PADDING * 2) / 2);
          so.target = 0.4;
        }
      } else {
        // Default: small dot following cursor
        sx.target = mouse.x - DOT_SIZE / 2;
        sy.target = mouse.y - DOT_SIZE / 2;
        sw.target = DOT_SIZE;
        sh.target = DOT_SIZE;
        sr.target = DOT_SIZE / 2;
        so.target = 1;
      }

      const x = spring(sx);
      const y = spring(sy);
      const w = spring(sw);
      const h = spring(sh);
      const r = spring(sr);
      const o = spring(so);

      el.style.transform = `translate(${String(x)}px, ${String(y)}px)`;
      el.style.width = `${String(w)}px`;
      el.style.height = `${String(h)}px`;
      el.style.borderRadius = `${String(r)}px`;
      el.style.opacity = String(o);

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={elRef} className="cursor-dot" />;
};
