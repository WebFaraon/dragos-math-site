import { useTranslation } from 'react-i18next'

function Testimonials() {
  const { t } = useTranslation()

  const testimonialKeys = ['andreea', 'anatol', 'stanislav', 'mihai', 'nicoleta']
  const testimonials = testimonialKeys.map((key) => ({
    key,
    name: t(`sections.testimonials.items.${key}.name`),
    result: t(`sections.testimonials.items.${key}.result`),
    review: t(`sections.testimonials.items.${key}.review`),
  }))

  return (
    <section id="testimonials" className="section">
      <div className="section-heading reveal">
        <p className="eyebrow">{t('sections.testimonials.eyebrow')}</p>
        <h2 className="section-title">{t('sections.testimonials.title')}</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <article
            key={item.key}
            className="testimonial-card home-testimonial-card in-view"
          >
            <div className="stars" aria-label={t('sections.testimonials.ratingAria')}>
              {String.fromCharCode(9733).repeat(5)}
            </div>
            <p className="testimonial-quote">{item.review}</p>
            <div className="testimonial-meta">
              <h3>{item.name}</h3>
              <span>{item.result}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
