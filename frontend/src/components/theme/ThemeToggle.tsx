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

const themeIcons = {
  light: <Monitor className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  cyberpunk: <Zap className="h-5 w-5" />,
  matrix: <Terminal className="h-5 w-5" />,
};

const themeNames = {
  light: "亮色",
  dark: "暗色",
  cyberpunk: "赛博朋克",
  matrix: "矩阵",
};

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const CurrentIcon = themeIcons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {CurrentIcon}
          <span className="sr-only">切换主题</span>
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
