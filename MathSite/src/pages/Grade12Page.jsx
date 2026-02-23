import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import useRevealOnScroll from '../components/useRevealOnScroll.js'

function Grade12Page() {
  const { t } = useTranslation()
  useRevealOnScroll()

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main grade12-page-main">
        <div className="section-heading reveal">
          <h1 className="section-title">{t('pages.grade12.title')}</h1>
          <p className="hero-subtitle">{t('pages.grade12.intro')}</p>
        </div>

        <p className="page-back-link reveal">
          <Link className="btn btn-secondary" to="/programs">
            {t('pages.grade12.backPrograms')}
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Grade12Page
