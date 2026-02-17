import { useEffect, useState } from 'react'
import { CONTACT_EMAIL, CONTACT_TELEGRAM } from '../brand.js'

const initialFormState = {
  name: '',
  email: '',
  message: '',
  botcheck: '',
}

function Contact() {
  const [formData, setFormData] = useState(initialFormState)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.botcheck.trim()) {
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email.trim())) {
      setStatusType('error')
      setStatus('Please enter a valid email address.')
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    if (!accessKey) {
      console.warn('Missing VITE_WEB3FORMS_KEY. Contact form submission is disabled.')
      setStatusType('error')
      setStatus('Something went wrong. Please try again or email me directly.')
      return
    }

    setStatusType('sending')
    setStatus('Sending...')

    const payload = {
      access_key: accessKey,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: 'New message — Dragoș Math',
      from_name: 'Dragoș Math Website',
      botcheck: formData.botcheck,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let result = null
      try {
        result = await response.json()
      } catch {
        throw new Error('Invalid JSON response from Web3Forms.')
      }

      if (result?.success === true) {
        setStatusType('success')
        setStatus('Thank you. Your message was sent. I usually respond within 24 hours.')
        setFormData(initialFormState)
        return
      }

      throw new Error(result?.message || 'Web3Forms submission failed.')
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatusType('error')
      setStatus('Something went wrong. Please try again or email me directly.')
    }
  }

  useEffect(() => {
    if (!status || statusType === 'sending') return
    const timer = setTimeout(() => {
      setStatus('')
      setStatusType('idle')
    }, 4500)
    return () => clearTimeout(timer)
  }, [status, statusType])

  return (
    <section id="contact" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2 className="section-title">Let's Plan the Next Step in Math Progress</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-copy">
          <h3>Friendly and Clear from the First Conversation</h3>
          <p>
            Parents and students are welcome to reach out with current grades, goals, and concerns.
            You will receive a clear recommendation and next steps.
          </p>
          <p className="contact-response">Typical response time: within 24 hours.</p>
          <p className="contact-alt">
            Prefer direct contact? Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> |
            Telegram: {CONTACT_TELEGRAM}
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="botcheck"
            value={formData.botcheck}
            onChange={handleChange}
            className="hp-field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Share your grade, goals, and what feels difficult right now..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary contact-submit"
            disabled={statusType === 'sending'}
          >
            {statusType === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status && <p className={`form-status form-status-${statusType}`}>{status}</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact
