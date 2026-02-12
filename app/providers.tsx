'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useLocation } from "react-router"

function usePrevious<T>(value: T) {
  let ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

type Theme = 'light' | 'dark' | 'system'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}>({
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'light',
})

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light'
    setResolvedTheme(initialTheme)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (theme: Theme) => {
      let resolved: 'light' | 'dark' = 'light'
      if (theme === 'system') {
        resolved = media.matches ? 'dark' : 'light'
      } else {
        resolved = theme
      }

      root.classList.remove('light', 'dark')
      root.classList.add(resolved)
      setResolvedTheme(resolved)
      localStorage.setItem('theme', theme)
    }

    applyTheme(theme)

    const handleMediaChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    media.addEventListener('change', handleMediaChange)
    return () => media.removeEventListener('change', handleMediaChange)
  }, [theme])

  const contextValue = useMemo(
    () => ({ theme, setTheme: setThemeState, resolvedTheme }),
    [theme, resolvedTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  let location = useLocation()
  let previousPathname = usePrevious(location.pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export { useTheme }
