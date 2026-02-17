import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ProgramCards() {
  const { t } = useTranslation()

  const programs = [
    {
      key: 'grade9',
      symbol: '\u03C0',
      to: '/programs/grade-9',
      title: t('sections.programs.cards.grade9.title'),
      subtitle: t('sections.programs.cards.grade9.subtitle'),
      bullets: [
        t('sections.programs.cards.grade9.bullets.item1'),
        t('sections.programs.cards.grade9.bullets.item2'),
        t('sections.programs.cards.grade9.bullets.item3'),
      ],
      badges: [
        t('sections.programs.cards.grade9.badges.duration'),
        t('sections.programs.cards.grade9.badges.format'),
        t('sections.programs.cards.grade9.badges.focus'),
      ],
      cta: t('sections.programs.cards.grade9.cta'),
    },
    {
      key: 'grade12',
      symbol: '\u03A3',
      to: '/programs/grade-12',
      title: t('sections.programs.cards.grade12.title'),
      subtitle: t('sections.programs.cards.grade12.subtitle'),
      bullets: [
        t('sections.programs.cards.grade12.bullets.item1'),
        t('sections.programs.cards.grade12.bullets.item2'),
        t('sections.programs.cards.grade12.bullets.item3'),
      ],
      badges: [
        t('sections.programs.cards.grade12.badges.duration'),
        t('sections.programs.cards.grade12.badges.format'),
        t('sections.programs.cards.grade12.badges.focus'),
      ],
      cta: t('sections.programs.cards.grade12.cta'),
    },
  ]

  return programs.map((program) => (
    <article id={`${program.key}-program`} key={program.key} className="service-card program-card">
      <span className="service-icon">{program.symbol}</span>
      <h3>{program.title}</h3>
      <p className="program-subtitle">{program.subtitle}</p>

      <ul className="program-bullets">
        {program.bullets.map((bullet, index) => (
          <li key={`${program.key}-bullet-${index}`}>{bullet}</li>
        ))}
      </ul>

      <div className="program-badges">
        {program.badges.map((badge, index) => (
          <span key={`${program.key}-badge-${index}`} className="program-badge">
            {badge}
          </span>
        ))}
      </div>

      <Link className="btn btn-primary program-cta" to={program.to}>
        <span>{program.cta}</span>
        <span className="program-cta-arrow" aria-hidden="true">
          {'\u2192'}
        </span>
      </Link>
    </article>
  ))
}

export default ProgramCards
