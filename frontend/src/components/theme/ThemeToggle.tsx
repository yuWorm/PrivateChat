import React from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Zap, Terminal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import type { Theme } from "@/styles/themes";
import { useTranslation } from "react-i18next";

const themeIcons = {
  light: <Monitor className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  cyberpunk: <Zap className="h-5 w-5" />,
  matrix: <Terminal className="h-5 w-5" />,
};

export const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const themeNames = {
    light: t("theme.light"),
    dark: t("theme.dark"),
    cyberpunk: t("theme.cyberpunk"),
    matrix: t("theme.matrix"),
  };

  const CurrentIcon = themeIcons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {CurrentIcon}
          <span className="sr-only">{t("theme.toggleTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(themeNames) as Theme[]).map((themeKey: Theme) => (
          <DropdownMenuItem
            key={themeKey}
            onClick={() => setTheme(themeKey)}
            className={`flex items-center gap-2 ${theme === themeKey ? "bg-accent" : ""}`}
          >
            {themeIcons[themeKey]}
            <span>{themeNames[themeKey]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
