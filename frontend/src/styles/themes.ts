// themes.ts
export type Theme = "light" | "dark" | "cyberpunk" | "matrix";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  card: string;
  "card-foreground": string;
}

export const themes: Record<Theme, ThemeColors> = {
  light: {
    primary: "hsl(262.1 83.3% 57.8%)",
    secondary: "hsl(220, 100%, 50%)",
    background: "hsl(0 0% 100%)",
    foreground: "hsl(224 71% 4%)",
    accent: "hsl(170, 100%, 50%)",
    muted: "hsl(220 14.3% 95.9%)",
    card: "hsl(0 0% 100%)",
    "card-foreground": "hsl(224 71% 4%)",
  },
  dark: {
    primary: "hsl(262.1 83.3% 57.8%)",
    secondary: "hsl(220, 100%, 50%)",
    background: "hsl(224, 71%, 4%)",
    foreground: "hsl(213, 31%, 91%)",
    accent: "hsl(170, 100%, 50%)",
    muted: "hsl(223, 47%, 11%)",
    card: "hsl(224, 71%, 4%)",
    "card-foreground": "hsl(213, 31%, 91%)",
  },
  cyberpunk: {
    primary: "hsl(326, 100%, 50%)",
    secondary: "hsl(180, 100%, 50%)",
    background: "hsl(246, 45%, 5%)",
    foreground: "hsl(180, 100%, 90%)",
    accent: "hsl(56, 100%, 50%)",
    muted: "hsl(246, 45%, 10%)",
    card: "hsla(246, 45%, 8%, 0.8)",
    "card-foreground": "hsl(180, 100%, 90%)",
  },
  matrix: {
    primary: "hsl(135, 100%, 50%)",
    secondary: "hsl(135, 80%, 40%)",
    background: "hsl(0, 0%, 0%)",
    foreground: "hsl(135, 100%, 50%)",
    accent: "hsl(135, 100%, 70%)",
    muted: "hsl(0, 0%, 10%)",
    card: "hsla(0, 0%, 5%, 0.9)",
    "card-foreground": "hsl(135, 100%, 50%)",
  },
};
