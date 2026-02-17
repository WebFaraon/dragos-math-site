import { useTranslation } from 'react-i18next'

function ForParents() {
  const { t } = useTranslation()

  return (
    <section id="parents" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">{t('sections.parents.eyebrow')}</p>
        <h2 className="section-title">{t('sections.parents.title')}</h2>
      </div>

      <div className="parents-grid">
        <article>
          <h3>{t('sections.parents.items.structuredPlan.title')}</h3>
          <p>{t('sections.parents.items.structuredPlan.text')}</p>
        </article>
        <article>
          <h3>{t('sections.parents.items.weeklyFeedback.title')}</h3>
          <p>{t('sections.parents.items.weeklyFeedback.text')}</p>
        </article>
        <article>
          <h3>{t('sections.parents.items.measurableProgress.title')}</h3>
          <p>{t('sections.parents.items.measurableProgress.text')}</p>
        </article>
        <article>
          <h3>{t('sections.parents.items.calmStyle.title')}</h3>
          <p>{t('sections.parents.items.calmStyle.text')}</p>
        </article>
      </div>
    </section>
  )
}

export default ForParents
