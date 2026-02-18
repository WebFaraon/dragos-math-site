import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import LanguageDropdown from './LanguageDropdown.jsx'
import ThemeToggle from './ThemeToggle.jsx'

function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = [
    { id: 'home', label: t('nav.home'), to: '/', end: true },
    { id: 'programs', label: t('nav.programs'), to: '/programs' },
    { id: 'resources', label: t('nav.resources', { defaultValue: 'Resources' }), to: '/resources' },
    { id: 'results', label: t('nav.results'), to: '/results' },
    {
      id: 'testimonials',
      label: t('nav.testimonials', { defaultValue: 'Testimonials' }),
      to: '/testimonials',
    },
    { id: 'contact', label: t('nav.contact'), to: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    const onResize = () => {
      if (window.innerWidth > 1080) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link className="nav-logo" to="/" onClick={closeMenu}>
          <img className="nav-logo-image" src="/Logo/math-logo.png" alt="Mathorizon logo" />
          <span className="nav-logo-text">Mathorizon</span>
        </Link>

        <div className="nav-actions">
          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-right-controls">
            <ThemeToggle />
            <LanguageDropdown />
          </div>

          <button
            className={`hamburger ${isMenuOpen ? 'open' : ''}`}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={t('nav.toggleMenuAria')}
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
