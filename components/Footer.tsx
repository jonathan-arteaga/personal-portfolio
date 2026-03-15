import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLenis } from '../contexts/LenisContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../config/site';
import { scrollToTopWithLenis } from '../utils';

export const Footer: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();
  const { theme } = useTheme();
  const { lenis } = useLenis();

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="w-full border-t border-border surface-tier-2"
    >
      {/* Main Contact Section */}
      <div className="section-shell">
        <div className="content-shell">

          {/* Section Header */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="w-2 h-2 bg-foreground"></div>
            <span className="type-label text-muted">
              Contact
            </span>
          </div>

          {/* Kicker line */}
          <p
            className={`type-body-sm text-muted mb-5 transition-all duration-700 delay-75 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            Got a problem? Let's solve it.
          </p>

          {/* Referral line */}
          <p
            className={`type-body-sm text-muted mb-5 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            Referred by someone? Tell me who sent you.
          </p>

          {/* Large email link — typographic hero */}
          <div
            className={`mb-12 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-block focus-ring"
              aria-label={`Send email to ${CONTACT_EMAIL}`}
            >
              <h2 className="type-title text-foreground transition-colors duration-300 group-hover:text-muted">
                {CONTACT_EMAIL}
              </h2>
              {/* Animated underline */}
              <span
                className="block h-px bg-foreground mt-3 transition-all duration-700"
                style={{ width: isVisible ? '100%' : '0%' }}
              />
              <span className="block type-label text-muted mt-4 group-hover:text-foreground transition-colors duration-200">
                Send a message →
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div
            className={`flex items-center gap-5 transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <span className="type-label text-muted">
              Connect
            </span>
            <div className="flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring btn-press w-12 h-12 flex items-center justify-center border border-border hover:border-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <img
                  src={theme === 'dark' ? '/images/InBug-White.png' : '/images/LI-In-Bug.png'}
                  alt="LinkedIn"
                  className="w-5 h-5 object-contain"
                />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring btn-press w-12 h-12 flex items-center justify-center border border-border hover:border-foreground transition-all duration-200"
                aria-label="GitHub"
              >
                <img
                  src={theme === 'dark' ? '/images/GitHub_Invertocat_White.svg' : '/images/GitHub_Invertocat_Black.svg'}
                  alt="GitHub"
                  className="w-5 h-5 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-[var(--section-pad-x-mobile)] md:px-[var(--section-pad-x-desktop)] py-[var(--space-200)]">
        <div className="content-shell flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="type-body-sm text-muted">
            © {new Date().getFullYear()} Jonathan Arteaga
          </span>
          <button
            onClick={(e) => { scrollToTopWithLenis(lenis, e); }}
            className="focus-ring group type-body-sm font-medium text-muted hover:text-foreground transition-colors flex items-center gap-2"
          >
            Back to Top
            <ArrowUp
              size={14}
              strokeWidth={2}
              className="transition-transform group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
