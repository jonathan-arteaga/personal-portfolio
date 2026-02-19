import React, { useState } from 'react';

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

// Double the testimonials for seamless infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials];

export const Testimonials: React.FC = () => {
  const [isTestimonialsPlaying, setIsTestimonialsPlaying] = useState(true);

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
            onClick={() => { setIsTestimonialsPlaying((prev) => !prev); }}
            aria-pressed={isTestimonialsPlaying}
            className="focus-ring type-label text-muted hover:text-foreground transition-colors px-2 py-1 border border-border hover:border-foreground"
          >
            {isTestimonialsPlaying ? 'Pause quotes' : 'Play quotes'}
          </button>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-alt to-transparent z-10 pointer-events-none"></div>

        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-alt to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div
          className={`testimonials-marquee-track${
            isTestimonialsPlaying ? ' is-playing' : ''
          }`}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-6 py-5 max-w-xl"
            >
              {/* Quote Block */}
              <div className="space-y-4">
                <p className="type-body text-foreground">
                  "{testimonial.quote}"
                </p>
                <p className="type-tag text-muted">
                  — {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
