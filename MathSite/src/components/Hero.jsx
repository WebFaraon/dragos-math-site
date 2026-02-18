import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import GuideCharacter from './GuideCharacter.jsx'

const heroSymbols = ['f(x)', '\u03A3', '\u03C0']

function Hero() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const subtitle = t('hero.subtitleShort', {
    defaultValue:
      'Personalized mentoring for Grade 9 foundations and Grade 12 exam prep with clear weekly progress.',
  })

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
        <p className="hero-subtitle">{subtitle}</p>

        <div className="hero-actions">
          <Link className="btn btn-primary" to="/contact">
            {t('hero.ctaPrimary')}
          </Link>
          <Link className="btn btn-secondary" to="/programs">
            {t('hero.ctaSecondary')}
          </Link>
        </div>

        <p className="hero-proof">{t('hero.proof')}</p>
      </div>
    </section>
  )
}

export default Hero
