import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="icon-bounce btn-press w-10 h-10 flex items-center justify-center border border-border hover:border-foreground hover:bg-accent transition-all"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={18} strokeWidth={1.5} className="text-foreground" />
      ) : (
        <Sun size={18} strokeWidth={1.5} className="text-foreground" />
      )}
    </button>
  );
};
