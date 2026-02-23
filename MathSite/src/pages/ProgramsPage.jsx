import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ProgramCards from '../components/ProgramCards.jsx'
import useRevealOnScroll from '../components/useRevealOnScroll.js'

function ProgramsPage() {
  const { t } = useTranslation()
  useRevealOnScroll()

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main programs-page-main">
        <div className="section-heading reveal">
          <p className="eyebrow">{t('sections.programs.eyebrow')}</p>
          <h1 className="section-title">{t('pages.programs.title')}</h1>
          <p className="hero-subtitle">{t('pages.programs.subtitle')}</p>
        </div>

        <div className="services-grid reveal">
          <ProgramCards />
        </div>

        <p className="page-back-link reveal">
          <Link className="btn btn-secondary" to="/">
            {t('pages.programs.backHome')}
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default ProgramsPage
