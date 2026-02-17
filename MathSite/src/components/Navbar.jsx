import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageDropdown from './LanguageDropdown.jsx'

function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'programs', label: t('nav.programs') },
    { id: 'parents', label: t('nav.parents') },
    { id: 'method', label: t('nav.method') },
    { id: 'testimonials', label: t('nav.results') },
    { id: 'contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    const onResize = () => {
      if (window.innerWidth > 930) {
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
        <a className="nav-logo" href="#home" onClick={closeMenu}>
          <img className="nav-logo-image" src="/Logo/math-logo.png" alt="Mathorizon logo" />
          <span className="nav-logo-text">Mathorizon</span>
        </a>

        <div className="nav-actions">
          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="nav-link" onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>

          <LanguageDropdown />

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
