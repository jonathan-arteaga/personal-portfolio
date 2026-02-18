import React from 'react';

export const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
  e.preventDefault();
  const targetId = href.replace(/^#/, '');
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToTop = (e?: React.MouseEvent<HTMLElement | HTMLButtonElement>) => {
  if (e) e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};