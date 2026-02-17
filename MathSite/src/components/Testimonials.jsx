import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Testimonials() {
  const { t } = useTranslation()
  const [visibleCards, setVisibleCards] = useState([])
  const cardRefs = useRef([])

  const testimonials = [
    {
      key: 'maria',
      name: t('sections.testimonials.items.maria.name'),
      result: t('sections.testimonials.items.maria.result'),
      review: t('sections.testimonials.items.maria.review'),
    },
    {
      key: 'andrei',
      name: t('sections.testimonials.items.andrei.name'),
      result: t('sections.testimonials.items.andrei.result'),
      review: t('sections.testimonials.items.andrei.review'),
    },
    {
      key: 'parent',
      name: t('sections.testimonials.items.parent.name'),
      result: t('sections.testimonials.items.parent.result'),
      review: t('sections.testimonials.items.parent.review'),
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleCards((prev) => (prev.includes(index) ? prev : [...prev, index]))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.22 },
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" className="section">
      <div className="section-heading reveal">
        <p className="eyebrow">{t('sections.testimonials.eyebrow')}</p>
        <h2 className="section-title">{t('sections.testimonials.title')}</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item, index) => (
          <article
            key={item.key}
            className={`testimonial-card ${visibleCards.includes(index) ? 'in-view' : ''}`}
            data-index={index}
            ref={(element) => {
              cardRefs.current[index] = element
            }}
          >
            <div className="stars" aria-label={t('sections.testimonials.ratingAria')}>
              {String.fromCharCode(9733).repeat(5)}
            </div>
            <p>{item.review}</p>
            <h3>{item.name}</h3>
            <span>{item.result}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
