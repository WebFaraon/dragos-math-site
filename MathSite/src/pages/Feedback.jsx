import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import TestimonialsForm from '../components/TestimonialsForm.jsx'

function FeedbackPage() {
  const { t } = useTranslation()
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)

  const testimonials = [
    {
      id: 'maria',
      name: t('sections.testimonials.items.maria.name'),
      role: t('sections.testimonials.items.maria.result'),
      quote: t('sections.testimonials.items.maria.review'),
    },
    {
      id: 'andrei',
      name: t('sections.testimonials.items.andrei.name'),
      role: t('sections.testimonials.items.andrei.result'),
      quote: t('sections.testimonials.items.andrei.review'),
    },
    {
      id: 'parent',
      name: t('sections.testimonials.items.parent.name'),
      role: t('sections.testimonials.items.parent.result'),
      quote: t('sections.testimonials.items.parent.review'),
    },
  ]
  const testimonialsPerSlide = 2
  const testimonialSlides = []
  for (let index = 0; index < testimonials.length; index += testimonialsPerSlide) {
    testimonialSlides.push(testimonials.slice(index, index + testimonialsPerSlide))
  }
  const hasMultipleSlides = testimonialSlides.length > 1

  useEffect(() => {
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex >= testimonialSlides.length ? 0 : prevIndex,
    )
  }, [testimonialSlides.length])

  const goToPreviousTestimonial = () => {
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonialSlides.length - 1 : prevIndex - 1,
    )
  }

  const goToNextTestimonial = () => {
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex === testimonialSlides.length - 1 ? 0 : prevIndex + 1,
    )
  }

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
      <main className="section page-main feedback-page-main">
        <section className="service-card feedback-hero-card reveal">
          <p className="eyebrow">{t('feedback.title')}</p>
          <h1 className="section-title">{t('feedback.title')}</h1>
          <p className="hero-subtitle">{t('feedback.subtitle')}</p>
          <div className="program-badges feedback-chips" aria-hidden="true">
            <span className="program-badge">{t('feedback.sections.testimonials')}</span>
            <span className="program-badge">{t('feedback.sections.submit')}</span>
          </div>
        </section>

        <section className="feedback-block reveal">
          <div className="section-heading">
            <h2 className="section-title">{t('feedback.sections.testimonials')}</h2>
          </div>

          <div className="feedback-carousel-shell">
            <div className="feedback-carousel">
              <button
                type="button"
                className="feedback-carousel-control feedback-carousel-control-prev"
                onClick={goToPreviousTestimonial}
                disabled={!hasMultipleSlides}
                aria-label={t('feedback.carousel.prev', { defaultValue: 'Previous testimonial' })}
              >
                {String.fromCharCode(10094)}
              </button>

              <div className="feedback-carousel-viewport">
                <div
                  className="feedback-carousel-track"
                  style={{ transform: `translateX(-${activeTestimonialIndex * 100}%)` }}
                >
                  {testimonialSlides.map((slide, slideIndex) => (
                    <div key={`feedback-slide-${slideIndex}`} className="feedback-carousel-slide">
                      {slide.map((item) => (
                        <article
                          key={item.id}
                          className="testimonial-card feedback-carousel-card in-view"
                        >
                          <div className="stars" aria-label={t('sections.testimonials.ratingAria')}>
                            {String.fromCharCode(9733).repeat(5)}
                          </div>
                          <p>{item.quote}</p>
                          <h3>{item.name}</h3>
                          <span>{item.role}</span>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="feedback-carousel-control feedback-carousel-control-next"
                onClick={goToNextTestimonial}
                disabled={!hasMultipleSlides}
                aria-label={t('feedback.carousel.next', { defaultValue: 'Next testimonial' })}
              >
                {String.fromCharCode(10095)}
              </button>
            </div>

            <div className="feedback-carousel-indicator" aria-live="polite">
              {activeTestimonialIndex + 1} / {testimonialSlides.length}
            </div>
          </div>
        </section>

        <section className="feedback-block reveal">
          <div className="section-heading">
            <h2 className="section-title">{t('feedback.sections.submit')}</h2>
          </div>

          <div className="service-card feedback-submit-card">
            <TestimonialsForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default FeedbackPage
