import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Footer from '../components/Footer.jsx'

function HomePage() {
  const { t } = useTranslation()

  const quickValueCards = [
    {
      id: 'clarity',
      icon: '\u03A3',
      title: t('home.quickValue.items.clarity.title', { defaultValue: 'Clear Explanations' }),
      copy: t('home.quickValue.items.clarity.copy', {
        defaultValue: 'Concepts are broken into simple steps students can apply immediately.',
      }),
    },
    {
      id: 'structure',
      icon: '\u25A3',
      title: t('home.quickValue.items.structure.title', { defaultValue: 'Weekly Structure' }),
      copy: t('home.quickValue.items.structure.copy', {
        defaultValue: 'Every lesson follows a focused plan with practice and feedback.',
      }),
    },
    {
      id: 'results',
      icon: '\u2713',
      title: t('home.quickValue.items.results.title', { defaultValue: 'Measurable Progress' }),
      copy: t('home.quickValue.items.results.copy', {
        defaultValue: 'Tracking checkpoints keep improvement visible for students and parents.',
      }),
    },
  ]

  const programTracks = [
    {
      id: 'grade9',
      title: t('sections.programs.overview.grade9.title', { defaultValue: 'Grade 9 Track' }),
      detail: t('sections.programs.overview.grade9.detail', {
        defaultValue: 'Best for students building core confidence before accelerated high-school math.',
      }),
      highlights: [
        t('sections.programs.overview.grade9.item1', {
          defaultValue: 'Algebra and geometry foundations',
        }),
        t('sections.programs.overview.grade9.item2', {
          defaultValue: 'Weekly structure and consistency',
        }),
        t('sections.programs.overview.grade9.item3', {
          defaultValue: 'Confidence in class and tests',
        }),
      ],
    },
    {
      id: 'grade12',
      title: t('sections.programs.overview.grade12.title', { defaultValue: 'Grade 12 Track' }),
      detail: t('sections.programs.overview.grade12.detail', {
        defaultValue: 'Best for students targeting strong BAC performance with focused exam preparation.',
      }),
      highlights: [
        t('sections.programs.overview.grade12.item1', {
          defaultValue: 'BAC-focused exam strategy',
        }),
        t('sections.programs.overview.grade12.item2', {
          defaultValue: 'Timed practice with feedback',
        }),
        t('sections.programs.overview.grade12.item3', {
          defaultValue: 'Calm performance under pressure',
        }),
      ],
    },
  ]

  const programBadges = [
    t('sections.programs.overview.badges.format', { defaultValue: '1:1 Online' }),
    t('sections.programs.overview.badges.structure', { defaultValue: 'Personalized Plan' }),
    t('sections.programs.overview.badges.focus', { defaultValue: 'Results Focus' }),
  ]

  const resourcePreviews = [
    {
      id: 'algebra',
      icon: 'x\u00B2',
      title: t('home.resourcesPreview.items.algebra.title', { defaultValue: 'Algebra' }),
      copy: t('home.resourcesPreview.items.algebra.copy', {
        defaultValue: 'Practice sets and guided examples for equations and transformations.',
      }),
    },
    {
      id: 'geometry',
      icon: '\u25B3',
      title: t('home.resourcesPreview.items.geometry.title', { defaultValue: 'Geometry' }),
      copy: t('home.resourcesPreview.items.geometry.copy', {
        defaultValue: 'Core theorems, diagrams, and proof scaffolds for faster understanding.',
      }),
    },
    {
      id: 'functions',
      icon: 'f(x)',
      title: t('home.resourcesPreview.items.functions.title', { defaultValue: 'Functions' }),
      copy: t('home.resourcesPreview.items.functions.copy', {
        defaultValue: 'Graphing, interpretation, and exam-style function problem walkthroughs.',
      }),
    },
  ]

  const testimonialStrip = [
    {
      id: 'maria',
      quote: t('home.testimonialsStrip.items.maria.quote', {
        defaultValue: '"My confidence went from fear to consistency in just one semester."',
      }),
      author: t('home.testimonialsStrip.items.maria.author', { defaultValue: 'Maria, Grade 9' }),
    },
    {
      id: 'andrei',
      quote: t('home.testimonialsStrip.items.andrei.quote', {
        defaultValue: '"The exam strategy sessions made me faster and much more precise."',
      }),
      author: t('home.testimonialsStrip.items.andrei.author', { defaultValue: 'Andrei, Grade 12' }),
    },
    {
      id: 'parent',
      quote: t('home.testimonialsStrip.items.parent.quote', {
        defaultValue: '"Communication was clear every week and progress was easy to track."',
      }),
      author: t('home.testimonialsStrip.items.parent.author', { defaultValue: 'Parent feedback' }),
    },
  ]

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    revealElements.forEach((element) => revealObserver.observe(element))

    return () => revealObserver.disconnect()
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main className="home-main">
        <Hero />

        <section className="section home-compact-section reveal">
          <div className="section-heading">
            <p className="eyebrow">
              {t('home.quickValue.eyebrow', { defaultValue: 'Quick Value' })}
            </p>
            <h2 className="section-title">
              {t('home.quickValue.title', {
                defaultValue: 'What students and parents get from the first weeks',
              })}
            </h2>
          </div>

          <div className="services-grid quick-value-grid">
            {quickValueCards.map((item) => (
              <article key={item.id} className="service-card quick-value-card">
                <span className="service-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section home-compact-section reveal">
          <div className="section-heading">
            <p className="eyebrow">
              {t('home.programsPreview.eyebrow', { defaultValue: 'Programs Preview' })}
            </p>
            <h2 className="section-title">
              {t('home.programsPreview.title', {
                defaultValue: 'Choose the right path for your grade',
              })}
            </h2>
          </div>

          <div className="services-grid programs-preview-grid">
            <article className="service-card program-card program-overview-card home-preview-card">
              <p className="program-overview-intro">
                {t('sections.programs.overview.subtitle', {
                  defaultValue:
                    'One clear section for both grades. Open the programs page and choose the exact path that fits your goal.',
                })}
              </p>

              <div className="program-overview-tracks">
                {programTracks.map((track) => (
                  <div key={track.id} className="program-track">
                    <h3>{track.title}</h3>
                    <p className="program-track-detail">{track.detail}</p>
                    <ul className="program-bullets">
                      {track.highlights.map((item, index) => (
                        <li key={`${track.id}-highlight-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="program-badges">
                {programBadges.map((badge, index) => (
                  <span key={`program-overview-badge-${index}`} className="program-badge">
                    {badge}
                  </span>
                ))}
              </div>

              <p className="home-section-action program-overview-cta">
                <Link className="btn btn-primary program-cta home-action-link" to="/programs">
                  {t('sections.programs.overview.cta', { defaultValue: 'View Programs' })}
                </Link>
              </p>
            </article>
          </div>
        </section>

        <section className="section home-compact-section reveal">
          <div className="section-heading">
            <p className="eyebrow">
              {t('home.resourcesPreview.eyebrow', { defaultValue: 'Resources Preview' })}
            </p>
            <h2 className="section-title">
              {t('home.resourcesPreview.title', { defaultValue: 'Start with the topic you need now' })}
            </h2>
          </div>

          <div className="services-grid resources-preview-grid">
            {resourcePreviews.map((resource) => (
              <article key={resource.id} className="service-card resource-preview-card">
                <span className="service-icon">{resource.icon}</span>
                <h3>{resource.title}</h3>
                <p>{resource.copy}</p>
              </article>
            ))}
          </div>

          <p className="home-section-action">
            <Link className="btn btn-secondary home-action-link" to="/resources">
              {t('home.resourcesPreview.cta', { defaultValue: 'Browse Resources' })}
            </Link>
          </p>
        </section>

        <section className="section home-compact-section reveal">
          <div className="section-heading">
            <p className="eyebrow">
              {t('home.testimonialsStrip.eyebrow', { defaultValue: 'Testimonials' })}
            </p>
            <h2 className="section-title">
              {t('home.testimonialsStrip.title', { defaultValue: 'Short feedback from families' })}
            </h2>
          </div>

          <div className="home-testimonials-strip">
            {testimonialStrip.map((testimonial) => (
              <article key={testimonial.id} className="service-card home-quote-card">
                <p className="home-quote">{testimonial.quote}</p>
                <p className="home-quote-author">{testimonial.author}</p>
              </article>
            ))}
          </div>

          <p className="home-section-action">
            <Link className="btn btn-secondary home-action-link" to="/testimonials">
              {t('home.testimonialsStrip.cta', { defaultValue: 'See all testimonials' })}
            </Link>
          </p>
        </section>

        <section className="section home-cta-section reveal">
          <div className="service-card home-cta-band">
            <p>
              {t('home.finalCta.copy', {
                defaultValue: 'Book a free intro lesson and get a clear plan for the next month.',
              })}
            </p>
            <Link className="btn btn-primary home-action-link" to="/contact">
              {t('home.finalCta.cta', { defaultValue: 'Book a Free Lesson' })}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

