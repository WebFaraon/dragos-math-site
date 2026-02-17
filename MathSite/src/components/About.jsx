import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation()
  const mentorName = t('brand.mentorName')

  return (
    <section id="about" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">{t('sections.about.eyebrow', { mentorName })}</p>
        <h2 className="section-title">{t('sections.about.title')}</h2>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p>{t('sections.about.paragraph1', { mentorName })}</p>
          <p>{t('sections.about.paragraph2')}</p>
        </div>

        <aside className="about-panel">
          <h3>{t('sections.about.panelTitle')}</h3>
          <ul>
            <li>{t('sections.about.principles.item1')}</li>
            <li>{t('sections.about.principles.item2')}</li>
            <li>{t('sections.about.principles.item3')}</li>
          </ul>
          <p className="about-panel-meta">{t('sections.about.meta')}</p>
        </aside>
      </div>
    </section>
  )
}

export default About
