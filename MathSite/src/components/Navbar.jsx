import { useEffect, useState } from 'react'
import { BRAND_NAME, LOGO_SYMBOL } from '../brand.js'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'programs', label: 'Programs' },
  { id: 'parents', label: 'For Parents' },
  { id: 'method', label: 'How It Works' },
  { id: 'testimonials', label: 'Results' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
          <span className="logo-mark">{LOGO_SYMBOL}</span>
          <span className="logo-text">{BRAND_NAME}</span>
        </a>

        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar

