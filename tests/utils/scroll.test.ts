import type Lenis from 'lenis';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { scrollToSectionWithLenis, scrollToTopWithLenis } from '../../utils';

describe('scroll utilities', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('scrollToTopWithLenis uses Lenis when available', () => {
    const lenis = { scrollTo: vi.fn() } as unknown as Lenis;
    const preventDefault = vi.fn();

    scrollToTopWithLenis(lenis, { preventDefault } as unknown as React.MouseEvent<HTMLElement>);

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(lenis.scrollTo).toHaveBeenCalledWith(0, { immediate: false });
  });

  it('scrollToTopWithLenis falls back to window.scrollTo', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const preventDefault = vi.fn();

    scrollToTopWithLenis(null, { preventDefault } as unknown as React.MouseEvent<HTMLElement>);

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('scrollToSectionWithLenis no-ops when target is missing', () => {
    const lenis = { scrollTo: vi.fn() } as unknown as Lenis;

    scrollToSectionWithLenis(lenis, 'missing-section');

    expect(lenis.scrollTo).not.toHaveBeenCalled();
  });

  it('scrollToSectionWithLenis uses Lenis for existing targets', () => {
    const lenis = { scrollTo: vi.fn() } as unknown as Lenis;
    const target = document.createElement('section');
    target.id = 'about';
    document.body.appendChild(target);

    scrollToSectionWithLenis(lenis, 'about');

    expect(lenis.scrollTo).toHaveBeenCalledWith(target, { offset: -80 });
  });

  it('scrollToSectionWithLenis falls back to native scrolling', () => {
    const target = document.createElement('section');
    target.id = 'projects';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    scrollToSectionWithLenis(null, 'projects');

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
