import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Music, Guitar, Code, Film, Bike } from 'lucide-react';

interface InterestItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description?: string;
  accentColor?: string;
}

const interests: InterestItem[] = [
  {
    icon: <Music size={24} strokeWidth={1.5} />,
    title: 'Music Production',
    subtitle: 'Creating beats & mixing',
    description: 'Pop, lofi, rock, r&b, indie. Ableton is my playground.',
  },
  {
    icon: <Guitar size={24} strokeWidth={1.5} />,
    title: 'Music Writing',
    subtitle: 'Guitar & Piano',
    description: 'Self-taught guitarist and pianist. Writing melodies is my meditation.',
  },
  {
    icon: <Code size={24} strokeWidth={1.5} />,
    title: 'Vibe Coding',
    subtitle: 'Building for fun',
    description: 'Side projects, experiments, and late-night coding sessions with good music.',
  },
  {
    icon: <Film size={24} strokeWidth={1.5} />,
    title: 'Cinema',
    subtitle: 'Film enthusiast',
    description: 'Sci-fi, thrillers, and anything A24 touches.',
  },
  {
    icon: <Bike size={24} strokeWidth={1.5} />,
    title: 'Fitness',
    subtitle: 'Peloton addict',
    description: 'Daily rides and strength training.',
  },
];

export const Interests: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="interests"
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
            Beyond Work
          </span>
        </div>

        {/* Section Title */}
        <h2
          className={`type-heading text-foreground mb-8 max-w-2xl transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          When I'm not building systems, you'll find me doing these things.
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Music Production - Large featured card */}
          <div
            className={`lg:col-span-2 card-lift bg-foreground text-background border border-foreground p-5 md:p-7 transition-all duration-700 delay-150 hover:bg-foreground/90 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-background/10">
                {interests[0].icon}
              </div>
              <span className="type-tag opacity-60">
                Primary hobby
              </span>
            </div>
            <h3 className="type-title mb-2">{interests[0].title}</h3>
            <p className="type-tag opacity-70 mb-3">
              {interests[0].subtitle}
            </p>
            <p className="type-body-sm opacity-80">
              {interests[0].description}
            </p>
          </div>

          {/* Card 2: Music Writing */}
          <div
            className={`card-lift bg-surface border border-border p-5 md:p-6 transition-all duration-700 delay-200 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center interactive-accent-secondary mb-4">
              {interests[1].icon}
            </div>
            <h3 className="type-title text-foreground mb-1">
              {interests[1].title}
            </h3>
            <p className="type-tag text-muted mb-3">
              {interests[1].subtitle}
            </p>
            <p className="type-body-sm text-muted">
              {interests[1].description}
            </p>
          </div>

          {/* Card 3: Vibe Coding */}
          <div
            className={`card-lift interactive-accent-secondary p-5 md:p-6 transition-all duration-700 delay-250 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-foreground text-background mb-4">
              {interests[2].icon}
            </div>
            <h3 className="type-title text-foreground mb-1">
              {interests[2].title}
            </h3>
            <p className="type-tag text-muted mb-3">
              {interests[2].subtitle}
            </p>
            <p className="type-body-sm text-muted">
              {interests[2].description}
            </p>
          </div>

          {/* Card 4: Cinema */}
          <div
            className={`card-lift bg-surface border border-border p-5 md:p-6 transition-all duration-700 delay-300 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center interactive-accent-secondary mb-4">
              {interests[3].icon}
            </div>
            <h3 className="type-title text-foreground mb-1">
              {interests[3].title}
            </h3>
            <p className="type-tag text-muted mb-3">
              {interests[3].subtitle}
            </p>
            <p className="type-body-sm text-muted">
              {interests[3].description}
            </p>
          </div>

          {/* Card 5: Fitness */}
          <div
            className={`card-lift bg-surface border border-border p-5 md:p-6 transition-all duration-700 delay-350 hover:border-foreground ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 flex items-center justify-center interactive-accent-secondary">
                {interests[4].icon}
              </div>
              <span className="inline-flex items-center gap-1 type-tag font-semibold px-1.5 py-0.5 interactive-accent-primary">
                <span className="w-1 h-1 bg-accent-dark rounded-full animate-pulse"></span>
                Daily
              </span>
            </div>
            <h3 className="type-title text-foreground mb-1">
              {interests[4].title}
            </h3>
            <p className="type-tag text-muted mb-3">
              {interests[4].subtitle}
            </p>
            <p className="type-body-sm text-muted">
              {interests[4].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
