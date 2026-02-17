import { useTheme } from '../theme/ThemeContext.jsx'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
    >
      <span className="theme-toggle-icon-wrap" aria-hidden="true">
        <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="4.1" />
          <path d="M12 1.8v3.1M12 19.1v3.1M4.55 4.55l2.2 2.2M17.25 17.25l2.2 2.2M1.8 12h3.1M19.1 12h3.1M4.55 19.45l2.2-2.2M17.25 6.75l2.2-2.2" />
        </svg>
        <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" focusable="false">
          <path d="M20.4 14.9A8.95 8.95 0 0 1 9.1 3.6a9.2 9.2 0 1 0 11.3 11.3Z" />
        </svg>
      </span>
    </button>
  )
}

export default ThemeToggle
