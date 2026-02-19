import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { NavItem } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { useLenis } from '../contexts/LenisContext';
import { scrollToTopWithLenis, scrollToSectionWithLenis } from '../utils';
import { CONTACT_EMAIL } from '../config/site';

const navItems: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
  const { lenis } = useLenis();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const mobileMenuId = 'mobile-navigation-menu';

  const setSectionInView = useCallback(() => {
    const sections = ['contact', 'projects', 'about', 'top'];
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId === 'top' ? 'hero' : sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;

    setScrollProgress(progress);
    setIsScrolled(currentScrollY > 10);

    // Smart hide/show: hide on scroll down (past 100px), show on scroll up
    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
    setSectionInView();
  }, [lastScrollY, setSectionInView]);

  const prevLenisScrollY = useRef(0);
  // When Lenis is active, subscribe directly to its events to avoid global rerenders.
  useEffect(() => {
    if (!lenis) return;

    const onLenisScroll = () => {
      const currentScrollY = lenis.scroll;
      const limit = lenis.limit;
      setScrollProgress(limit > 0 ? (currentScrollY / limit) * 100 : 0);
      setIsScrolled(currentScrollY > 10);
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY <= prevLenisScrollY.current);
      } else {
        setIsVisible(true);
      }
      prevLenisScrollY.current = currentScrollY;
      setSectionInView();
    };

    onLenisScroll();
    lenis.on('scroll', onLenisScroll);
    return () => {
      lenis.off('scroll', onLenisScroll);
    };
  }, [lenis, setSectionInView]);

  useEffect(() => {
    if (lenis) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lenis, handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const onNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#top') {
      scrollToTopWithLenis(lenis, e);
    } else {
      const targetId = href.replace(/^#/, '');
      scrollToSectionWithLenis(lenis, targetId, e);
    }
    setMobileMenuOpen(false);
  };

  const onLogoClick = (e: React.MouseEvent<HTMLElement>) => {
    scrollToTopWithLenis(lenis, e);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
          className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-background/90 backdrop-blur-md border-border elev-2'
              : 'bg-transparent border-transparent'
          } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="content-shell-wide px-4 md:px-5 h-[4.5rem] flex justify-between items-center">
          {/* Logo / Name */}
          <button
            type="button"
            onClick={onLogoClick}
            className="focus-ring flex items-center gap-3 cursor-pointer group bg-transparent"
            aria-label="Go to top"
          >
            <img
              src="/images/headshot.webp"
              alt="Jonathan Arteaga"
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-accent transition-all"
            />
            <span className="type-body-sm font-semibold text-foreground group-hover:text-muted transition-colors">
              Jonathan Arteaga
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => onNavLinkClick(e, item.href)}
                  className={`focus-ring type-body-sm font-medium transition-colors ${
                    isActive
                      ? 'interactive-accent-primary px-2 py-1'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="focus-ring type-body-sm font-medium text-foreground hover:text-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
              aria-label="Open navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id={mobileMenuId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 bg-background z-50 flex flex-col md:hidden transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button
            type="button"
            className="focus-ring w-12 h-12 flex items-center justify-center text-foreground hover:text-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col justify-center px-8 gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => onNavLinkClick(e, item.href)}
                className={`focus-ring type-heading transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="px-8 pb-12 border-t border-border pt-8">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="focus-ring type-label text-muted hover:text-foreground transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </>
  );
};
