import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Hands-down the most impressive Senior Solutions Engineer I've encountered. He translates complex solutions into clear business value.",
    author: 'Allison Bell',
  },
  {
    quote: 'He has a gift for clearly communicating technical concepts. He combines deep technical knowledge with excellent interpersonal abilities.',
    author: 'Tim Bielski',
  },
  {
    quote: 'Showcased his innate technical acumen and swift grasp of complex solution architectures with an authentic and trusted communication approach.',
    author: 'Glen Cunningham',
  },
  {
    quote: 'One of the brightest and most dynamic Solution Engineers... He always connects with clients at a deep level.',
    author: 'Will Minck',
  },
  {
    quote: "Consistently demonstrates a remarkable ability to articulate and deliver innovative solutions to clients' most challenging technical needs.",
    author: 'Eliana K. Hriczo',
  },
];

const ROTATE_INTERVAL = 5000;

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

  return (
    <section className="w-full border-t border-b border-border surface-tier-2 section-shell overflow-hidden">
      {/* Section Label */}
      <div className="mb-8">
        <div className="content-shell-wide flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-foreground"></div>
            <span className="type-label text-muted">
              Peer Protocols
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-pressed={isPlaying}
            className="focus-ring type-label text-muted hover:text-foreground transition-colors px-2 py-1 border border-border hover:border-foreground"
          >
            {isPlaying ? 'Pause quotes' : 'Play quotes'}
          </button>
        </div>
      </div>

      {/* Quote Display */}
      <div className="content-shell-wide">
        <div className="testimonial-stage">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-slide${index === activeIndex ? ' is-active' : ''}`}
              aria-hidden={index !== activeIndex}
            >
              <blockquote className="space-y-4">
                <p className="testimonial-quote">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="type-label text-muted">
                  {testimonial.author}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6" role="tablist">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Quote ${index + 1}`}
              onClick={() => { setActiveIndex(index); setIsPlaying(false); }}
              className={`testimonial-dot${index === activeIndex ? ' is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
