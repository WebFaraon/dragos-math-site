import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import useRevealOnScroll from '../components/useRevealOnScroll.js'

function PlaceholderPage({ eyebrow, title, copy }) {
  const { t } = useTranslation()
  useRevealOnScroll()

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main placeholder-main">
        <div className="section-heading reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="section-title">{title}</h1>
          <p className="hero-subtitle">{copy}</p>
        </div>

        <p className="page-back-link reveal">
          <Link className="btn btn-secondary" to="/">
            {t('common.backHome')}
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default PlaceholderPage
