import { useEffect, useState } from 'react'
import GuideCharacter from './GuideCharacter.jsx'

const heroSymbols = ['f(x)', '\u03A3', '\u03C0']

function Hero() {
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
        <p className="eyebrow">Personal Mentoring for Grade 9 and Grade 12</p>
        <h1>Build Math Confidence and Achieve Strong Exam Results</h1>
        <p className="hero-subtitle">
          Personalized mentoring for Grade 9 foundations and Grade 12 BAC preparation, with calm
          explanations, structured weekly plans, and measurable progress.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            Book a Free Lesson
          </a>
          <a className="btn btn-secondary" href="#programs">
            Programs for Grade 9 & 12
          </a>
        </div>

        {/* Micro-proof reduces friction above the fold for parents */}
        <p className="hero-proof">10+ years experience | Weekly parent feedback | Exam-focused strategy</p>

        <div className="audience-selector">
          <span>I'm looking for:</span>
          <a href="#grade9-program">Grade 9</a>
          <a href="#grade12-program">Grade 12</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
