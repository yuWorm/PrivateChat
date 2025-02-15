// theme-context.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { type Theme, themes } from "@/styles/themes";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 辅助函数：将 HSL 字符串转换为 CSS 变量值
const extractHSLValues = (hslString: string): string => {
  const match = hslString.match(
    /hsl\((\d+\.?\d*),?\s*(\d+\.?\d*)%?,?\s*(\d+\.?\d*)%?\)/,
  );
  if (match) {
    return `${match[1]} ${match[2]}% ${match[3]}%`;
  }
  // 处理 hsla 的情况
  const matchHsla = hslString.match(
    /hsla\((\d+\.?\d*),?\s*(\d+\.?\d*)%?,?\s*(\d+\.?\d*)%?,?\s*(\d+\.?\d*)\)/,
  );
  if (matchHsla) {
    return `${matchHsla[1]} ${matchHsla[2]}% ${matchHsla[3]}% / ${matchHsla[4]}`;
  }
  return hslString;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // 移除所有主题类名并添加当前主题
    root.classList.remove(...Object.keys(themes));
    root.classList.add(theme);

    // 保存主题选择
    localStorage.setItem("theme", theme);

    // 设置主题颜色变量
    const currentTheme = themes[theme];
    Object.entries(currentTheme).forEach(([key, value]) => {
      // 处理 card-foreground 特殊情况
      const cssKey =
        key === "card-foreground" ? "--card-foreground" : `--${key}`;
      const cssValue = extractHSLValues(value);
      root.style.setProperty(cssKey, cssValue);
    });

    // 设置额外的前景色变量
    const isLight = theme === "light";
    root.style.setProperty(
      "--primary-foreground",
      isLight ? "0 0% 0%" : "0 0% 100%",
    );
    root.style.setProperty(
      "--secondary-foreground",
      isLight ? "0 0% 0%" : "0 0% 100%",
    );
    root.style.setProperty(
      "--muted-foreground",
      theme === "matrix"
        ? "135 100% 40%"
        : theme === "light"
          ? "215.4 16.3% 46.9%"
          : "180 100% 80%",
    );
    root.style.setProperty(
      "--accent-foreground",
      isLight ? "0 0% 0%" : "0 0% 100%",
    );
    root.style.setProperty(
      "--border",
      `${extractHSLValues(currentTheme.primary)} / 0.2`,
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
