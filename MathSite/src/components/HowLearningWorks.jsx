import { useTranslation } from 'react-i18next'
import GuideCharacter from './GuideCharacter.jsx'

function HowLearningWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      key: 'step1',
      title: t('sections.method.steps.step1.title'),
      text: t('sections.method.steps.step1.text'),
    },
    {
      key: 'step2',
      title: t('sections.method.steps.step2.title'),
      text: t('sections.method.steps.step2.text'),
    },
    {
      key: 'step3',
      title: t('sections.method.steps.step3.title'),
      text: t('sections.method.steps.step3.text'),
    },
  ]

  return (
    <section id="method" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">{t('sections.method.eyebrow')}</p>
        <h2 className="section-title">{t('sections.method.title')}</h2>
      </div>

      <div className="method-layout">
        <GuideCharacter symbol={'f(x)'} className="method-guide" />

        <div className="method-steps">
          {steps.map((step, index) => (
            <article key={step.key} className="method-step">
              <span className="step-index">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowLearningWorks
