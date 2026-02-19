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
    const scrollTo = vi.fn();
    const lenis = { scrollTo } as unknown as Lenis;
    const preventDefault = vi.fn();

    scrollToTopWithLenis(lenis, { preventDefault } as unknown as React.MouseEvent<HTMLElement>);

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith(0, { immediate: false });
  });

  it('scrollToTopWithLenis falls back to window.scrollTo', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const preventDefault = vi.fn();

    scrollToTopWithLenis(null, { preventDefault } as unknown as React.MouseEvent<HTMLElement>);

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('scrollToSectionWithLenis no-ops when target is missing', () => {
    const scrollTo = vi.fn();
    const lenis = { scrollTo } as unknown as Lenis;

    scrollToSectionWithLenis(lenis, 'missing-section');

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('scrollToSectionWithLenis uses Lenis for existing targets', () => {
    const scrollTo = vi.fn();
    const lenis = { scrollTo } as unknown as Lenis;
    const target = document.createElement('section');
    target.id = 'about';
    document.body.appendChild(target);

    scrollToSectionWithLenis(lenis, 'about');

    expect(scrollTo).toHaveBeenCalledWith(target, { offset: -80 });
  });

  it('scrollToSectionWithLenis falls back to native scrolling', () => {
    const target = document.createElement('section');
    target.id = 'projects';
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    scrollToSectionWithLenis(null, 'projects');

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
