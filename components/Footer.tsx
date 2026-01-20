import React from 'react';
import { Mail, ArrowUp, Calendar } from 'lucide-react';
import { scrollToTop } from '../utils';
import { useTheme } from '../contexts/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const Footer: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();
  const { theme } = useTheme();

  // Google Calendar Appointment Schedules URL
  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0YfSVXinJThk7foobUoK8vyiqEtYG7MM3lQvNxLrXs8wStSYMKrW-IEkZ27lrjOUtaLkhhWR5d?gv=true';

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="w-full border-t border-border bg-surface-alt"
    >
      {/* Main Contact Section - Split Layout */}
      <div className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`flex items-center gap-3 mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="w-2 h-2 bg-foreground"></div>
            <span className="font-mono text-fluid-xs font-semibold uppercase tracking-widest text-muted">
              Contact
            </span>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <h2 className="font-serif text-fluid-3xl md:text-fluid-4xl font-normal text-foreground mb-6 leading-tight">
                Got a problem?<br />Let's solve it.
              </h2>

              <p className="text-fluid-base text-muted mb-8 max-w-md">
                I'm always up for a good challenge. Whether you have a project idea, need technical guidance, or just want to chat about systems architecture — let's connect.
              </p>

              {/* Contact Options */}
              <div className="space-y-4 mb-8">
                {/* Email */}
                <a
                  href="mailto:jonarteaga6@gmail.com"
                  className="group flex items-center gap-4 p-4 border border-border hover:border-foreground hover:bg-accent/30 transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-foreground text-background">
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-fluid-xs uppercase tracking-widest text-muted mb-1">
                      Email
                    </p>
                    <p className="text-fluid-base font-medium text-foreground group-hover:text-foreground">
                      jonarteaga6@gmail.com
                    </p>
                  </div>
                </a>

                {/* Schedule a Call */}
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border border-border hover:border-foreground hover:bg-accent/30 transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent text-foreground">
                    <Calendar size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-fluid-xs uppercase tracking-widest text-muted mb-1">
                      Schedule
                    </p>
                    <p className="text-fluid-base font-medium text-foreground group-hover:text-foreground">
                      Book a 30-minute call
                    </p>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-fluid-xs uppercase tracking-widest text-muted">
                  Connect
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jonathan-arteaga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-bounce btn-press w-10 h-10 flex items-center justify-center border border-border hover:border-foreground hover:bg-accent glow-hover transition-all"
                    aria-label="LinkedIn"
                  >
                    <img
                      src={theme === 'dark' ? '/images/InBug-White.png' : '/images/LI-In-Bug.png'}
                      alt="LinkedIn"
                      className="w-4 h-4 object-contain"
                    />
                  </a>
                  <a
                    href="https://github.com/jonathanarteaga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-bounce btn-press w-10 h-10 flex items-center justify-center border border-border hover:border-foreground hover:bg-accent glow-hover transition-all"
                    aria-label="GitHub"
                  >
                    <img
                      src={theme === 'dark' ? '/images/GitHub_Invertocat_White.svg' : '/images/GitHub_Invertocat_Black.svg'}
                      alt="GitHub"
                      className="w-4 h-4 object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Calendar Embed */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <div className="h-full min-h-[600px] border border-border bg-background overflow-hidden">
                <iframe
                  src={calendarUrl}
                  title="Schedule a meeting with Jonathan"
                  className="w-full h-full min-h-[600px]"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="border-t border-border px-6 md:px-12 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-fluid-xs text-muted">
            © {new Date().getFullYear()} Jonathan Arteaga
          </span>

          <button
            onClick={(e) => scrollToTop(e)}
            className="group font-mono text-fluid-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors flex items-center gap-2"
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
