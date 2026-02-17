import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import GuideCharacter from './GuideCharacter.jsx'

const heroSymbols = ['f(x)', '\u03A3', '\u03C0']

function Hero() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className={`hero section ${isVisible ? 'hero-visible' : ''}`}>
      <div className="hero-math-shapes" aria-hidden="true">
        <span className="shape shape-a">{heroSymbols[0]}</span>
        <span className="shape shape-b">{heroSymbols[1]}</span>
        <span className="shape shape-c">{heroSymbols[2]}</span>
      </div>

      <GuideCharacter symbol={heroSymbols[1]} className="hero-guide" />

      <div className="hero-content">
        <p className="eyebrow">{t('hero.eyebrow')}</p>
        <h1>{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            {t('hero.ctaPrimary')}
          </a>
          <a className="btn btn-secondary" href="#programs">
            {t('hero.ctaSecondary')}
          </a>
        </div>

        <p className="hero-proof">{t('hero.proof')}</p>
      </div>
    </section>
  )
}

export default Hero
