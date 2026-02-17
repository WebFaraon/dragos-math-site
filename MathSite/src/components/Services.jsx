import { useTranslation } from 'react-i18next'
import GuideCharacter from './GuideCharacter.jsx'

function Services() {
  const { t } = useTranslation()

  const programs = [
    {
      id: 'grade9-program',
      key: 'grade9',
      title: t('sections.programs.items.grade9.title'),
      forWho: t('sections.programs.items.grade9.forWho'),
      solves: t('sections.programs.items.grade9.solves'),
      outcome: t('sections.programs.items.grade9.outcome'),
      symbol: '\u03C0',
    },
    {
      id: 'grade12-program',
      key: 'grade12',
      title: t('sections.programs.items.grade12.title'),
      forWho: t('sections.programs.items.grade12.forWho'),
      solves: t('sections.programs.items.grade12.solves'),
      outcome: t('sections.programs.items.grade12.outcome'),
      symbol: '\u03A3',
    },
  ]

  return (
    <section id="programs" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">{t('sections.programs.eyebrow')}</p>
        <h2 className="section-title">{t('sections.programs.title')}</h2>
      </div>

      <GuideCharacter symbol={'x'} className="programs-guide" />

      <div className="services-grid">
        {programs.map((program) => (
          <article id={program.id} key={program.key} className="service-card">
            <span className="service-icon">{program.symbol}</span>
            <h3>{program.title}</h3>
            <p>
              <strong>{t('sections.programs.labels.forWho')}</strong> {program.forWho}
            </p>
            <p>
              <strong>{t('sections.programs.labels.solves')}</strong> {program.solves}
            </p>
            <p>
              <strong>{t('sections.programs.labels.outcome')}</strong> {program.outcome}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
