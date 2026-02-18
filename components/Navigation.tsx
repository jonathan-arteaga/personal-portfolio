import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { NavItem } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { useLenis, scrollToTopWithLenis, scrollToSectionWithLenis } from '../contexts/LenisContext';

const navItems: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
  const { lenis, scrollProgress: lenisProgress, scrollY: lenisScrollY } = useLenis();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('top');

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

    // Determine active section
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
  }, [lastScrollY]);

  const prevLenisScrollY = useRef(0);
  // When Lenis is active, use context scroll; otherwise use native window scroll
  useEffect(() => {
    if (lenis) {
      setScrollProgress(lenisProgress * 100);
      setIsScrolled(lenisScrollY > 10);
      if (lenisScrollY > 100) {
        setIsVisible(lenisScrollY <= prevLenisScrollY.current);
      } else {
        setIsVisible(true);
      }
      prevLenisScrollY.current = lenisScrollY;
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
    }
  }, [lenis, lenisProgress, lenisScrollY]);

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
            ? 'bg-background/90 backdrop-blur-md border-border'
            : 'bg-transparent border-transparent'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo / Name */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogoClick}>
            <img
              src="/images/headshot.webp"
              alt="Jonathan Arteaga"
              className="w-9 h-9 rounded-full object-cover border-2 border-transparent group-hover:border-accent transition-all"
            />
            <span className="font-sans font-semibold tracking-tight text-foreground group-hover:text-muted transition-colors">
              Jonathan Arteaga
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => onNavLinkClick(e, item.href)}
                  className={`font-mono text-fluid-xs uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'text-foreground bg-accent px-2 py-1'
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
              className="font-mono text-fluid-xs font-semibold uppercase tracking-widest text-foreground hover:text-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background z-50 flex flex-col md:hidden transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button
            className="w-12 h-12 flex items-center justify-center text-foreground hover:text-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
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
                className={`font-sans text-3xl font-semibold transition-colors ${
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
            href="mailto:jonarteaga6@gmail.com"
            className="font-mono text-fluid-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            jonarteaga6@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};
