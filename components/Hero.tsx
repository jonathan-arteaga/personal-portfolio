import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';
import { useTheme } from '../contexts/ThemeContext';

export const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const fullText = "I prove the value of software.";
  const { theme } = useTheme();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayText(fullText);
      setTypingComplete(true);
      return;
    }

    let currentIndex = 0;
    const typingDelay = 80;

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTypingComplete(true);
      }
    }, typingDelay);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>

      {/* Content - Split Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">

          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Greeting */}
            <p
              className="font-mono text-fluid-sm md:text-fluid-base text-muted mb-4 opacity-0 animate-fade-in tracking-wide"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Lead Solutions Engineer at Salesforce
            </p>

            {/* Headline with typing animation - Serif font for editorial feel */}
            <h1 className="font-serif text-fluid-4xl md:text-fluid-5xl font-normal text-foreground mb-6">
              <span>{displayText}</span>
              <span
                className={`inline-block w-[3px] h-[0.9em] bg-foreground ml-1 align-middle transition-opacity ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </h1>

            {/* Tagline */}
            <p
              className={`font-mono text-fluid-sm md:text-fluid-base text-muted max-w-lg mb-10 leading-relaxed transition-opacity duration-500 ${
                typingComplete ? 'opacity-100' : 'opacity-0'
              }`}
            >
              From first conversation to final demo — I find the real problem, architect the solution, and make the complex feel simple.
            </p>

            {/* Social Links */}
            <div
              className={`flex items-center gap-4 mb-10 transition-opacity duration-500 ${
                typingComplete ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <a
                href="https://www.linkedin.com/in/arteagajonathan"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-bounce btn-press w-12 h-12 flex items-center justify-center border border-border hover:border-foreground hover:bg-accent glow-hover transition-all"
                aria-label="LinkedIn"
              >
                <img
                  src={theme === 'dark' ? '/images/InBug-White.png' : '/images/LI-In-Bug.png'}
                  alt="LinkedIn"
                  className="w-5 h-5 object-contain"
                />
              </a>
              <a
                href="https://github.com/jonathan-arteaga"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-bounce btn-press w-12 h-12 flex items-center justify-center border border-border hover:border-foreground hover:bg-accent glow-hover transition-all"
                aria-label="GitHub"
              >
                <img
                  src={theme === 'dark' ? '/images/GitHub_Invertocat_White.svg' : '/images/GitHub_Invertocat_Black.svg'}
                  alt="GitHub"
                  className="w-5 h-5 object-contain"
                />
              </a>
            </div>

            {/* Tech Tags - AI Tools with Brand Icons */}
            <div
              className={`flex flex-wrap gap-3 transition-opacity duration-500 ${
                typingComplete ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              {/* Salesforce */}
              <span className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-border bg-surface hover:border-foreground hover:bg-accent transition-all cursor-default">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#00A1E0">
                  <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8"/>
                </svg>
                Salesforce
              </span>
              {/* Gemini */}
              <span className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-border bg-surface hover:border-foreground hover:bg-accent transition-all cursor-default">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#8E75B2">
                  <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
                </svg>
                Gemini
              </span>
              {/* Slack */}
              <span className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-border bg-surface hover:border-foreground hover:bg-accent transition-all cursor-default">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#4A154B">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                </svg>
                Slack
              </span>
              {/* Claude */}
              <span className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-border bg-surface hover:border-foreground hover:bg-accent transition-all cursor-default">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#D97757">
                  <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
                </svg>
                Claude
              </span>
              {/* ChatGPT */}
              <span className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-border bg-surface hover:border-foreground hover:bg-accent transition-all cursor-default">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#412991">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                </svg>
                ChatGPT
              </span>
            </div>
          </div>

          {/* Right Column - Isometric Image */}
          <div
            className={`flex items-center justify-center order-1 lg:order-2 transition-all duration-700 ${
              typingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Subtle background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl scale-110" />

              {/* Isometric Image */}
              <img
                src="/images/isometric-desk.webp"
                alt="Jonathan working at desk - isometric illustration"
                className="relative w-full h-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
            typingComplete ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-fluid-xs uppercase tracking-widest text-muted">Scroll</span>
            <div className="w-px h-8 bg-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-[scrollDown_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
};
