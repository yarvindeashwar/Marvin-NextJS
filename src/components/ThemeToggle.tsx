"use client";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, SunMoon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative">
      <button
        className={`
          relative overflow-hidden p-2 rounded-full transition-all duration-300 ease-spring
          ${isDark 
            ? "bg-gray-800 text-blue-400 hover:bg-gray-700" 
            : "bg-blue-50 text-amber-500 hover:bg-blue-100"}
          shadow-sm hover:shadow-md transform hover:scale-105
        `}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle dark mode"
      >
        <div className="relative z-10 flex items-center justify-center w-5 h-5">
          {isDark ? (
            <Sun className="w-5 h-5 animate-in fade-in duration-300" />
          ) : (
            <Moon className="w-5 h-5 animate-in fade-in duration-300" />
          )}
        </div>
        
        {/* Background glow effect */}
        <div 
          className={`
            absolute inset-0 rounded-full opacity-20 blur-sm transition-transform duration-500
            ${isDark 
              ? "bg-gradient-to-br from-blue-400 to-indigo-500 scale-125" 
              : "bg-gradient-to-br from-amber-300 to-orange-400 scale-125"}
          `}
        />
      </button>
      
      {/* Status indicator */}
      <div className="absolute -top-1 -right-1">
        <div 
          className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${isDark ? "bg-blue-400" : "bg-amber-400"}
            animate-pulse
          `}
        />
      </div>
    </div>
  );
}
