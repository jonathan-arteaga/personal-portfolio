import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Principle {
  number: string;
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    number: '01',
    title: 'Outcomes over features',
    description: 'Nobody buys software. They buy what the software lets them do. Every solution I design starts with the business result and works backward to the technology.',
  },
  {
    number: '02',
    title: 'Co-create, don\'t present',
    description: 'The best solutions come from building alongside the customer, not pitching at them. When stakeholders shape the vision, they champion the outcome.',
  },
  {
    number: '03',
    title: 'Make the complex feel simple',
    description: 'If a C-suite executive can\'t explain your solution to their board in one sentence, you haven\'t done your job. Clarity is a design choice.',
  },
  {
    number: '04',
    title: 'Ship the proof, not the promise',
    description: 'A working prototype builds more trust than a polished slide. I build fast, iterate in the open, and let people react to something real.',
  },
];

export const Approach: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="approach"
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
            Point of View
          </span>
        </div>

        {/* Section Title */}
        <h2
          className={`type-heading text-foreground mb-10 max-w-3xl transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {"What I believe about design-led solutions engineering.".split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden" style={{ marginRight: '0.28em' }}>
              <span
                className="word-reveal inline-block"
                style={{
                  animationDelay: `${String(0.3 + i * 0.06)}s`,
                  animationPlayState: isVisible ? 'running' : 'paused',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              className={`group bg-surface border border-border p-5 md:p-7 transition-all duration-700 hover:border-foreground ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <span className="type-tag text-accent block mb-3">
                {principle.number}
              </span>
              <h3 className="type-title text-foreground mb-3">
                {principle.title}
              </h3>
              <p className="type-body-sm text-muted">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
