import React, { createContext, useState } from 'react';

export const themes = {
    dark: {
        backgroundColor: '#9DB4C0',
    },
    light: {
        backgroundColor: 'white',
    }
}

export const ThemeContext = createContext(themes.light);

const ThemeContextProvider = (props) => {
    
    const [ theme, setTheme ] = useState(themes.light);

    const toggleTheme = () => {
        theme === themes.light ? 
        setTheme(themes.dark):
        setTheme(themes.light)
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider