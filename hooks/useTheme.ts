import { useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const setTheme = useCallback((theme: Theme) => {
    if (typeof window === 'undefined') return;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setAppTheme = () => {
      const darkMode = localStorage.getItem('theme') === 'dark';
      const lightMode = localStorage.getItem('theme') === 'light';

      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else if (lightMode) {
        document.documentElement.classList.remove('dark');
      }
    };

    setAppTheme();

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    // Modern browsers
    if (darkQuery.addEventListener) {
      darkQuery.addEventListener('change', handleChange);
      return () => darkQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      darkQuery.onchange = handleChange;
      return () => {
        darkQuery.onchange = null;
      };
    }
  }, [setTheme]);

  return { setTheme };
};
