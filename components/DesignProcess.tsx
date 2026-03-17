import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Ear, Target, Lightbulb, Layers, CheckCircle } from 'lucide-react';

interface ProcessStep {
  icon: React.ReactNode;
  phase: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    icon: <Ear size={20} strokeWidth={1.5} />,
    phase: '01',
    title: 'Listen',
    description: 'Sit with the customer. Understand the real problem, not just the one on the slide.',
  },
  {
    icon: <Target size={20} strokeWidth={1.5} />,
    phase: '02',
    title: 'Define',
    description: 'Frame the challenge in terms that resonate with every stakeholder in the room.',
  },
  {
    icon: <Lightbulb size={20} strokeWidth={1.5} />,
    phase: '03',
    title: 'Envision',
    description: 'Co-create the future state. Show what\'s possible before anyone asks for a feature list.',
  },
  {
    icon: <Layers size={20} strokeWidth={1.5} />,
    phase: '04',
    title: 'Prototype',
    description: 'Build something tangible. A vision people can react to is worth more than a deck they nod through.',
  },
  {
    icon: <CheckCircle size={20} strokeWidth={1.5} />,
    phase: '05',
    title: 'Validate',
    description: 'Test against business outcomes. If it doesn\'t move a number that matters, iterate.',
  },
];

export const DesignProcess: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="process"
      ref={sectionRef}
      className="w-full border-t border-border surface-tier-1 section-shell"
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
            How I Work
          </span>
        </div>

        {/* Section Title */}
        <h2
          className={`type-heading text-foreground mb-4 max-w-3xl transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Every solution starts with understanding. The technology comes last.
        </h2>
        <p
          className={`type-body-sm text-muted mb-10 max-w-2xl transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Not a framework I pulled from a book. This is how I've run every enterprise deal, every prototype, and every consulting engagement.
        </p>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <div
              key={step.phase}
              className={`group relative bg-surface border border-border p-5 transition-all duration-700 hover:border-foreground ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              {/* Phase number */}
              <span className="type-tag text-muted block mb-3">
                {step.phase}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center interactive-accent-secondary mb-4 group-hover:scale-105 transition-transform">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="type-title text-foreground mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="type-body-sm text-muted">
                {step.description}
              </p>

              {/* Connector arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <svg className="w-5 h-5 text-border" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
