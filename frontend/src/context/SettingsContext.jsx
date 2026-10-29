import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations } from '../utils/i18n';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  // 1. Theme: 'dark' | 'light' | 'system'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('medkhoj_theme') || 'dark';
  });

  // System theme listener helper
  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setSystemIsDark(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const effectiveTheme = useMemo(() => {
    if (theme === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    return theme;
  }, [theme, systemIsDark]);

  // 2. Font Size: 'small' | 'medium' | 'large'
  const [fontSize, setFontSizeState] = useState(() => {
    return localStorage.getItem('medkhoj_font_size') || 'medium';
  });

  // 3. Language: 'en' | 'mr'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('medkhoj_language') || 'en';
  });

  // 4. Notifications
  const [notifications, setNotificationsState] = useState(() => {
    const saved = localStorage.getItem('medkhoj_notifications');
    return saved !== null ? saved === 'true' : true;
  });

  // 5. Accessibility: High Contrast & Reduced Motion
  const [highContrast, setHighContrastState] = useState(() => {
    return localStorage.getItem('medkhoj_high_contrast') === 'true';
  });

  const [reducedMotion, setReducedMotionState] = useState(() => {
    return localStorage.getItem('medkhoj_reduced_motion') === 'true';
  });

  // Synchronize DOM attributes whenever preferences change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', effectiveTheme);
    root.setAttribute('data-font-size', fontSize);
    root.setAttribute('data-high-contrast', highContrast ? 'true' : 'false');
    root.setAttribute('data-reduced-motion', reducedMotion ? 'true' : 'false');
  }, [effectiveTheme, fontSize, highContrast, reducedMotion]);

  // Setter wrappers with persistence
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('medkhoj_theme', newTheme);
  };

  const toggleTheme = () => {
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const setFontSize = (size) => {
    setFontSizeState(size);
    localStorage.setItem('medkhoj_font_size', size);
  };

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('medkhoj_language', lang);
  };

  const setNotifications = (enabled) => {
    setNotificationsState(enabled);
    localStorage.setItem('medkhoj_notifications', enabled ? 'true' : 'false');
  };

  const setHighContrast = (enabled) => {
    setHighContrastState(enabled);
    localStorage.setItem('medkhoj_high_contrast', enabled ? 'true' : 'false');
  };

  const setReducedMotion = (enabled) => {
    setReducedMotionState(enabled);
    localStorage.setItem('medkhoj_reduced_motion', enabled ? 'true' : 'false');
  };

  // Reset to Defaults
  const resetSettings = () => {
    setTheme('dark');
    setFontSize('medium');
    setLanguage('en');
    setNotifications(true);
    setHighContrast(false);
    setReducedMotion(false);
  };

  // Translation helper
  const t = (key) => {
    const dict = translations[language] || translations.en;
    return dict[key] !== undefined ? dict[key] : (translations.en[key] || key);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        effectiveTheme,
        setTheme,
        toggleTheme,
        fontSize,
        setFontSize,
        language,
        setLanguage,
        notifications,
        setNotifications,
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
        resetSettings,
        t
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
