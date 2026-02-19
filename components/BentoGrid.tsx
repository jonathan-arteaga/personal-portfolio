import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface TimelineNode {
  company: string;
  role: string;
  period: string;
  description?: string;
  details?: string[];
  isCurrent?: boolean;
}

const timelineData: TimelineNode[] = [
  {
    company: 'Salesforce',
    role: 'Lead Solutions Engineer',
    period: '2019 — Present',
    isCurrent: true,
    description: 'Promoted 3x in 5 years. I lead technical strategy for complex deals and build the demos that get executives to say yes.',
    details: [
      'Lead SE (2024 — Present)',
      'Senior SE (2021 — 2024)',
      'SE (2019 — 2021)',
    ],
  },
  {
    company: 'Enterprise Admin',
    role: 'Salesforce Administrator',
    period: '2016 — 2019',
    description: 'Ran Salesforce orgs for manufacturing and consulting companies.',
  },
  {
    company: 'AT&T',
    role: 'B2B Sales Consultant',
    period: '2010 — 2017',
    description: 'B2B sales for small business accounts. Learned to listen and close.',
  },
];

export const BentoGrid: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full border-t border-border surface-tier-2 section-shell"
    >
      <div className="content-shell">
        {/* Section Header */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="w-2 h-2 bg-foreground"></div>
          <span className="type-label text-muted">
            About & Journey
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* Card 1: Large Photo Card (spans 1 col on mobile, 1 col on desktop) */}
          <div
            className={`card-lift relative bg-surface border border-border p-5 md:p-6 flex flex-col items-center justify-center min-h-[280px] transition-all duration-700 delay-100 hover:border-foreground group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <img
              src="/images/headshot.webp"
              alt="Jonathan Arteaga"
              className="w-28 h-28 rounded-full object-cover border-4 border-accent elev-2 mb-4 group-hover:scale-105 transition-transform"
            />
            <h3 className="type-title text-foreground text-center">
              Jonathan Arteaga
            </h3>
            <p className="type-tag text-muted mt-1">
              Lead Solutions Engineer
            </p>
          </div>

          {/* Card 2: Journey Timeline (spans 2 cols on lg) */}
          <div
            className={`lg:col-span-2 bg-surface border border-border p-5 md:p-6 transition-all duration-700 delay-150 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 bg-foreground"></div>
              <span className="type-label text-muted">
                The Journey
              </span>
            </div>

            <div className="relative pl-6">
              {/* Vertical Line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border"></div>

              <div className="space-y-4">
                {timelineData.map((node, index) => (
                  <div key={index} className="relative">
                    {/* Node dot */}
                    <div
                      className={`absolute -left-6 top-1.5 w-[11px] h-[11px] border-2 ${
                        node.isCurrent
                          ? 'bg-foreground border-foreground'
                          : 'bg-surface border-border'
                      }`}
                    ></div>

                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <h4 className="type-title text-foreground">
                        {node.company}
                      </h4>
                      {node.isCurrent && (
                        <span className="inline-flex items-center gap-1 type-tag font-semibold px-1.5 py-0.5 interactive-accent-primary">
                          <span className="w-1 h-1 bg-accent-dark rounded-full animate-pulse"></span>
                          Live
                        </span>
                      )}
                    </div>
                    <p className="type-tag text-muted">
                      {node.role} · {node.period}
                    </p>
                    {node.details && (
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                        {node.details.map((detail, i) => (
                          <span key={i} className="type-body-sm text-muted">
                            {detail}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Stats */}
          <div
            className={`card-lift bg-surface border border-border p-5 md:p-6 flex flex-col justify-center transition-all duration-700 delay-200 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div>
              <p className="type-heading leading-none text-foreground">
                18
              </p>
              <p className="type-tag text-muted mt-1.5">
                Years in Sales
              </p>
            </div>
            <div className="w-full h-px bg-border my-5" />
            <div>
              <p className="type-heading leading-none text-foreground">
                5
              </p>
              <p className="type-tag text-muted mt-1.5">
                Years at Salesforce
              </p>
            </div>
          </div>

          {/* Card 4: Philosophy - Large spanning card */}
          <div
            className={`md:col-span-2 bg-surface border border-border p-5 md:p-7 transition-all duration-700 delay-250 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="type-heading text-foreground mb-4">
              {"I've sat on both sides of the table.".split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ marginRight: '0.28em' }}>
                  <span
                    className="word-reveal inline-block"
                    style={{
                      animationDelay: `${0.3 + i * 0.06}s`,
                      animationPlayState: isVisible ? 'running' : 'paused',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p className="type-body-sm text-muted">
              Eighteen years in sales gave me a sharp ear for what customers actually need. Five years in solutions engineering taught me how to build it. Now I do both: design the technical solution and help close the deal.
            </p>
          </div>

          {/* Card 5: Quick Fact - Focus */}
          <div
            className={`card-lift bg-surface border border-border p-5 md:p-6 flex flex-col justify-center transition-all duration-700 delay-300 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <span className="type-label text-muted block mb-2">
              Focus
            </span>
            <p className="type-body font-medium text-foreground">
              AI, Multi-Cloud, Technical Enablement
            </p>
          </div>

          {/* Card 6: Quick Fact - Style */}
          <div
            className={`card-lift bg-surface border border-border p-5 md:p-6 flex flex-col justify-center transition-all duration-700 delay-350 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <span className="type-label text-muted block mb-2">
              Style
            </span>
            <p className="type-body font-medium text-foreground">
              Direct. Curious. Ships fast.
            </p>
          </div>

          {/* Card 7: AI Philosophy - wide card */}
          <div
            className={`md:col-span-2 bg-foreground text-background border border-foreground p-5 md:p-7 transition-all duration-700 delay-400 hover:bg-foreground/90 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
              </svg>
              <span className="type-label opacity-70">
                On AI
              </span>
            </div>
            <p className="type-body-sm opacity-90">
              I stay ahead on AI. Not just pitching it - building with it. Slack workflows, Gemini Gems, automations that save my team hours every week. When something new lands, I'm usually the one showing others how to use it.
            </p>
          </div>

          {/* Card 8: Certifications - spans 2 cols */}
          <div
            className={`md:col-span-2 bg-surface border border-border p-5 md:p-6 transition-all duration-700 delay-450 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8"/>
              </svg>
              <span className="type-label text-muted">
                Certifications
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 border border-border hover:border-foreground transition-colors">
                <div className="w-2 h-2 bg-accent mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="type-body-sm font-medium text-foreground">AI Associate</p>
                  <p className="type-tag text-muted">Feb 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-border hover:border-foreground transition-colors">
                <div className="w-2 h-2 bg-accent mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="type-body-sm font-medium text-foreground">Platform App Builder</p>
                  <p className="type-tag text-muted">Feb 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-border hover:border-foreground transition-colors">
                <div className="w-2 h-2 bg-accent mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="type-body-sm font-medium text-foreground">Administrator</p>
                  <p className="type-tag text-muted">Dec 2018</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-border hover:border-foreground transition-colors">
                <div className="w-2 h-2 bg-accent mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="type-body-sm font-medium text-foreground">Accelerate Aspiring Leader</p>
                  <p className="type-tag text-muted">Dec 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
