import React, { useContext, useState } from "react";

export const themes = {
  dark: {
    id: "D_001",
    name: "dark",
    colors: {
      background: "#1f2933", // "#1e1e1e",
      foreground: "#e4e7eb",
      menuBackground: "#323f4b",
      menuForeground: "#e4e7eb",
      menuHoverBackground: "#3e4c59",
      menuSelectedBackground: "#52606d",
      cardBackground: "#323f4b",
      cardSelectedBackground: "#697886",
      // "#ffffa8",
      cardBorder: "#323f4b",
      cardSelectedBorder: "#fff176",
      buttonBackground: "#fff176",
      starLiked: "gold",
      starNormal: "white",
    },
  },
  light: {
    id: "L_001",
    name: "light",
    colors: {
      background: "#fafafa",
      foreground: "#000000",
      menuBackground: "#c7c7c7",
      menuForeground: "#000000",
      menuHoverBackground: "#ffffff",
      menuSelectedBackground: "#fafafa",
      cardBackground: "#ffffff",
      cardSelectedBackground: "#e3f2fd",
      cardBorder: "000000",
      cardSelectedBorder: "#b1bfca",
      buttonBackground: "#b1bfca",
      starLiked: "gold",
      starNormal: "black",
    },
  },
};

export const ThemeContext = React.createContext(themes.dark);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [currentTheme, setTheme] = useState(themes.dark);

  const changeTheme = (val) => {
    console.log("changing theme to " + val);
    switch (val) {
      case "light":
        setTheme(themes.light);
        return;
      case "dark":
        setTheme(themes.dark);
        return;
      default:
        return;
    }
  };

  const value = {
    currentTheme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
