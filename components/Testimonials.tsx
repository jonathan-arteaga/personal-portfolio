import React from 'react';

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
  return (
    <section className="w-full py-16 border-t-2 border-b-2 border-foreground bg-surface-alt overflow-hidden">
      {/* Section Label */}
      <div className="px-6 md:px-12 mb-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-2 h-2 bg-foreground"></div>
          <span className="font-mono text-fluid-xs uppercase tracking-widest text-muted font-semibold">
            Peer Protocols
          </span>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-alt to-transparent z-10 pointer-events-none"></div>

        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-alt to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-marquee">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 py-4 max-w-md"
            >
              {/* Quote Block */}
              <div className="space-y-4">
                <p className="font-serif text-fluid-base text-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="font-mono text-fluid-xs font-medium text-muted uppercase tracking-wider">
                  — {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};
