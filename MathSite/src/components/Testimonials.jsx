import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    name: 'Maria T.',
    result: 'Grade 9 Student | From 6 to 9',
    review:
      'I was anxious in every math class. The explanations were calm and clear, and my test average improved from 6 to 9 in one semester.',
  },
  {
    name: 'Andrei P.',
    result: 'Grade 12 Student | BAC Mock +2.1 points',
    review:
      'The BAC strategy sessions changed how I solve problems. I became faster, more precise, and much more confident before finals.',
  },
  {
    name: 'Parent Feedback',
    result: 'Mother of Grade 12 Student',
    review:
      'Drago\u0219 is serious, organized, and very clear in communication. We received weekly feedback and saw measurable progress.',
  },
]

function Testimonials() {
  const [visibleCards, setVisibleCards] = useState([])
  const cardRefs = useRef([])

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
        <p className="eyebrow">Testimonials</p>
        <h2 className="section-title">Trusted by Students and Parents</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item, index) => (
          <article
            key={item.name}
            className={`testimonial-card ${visibleCards.includes(index) ? 'in-view' : ''}`}
            data-index={index}
            ref={(element) => {
              cardRefs.current[index] = element
            }}
          >
            <div className="stars" aria-label="5 star rating">
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
