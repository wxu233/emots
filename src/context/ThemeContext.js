import React, { useContext, useState } from 'react'

export const themes = {
    dark : {
        id : "D_001",
        name : "Dark",
        colors : {
            background : "#1f2933", // "#1e1e1e",
            foreground : "#e4e7eb",
            menuBackground : "#323f4b",
            menuForeground : "#e4e7eb",
            menuHoverBackground : "#3e4c59",
            menuSelectedBackground : "#52606d",
            cardBackground : "#323f4b",
            cardSelectedBackground : "#ffffa8",
            cardSelectedBorder : "#fff176",
            buttonBackground : "#fff176",
        }
    },
    light : {
        id : "L_001",
        name : "Light",
        colors : {
            background : "#fafafa",
            foreground : "#000000",
            menuBackground : "#c7c7c7",
            menuForeground : "#000000",
            menuHoverBackground : "#ffffff",
            menuSelectedBackground : "#fafafa",
            cardBackground : "#ffffff",
            cardSelectedBackground : "#e3f2fd",
            cardSelectedBorder : "#b1bfca",
            buttonBackground : "#b1bfca",
        },
    },
}

export const ThemeContext = React.createContext(
    themes.dark
)

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }){
    const [ currentTheme, setTheme ] = useState( themes.dark )

    const value = {
        currentTheme,
        setTheme
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}


