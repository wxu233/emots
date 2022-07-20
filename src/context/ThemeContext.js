import React, { useContext, useState, useEffect } from 'react'

export const themes = {
    dark : {
        id : "D_001",
        name : "Dark",
        colors : {
            background : "#1e1e1e",
            foreground : "#d4d4d4",
            inactiveCardBackground : "#3a3d41",
            selectionHighlightBackground : "#add6ff26",
            selectionBorder : "#d4d4d4",
            menuBackground : "#303031",
            menuForeground : "#cccccc",
            text : "#569cd6",
            info : "#6796e6",
            warn : "#cd9731",
            error : "#f44747",
            debug : "#b267e6",
            link : "#4e94ce",
        }
    },
    light : {
        id : "L_001",
        name : "Light",
        colors : {
            background : "#ffffff",
            foreground : "#000000",
            inactiveBackground : "#ffffff",
            selectionHighlightBackground : "#eeeeee",
            selectionBorder : "#fed442",
            menuBackground : "#ffffff",
            menuForeground : "#000000",
            text : "#000000",
            info : "#316BCD",
            warn : "#cd9731",
            error : "#CD3131",
            debug : "#800080",
            link : "#4e94ce",
        },
    },
}

export const ThemeContext = React.createContext(
    themes.dark
)

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider(props, { children }){
    const [ currentTheme, setTheme ] = useState( themes.dark )

    const value = {
        currentTheme,
        setTheme
    }

    return (
        <ThemeContext.Provider value={props.value.currentTheme}>{children}</ThemeContext.Provider>
    )
}


