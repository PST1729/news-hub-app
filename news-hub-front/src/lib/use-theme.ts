import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("newshub_theme") !== "light";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("newshub_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("newshub_theme", "light");
    }
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark((p) => !p) };
}
