import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="focus-ring icon-bounce btn-press w-11 h-11 flex items-center justify-center border border-border hover:border-foreground hover:bg-[var(--interactive-primary-soft)] transition-all"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} strokeWidth={1.5} className="text-foreground" />
      ) : (
        <Sun size={20} strokeWidth={1.5} className="text-foreground" />
      )}
    </button>
  );
};
