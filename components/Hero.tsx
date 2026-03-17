import React from 'react';
import { GradientBackground } from './GradientBackground';
import { useTheme } from '../contexts/ThemeContext';
import { GITHUB_URL, LINKEDIN_URL } from '../config/site';

const HEADLINE_WORDS = 'I make complex solutions feel intuitive.'.split(' ');
// Last word starts at 0.1 + 5 * 0.08 = 0.5s; its animation takes 0.7s → done ~1.2s
// Content items fade in at 0.8s for a natural overlap with the last word revealing
const CONTENT_DELAY = '0.8s';

const techTags = [
  {
    name: 'Salesforce',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#00A1E0">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#D97757">
        <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
      </svg>
    ),
  },
  {
    name: 'Cursor',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3l7.5 18L13 13l8-2.5z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#F24E1E">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.981zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.564v4.49c0 2.476-2.014 4.49-4.564 4.49zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019c1.627 0 3.093-1.355 3.093-3.019v-3.019H8.172zm7.68-1.509c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49zm0 7.51c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019-3.019 1.355-3.019 3.019 1.354 3.019 3.019 3.019z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#3776AB">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.134V3.2S18.28 0 11.914 0zM8.708 1.85a1.06 1.06 0 1 1 0 2.118 1.06 1.06 0 0 1 0-2.118z" />
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.123s3.9.445 3.9-5.735c0-6.18-3.404-5.96-3.404-5.96h-2.03v2.867s.109 3.402-3.348 3.402H9.453s-3.24-.052-3.24 3.134v5.326S5.72 24 12.086 24zm3.206-1.85a1.06 1.06 0 1 1 0-2.118 1.06 1.06 0 0 1 0 2.118z" />
      </svg>
    ),
  },
  {
    name: 'Agentforce',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#00A1E0">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8" />
      </svg>
    ),
  },
  {
    name: 'Data Cloud',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#032D60">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8" />
      </svg>
    ),
  },
  {
    name: 'Slack',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#4A154B">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
  },
];

export const Hero: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative min-h-[82svh] lg:min-h-[86svh] flex items-center overflow-hidden surface-tier-0 section-shell">
      {/* Gradient Mesh Background */}
      <GradientBackground />

      {/* Content */}
      <div className="relative z-10 content-shell-wide pb-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center min-h-[58vh] lg:min-h-[62vh]">

          {/* Left Column — Text */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Headline — word-by-word stagger */}
            <h1 className="type-display text-foreground mb-6">
              {HEADLINE_WORDS.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden"
                  style={{ marginRight: i < HEADLINE_WORDS.length - 1 ? '0.26em' : 0 }}
                >
                  <span
                    className="word-reveal inline-block"
                    style={{ animationDelay: `${String(0.1 + i * 0.08)}s` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Tagline */}
            <p
              className="type-body text-muted max-w-2xl mb-10 opacity-0 animate-fade-in"
              style={{ animationDelay: CONTENT_DELAY, animationFillMode: 'forwards' }}
            >
              I find the real problem, design the vision, and build the solution that gets adopted. Eighteen years of understanding what decision-makers actually need, backed by the technical depth to deliver it.
            </p>

            {/* Social Links */}
            <div
              className="flex items-center gap-4 mb-10 opacity-0 animate-fade-in"
              style={{ animationDelay: CONTENT_DELAY, animationFillMode: 'forwards' }}
            >
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring btn-press w-14 h-14 flex items-center justify-center border border-border hover:border-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <img
                  src={theme === 'dark' ? '/images/InBug-White.png' : '/images/LI-In-Bug.png'}
                  alt="LinkedIn"
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring btn-press w-14 h-14 flex items-center justify-center border border-border hover:border-foreground transition-all duration-200"
                aria-label="GitHub"
              >
                <img
                  src={theme === 'dark' ? '/images/GitHub_Invertocat_White.svg' : '/images/GitHub_Invertocat_Black.svg'}
                  alt="GitHub"
                  className="w-6 h-6 object-contain"
                />
              </a>
            </div>

            {/* Tech Tag Marquee */}
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: CONTENT_DELAY, animationFillMode: 'forwards' }}
            >
              <span className="type-label text-muted block mb-3">Working with</span>
              <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
                />
                <div
                  className="tech-marquee-track is-playing"
                >
                  {[...techTags, ...techTags].map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 type-tag px-3 py-1.5 flex-shrink-0 whitespace-nowrap surface-tier-1 border border-border"
                      >
                        {tag.icon}
                        {tag.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Isometric Image */}
          <div
            className="flex items-center justify-center order-1 lg:order-2 opacity-0 animate-fade-in"
            style={{ animationDelay: CONTENT_DELAY, animationFillMode: 'forwards' }}
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl scale-110" />
              <img
                src="/images/isometric-desk.webp"
                alt="Jonathan working at desk - isometric illustration"
                className="relative w-full h-auto img-elev-1"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="type-label text-muted">Scroll</span>
            <div className="w-px h-8 bg-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-[scrollDown_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
