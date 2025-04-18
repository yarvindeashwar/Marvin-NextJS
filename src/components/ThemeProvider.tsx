"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

// Create the theme context with proper typing
export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ 
  theme: "light", // Default to light theme
  setTheme: () => {} 
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
    // Check localStorage for theme
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      setTheme(saved as Theme);
    } else {
      // Check system preference if no saved preference
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemPreference);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
      localStorage.setItem("theme", theme);
    } else {
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
      localStorage.setItem("theme", theme);
    }

    // Force a re-render of the entire page to ensure all Tailwind classes are applied
    document.body.style.display = 'none';
    setTimeout(() => {
      document.body.style.display = '';
    }, 0);
  }, [theme, mounted]);

  // Prevent flash of unstyled content
  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
