import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Grade9Page.css'

function Grade9Page() {
  const overviewCards = [
    {
      title: 'Core Topics',
      description: 'Algebra, Geometry, and Functions basics.',
      icon: '\u03A3',
    },
    {
      title: 'Weekly Structure',
      description: 'Guided lessons with focused, structured practice.',
      icon: '\u0192',
    },
    {
      title: 'Expected Outcome',
      description: 'Confidence, clarity, and better grades.',
      icon: '\u03C0',
    },
  ]

  const materialGroups = [
    {
      title: 'Algebra Basics',
      items: [
        {
          title: 'Linear Equations Essentials',
          description: 'Step-by-step methods for solving linear equations.',
          meta: 'PDF · ~30 min',
          icon: '\u03A3',
        },
        {
          title: 'Expressions and Factorization Drill',
          description: 'Core manipulation patterns for confident practice.',
          meta: 'PDF · ~25 min',
          icon: '\u00D7',
        },
      ],
    },
    {
      title: 'Geometry Foundations',
      items: [
        {
          title: 'Angles, Triangles, and Proof Basics',
          description: 'Essential geometry logic with clean examples.',
          meta: 'PDF · ~35 min',
          icon: '\u25B3',
        },
        {
          title: 'Perimeter, Area, and Applications',
          description: 'Formula use with practical exam-style questions.',
          meta: 'PDF · ~30 min',
          icon: '\u2220',
        },
      ],
    },
    {
      title: 'Practice & Reinforcement',
      items: [
        {
          title: 'Weekly Mixed Practice Set',
          description: 'Balanced problems to reinforce new concepts.',
          meta: 'PDF · ~40 min',
          icon: '\u2713',
        },
        {
          title: 'Self-Check Quiz Pack',
          description: 'Quick checks to find and fix weak points early.',
          meta: 'PDF · ~20 min',
          icon: '\u2717',
        },
      ],
    },
  ]

  const usageSteps = [
    { label: 'Follow the weekly plan', icon: '\u23F1' },
    { label: 'Practice after each lesson', icon: '\u270E' },
    { label: 'Mark unclear topics', icon: '?' },
    { label: 'Review during mentoring sessions', icon: '\u21BB' },
  ]

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main grade9-page-main">
        <section className="grade9-hero grade9-panel">
          <p className="grade9-badge">GRADE 9 PROGRAM</p>
          <h1 className="grade9-title">Build Strong Math Foundations with Confidence</h1>
          <p className="grade9-subtitle">
            A structured path that helps Grade 9 students understand core math concepts and
            progress consistently each week.
          </p>

          <div className="grade9-hero-actions">
            <Link className="btn btn-primary" to="/#contact">
              Book a Free Lesson
            </Link>
            <a className="btn btn-secondary" href="#grade9-materials">
              See Learning Materials
            </a>
          </div>
        </section>

        <section className="grade9-overview">
          <div className="grade9-overview-grid">
            {overviewCards.map((card) => (
              <article key={card.title} className="grade9-overview-card grade9-panel">
                <span className="grade9-icon" aria-hidden="true">
                  {card.icon}
                </span>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="grade9-materials" className="grade9-materials">
          <div className="grade9-section-head">
            <h2>Learning Materials for Grade 9</h2>
            <p>Structured resources aligned with the weekly learning plan</p>
          </div>

          <div className="grade9-material-groups">
            {materialGroups.map((group) => (
              <section key={group.title} className="grade9-material-group grade9-panel">
                <h3>{group.title}</h3>
                <div className="grade9-material-grid">
                  {group.items.map((item) => (
                    <article key={item.title} className="grade9-material-card">
                      <span className="grade9-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <p className="grade9-material-meta">{item.meta}</p>
                      <div className="grade9-material-actions">
                        <button type="button" className="btn btn-secondary grade9-material-btn">
                          View PDF
                        </button>
                        <button type="button" className="btn btn-primary grade9-material-btn">
                          Download
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="grade9-usage grade9-panel">
          <h2>How to Use These Materials</h2>
          <div className="grade9-usage-grid">
            {usageSteps.map((step) => (
              <div key={step.label} className="grade9-usage-item">
                <span className="grade9-icon" aria-hidden="true">
                  {step.icon}
                </span>
                <p>{step.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grade9-final-cta grade9-panel">
          <h2>Not sure where to start?</h2>
          <p>Book a free lesson and receive a personalized study plan.</p>
          <Link className="btn btn-primary" to="/#contact">
            Book a Free Lesson
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Grade9Page
