import { createContext, ReactNode, useContext, useState } from "react";
import { Theme, ThemeName, themes } from "@/types/theme";

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('default');

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
