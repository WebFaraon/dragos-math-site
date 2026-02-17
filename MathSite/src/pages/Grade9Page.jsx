import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Grade9Page() {
  const { t } = useTranslation()

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main">
        <div className="section-heading">
          <h1 className="section-title">{t('pages.grade9.title')}</h1>
          <p className="hero-subtitle">{t('pages.grade9.intro')}</p>
        </div>

        <p>
          <Link className="btn btn-secondary" to="/programs">
            {t('pages.grade9.backPrograms')}
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Grade9Page
