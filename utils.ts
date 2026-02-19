import type Lenis from 'lenis';
import type React from 'react';

const SCROLL_OFFSET = -80; // Offset for fixed header (matches scroll-padding-top: 5rem)

export function scrollToTopWithLenis(lenis: Lenis | null, e?: React.MouseEvent<HTMLElement>) {
  if (e) e.preventDefault();
  if (lenis) {
    lenis.scrollTo(0, { immediate: false });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

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
