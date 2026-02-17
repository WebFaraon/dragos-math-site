import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Services() {
  const { t } = useTranslation()

  return (
    <section id="programs" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">{t('sections.programs.eyebrow')}</p>
        <h2 className="section-title">{t('sections.programs.title')}</h2>
      </div>

      <div className="services-grid programs-overview-grid">
        <article className="service-card program-card program-overview-card">
          <p className="program-overview-intro">{t('sections.programs.overview.subtitle')}</p>

          <div className="program-overview-tracks">
            <div className="program-track">
              <h3>{t('sections.programs.overview.grade9.title')}</h3>
              <ul className="program-bullets">
                <li>{t('sections.programs.overview.grade9.item1')}</li>
                <li>{t('sections.programs.overview.grade9.item2')}</li>
                <li>{t('sections.programs.overview.grade9.item3')}</li>
              </ul>
            </div>

            <div className="program-track">
              <h3>{t('sections.programs.overview.grade12.title')}</h3>
              <ul className="program-bullets">
                <li>{t('sections.programs.overview.grade12.item1')}</li>
                <li>{t('sections.programs.overview.grade12.item2')}</li>
                <li>{t('sections.programs.overview.grade12.item3')}</li>
              </ul>
            </div>
          </div>

          <div className="program-badges">
            <span className="program-badge">{t('sections.programs.overview.badges.format')}</span>
            <span className="program-badge">{t('sections.programs.overview.badges.structure')}</span>
            <span className="program-badge">{t('sections.programs.overview.badges.focus')}</span>
          </div>

          <Link className="btn btn-primary program-cta program-overview-cta" to="/programs">
            <span>{t('sections.programs.overview.cta')}</span>
            <span className="program-cta-arrow" aria-hidden="true">
              {'\u2192'}
            </span>
          </Link>
        </article>
      </div>
    </section>
  )
}

export default Services
