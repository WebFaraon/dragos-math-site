import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_STORAGE_KEY = 'theme'
const THEME_LIGHT = 'light'
const THEME_DARK = 'dark'

const ThemeContext = createContext(null)

const getSystemTheme = () => {
  if (typeof window === 'undefined') return THEME_LIGHT
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT
}

const getStoredTheme = () => {
  if (typeof window === 'undefined') return null
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  return savedTheme === THEME_DARK || savedTheme === THEME_LIGHT ? savedTheme : null
}

const applyThemeToDocument = (theme) => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

function ThemeProvider({ children }) {
  const [storedThemeAtLoad] = useState(() => getStoredTheme())
  const [theme, setTheme] = useState(() => {
    const initialTheme = storedThemeAtLoad || getSystemTheme()
    applyThemeToDocument(initialTheme)
    return initialTheme
  })

  useEffect(() => {
    applyThemeToDocument(theme)
  }, [theme])

  useEffect(() => {
    if (storedThemeAtLoad) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const onThemeChange = (event) => {
      setTheme(event.matches ? THEME_DARK : THEME_LIGHT)
    }

    mediaQuery.addEventListener('change', onThemeChange)
    return () => mediaQuery.removeEventListener('change', onThemeChange)
  }, [storedThemeAtLoad])

  const setThemePreference = (nextTheme) => {
    setTheme(nextTheme)
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  }

  const toggleTheme = () => {
    const nextTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK
    setThemePreference(nextTheme)
  }

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === THEME_DARK,
      setTheme: setThemePreference,
      toggleTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
