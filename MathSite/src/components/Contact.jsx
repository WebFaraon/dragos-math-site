import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TELEGRAM } from '../brand.js'

const initialFormState = {
  name: '',
  email: '',
  message: '',
  botcheck: '',
}

function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(initialFormState)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('idle')
  const directEmailLabel = t('contact.form.emailLabel', { defaultValue: 'Email' })
  const directPhoneLabel = t('contact.phoneLabel', { defaultValue: 'Phone Number' })
  const directTelegramLabel = t('contact.telegramLabel', { defaultValue: 'Telegram' })

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
      setStatus(t('contact.form.status.invalidEmail'))
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    if (!accessKey) {
      console.warn('Missing VITE_WEB3FORMS_KEY. Contact form submission is disabled.')
      setStatusType('error')
      setStatus(t('contact.form.status.error'))
      return
    }

    setStatusType('sending')
    setStatus(t('contact.form.status.sending'))

    const payload = {
      access_key: accessKey,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: t('contact.form.emailSubject'),
      from_name: t('contact.form.fromName'),
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
        setStatus(t('contact.form.status.success'))
        setFormData(initialFormState)
        return
      }

      throw new Error(result?.message || 'Web3Forms submission failed.')
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatusType('error')
      setStatus(t('contact.form.status.error'))
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
    <section id="contact" className="section reveal contact-section">
      <div className="section-heading">
        <p className="eyebrow">{t('contact.eyebrow')}</p>
        <h2 className="section-title">{t('contact.title')}</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-copy">
          <h3>{t('contact.introTitle')}</h3>
          <p className="contact-copy-lead">{t('contact.introBody')}</p>

          <div className="contact-methods-grid">
            <article className="contact-method-card">
              <div className="contact-method-header">
                <h4>{directEmailLabel}</h4>
                <span className="contact-method-icon" aria-hidden="true">
                  ✉
                </span>
              </div>
              <p className="contact-method-value">
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </article>

            <article className="contact-method-card">
              <div className="contact-method-header">
                <h4>{directPhoneLabel}</h4>
                <span className="contact-method-icon" aria-hidden="true">
                  ☎
                </span>
              </div>
              <p className="contact-method-value">
                <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}>{CONTACT_PHONE}</a>
              </p>
            </article>

            <article className="contact-method-card">
              <div className="contact-method-header">
                <h4>{directTelegramLabel}</h4>
                <span className="contact-method-icon" aria-hidden="true">
                  @
                </span>
              </div>
              <p className="contact-method-value">
                <a
                  href={`https://t.me/${CONTACT_TELEGRAM.replace(/^@/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONTACT_TELEGRAM}
                </a>
              </p>
            </article>
          </div>

          <p className="contact-response">{t('contact.responseTime')}</p>
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

          <label htmlFor="name">{t('contact.form.nameLabel')}</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={t('contact.form.namePlaceholder')}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">{t('contact.form.emailLabel')}</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={t('contact.form.emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">{t('contact.form.messageLabel')}</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder={t('contact.form.messagePlaceholder')}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary contact-submit"
            disabled={statusType === 'sending'}
          >
            {statusType === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
          </button>

          {status && <p className={`form-status form-status-${statusType}`}>{status}</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact
