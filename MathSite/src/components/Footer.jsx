import { BRAND_NAME, LOGO_SYMBOL } from '../brand.js'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#home">
          <span className="logo-mark">{LOGO_SYMBOL}</span>
          <span className="logo-text">{BRAND_NAME}</span>
        </a>

        <div className="social-links" aria-label="Social media links">
          <a href="#" aria-label="Facebook">
            Fb
          </a>
          <a href="#" aria-label="Instagram">
            Ig
          </a>
          <a href="#" aria-label="LinkedIn">
            In
          </a>
        </div>

        <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
